var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex = /vs\/platform\/telemetry\/common\/telemetryService\.js$/;
const Stub = `// LAND-PATCH: telemetryService body replaced with no-op shim.
// See Land/Element/Output/Source/Plugin/Transform/ReplaceTelemetryService.ts.
const NOOP_DISPOSABLE = { dispose: () => {} };
const NOOP_PROMISE = Promise.resolve();

class NullTelemetryService {
	constructor() {
		this.sendErrorTelemetry = false;
		this.telemetryLevel = 0; // TelemetryLevel.NONE
		this.sessionId = "";
		this.machineId = "";
		this.firstSessionDate = "";
		this.msftInternal = false;
		this._serviceBrand = undefined;
	}
	setExperimentProperty(_name, _value) {}
	publicLog(_eventName, _data, _anonymizeFilePaths) {}
	publicLog2(_eventName, _data, _anonymizeFilePaths) {}
	publicLogError(_errorEventName, _data) {}
	publicLogError2(_errorEventName, _data) {}
	getTelemetryInfo() {
		return NOOP_PROMISE;
	}
}

export { NullTelemetryService as TelemetryService };
export const TelemetryService_default = NullTelemetryService;
`;
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceTelemetryService",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: Stub };
	},
};
var ReplaceTelemetryService_default = Plugin;
export { ReplaceTelemetryService_default as default };
//# sourceMappingURL=ReplaceTelemetryService.js.map
