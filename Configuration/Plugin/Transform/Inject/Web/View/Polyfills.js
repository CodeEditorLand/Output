var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import WebViewPolyfills from "../../../../Polyfill/Web/View/Polyfills.js";

const Marker = "__LAND_WEBVIEW_POLYFILLS__";

const Polyfill = `
/* ${Marker} */
(${WebViewPolyfills.toString()})();
`;

const Plugin = {

  Kind: "Transform",

  Name: "InjectWebViewPolyfills",

  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),

  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };

    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};

var Polyfills_default = Plugin;

export {
  Polyfills_default as default
};

//# sourceMappingURL=Polyfills.js.map
