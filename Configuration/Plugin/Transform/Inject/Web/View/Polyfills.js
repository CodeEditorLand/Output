import e, { Marker as r } from "../../../../Polyfill/Web/View/Polyfills.js";

const o = `
/* ${r} */
(${e.toString()})();

`,
	i = {

		Kind: "Transform",

		Name: "InjectWebViewPolyfills",

		Match: ({ Path: n }) =>
			n.endsWith("vs/code/electron-browser/workbench/workbench.js"),

		Transform({ Source: n }) {

			return n.includes(r)
				? { Kind: "Unchanged" }

				: { Kind: "Rewrite", Source: o + n };
		},
	};

var l = i;

export { l as default };
