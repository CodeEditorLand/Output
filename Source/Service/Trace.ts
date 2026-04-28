/**
 * @module Service/Trace
 *
 * Zero-dependency browser tracing for Land runtime code.
 *
 * - Uses `performance.mark()` / `performance.measure()` (Web Performance API)
 * - Build-baked OTELBridge.ts collects marks and exports to OTLP
 * - Marks fire unconditionally - zero runtime gating
 * - ESBuild can tree-shake unused exports in production
 */

const AppDataPattern = /land\.editor\.binary\.[^\s/\\)]+/g;

const Format = (Message: string): string =>
	Message.replace(AppDataPattern, "$APP");

/**
 * Emit a trace event via performance.mark().
 * OTELBridge collects all `land:*` marks automatically.
 */
const Trace = (
	Tag: string,
	Message: string,
	Detail?: Record<string, unknown>,
): void => {
	try {
		performance.mark(`land:${Tag}:${Message}`, {
			detail: Detail ? { ...Detail, Tag } : { Tag },
		});
	} catch {}
};

/**
 * Start a trace span. Returns a function to end it.
 * Uses performance.measure() for duration tracking.
 */
const TraceSpan = (Tag: string, SpanName: string): (() => void) => {
	const MarkName = `land:${Tag}:${SpanName}:start`;
	try {
		performance.mark(MarkName);
	} catch {}

	return () => {
		try {
			performance.measure(`land:${Tag}:${SpanName}`, MarkName);
		} catch {}
	};
};

/**
 * Trace an error via performance.mark().
 */
const TraceError = (Tag: string, Message: string, Error?: unknown): void => {
	try {
		performance.mark(`land:error:${Tag}:${Format(Message)}`, {
			detail: { Tag, Error: Error ? String(Error) : undefined },
		});
	} catch {}
};

export { Trace, TraceSpan, TraceError, Format };
export default Trace;
