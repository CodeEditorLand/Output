var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import MacTitlebarOffsetCSS, { Marker } from "../Polyfill/MacTitlebarOffsetCSS.js";
const Polyfill = `
/* ${Marker} */
(${MacTitlebarOffsetCSS.toString()})();
`;
const Plugin = {
  Kind: "Transform",
  Name: "InjectMacTitlebarOffsetCSS",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};
var InjectMacTitlebarOffsetCSS_default = Plugin;
export {
  InjectMacTitlebarOffsetCSS_default as default
};
//# sourceMappingURL=InjectMacTitlebarOffsetCSS.js.map
