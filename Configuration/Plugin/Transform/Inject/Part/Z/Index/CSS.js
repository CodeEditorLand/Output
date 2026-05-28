var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

import PartZIndexCSS from "../../../../../Polyfill/Part/Z/Index/CSS.js";

const Marker = "__LAND_PART_ZINDEX__";

const Polyfill = `
/* ${Marker} */
(${PartZIndexCSS.toString()})();
`;

const Plugin = {

  Kind: "Transform",

  Name: "InjectPartZIndexCSS",

  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),

  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };

    return { Kind: "Rewrite", Source: Polyfill + Source };
  }
};

var CSS_default = Plugin;

export {
  CSS_default as default
};

//# sourceMappingURL=CSS.js.map
