export const Browser = (await import("../../ESBuild.js")).Browser;

// TODO: FINISH COMPILING FROM ELECTRON-WISE BINARIES
export default (Prefix: string) =>
	Browser
		? [
				`${Prefix}/base/parts/contextmenu/electron-main/*`,

				`${Prefix}/base/parts/contextmenu/electron-sandbox/*`,

				`${Prefix}/base/parts/ipc/electron-main/*`,

				`${Prefix}/base/parts/ipc/electron-sandbox/*`,

				`${Prefix}/base/parts/sandbox/electron-sandbox/*`,

				`${Prefix}/code/electron-*`,

				`${Prefix}/platform/**/electron-*`,

				`${Prefix}/platform/webContentExtractor/test/electron-main/*`,

				`${Prefix}/workbench/contrib/chat/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/codeEditor/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/debug/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/emergencyAlert/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/encryption/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/extensions/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/externalTerminal/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/files/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/inlineChat/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/issue/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/localHistory/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/localization/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/logs/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/mcp/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/mergeEditor/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/performance/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/remote/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/remoteTunnel/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/splash/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/tags/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/tasks/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/terminal/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/userDataSync/electron-sandbox/*`,

				`${Prefix}/workbench/contrib/webview/electron-sandbox/*`,

				`${Prefix}/workbench/electron-*`,

				`${Prefix}/workbench/services/**/electron-*`,

				`${Prefix}/base/parts/ipc/common/ipc.electron.js`,

				`${Prefix}/base/parts/ipc/electron-main/ipc.electron.js`,

				`${Prefix}/base/parts/ipc/electron-sandbox/ipc.electron.js`,

				`${Prefix}/base/parts/sandbox/common/electronTypes.js`,

				`${Prefix}/base/parts/sandbox/electron-sandbox/electronTypes.js`,

				`${Prefix}/platform/menubar/common/menubar.js`,

				`${Prefix}/platform/remote/common/electronRemoteResources.js`,

				// `${Prefix}/platform/download/common/*`,

				// `${Prefix}/platform/update/common/*`,

				// `${Prefix}/workbench/browser/parts/titlebar/*`,

				// `${Prefix}/workbench/contrib/relauncher/browser/*`,

				// `${Prefix}/workbench/contrib/update/browser/*`,

				// `${Prefix}/workbench/services/driver/*`,

				// `${Prefix}/workbench/services/host/browser/browserHostService.js`,

				// `${Prefix}/workbench/services/title/browser/titleService.js`,
			]
		: [];
