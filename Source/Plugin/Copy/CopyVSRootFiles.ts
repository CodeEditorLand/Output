/**
 * Step 1b: Copy root-level VS Code files the workbench HTML references at
 * `/Static/Application/*` - `bootstrap-*.js`, `nls.*.json`, etc.
 *
 * Each file has a tier-fallback source list:
 *   1. `Output/Target/Microsoft/VSCode/<file>`  (primary: published)
 *   2. `Dependency/.../out-build/<file>`        (fallback: release tsc)
 *   3. `Dependency/.../out/<file>`              (fallback: debug tsc)
 *
 * The active tier is selected at runtime by whichever candidate exists
 * first. Without this step the webview 404s to the SPA fallback and the
 * browser reports `Unexpected token '<'` on the HTML response.
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

export const CopyVSRootFiles = ({
	OutputRoot,
	DependencyOutBuild,
	DependencyOut,
	Destination,
	Files = DefaultFiles,
}: CopyVSRootFilesInput): CopyPlugin => ({
	Kind: "Copy",
	Name: "CopyVSRootFiles",
	Entries: Files.map((File) => ({
		From: [
			join(OutputRoot, File),
			join(DependencyOutBuild, File),
			join(DependencyOut, File),
		],
		To: join(Destination, File),
	})),
});

export default CopyVSRootFiles;
