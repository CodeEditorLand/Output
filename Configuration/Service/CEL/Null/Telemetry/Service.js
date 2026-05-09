const t = Promise.resolve(void 0);

class r {

	sendErrorTelemetry = !1;

	telemetryLevel = 0;

	sessionId = "";

	machineId = "";

	firstSessionDate = "";

	msftInternal = !1;

	_serviceBrand = void 0;

	setExperimentProperty(e, n) {}

	publicLog(e, n, o) {}

	publicLog2(e, n, o) {}

	publicLogError(e, n) {}

	publicLogError2(e, n) {}

	getTelemetryInfo() {

		return t;
	}
}

const a = r;

var l = r;

export { r as TelemetryService, a as TelemetryService_default, l as default };
