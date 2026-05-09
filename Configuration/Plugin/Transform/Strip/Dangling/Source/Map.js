import { stat as e } from "node:fs/promises";

const r = /\n?\/\/[#@][ \t]*sourceMappingURL=[^\n]*\n?$/,

	i = async (n) => {

		try {

			return (await e(`${n}.map`), !0);
		} catch {

			return !1;
		}
	},

	s = {

		Kind: "Transform",

		Name: "StripDanglingSourceMap",

		Match: ({ Path: n, Role: t }) => t === "app" && /\.js$/.test(n),

		async Transform({ Path: n, Source: t }) {

			if (!r.test(t)) return { Kind: "Unchanged" };

			if (await i(n)) return { Kind: "Unchanged" };

			r.lastIndex = 0;

			const a = t.replace(
				r,

				`
`,
			);
			return a === t
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: a };
		},
	};
var c = s;
export { c as default };
