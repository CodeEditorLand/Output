const r = /vs\/platform\/telemetry\/common\/telemetryService\.js$/,

	t = `export { TelemetryService, TelemetryService_default } from './CELNullTelemetryService.js';
export { default } from './CELNullTelemetryService.js';

`,
	l = {

		Kind: "Transform",

		Name: "ReplaceTelemetryService",

		Match: ({ Path: e }) => r.test(e),

		Transform() {

			return { Kind: "Rewrite", Source: t };
		},
	};

var m = l;

export { m as default };
