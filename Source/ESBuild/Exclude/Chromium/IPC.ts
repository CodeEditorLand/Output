// LAND-EXCLUDE: Chromium / V8 IPC primitives that we re-route
// through gRPC + Mist.
//
// Stock VS Code's main↔renderer messaging uses three Electron-only
// transport layers:
//
//   1. `ipcRenderer` / `ipcMain` (`electron.ipcRenderer`,
//      `electron.ipcMain`) - sync + async function-call IPC over
//      Chromium's V8 isolate boundary.
//   2. `MessagePort` / `MessagePortMain` - structured-clone byte
//      transport for high-throughput streams (file I/O, terminal
//      data).
//   3. `electron-sandbox` - V8 sandbox bridge for the renderer
//      (`contextBridge`, `preload.js`).
//
// Land does NOT have an Electron host. Every cross-process call
// goes through Vine gRPC (Mountain↔Cocoon) or Tauri invoke
// (Sky↔Mountain). The above three transports are dead code in our
// build but their constructors run at module-eval time and probe
// for `globalThis.electron` / `MessageChannelMain` - those probes
// either crash or fall back through long error paths that are
// pure overhead.
//
// Excluding them tree-shakes the dead code AND prevents the
// constructors from running. Anything that imports these modules
// hits the standard "module not found" path and falls back to the
// no-op stub - same pattern as Network.ts.
//
// # What goes here
//
//   - All `vs/base/parts/ipc/electron-*` (the Electron channel
//     implementations).
//   - All `vs/base/parts/ipc/**/*ipc.electron.{ts,js}` and
//     `*ipc.mp.{ts,js}` (electron + MessagePort variants).
//   - All `vs/base/parts/sandbox/electron-browser/*` (the V8
//     contextBridge surface).
//   - The Electron `MessageChannel`-backed shared-process bridge
//     in `vs/platform/sharedProcess/**`.
//   - Electron-only ChildProcess wrappers in
//     `vs/base/parts/ipc/node/ipc.cp.ts` (ours runs in Cocoon, not
//     under an Electron utility process).
//
// # What does NOT go here
//
//   - `vs/base/parts/ipc/common/*` (the abstract `IIPCChannel`
//     interface). Lots of code consumes this; we keep it and let
//     our gRPC adapter implement it.
//   - The `vs/code/electron-browser/workbench/workbench.{ts,js}`
//     entry point. We use that as our boot file (the Output
//     transforms inject our polyfills there). Do not exclude.
//   - The `vs/workbench/api/common/extHostExtensionService.ts`
//     and friends. Those are the ext-host RPC surface; they call
//     into the abstract IIPCChannel and are wired by our shim.

export const { Browser, Electron } = await import("../../../ESBuild.js");

// Always exclude these - they're dead in BOTH browser and bundled-
// electron Land profiles because we never run a Chromium V8
// isolate. The bundled-electron profile uses WKWebView under Tauri,
// which is a single-process model with no `ipcRenderer`.
export default (Prefix: string) => [
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
];
