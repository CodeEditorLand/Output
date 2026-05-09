const s = (e, a) => ({
	name: `output:${e.Name}`,
	setup(t) {
		t.onLoad({ filter: /\.(m?js|cjs|ts|tsx|html)$/ }, async (o) => {
			const r = a.Roots.find((d) => o.path.startsWith(d.Path));
			if (
				!r ||
				!e.Match({ Path: o.path, Role: r.Role }) ||
				(e.Enabled && !e.Enabled())
			)
				return null;
			const { readFile: l } = await import("node:fs/promises"),
				i = await l(o.path, "utf-8"),
				n = await e.Transform({
					Path: o.path,
					Source: i,
					Role: r.Role,
				});
			return n.Kind === "Unchanged"
				? null
				: {
						contents: n.Source,
						loader: o.path.endsWith(".html") ? "text" : "js",
					};
		});
	},
});

var y = {};

export { s as AsEsbuildPlugin, y as default };
