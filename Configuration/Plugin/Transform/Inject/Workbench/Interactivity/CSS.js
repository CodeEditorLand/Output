import WorkbenchInteractivityCSS from "../../../../Polyfill/Workbench/Interactivity/CSS.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_WORKBENCH_INTERACTIVITY_CSS_V2__";
const Polyfill = `
/* ${Marker} */
(${WorkbenchInteractivityCSS.toString()})();
`;
const Plugin = {
	Kind: "Transform",
	Name: "InjectWorkbenchInteractivityCSS",
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
var CSS_default = Plugin;
export { CSS_default as default };
//# sourceMappingURL=CSS.js.map
