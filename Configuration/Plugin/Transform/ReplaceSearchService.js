var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const Markers = [
  "workbench/services/search/electron-browser/searchService.js",
  "workbench/services/search/browser/searchService.js"
];
const PathRegex = new RegExp(
  `(?:${Markers.map((M) => M.replaceAll("/", "\\/")).join("|")})$`
);
const Body = `// [Land] ReplaceSearchService transform
// Original: vs/workbench/services/search/browser/searchService.ts
// Replacement: Tauri-IPC backed ISearchService \u2192 Mountain search:* handlers.

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

export class RemoteSearchService extends SearchService {
	constructor(modelService, editorService, telemetryService, logService, extensionService, fileService, instantiationService, uriIdentityService) {
		super(modelService, editorService, telemetryService, logService, extensionService, fileService, uriIdentityService);
		const Provider = new MountainTauriSearchProvider();
		this.registerSearchResultProvider(Schemas.file, SearchProviderType.file, Provider);
		this.registerSearchResultProvider(Schemas.file, SearchProviderType.text, Provider);
	}
}

// Preserve the upstream DI registration so consumers binding ISearchService
// receive the Mountain-backed implementation transparently.
registerSingleton(ISearchService, RemoteSearchService, InstantiationType.Delayed);

// Re-export the legacy worker client name as a no-op subclass so any
// consumer reaching for it (debug overlays, internal tools) still gets a
// constructible class without inheriting the broken web-worker plumbing.
export class LocalFileSearchWorkerClient extends MountainTauriSearchProvider {}
`;
const Plugin = {
  Kind: "Transform",
  Name: "ReplaceSearchService",
  Enabled: /* @__PURE__ */ __name(() => process.env["Electron"] === "true", "Enabled"),
  Match: /* @__PURE__ */ __name(({ Path }) => PathRegex.test(Path), "Match"),
  Transform() {
    return { Kind: "Rewrite", Source: Body };
  }
};
var ReplaceSearchService_default = Plugin;
export {
  ReplaceSearchService_default as default
};
//# sourceMappingURL=ReplaceSearchService.js.map
