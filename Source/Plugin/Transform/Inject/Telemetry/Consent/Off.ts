/**
 * Pre-bake `telemetry.telemetryLevel: "off"` and friends into the
 * workbench bootstrap so VS Code's TelemetryService starts in
 * already-disabled state and never opens a network connection.
 *
 * Body lives in `Polyfill/TelemetryConsentOff.ts` (type-checked).
 * Idempotent. Marker `__LAND_TELEMETRY_CONSENT_OFF__`.
 */

import TelemetryConsentOff, {
	Marker,
} from "../../../../Polyfill/Telemetry/Consent/Off.js";
import type { TransformPlugin } from "../../../../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${TelemetryConsentOff.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectTelemetryConsentOff",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
