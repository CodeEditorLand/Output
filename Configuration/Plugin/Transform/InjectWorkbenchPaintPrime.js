var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import WorkbenchPaintPrime, { Marker } from "../Polyfill/WorkbenchPaintPrime.js";
const Polyfill = `
/* ${Marker} */
(${WorkbenchPaintPrime.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectWorkbenchPaintPrime",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectWorkbenchPaintPrime_default = Plugin;
export {
  InjectWorkbenchPaintPrime_default as default
};
//# sourceMappingURL=InjectWorkbenchPaintPrime.js.map
