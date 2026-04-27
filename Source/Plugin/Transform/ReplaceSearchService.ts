/**
 * Replace stock VS Code's `RemoteSearchService` (browser variant) with a
 * Tauri-IPC-backed `ISearchService` that delegates file/text search to
 * Mountain's `search:findFiles` / `search:findInFiles` handlers.
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
 * Mountain already has the right backend wired:
 *   - `search:findInFiles` → `SearchProvider::TextSearch` (grep-searcher +
 *     `RegexMatcherBuilder` + `ignore::WalkBuilder::build_parallel()` with
 *     `.gitignore` support).
 *   - `search:findFiles`   → `WorkspaceProvider::FindFilesInWorkspace`
 *     (globset glob walker, `.gitignore`-aware by default).
 *
 * Both run native (Rust + ripgrep semantics) so they're faster than the
 * browser worker AND they automatically pick up workspace-folder changes
 * via Mountain's `ApplicationState.Workspace.WorkspaceFolders`.
 *
 * The transform completely rewrites `services/search/browser/searchService.js`
 * with a self-contained module that:
 *   1. Subclasses the abstract `SearchService` from `../common/searchService`.
 *   2. Registers a `MountainTauriSearchProvider` for the `file:` scheme as
 *      both `SearchProviderType.file` and `SearchProviderType.text`.
 *   3. Calls `__TAURI__.core.invoke(...)` with the matching channel name
 *      and shapes the response into `ISearchComplete`.
 *   4. Keeps the original `registerSingleton(ISearchService, ...)` call so
 *      the workbench DI container still sees the override.
 *
 * Wire shapes (kept in one place so a future Mountain-side rename only
 * requires changing this plugin):
 *
 *   findFiles → string[] of `file://...` URIs
 *   findInFiles → [{ resource: string, matches: [{ preview, lineNumber,
 *                  columns: [{start, end}] }] }]
 *
 * If the global `__TAURI__` IPC bridge isn't available at construction
 * time the provider falls back to returning empty results so the workbench
 * doesn't throw - the search panel renders `0 results` instead of crashing.
 */

import type { TransformPlugin } from "../Type.js";

// Land's electron profile bundles `electron-browser/searchService.js` (which
// upstream registers the abstract `SearchService` with NO providers, so the
// search panel returns 0 hits because nothing's wired). The browser/ variant
// at least registers a `LocalFileSearchWorkerClient` web-worker provider but
// that walker can't honour `.gitignore` and depends on the HTML File System
// Access API. Match BOTH so this transform covers either bundle target.
const Markers = [
	"workbench/services/search/electron-browser/searchService.js",
	"workbench/services/search/browser/searchService.js",
];
const PathRegex = new RegExp(
	`(?:${Markers.map((M) => M.replaceAll("/", "\\/")).join("|")})$`,
);

const Body = `// [Land] ReplaceSearchService transform
// Original: vs/workbench/services/search/browser/searchService.ts
// Replacement: Tauri-IPC backed ISearchService → Mountain search:* handlers.

// TypeScript-compiled decorator helpers. Required for parameter-decorator
// based DI metadata. Without these, the IInstantiationService binds the
// constructor positionally with NO knowledge of which service goes where,
// so every dependency arrives as \`undefined\` and the first method call
// (\`this.uriIdentityService.extUri\`) crashes. Mirrored verbatim from
// VS Code's compiled output (\`out/.../searchService.js\` lines 5-13).
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
	return function (target, key) { decorator(target, key, paramIndex); }
};

import { Schemas } from '../../../../base/common/network.js';
import { URI } from '../../../../base/common/uri.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { ISearchService, SearchProviderType } from '../common/search.js';
import { SearchService } from '../common/searchService.js';
import { IModelService } from '../../../../editor/common/services/model.js';
import { IEditorService } from '../../editor/common/editorService.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IExtensionService } from '../../extensions/common/extensions.js';
import { IFileService } from '../../../../platform/files/common/files.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IUriIdentityService } from '../../../../platform/uriIdentity/common/uriIdentity.js';

const TauriInvoke = (Channel, Args) => {
	const Bridge = (globalThis && globalThis.__TAURI__) || null;
	const Invoke = (Bridge && Bridge.core && Bridge.core.invoke) || (Bridge && Bridge.invoke);
	if (typeof Invoke !== 'function') {
		return Promise.resolve(null);
	}
	// Mirror of \`TauriMainProcessService.InvokeMountain\` (Wind/Output): the
	// single Tauri command \`MountainIPCInvoke\` takes a named { method,
	// params } payload and the IPC dispatcher in Mountain matches \`method\`
	// against its handler arms (search:findInFiles, search:findFiles, ...).
	try {
		return Invoke('MountainIPCInvoke', { method: Channel, params: Args }).catch(() => null);
	} catch (_e) {
		return Promise.resolve(null);
	}
};

const ToUri = (Raw) => {
	try {
		return typeof Raw === 'string' ? URI.parse(Raw) : URI.revive(Raw);
	} catch (_e) {
		return URI.parse('file:///');
	}
};

const BuildIncludePattern = (Query) => {
	if (!Query) return '**';
	if (typeof Query.filePattern === 'string' && Query.filePattern.length > 0) {
		return Query.filePattern;
	}
	const Folders = Array.isArray(Query.folderQueries) ? Query.folderQueries : [];
	if (Folders.length > 0) return '**';
	return '**';
};

const BuildExcludePattern = (Query) => {
	if (!Query) return '';
	const Sources = [];
	if (Query.excludePattern && typeof Query.excludePattern === 'object') {
		Sources.push(Object.keys(Query.excludePattern));
	}
	const Folders = Array.isArray(Query.folderQueries) ? Query.folderQueries : [];
	for (const Folder of Folders) {
		if (Folder && Folder.excludePattern && typeof Folder.excludePattern === 'object') {
			const P = Folder.excludePattern.pattern || Folder.excludePattern;
			if (P && typeof P === 'object') Sources.push(Object.keys(P));
		}
	}
	const Flat = [];
	for (const Set of Sources) {
		for (const Key of Set) Flat.push(Key);
	}
	return Flat.join(',');
};

class MountainTauriSearchProvider extends Disposable {
	constructor() { super(); }
	async getAIName() { return undefined; }
	async clearCache(_cacheKey) { /* Mountain manages its own LRU cache. */ }
	async fileSearch(query, _token) {
		const Include = BuildIncludePattern(query);
		const Exclude = BuildExcludePattern(query);
		const Cap = (query && query.maxResults) || 10000;
		const Raw = await TauriInvoke('search:findFiles', [Include, Exclude, Cap, true, false]);
		const Uris = Array.isArray(Raw) ? Raw : [];
		const Results = Uris.map((U) => ({ resource: ToUri(U) }));
		return { results: Results, messages: [], limitHit: Uris.length >= Cap };
	}
	async textSearch(query, onProgress, _token) {
		const Pattern = (query && query.contentPattern && query.contentPattern.pattern) || '';
		if (!Pattern) {
			return { results: [], messages: [], limitHit: false };
		}
		const IsRegex = !!(query && query.contentPattern && query.contentPattern.isRegExp);
		const IsCase = !!(query && query.contentPattern && query.contentPattern.isCaseSensitive);
		const IsWord = !!(query && query.contentPattern && query.contentPattern.isWordMatch);
		const Include = BuildIncludePattern(query);
		const Exclude = BuildExcludePattern(query);
		const Cap = (query && query.maxResults) || 10000;
		const QueryShape = {
			pattern: Pattern,
			isRegExp: IsRegex,
			isCaseSensitive: IsCase,
			isWordMatch: IsWord,
			isMultiline: false,
		};
		const OptionsShape = {
			includePattern: Include,
			excludePattern: Exclude,
			maxResults: Cap,
		};
		const Raw = await TauriInvoke('search:findInFiles', [QueryShape, OptionsShape]);
		const Files = Array.isArray(Raw) ? Raw : [];
		const Results = [];
		let TotalMatches = 0;
		for (const File of Files) {
			if (!File || typeof File !== 'object') continue;
			const Resource = ToUri(File.resource);
			const Matches = Array.isArray(File.matches) ? File.matches : [];
			const Hits = Matches.map((M) => {
				const Line = Math.max(0, ((M && M.lineNumber) || 1) - 1);
				const Cols = Array.isArray(M && M.columns) ? M.columns : [];
				const Ranges = Cols.length > 0 ? Cols : [{ start: 0, end: ((M && M.preview) || '').length }];
				return {
					rangeLocations: Ranges.map((R) => ({
						source: { startLineNumber: Line, startColumn: (R.start || 0), endLineNumber: Line, endColumn: (R.end || 0) },
						preview: { startLineNumber: 0, startColumn: (R.start || 0), endLineNumber: 0, endColumn: (R.end || 0) },
					})),
					previewText: ((M && M.preview) || ''),
				};
			});
			TotalMatches += Hits.length;
			const FileMatch = { resource: Resource, results: Hits };
			Results.push(FileMatch);
			if (typeof onProgress === 'function') {
				try { onProgress(FileMatch); } catch (_e) { /* swallow */ }
			}
		}
		return { results: Results, messages: [], limitHit: TotalMatches >= Cap };
	}
}

// \`let class = ...\` (not \`export class\`) so the post-decorate reassignment
// can replace the binding with the decorated class. TypeScript emits this
// shape for every class with parameter decorators - mirroring it keeps
// the DI metadata wiring identical to upstream.
let RemoteSearchService = class RemoteSearchService extends SearchService {
	constructor(modelService, editorService, telemetryService, logService, extensionService, fileService, instantiationService, uriIdentityService) {
		super(modelService, editorService, telemetryService, logService, extensionService, fileService, uriIdentityService);
		this.instantiationService = instantiationService;
		const Provider = new MountainTauriSearchProvider();
		this.registerSearchResultProvider(Schemas.file, SearchProviderType.file, Provider);
		this.registerSearchResultProvider(Schemas.file, SearchProviderType.text, Provider);
	}
};
// Parameter-decorator metadata. Slot order MUST match the constructor
// signature above. Mirrors the upstream
// \`out/.../browser/searchService.js\` block exactly so the DI container
// resolves each \`@IService\` binding the same way it does for stock VS Code.
RemoteSearchService = __decorate([
	__param(0, IModelService),
	__param(1, IEditorService),
	__param(2, ITelemetryService),
	__param(3, ILogService),
	__param(4, IExtensionService),
	__param(5, IFileService),
	__param(6, IInstantiationService),
	__param(7, IUriIdentityService),
], RemoteSearchService);
export { RemoteSearchService };

// Preserve the upstream DI registration so consumers binding ISearchService
// receive the Mountain-backed implementation transparently.
registerSingleton(ISearchService, RemoteSearchService, InstantiationType.Delayed);

// Re-export the legacy worker client name as a no-op subclass so any
// consumer reaching for it (debug overlays, internal tools) still gets a
// constructible class without inheriting the broken web-worker plumbing.
export class LocalFileSearchWorkerClient extends MountainTauriSearchProvider {}
`;

const Plugin: TransformPlugin = {
	Kind: "Transform",
	Name: "ReplaceSearchService",
	Enabled: () => process.env["Electron"] === "true",
	Match: ({ Path }) => PathRegex.test(Path),
	Transform() {
		return { Kind: "Rewrite", Source: Body };
	},
};

export default Plugin;
