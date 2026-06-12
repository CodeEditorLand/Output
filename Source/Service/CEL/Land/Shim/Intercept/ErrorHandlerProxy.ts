// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/ErrorHandlerProxy
 * @description
 * Intercepts `errorHandler.onUnexpectedError()` to record all errors
 * into LandErrorTrace BEFORE VS Code processes them.
 *
 * Gate: only active when TierShim = Own | Preempt
 * Idempotent: checks `__LAND_SHIM_LOW_ERROR_HANDLER_PROXY__` marker
 *
 * Import paths resolve at final on-disk location inside the VS Code tree
 * (depth 3 under `vs/workbench/browser/`).
 */

import { recordErrorTrace } from "../Diagnostics/LandDiagnostics.js";

/** @type {boolean} — gate baked at build time by esbuild define */
const __LandTier_Shim__: string =
	typeof (globalThis as any)?.__LandTier_Shim__ !== "undefined"
		? (globalThis as any).__LandTier_Shim__
		: "None";

const ErrorHandlerProxy = async (): Promise<void> => {
	// Only activate at Own or Preempt tiers
	if (__LandTier_Shim__ !== "Own" && __LandTier_Shim__ !== "Preempt") {
		return;
	}

	// Idempotency guard
	const marker: string = "__LAND_SHIM_LOW_ERROR_HANDLER_PROXY__";
	if ((globalThis as any)[marker]) {
		return;
	}

	try {
		// errorHandler is imported dynamically — it lives at
		// vs/base/common/errors.js and is a singleton module.
		// At this point in workbench startup it is guaranteed loaded.
		const errorHandlerModule = await import("../../base/common/errors.js");

		if (!errorHandlerModule || !errorHandlerModule.errorHandler) {
			return;
		}

		patchErrorHandler(errorHandlerModule.errorHandler, marker);
	} catch (err) {
		// Non-fatal — shim must never crash the workbench
	}
};

/**
 * Patches errorHandler.onUnexpectedError to intercept calls.
 */
function patchErrorHandler(errorHandler: any, marker: string): void {
	if (errorHandler[marker]) {
		return; // already patched
	}

	const originalOnUnexpectedError: Function =
		errorHandler.onUnexpectedError.bind(errorHandler);

	errorHandler.onUnexpectedError = function (error: any): void {
		// Record into LandErrorTrace before VS Code sees it
		try {
			const trace: any = {
				ts: Date.now(),
				message:
					error instanceof Error
						? error.message
						: String(error ?? "unknown"),
				stack:
					error instanceof Error
						? error.stack?.slice(0, 1024) ?? ""
						: "",
				name: error instanceof Error ? error.name : "non-error",
			};
			recordErrorTrace(trace);
		} catch {
			// Tracing itself must not throw
		}

		// Pass through to original handler
		try {
			return originalOnUnexpectedError(error);
		} catch {
			// Absorb — original may panic but we already captured trace
		}
	};

	errorHandler[marker] = true;
}

export default ErrorHandlerProxy;
