// @ts-nocheck
/**
 * @module CEL/Land/Shim/Intercept/DisposableProxy
 * @description
 * Intercepts `DisposableStore.prototype.add()` and `dispose()` to track
 * resource creation, ownership, and disposal for leak detection.
 *
 * Gate: only active when TierShim = Own | Preempt
 * Idempotent: checks `__LAND_SHIM_LOW_DISPOSABLE_PROXY__` marker
 *
 * Must access DisposableStore from ../../base/common/lifecycle.js
 */

import { recordDisposableTrace } from "../Diagnostics/LandDiagnostics.js";

/** @type {boolean} — gate baked at build time by esbuild define */
const __LandTier_Shim__: string =
	typeof (globalThis as any)?.__LandTier_Shim__ !== "undefined"
		? (globalThis as any).__LandTier_Shim__
		: "None";

const DisposableProxy = async (): Promise<void> => {
	if (__LandTier_Shim__ !== "Own" && __LandTier_Shim__ !== "Preempt") {
		return;
	}

	// Idempotency guard
	const marker: string = "__LAND_SHIM_LOW_DISPOSABLE_PROXY__";

	if ((globalThis as any)[marker]) {
		return;
	}

	try {
		const lifecycleModule = await import("../../base/common/lifecycle.js");

		if (!lifecycleModule || !lifecycleModule.DisposableStore) {
			return;
		}

		patchDisposableStore(lifecycleModule.DisposableStore, marker);
	} catch {
		// Non-fatal
	}
};

/**
 * Unique ID counter for disposable tracking.
 */
let disposableIdCounter: number = 0;

/**
 * Patches DisposableStore.prototype.add and dispose to track
 * resource lifecycle.
 */
function patchDisposableStore(DisposableStore: any, marker: string): void {
	const proto: any = DisposableStore.prototype;

	if (!proto || proto[marker]) {
		return;
	}

	// ── Patch add() ──────────────────────────────────────────────────
	const originalAdd: Function = proto.add;

	proto.add = function (disposable: any): any {
		const id: number = ++disposableIdCounter;

		// Tag the disposable with a tracking ID
		try {
			if (disposable && typeof disposable === "object") {
				disposable.__landDisposableId = id;

				disposable.__landDisposableStore =
					this.__landStoreId ?? "unknown";
			}

			const trace: any = {
				action: "add",

				id,

				ts: Date.now(),

				storeId: this.__landStoreId ?? "anonymous",

				typeName:
					disposable && typeof disposable === "object"
						? (disposable.constructor?.name ?? "object")
						: String(disposable),
			};

			recordDisposableTrace(trace);
		} catch {
			// Non-blocking
		}

		return originalAdd.apply(this, arguments);
	};

	// ── Patch dispose() ─────────────────────────────────────────────
	const originalDispose: Function = proto.dispose;

	proto.dispose = function (): void {
		// Track disposal before resources are released
		try {
			// Count tracked disposables before disposal
			const trackedCount: number = this._store ? this._store.size : 0;

			const trace: any = {
				action: "dispose",

				ts: Date.now(),

				storeId: this.__landStoreId ?? "anonymous",

				trackedCount,
			};

			recordDisposableTrace(trace);
		} catch {
			// Non-blocking
		}

		// Always call original
		return originalDispose.apply(this, arguments);
	};

	proto[marker] = true;
}

export default DisposableProxy;
