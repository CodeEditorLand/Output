// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/TimingProxy
 * @description
 * Intercepts `StopWatch` constructor, `stop()`, and `elapsed()` to record
 * high-precision (microsecond-level) timing data for diagnostic analysis.
 *
 * Gate: only active when TierShim = Own | Preempt
 * Idempotent: checks `__LAND_SHIM_LOW_TIMING_PROXY__` marker
 *
 * Must access StopWatch from ../../base/common/stopwatch.js
 */

import { recordTimingTrace } from "../Diagnostics/LandDiagnostics.js";

/** @type {boolean} — gate baked at build time by esbuild define */
const __LandTier_Shim__: string =
	typeof (globalThis as any)?.__LandTier_Shim__ !== "undefined"
		? (globalThis as any).__LandTier_Shim__
		: "None";

/**
 * Unique ID counter for StopWatch instances.
 */
let stopwatchIdCounter: number = 0;

/**
 * Sampling rate for timing traces — always 100% since StopWatch usage
 * is sparse compared to event fire() / setTimeout0.
 */
const TIMING_SAMPLE_RATE: number = 1.0;

const TimingProxy = async (): Promise<void> => {
	if (__LandTier_Shim__ !== "Own" && __LandTier_Shim__ !== "Preempt") {
		return;
	}

	// Idempotency guard
	const marker: string = "__LAND_SHIM_LOW_TIMING_PROXY__";

	if ((globalThis as any)[marker]) {
		return;
	}

	try {
		const stopwatchModule = await import("../../base/common/stopwatch.js");

		if (!stopwatchModule || !stopwatchModule.StopWatch) {
			return;
		}

		patchStopWatch(stopwatchModule.StopWatch, marker, stopwatchModule);
	} catch {
		// Non-fatal
	}
};

/**
 * Patches the StopWatch class to intercept construction, stop, and elapsed.
 * Records high-precision timing data with microsecond resolution where
 * available (performance.now or process.hrtime).
 */
function patchStopWatch(
	StopWatch: any,

	marker: string,

	stopwatchModule: any,
): void {
	if (StopWatch[marker]) {
		return;
	}

	const proto: any = StopWatch.prototype;

	if (!proto) {
		return;
	}

	// Capture the high-resolution time source
	const hrNow: () => number =
		typeof performance !== "undefined" &&
		typeof performance.now === "function"
			? () => performance.now()
			: typeof process !== "undefined" &&
				  typeof process.hrtime === "function"
				? () => {
						const t: [number, number] = process.hrtime();

						return t[0] * 1e6 + t[1] / 1e3; // microseconds
					}
				: () => Date.now() * 1000; // fallback: milliseconds → microseconds

	// ── Patch constructor ────────────────────────────────────────────
	const originalConstructor: Function = StopWatch;

	// We use a proxy function to intercept construction
	const ProxiedStopWatch: any = function (
		this: any,

		highResolution?: boolean,
	): any {
		const id: number = ++stopwatchIdCounter;

		let _startTime: number = 0;

		let _stopTime: number = 0;

		let _hasRun: boolean = false;

		// Call original constructor (which is actually StaticStopWatch.create)
		const instance: any =
			originalConstructor.create &&
			typeof originalConstructor.create === "function"
				? originalConstructor.create.call(
						originalConstructor,

						highResolution,
					)
				: new (Function.prototype.bind.apply(
						originalConstructor,

						[null].concat(Array.prototype.slice.call(arguments)),
					))();

		// Record construction
		try {
			const trace: any = {
				action: "create",

				id,

				ts: Date.now(),

				highResolution: !!highResolution,

				micros: hrNow(),
			};

			recordTimingTrace(trace);
		} catch {
			// Non-blocking
		}

		// ── Patch instance's stop() ─────────────────────────────────
		if (instance && typeof instance.stop === "function") {
			const originalStop: Function = instance.stop.bind(instance);

			instance.stop = function (): void {
				const result: number = originalStop();

				// Record stop event
				try {
					const nowMicros: number = hrNow();

					const trace: any = {
						action: "stop",

						id,

						ts: Date.now(),

						micros: nowMicros,

						elapsedRaw: result,
					};

					recordTimingTrace(trace);
				} catch {
					// Non-blocking
				}

				return result;
			};
		}

		// ── Patch instance's elapsed() ──────────────────────────────
		if (instance && typeof instance.elapsed === "function") {
			const originalElapsed: Function = instance.elapsed.bind(instance);

			instance.elapsed = function (): number {
				const result: number = originalElapsed();

				// Sample elapsed reads (every call — elapsed is not hot)
				try {
					const trace: any = {
						action: "elapsed",

						id,

						ts: Date.now(),

						micros: hrNow(),

						value: result,
					};

					recordTimingTrace(trace);
				} catch {
					// Non-blocking
				}

				return result;
			};
		}

		// Tag instance with tracking ID
		try {
			instance.__landStopWatchId = id;
		} catch {
			// Object might be frozen
		}

		return instance;
	};

	// Preserve static methods/properties
	ProxiedStopWatch.prototype = StopWatch.prototype;

	for (const key of Object.keys(StopWatch)) {
		try {
			(ProxiedStopWatch as any)[key] = (StopWatch as any)[key];
		} catch {
			// Skip non-assignable properties
		}
	}

	// Replace the module-level StopWatch reference
	if (stopwatchModule) {
		stopwatchModule.StopWatch = ProxiedStopWatch;
	}

	ProxiedStopWatch[marker] = true;

	stopwatchModule[marker] = true;
}

export default TimingProxy;
