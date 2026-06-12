/**
 * Step 11: Copy the VS Code runtime `node_modules` dependencies the browser
 * workbench loads at `/Static/Application/node_modules/<pkg>/…`:
 *
 *   @xterm/xterm, @xterm/addon-clipboard, @xterm/addon-image,
 *   @xterm/addon-ligatures, @xterm/addon-search, @xterm/addon-serialize,
 *   @xterm/addon-unicode11, @xterm/addon-webgl,
 *   @vscode/vscode-languagedetection, vscode-textmate, vscode-oniguruma
 *
 * Each package is tried in order: local `node_modules` first, Dependency
 * `node_modules` fallback. This mirrors Sky's Step 11.
 */

import { join } from "node:path";

import type { CopyPlugin } from "../../../Type.js";

export interface CopyNodeModulesInput {

	readonly LocalRoot: string;

	readonly DependencyRoot: string;

	readonly Destination: string;

	readonly Packages?: ReadonlyArray<string>;
}

export const DefaultPackages = [
	"@xterm/xterm",

	"@xterm/addon-clipboard",

	"@xterm/addon-image",

	"@xterm/addon-ligatures",

	"@xterm/addon-search",

	"@xterm/addon-serialize",

	"@xterm/addon-unicode11",

	"@xterm/addon-webgl",

	"@vscode/vscode-languagedetection",

	"vscode-textmate",

	"vscode-oniguruma",
] as const;

export const CopyNodeModules = ({
	LocalRoot,
	DependencyRoot,
	Destination,
	Packages = DefaultPackages,
}: CopyNodeModulesInput): CopyPlugin => ({
	Kind: "Copy",

	Name: "CopyNodeModules",

	Entries: Packages.map((Pkg) => ({
		From: [join(LocalRoot, Pkg), join(DependencyRoot, Pkg)],
		To: join(Destination, Pkg),
		Recursive: true,
		Force: true,
	})),
});

export default CopyNodeModules;
