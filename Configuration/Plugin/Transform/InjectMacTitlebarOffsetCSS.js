import e, { Marker as n } from "../Polyfill/MacTitlebarOffsetCSS.js";

const t = `
/* ${n} */
(${e.toString()})();
`,
	o = {
		Kind: "Transform",
		Name: "InjectMacTitlebarOffsetCSS",
		Match: ({ Path: r }) =>
			r.endsWith("vs/code/electron-browser/workbench/workbench.js"),
		Transform({ Source: r }) {
			return r.includes(n)
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: t + r };
		},
	};
var s = o;
export { s as default };
