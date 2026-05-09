/**
 * Disable WKWebView's lazy-paint mechanisms structurally so workbench
 * panels render on `display:flex` rather than waiting for the next
 * compositor invalidation (a hover, scroll, focus, or resize).
 *
 * # Body lives in `Polyfill/DisableLazyPaint.ts`
 *
 * The previous version embedded the polyfill body as a string literal
 * here. That made type-checking, tree-shaking, and any future refactor
 * impossible - typos surfaced at runtime, not compile time. The body
 * has been extracted to `../Polyfill/DisableLazyPaint.ts` (a real,
 * type-checked TypeScript module). This transform imports the
 * compiled function and uses `Function.prototype.toString()` to
 * recover the source for prepend-injection. Behaviour is identical:
 * an IIFE wraps the function body, the marker check stays in place,
 * the workbench bootstrap target file is matched against the same
 * path regex.
 *
 * Backwards-compatibility: any caller that previously read this file
 * to inspect the polyfill source will now see the function reference;
 * the actual prepended JavaScript is still emitted via `.toString()`
 * at apply time, so the bundled VS Code bootstrap sees byte-identical
 * output (modulo whatever esbuild does to the function declaration
 * during Output's own build).
 */

import DisableLazyPaint, {
	Marker,
} from "../../../../Polyfill/Disable/Lazy/Paint.js";
import type { TransformPlugin } from "../../../../Type.js";

/** Wrap the compiled function body in an IIFE so it executes at
 *  prepend-time (the original embedded form was already an IIFE).
 *  Comment header carries the marker so even formatters/minifiers
 *  that strip the function name keep the idempotency tag visible. */
const Polyfill = `\n/* ${Marker} */\n(${DisableLazyPaint.toString()})();\n`;

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "InjectDisableLazyPaint",

	Match: ({ Path }) =>
		Path.endsWith("vs/code/electron-browser/workbench/workbench.js"),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		return { Kind: "Rewrite", Source: Polyfill + Source };
	},
};

export default Plugin;
