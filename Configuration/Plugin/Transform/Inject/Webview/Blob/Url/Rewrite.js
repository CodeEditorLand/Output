var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const PathRegex = /\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;

const Marker = "<!-- __LAND_WEBVIEW_BLOB_URL_REWRITE__ -->";

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
			// promise resolves, which is fine \u2014 the extension's module
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

const Plugin = {

  Kind: "Transform",

  Name: "InjectWebviewBlobUrlRewrite",

  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),

  Transform({ Source }) {
    if (Source.includes(Marker)) {
      return { Kind: "Unchanged" };
    }

    const InsertBefore = "</body>";

    const Idx = Source.lastIndexOf(InsertBefore);

    if (Idx < 0) {
      return { Kind: "Unchanged" };
    }

    const Next = Source.slice(0, Idx) + "\n" + BlobRewriteScript + "\n" + Source.slice(Idx);

    return { Kind: "Rewrite", Source: Next };
  }
};

var Rewrite_default = Plugin;

export {
  Rewrite_default as default
};

//# sourceMappingURL=Rewrite.js.map
