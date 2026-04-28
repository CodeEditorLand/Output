/**
 * Rewrite the workbench loader's base URL computation.
 *
 * VS Code's `vs/code/electron-browser/workbench/workbench.js` computes
 *
 *   const baseUrl = new URL(
 *     `${fileUriFromPath(configuration2.appRoot, {
 *       scheme: "vscode-file",
 *       fallbackAuthority: "vscode-app",
 *     })}/out/`
 *   );
 *
 * and uses `baseUrl` to resolve the workbench's `await import(
 * "vs/workbench/workbench.desktop.main.js")` chain. The resulting URL
 * (`vscode-file://vscode-app/<appRoot>/out/vs/...`) only resolves when
 * Mountain's custom scheme handler is registered with the webview. In
 * dev/debug profiles the handler is not registered (Tauri serves the
 * dev tree from `localhost:NNNN`), so the workbench import 404s and
 * the dev server returns its SPA HTML page - the JS parser crashes
 * with `SyntaxError: Unexpected token '<'`.
 *
 * Replace the `vscode-file://` computation with a plain
 * `${location.origin}/Static/Application/` URL. Sky's pipeline still
 * copies VS Code into `Static/Application/` for every profile (the
 * bundled tree is additive, not a replacement), so the resolved
 * `<origin>/Static/Application/vs/workbench/workbench.desktop.main.js`
 * lands on a real file.
 *
 * Idempotent via `__LAND_WORKBENCH_BASE_URL_REWRITTEN__` marker.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* __LAND_WORKBENCH_BASE_URL_REWRITTEN__ */";

const SearchPattern =
	/const baseUrl = new URL\(`\$\{fileUriFromPath\([^`]+`\);/;

const Replacement =
	'const baseUrl = new URL(location.origin + "/Static/Application/");';

// VS Code's load() function picks the workbench URL with a conditional:
//
//   if (!!safeProcess.env["VSCODE_DEV"] && globalThis._VSCODE_USE_RELATIVE_IMPORTS) {
//     workbenchUrl = "../../../workbench/workbench.desktop.main.js";
//   } else {
//     workbenchUrl = new URL(`vs/workbench/workbench.desktop.main.js`, baseUrl).href;
//   }
//   const result2 = await import(workbenchUrl);   // ← runtime-computed string
//
// The runtime-computed import string defeats Vite/Rollup's static
// analysis: the bundler can't follow `await import(<variable>)` and so
// can't bundle `workbench.desktop.main.js` + transitive into the
// graph. Sky's bundled-workbench profile worked around this by
// pre-importing desktop.main.js from the Bundled Entry.ts before
// kicking off the workbench loader - but that broke initialisation
// order: desktop.main.js evaluates BEFORE workbench.js's load()
// function has set up `_VSCODE_FILE_ROOT`, NLS, and the resolved
// configuration, so VS Code's `isElectron` / `isWeb` detection ran
// against an unconfigured global, mode-detected as "web", and skipped
// every Electron-specific service registration (DiskFileSystemProvider,
// NativeHostService, etc.). Result: ENOPRO file-system errors,
// `[DefaultAccount] Running in web without remote, skipping init`,
// and assorted FS lookup failures.
//
// Replace the conditional + computed-URL import with a single literal-
// string `await import("../../../workbench/workbench.desktop.main.js")`.
// Vite/Rollup follows the literal path, bundles desktop.main.js into a
// separate chunk that loads ON DEMAND when the await fires (after
// workbench.js's setup completes), and Sky's bundled Entry.ts can
// drop its pre-import of desktop.main.js entirely.
const ConditionalSearchPattern =
	/let workbenchUrl;\s*if \(!!safeProcess\.env\["VSCODE_DEV"\] && globalThis\._VSCODE_USE_RELATIVE_IMPORTS\) \{[^}]+\} else \{[^}]+\}\s*const result2 = await import\(workbenchUrl\);/;

const ConditionalReplacement =
	'const result2 = await import("../../../workbench/workbench.desktop.main.js");';

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewriteWorkbenchBaseURL",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!SearchPattern.test(Source)) return { Kind: "Unchanged" };

		let Next = Source.replace(SearchPattern, Marker + " " + Replacement);
		if (ConditionalSearchPattern.test(Next)) {
			Next = Next.replace(
				ConditionalSearchPattern,
				ConditionalReplacement,
			);
		}
		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
