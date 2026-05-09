import n, { Marker as r } from "../../../../Polyfill/Eager/Lifecycle/Phase.js";

const o = `
/* ${r} */
(${n.toString()})();

`,
	i = {

		Kind: "Transform",

		Name: "InjectEagerLifecyclePhase",

		Match: ({ Path: e }) =>
			e.endsWith("vs/code/electron-browser/workbench/workbench.js"),

		Transform({ Source: e }) {

			return e.includes(r)
				? { Kind: "Unchanged" }

				: { Kind: "Rewrite", Source: o + e };
		},
	};

var c = i;

export { c as default };
