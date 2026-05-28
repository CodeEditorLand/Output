var __defProp = Object.defineProperty;

var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

const Marker = "/* __LAND_WORKBENCH_BASE_URL_REWRITTEN__ */";

const SearchPattern = /const baseUrl = new URL\(`\$\{fileUriFromPath\([\s\S]+?\)\}\/out\/`\);/;

const Replacement = 'const baseUrl = new URL(location.origin + "/Static/Application/");';

const ConditionalSearchPattern = /let (\w+);\s*if \(!!safeProcess\.env\[[`'"]VSCODE_DEV[`'"]\] && globalThis\._VSCODE_USE_RELATIVE_IMPORTS\) \{[\s\S]+?\}\s*else \{[\s\S]+?\}\s*const (\w+) = await import\(\1\);/;
const Plugin = {
  Kind: "Transform",
  Name: "RewriteWorkbenchBaseURL",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    if (!SearchPattern.test(Source)) return { Kind: "Unchanged" };
    let Next = Source.replace(SearchPattern, `${Marker} ${Replacement}`);
    if (ConditionalSearchPattern.test(Next)) {
      Next = Next.replace(
        ConditionalSearchPattern,
        'const $2 = await import("../../../workbench/workbench.desktop.main.js");'
      );
    }
    if (Next === Source) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Next };
  }
};
var URL_default = Plugin;
export {
  URL_default as default
};
//# sourceMappingURL=URL.js.map
