var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Dependency = (await import("../../../ESBuild.js")).Dependency;
const Merge = (await import("deepmerge-ts")).deepmergeCustom({
  mergeArrays: false
});
var Declaration_default = /* @__PURE__ */ __name(async (Current) => Merge(
  await (await import("../VSCode.js")).default(Current),
  {
    bundle: false,
    outbase: "../../Dependency/Microsoft/Dependency/Editor/src",
    tsconfig: `Configuration/tsconfig/${Dependency}/tsconfig.Declaration.json`,
    plugins: [],
    allowOverwrite: true,
    entryPoints: Current.entryPoints ?? [],
    loader: {
      ".d.ts": "copy"
    }
  }
), "default");
export {
  Dependency,
  Merge,
  Declaration_default as default
};
//# sourceMappingURL=Declaration.js.map
