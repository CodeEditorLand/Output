/**
 * Replace stock VS Code's `RemoteSearchService` (browser + electron-browser
 * variants) with a Tauri-IPC-backed `ISearchService` that delegates file/text
 * search to Mountain's `search:findFiles` / `search:findInFiles` handlers.
 *
 * Why: stock `RemoteSearchService` instantiates a `LocalFileSearchWorkerClient`
 * web-worker that walks files via the HTML File System Access API. Under
 * Tauri/WKWebView the API isn't available the same way, the worker bundle
 * ships under a `vscode-file://` scheme that WKWebView can't fetch, and even
 * if it loaded, the worker walker doesn't honour `.gitignore`. Net effect in
 * Land: the search panel left-rail shows files the user can't search, the
 * match counter says 0 because no text-search backend ever runs, and ignored
 * folders (`Target/`, `node_modules/`) appear in results.
 *
 * The replacement service lives in
 * `Element/Output/Source/Service/CELSearchService.ts` and is dropped at
 * `vs/workbench/services/search/common/CELSearchService.js` by
 * `ApplyPipeline.ts` BEFORE this transform runs. Both stock variants are
 * reduced to a one-line re-export so existing call sites keep working.
 *
 * Wire shapes (kept in one place so a future Mountain-side rename only
 * requires changing the canonical service module):
 *
 *   findFiles -> string[] of `file://...` URIs
 *   findInFiles -> [{ resource: string, matches: [{ preview, lineNumber,
 *                  columns: [{start, end}] }] }]
 */

import type { TransformPlugin } from "../../../Type.js";

// Land's electron profile bundles `electron-browser/searchService.js`; the
// browser/ variant ships the upstream worker provider. Match BOTH so this
// transform covers either bundle target.
const Markers = [
	"workbench/services/search/electron-browser/searchService.js",

	"workbench/services/search/browser/searchService.js",
];

const PathRegex = new RegExp(
	`(?:${Markers.map((Marker) => Marker.replaceAll("/", "\\/")).join("|")})$`,
);

const ReExport =
	"export { RemoteSearchService, LocalFileSearchWorkerClient } from '../common/CELSearchService.js';\n";

const Plugin: TransformPlugin = {
	Kind: "Transform",

	Name: "ReplaceSearchService",

	Enabled: () => process.env["Electron"] === "true",

	Match: ({ Path }) => PathRegex.test(Path),

	Transform() {
		return { Kind: "Rewrite", Source: ReExport };
	},
};

export default Plugin;
