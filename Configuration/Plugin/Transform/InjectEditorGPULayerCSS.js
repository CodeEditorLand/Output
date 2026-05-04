import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Marker = "__LAND_EDITOR_GPU_LAYER__";
const StylesheetPath = fileURLToPath(
	new URL("../../../Source/Asset/Style/EditorGPULayer.css", import.meta.url),
);
const InjectedCSS = "\n" + (await readFile(StylesheetPath, "utf8"));
const PathRegex = /editor\/browser\/(?:[^/]+\/)*[^/]+\.css$/;
const Plugin = {
	Kind: "Transform",
	Name: "InjectEditorGPULayerCSS",
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
var InjectEditorGPULayerCSS_default = Plugin;
export { InjectEditorGPULayerCSS_default as default };
//# sourceMappingURL=InjectEditorGPULayerCSS.js.map
