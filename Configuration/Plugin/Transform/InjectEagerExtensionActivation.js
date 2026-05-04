var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import EagerExtensionActivation, {
  Marker
} from "../Polyfill/EagerExtensionActivation.js";
const Polyfill = `
/* ${Marker} */
(${EagerExtensionActivation.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectEagerExtensionActivation",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectEagerExtensionActivation_default = Plugin;
export {
  InjectEagerExtensionActivation_default as default
};
//# sourceMappingURL=InjectEagerExtensionActivation.js.map
