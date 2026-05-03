const s = "/* Land: sandbox attribute stripped",
	o = /\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/,
	a = /\/workbench\/contrib\/webview\/browser\/webviewElement\.js$/,
	i =
		/newFrame\.setAttribute\(\s*['"]sandbox['"]\s*,\s*Array\.from\(sandboxRules\)\.join\(\s*['"] ['"]\s*\)\s*\);/,
	d = /element\.sandbox\.add\([^)]*'allow-scripts'[^)]*\);/,
	b = `${s} - WKWebView blocks custom-protocol main-resource loads from sandboxed iframes. */`,
	c = {
		Kind: "Transform",
		Name: "StripWebviewIframeSandbox",
		Match: ({ Path: e }) => o.test(e) || a.test(e),
		Transform({ Path: e, Source: n }) {
			if (n.includes(s)) return { Kind: "Unchanged" };
			const t = o.test(e) ? i : d;
			if (!t.test(n)) return { Kind: "Unchanged" };
			const r = n.replace(t, b);
			return r === n
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: r };
		},
	};
var l = c;
export { l as default };
