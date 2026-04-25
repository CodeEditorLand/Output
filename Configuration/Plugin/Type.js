var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const AsEsbuildPlugin = /* @__PURE__ */ __name((Plugin, Options) => ({
  name: `output:${Plugin.Name}`,
  setup(Build) {
    Build.onLoad({ filter: /\.(m?js|cjs|ts|tsx|html)$/ }, async (Args) => {
      const Matched = Options.Roots.find(
        (Root) => Args.path.startsWith(Root.Path)
      );
      if (!Matched) return null;
      if (!Plugin.Match({ Path: Args.path, Role: Matched.Role }) || Plugin.Enabled && !Plugin.Enabled()) {
        return null;
      }
      const { readFile } = await import("node:fs/promises");
      const Source = await readFile(Args.path, "utf-8");
      const Result = await Plugin.Transform({
        Path: Args.path,
        Source,
        Role: Matched.Role
      });
      if (Result.Kind === "Unchanged") return null;
      return {
        contents: Result.Source,
        loader: Args.path.endsWith(".html") ? "text" : "js"
      };
    });
  }
}), "AsEsbuildPlugin");
var Type_default = {};
export {
  AsEsbuildPlugin,
  Type_default as default
};
//# sourceMappingURL=Type.js.map
