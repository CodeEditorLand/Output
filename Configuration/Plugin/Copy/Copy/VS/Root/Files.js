import { join as o } from "node:path";

const d = [
		"nls.keys.json",

		"nls.messages.js",

		"nls.messages.json",

		"nls.metadata.json",

		"bootstrap-esm.js",

		"bootstrap-import.js",

		"bootstrap-meta.js",
	],
	y = {
		"nls.messages.js":
			"globalThis._VSCODE_NLS_MESSAGES=globalThis._VSCODE_NLS_MESSAGES??[];export{};",

		"nls.keys.json": "[]",

		"nls.messages.json": "[]",

		"nls.metadata.json": "{}",
	},
	c = (n) => {
		const s = y[n];

		return s ? `data:text/javascript,${s}` : null;
	},
	g = (n) => {
		if (typeof n == "boolean") return n;

		const s = process.env.NODE_ENV;

		return s === "production"
			? !1
			: s === "development"
				? !0
				: process.env.TAURI_ENV_DEBUG === "true";
	},
	u = (n, s, e, r, a) => {
		const i = a ? r : e,
			l = a ? e : r,
			t = [
				o(s, n),

				o(s, "vs", n),

				o(i, n),

				o(i, "vs", n),

				o(l, n),

				o(l, "vs", n),
			],
			p = c(n);

		return (p && t.push(p), t);
	},
	m = ({
		OutputRoot: n,
		DependencyOutBuild: s,
		DependencyOut: e,
		Destination: r,
		Files: a = d,
		OnDevelopment: i,
	}) => {
		const l = g(i);

		return {
			Kind: "Copy",

			Name: "CopyVSRootFiles",

			Entries: a.map((t) => ({ From: u(t, n, s, e, l), To: o(r, t) })),
		};
	};

var j = m;

export { m as CopyVSRootFiles, j as default };
