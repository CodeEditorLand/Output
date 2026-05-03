/**
 * Establish a deterministic z-index hierarchy across the workbench's
 * parts so a sibling that picked up a transform / opacity stacking
 * context can't accidentally hide the activity bar, sidebar, panel
 * resize handle, status bar progress badges, or the command-center
 * quick-pick dropdown.
 *
 * Body lives in `Polyfill/PartZIndexCSS.ts` (type-checked source).
 * This transform imports the compiled function and uses `.toString()`
 * to recover the prepend body. Behaviour identical to the previous
 * string-literal embedded form.
 *
 * Idempotent. Marker `__LAND_PART_ZINDEX__`.
 */

import PartZIndexCSS, { Marker } from "../Polyfill/PartZIndexCSS.js";
import type { TransformPlugin } from "../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${PartZIndexCSS.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectPartZIndexCSS",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
