var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import TelemetryConsentOff from "../../../../Polyfill/Telemetry/Consent/Off.js";

const Marker = "__LAND_TELEMETRY_CONSENT_OFF__";

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

var Off_default = Plugin;

export {
  Off_default as default
};

//# sourceMappingURL=Off.js.map
