const n = "__LAND_DISABLE_WEBVIEW_SW__",

	s =
		"const disableServiceWorker = searchParams.has('disableServiceWorker');",

	a = `/* ${n} */ const disableServiceWorker = true; void searchParams;`,

	t =
		"throw new Error(`Expected '${parentOriginHash}' as hostname or subdomain!`);",

	o = `/* ${n} hash-soft */ console.warn(\`[Land] Webview parentOrigin hash mismatch (\${hostname} vs \${parentOriginHash}); proceeding anyway under Tauri\`); return start(parentOrigin);`,

	i =
		"throw new Error(`'crypto.subtle' is not available so webviews will not work. This is likely because the editor is not running in a secure context (https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).`);",

	c = `/* ${n} crypto-soft */ console.warn(\`[Land] crypto.subtle unavailable; skipping parentOrigin hash check\`); return start(parentOrigin);`,

	l = /\/vs\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/,

	h = {

		Kind: "Transform",

		Name: "PatchWebviewIframeServiceWorker",

		Match: ({ Path: r }) => l.test(r),

		Transform({ Source: r }) {

			if (r.includes(n)) return { Kind: "Unchanged" };

			let e = r;

			return (
				e.includes(s) && (e = e.replace(s, a)),

				e.includes(t) && (e = e.replace(t, o)),

				e.includes(i) && (e = e.replace(i, c)),

				e === r ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: e }
			);
		},
	};

var p = h;

export { p as default };
