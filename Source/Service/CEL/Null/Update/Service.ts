// @ts-nocheck
/**
 * @module CELNullUpdateService
 *
 * No-op stub for VS Code's `UpdateService` + `AbstractUpdateService`.
 * Land does NOT talk to `update.code.visualstudio.com`. Auto-update is
 * delivered through Air's signed-binary download path (separate codepath;
 * integrity-verified via Mountain.key.pub).
 *
 * Authored as a real TypeScript module that Output's esbuild step compiles
 * to `Configuration/Service/CELNullUpdateService.js` and `ApplyPipeline.ts`
 * drops at `Target/Microsoft/VSCode/vs/platform/update/common/
 * CELNullUpdateService.js`. The `ReplaceUpdateService` transform reduces
 * both `abstractUpdateService.js` and `updateService.js` to one-line
 * re-exports pointing here.
 *
 * Mirrors the `IUpdateService` interface from
 * `vs/platform/update/common/update.ts`:
 *   - state              (State.Idle getter)
 *   - onStateChange      (no-op event)
 *   - checkForUpdates(explicit)
 *   - downloadUpdate()
 *   - applyUpdate()
 *   - quitAndInstall()
 *   - isLatestVersion()
 *   - _applySpecificUpdate(packagePath)
 */

const NoopDisposable = { dispose: (): void => {} };

const NoopEvent = (
	_Listener: unknown,

	_ThisArgs?: unknown,

	_Disposables?: unknown,
): typeof NoopDisposable => NoopDisposable;

class NullUpdateService {
	readonly state = { type: "idle", updateType: 0 }; // StateType.Idle
	readonly onStateChange = NoopEvent;

	readonly _serviceBrand: undefined = undefined;

	async checkForUpdates(_Explicit?: boolean): Promise<void> {}

	async downloadUpdate(): Promise<void> {}

	async applyUpdate(): Promise<void> {}

	async quitAndInstall(): Promise<void> {}

	async isLatestVersion(): Promise<boolean> {
		return true;
	}

	async _applySpecificUpdate(_PackagePath: string): Promise<void> {}
}

export { NullUpdateService as UpdateService };

export { NullUpdateService as AbstractUpdateService };

export const UpdateService_default = NullUpdateService;

export default NullUpdateService;
