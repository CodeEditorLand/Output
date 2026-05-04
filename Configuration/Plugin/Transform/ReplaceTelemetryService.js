var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const PathRegex = /vs\/platform\/telemetry\/common\/telemetryService\.js$/;
const ReExport =
	"export { TelemetryService, TelemetryService_default } from './CELNullTelemetryService.js';\nexport { default } from './CELNullTelemetryService.js';\n";
const Plugin = {
	Kind: "Transform",
	Name: "ReplaceTelemetryService",
	Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};
var ReplaceTelemetryService_default = Plugin;
export { ReplaceTelemetryService_default as default };
//# sourceMappingURL=ReplaceTelemetryService.js.map
