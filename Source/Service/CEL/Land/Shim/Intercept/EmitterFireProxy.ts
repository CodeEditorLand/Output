// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/EmitterFireProxy
 * @description
 * Intercepts `Emitter.prototype.fire()` to check LandSwallowMap before
 * dispatching to listeners. Uses sample-based tracing (1% in production,
 * 100% in development) to keep overhead minimal on hot paths.
 *
 * Gate: only active when TierShim = Own | Preempt
 * Idempotent: checks `__LAND_SHIM_LOW_EMITTER_FIRE_PROXY__` marker
 *
 * Must access Emitter from ../../base/common/event.js
 */

import {
	checkLandSwallowMap,
	recordEmitterTrace,
} from "../Diagnostics/LandDiagnostics.js";

/** @type {boolean} — gate baked at build time by esbuild define */
const __LandTier_Shim__: string =
	typeof (globalThis as any)?.__LandTier_Shim__ !== "undefined"
		? (globalThis as any).__LandTier_Shim__
		: "None";

/**
 * Sampling rate: 100% in dev, 1% in production
 */
const SAMPLE_RATE: number =
	__LandTier_Shim__ === "Own" || __LandTier_Shim__ === "Preempt"
		? typeof (globalThis as any)?.__LandDevMode__ === "boolean" &&
			(globalThis as any).__LandDevMode__
			? 1.0
			: 0.01
		: 0;

/** Tick counter for approximate throttling — avoids Date.now() on hot path */
let tickCount: number = 0;

const EmitterFireProxy = async (): Promise<void> => {

	if (__LandTier_Shim__ !== "Own" && __LandTier_Shim__ !== "Preempt") {
		return;
	}

	// Idempotency guard
	const marker: string = "__LAND_SHIM_LOW_EMITTER_FIRE_PROXY__";

	if ((globalThis as any)[marker]) {
		return;
	}

	try {
		const eventModule = await import("../../base/common/event.js");

		if (!eventModule || !eventModule.Emitter) {
			return;
		}

		patchEmitterFire(eventModule.Emitter, marker);
	} catch {
		// Non-fatal
	}
};

/**
 * Patches Emitter.prototype.fire to intercept event dispatching.
 */
function patchEmitterFire(Emitter: any, marker: string): void {

	const proto: any = Emitter.prototype;

	if (!proto || proto[marker]) {
		return;
	}

	const originalFire: Function = proto.fire;

	proto.fire = function (event: any): void {
		tickCount++;

		// Check LandSwallowMap — if the event should be silenced, drop it
		try {
			const eventName: string =
				event && typeof event === "object" && "name" in event
					? String(event.name)

					: typeof event === "string"
						? event
						: "";

			if (eventName && checkLandSwallowMap(eventName)) {
				// Event suppressed by shim policy
				return;
			}

			// Sample-based tracing
			if (
				SAMPLE_RATE > 0 &&
				tickCount % _sampleThreshold(SAMPLE_RATE) === 0
			) {
				const trace: any = {
					ts: Date.now(),

					eventName: eventName || "(anonymous)",

					listenerCount:
						(this._listeners && this._listeners.size) ?? 0,
				};

				recordEmitterTrace(trace);
			}
		} catch {
			// Tracing must not block dispatch
		}

		// Always call original — this is the hot path
		return originalFire.apply(this, arguments);
	};

	proto[marker] = true;
}

/**
 * Computes the interval at which to sample (e.g., rate=1.0 => every call,
 * rate=0.01 => every 100th call).
 */
function _sampleThreshold(rate: number): number {

	return rate >= 1.0 ? 1 : Math.max(1, Math.round(1 / rate));
}

export default EmitterFireProxy;
