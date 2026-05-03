const d = "/* __LAND_WORKER_URLS_REWRITTEN__ */",
	c =
		/new URL\(\s*[`'"]([^`'"]+(?:WorkerMain\.tsx?(?:\?[^`'"]*)?|Iframe\.html))[`'"]\s*,\s*import\.meta\.url\s*\)/g,
	m = {
		Kind: "Transform",
		Name: "RewriteWorkerURLs",
		Match: ({ Path: e }) =>
			/\/vs\/.*\.js$/.test(e) && !/\.d\.ts\.map$/.test(e),
		Transform({ Path: e, Source: t }) {
			if (t.includes(d)) return { Kind: "Unchanged" };
			if (!c.test(t)) return { Kind: "Unchanged" };
			c.lastIndex = 0;
			const f = e.split("/").slice(0, -1).join("/"),
				a = t.replace(c, (u, i) => {
					const l = i.indexOf("?");
					let n = l >= 0 ? i.slice(0, l) : i;
					n.endsWith(".ts")
						? (n = n.slice(0, -3) + ".js")
						: n.endsWith(".tsx") && (n = n.slice(0, -4) + ".js");
					const p = (f + "/" + n).split("/"),
						r = [];
					for (const s of p)
						if (!(s === "" || s === ".")) {
							if (s === "..") {
								r.pop();
								continue;
							}
							r.push(s);
						}
					let o = r.join("/");
					return (
						(o = o.replace(
							/^.*?\/Target\/Microsoft\/VSCode\//,
							"",
						)),
						`new URL("/Static/Application/${o}", location.origin)`
					);
				});
			return a === t
				? { Kind: "Unchanged" }
				: {
						Kind: "Rewrite",
						Source:
							d +
							`
` +
							a,
					};
		},
	};
var g = m;
export { g as default };
