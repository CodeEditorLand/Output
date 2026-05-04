var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import EagerIdleValue, { Marker } from "../Polyfill/EagerIdleValue.js";
const Polyfill = `
/* ${Marker} */
(${EagerIdleValue.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectEagerIdleValue",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectEagerIdleValue_default = Plugin;
export {
  InjectEagerIdleValue_default as default
};
//# sourceMappingURL=InjectEagerIdleValue.js.map
