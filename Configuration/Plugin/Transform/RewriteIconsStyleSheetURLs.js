var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const ReplacementSuffix = `.replace(/vscode-file:\\/\\/vscode-app\\/Static\\/Application\\/out\\//g, (globalThis).location.origin + '/Static/Application/').replace(/vscode-file:\\/\\/vscode-app\\//g, (globalThis).location.origin + '/Extension/').replace(/file:\\/\\/\\//g, (globalThis).location.origin + '/Extension/')`;
const TrailingReplaceChain = "(?:(?:\\.replace\\([^)]*\\))*)";
const IconsStyleSheetAnchor = {
	Marker: "/* __LAND_ICONS_STYLESHEET_URL_REWRITE_V2__ */",
	PathRegex: /\/vs\/platform\/theme\/browser\/iconsStyleSheet\.js$/,
	Search: new RegExp(
		`(getCSS\\(\\)\\s*\\{\\s*[\\s\\S]*?return\\s+rules\\.join\\('\\\\n'\\))${TrailingReplaceChain}(?:;)?(\\s*\\})`,
	),
};
const FileIconThemeAnchor = {
	Marker: "/* __LAND_FILE_ICON_THEME_URL_REWRITE_V2__ */",
	PathRegex:
		/\/vs\/workbench\/services\/themes\/browser\/fileIconThemeData\.js$/,
	Search: new RegExp(
		`(result\\.content\\s*=\\s*cssRules\\.join\\('\\\\n'\\))${TrailingReplaceChain}(\\s*;)`,
	),
};
const Anchors = [IconsStyleSheetAnchor, FileIconThemeAnchor];
const Plugin = {
	Kind: "Transform",
	Name: "RewriteIconsStyleSheetURLs",
	Match: /* @__PURE__ */ __name(
		({ Path }) => Anchors.some((Anchor) => Anchor.PathRegex.test(Path)),
		"Match",
	),
	Transform({ Path, Source }) {
		const Anchor = Anchors.find((Candidate) =>
			Candidate.PathRegex.test(Path),
		);
		if (!Anchor) return { Kind: "Unchanged" };
		if (Source.includes(Anchor.Marker)) return { Kind: "Unchanged" };
		if (!Anchor.Search.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(
			Anchor.Search,
			`${Anchor.Marker} $1${ReplacementSuffix};$2`,
		);
		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Next };
	},
};
var RewriteIconsStyleSheetURLs_default = Plugin;
export { RewriteIconsStyleSheetURLs_default as default };
//# sourceMappingURL=RewriteIconsStyleSheetURLs.js.map
