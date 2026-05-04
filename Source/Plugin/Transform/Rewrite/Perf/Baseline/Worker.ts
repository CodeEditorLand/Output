/**
 * Replace `vs/workbench/services/timer/browser/timerService.js`'s
 * `(function() { ... __name(fib, "fib"); ... }).toString()` perfBaseline
 * worker source with a literal string that has no `__name(...)`
 * decoration.
 *
 * Same OXC-mangling-truth bug as `polyfillNestedWorker.js`: when Vite
 * inlines `timerService.js` into Sky's `_astro/partsSplash.*.js` chunk,
 * the chunk's `__name` helper gets mangled (e.g. `$4e`). The IIFE that
 * computes the perfBaseline (Fibonacci timing for startup metrics)
 * has its `__name(fib, "fib")` decoration mangled the same way.
 * Calling `.toString()` on the mangled function returns the mangled
 * source as a string. The blob then runs in a fresh worker scope where
 * `$4e` (or whatever name the chunk picked) is undefined - the worker
 * crashes at module-eval with `ReferenceError: Can't find variable: $4e`
 * (line 7 of the blob URL is the mangled `$4e(fib, "fib");` call).
 *
 * The `__name(fn, "label")` is purely cosmetic - it sets `Function.name`
 * for stack-trace clarity. Removing it from the IIFE source makes the
 * baseline worker mangler-immune. The fib computation itself is
 * unchanged.
 *
 * Idempotent: skip if marker is present.
 */

import type { TransformPlugin } from "../../../../Type.js";

const Marker = "/* __LAND_PERF_BASELINE_INLINED__ */";

// Anchor matches the un-minified `tsc` form from VS Code's `out/`
// tree (now byte-copied via `loader: { ".js": "copy" }` - see
// `Source/ESBuild/Microsoft/VSCode.ts`). The `(function () {` form
// uses `tsc`'s default whitespace (space before parens). Indent
// (12 spaces, four `.then` chain levels deep) is preserved in
// the replacement so the surrounding `.then` chain stays valid.
const Anchor = `            const jsSrc = (function () {`;

const Tail = `            }).toString();`;

// Hand-written equivalent of the VS Code IIFE, omitting the
// `__name(fib, "fib")` decoration that's the source of the mangling
// hazard. Logic is identical: time a fib(24) computation, abort early
// if it takes > 1 s, post the rounded duration back.
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

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewritePerfBaselineWorker",
	Match: ({ Path }) =>
		/\/vs\/workbench\/services\/timer\/browser\/timerService\.js$/.test(
			Path,
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

export default Plugin;
