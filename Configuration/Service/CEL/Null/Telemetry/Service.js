var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const NoopPromise = Promise.resolve(void 0);
class NullTelemetryService {
	static {
		__name(this, "NullTelemetryService");
	}
	sendErrorTelemetry = false;
	telemetryLevel = 0;
	// TelemetryLevel.NONE
	sessionId = "";
	machineId = "";
	firstSessionDate = "";
	msftInternal = false;
	_serviceBrand = void 0;
	setExperimentProperty(_Name, _Value) {}
	publicLog(_EventName, _Data, _AnonymizeFilePaths) {}
	publicLog2(_EventName, _Data, _AnonymizeFilePaths) {}
	publicLogError(_ErrorEventName, _Data) {}
	publicLogError2(_ErrorEventName, _Data) {}
	getTelemetryInfo() {
		return NoopPromise;
	}
}
const TelemetryService_default = NullTelemetryService;
var Service_default = NullTelemetryService;
export {
	NullTelemetryService as TelemetryService,
	TelemetryService_default,
	Service_default as default,
};
//# sourceMappingURL=Service.js.map
