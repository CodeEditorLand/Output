/**
 * Step 7b: Replace `SharedProcessService` with a TauriMainProcessService-
 * backed shim.
 *
 * The Extensions sidebar queries
 * `sharedProcessService.getChannel('extensions')` via
 * ExtensionManagementChannelClient. Land has no Electron shared process, so
 * the shipped SharedProcessService hangs on `acquirePort(…)` forever and the
 * `@builtin` sidebar stays empty even when Mountain has scanned 94
 * extensions. Routing `getChannel` through TauriMainProcessService hits the
 * same ChannelRouteMap that backs the main process so `extensions` resolves
 * to Mountain's `extensions:*` handlers directly.
 */

import type { TransformPlugin } from "../Type.js";

const Marker =
	"workbench/services/sharedProcess/electron-browser/sharedProcessService.js".replaceAll(
		"/",
		"\\/",
	);
const PathRegex = new RegExp(`${Marker}$`);

const Body = [
	`import { TauriMainProcessService } from '../../../../platform/ipc/electron-browser/TauriMainProcessService.js';`,
	``,
	`class SharedProcessService extends TauriMainProcessService {`,
	`  constructor(windowId, _logService) { super(windowId); }`,
	`  notifyRestored() { /* Land has no shared process; channels go direct to Mountain */ }`,
	`  async getConnection() { return this; /* self-satisfy the IPC Client shape */ }`,
	`}`,
	``,
	`export { SharedProcessService };`,
	`export default SharedProcessService;`,
	``,
].join("\n");

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ReplaceSharedProcess",
	Enabled: () => process.env["Electron"] === "true",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform() {
		return { Kind: "Rewrite", Source: Body };
	},
};

export default Plugin;
