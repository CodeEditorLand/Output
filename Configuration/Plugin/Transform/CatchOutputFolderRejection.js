var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const PathRegex = /\/workbench\/contrib\/output\/browser\/outputServices\.js$/;
const ChainRegex = /(createFolder\([^)]*\)\.then\(\(\)\s*=>\s*undefined\))/g;
const Plugin = {
  Kind: "Transform",
  Name: "CatchOutputFolderRejection",
  Match: /* @__PURE__ */ __name(({ Path, Role }) => Role === "app" && PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    ChainRegex.lastIndex = 0;
    if (!ChainRegex.test(Source)) {
      return { Kind: "Unchanged" };
    }
    ChainRegex.lastIndex = 0;
    return {
      Kind: "Rewrite",
      Source: Source.replace(
        ChainRegex,
        (_Match, Chain) => `${Chain}.catch(() => undefined)`
      )
    };
  }
};
var CatchOutputFolderRejection_default = Plugin;
export {
  CatchOutputFolderRejection_default as default
};
//# sourceMappingURL=CatchOutputFolderRejection.js.map
