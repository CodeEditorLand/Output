/**
 * Pin Monaco's editor canvases to their own GPU compositor layer so
 * WKWebView's compositor flushes don't expose interim paint state.
 *
 * Same rationale as `InjectTerminalGPULayerCSS.ts` but applied to the
 * Monaco editor surface. Without these hints WKWebView occasionally:
 *
 *   - Shows the cursor / underscore at a position offset from where it
 *     belongs (the compositor lifts the cursor layer onto a different
 *     baseline than the text layer during reflow).
 *   - Flashes the editor area on tab-switch / panel resize - the
 *     editor's wrapper element gets re-attached, Monaco runs its own
 *     `view.refresh`, and the canvas is briefly cleared while the
 *     parent layer is mid-flush.
 *
 * `will-change: transform` + `contain: paint` + `transform: translateZ(0)`
 * forces the canvas onto a self-contained composited layer so the clear/
 * paint cycle stays inside the layer. `isolation: isolate` adds a stacking
 * context so focus transitions don't bleed across editor groups.
 *
 * Idempotent via the `__LAND_EDITOR_GPU_LAYER__` marker.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "__LAND_EDITOR_GPU_LAYER__";

const InjectedCSS = `
/* ${Marker} */
/* Promote Monaco container elements to their own compositor layers
 * without clipping descendants. \`contain: paint\` on row containers
 * (\`view-lines\`, \`lines-content\`, \`view-overlays\`) creates a paint
 * boundary at the layer edge under macOS WKWebView; combined with
 * \`translateZ(0)\` + Monaco's subpixel line-height that boundary clips
 * glyph rows. Keep the GPU promotion hints on the host elements but
 * scope \`contain: paint\` to the canvas only. */
.monaco-editor,
.monaco-editor .overflow-guard,
.monaco-editor .view-overlays,
.monaco-editor .view-lines,
.monaco-editor .lines-content,
.monaco-editor .cursors-layer {
	will-change: transform;
	transform: translateZ(0);
	backface-visibility: hidden;
}
.monaco-editor canvas {
	will-change: transform;
	transform: translateZ(0);
	backface-visibility: hidden;
	contain: paint;
	isolation: isolate;
	image-rendering: pixelated;
	image-rendering: crisp-edges;
}
.monaco-editor .cursor,
.monaco-editor .cursors-layer .cursor {
	/* Pin the cursor to its own stacking context so the compositor
	 * doesn't render it on a layer whose baseline diverges from the
	 * text layer's - the symptom the user described as "underscore at
	 * a different place" with squiggle on the correct line. */
	will-change: transform;
	transform: translateZ(0);
	isolation: isolate;
}
`;

const PathRegex = /editor\/browser\/(?:[^/]+\/)*[^/]+\.css$/;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectEditorGPULayerCSS",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform({ Source }) {
		if (Source.includes(Marker)) {
			return { Kind: "Unchanged" };
		}
		return {
			Kind: "Rewrite",
			Source: Source + "\n" + InjectedCSS,
		};
	},
};

export default Plugin;
