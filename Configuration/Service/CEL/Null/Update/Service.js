var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const NoopDisposable = { dispose: /* @__PURE__ */ __name(() => {}, "dispose") };
const NoopEvent = /* @__PURE__ */ __name(
	(_Listener, _ThisArgs, _Disposables) => NoopDisposable,
	"NoopEvent",
);
class NullUpdateService {
	static {
		__name(this, "NullUpdateService");
	}
	state = { type: "idle", updateType: 0 };
	// StateType.Idle
	onStateChange = NoopEvent;
	_serviceBrand = void 0;
	async checkForUpdates(_Explicit) {}
	async downloadUpdate() {}
	async applyUpdate() {}
	async quitAndInstall() {}
	async isLatestVersion() {
		return true;
	}
	async _applySpecificUpdate(_PackagePath) {}
}
const UpdateService_default = NullUpdateService;
var Service_default = NullUpdateService;
export {
	NullUpdateService as AbstractUpdateService,
	NullUpdateService as UpdateService,
	UpdateService_default,
	Service_default as default,
};
//# sourceMappingURL=Service.js.map
