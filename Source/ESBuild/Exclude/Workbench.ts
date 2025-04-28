export default (Prefix: string) => [
	// // Examples - KEEP core ones like files, preferences, output, terminal UI
	// `${Prefix}/workbench/contrib/chat`,
	// `${Prefix}/workbench/contrib/notebook`,
	// `${Prefix}/workbench/contrib/replNotebook`,
	// `${Prefix}/workbench/contrib/interactive`,
	// `${Prefix}/workbench/contrib/testing`,
	// `${Prefix}/workbench/contrib/timeline`,
	// `${Prefix}/workbench/contrib/comments`,
	// // `${Prefix}/workbench/contrib/scm`, // Keep if needed for basic diff view, remove if git ext handles all
	// // `${Prefix}/workbench/contrib/debug`, // Keep common, maybe remove browser UI parts if needed
	// `${Prefix}/workbench/contrib/callHierarchy`,
	// `${Prefix}/workbench/contrib/typeHierarchy`,
	// `${Prefix}/workbench/contrib/issue`,
	// `${Prefix}/workbench/contrib/surveys`,
	// `${Prefix}/workbench/contrib/tags`,
	// `${Prefix}/workbench/contrib/tasks`, // Keep if extensions might contribute/run tasks
	// `${Prefix}/workbench/contrib/remote`,
	// `${Prefix}/workbench/contrib/remoteTunnel`,
	// `${Prefix}/workbench/contrib/share`,
	// `${Prefix}/workbench/contrib/speech`,
	// `${Prefix}/workbench/contrib/userDataProfile/browser`, // Keep common services
	// `${Prefix}/workbench/contrib/userDataSync/browser`, // Keep common services
	// `${Prefix}/workbench/contrib/welcome*`,

	`${Prefix}/code/browser/workbench/callback.html`,
	`${Prefix}/code/browser/workbench/workbench-dev.html`,
	`${Prefix}/code/browser/workbench/workbench.html`,
	`${Prefix}/workbench/contrib/webview/browser/pre/fake.html`,
	`${Prefix}/workbench/contrib/webview/browser/pre/index-no-csp.html`,
	`${Prefix}/workbench/contrib/webview/browser/pre/index.html`,

	`${Prefix}/workbench/contrib/terminalContrib/README.md`,
];
