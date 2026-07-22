// @ts-nocheck
/**
 * @module CELNullTelemetryService
 *
 * No-op stub for VS Code's `TelemetryService`. Land does not phone home,
 * does not collect telemetry, and ships with consent off pre-baked.
 * Mirrors the `ITelemetryService` interface from
 * `vs/platform/telemetry/common/telemetry.ts` so static `import`
 * references inside `workbench.*.main.js` resolve cleanly; consumers
 * that DO call `publicLog` / `publicLogError` / etc. hit no-op methods.
 *
 * Authored as a real TypeScript module that Output's esbuild step compiles
 * to `Configuration/Service/CELNullTelemetryService.js` and
 * `ApplyPipeline.ts` drops at
 * `Target/Microsoft/VSCode/vs/platform/telemetry/common/CELNullTelemetryService.js`
 * (sibling of the original). The `ReplaceTelemetryService` transform reduces
 * the original module body to a one-line re-export pointing here.
 *
 * Compounds with `Network.ts` (excludes wire-level appenders) and
 * `InjectTelemetryConsentOff` (pre-bakes consent off at boot) - three
 * layers neutralise telemetry: consent off -> service no-op -> appender
 * absent.
 */

const NoopPromise: Promise<undefined> = Promise.resolve(undefined);

class NullTelemetryService {

	readonly sendErrorTelemetry = false;

	readonly telemetryLevel = 0; // TelemetryLevel.NONE

	readonly sessionId = "";

	readonly machineId = "";

	readonly firstSessionDate = "";

	readonly msftInternal = false;

	readonly _serviceBrand: undefined = undefined;

	setExperimentProperty(_Name: string, _Value: unknown): void {}

	publicLog(
		_EventName: string,

		_Data?: unknown,

		_AnonymizeFilePaths?: boolean,
	): void {}

	publicLog2(
		_EventName: string,

		_Data?: unknown,

		_AnonymizeFilePaths?: boolean,
	): void {}

	publicLogError(_ErrorEventName: string, _Data?: unknown): void {}

	publicLogError2(_ErrorEventName: string, _Data?: unknown): void {}

	getTelemetryInfo(): Promise<undefined> {
		return NoopPromise;
	}
}

export { NullTelemetryService as TelemetryService };

export const TelemetryService_default = NullTelemetryService;

export default NullTelemetryService;
