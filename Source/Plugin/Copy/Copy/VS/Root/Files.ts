/**
 * Step 1b: Copy root-level VS Code files the workbench HTML references at
 * `/Static/Application/*` - `bootstrap-*.js`, `nls.*.json`, etc.
 *
 * VS Code's `Dependency/.../out` (debug tsc) and `Dependency/.../out-build`
 * (release tsc) trees are NOT the same shape. Some files live at the root
 * in one but inside `vs/` in the other; some only exist in one tree at
 * all. The mapping below tracks the real on-disk layout per file rather
 * than assuming the file lives at `<root>/<file>` everywhere - which was
 * the bug the previous-year NODE_ENV-aware copy step solved before this
 * plugin lost its layout awareness.
 *
 * Per-file candidate construction:
 *   - `Output/Target/Microsoft/VSCode/<file>` and
 *     `Output/Target/Microsoft/VSCode/vs/<file>` (Output element output;
 *     prefer the primary location, fall through to the `vs/` mirror)
 *   - In **production** (`NODE_ENV=production`): try `out-build/` BEFORE
 *     `out/`, since release TSC writes the bundled flat layout.
 *   - In **development** / unset NODE_ENV: try `out/` BEFORE `out-build/`,
 *     since the dev TSC keeps the source-tree layout the renderer dev
 *     paths assume.
 *   - Each Dependency tier checks both `<root>/<file>` and
 *     `<root>/vs/<file>` because nls.* and a few other files live under
 *     the `vs/` subdirectory in some upstream layouts.
 *   - Inline `data:text/javascript,…` stub as the absolute-last fallback
 *     covers files VS Code only generates when a full localisation step
 *     runs (`nls.messages.js`, the localised JSON tables) - none of our
 *     tiers produce them, so without the inline body the renderer 404s
 *     to the SPA HTML and the browser reports
 *     `Unexpected token '<'` on the HTML response.
 */

import { join } from "node:path";

import type { CopyPlugin } from "../../../../Type.js";

export interface CopyVSRootFilesInput {
	readonly OutputRoot: string;

	readonly DependencyOutBuild: string;

	readonly DependencyOut: string;

	readonly Destination: string;

	readonly Files?: ReadonlyArray<string>;

	/**
	 * When set, overrides the runtime `NODE_ENV` detection. Used by
	 * tests and ad-hoc invocations that want explicit ordering.
	 */
	readonly OnDevelopment?: boolean;
}

const DefaultFiles = [
	"nls.keys.json",

	"nls.messages.js",

	"nls.messages.json",

	"nls.metadata.json",

	"bootstrap-esm.js",

	"bootstrap-import.js",

	"bootstrap-meta.js",
] as const;

/**
 * Inline-body stub bodies keyed by filename. Used by `CopyFirstAvailable`
 * when none of the on-disk tier candidates exist. Each body has to be
 * a valid module (`.js`) or JSON (`.json`) per the file extension.
 */
const InlineStubs: Record<string, string> = {
	// Empty NLS message table: `vs/nls.js` reads
	// `globalThis._VSCODE_NLS_MESSAGES` by integer index; an empty array
	// causes the runtime to fall through to the per-call fallback string
	// every workbench `localize(id, fallback, …)` callsite already passes.
	"nls.messages.js":
		"globalThis._VSCODE_NLS_MESSAGES=globalThis._VSCODE_NLS_MESSAGES??[];export{};",

	// Empty JSON tables - workbench code reads these via `JSON.parse`
	// expecting either an array or object.
	"nls.keys.json": "[]",

	"nls.messages.json": "[]",

	"nls.metadata.json": "{}",
};

const InlineCandidate = (File: string): string | null => {
	const Body = InlineStubs[File];

	if (!Body) return null;

	return `data:text/javascript,${Body}`;
};

const ResolveOnDevelopment = (Override?: boolean): boolean => {
	if (typeof Override === "boolean") return Override;

	const Env = process.env["NODE_ENV"];

	if (Env === "production") return false;

	if (Env === "development") return true;

	// `TAURI_ENV_DEBUG=true` is the convention the rest of the Sky
	// pipeline uses to mark debug-profile tauri runs; honour it here so
	// the ordering matches whatever path the active build claims.
	return process.env["TAURI_ENV_DEBUG"] === "true";
};

/**
 * Build the per-file candidate list. Each tier checks both `<root>/<file>`
 * and `<root>/vs/<file>` because the nls.* family + a few other files
 * sometimes live under `vs/` and sometimes at the root depending on
 * which TSC pass produced them.
 */
const BuildCandidates = (
	File: string,

	OutputRoot: string,

	DependencyOutBuild: string,

	DependencyOut: string,

	OnDevelopment: boolean,
): string[] => {
	const PrimaryDependency = OnDevelopment
		? DependencyOut
		: DependencyOutBuild;

	const SecondaryDependency = OnDevelopment
		? DependencyOutBuild
		: DependencyOut;

	const Candidates = [
		join(OutputRoot, File),

		join(OutputRoot, "vs", File),

		join(PrimaryDependency, File),

		join(PrimaryDependency, "vs", File),

		join(SecondaryDependency, File),

		join(SecondaryDependency, "vs", File),
	];

	const Inline = InlineCandidate(File);

	if (Inline) Candidates.push(Inline);

	return Candidates;
};

export const CopyVSRootFiles = ({
	OutputRoot,
	DependencyOutBuild,
	DependencyOut,
	Destination,
	Files = DefaultFiles,
	OnDevelopment,
}: CopyVSRootFilesInput): CopyPlugin => {
	const Dev = ResolveOnDevelopment(OnDevelopment);

	return {
		Kind: "Copy",

		Name: "CopyVSRootFiles",

		Entries: Files.map((File) => ({
			From: BuildCandidates(
				File,

				OutputRoot,

				DependencyOutBuild,

				DependencyOut,

				Dev,
			),
			To: join(Destination, File),
		})),
	};
};

export default CopyVSRootFiles;
