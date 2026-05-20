import EagerIdleValue from "../../../../Polyfill/Eager/Idle/Value.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_EAGER_IDLE_VALUE__";
const Polyfill = `
/* ${Marker} */
(${EagerIdleValue.toString()})();
`;
const Plugin = {
	Kind: "Transform",
	Name: "InjectEagerIdleValue",
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
var Value_default = Plugin;
export { Value_default as default };
//# sourceMappingURL=Value.js.map
