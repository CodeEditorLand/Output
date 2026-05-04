var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const { Browser, Electron } = await import("../../ESBuild.js");
var IPC_default = /* @__PURE__ */ __name(
	(Prefix) => [
		// ---- Electron IPC channels (electron.ipcRenderer / ipcMain) ----
		`${Prefix}/base/parts/ipc/electron-browser/*`,
		`${Prefix}/base/parts/ipc/electron-main/*`,
		// Common-layer Electron-shaped IPC channel (still references
		// MessagePortMain at module eval).
		`${Prefix}/base/parts/ipc/common/ipc.electron.js`,
		// MessagePort transports - structured-clone byte channels, not
		// useful without an Electron utility process or a worker pair
		// we're not running.
		`${Prefix}/base/parts/ipc/electron-browser/ipc.mp.js`,
		`${Prefix}/base/parts/ipc/electron-main/ipc.mp.js`,
		`${Prefix}/base/parts/ipc/node/ipc.mp.js`,
		// ChildProcess IPC (Electron utility-process pattern).
		`${Prefix}/base/parts/ipc/node/ipc.cp.js`,
		// ---- Electron sandbox / contextBridge ----
		`${Prefix}/base/parts/sandbox/electron-browser/*`,
		`${Prefix}/base/parts/sandbox/electron-main/*`,
		// ---- Shared-process bridge (Electron MessageChannel-backed) ----
		`${Prefix}/platform/sharedProcess/electron-browser/*`,
		`${Prefix}/platform/sharedProcess/electron-main/*`,
		`${Prefix}/platform/sharedProcess/node/*`,
		// ---- Utility-process bootstrap (Electron-only entry) ----
		`${Prefix}/platform/utilityProcess/electron-main/*`,
		// ---- Native-host channel (Electron remote screen / window) ----
		`${Prefix}/platform/native/electron-main/*`,
		// We DO need the abstract `INativeHostService` interface (kept
		// in common/) but the electron-renderer impl is replaced by our
		// `nativeHost:*` IPC handler in Mountain.
		`${Prefix}/platform/native/electron-browser/nativeHostService.js`,
		// ---- Electron-only environment service ----
		`${Prefix}/platform/environment/electron-main/*`,
		// Keep `environment/common/*` - that's the abstract interface
		// and DTO that Cocoon consumes via gRPC.
		// ---- Electron OAuth / external URL ----
		`${Prefix}/platform/url/electron-main/*`,
		// ---- IPC test code (always dead in production) ----
		`${Prefix}/base/parts/ipc/test/*`,
	],
	"default",
);
export { Browser, Electron, IPC_default as default };
//# sourceMappingURL=IPC.js.map
