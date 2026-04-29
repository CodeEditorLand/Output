var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "__LAND_TERMINAL_GPU_LAYER__";
const InjectedCSS = `
/* ${Marker} */
.terminal-xterm-host,
.terminal-wrapper,
.xterm,
.xterm .xterm-viewport,
.xterm .xterm-screen,
.xterm canvas {
	will-change: transform;
	contain: paint;
	transform: translateZ(0);
	backface-visibility: hidden;
}
.xterm canvas {
	/* WKWebView's composited canvas occasionally flashes on focus
	 * change without an explicit isolation hint; \`isolation: isolate\`
	 * forces a stacking context so focus transitions don't bleed
	 * through the parent. */
	isolation: isolate;
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
