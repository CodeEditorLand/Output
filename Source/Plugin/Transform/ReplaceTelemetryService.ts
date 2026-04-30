/**
 * Replace VS Code's `TelemetryService` body with a no-op stub.
 *
 * # Why body-rewrite (not exclusion)
 *
 * The bundled-Vite walk follows static `import` references inside
 * `workbench.desktop.main.js` / `workbench.web.main.js` /
 * `workbench.common.main.js`. Excluding the file at the entry-point
 * planner stage drops it from `Output/Target/` entirely; Rollup then
 * fails to resolve the import and the bundled profile fails to
 * build. The unbundled profile 404s at runtime on the same import.
 *
 * Solution: keep the FILE present so imports resolve, but rewrite
 * the BODY to a no-op shim. Every method (publicLog, publicLogError,
 * setExperimentProperty, getTelemetryInfo, etc.) returns immediately
 * with the appropriate empty value. Vite/Rollup tree-shakes the
 * unused exports from the final bundled chunk; consumers that DO
 * import a method get a no-op that bills as zero CPU and zero
 * network.
 *
 * This is the structural strip - Network.ts excludes the wire-level
 * appenders (1dsAppender / oneDataSystemAppender) so even if a
 * straggler reaches them they have no transport. Combined with
 * `InjectTelemetryConsentOff` pre-baking `telemetry.telemetryLevel:
 * "off"` at boot, three layers neutralise telemetry: consent off →
 * service no-op → appender absent.
 *
 * # API surface preserved
 *
 * Mirrors the `ITelemetryService` interface from
 * `vs/platform/telemetry/common/telemetry.ts`:
 *
 *   - publicLog(eventName, data?, anonymizeFilePaths?)
 *   - publicLog2<E, T>(eventName, data?, anonymizeFilePaths?)
 *   - publicLogError(errorEventName, data?)
 *   - publicLogError2<E, T>(errorEventName, data?)
 *   - setExperimentProperty(name, value)
 *   - sendErrorTelemetry        (boolean getter)
 *   - telemetryLevel            (TelemetryLevel.NONE getter)
 *   - sessionId / machineId / firstSessionDate / msftInternal
 */

import type { TransformPlugin } from "../Type.js";

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

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ReplaceTelemetryService",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform() {
		return { Kind: "Rewrite", Source: Stub };
	},
};

export default Plugin;
