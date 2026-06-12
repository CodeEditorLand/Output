/**
 * InjectWebviewBlobUrlRewrite - rewrite `vscode-file://` and
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
 * 1. Wraps `Document.prototype.write` so the inner frame's
 *    `contentDocument.write(html)` stays **synchronous** -
 *    `document.write` is a synchronous API and deferring it breaks
 *    multi-write callers (empty first write, double document-open).
 * 2. Synchronously substitutes every `vscode-file://` /
 *    `vscode-webview-resource://` `src`/`href` URL that already has a
 *    cached `blob:` URL into the HTML string before calling the
 *    original `write`.
 * 3. URLs without a cached blob are fetched **after** the synchronous
 *    write; each resolved asset is patched into the already-written
 *    document - `<link>` gets a live `href` swap, `<script>` is
 *    replaced with a clone carrying the `blob:` `src` so the bytes
 *    actually execute.
 *
 * Blob URLs are cached by original URL for the lifetime of the outer
 * shell so repeated `setHtml()` calls (e.g. after an extension reload)
 * hit the synchronous substitution path and never need the patch pass.
 *
 * ## Ordering
 *
 * Must run **after** `PatchWebviewIframeServiceWorker` (which disables
 * the SW and soft-fails the hash check) and **before**
 * `RewriteWebviewShellCSP` (which loosens the CSP - the blob: URLs
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
 * `onFrameLoaded(contentDocument)`. The wrapper keeps every
 * `write(html)` call synchronous: `vscode-file://` and
 * `vscode-webview-resource://` `src`/`href` URLs with a cached
 * `blob:` URL are substituted into the HTML string before the
 * original `write` runs; uncached URLs are fetched afterwards and
 * patched into the written document (`<link>` href swap, `<script>`
 * node replacement).
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
	 * Surface a blob-fetch failure. Mountain registers scheme handlers
	 * for every entry in VSCODE_SCHEMES, so a failure here means the
	 * outer shell's origin could not reach the handler (e.g. a CORS
	 * rejection) - never swallow it silently.
	 * @param {string} url
	 * @param {Object} detail
	 */
	function warnFetchFailure(url, detail) {
		if (typeof DEBUG_WV === 'function') {
			DEBUG_WV('BLOB_REWRITE_FETCH_FAIL', detail);
		} else if (typeof console !== 'undefined' && console.warn) {
			console.warn('[LandBlobUrlRewrite] fetch failed, falling back to original URL', url, detail);
		}
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
				warnFetchFailure(url, { url: url, status: resp.status });
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
			warnFetchFailure(url, { url: url.slice(0, 120), err: String(err) });
			return url;
		}
	}

	/**
	 * Synchronously substitute every vscode-file:// /
	 * vscode-webview-resource:// \`src\`/\`href\` URL that already has a
	 * cached blob: URL into \`html\`. URLs without a cached blob are
	 * appended to \`pendingOut\` for the post-write patch pass.
	 * @param {string} html
	 * @param {string[]} pendingOut
	 * @returns {string}
	 */
	function rewriteCachedUrls(html, pendingOut) {
		var pattern = /(?:src|href)\\s*=\\s*("|')([^"']+)\\1/g;
		var seen = {};
		var urls = [];
		var match;
		while ((match = pattern.exec(html)) !== null) {
			var url = match[2];
			if (needsRewrite(url) && !seen[url]) {
				seen[url] = true;
				urls.push(url);
			}
		}
		var out = html;
		for (var i = 0; i < urls.length; i++) {
			var cached = _cache.get(urls[i]);
			if (cached) {
				out = out.split(urls[i]).join(cached);
			} else {
				pendingOut.push(urls[i]);
			}
		}
		return out;
	}

	/**
	 * Patch every element in \`doc\` whose \`src\`/\`href\` still points at
	 * \`url\` to \`blobUrl\`. \`<link>\` reloads on a live href swap;
	 * \`<script>\` must be replaced with a clone for the blob to execute
	 * (a src swap on an already-parsed script never re-runs it).
	 * @param {Document} doc
	 * @param {string} url
	 * @param {string} blobUrl
	 */
	function applyBlobUrl(doc, url, blobUrl) {
		var links = doc.querySelectorAll('link[href]');
		for (var i = 0; i < links.length; i++) {
			if (links[i].getAttribute('href') === url) {
				links[i].setAttribute('href', blobUrl);
			}
		}
		var scripts = doc.querySelectorAll('script[src]');
		for (var j = 0; j < scripts.length; j++) {
			var el = scripts[j];
			if (el.getAttribute('src') !== url) { continue; }
			var clone = doc.createElement('script');
			for (var a = 0; a < el.attributes.length; a++) {
				clone.setAttribute(el.attributes[a].name, el.attributes[a].value);
			}
			clone.setAttribute('src', blobUrl);
			if (el.parentNode) { el.parentNode.replaceChild(clone, el); }
		}
	}

	/**
	 * Post-write patch pass: fetch every pending URL and patch the
	 * written document in place once its blob: URL resolves. Runs
	 * after the synchronous write so the write itself is never
	 * deferred and multi-write callers keep a single document-open.
	 * @param {Document} doc
	 * @param {string[]} pendingUrls
	 */
	function patchWrittenDocument(doc, pendingUrls) {
		for (var i = 0; i < pendingUrls.length; i++) {
			(function(url) {
				toBlobUrl(url).then(function(blobUrl) {
					if (blobUrl === url) { return; }
					applyBlobUrl(doc, url, blobUrl);
					if (typeof DEBUG_WV === 'function') {
						DEBUG_WV('BLOB_REWRITE_PATCHED', { url: url.slice(0, 120) });
					}
				});
			})(pendingUrls[i]);
		}
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
			// promise resolves, which is fine - the extension's module
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
