var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const AppDataPattern = /land\.editor\.binary\.[^\s/\\)]+/g;
const Format = /* @__PURE__ */ __name(
	(Message) => Message.replace(AppDataPattern, "$APP"),
	"Format",
);
const Trace = /* @__PURE__ */ __name((Tag, Message, Detail) => {
	try {
		performance.mark(`land:${Tag}:${Message}`, {
			detail: Detail ? { ...Detail, Tag } : { Tag },
		});
	} catch {}
}, "Trace");
const TraceSpan = /* @__PURE__ */ __name((Tag, SpanName) => {
	const MarkName = `land:${Tag}:${SpanName}:start`;
	try {
		performance.mark(MarkName);
	} catch {}
	return () => {
		try {
			performance.measure(`land:${Tag}:${SpanName}`, MarkName);
		} catch {}
	};
}, "TraceSpan");
const TraceError = /* @__PURE__ */ __name((Tag, Message, Error2) => {
	try {
		performance.mark(`land:error:${Tag}:${Format(Message)}`, {
			detail: { Tag, Error: Error2 ? String(Error2) : void 0 },
		});
	} catch {}
}, "TraceError");
var Trace_default = Trace;
export { Format, Trace, TraceError, TraceSpan, Trace_default as default };
//# sourceMappingURL=Trace.js.map
