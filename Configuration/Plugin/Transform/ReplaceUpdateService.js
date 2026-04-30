var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const PathRegex = /vs\/platform\/update\/common\/(?:abstractUpdateService|updateService)\.js$/;
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
const Plugin = {
  Kind: "Transform",
  Name: "ReplaceUpdateService",
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform() {
    return { Kind: "Rewrite", Source: Stub };
  }
};
var ReplaceUpdateService_default = Plugin;
export {
  ReplaceUpdateService_default as default
};
//# sourceMappingURL=ReplaceUpdateService.js.map
