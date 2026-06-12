/**
 * @module CEL/Land/Shim/Init
 * @description
 * Entry point injected into the VS Code workbench by the InjectShimHook
 * Output Transform. Called immediately after `workbench.startup()` returns
 * the `IInstantiationService`.
 *
 * This module is compiled by Output's esbuild step to
 * `Configuration/Service/CEL/Land/Shim/Init.js` and copied to
 * `Target/Microsoft/VSCode/vs/workbench/browser/CEL/Land/Shim/Init.js`
 * BEFORE the InjectShimHook transform runs.
 *
 * The import paths below resolve at the FINAL on-disk location (inside the
 * bundled VS Code tree at depth 3 under `vs/workbench/browser/`), not at
 * this file's source location. `// @ts-nocheck` is required.
 *
 * @ts-nocheck
 */

// ── Tier gate (baked at build time by esbuild define) ──
const TierShim =
	typeof __LandTier_Shim__ !== "undefined" ? __LandTier_Shim__ : "None";

// ── Import LandDiagnostics (unified tracer) ──
import {
	recordAuditEntry,
	forceFlush,
} from "./Diagnostics/LandDiagnostics.js";

if (TierShim === "None") {
	// No-op — shim disabled. The entire module body is dead code.
} else {
	/**
	 * Called from InjectShimHook's injection site in web.main.js /
	 * desktop.main.js, immediately after `const instantiationService =
	 * workbench.startup();`.
	 *
	 * @param instantiationService - The live IInstantiationService
	 */
	(typeof globalThis !== "undefined" ? globalThis : window)[
		"LandShimInit"
	] = function (instantiationService) {
		try {
			const IS = instantiationService;

			// ─── Proxy Level: Audit-only observation 🔵 ───
			if (TierShim === "Proxy") {
				const originalSC = IS["_services"];
				if (originalSC && !originalSC["__LAND_SHIM_WRAPPED__"]) {
					wrapServiceCollectionForAudit(originalSC);
				}
				setInterval(() => {
					flushAuditLog();
				}, 30000);

				console.log(
					"[LandShim:🔵 Proxy] ServiceCollection audit active — logging all service resolutions",
				);
				return;
			}

			// ─── Replace Level: Service descriptor replacement 🔵 ───
			if (
				TierShim === "Replace" ||
				TierShim === "Own" ||
				TierShim === "Preempt"
			) {
				const originalSC = IS["_services"];
				if (originalSC) {
					replaceTelemetryService(originalSC);
				}

				console.log(
					"[LandShim:🔵 Replace] Service replacement active — telemetry silenced",
				);
			}

			// ─── Own / Preempt: 🟠 Low-Level Engine Hooks ───
			if (TierShim === "Own" || TierShim === "Preempt") {
				// Activate all 6 low-level prototype intercepts
				activateLowLevelHooks();

				console.log(
					"[LandShim:🟠 Own] Low-level engine hooks active — Error, Emitter, Cancel, Dispose, Async, Timing",
				);
			}

			// ─── Preempt: Nuclear — Land controls BrowserMain.open() ───
			if (TierShim === "Preempt") {
				console.log(
					"[LandShim:🟠 Preempt] Full container ownership — Land IS the engine",
				);
				// future: Land owns the entire InstantiationService
			}
		} catch (error) {
			console.error("[LandShim] Init failed:", error);
			// Never crash the workbench — shim failures are non-fatal
		}
	};
}

// ══════════════════════════════════════════════════════════════════════
// 🟠 LOW-LEVEL HOOK ACTIVATION
// ══════════════════════════════════════════════════════════════════════

function activateLowLevelHooks() {
	// These modules are compiled alongside Init.js and resolve at the final
	// on-disk location under vs/workbench/browser/CEL/Land/Shim/Intercept/

	try {
		// L1: ErrorHandler — catches ALL errors
		import("./Intercept/ErrorHandlerProxy.js").then((m) => {
			if (m.default) m.default();
		}).catch(() => {});

		// L2: Emitter.fire — catches ALL events
		import("./Intercept/EmitterFireProxy.js").then((m) => {
			if (m.default) m.default();
		}).catch(() => {});

		// L3: CancellationToken — catches ALL cancellations
		import("./Intercept/CancellationProxy.js").then((m) => {
			if (m.default) m.default();
		}).catch(() => {});

		// L4: DisposableStore — tracks ALL resources
		import("./Intercept/DisposableProxy.js").then((m) => {
			if (m.default) m.default();
		}).catch(() => {});

		// L5: Async scheduling — controls setTimeout0
		import("./Intercept/AsyncProxy.js").then((m) => {
			if (m.default) m.default();
		}).catch(() => {});

		// L8: Timing — microsecond-level tracing
		import("./Intercept/TimingProxy.js").then((m) => {
			if (m.default) m.default();
		}).catch(() => {});
	} catch (e) {
		// Non-fatal
	}
}

// ══════════════════════════════════════════════════════════════════════
// 🔵 ServiceCollection audit wrapper
// ══════════════════════════════════════════════════════════════════════

function wrapServiceCollectionForAudit(sc) {
	sc["__LAND_SHIM_WRAPPED__"] = true;

	const originalGet = sc.get.bind(sc);
	const originalSet = sc.set.bind(sc);

	sc.get = function (id) {
		const result = originalGet(id);
		recordAuditEntry(String(id), "get", result !== undefined);
		return result;
	};

	sc.set = function (id, instance) {
		recordAuditEntry(String(id), "set", true);
		return originalSet(id, instance);
	};
}

// ══════════════════════════════════════════════════════════════════════
// 🔵 Audit log (in-memory ring buffer, flushed to Mountain dev log)
// ══════════════════════════════════════════════════════════════════════

const auditEntries = [];
const MAX_AUDIT = 500;

function recordAuditEntryLocal(serviceId, action, resolved) {
	auditEntries.push({ ts: Date.now(), serviceId, action, resolved });
	if (auditEntries.length > MAX_AUDIT) {
		auditEntries.splice(0, auditEntries.length - MAX_AUDIT);
	}
}

function flushAuditLog() {
	if (auditEntries.length === 0) return;

	const batch = auditEntries.splice(0);
	const summary = {};
	for (const e of batch) {
		summary[e.serviceId] = (summary[e.serviceId] || 0) + 1;
	}

	try {
		const g = globalThis || window;
		const tauri = g["__TAURI__"] || {};
		const invoke = tauri["core"]?.["invoke"] ?? tauri["invoke"];
		if (typeof invoke === "function") {
			invoke("MountainIPCInvoke", {
				method: "diagnostic:log",
				params: [
					"shim-audit",
					JSON.stringify({ count: batch.length, top: summary }),
				],
			}).catch(() => {});
		}
	} catch {
		/* fire-and-forget */
	}
}

// ══════════════════════════════════════════════════════════════════════
// 🔵 Service replacement helpers
// ══════════════════════════════════════════════════════════════════════

function replaceTelemetryService(sc) {
	const originalGet = sc.get.bind(sc);

	sc.get = function (id) {
		const idStr = String(id);
		if (
			idStr.toLowerCase().includes("telemetry") ||
			idStr.toLowerCase().includes("itelemetry")
		) {
			return createNoopTelemetryService();
		}
		return originalGet(id);
	};
}

function createNoopTelemetryService() {
	return {
		setEnabled: function () {},
		telemetryLevel: {
			value: 0,
			onDidChange: {
				Event: function () {
					return { dispose: function () {} };
				},
			},
		},
		publicLog: function () {},
		publicLog2: function () {},
		publicLogError: function () {},
		publicLogError2: function () {},
		setExperimentProperty: function () {},
		setCustomEndpoint: function () {},
	};
}
