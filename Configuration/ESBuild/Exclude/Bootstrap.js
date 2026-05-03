const s = (await import("../../ESBuild.js")).Electron;
var e = (o) => [
	"/bootstrap-cli.js",
	"/bootstrap-fork.js",
	"/bootstrap-node.js",
	"/bootstrap-server.js",
	"/cli.js",
	"/main.js",
	"/server-cli.js",
	"/server-main.js",
	`${o}/code/node/cli.js`,
	`${o}/code/node/cliProcessMain.js`,
	...(s ? [] : [`${o}/workbench/workbench.desktop.main.js`]),
];
export { s as Electron, e as default };
