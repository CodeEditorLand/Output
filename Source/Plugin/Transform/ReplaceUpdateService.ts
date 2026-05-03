/**
 * Replace VS Code's `UpdateService` body with a no-op stub.
 *
 * Same body-rewrite rationale as `ReplaceTelemetryService.ts`:
 * static `import` references inside the bundled workbench reach
 * the update-service module; we keep the file present so the
 * imports resolve, but rewrite the body to a never-update stub
 * that reports `State.Idle` forever and rejects every check.
 *
 * Land does NOT talk to `update.code.visualstudio.com`. Auto-update
 * is delivered through Air's signed-binary download path
 * (separate codepath; integrity-verified via Mountain.key.pub).
 *
 * # API surface preserved
 *
 * Mirrors the `IUpdateService` interface from
 * `vs/platform/update/common/update.ts`:
 *
 *   - state              (State.Idle getter)
 *   - onStateChange      (no-op event)
 *   - checkForUpdates(explicit)
 *   - downloadUpdate()
 *   - applyUpdate()
 *   - quitAndInstall()
 *   - isLatestVersion()
 *   - _applySpecificUpdate(packagePath)
 */

import type { TransformPlugin } from "../Type.js";

const PathRegex =
	/vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/;

const Stub = `// LAND-PATCH: updateService body replaced with no-op stub.
// See Land/Element/Output/Source/Plugin/Transform/ReplaceUpdateService.ts.
const NOOP_DISPOSABLE = { dispose: () => {} };
const NOOP_EVENT = (_listener, _thisArgs, _disposables) => NOOP_DISPOSABLE;

class NullUpdateService {
	constructor() {
		this.state = { type: "idle", updateType: 0 }; // StateType.Idle
		this.onStateChange = NOOP_EVENT;
		this._serviceBrand = undefined;
	}
	async checkForUpdates(_explicit) {}
	async downloadUpdate() {}
	async applyUpdate() {}
	async quitAndInstall() {}
	async isLatestVersion() {
		return true;
	}
	async _applySpecificUpdate(_packagePath) {}
}

export { NullUpdateService as UpdateService };
export { NullUpdateService as AbstractUpdateService };
export const UpdateService_default = NullUpdateService;
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ReplaceUpdateService",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform() {
		return { Kind: "Rewrite", Source: Stub };
	},
};

export default Plugin;
