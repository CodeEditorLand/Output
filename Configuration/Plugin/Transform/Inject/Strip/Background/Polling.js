import o, {

	Marker as r,
} from "../../../../Polyfill/Strip/Background/Polling.js";

const e = `
/* ${r} */
(${o.toString()})();

`,
	i = {

		Kind: "Transform",

		Name: "InjectStripBackgroundPolling",

		Match: ({ Path: n }) =>
			n.endsWith("vs/code/electron-browser/workbench/workbench.js"),

		Transform({ Source: n }) {

			return n.includes(r)
				? { Kind: "Unchanged" }

				: { Kind: "Rewrite", Source: e + n };
		},
	};

var l = i;

export { l as default };
