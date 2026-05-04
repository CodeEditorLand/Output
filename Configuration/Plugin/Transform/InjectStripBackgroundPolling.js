var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import StripBackgroundPolling, {
  Marker
} from "../Polyfill/StripBackgroundPolling.js";
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
var InjectStripBackgroundPolling_default = Plugin;
export {
  InjectStripBackgroundPolling_default as default
};
//# sourceMappingURL=InjectStripBackgroundPolling.js.map
