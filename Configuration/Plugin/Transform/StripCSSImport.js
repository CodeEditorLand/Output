var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const CSSImport = /^import\s+(['"])([^'"]+\.css)\1\s*;?\s*$/gm;
const Plugin = {
  Kind: "Transform",
  Name: "StripCSSImport",
  Match: /* @__PURE__ */ __name(({ Path, Role }) => (
    // All VS Code JS in the app tier (post-copy) is fair game. Running
    // against `out` / `out-build` directly is also valid - Rest can apply
    // this transform during its compile pass.
    (Role === "app" || Role === "out" || Role === "out-build") && /\.js$/.test(Path)
  ), "Match"),
  Transform({ Source }) {
    CSSImport.lastIndex = 0;
    if (!CSSImport.test(Source)) return { Kind: "Unchanged" };
    CSSImport.lastIndex = 0;
    return {
      Kind: "Rewrite",
      Source: Source.replace(
        CSSImport,
        (_Match, _Quote, Path) => `window._LOAD_CSS_WORKER?.(new URL("${Path}",import.meta.url).pathname);`
      )
    };
  }
};
var StripCSSImport_default = Plugin;
export {
  StripCSSImport_default as default
};
//# sourceMappingURL=StripCSSImport.js.map
