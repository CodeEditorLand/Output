/**
 * Force the workbench's `ILifecycleService.phase` from Starting (1)
 * directly to Eventually (4) at boot, rather than waiting on the
 * stock 2-5 s timer.
 *
 * Body lives in `Polyfill/EagerLifecyclePhase.ts` (type-checked).
 * Idempotent. Marker `__LAND_EAGER_LIFECYCLE_PHASE__`.
 */

import type { TransformPlugin } from "../Type.js";

import EagerLifecyclePhase, { Marker } from "../Polyfill/EagerLifecyclePhase.js";

const Polyfill = `\n/* ${Marker} */\n(${EagerLifecyclePhase.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectEagerLifecyclePhase",
	Match: ({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
