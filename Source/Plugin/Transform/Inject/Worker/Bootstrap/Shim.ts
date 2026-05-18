/**
 * Inject `__name` / `__defProp` shim into the blob-worker bootstrap
 * built by `webWorkerServiceImpl.js::getWorkerBootstrapUrl`.
 *
 * VS Code creates two distinct kinds of blob worker:
 *
 *   1. The extension-host worker, spawned indirectly via the iframe at
 *      `vs/workbench/services/extensions/worker/webWorkerExtensionHostIframe.html`.
 *      That iframe's inline script is patched by `InjectNameShim.ts`,
 *      which prefixes the blob with the helpers.
 *
 *   2. The general-purpose Monaco workers (editor language services,
 *      semantic tokens, search, ...) that go through
 *      `vs/platform/webWorker/browser/webWorkerServiceImpl.js`.
 *      `getWorkerBootstrapUrl` builds a blob whose content array is:
 *
 *          `/*${label}*\/`,
 *          `globalThis._VSCODE_NLS_MESSAGES = ...;`,
 *          `globalThis._VSCODE_NLS_LANGUAGE = ...;`,
 *          `globalThis._VSCODE_FILE_ROOT = ...;`,
 *          `const ttPolicy = ...;`,
 *          `globalThis.workerttPolicy = ttPolicy;`,
 *          `await import(...);`,
 *          `globalThis.postMessage({ type: 'vscode-worker-ready' });`,
 *          `/*${label}*\/`
 *
 *      Notably, NO esbuild-helper shim. The imported worker module
 *      brings its own `var __name = ...` if it was emitted by ESBuild,
 *      but Vite/Rollup-bundled chunks may have been mangled
 *      (`__name` → `$4e`) and the helper var either tree-shaken or
 *      moved into a different chunk that the worker doesn't import.
 *      The result is the runtime error
 *
 *          ReferenceError: Can't find variable: $4e
 *              at <blob-uuid>:7
 *
 *      surfacing from a Monaco language worker (TS / CSS / HTML / JSON
 *      services) the moment the editor opens a file.
 *
 * Inject the same `var __defProp=...; var __name=...;` shim seen in
 * `InjectNameShim.ts` as a string literal between the leading
 * `/*${label}*\/` marker and the first `globalThis.*` assignment, so
 * every blob worker created via this path inherits the helpers in
 * its module scope before the `await import(...)` line runs.
 *
 * Idempotent: skip if `__LAND_WORKER_NAME_SHIM__` marker is already
 * present in the file.
 */

import type { TransformPlugin } from "../../../../Type.js";

const Marker = "/* __LAND_WORKER_NAME_SHIM__ */";

const ShimLine =
	'`var __defProp=Object.defineProperty;var __name=(t,v)=>__defProp(t,"name",{value:v,configurable:true});`,';

// `webWorkerServiceImpl.js` is byte-copied from VS Code's `out/` tree
// (`loader: { ".js": "copy" }` - see `Source/ESBuild/Microsoft/
// VSCode.ts`), so the on-disk form keeps `tsc`'s indentation. The
// nested `coalesce([ \`/*${label}*/\`, \`globalThis._VSCODE_NLS_*\` ])`
// array sits 12 spaces deep inside `getWorkerBootstrapUrl`. Anchor
// captures the indent so the replacement preserves it - if upstream
// reflows the helper, the regex still matches at any indent depth and
// the inserted shim line stays aligned with the surrounding array
// entries.
const AnchorRegex =
	/(`\/\*\$\{label\}\*\/`,)([ 	]*\n[ 	]*)(`globalThis\._VSCODE_NLS_MESSAGES = )/;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "InjectWorkerBootstrapShim",
	Match: ({ Path }) =>
		/\/vs\/platform\/webWorker\/browser\/webWorkerServiceImpl\.js$/.test(
			Path,
		),
	Transform({ Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!AnchorRegex.test(Source)) return { Kind: "Unchanged" };
		const Next = Source.replace(
			AnchorRegex,
			(_M, Head, Indent, NlsHead) =>
				`${Head}${Indent}${ShimLine}${Indent}${NlsHead}`,
		);
		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Marker + "\n" + Next };
	},
};

export default Plugin;
