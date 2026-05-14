import EagerLifecyclePhase from "../../../../Polyfill/Eager/Lifecycle/Phase.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_EAGER_LIFECYCLE_PHASE__";
const Polyfill = `
/* ${Marker} */
(${EagerLifecyclePhase.toString()})();
`;
const Plugin = {
	Kind: "Transform",
	Name: "InjectEagerLifecyclePhase",
	Match: /* @__PURE__ */ __name(
		({ Path }) =>
			Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
		"Match",
	),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};
var Phase_default = Plugin;
export { Phase_default as default };
//# sourceMappingURL=Phase.js.map
