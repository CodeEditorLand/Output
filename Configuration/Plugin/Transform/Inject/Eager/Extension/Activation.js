import EagerExtensionActivation from "../../../../Polyfill/Eager/Extension/Activation.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_EAGER_EXTENSION_ACTIVATION__";
const Polyfill = `
/* ${Marker} */
(${EagerExtensionActivation.toString()})();
`;
const Plugin = {
	Kind: "Transform",
	Name: "InjectEagerExtensionActivation",
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
var Activation_default = Plugin;
export { Activation_default as default };
//# sourceMappingURL=Activation.js.map
