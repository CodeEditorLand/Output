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
//
// Sky's polyfills set both env vars truthy, so the relative branch
// fires. The relative path `../../../workbench/...` resolves against
// `import.meta.url` of the importing chunk - which for Vite-bundled
// code lives at `/_astro/workbench.HASH.js`. The resolution lands on
// `/workbench/workbench.desktop.main.js` (URL collapses past root),
// a path that does not exist; Tauri's frontend server returns its
// `index.html` SPA fallback with a `.js` Content-Type, the parser
// crashes with `SyntaxError: Unexpected token '<'`.
//
// Force the absolute branch unconditionally - workbenchUrl always
// resolves through the `baseUrl` we just rewrote, landing on the
// real file at `<origin>/Static/Application/vs/workbench/workbench
// .desktop.main.js`.
const ConditionalSearchPattern =
	/let workbenchUrl;\s*if \(!!safeProcess\.env\["VSCODE_DEV"\] && globalThis\._VSCODE_USE_RELATIVE_IMPORTS\) \{[^}]+\} else \{[^}]+\}/;

const ConditionalReplacement =
	'const workbenchUrl = new URL(`vs/workbench/workbench.desktop.main.js`, baseUrl).href;';

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
