import r, { Marker as e } from "../../../../Polyfill/Telemetry/Consent/Off.js";

const o = `
/* ${e} */
(${r.toString()})();

`,
	t = {
		Kind: "Transform",

		Name: "InjectTelemetryConsentOff",

		Match: ({ Path: n }) =>
			n.endsWith("vs/code/electron-browser/workbench/workbench.js"),

		Transform({ Source: n }) {
			return n.includes(e)
				? { Kind: "Unchanged" }
				: { Kind: "Rewrite", Source: o + n };
		},
	};

var s = t;

export { s as default };
