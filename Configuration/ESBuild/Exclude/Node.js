var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
var Node_default = /* @__PURE__ */ __name(
	(Prefix) => [
		`${Prefix}/base/node/*`,
		`${Prefix}/base/parts/ipc/node/*`,
		`${Prefix}/base/parts/sandbox/node/*`,
		`${Prefix}/base/parts/storage/node/*`,
		`${Prefix}/platform/backup/node/*`,
		`${Prefix}/platform/checksum/node/*`,
		`${Prefix}/platform/diagnostics/node/*`,
		`${Prefix}/platform/environment/node/*`,
		`${Prefix}/platform/extensionManagement/node/*`,
		`${Prefix}/platform/externalTerminal/node/*`,
		`${Prefix}/platform/files/node/*`,
		`${Prefix}/platform/files/node/watcher`,
		`${Prefix}/platform/languagePacks/node/*`,
		`${Prefix}/platform/lifecycle/node/*`,
		`${Prefix}/platform/log/node/*`,
		`${Prefix}/platform/mcp/node/*`,
		// Node-only: `electron-main/` (Electron main process) and `node/` (raw
		// Node platform). The `common/` subdir is browser-safe (re-exports the
		// IPC contract surface) and MUST NOT be excluded - the workbench's
		// `desktop.contribution` imports `vs/platform/native/common/native.js`,
		// and excluding it breaks Vite's bundled-tree resolution chain. The
		// previous wildcard `${Prefix}/platform/native/*` was over-broad.
		`${Prefix}/platform/native/electron-main/*`,
		`${Prefix}/platform/native/node/*`,
		`${Prefix}/platform/policy/node/*`,
		`${Prefix}/platform/remote/node/*`,
		`${Prefix}/platform/remoteTunnel/node/*`,
		`${Prefix}/platform/request/node/*`,
		`${Prefix}/platform/sharedProcess/*`,
		`${Prefix}/platform/shell/node/*`,
		`${Prefix}/platform/sign/node/*`,
		`${Prefix}/platform/state/node/*`,
		`${Prefix}/platform/telemetry/node/*`,
		`${Prefix}/platform/terminal/node/*`,
		`${Prefix}/platform/tunnel/node/*`,
		`${Prefix}/platform/update/node/*`,
		`${Prefix}/platform/userDataProfile/node/*`,
		`${Prefix}/platform/userDataSync/node/*`,
		`${Prefix}/platform/webContentExtractor/node/*`,
		`${Prefix}/platform/windows/node/*`,
		`${Prefix}/platform/workspaces/node/*`,
		`${Prefix}/workbench/api/node/*`,
		`${Prefix}/workbench/contrib/debug/node/*`,
		`${Prefix}/workbench/contrib/externalTerminal/node/*`,
		`${Prefix}/workbench/contrib/terminal/node/*`,
		`${Prefix}/workbench/services/integrity/node/*`,
		`${Prefix}/workbench/services/search/node/*`,
		// `${Prefix}/base/parts/ipc/common/ipc.net.js`,
		// `${Prefix}/workbench/services/extensions/browser/extensionsScannerService.js`,
	],
	"default",
);
export { Node_default as default };
//# sourceMappingURL=Node.js.map
