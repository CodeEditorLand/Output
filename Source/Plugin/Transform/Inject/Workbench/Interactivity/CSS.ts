/**
 * Force workbench parts/panels/composites to be interactive on
 * `display:flex` rather than waiting for a paint or focus to clear
 * inherited `pointer-events:none`, `visibility:hidden`, fade
 * transitions, etc.
 *
 * Body lives in `Polyfill/WorkbenchInteractivityCSS.ts` (type-checked
 * source). This transform imports the compiled function and uses
 * `.toString()` to recover the prepend body. Behaviour identical to
 * the previous string-literal embedded form.
 *
 * Idempotent. Marker `__LAND_WORKBENCH_INTERACTIVITY_CSS__`.
 */

import WorkbenchInteractivityCSS from "../../../../Polyfill/Workbench/Interactivity/CSS.js";
import type { TransformPlugin } from "../../../../Type.js";

const Marker = "__LAND_WORKBENCH_INTERACTIVITY_CSS_V2__";

const Polyfill = `\n/* ${Marker} */\n(${WorkbenchInteractivityCSS.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectWorkbenchInteractivityCSS",

	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
