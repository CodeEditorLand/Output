// @ts-nocheck
/**
 * @module CELSharedProcessService
 *
 * Drop-in replacement for VS Code's `SharedProcessService`. Land has no
 * Electron shared process, so the shipped class hangs on `acquirePort(…)`
 * forever and the `@builtin` sidebar stays empty even when Mountain has
 * scanned dozens of extensions. Routing `getChannel` through
 * `TauriMainProcessService` hits the same ChannelRouteMap that backs the
 * main process so `extensions` resolves to Mountain's `extensions:*`
 * handlers directly.
 *
 * Authored as a real TypeScript module that Output's esbuild step compiles
 * to `Configuration/Service/CELSharedProcessService.js` and `ApplyPipeline.ts`
 * drops at `Target/Microsoft/VSCode/vs/platform/ipc/electron-browser/
 * CELSharedProcessService.js` (sibling of `TauriMainProcessService.js`).
 *
 * The `ReplaceSharedProcess` transform reduces the original
 * `vs/workbench/services/sharedProcess/electron-browser/sharedProcessService.js`
 * to a one-line re-export pointing at this module.
 */

import { TauriMainProcessService } from "./TauriMainProcessService.js";

class SharedProcessService extends TauriMainProcessService {
	constructor(WindowId: number, _LogService: unknown) {
		super(WindowId);
	}

	notifyRestored(): void {
		/* Land has no shared process; channels go direct to Mountain */
	}

	async getConnection(): Promise<this> {
		return this; /* self-satisfy the IPC Client shape */
	}
}

export { SharedProcessService };

export default SharedProcessService;
