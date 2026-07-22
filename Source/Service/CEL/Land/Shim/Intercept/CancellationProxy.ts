// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/CancellationProxy
 * @description
 * Intercepts `CancellationTokenSource.prototype.cancel()` to record every
 * cancellation with timestamp and stack trace for diagnostic purposes.
 *
 * Gate: only active when TierShim = Own | Preempt
 * Idempotent: checks `__LAND_SHIM_LOW_CANCELLATION_PROXY__` marker
 *
 * Must access CancellationTokenSource from ../../base/common/cancellation.js
 */

import { recordCancellationTrace } from "../Diagnostics/LandDiagnostics.js";

/** @type {boolean} — gate baked at build time by esbuild define */
const __LandTier_Shim__: string =
	typeof (globalThis as any)?.__LandTier_Shim__ !== "undefined"
		? (globalThis as any).__LandTier_Shim__
		: "None";

const CancellationProxy = async (): Promise<void> => {

	if (__LandTier_Shim__ !== "Own" && __LandTier_Shim__ !== "Preempt") {
		return;
	}

	// Idempotency guard
	const marker: string = "__LAND_SHIM_LOW_CANCELLATION_PROXY__";

	if ((globalThis as any)[marker]) {
		return;
	}

	try {
		const cancellationModule =
			await import("../../base/common/cancellation.js");

		if (
			!cancellationModule ||
			!cancellationModule.CancellationTokenSource
		) {
			return;
		}

		patchCancellation(cancellationModule.CancellationTokenSource, marker);
	} catch {
		// Non-fatal
	}
};

/**
 * Patches CancellationTokenSource.prototype.cancel to record
 * every cancellation event with metadata.
 */
function patchCancellation(CancellationTokenSource: any, marker: string): void {

	const proto: any = CancellationTokenSource.prototype;

	if (!proto || proto[marker]) {
		return;
	}

	const originalCancel: Function = proto.cancel;

	proto.cancel = function (): void {
		// Record cancellation before the original runs
		try {
			const stack: string = new Error().stack?.slice(0, 1024) ?? "";

			const trace: any = {
				ts: Date.now(),

				stack,

				alreadyCancelled:
					this.token && this.token.isCancellationRequested === true,
			};

			recordCancellationTrace(trace);
		} catch {
			// Tracing must not throw
		}

		// Always call original
		return originalCancel.apply(this, arguments);
	};

	proto[marker] = true;
}

export default CancellationProxy;
