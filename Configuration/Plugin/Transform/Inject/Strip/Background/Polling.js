var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import StripBackgroundPolling from "../../../../Polyfill/Strip/Background/Polling.js";
const Marker = "__LAND_STRIP_BACKGROUND_POLLING__";
const Polyfill = `
/* ${Marker} */
(${StripBackgroundPolling.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectStripBackgroundPolling",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var Polling_default = Plugin;
export {
  Polling_default as default
};
//# sourceMappingURL=Polling.js.map
