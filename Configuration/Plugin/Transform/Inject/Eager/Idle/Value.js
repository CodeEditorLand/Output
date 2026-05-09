import n, { Marker as e } from "../../../../Polyfill/Eager/Idle/Value.js";

const o = `
/* ${e} */
(${n.toString()})();

`,
	t = {

		Kind: "Transform",

		Name: "InjectEagerIdleValue",

		Match: ({ Path: r }) =>
			r.endsWith("vs/code/electron-browser/workbench/workbench.js"),

		Transform({ Source: r }) {

			return r.includes(e)
				? { Kind: "Unchanged" }

				: { Kind: "Rewrite", Source: o + r };
		},
	};

var a = t;

export { a as default };
