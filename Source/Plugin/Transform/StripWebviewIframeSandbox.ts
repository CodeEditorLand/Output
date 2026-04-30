/**
 * Strip the `sandbox` attribute from VS Code's webview iframe on
 * WKWebView (Tauri on macOS). WebKit enforces a strict security rule:
 * sandboxed iframes can never perform a main-resource load over a
 * custom protocol (`vscode-webview://`, `land://`, etc.), even with
 * `allow-same-origin` set. This fires as:
 *
 *     [Error] Ignoring request to load this main resource because it
 *     has a custom protocol and comes from a sandboxed iframe (x12)
 *
 * every time an extension (claude-code, roo-cline, gitlens, getting-
 * started) opens a webview panel. Electron whitelists custom protocols
 * and therefore this block never hit upstream VS Code; WKWebView does
 * not, so Land sees it on every launch.
 *
 * Land runs as a single-user desktop editor - the threat model that
 * motivates the upstream sandbox (untrusted extension HTML in a browser
 * tab that also holds the workbench) does not apply. Dropping the
 * `sandbox.add(...)` calls + the `pre/index.html` `setAttribute('sandbox', ...)`
 * line lets WKWebView serve the webview iframe normally.
 *
 * Patches *two* files:
 *   1. `vs/workbench/contrib/webview/browser/pre/index.html` - the
 *      pending-frame-swap call site that re-applies the sandbox after
 *      the inner extension HTML loads.
 *   2. `vs/workbench/contrib/webview/browser/webviewElement.js` - the
 *      *outer* iframe creation site (`element.sandbox.add(...)`) which
 *      is the actual `<iframe sandbox="...">` the user sees in DevTools.
 *      The earlier `pre/index.html` patch alone leaves this outer iframe
 *      sandboxed, which is what was producing the WKWebView block.
 *
 * Idempotent. Marker comment is the same in both shapes so a second
 * run skips files that already contain the rewrite.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* Land: sandbox attribute stripped";

const PreIndexPathRegex =
	/\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const WebviewElementPathRegex =
	/\/workbench\/contrib\/webview\/browser\/webviewElement\.js$/;

// pre/index.html (line ~1054):
//   newFrame.setAttribute('sandbox', Array.from(sandboxRules).join(' '));
const PreIndexSandboxCall =
	/newFrame\.setAttribute\(\s*['"]sandbox['"]\s*,\s*Array\.from\(sandboxRules\)\.join\(\s*['"] ['"]\s*\)\s*\);/;

// webviewElement.js (line ~308):
//   element.sandbox.add('allow-scripts', 'allow-same-origin', 'allow-forms',
//                       'allow-pointer-lock', 'allow-downloads');
// Mangling: stock build keeps `element.sandbox.add` literal; if a future
// release renames the local `element` we'll need to broaden the anchor.
// `element` survives upstream and our own minification because it's a
// formal parameter of `_createElement`.
const WebviewElementSandboxCall =
	/element\.sandbox\.add\([^)]*'allow-scripts'[^)]*\);/;

const Replacement = `${Marker} - WKWebView blocks custom-protocol main-resource loads from sandboxed iframes. */`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "StripWebviewIframeSandbox",
	Match: ({ Path }) =>
		PreIndexPathRegex.test(Path) || WebviewElementPathRegex.test(Path),
	Transform({ Path, Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		const Pattern = PreIndexPathRegex.test(Path)
			? PreIndexSandboxCall
			: WebviewElementSandboxCall;
		if (!Pattern.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(Pattern, Replacement);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
