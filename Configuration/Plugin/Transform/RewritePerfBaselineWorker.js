var __defProp = Object.defineProperty;
var __name = (target, value) =>
	__defProp(target, "name", { value, configurable: true });
const Marker = "/* __LAND_PERF_BASELINE_INLINED__ */";
const Anchor = `            const jsSrc = (function () {`;
const Tail = `            }).toString();`;
const ReplacementSource =
	"            const jsSrc = " +
	JSON.stringify(
		[
			"function() {",
			"  let tooSlow = false;",
			"  function fib(n) {",
			"    if (tooSlow) { return 0; }",
			"    if (performance.now() - t1 >= 1e3) { tooSlow = true; }",
			"    if (n <= 2) { return n; }",
			"    return fib(n - 1) + fib(n - 2);",
			"  }",
			"  const t1 = performance.now();",
			"  fib(24);",
			"  const value = Math.round(performance.now() - t1);",
			"  self.postMessage({ value: tooSlow ? -1 : value });",
			"}",
		].join("\n"),
	) +
	";";
const Plugin = {
	Kind: "Transform",
	Name: "RewritePerfBaselineWorker",
	Match: /* @__PURE__ */ __name(
		({ Path }) =>
			/\/vs\/workbench\/services\/timer\/browser\/timerService\.js$/.test(
				Path,
			),
		"Match",
	),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		const Index = Source.indexOf(Anchor);
		if (Index < 0) return { Kind: "Unchanged" };
		const TailIdx = Source.indexOf(Tail, Index);
		if (TailIdx < 0) return { Kind: "Unchanged" };
		const BlockEnd = TailIdx + Tail.length;
		const Next =
			Source.slice(0, Index) + ReplacementSource + Source.slice(BlockEnd);
		return {
			Kind: "Rewrite",
			Source: Marker + "\n" + Next,
		};
	},
};
var RewritePerfBaselineWorker_default = Plugin;
export { RewritePerfBaselineWorker_default as default };
//# sourceMappingURL=RewritePerfBaselineWorker.js.map
