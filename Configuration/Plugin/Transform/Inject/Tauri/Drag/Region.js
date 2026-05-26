var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import TauriDragRegion from "../../../../Polyfill/Tauri/Drag/Region.js";
const Marker = "__LAND_TAURI_DRAG_REGION__";
const Polyfill = `
/* ${Marker} */
(${TauriDragRegion.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectTauriDragRegion",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var Region_default = Plugin;
export {
  Region_default as default
};
//# sourceMappingURL=Region.js.map
