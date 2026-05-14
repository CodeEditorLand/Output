/**
 * Rewrite the `<meta http-equiv="Content-Security-Policy">` header in
 * `vs/workbench/contrib/webview/browser/pre/index.html` so the inline
 * bootstrap script can execute under WKWebView.
 *
 * Stock VS Code Electron pins `script-src` to a single sha256 hash of
 * the exact bytes of the inline `<script async type="module">` block:
 *
 *     script-src 'sha256-q+WTr+fBXpLLE3++yWNaxT6BTWQtsKscoeIlynBRk4E=' 'self';
 *
 * Two things break this under our build:
 *
 *   1. WKWebView normalises CRLF / NBSP / BOM differently from
 *      Chromium when computing the script body hash, so a literal
 *      byte-identical copy occasionally fails the comparison anyway.
 *   2. Any future Output transform (or a re-bundling pass) that
 *      touches the inline script body recomputes the hash and the
 *      old `'sha256-...'` directive becomes stale - silent breakage,
 *      every extension webview goes blank with the user-visible
 *      "Refused to execute a script because its hash, its nonce, or
 *      'unsafe-inline' does not appear in the script-src directive"
 *      error.
 *
 * Land runs as a single-user desktop editor; the threat model the
 * upstream hash defends against (XSS via crafted webview HTML in a
 * shared browser tab) does not apply. Loosen `script-src` to
 * `'unsafe-inline' 'self' blob:` so the shell boots regardless of
 * minor byte drift, plus mirror the same loosening on `style-src`
 * for parity (stock already allows `'unsafe-inline'` for styles).
 *
 * Idempotent. Marker `__LAND_WEBVIEW_SHELL_CSP__` (HTML comment so
 * it survives transforms that scan but don't strip comments).
 */

import type { TransformPlugin } from "../../../../Type.js";

const PathRegex = /\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

const Marker = "<!-- __LAND_WEBVIEW_SHELL_CSP__ -->";

const CSPMetaPattern =
	/<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*\/?\s*>/;

const ReplacementMeta =
	`<meta http-equiv="Content-Security-Policy" ` +
	`content="default-src 'none'; ` +
	`script-src 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' 'self' vscode-file: vscode-webview-resource: blob:; ` +
	`frame-src 'self' vscode-webview:; ` +
	`style-src 'unsafe-inline' 'self' vscode-file: vscode-webview-resource: blob:; ` +
	`img-src 'self' data: blob: https:; ` +
	`font-src 'self' data: blob:; ` +
	`connect-src 'self' vscode-file: vscode-webview-resource: https: blob: data:;">${Marker}`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "RewriteWebviewShellCSP",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		if (!CSPMetaPattern.test(Source)) return { Kind: "Unchanged" };

		const Next = Source.replace(CSPMetaPattern, ReplacementMeta);

		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
