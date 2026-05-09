/**
 * Force WKWebView's compositor to commit pending layout for the
 * eight workbench part layers at boot and on first interaction.
 *
 * Body lives in `Polyfill/WorkbenchPaintPrime.ts` (type-checked).
 * Idempotent. Marker `__LAND_WORKBENCH_PAINT_PRIME__`.
 */

import WorkbenchPaintPrime, {
	Marker,
} from "../../../../Polyfill/Workbench/Paint/Prime.js";
import type { TransformPlugin } from "../../../../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${WorkbenchPaintPrime.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectWorkbenchPaintPrime",

	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
