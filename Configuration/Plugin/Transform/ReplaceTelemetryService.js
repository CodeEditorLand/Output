const r=/vs\/platform\/telemetry\/common\/telemetryService\.js$/,t=`// LAND-PATCH: telemetryService body replaced with no-op shim.
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
`,s={Kind:"Transform",Name:"ReplaceTelemetryService",Match:({Path:e})=>r.test(e),Transform(){return{Kind:"Rewrite",Source:t}}};var l=s;export{l as default};
