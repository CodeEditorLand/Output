/**
 * Polyfill telemetry hook. Installs `globalThis.__LAND_POLYFILL_TELEMETRY__`
 * so other polyfill modules can route silently-caught failures to a
 * low-cardinality `captureException` call without taking a hard
 * import dependency on PostHog (which loads later, in Sky).
 *
 * Default behaviour pre-init: `On` is a no-op so polyfills that fire
 * during the bootstrap window before Sky's `PostHogBridge` runs don't
 * crash. Sky's bridge calls `Set` once `posthog-js` is ready; from
 * that point on, every silent catch reaches PostHog as a `$exception`
 * with the supplied `Category` label.
 *
 * The `Category` is intentionally a small enum-like string set
 * (`ipc.fire-and-forget`, `ipc.event.listener`, `polyfill.install`,
 * `polyfill.fallback`, ...) so PostHog's per-event-name rate limit
 * can group them. High-cardinality identifiers go in `Detail`.
 */

interface PolyfillTelemetry {

	readonly On: (
		Category: string,

		Error: unknown,

		Detail?: Record<string, unknown>,
	) => void;

	readonly Set: (
		Handler: (
			Category: string,

			Error: unknown,

			Detail?: Record<string, unknown>,
		) => void,
	) => void;
}

export default ((): PolyfillTelemetry => {
	let Handler:
		| ((
				Category: string,

				Error: unknown,

				Detail?: Record<string, unknown>,
		  ) => void)
		| null = null;

	const Telemetry: PolyfillTelemetry = {
		On(Category, Error, Detail) {
			if (Handler === null) return;
			try {
				Handler(Category, Error, Detail);
			} catch {
				// A broken handler must not turn a silent failure into a
				// louder one - swallow and move on.
			}
		},
		Set(NewHandler) {
			Handler = NewHandler;
		},
	};

	if (typeof globalThis !== "undefined") {
		(
			globalThis as { __LAND_POLYFILL_TELEMETRY__?: PolyfillTelemetry }
		).__LAND_POLYFILL_TELEMETRY__ = Telemetry;
	}

	return Telemetry;
})() satisfies PolyfillTelemetry as PolyfillTelemetry;
