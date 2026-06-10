var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_NODE_MODULES_PATH_PATCHED__ */";
const Replacements = [
  [`'vs/../../extensions'`, `'vs/../extensions'`],
  [`'vs/../../node_modules'`, `'vs/../node_modules'`],
  [`'vs/../../node_modules.asar'`, `'vs/../node_modules.asar'`],
  [
    `'vs/../../node_modules.asar.unpacked'`,
    `'vs/../node_modules.asar.unpacked'`
  ]
];
const Plugin = {
  Kind: "Transform",
  Name: "RewriteNodeModulesPath",
  Match: /* @__PURE__ */ __name(({ Path }) => /\/vs\/base\/common\/network\.js$/.test(Path), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    let Next = Source;
    let Changed = false;
    for (const [Original, Patched] of Replacements) {
      if (Next.includes(Original)) {
        Next = Next.replace(Original, Patched);
        Changed = true;
      }
    }
    if (!Changed) return { Kind: "Unchanged" };
    return {
      Kind: "Rewrite",
      Source: Marker + "\n" + Next
    };
  }
};
var Path_default = Plugin;
export {
  Path_default as default
};
//# sourceMappingURL=Path.js.map
