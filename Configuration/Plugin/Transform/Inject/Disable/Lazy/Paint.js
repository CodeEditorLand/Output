import DisableLazyPaint, {
	Marker,
} from "../../../../Polyfill/Disable/Lazy/Paint.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Polyfill = `
/* ${Marker} */
(${DisableLazyPaint.toString()})();
`;
const Plugin = {
	Kind: "Transform",
	Name: "InjectDisableLazyPaint",
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
var Paint_default = Plugin;
export { Paint_default as default };
//# sourceMappingURL=Paint.js.map
