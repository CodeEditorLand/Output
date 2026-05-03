import e, { Marker as r } from "../Polyfill/WorkbenchPaintPrime.js";

const o = `
/* ${r} */
(${e.toString()})();
`,
	i = {
		Kind: "Transform",
		Name: "InjectWorkbenchPaintPrime",
		Match: ({ Path: n }) =>
			n.endsWith("vs/code/electron-browser/workbench/workbench.js"),
		Transform({ Source: n }) {
			return n.includes(r)
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: o + n };
		},
	};
var c = i;
export { c as default };
