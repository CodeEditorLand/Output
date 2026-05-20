var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Electron = (await import("../../ESBuild.js")).Electron;
var Bootstrap_default = /* @__PURE__ */ __name(
	(Prefix) => [
		// Bootstrap files at the root of out/. Each pattern is anchored with
		// a leading slash so @playform/build's `Exclude()` substring fallback
		// only matches files whose path ends with `/<name>` - not arbitrary
		// files containing the name as substring. Without the leading slash,
		// `main.js` substring-matched `vs/workbench/workbench.web.main.js`
		// (and the .common / .desktop siblings) and silently filtered them
		// out of Output's Target, breaking Sky's bundled-workbench Vite walk
		// which transitively imports those entries from `workbench.web.main
		// .internal.js`.
		"/bootstrap-cli.js",
		"/bootstrap-fork.js",
		"/bootstrap-node.js",
		"/bootstrap-server.js",
		"/cli.js",
		"/main.js",
		"/server-cli.js",
		"/server-main.js",
		// These are specific to VSCode's output structure, keep them
		`${Prefix}/code/node/cli.js`,
		`${Prefix}/code/node/cliProcessMain.js`,
		// Only exclude the desktop workbench when NOT building for Electron
		...(Electron ? [] : [`${Prefix}/workbench/workbench.desktop.main.js`]),
	],
	"default",
);
export { Electron, Bootstrap_default as default };
//# sourceMappingURL=Bootstrap.js.map
