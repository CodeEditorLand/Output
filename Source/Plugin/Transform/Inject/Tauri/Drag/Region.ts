/**
 * Stamp `data-tauri-drag-region` on workbench titlebar drag regions so
 * Tauri 2's overlay-titlebar window-drag hit-test picks them up.
 *
 * Body lives in `Polyfill/Tauri/Drag/Region.ts` (type-checked source).
 * This transform imports the compiled function and uses `.toString()`
 * to recover the prepend body. Always active - drag wiring is needed
 * on every OS, not a perf optimisation.
 *
 * Idempotent. Marker `__LAND_TAURI_DRAG_REGION__`.
 */

import TauriDragRegion from "../../../../../Polyfill/Tauri/Drag/Region.js";
import type { TransformPlugin } from "../../../../../Type.js";

const Marker = "__LAND_TAURI_DRAG_REGION__";

const Polyfill = `\n/* ${Marker} */\n(${TauriDragRegion.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectTauriDragRegion",

	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
