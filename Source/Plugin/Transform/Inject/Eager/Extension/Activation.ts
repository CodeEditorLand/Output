/**
 * Fire `IExtensionService.activateByEvent("onStartupFinished")` +
 * `activateByEvent("*")` directly at workbench-loaded so extension
 * panels populate immediately.
 *
 * Body lives in `Polyfill/EagerExtensionActivation.ts` (type-checked).
 * Idempotent. Marker `__LAND_EAGER_EXTENSION_ACTIVATION__`.
 */

import EagerExtensionActivation, {

	Marker,
} from "../../../../Polyfill/Eager/Extension/Activation.js";

import type { TransformPlugin } from "../../../../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${EagerExtensionActivation.toString()})();\n`;

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "InjectEagerExtensionActivation",

	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),

	Transform({ Source }) {

		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
