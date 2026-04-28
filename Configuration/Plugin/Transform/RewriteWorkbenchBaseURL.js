var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_WORKBENCH_BASE_URL_REWRITTEN__ */";
const SearchPattern = /const baseUrl = new URL\(`\$\{fileUriFromPath\([^`]+`\);/;
const Replacement = 'const baseUrl = new URL(location.origin + "/Static/Application/");';
const ConditionalSearchPattern = /let workbenchUrl;\s*if \(!!safeProcess\.env\["VSCODE_DEV"\] && globalThis\._VSCODE_USE_RELATIVE_IMPORTS\) \{[^}]+\} else \{[^}]+\}/;
const ConditionalReplacement = "const workbenchUrl = new URL(`vs/workbench/workbench.desktop.main.js`, baseUrl).href;";
const Plugin = {
  Kind: "Transform",
  Name: "RewriteWorkbenchBaseURL",
  Match: /* @__PURE__ */ __name(({ Path }) => Path.endsWith("vs/code/electron-browser/workbench/workbench.js"), "Match"),
  Transform({ Source }) {
    if (Source.includes(Marker)) return { Kind: "Unchanged" };
    if (!SearchPattern.test(Source)) return { Kind: "Unchanged" };
    let Next = Source.replace(SearchPattern, Marker + " " + Replacement);
    if (ConditionalSearchPattern.test(Next)) {
      Next = Next.replace(
        ConditionalSearchPattern,
        ConditionalReplacement
      );
    }
    if (Next === Source) return { Kind: "Unchanged" };
    return { Kind: "Rewrite", Source: Next };
  }
};
var RewriteWorkbenchBaseURL_default = Plugin;
export {
  RewriteWorkbenchBaseURL_default as default
};
//# sourceMappingURL=RewriteWorkbenchBaseURL.js.map
