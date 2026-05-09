import { join as o } from "node:path";

const a = [
		"@xterm/xterm",

		"@xterm/addon-clipboard",

		"@xterm/addon-image",

		"@xterm/addon-ligatures",

		"@xterm/addon-search",

		"@xterm/addon-serialize",

		"@xterm/addon-unicode11",

		"@xterm/addon-webgl",

		"@vscode/vscode-languagedetection",

		"vscode-textmate",

		"vscode-oniguruma",
	],
	s = ({
		LocalRoot: t,
		DependencyRoot: r,
		Destination: d,
		Packages: n = a,
	}) => ({
		Kind: "Copy",

		Name: "CopyNodeModules",

		Entries: n.map((e) => ({
			From: [o(t, e), o(r, e)],
			To: o(d, e),
			Recursive: !0,
			Force: !0,
		})),
	});

var p = s;

export { s as CopyNodeModules, a as DefaultPackages, p as default };
