/**
 * Override `requestIdleCallback` so VS Code's `IdleValue<T>` lazy-
 * init pattern resolves eagerly.
 *
 * Body lives in `Polyfill/EagerIdleValue.ts` (type-checked).
 * Idempotent. Marker `__LAND_EAGER_IDLE_VALUE__`.
 */

import EagerIdleValue, { Marker } from "../Polyfill/EagerIdleValue.js";
import type { TransformPlugin } from "../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${EagerIdleValue.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectEagerIdleValue",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
