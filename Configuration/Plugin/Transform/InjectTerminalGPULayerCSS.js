import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_TERMINAL_GPU_LAYER__";
const StylesheetPath = fileURLToPath(
	new URL(
		"../../../Source/Asset/Style/TerminalGPULayer.css",
		import.meta.url,
	),
);
const InjectedCSS = "\n" + (await readFile(StylesheetPath, "utf8"));
const PathRegex = /workbench\/contrib\/terminal\/browser\/media\/[^/]+\.css$/;
const Plugin = {
	Kind: "Transform",
	Name: "InjectTerminalGPULayerCSS",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}
		return {
			Kind: "Rewrite",
			Source: Source + InjectedCSS,
		};
	},
};
var InjectTerminalGPULayerCSS_default = Plugin;
export { InjectTerminalGPULayerCSS_default as default };
//# sourceMappingURL=InjectTerminalGPULayerCSS.js.map
