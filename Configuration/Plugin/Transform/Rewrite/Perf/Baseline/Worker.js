const r = "/* __LAND_PERF_BASELINE_INLINED__ */",

	c = "            const jsSrc = (function () {",

	o = "            }).toString();",

	f =
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
			].join(`
`),
		) +
		";",

	a = {
		Kind: "Transform",
		Name: "RewritePerfBaselineWorker",
		Match: ({ Path: n }) =>
			/\/vs\/workbench\/services\/timer\/browser\/timerService\.js$/.test(
				n,
			),
		Transform({ Source: n }) {
			if (n.includes(r)) return { Kind: "Unchanged" };
			const e = n.indexOf(c);
			if (e < 0) return { Kind: "Unchanged" };
			const t = n.indexOf(o, e);
			if (t < 0) return { Kind: "Unchanged" };
			const i = t + o.length,
				s = n.slice(0, e) + f + n.slice(i);
			return {
				Kind: "Rewrite",
				Source:
					r +
					`
` +
					s,
			};
		},
	};
var l = a;
export { l as default };
