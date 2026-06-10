var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import WorkbenchPaintPrime from "../../../../Polyfill/Workbench/Paint/Prime.js";
const Marker = "__LAND_WORKBENCH_PAINT_PRIME_V2__";
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
var Prime_default = Plugin;
export {
  Prime_default as default
};
//# sourceMappingURL=Prime.js.map
