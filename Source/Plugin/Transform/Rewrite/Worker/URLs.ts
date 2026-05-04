/**
 * Rewrite worker-script URLs from relative-to-`import.meta.url` form
 * into absolute origin-based URLs.
 *
 * VS Code sources use:
 *   new URL("./worker.html", import.meta.url)
 * which resolves relative to the importing chunk's URL. That works
 * when each `vs/**` file is served from its original path (the
 * existing `/Static/Application/` route). It breaks when Vite
 * bundles the workbench into `_astro/workbench.HASH.js` because
 * `import.meta.url` then points at `_astro/`, and the relative
 * resolution lands on a path the dev server returns 404 HTML for -
 * the JS parser crashes with `SyntaxError: Unexpected token '<'`.
 *
 * The fix: rewrite each known relative URL to an absolute string
 * pinned to `/Static/Application/<canonical-path>`. Sky's existing
 * pipeline still copies the worker assets there even in bundled
 * profiles, so the absolute URL resolves regardless of where the
 * bundled chunk lives.
 *
 * Idempotent via `__LAND_WORKER_URLS_REWRITTEN__` marker.
 */

import type { TransformPlugin } from "../Type.js";

const Marker = "/* __LAND_WORKER_URLS_REWRITTEN__ */";

// Match every `new URL(<path>, import.meta.url)` pattern where <path>
// targets a worker entry that downstream consumers (Vite/Rollup, the
// runtime FileAccess resolver, the dev server) can't deliver under the
// bundled chunk URL.
//
// Concrete entries observed in VS Code's `out/` tree:
//   - `webWorkerExtensionHostIframe.html` (extension-host iframe shell)
//   - `extensionHostWorkerMain.ts?esm`    (extension-host worker entry)
//   - `editorWebWorkerMain.ts?esm`        (Monaco editor worker entry)
//
// Generalised to `*WorkerMain.ts?esm` / `*Iframe.html` so a future
// upstream addition (e.g. a notebook or LLM worker) fires automatically
// without a separate transform. The `[^`'"]+` capture absorbs the full
// relative path; the resolver below maps `.ts` / `.tsx` to `.js` and
// drops the `?esm` query.
const URLPattern =
	/new URL\(\s*[`'"]([^`'"]+(?:WorkerMain\.tsx?(?:\?[^`'"]*)?|Iframe\.html))[`'"]\s*,\s*import\.meta\.url\s*\)/g;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewriteWorkerURLs",
	// Every JS file under `vs/` is in scope - the URLPattern test below
	// short-circuits when no matching `new URL(...)` is present, so
	// non-affected files are walked-and-skipped with no rewrite.
	Match: ({ Path }) =>
		/\/vs\/.*\.js$/.test(Path) && !/\.d\.ts\.map$/.test(Path),
	Transform({ Path, Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!URLPattern.test(Source)) return { Kind: "Unchanged" };
		URLPattern.lastIndex = 0;

		const SourceFileDir = Path.split("/").slice(0, -1).join("/");

		const Next = Source.replace(URLPattern, (_Match, RelPath: string) => {
			// Strip any `?query` suffix (VS Code uses `?esm`) before
			// path-resolving. The query is intentionally DISCARDED for
			// the rewritten URL: VS Code's source-level path uses
			// `extensionHostWorkerMain.ts?esm` to signal Vite to import
			// it as an ESM module, but our pipeline serves the compiled
			// `.js` artefact directly through Mountain's HTTP server -
			// the query has no consumer downstream and just adds noise
			// to the request path.
			const QueryIndex = RelPath.indexOf("?");
			let PathOnly =
				QueryIndex >= 0 ? RelPath.slice(0, QueryIndex) : RelPath;

			// Source-level `.ts` references (`extensionHostWorkerMain.ts`)
			// survive into VS Code's `out/` tree because `tsc` does not
			// rewrite string-literal URLs. Map them to the compiled `.js`
			// artefact - the only file that exists on disk under
			// `Static/Application/`. Without this, the worker fetch lands
			// on a 404, the dev server returns SPA HTML, and the worker
			// blob crashes with `SyntaxError: Unexpected token '<'`.
			if (PathOnly.endsWith(".ts")) {
				PathOnly = PathOnly.slice(0, -3) + ".js";
			} else if (PathOnly.endsWith(".tsx")) {
				PathOnly = PathOnly.slice(0, -4) + ".js";
			}

			// Resolve `./` and `../` segments against the source file dir.
			const Segments = (SourceFileDir + "/" + PathOnly).split("/");
			const Resolved: string[] = [];
			for (const Segment of Segments) {
				if (Segment === "" || Segment === ".") continue;
				if (Segment === "..") {
					Resolved.pop();
					continue;
				}
				Resolved.push(Segment);
			}

			// Strip any leading `Target/Microsoft/VSCode/` if the input
			// path included it; the canonical Sky-served prefix is
			// `/Static/Application/`.
			let Joined = Resolved.join("/");
			Joined = Joined.replace(/^.*?\/Target\/Microsoft\/VSCode\//, "");

			return `new URL("/Static/Application/${Joined}", location.origin)`;
		});

		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Marker + "\n" + Next };
	},
};

export default Plugin;
