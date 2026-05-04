var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex = /\/workbench\/contrib\/webview\/browser\/pre\/index\.html$/;
const Marker = "<!-- __LAND_WEBVIEW_SHELL_CSP__ -->";
const CSPMetaPattern =
	/<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*\/?\s*>/;
const ReplacementMeta = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'self' blob:; frame-src 'self' vscode-webview:; style-src 'unsafe-inline' 'self'; img-src 'self' data: blob: https:; font-src 'self' data: blob:; connect-src 'self' https: blob: data:;">${Marker}`;
const Plugin = {
	Kind: "Transform",
	Name: "RewriteWebviewShellCSP",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!CSPMetaPattern.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(CSPMetaPattern, ReplacementMeta);
		return Next === Source
			? { Kind: "Unchanged" }
			: { Kind: "Rewrite", Source: Next };
	},
};
var RewriteWebviewShellCSP_default = Plugin;
export { RewriteWebviewShellCSP_default as default };
//# sourceMappingURL=RewriteWebviewShellCSP.js.map
