var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import EagerLifecyclePhase, { Marker } from "../Polyfill/EagerLifecyclePhase.js";
const Polyfill = `
/* ${Marker} */
(${EagerLifecyclePhase.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectEagerLifecyclePhase",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectEagerLifecyclePhase_default = Plugin;
export {
  InjectEagerLifecyclePhase_default as default
};
//# sourceMappingURL=InjectEagerLifecyclePhase.js.map
