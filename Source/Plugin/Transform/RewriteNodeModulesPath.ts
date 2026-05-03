/**
 * Patch `vs/base/common/network.js` to drop one `..\/` segment from
 * the four hard-coded relative resource paths VS Code uses to locate
 * `node_modules`, `node_modules.asar`, `node_modules.asar.unpacked`,
 * and the bundled built-in `extensions` directory.
 *
 * VS Code upstream source defines (`network.js:144-147`):
 *
 *     const builtinExtensionsPath        = "vs/../../extensions";
 *     const nodeModulesPath              = "vs/../../node_modules";
 *     const nodeModulesAsarPath          = "vs/../../node_modules.asar";
 *     const nodeModulesAsarUnpackedPath  = "vs/../../node_modules.asar.unpacked";
 *
 * These paths are joined onto `_VSCODE_FILE_ROOT` whenever the
 * workbench needs to resolve a built-in resource. With our setup
 * `_VSCODE_FILE_ROOT = ${location.origin}/Static/Application/`, the
 * browser canonicalizes:
 *
 *     /Static/Application/vs/..\/..\/extensions/<id>/package.json
 *   → /Static/extensions/<id>/package.json
 *
 *     /Static/Application/vs/..\/..\/node_modules/<pkg>/...
 *   → /Static/node_modules/<pkg>/...
 *
 * Every actual on-disk location is one segment deeper (under
 * `Sky/Target/Static/Application/...`). The dev server's default
 * Tauri asset_resolver looks for the over-resolved path, doesn't
 * find it, and the SPA-fallback chain returns `index.html`. The
 * browser then parses HTML as JavaScript / JSON and the failures
 * cascade silently:
 *
 * - `vscode-textmate`, `vscode-oniguruma` returns the SPA HTML; all
 *   syntax highlighting and grammar tokenization breaks.
 * - `vscode-languagedetection` returns the SPA HTML; language
 *   detection misfires.
 * - Every built-in extension's `package.json` returns SPA HTML when
 *   the workbench tries to re-load it via builtinExtensionsPath;
 *   contributions (commands, menus, languages, themes, icons) are
 *   never registered on the workbench side even though Mountain's
 *   scanner found 94 extensions.
 *
 * The `vscode-file://` scheme handler in `Mountain/Source/Binary/
 * Build/Scheme.rs` already rewrites `Static/node_modules/` to
 * `Static/Application/node_modules/` for its own scheme, but the
 * dev server's plain-HTTP path doesn't go through that handler.
 * Patching the source path to match the actual on-disk layout is
 * simpler than maintaining the rewrite in two places, and it fixes
 * all four paths in one shot.
 *
 * Idempotent: skips if the marker is already present.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* __LAND_NODE_MODULES_PATH_PATCHED__ */";

// `network.js` is byte-copied from VS Code's `out/` tree (see
// `Source/ESBuild/Microsoft/VSCode.ts` - `loader: { ".js": "copy" }`),
// so the path constants survive in `tsc`'s emitted form: single-
// quoted, declared as `export const <name> = '...'`. The literals
// themselves only appear in those four declarations, so a literal-
// string replace stays surgical and quote-style-stable.
const Replacements: ReadonlyArray<[string, string]> = [
	[`'vs/../../extensions'`, `'vs/../extensions'`],
	[`'vs/../../node_modules'`, `'vs/../node_modules'`],
	[`'vs/../../node_modules.asar'`, `'vs/../node_modules.asar'`],
	[
		`'vs/../../node_modules.asar.unpacked'`,
		`'vs/../node_modules.asar.unpacked'`,
	],
];

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewriteNodeModulesPath",
	Match: ({ Path }) => /\/vs\/base\/common\/network\.js$/.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		let Next = Source;
		let Changed = false;
		for (const [Original, Patched] of Replacements) {
			if (Next.includes(Original)) {
				Next = Next.replace(Original, Patched);
				Changed = true;
			}
		}

		if (!Changed) return { Kind: "Unchanged" };

		return {
			Kind: "Rewrite",
			Source: Marker + "\n" + Next,
		};
	},
};

export default Plugin;
