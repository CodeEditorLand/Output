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

const URLPattern =
	/new URL\(\s*[`'"]([^`'"]+(?:webWorkerExtensionHostIframe\.html|extensionHostWorkerMain[^`'"]*))[`'"]\s*,\s*import\.meta\.url\s*\)/g;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "RewriteWorkerURLs",
	Match: ({ Path }) =>
		Path.endsWith("vs/workbench/services/extensions/browser/webWorkerExtensionHost.js") ||
		Path.endsWith("vs/workbench/api/worker/extensionHostWorkerMain.js"),
	Transform({ Path, Source }) {
		if (Source.includes(Marker)) return { Kind: "Unchanged" };
		if (!URLPattern.test(Source)) return { Kind: "Unchanged" };
		URLPattern.lastIndex = 0;

		const SourceFileDir = Path.split("/").slice(0, -1).join("/");

		const Next = Source.replace(URLPattern, (_Match, RelPath: string) => {
			// Strip any `?query` suffix (VS Code uses `?esm`) before
			// path-resolving; reapply if present.
			const QueryIndex = RelPath.indexOf("?");
			const PathOnly = QueryIndex >= 0 ? RelPath.slice(0, QueryIndex) : RelPath;
			const Query = QueryIndex >= 0 ? RelPath.slice(QueryIndex) : "";

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
			Joined = Joined.replace(
				/^.*?\/Target\/Microsoft\/VSCode\//,
				"",
			);

			return `new URL("/Static/Application/${Joined}${Query}", location.origin)`;
		});

		if (Next === Source) return { Kind: "Unchanged" };
		return { Kind: "Rewrite", Source: Marker + "\n" + Next };
	},
};

export default Plugin;
