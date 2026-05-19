/**
 * InjectWebviewBlobUrlRewrite — rewrite `vscode-file://` and
 * `vscode-webview-resource://` asset URLs in the webview inner-iframe's
 * rendered HTML to `blob:` URLs fetched via the outer shell's `fetch()`.
 *
 * ## Why this is needed
 *
 * Roo Code (and every other extension webview that ships a React/Vite
 * bundle) delivers its HTML to the inner `<iframe>` via
 * `contentDocument.write(newDocument)`. That HTML contains `<script
 * type="module" src="vscode-file://vscode-app/...">` and `<link
 * rel="stylesheet" href="vscode-file://...">` tags.
 *
 * In WKWebView, the inner iframe is sandboxed under the
 * `vscode-webview://` custom protocol. WKWebView's security model
 * silently blocks `<script src>` and `<link href>` loads that cross
 * from a custom protocol origin to a different custom protocol
 * (`vscode-file://`). The scripts are never executed, the React bundle
 * never initialises, and the extension panel stays blank.
 *
 * The outer shell (`pre/index.html`) runs under a context where
 * Mountain's scheme handler has already registered
 * `vscode-file://` and `vscode-webview-resource://` as navigable
 * origins. `fetch()` from that context resolves them correctly.
 *
 * This transform injects a script into `pre/index.html` that:
 *
 * 1. Intercepts the `hostMessaging.onMessage('content', …)` path
 *    **before** `toContentHtml()` is called, by wrapping
 *    `contentDocument.write()` on the inner frame.
 * 2. Parses the HTML string with `DOMParser`.
 * 3. For every `<script src>` and `<link href>` that points at a
 *    `vscode-file://` or `vscode-webview-resource://` URL, fetches
 *    the bytes from the outer shell's context and creates a `blob:`
 *    URL via `URL.createObjectURL()`.
 * 4. Replaces the original `src`/`href` attribute with the blob URL.
 * 5. Passes the rewritten HTML string to the original
 *    `contentDocument.write()` call.
 *
 * Blob URLs are cached by original URL for the lifetime of the outer
 * shell so repeated `setHtml()` calls (e.g. after an extension reload)
 * don't re-fetch unchanged assets.
 *
 * ## Ordering
 *
 * Must run **after** `PatchWebviewIframeServiceWorker` (which disables
 * the SW and soft-fails the hash check) and **before**
 * `RewriteWebviewShellCSP` (which loosens the CSP — the blob: URLs
 * must already be present so the CSP `script-src blob:` directive
 * covers them). The pipeline in `Index.ts` places it between those two.
 *
 * ## Idempotency
 *
 * Guarded by the `__LAND_WEBVIEW_BLOB_URL_REWRITE__` HTML comment
 * marker so re-running the transform on an already-patched file is a
 * no-op.
 */

import type { TransformPlugin } from "../../../../../Type.js";

const PathRegex =
	/\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

const Marker = "<!-- __LAND_WEBVIEW_BLOB_URL_REWRITE__ -->";

/**
 * The blob-URL rewrite script is injected into `pre/index.html`
 * immediately before the closing `</body>` tag.
 *
 * It wraps `Document.prototype.write` on the inner iframe's
 * `contentDocument` at the point where the outer shell calls
 * `onFrameLoaded(contentDocument)`. The wrapper intercepts every
 * `write(html)` call, rewrites all `vscode-file://` and
 * `vscode-webview-resource://` `src`/`href` attributes to `blob:`
 * URLs fetched from the outer shell's privileged context, then
 * forwards the rewritten HTML to the original `write`.
 *
 * A module-level `Map` caches blob URLs by original URL so repeated
 * `setHtml()` calls (extension reload, panel re-open) do not
 * re-fetch unchanged assets.
 */
const BlobRewriteScript = `${Marker}
<script>
/* __LAND_WEBVIEW_BLOB_URL_REWRITE_SCRIPT__ */
(function installLandBlobUrlRewrite() {
	if (window.__LAND_BLOB_REWRITE_INSTALLED__) { return; }
	window.__LAND_BLOB_REWRITE_INSTALLED__ = true;

	/** @type {Map<string, string>} */
	var _cache = new Map();

	var VSCODE_SCHEMES = ['vscode-file://', 'vscode-webview-resource://'];

	/**
	 * Returns true when the URL needs to be rewritten to a blob: URL.
	 * @param {string|null} url
	 * @returns {boolean}
	 */
	function needsRewrite(url) {
		if (!url) { return false; }
		for (var i = 0; i < VSCODE_SCHEMES.length; i++) {
			if (url.indexOf(VSCODE_SCHEMES[i]) === 0) { return true; }
		}
		return false;
	}

	/**
	 * Fetch \`url\` from the outer shell's privileged context and return
	 * a stable \`blob:\` URL for it. Resolves to the original URL on
	 * fetch failure so the inner frame can still attempt the load
	 * (useful for diagnosing which assets are missing vs. blocked).
	 * @param {string} url
	 * @returns {Promise<string>}
	 */
	async function toBlobUrl(url) {
		if (_cache.has(url)) { return _cache.get(url); }
		try {
			var resp = await fetch(url, { credentials: 'include' });
			if (!resp.ok) {
				if (typeof DEBUG_WV === 'function') {
					DEBUG_WV('BLOB_REWRITE_FETCH_FAIL', { url: url, status: resp.status });
				}
				return url;
			}
			var blob = await resp.blob();
			var blobUrl = URL.createObjectURL(blob);
			_cache.set(url, blobUrl);
			if (typeof DEBUG_WV === 'function') {
				DEBUG_WV('BLOB_REWRITE_OK', { url: url.slice(0, 120), blobUrl: blobUrl.slice(0, 60) });
			}
			return blobUrl;
		} catch (err) {
			if (typeof DEBUG_WV === 'function') {
				DEBUG_WV('BLOB_REWRITE_ERROR', { url: url.slice(0, 120), err: String(err) });
			}
			return url;
		}
	}

	/**
	 * Parse \`html\` with DOMParser, rewrite every vscode-file:// /
	 * vscode-webview-resource:// \`src\`/\`href\` attribute to a blob: URL,
	 * and return the serialised outer HTML of the rewritten document.
	 * @param {string} html
	 * @returns {Promise<string>}
	 */
	async function rewriteHtml(html) {
		if (!needsRewriteHtml(html)) { return html; }
		var parser = new DOMParser();
		var doc = parser.parseFromString(html, 'text/html');
		var tasks = [];

		var scripts = doc.querySelectorAll('script[src]');
		for (var i = 0; i < scripts.length; i++) {
			(function(el) {
				var src = el.getAttribute('src');
				if (needsRewrite(src)) {
					tasks.push(toBlobUrl(src).then(function(blob) { el.setAttribute('src', blob); }));
				}
			})(scripts[i]);
		}

		var links = doc.querySelectorAll('link[href]');
		for (var j = 0; j < links.length; j++) {
			(function(el) {
				var href = el.getAttribute('href');
				if (needsRewrite(href)) {
					tasks.push(toBlobUrl(href).then(function(blob) { el.setAttribute('href', blob); }));
				}
			})(links[j]);
		}

		if (tasks.length === 0) { return html; }

		await Promise.all(tasks);

		if (typeof DEBUG_WV === 'function') {
			DEBUG_WV('BLOB_REWRITE_COMPLETE', { rewrote: tasks.length });
		}

		return doc.documentElement.outerHTML;
	}

	/**
	 * Quick pre-check: skip DOMParser allocation entirely when the HTML
	 * string contains no vscode-file:// or vscode-webview-resource://
	 * substrings at all.
	 * @param {string} html
	 * @returns {boolean}
	 */
	function needsRewriteHtml(html) {
		for (var i = 0; i < VSCODE_SCHEMES.length; i++) {
			if (html.indexOf(VSCODE_SCHEMES[i]) !== -1) { return true; }
		}
		return false;
	}

	// -----------------------------------------------------------------------
	// Intercept contentDocument.write on the inner iframe.
	//
	// The outer shell calls onFrameLoaded(contentDocument) after the inner
	// frame's fake.html has loaded. Inside onFrameLoaded, it calls
	// contentDocument.write(newDocument) to inject the extension HTML.
	// We wrap Document.prototype.write so that when the inner frame's
	// document.write is called with HTML that contains vscode-file:// URLs,
	// we rewrite them to blob: URLs first.
	//
	// We use a property descriptor on the prototype so the wrapper applies
	// to every Document instance created in this window context, including
	// the inner iframe's contentDocument.
	// -----------------------------------------------------------------------
	var _origWrite = Document.prototype.write;

	Document.prototype.write = function landBlobRewriteWrite(html) {
		var self = this;
		if (typeof html === 'string' && needsRewriteHtml(html)) {
			// Async: rewrite then write. We must close the document after
			// writing to flush the parser, matching what the original sync
			// write + close sequence does.
			rewriteHtml(html).then(function(rewritten) {
				if (typeof DEBUG_WV === 'function') {
					DEBUG_WV('INNER_WRITE_BLOB', { origLen: html.length, newLen: rewritten.length });
				}
				_origWrite.call(self, rewritten);
				try { self.close(); } catch (_) {}
			}).catch(function(err) {
				if (typeof DEBUG_WV === 'function') {
					DEBUG_WV('INNER_WRITE_BLOB_ERR', { err: String(err) });
				}
				// Fall back to original HTML on error
				_origWrite.call(self, html);
				try { self.close(); } catch (_) {}
			});
			// Return immediately; the async path handles the write.
			// The inner frame will be in a loading state until the
			// promise resolves, which is fine — the extension's module
			// scripts won't execute until the document is closed anyway.
			return;
		}
		return _origWrite.apply(this, arguments);
	};

	if (typeof DEBUG_WV === 'function') {
		DEBUG_WV('BLOB_REWRITE_INSTALLED', { schemes: VSCODE_SCHEMES });
	}
})();
</script>`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectWebviewBlobUrlRewrite",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}

		const InsertBefore = "</body>";
		const Idx = Source.lastIndexOf(InsertBefore);
		if (Idx < 0) {
			return { Kind: "Unchanged" };
		}

		const Next =
			Source.slice(0, Idx) +
			"\n" +
			BlobRewriteScript +
			"\n" +
			Source.slice(Idx);

		return { Kind: "Rewrite", Source: Next };
	},
};

export default Plugin;
