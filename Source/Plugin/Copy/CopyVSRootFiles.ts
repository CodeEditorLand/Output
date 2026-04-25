/**
 * Step 1b: Copy root-level VS Code files the workbench HTML references at
 * `/Static/Application/*` - `bootstrap-*.js`, `nls.*.json`, etc.
 *
 * Each file has a tier-fallback source list:
 *   1. `Output/Target/Microsoft/VSCode/<file>`  (primary: published)
 *   2. `Dependency/.../out-build/<file>`        (fallback: release tsc)
 *   3. `Dependency/.../out/<file>`              (fallback: debug tsc)
 *   4. inline `data:text/javascript,…` stub      (last-resort body)
 *
 * Tier 4 covers files that stock VS Code generates only when a
 * localisation step runs (none of the upstream tsc paths produce
 * `nls.messages.js` because it's per-locale output). Without the inline
 * fallback the webview 404s to the SPA HTML and the browser reports
 * `Unexpected token '<'` on the HTML response - which is exactly the
 * cold-boot failure mode this plugin step exists to prevent.
 */

import { join } from "node:path";

import type { CopyPlugin } from "../Type.js";

export interface CopyVSRootFilesInput {
	readonly OutputRoot: string;
	readonly DependencyOutBuild: string;
	readonly DependencyOut: string;
	readonly Destination: string;
	readonly Files?: ReadonlyArray<string>;
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

export const CopyVSRootFiles = ({
	OutputRoot,
	DependencyOutBuild,
	DependencyOut,
	Destination,
	Files = DefaultFiles,
}: CopyVSRootFilesInput): CopyPlugin => ({
	Kind: "Copy",
	Name: "CopyVSRootFiles",
	Entries: Files.map((File) => {
		const Tiered = [
			join(OutputRoot, File),
			join(DependencyOutBuild, File),
			join(DependencyOut, File),
		];
		const Inline = InlineCandidate(File);
		return {
			From: Inline ? [...Tiered, Inline] : Tiered,
			To: join(Destination, File),
		};
	}),
});

export default CopyVSRootFiles;
