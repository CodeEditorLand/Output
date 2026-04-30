var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_FORCE_TEXTAREA_INPUT__ */";
const PathRegex = /\/vs\/editor\/common\/config\/editorOptions\.js$/;
const Pattern = /(register\(new EditorBooleanOption\(\s*44\s*\/\* EditorOption\.editContext \*\/\s*,\s*'editContext'\s*,\s*)true(\s*,)/;
const Plugin = {
  Kind: "Transform",
  Name: "ForceTextAreaInput",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    if (!Pattern.test(Source)) return { Kind: "Unchanged" };
    const Next = Source.replace(Pattern, `${Marker} $1false$2`);
    return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
  }
};
var ForceTextAreaInput_default = Plugin;
export {
  ForceTextAreaInput_default as default
};
//# sourceMappingURL=ForceTextAreaInput.js.map
