const t =
		/vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/,
	a = `// LAND-PATCH: updateService body replaced with no-op stub.
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
`,
	r = {
		Kind: "Transform",
		Name: "ReplaceUpdateService",
		Match: ({ Path: e }) => t.test(e),
		Transform() {
			return { Kind: "Rewrite", Source: a };
		},
	};
var s = r;
export { s as default };
