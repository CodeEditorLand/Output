const r = /\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/,

	n = "<!-- __LAND_WEBVIEW_SHELL_CSP__ -->",

	s =
		/<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*\/?\s*>/,
	i = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'self' blob:; frame-src 'self' vscode-webview:; style-src 'unsafe-inline' 'self'; img-src 'self' data: blob: https:; font-src 'self' data: blob:; connect-src 'self' https: blob: data:;">${n}`,

	c = {

		Kind: "Transform",

		Name: "RewriteWebviewShellCSP",

		Match: ({ Path: e }) => r.test(e),

		Transform({ Source: e }) {

			if (e.includes(n)) return { Kind: "Unchanged" };

			if (!s.test(e)) return { Kind: "Unchanged" };

			const t = e.replace(s, i);

			return t === e
				? { Kind: "Unchanged" }

				: { Kind: "Rewrite", Source: t };
		},
	};

var a = c;

export { a as default };
