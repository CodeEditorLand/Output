var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const PathRegex = /\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const SandboxSetCall = /newFrame\.setAttribute\(\s*['"]sandbox['"]\s*,\s*Array\.from\(sandboxRules\)\.join\(\s*['"] ['"]\s*\)\s*\);/;
const SandboxReplacement = `/* Land: sandbox attribute stripped - WKWebView blocks custom-protocol main-resource loads from sandboxed iframes. */`;
const Plugin = {
  Kind: "Transform",
  Name: "StripWebviewIframeSandbox",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform({ Source }) {
    if (!SandboxSetCall.test(Source)) {
      return { Kind: "Unchanged" };
    }
    const Next = Source.replace(SandboxSetCall, SandboxReplacement);
    return Next === Source ? { Kind: "Unchanged" } : { Kind: "Rewrite", Source: Next };
  }
};
var StripWebviewIframeSandbox_default = Plugin;
export {
  StripWebviewIframeSandbox_default as default
};
//# sourceMappingURL=StripWebviewIframeSandbox.js.map
