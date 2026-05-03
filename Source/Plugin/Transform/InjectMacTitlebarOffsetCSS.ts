/**
 * Reserve the macOS traffic-light cluster width on the workbench
 * titlebar so the in-window `File / Edit / View` menubar and the
 * command-center quick-pick ("Select pickers") stop overlapping with
 * the OS-painted close / minimize / maximize buttons.
 *
 * Body lives in `Polyfill/MacTitlebarOffsetCSS.ts` (type-checked
 * source). This transform imports the compiled function and uses
 * `.toString()` to recover the prepend body. Behaviour identical to
 * the previous string-literal embedded form.
 *
 * Idempotent. Marker `__LAND_MAC_TITLEBAR_OFFSET__`.
 */

import MacTitlebarOffsetCSS, {
	Marker,
} from "../Polyfill/MacTitlebarOffsetCSS.js";
import type { TransformPlugin } from "../Type.js";

const Polyfill = `\n/* ${Marker} */\n(${MacTitlebarOffsetCSS.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectMacTitlebarOffsetCSS",
	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
