/**
 * Strip VS Code's recurring background polls (telemetry flush,
 * settings sync, update check, marketplace recommendations, etc.)
 * at the `setInterval` / long `setTimeout` level via a stack-trace
 * deny match.
 *
 * Body lives in `Polyfill/StripBackgroundPolling.ts` (type-checked).
 * Idempotent. Marker `__LAND_STRIP_BACKGROUND_POLLING__`.
 */

import type { TransformPlugin } from "../Type.js";

import StripBackgroundPolling, { Marker } from "../Polyfill/StripBackgroundPolling.js";

const Polyfill = `\n/* ${Marker} */\n(${StripBackgroundPolling.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectStripBackgroundPolling",
	Match: ({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
