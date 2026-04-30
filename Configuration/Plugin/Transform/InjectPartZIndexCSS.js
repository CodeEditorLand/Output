var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import PartZIndexCSS, { Marker } from "../Polyfill/PartZIndexCSS.js";
const Polyfill = `
/* ${Marker} */
(${PartZIndexCSS.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectPartZIndexCSS",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectPartZIndexCSS_default = Plugin;
export {
  InjectPartZIndexCSS_default as default
};
//# sourceMappingURL=InjectPartZIndexCSS.js.map
