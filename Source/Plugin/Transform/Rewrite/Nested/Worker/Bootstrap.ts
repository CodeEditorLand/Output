/**
 * Replace `polyfillNestedWorker.js`'s `.toString()`-derived bootstrap
 * source with a literal string that no mangler can touch.
 *
 * Original pattern (paraphrased):
 *
 *     const _bootstrapFnSource = (function _bootstrapFn(workerUrl) {
 *         const listener = __name((event) => { ... }, "listener");
 *         globalThis.addEventListener("message", listener);
 *     }).toString();
 *
 *     // later, in the NestedWorker ctor:
 *     const bootstrap = `((${_bootstrapFnSource})('${stringOrUrl}'))`;
 *     const blob = new Blob([bootstrap], { type: "application/javascript" });
 *
 * After Vite/OXC bundles the parent chunk into Sky's `_astro/` output,
 * the chunk-local `__name` helper gets mangled (e.g. `$4e`). The
 * `_bootstrapFn` function's source - including its `__name(...)`
 * decorations - gets mangled the same way. Calling `.toString()` on
 * the mangled function returns the mangled source as a string, which
 * gets dropped into the blob. The blob worker has its own module scope
 * and the mangled identifier (`$4e`) is NOT defined - the worker
 * crashes on first activation with
 *
 *     ReferenceError: Can't find variable: $4e
 *         at <blob-uuid>:7
 *
 * The `__name(fn, "label")` decorations are purely cosmetic - they set
 * `Function.name` for stack-trace clarity and have no functional
 * effect. Replacing the IIFE-toString'd source with a literal string
 * that omits them produces a bootstrap script that mangler-passes
 * verbatim and runs identically in the new worker's scope.
 *
 * Idempotent: skip if the marker is already present.
 */

import type { TransformPlugin } from "../../../../Type.js";

const Marker = "/* __LAND_NESTED_WORKER_BOOTSTRAP_INLINED__ */";

// Anchor matches the un-minified `tsc` form from VS Code's `out/`
// tree (now byte-copied via `loader: { ".js": "copy" }` - see
// `Source/ESBuild/Microsoft/VSCode.ts`). No `__name(...)` wrapping
// because `keepNames` is off; the IIFE body references only globals
// (`globalThis.*`, `importScripts`, `MessageEvent`, …), so Sky's
// downstream Vite/Rollup mangler can rename the inner binding without
// breaking the worker. The literal-string replacement is still
// preferable: it removes the `.toString()` round-trip and gives the
// blob worker a source that is immune to any future bundler change.
const Anchor = `const _bootstrapFnSource = (function _bootstrapFn(workerUrl) {`;

const ReplacementSource = `const _bootstrapFnSource = ${JSON.stringify(
	[
		"function _bootstrapFn(workerUrl) {",

		"  const listener = function(event) {",

		"    globalThis.removeEventListener('message', listener);",

		"    const port = event.data;",

		"    Object.defineProperties(globalThis, {",

		"      'postMessage': {",

		"        value: function(data, transferOrOptions) {",

		"          port.postMessage(data, transferOrOptions);",

		"        }",

		"      },",

		"      'onmessage': {",

		"        get: function() { return port.onmessage; },",

		"        set: function(value) { port.onmessage = value; }",

		"      }",

		"    });",

		"    port.addEventListener('message', function(msg) {",

		"      globalThis.dispatchEvent(new MessageEvent('message', {",

		"        data: msg.data,",

		"        ports: msg.ports ? [...msg.ports] : void 0",

		"      }));",

		"    });",

		"    port.start();",

		"    globalThis.Worker = class {",

		"      constructor() {",

		"        throw new TypeError('Nested workers from within nested worker are NOT supported.');",

		"      }",

		"    };",

		"    importScripts(workerUrl);",

		"  };",

		"  globalThis.addEventListener('message', listener);",

		"}",
	].join("\n"),
)};`;

const Plugin: TransformPlugin = {

	Kind: "Transform",

	Name: "RewriteNestedWorkerBootstrap",

	Match: ({ Path }) =>
		/\/vs\/workbench\/services\/extensions\/worker\/polyfillNestedWorker\.js$/.test(
			Path,
		),

	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };

		const Index = Source.indexOf(Anchor);

		if (Index < 0) return { Kind: "Unchanged" };

		// The closure runs from `Anchor` through the matching
		// `}).toString();` - find that exact tail and splice it out
		// together with the `_bootstrapFn` body. We use a stable
		// substring search rather than a regex so the bracket counting
		// stays robust against minified / re-formatted variants.
		const TailMarker = `}).toString();`;

		const TailIdx = Source.indexOf(TailMarker, Index);

		if (TailIdx < 0) return { Kind: "Unchanged" };

		const BlockEnd = TailIdx + TailMarker.length;

		const Next =
			Source.slice(0, Index) + ReplacementSource + Source.slice(BlockEnd);

		return {
			Kind: "Rewrite",

			Source: Marker + "\n" + Next,
		};
	},
};

export default Plugin;
