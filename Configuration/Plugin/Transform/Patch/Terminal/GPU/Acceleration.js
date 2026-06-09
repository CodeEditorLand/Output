var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "[Land] gpuAcceleration default";
const PathRegex = /workbench\/contrib\/terminal\/common\/terminalConfiguration\.js$/;
const Anchor = /(enum:\s*\[\s*["']auto["']\s*,\s*["']on["']\s*,\s*["']off["']\s*\][\s\S]*?default:\s*)["']auto["']/;
const Plugin = {
  Kind: "Transform",
  Name: "PatchTerminalGpuAcceleration",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) {
      return { Kind: "Unchanged" };
    }
    if (!Anchor.test(Source)) {
      return { Kind: "Unchanged" };
    }
    return {
      Kind: "Rewrite",
      Source: Source.replace(Anchor, `$1"off" /* ${Marker} */`)
    };
  }
};
var Acceleration_default = Plugin;
export {
  Acceleration_default as default
};
//# sourceMappingURL=Acceleration.js.map
