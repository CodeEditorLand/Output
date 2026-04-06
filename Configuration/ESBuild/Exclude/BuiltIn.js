var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
var BuiltIn_default = /* @__PURE__ */ __name(
	(_Prefix) => [
		// --- 7. Built-in Extensions (Selectively Exclude - HIGH RISK, Test Carefully!) ---
		// Keep: typescript-language-features, json-language-features, html-language-features, css-language-features, emmet, git-base
		// Potential excludes (examples only, VERIFY based on YOUR MVP needs):
		// `${Prefix}/extensions/php-language-features`,
		// `${Prefix}/extensions/npm`,
		// `${Prefix}/extensions/grunt`,
		// `${Prefix}/extensions/jake`,
		// `${Prefix}/extensions/ipynb`,
		// `${Prefix}/extensions/markdown-math`,
		// Keep if image/audio/video preview needed
		// `${Prefix}/extensions/media-preview`,
		// Keep if using built-in merge editor
		// `${Prefix}/extensions/merge-conflict`,
		// `${Prefix}/extensions/github-authentication`,
		// `${Prefix}/extensions/microsoft-authentication`,
		// `${Prefix}/extensions/search-result`,
		// `${Prefix}/extensions/simple-browser`,
		// `${Prefix}/extensions/vscode-api-tests`,
		// `${Prefix}/extensions/vscode-colorize-tests`,
		// `${Prefix}/extensions/vscode-test-resolver`,
		// ... other language extensions ...
	],
	"default",
);
export { BuiltIn_default as default };
//# sourceMappingURL=BuiltIn.js.map
