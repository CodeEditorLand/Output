var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import TelemetryConsentOff, { Marker } from "../Polyfill/TelemetryConsentOff.js";
const Polyfill = `
/* ${Marker} */
(${TelemetryConsentOff.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectTelemetryConsentOff",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectTelemetryConsentOff_default = Plugin;
export {
  InjectTelemetryConsentOff_default as default
};
//# sourceMappingURL=InjectTelemetryConsentOff.js.map
