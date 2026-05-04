var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
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
const Plugin = {
	Kind: "Transform",
	Name: "InjectEditorGPULayerCSS",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
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
var InjectEditorGPULayerCSS_default = Plugin;
export { InjectEditorGPULayerCSS_default as default };
//# sourceMappingURL=InjectEditorGPULayerCSS.js.map
