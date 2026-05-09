/**
 * Replace VS Code's `TelemetryService` body with a no-op stub.
 *
 * # Why body-rewrite (not exclusion)
 *
 * The bundled-Vite walk follows static `import` references inside
 * `workbench.desktop.main.js` / `workbench.web.main.js` /
 * `workbench.common.main.js`. Excluding the file at the entry-point
 * planner stage drops it from `Output/Target/` entirely; Rollup then
 * fails to resolve the import and the bundled profile fails to build.
 * The unbundled profile 404s at runtime on the same import.
 *
 * Solution: keep the FILE present so imports resolve, but rewrite the
 * BODY to a one-line re-export pointing at a canonical no-op sibling.
 * The sibling is authored at
 * `Element/Output/Source/Service/CELNullTelemetryService.ts` and dropped
 * by `ApplyPipeline.ts` at
 * `vs/platform/telemetry/common/CELNullTelemetryService.js` BEFORE this
 * transform runs.
 *
 * Compounds with `Network.ts` (excludes wire-level appenders) and
 * `InjectTelemetryConsentOff` (pre-bakes consent off at boot) - three
 * layers neutralise telemetry: consent off -> service no-op -> appender
 * absent.
 */

import type { TransformPlugin } from "../../../Type.js";

const PathRegex = /vs\/platform\/telemetry\/common\/telemetryService\.js$/;

const ReExport =
	"export { TelemetryService, TelemetryService_default } from './CELNullTelemetryService.js';\n" +
	"export { default } from './CELNullTelemetryService.js';\n";

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "ReplaceTelemetryService",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform() {

		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
