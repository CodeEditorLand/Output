const n = /import\s*(['"])([^'"]+\.css)\1\s*;?/g,
	a = {
		Kind: "Transform",
		Name: "StripCSSImport",
		Match: ({ Path: t, Role: r }) =>
			(r === "app" || r === "out" || r === "out-build") &&
			/\.js$/.test(t),
		Transform({ Source: t }) {
			return (
				(n.lastIndex = 0),
				n.test(t)
					? ((n.lastIndex = 0),
						{
							Kind: "Rewrite",
							Source: t.replace(
								n,
								(r, s, e) =>
									`window._LOAD_CSS_WORKER?.(new URL("${e}",import.meta.url).pathname);`,
							),
						})
					: { Kind: "Unchanged" }
			);
		},
	};
var o = a;
export { o as default };
