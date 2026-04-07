export const Electron = (await import("../../ESBuild.js")).Electron;

export default (Prefix: string) => [
	// When compiling from src/, bootstrap files are at the root of out/
	// (not in a "out" subdirectory since we're not using VSCode's prebuilt structure)
	"bootstrap-cli.js",
	"bootstrap-fork.js",
	"bootstrap-node.js",
	"bootstrap-server.js",
	"cli.js",
	"main.js",
	"server-cli.js",
	"server-main.js",

	// These are specific to VSCode's output structure, keep them
	`${Prefix}/code/node/cli.js`,
	`${Prefix}/code/node/cliProcessMain.js`,

	// Only exclude the desktop workbench when NOT building for Electron
	...(Electron
		? []
		: [`${Prefix}/workbench/workbench.desktop.main.js`]),
];
