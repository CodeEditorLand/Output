/**
 * @module CEL/Land/Shim/Diagnostics/LandDiagnostics
 * @description
 * Unified tracing pipeline for ALL shim hooks — both 🟠 low-level (engine hooks)
 * and 🔵 coverage (application-level routing). Every intercepted event, error,
 * cancellation, async schedule, resource lifecycle, and service resolution
 * flows through this single module.
 *
 * Data routes:
 *   LandDiagnostics → in-memory ring buffer → flush → Mountain dev log
 *   LandDiagnostics → sampling → PostHog (telemetry)
 *   LandDiagnostics → OTLP (OpenTelemetry traces)
 *
 * Gate: only active when TierShim != None. All methods are no-ops otherwise.
 *
 * @ts-nocheck
 */

// ── Ring buffers (per category) ──
const MAX_BUFFER = 512;

/** @type {any[]} */
let errorBuffer = [];

/** @type {any[]} */
let emitterBuffer = [];

/** @type {any[]} */
let cancelBuffer = [];

/** @type {any[]} */
let disposableBuffer = [];

/** @type {any[]} */
let asyncBuffer = [];

/** @type {any[]} */
let timingBuffer = [];

/** @type {any[]} */
let auditBuffer = [];

let flushTimer = null;

const FLUSH_INTERVAL_MS = 30000;

// ── Tier gate ──
function isEnabled() {
	return (
		typeof __LandTier_Shim__ !== "undefined" && __LandTier_Shim__ !== "None"
	);
}

// ─────────────────────────────────────────────────────────────────────
// 🟠 LOW-LEVEL TRACE RECORDERS (called from Intercept/*.ts)
// ─────────────────────────────────────────────────────────────────────

export function recordErrorTrace(trace) {
	if (!isEnabled()) return;

	errorBuffer.push(trace);

	if (errorBuffer.length > MAX_BUFFER) errorBuffer.shift();

	ensureFlushTimer();
}

export function recordEmitterTrace(trace) {
	if (!isEnabled()) return;

	emitterBuffer.push(trace);

	if (emitterBuffer.length > MAX_BUFFER) emitterBuffer.shift();

	ensureFlushTimer();
}

export function recordCancelTrace(trace) {
	if (!isEnabled()) return;

	cancelBuffer.push(trace);

	if (cancelBuffer.length > MAX_BUFFER) cancelBuffer.shift();

	ensureFlushTimer();
}

export function recordDisposableTrace(trace) {
	if (!isEnabled()) return;

	disposableBuffer.push(trace);

	if (disposableBuffer.length > MAX_BUFFER) disposableBuffer.shift();

	ensureFlushTimer();
}

export function recordAsyncTrace(trace) {
	if (!isEnabled()) return;

	asyncBuffer.push(trace);

	if (asyncBuffer.length > MAX_BUFFER) asyncBuffer.shift();

	ensureFlushTimer();
}

export function recordTimingTrace(trace) {
	if (!isEnabled()) return;

	timingBuffer.push(trace);

	if (timingBuffer.length > MAX_BUFFER) timingBuffer.shift();

	ensureFlushTimer();
}

// ─────────────────────────────────────────────────────────────────────
// 🔵 COVERAGE / AUDIT RECORDERS
// ─────────────────────────────────────────────────────────────────────

export function recordAuditEntry(serviceId, action, resolved) {
	if (!isEnabled()) return;

	auditBuffer.push({ ts: Date.now(), serviceId, action, resolved });

	if (auditBuffer.length > MAX_BUFFER) auditBuffer.shift();

	ensureFlushTimer();
}

// ─────────────────────────────────────────────────────────────────────
// 🟠 SWALLOW MAP CHECK (for Emitter.fire proxy)
// ─────────────────────────────────────────────────────────────────────

/**
 * Check if an event name should be swallowed (not forwarded to VS Code listeners).
 * Simple prefix check — for full pattern matching, see Wind/Shim/SwallowMap.ts.
 */
export function checkLandSwallowMap(eventName) {
	if (!isEnabled()) return false;

	// Fast prefix checks for high-frequency events
	if (!eventName) return false;

	// Status bar events — Land handles its own
	if (
		eventName.startsWith("status") ||
		eventName.startsWith("onDidChangeStatus")
	)
		return true;

	// Telemetry events — always discard
	if (eventName.includes("telemetry") || eventName.includes("Telemetry"))
		return true;

	return false;
}

// ─────────────────────────────────────────────────────────────────────
// FLUSH TO MOUNTAIN DEV LOG
// ─────────────────────────────────────────────────────────────────────

function ensureFlushTimer() {
	if (flushTimer) return;

	flushTimer = setInterval(flushAll, FLUSH_INTERVAL_MS);
}

function flushAll() {
	const payload = {
		type: "shim-trace",

		ts: Date.now(),

		tier:
			typeof __LandTier_Shim__ !== "undefined"
				? __LandTier_Shim__
				: "None",

		buffers: {},
	};

	const buffers = {
		error: errorBuffer,

		emitter: emitterBuffer,

		cancel: cancelBuffer,

		disposable: disposableBuffer,

		async: asyncBuffer,

		timing: timingBuffer,

		audit: auditBuffer,
	};

	let hasData = false;

	for (const [key, buf] of Object.entries(buffers)) {
		if (buf.length > 0) {
			payload.buffers[key] = {
				count: buf.length,

				sample: buf.slice(0, 20),
			};

			buf.length = 0; // drain

			hasData = true;
		}
	}

	if (!hasData) return;

	try {
		const g = globalThis || window;

		const tauri = g["__TAURI__"] || {};

		const invoke = tauri["core"]?.["invoke"] ?? tauri["invoke"];

		if (typeof invoke === "function") {
			invoke("MountainIPCInvoke", {
				method: "diagnostic:log",
				params: ["shim-trace", JSON.stringify(payload)],
			}).catch(() => {});
		}
	} catch {
		/* fire-and-forget */
	}
}

/**
 * Force immediate flush (for shutdown / manual trigger).
 */
export function forceFlush() {
	if (flushTimer) {
		clearInterval(flushTimer);

		flushTimer = null;
	}

	flushAll();
}
