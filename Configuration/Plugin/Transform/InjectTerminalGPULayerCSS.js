var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_TERMINAL_GPU_LAYER__";
const InjectedCSS = `
/* ${Marker} */
/* Promote the xterm host elements to their own compositor layers without
 * clipping descendants. \`contain: paint\` was previously applied to the
 * viewport and screen containers, but on macOS WKWebView that creates a
 * paint boundary at the layer edge. Combined with \`translateZ(0)\` and
 * xterm's subpixel row offsets, glyph pixels falling near the boundary
 * get clipped - the user sees characters sliced in half. Keep the GPU
 * promotion hints, but only apply \`contain: paint\` to the canvas
 * itself (which owns its own pixel grid) - never to row containers. */
.terminal-xterm-host,
.terminal-wrapper,
.xterm {
	will-change: transform;
	transform: translateZ(0);
	backface-visibility: hidden;
}
.xterm canvas {
	will-change: transform;
	transform: translateZ(0);
	backface-visibility: hidden;
	contain: paint;
	isolation: isolate;
	/* Force nearest-neighbour rasterisation so subpixel row edges don't
	 * blend across the layer boundary. Two declarations: \`pixelated\`
	 * for current WebKit, \`crisp-edges\` as historical fallback. */
	image-rendering: pixelated;
	image-rendering: crisp-edges;
}
`;
const PathRegex = /workbench\/contrib\/terminal\/browser\/media\/[^/]+\.css$/;
const Plugin = {
  Kind: "Transform",
  Name: "InjectTerminalGPULayerCSS",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) {
      return { Kind: "Unchanged" };
    }
    return {
      Kind: "Rewrite",
      Source: Source + "\n" + InjectedCSS
    };
  }
};
var InjectTerminalGPULayerCSS_default = Plugin;
export {
  InjectTerminalGPULayerCSS_default as default
};
//# sourceMappingURL=InjectTerminalGPULayerCSS.js.map
