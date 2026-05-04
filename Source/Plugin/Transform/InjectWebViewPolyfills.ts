/**
 * Inject WKWebView polyfills + Blob worker URL rewrite into VS Code's
 * Electron workbench entry.
 *
 * VS Code's `vs/code/electron-browser/workbench/workbench.js` reads
 * `window.requestIdleCallback`, `window.cancelIdleCallback`, and
 * `window.queryLocalFonts` at module-eval time. WKWebView (Tauri's macOS
 * webview) does not implement any of them - the workbench crashes before
 * its `(async () => { ... })()` IIFE even reaches the resolveConfiguration
 * step.
 *
 * Worker blobs assembled inside the workbench reference
 * `vscode-file://vscode-app/...` URLs which the WKWebView resolver does
 * not honour for blob-loaded scripts. The same patch rewrites those to
 * `${origin}/...` so the dev-server (or Mountain's bundled resource
 * scheme handler in production) serves them.
 *
 * Body lives in `Polyfill/WebViewPolyfills.ts` (type-checked).
 * Idempotent via the `__LAND_WEBVIEW_POLYFILLS__` marker.
 */

import WebViewPolyfills, { Marker } from "../Polyfill/WebViewPolyfills.js";
import type { TransformPlugin } from "../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${WebViewPolyfills.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectWebViewPolyfills",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
