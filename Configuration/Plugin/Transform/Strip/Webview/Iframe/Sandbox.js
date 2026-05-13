var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "/* Land: sandbox attribute stripped";
const PreIndexPathRegex =
	/\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const WebviewElementPathRegex =
	/\/workbench\/contrib\/webview\/browser\/webviewElement\.js$/;
const PreIndexSandboxCall =
	/newFrame\.setAttribute\(\s*['"]sandbox['"]\s*,\s*Array\.from\(sandboxRules\)\.join\(\s*['"] ['"]\s*\)\s*\);/;
const WebviewElementSandboxCall =
	/element\.sandbox\.add\([^)]*'allow-scripts'[^)]*\);/;
const Replacement = `${Marker} - WKWebView blocks custom-protocol main-resource loads from sandboxed iframes. */`;
const Plugin = {
	Kind: "Transform",
	Name: "StripWebviewIframeSandbox",
	Match: /* @__PURE__ */ __name(
		({ Path }) =>
			PreIndexPathRegex.test(Path) || WebviewElementPathRegex.test(Path),
		"Match",
	),
	Transform({ Path, Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		const Pattern = PreIndexPathRegex.test(Path)
			? PreIndexSandboxCall
			: WebviewElementSandboxCall;
		if (!Pattern.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(Pattern, Replacement);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};
var Sandbox_default = Plugin;
export { Sandbox_default as default };
//# sourceMappingURL=Sandbox.js.map
