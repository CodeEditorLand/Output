const { Browser: s, Electron: t } = await import("../../ESBuild.js");
var a = (e) => [
	`${e}/base/parts/ipc/electron-browser/*`,
	`${e}/base/parts/ipc/electron-main/*`,
	`${e}/base/parts/ipc/common/ipc.electron.js`,
	`${e}/base/parts/ipc/electron-browser/ipc.mp.js`,
	`${e}/base/parts/ipc/electron-main/ipc.mp.js`,
	`${e}/base/parts/ipc/node/ipc.mp.js`,
	`${e}/base/parts/ipc/node/ipc.cp.js`,
	`${e}/base/parts/sandbox/electron-browser/*`,
	`${e}/base/parts/sandbox/electron-main/*`,
	`${e}/platform/sharedProcess/electron-browser/*`,
	`${e}/platform/sharedProcess/electron-main/*`,
	`${e}/platform/sharedProcess/node/*`,
	`${e}/platform/utilityProcess/electron-main/*`,
	`${e}/platform/native/electron-main/*`,
	`${e}/platform/native/electron-browser/nativeHostService.js`,
	`${e}/platform/environment/electron-main/*`,
	`${e}/platform/url/electron-main/*`,
	`${e}/base/parts/ipc/test/*`,
];
export { s as Browser, t as Electron, a as default };
