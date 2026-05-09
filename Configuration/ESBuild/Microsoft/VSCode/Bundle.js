var e = (await import("deepmerge-ts")).deepmerge(
	(await import("../VSCode.js")).default,

	{
		bundle: !0,
		external: [
			"../../../terminal/browser/xterm-private.js",
			"../xterm-private.js",
			"./webviewMessages.js",
			"@microsoft/1ds-core-js",
			"@microsoft/1ds-post-js",
			"@parcel/watcher",
			"@vscode/iconv-lite-umd",
			"@vscode/policy-watcher",
			"@vscode/proxy-agent",
			"@vscode/ripgrep",
			"@vscode/sudo-prompt",
			"@vscode/windows-mutex",
			"@vscode/windows-process-tree",
			"@vscode/windows-registry",
			"@xterm/addon-serialize",
			"@xterm/addon-unicode11",
			"@xterm/headless",
			"electron",
			"native-is-elevated",
			"native-keymap",
			"native-watchdog",
			"node-pty",
			"original-fs",
			"v8-inspect-profiler",
			"vscode",
			"vscode-regexpp",
			"yauzl",
			"yazl",
		],
	},
);

const { sep: s, posix: o } = await import("node:path");

export { e as default, o as posix, s as sep };
