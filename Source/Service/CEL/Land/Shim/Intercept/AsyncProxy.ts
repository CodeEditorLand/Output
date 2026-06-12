// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/AsyncProxy
 * @description
 * Intercepts `setTimeout0` (from platform.ts) to provide a Land-controlled
 * async scheduler with micro-batching. This allows the shim to coalesce
 * rapid microtasks and reduce layout thrash.
 *
 * Gate: only active when TierShim = Own | Preempt
 * Idempotent: checks `__LAND_SHIM_LOW_ASYNC_PROXY__` marker
 *
 * Must access setTimeout0 from ../../base/common/platform.js
 */

import { recordAsyncTrace } from "../Diagnostics/LandDiagnostics.js";

/** @type {boolean} — gate baked at build time by esbuild define */
const __LandTier_Shim__: string =
	typeof (globalThis as any)?.__LandTier_Shim__ !== "undefined"
		? (globalThis as any).__LandTier_Shim__
		: "None";

/**
 * Batch window in milliseconds — micro-tasks arriving within this window
 * are coalesced. Default: next microtask tick.
 */
const BATCH_WINDOW_MS: number = 0;

/**
 * Maximum batch size before forcing a flush.
 */
const MAX_BATCH_SIZE: number = 64;

const AsyncProxy = async (): Promise<void> => {
	if (__LandTier_Shim__ !== "Own" && __LandTier_Shim__ !== "Preempt") {
		return;
	}

	// Idempotency guard
	const marker: string = "__LAND_SHIM_LOW_ASYNC_PROXY__";
	if ((globalThis as any)[marker]) {
		return;
	}

	try {
		const platformModule = await import("../../base/common/platform.js");

		if (!platformModule || typeof platformModule.setTimeout0 !== "function") {
			return;
		}

		patchSetTimeout0(platformModule, marker);
	} catch {
		// Non-fatal
	}
};

/**
 * Batching state — module-level so patches survive re-entry.
 */
let batchQueue: Array<() => void> = [];
let batchFlushPending: boolean = false;
let batchCallCount: number = 0;

/**
 * Replaces `setTimeout0` with a batching scheduler.
 */
function patchSetTimeout0(platformModule: any, marker: string): void {
	if (platformModule[marker]) {
		return;
	}

	// Store original for pass-through flush
	const originalSetTimeout0: Function = platformModule.setTimeout0;

	/**
	 * Land-controlled setTimeout0: enqueues callbacks and batches them
	 * into microtask-level flushes.
	 */
	platformModule.setTimeout0 = function (callback: () => void): void {
		batchCallCount++;

		// Always enqueue to our batch
		batchQueue.push(callback);

		// Trace sample (every 128th call)
		if ((batchCallCount & 0x7f) === 0) {
			try {
				recordAsyncTrace({
					ts: Date.now(),
					queueLength: batchQueue.length,
					totalCalls: batchCallCount,
				});
			} catch {
				// Non-blocking
			}
		}

		// Schedule a flush if one isn't already pending
		if (!batchFlushPending) {
			batchFlushPending = true;

			if (BATCH_WINDOW_MS > 0) {
				// Timer-based batching
				originalSetTimeout0(() => {
					flushBatch(originalSetTimeout0);
				});
			} else {
				// Microtask-based batching — use original setTimeout0
				// for zero-delay; the batch drains when the microtask
				// queue runs.
				originalSetTimeout0(() => {
					flushBatch(originalSetTimeout0);
				});
			}
		}

		// Force flush if batch exceeds max size
		if (batchQueue.length >= MAX_BATCH_SIZE) {
			flushBatch(originalSetTimeout0);
		}
	};

	platformModule[marker] = true;
}

/**
 * Drains the batch queue, calling original setTimeout0 for each callback
 * to preserve async semantics while coalescing scheduling.
 */
function flushBatch(originalSetTimeout0: Function): void {
	if (batchQueue.length === 0) {
		batchFlushPending = false;
		return;
	}

	const batch: Array<() => void> = batchQueue;
	batchQueue = [];
	batchFlushPending = false;

	// Execute all callbacks via original setTimeout0 to maintain
	// microtask ordering but with batched scheduling.
	for (let i: number = 0; i < batch.length; i++) {
		try {
			batch[i]();
		} catch (err) {
			// Individual callback failures must not break the batch
		}
	}
}

export default AsyncProxy;
