import type { BuildOptions } from "esbuild";

/**
 * @module ESBuild
 *
 */
export default (await import("deepmerge-ts")).deepmerge(
	(await import("../../../ESBuild.js")).default,

	{
		bundle: true,

		external: [
			// FUTURE: LOG WHERE THEY'RE USED - Add logging to track external module usage

			// Local project files related to terminal functionality and webview messaging
			"../../../terminal/browser/xterm-private.js",

			"../xterm-private.js",

			"./webviewMessages.js",

			// Microsoft's 1DS (One Data Strategy) telemetry system
			"@microsoft/1ds-core-js",

			"@microsoft/1ds-post-js",

			// File watcher used by Parcel bundler
			"@parcel/watcher",

			// VS Code-specific packages for various functionalities
			// Character encoding
			"@vscode/iconv-lite-umd",

			// Policy watching
			"@vscode/policy-watcher",

			// Proxy handling
			"@vscode/proxy-agent",

			// Text searching
			"@vscode/ripgrep",

			// Elevated permissions
			"@vscode/sudo-prompt",

			// Windows-specific utility
			"@vscode/windows-mutex",

			// Windows process management
			"@vscode/windows-process-tree",

			// Windows registry access
			"@vscode/windows-registry",

			// Add-ons for xterm.js terminal emulator
			// Serialization support
			"@xterm/addon-serialize",

			// Unicode 11 support
			"@xterm/addon-unicode11",

			// Headless functionality
			"@xterm/headless",

			// Framework for building cross-platform desktop applications
			"electron",

			// Native Node.js addons
			// Checking elevated permissions
			"native-is-elevated",

			// Handling keymaps
			"native-keymap",

			// Watchdog functionality
			"native-watchdog",

			// Pseudoterminal (pty) support for Node.js
			"node-pty",

			// Access to original Node.js 'fs' module
			"original-fs",

			// Profiling tool for V8 JavaScript engine
			"v8-inspect-profiler",

			// VS Code extension API
			"vscode",

			// Regular expression parser and AST generator
			"vscode-regexpp",

			// Libraries for reading (yauzl) and writing (yazl) ZIP files
			"yauzl",

			"yazl",
		],
	},
) satisfies BuildOptions as BuildOptions;

export const { sep, posix } = await import("node:path");
