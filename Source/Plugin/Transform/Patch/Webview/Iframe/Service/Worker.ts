/**
 * Patch the webview iframe shell (`vs/workbench/contrib/webview/browser/pre/
 * index.html`) so its bootstrap script doesn't strand the iframe before it
 * gets a chance to render extension HTML.
 *
 * Two narrow rewrites:
 *
 * 1. Default `disableServiceWorker = true`.
 *
 *    The iframe's bootstrap registers a service worker at module-eval time:
 *
 *    ```js
 *    navigator.serviceWorker.register(`service-worker.js?v=...&...`, {
 *        type: 'module', updateViaCache: 'none'
 *    })
 *    ```
 *
 *    Under Tauri 2 + WKWebView the iframe is loaded via the CUSTOM
 *    protocol `vscode-webview://<hash>/index.html`. WKWebView does not
 *    allow service worker registration on non-`https`/`http` origins, so
 *    the registration promise REJECTS. The iframe's
 *    `hostMessaging.onMessage('content', …)` handler unconditionally
 *    awaits the resulting `workerReady` Promise - when it rejects, the
 *    handler posts a `fatal-error` to the host and returns without
 *    rendering the html. The user sees the bare `pre/index.html` chrome
 *    forever.
 *
 *    Stock VS Code's own `disableServiceWorker` querystring parameter
 *    exists for exactly this scenario but no consumer in Land's path sets
 *    it. Patching the constant default to `true` is the smallest change
 *    that unblocks every Tauri webview without forking the workbench.
 *
 * 2. Soft-fail the parentOrigin hash check.
 *
 *    `signalReady()` validates that the iframe's `location.hostname` is
 *    `sha256({parentOrigin, salt: webviewOrigin})` in base32. The compute
 *    uses `crypto.subtle.digest`. If `crypto.subtle` rejects (a known
 *    failure mode on some custom-protocol contexts in WKWebView) or the
 *    hash mismatches (e.g. the workbench computed it under one origin and
 *    Tauri serves the iframe under a slightly different one), the bootstrap
 *    THROWS and never posts `webview-ready` to the parent. The parent's
 *    `webviewElement` never gets a `MessagePort`, every `setHtml(html)`
 *    call enqueues into `_state.pendingMessages` forever, and the panel
 *    sits empty.
 *
 *    Replace the strict `throw new Error(...)` with a `start(parentOrigin)`
 *    fallthrough so the iframe always signals ready. Land's webview
 *    pipeline is the only path that produces these iframes; there is no
 *    untrusted parent to defend against, and the hash compute is purely
 *    a defence-in-depth measure for browser-hosted VS Code that doesn't
 *    apply to the Tauri shell.
 *
 * Idempotent via the `__LAND_DISABLE_WEBVIEW_SW__` marker comment.
 */

import type { TransformPlugin } from "../../../../../Type.js";

const Marker = "__LAND_DISABLE_WEBVIEW_SW__";

const ServiceWorkerExpression =
	"const disableServiceWorker = searchParams.has('disableServiceWorker');";

const ServiceWorkerReplacement = `/* ${Marker} */ const disableServiceWorker = true; void searchParams;`;

// Match the closing `throw` block at the end of `signalReady()`'s
// hostname-validation block. Stock VS Code:
//
//     if (hostname === parentOriginHash || hostname.startsWith(parentOriginHash + '.')) {
//         // validation succeeded!
//         return start(parentOrigin);
//     }
//
//     throw new Error(`Expected '${parentOriginHash}' as hostname or subdomain!`);
//
// We replace the trailing `throw` with a soft `start(parentOrigin)` so a
// hash mismatch on the Tauri custom protocol still completes the
// handshake. The success branch above is unchanged so on supported
// origins behaviour stays identical.
const HashThrowExpression =
	"throw new Error(`Expected '${parentOriginHash}' as hostname or subdomain!`);";

const HashThrowReplacement = `/* ${Marker} hash-soft */ console.warn(\`[Land] Webview parentOrigin hash mismatch (\${hostname} vs \${parentOriginHash}); proceeding anyway under Tauri\`); return start(parentOrigin);`;

// The crypto.subtle availability check throws unconditionally if the
// API is missing. WKWebView on `vscode-webview://` may report it
// undefined depending on context; treat its absence as non-fatal so the
// hostname check can still make a best-effort decision.
const CryptoCheckExpression =
	"throw new Error(`'crypto.subtle' is not available so webviews will not work. This is likely because the editor is not running in a secure context (https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).`);";

const CryptoCheckReplacement = `/* ${Marker} crypto-soft */ console.warn(\`[Land] crypto.subtle unavailable; skipping parentOrigin hash check\`); return start(parentOrigin);`;

const PathRegex =
	/\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "PatchWebviewIframeServiceWorker",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}
		let Next = Source;
		if (Next.includes(ServiceWorkerExpression)) {
			Next = Next.replace(
				ServiceWorkerExpression,
				ServiceWorkerReplacement,
			);
		}
		if (Next.includes(HashThrowExpression)) {
			Next = Next.replace(HashThrowExpression, HashThrowReplacement);
		}
		if (Next.includes(CryptoCheckExpression)) {
			Next = Next.replace(CryptoCheckExpression, CryptoCheckReplacement);
		}
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
