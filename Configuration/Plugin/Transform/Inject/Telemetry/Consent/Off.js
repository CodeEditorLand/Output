import TelemetryConsentOff, {
	Marker,
} from "../../../../Polyfill/Telemetry/Consent/Off.js";

var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });

const Polyfill = `
/* ${Marker} */
(${TelemetryConsentOff.toString()})();
`;
const Plugin = {
	Kind: "Transform",
	Name: "InjectTelemetryConsentOff",
	Match: /* @__PURE__ */ __name(
		({ Path }) =>
			Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
		"Match",
	),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};
var Off_default = Plugin;
export { Off_default as default };
//# sourceMappingURL=Off.js.map
