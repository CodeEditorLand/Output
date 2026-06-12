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

			// ─── Proxy Level: Audit-only observation ───
			if (TierShim === "Proxy") {
				// Wrap the ServiceCollection with a logging proxy
				// We access it via the internal _services field
				const originalSC = IS["_services"];
				if (originalSC && !originalSC["__LAND_SHIM_WRAPPED__"]) {
					wrapServiceCollectionForAudit(originalSC);
				}

				// Start periodic audit flush (every 30s)
				setInterval(() => {
					flushAuditLog();
				}, 30000);

				console.log(
					"[LandShim:Proxy] ServiceCollection audit active — logging all service resolutions",
				);
				return;
			}

			// ─── Replace Level: Service descriptor replacement ───
			if (
				TierShim === "Replace" ||
				TierShim === "Own" ||
				TierShim === "Preempt"
			) {
				const originalSC = IS["_services"];

				// Replace ITelemetryService with no-op (zero risk)
				replaceTelemetryService(originalSC);

				// More replacements added per TierSwallow* gates

				console.log(
					"[LandShim:Replace] Service replacement active — telemetry silenced",
				);
				return;
			}

			// ─── Own / Preempt: Container ownership ───
			// (future: override _getOrCreateServiceInstance)
		} catch (error) {
			console.error("[LandShim] Init failed:", error);
			// Never crash the workbench — shim failures are non-fatal
		}
	};
}

// ─────────────────────────────────────────────────────────────────────
// ServiceCollection audit wrapper (Proxy level)
// ─────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────
// Audit log (in-memory ring buffer, flushed to Mountain dev log)
// ─────────────────────────────────────────────────────────────────────

const auditEntries = [];
const MAX_AUDIT = 500;

function recordAuditEntry(serviceId, action, resolved) {
	auditEntries.push({
		ts: Date.now(),
		serviceId,
		action,
		resolved,
	});
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

	// Send to Mountain dev log via Tauri IPC
	try {
		const invoke =
			(
				(globalThis || window)["__TAURI__"] || {}
			)["core"]?.["invoke"] ??
			((globalThis || window)["__TAURI__"] || {})["invoke"];
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
		/* diagnostic is fire-and-forget */
	}
}

// ─────────────────────────────────────────────────────────────────────
// Service replacement helpers (Replace level)
// ─────────────────────────────────────────────────────────────────────

function replaceTelemetryService(sc) {
	// ITelemetryService decorator function — VS Code registers
	// telemetry services via this identifier. We swap the
	// SyncDescriptor with a no-op factory.
	//
	// The actual ServiceIdentifier is created by createDecorator(), but
	// we don't have access to it at this scope. Instead, we intercept
	// at the set() level: when VS Code tries to register a telemetry
	// service, we store our no-op instead.
	//
	// Simplest approach: patch the ServiceCollection.get() to check
	// if the service ID string contains "telemetry" and return a
	// pre-built no-op.
	const originalGet = sc.get.bind(sc);

	sc.get = function (id) {
		const idStr = String(id);
		if (
			idStr.toLowerCase().includes("telemetry") ||
			idStr.toLowerCase().includes("itelemetry")
		) {
			// Return a no-op telemetry service
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
			onDidChange: { Event: function () {
				return { dispose: function () {} };
			} },
		},
		publicLog: function () {},
		publicLog2: function () {},
		publicLogError: function () {},
		publicLogError2: function () {},
		setExperimentProperty: function () {},
		setCustomEndpoint: function () {},
	};
}
