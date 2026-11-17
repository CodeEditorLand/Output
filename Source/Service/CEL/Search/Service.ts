// @ts-nocheck
/**
 * @module CELSearchService
 *
 * Tauri-IPC-backed `ISearchService` that delegates file/text search to
 * Mountain's `search:findFiles` / `search:findInFiles` handlers, replacing
 * stock VS Code's `RemoteSearchService` (browser + electron-browser
 * variants).
 *
 * Why: the stock implementation instantiates a `LocalFileSearchWorkerClient`
 * web-worker that walks files via the HTML File System Access API. Under
 * Tauri/WKWebView the API isn't available the same way, the worker bundle
 * ships under a `vscode-file://` scheme that WKWebView can't fetch, and even
 * if it loaded, the worker walker doesn't honour `.gitignore`. Net effect in
 * Land before this shim: the search panel left-rail shows files the user
 * can't search, the match counter says 0, and ignored folders (`Target/`,
 * `node_modules/`) appear in results.
 *
 * Mountain already has the right backend wired:
 *   - `search:findInFiles` -> `SearchProvider::TextSearch` (grep-searcher +
 *     `RegexMatcherBuilder` + `ignore::WalkBuilder::build_parallel()` with
 *     `.gitignore` support).
 *   - `search:findFiles`   -> `WorkspaceProvider::FindFilesInWorkspace`
 *     (globset glob walker, `.gitignore`-aware by default).
 *
 * Authored as a real TypeScript module that Output's esbuild step compiles
 * to `Configuration/Service/CELSearchService.js` and `ApplyPipeline.ts`
 * drops at `Target/Microsoft/VSCode/vs/workbench/services/search/common/
 * CELSearchService.js`. Both `electron-browser/searchService.js` and
 * `browser/searchService.js` are reduced by `ReplaceSearchService` to
 * one-line re-exports pointing at this canonical sibling.
 *
 * `// @ts-nocheck` because the relative imports below resolve at the FINAL
 * on-disk location (depth 4 inside the bundled VS Code tree), not at this
 * file's source location. esbuild with `bundle: false` emits them
 * unchanged. Parameter decorators in the constructor below rely on
 * `experimentalDecorators: true` (set in `@playform/build`'s base tsconfig
 * which Output extends) and emit the standard `__decorate`/`__param`
 * helpers automatically.
 */

import { Disposable } from "../../../../base/common/lifecycle.js";

import { Schemas } from "../../../../base/common/network.js";

import { URI } from "../../../../base/common/uri.js";

import { IModelService } from "../../../../editor/common/services/model.js";

import { IFileService } from "../../../../platform/files/common/files.js";

import {
	InstantiationType,
	registerSingleton,
} from "../../../../platform/instantiation/common/extensions.js";

import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";

import { ILogService } from "../../../../platform/log/common/log.js";

import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";

import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";

import { IEditorService } from "../../editor/common/editorService.js";

import { IExtensionService } from "../../extensions/common/extensions.js";

import {
	ISearchService,
	SearchErrorCode,
	SearchProviderType,
} from "../common/search.js";

import { SearchService } from "../common/searchService.js";

// A failed backend call is reported as a tagged rejection, never as an empty
// success. `SearchService#searchWithProviders` deserializes the rejection into
// a `SearchError` which the search view surfaces as a visible workbench error.
class SearchBackendError extends Error {

	constructor(Operation, Detail) {
		super(`Search backend failure in ${Operation}: ${Detail}`);

		this.name = "SearchBackendError";

		this.operation = Operation;

		this.code = SearchErrorCode.other;
	}
}

const DescribeError = (Error) =>
	Error && Error.message ? String(Error.message) : String(Error);

const Warn = (LogService, Message) => {

	if (LogService && typeof LogService.warn === "function") {
		LogService.warn(Message);
	} else {
		console.warn(Message);
	}
};

// Always throws; callers `return FailSearch(...)` so a rejected invoke cannot
// fall through into an empty-result return.
const FailSearch = (LogService, Error) => {

	Warn(LogService, Error && Error.message ? Error.message : String(Error));

	throw Error;
};

const TauriInvoke = (Operation, Channel, Args) => {

	const Bridge = (globalThis && globalThis.__TAURI__) || null;

	const Invoke =
		(Bridge && Bridge.core && Bridge.core.invoke) ||
		(Bridge && Bridge.invoke);

	if (typeof Invoke !== "function") {
		return Promise.reject(
			new SearchBackendError(Operation, "the Tauri IPC bridge is absent"),
		);
	}

	// Mirror of `TauriMainProcessService.InvokeMountain` (Wind/Output): the
	// single Tauri command `MountainIPCInvoke` takes a named { method,
	// params } payload and the IPC dispatcher in Mountain matches `method`
	// against its handler arms (search:findInFiles, search:findFiles, ...).
	try {
		return Invoke("MountainIPCInvoke", {
			method: Channel,
			params: Args,
		}).then(
			(Value) => {

				if (Value === undefined || Value === null) {
					throw new SearchBackendError(
						Operation,
						"the backend returned no result",
					);
				}

				return Value;
			},
			(Error) => {
				throw Error instanceof SearchBackendError
					? Error
					: new SearchBackendError(Operation, DescribeError(Error));
			},
		);
	} catch (Error) {
		return Promise.reject(
			Error instanceof SearchBackendError
				? Error
				: new SearchBackendError(Operation, DescribeError(Error)),
		);
	}
};

const ToUri = (Raw) => {

	try {
		return typeof Raw === "string" ? URI.parse(Raw) : URI.revive(Raw);
	} catch {
		return URI.parse("file:///");
	}
};

const BuildIncludePattern = (Query) => {

	if (!Query) return "**";

	if (typeof Query.filePattern === "string" && Query.filePattern.length > 0) {
		return Query.filePattern;
	}

	const Folders = Array.isArray(Query.folderQueries)

		? Query.folderQueries
		: [];

	if (Folders.length > 0) return "**";

	return "**";
};

const BuildExcludePattern = (Query) => {

	if (!Query) return "";

	const Sources = [];

	if (Query.excludePattern && typeof Query.excludePattern === "object") {
		Sources.push(Object.keys(Query.excludePattern));
	}

	const Folders = Array.isArray(Query.folderQueries)

		? Query.folderQueries
		: [];

	for (const Folder of Folders) {
		if (
			Folder &&
			Folder.excludePattern &&
			typeof Folder.excludePattern === "object"
		) {
			const P = Folder.excludePattern.pattern || Folder.excludePattern;

			if (P && typeof P === "object") Sources.push(Object.keys(P));
		}
	}

	const Flat = [];

	for (const Set of Sources) {
		for (const Key of Set) Flat.push(Key);
	}

	return Flat.join(",");
};

class MountainTauriSearchProvider extends Disposable {

	constructor(LogService) {
		super();

		this.LogService = LogService || null;
	}

	async getAIName() {
		return undefined;
	}

	async clearCache(_CacheKey) {
		/* Mountain manages its own LRU cache. */
	}

	async fileSearch(Query, Token) {
		const Include = BuildIncludePattern(Query);

		const Exclude = BuildExcludePattern(Query);

		const Cap = (Query && Query.maxResults) || 10000;

		if (!Token) {
			Warn(this.LogService, "fileSearch: no cancellation token supplied");
		}

		let Raw;

		try {
			Raw = await TauriInvoke("fileSearch", "search:findFiles", [
				Include,

				Exclude,

				Cap,

				true,

				false,
			]);
		} catch (Error) {
			return FailSearch(this.LogService, Error);
		}

		if (!Array.isArray(Raw)) {
			return FailSearch(
				this.LogService,
				new SearchBackendError(
					"fileSearch",
					"the backend returned a malformed result",
				),
			);
		}

		const Uris = Raw;

		const Results = [];

		for (const Uri of Uris) {
			if (Token && Token.isCancellationRequested) {
				return {
					results: Results,
					messages: [],
					limitHit: Results.length >= Cap,
				};
			}

			Results.push({ resource: ToUri(Uri) });
		}

		return { results: Results, messages: [], limitHit: Uris.length >= Cap };
	}

	async textSearch(Query, OnProgress, Token) {
		const Pattern =
			(Query && Query.contentPattern && Query.contentPattern.pattern) ||
			"";

		if (!Pattern) {
			return { results: [], messages: [], limitHit: false };
		}

		const IsRegex = !!(
			Query &&
			Query.contentPattern &&
			Query.contentPattern.isRegExp
		);

		const IsCase = !!(
			Query &&
			Query.contentPattern &&
			Query.contentPattern.isCaseSensitive
		);

		const IsWord = !!(
			Query &&
			Query.contentPattern &&
			Query.contentPattern.isWordMatch
		);

		const Include = BuildIncludePattern(Query);

		const Exclude = BuildExcludePattern(Query);

		const Cap = (Query && Query.maxResults) || 10000;

		if (!Token) {
			Warn(this.LogService, "textSearch: no cancellation token supplied");
		}

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

		let Raw;

		try {
			Raw = await TauriInvoke("textSearch", "search:findInFiles", [
				QueryShape,

				OptionsShape,
			]);
		} catch (Error) {
			return FailSearch(this.LogService, Error);
		}

		if (!Array.isArray(Raw)) {
			return FailSearch(
				this.LogService,
				new SearchBackendError(
					"textSearch",
					"the backend returned a malformed result",
				),
			);
		}

		const Files = Raw;

		const Results = [];

		let TotalMatches = 0;

		for (const File of Files) {
			if (Token && Token.isCancellationRequested) {
				return {
					results: Results,
					messages: [],
					limitHit: TotalMatches >= Cap,
				};
			}

			if (!File || typeof File !== "object") continue;

			const Resource = ToUri(File.resource);

			if (!Array.isArray(File.matches)) {
				return FailSearch(
					this.LogService,
					new SearchBackendError(
						"textSearch",
						"the backend returned a malformed per-file match list",
					),
				);
			}

			const Matches = File.matches;

			const Hits = [];

			for (const Match of Matches) {
				if (Token && Token.isCancellationRequested) break;

				const Line = Math.max(0, ((Match && Match.lineNumber) || 1) - 1);

				const Cols = Array.isArray(Match && Match.columns)
					? Match.columns
					: [];

				const Ranges =
					Cols.length > 0
						? Cols
						: [{ start: 0, end: ((Match && Match.preview) || "").length }];

				const RangeLocations = [];

				for (const Range of Ranges) {
					if (Token && Token.isCancellationRequested) break;

					RangeLocations.push({
						source: {
							startLineNumber: Line,
							startColumn: Range.start || 0,
							endLineNumber: Line,
							endColumn: Range.end || 0,
						},
						preview: {
							startLineNumber: 0,
							startColumn: Range.start || 0,
							endLineNumber: 0,
							endColumn: Range.end || 0,
						},
					});
				}

				Hits.push({
					rangeLocations: RangeLocations,
					previewText: (Match && Match.preview) || "",
				});

				if (Token && Token.isCancellationRequested) break;
			}

			TotalMatches += Hits.length;

			const FileMatch = { resource: Resource, results: Hits };

			Results.push(FileMatch);

			if (Token && Token.isCancellationRequested) {
				return {
					results: Results,
					messages: [],
					limitHit: TotalMatches >= Cap,
				};
			}

			if (typeof OnProgress === "function") {
				try {
					OnProgress(FileMatch);
				} catch {
					/* swallow */
				}
			}
		}

		return {
			results: Results,

			messages: [],

			limitHit: TotalMatches >= Cap,
		};
	}
}

// Parameter-decorator slot order MUST match the constructor signature.
// Mirrors the upstream `out/.../browser/searchService.js` block so the DI
// container resolves each service the same way it does for stock VS Code.
class RemoteSearchService extends SearchService {

	declare instantiationService: any;

	constructor(
		@IModelService ModelService: any,

		@IEditorService EditorService: any,

		@ITelemetryService TelemetryService: any,

		@ILogService LogService: any,

		@IExtensionService ExtensionService: any,

		@IFileService FileService: any,

		@IInstantiationService InstantiationServiceArg: any,

		@IUriIdentityService UriIdentityService: any,
	) {
		super(
			ModelService,

			EditorService,

			TelemetryService,

			LogService,

			ExtensionService,

			FileService,

			UriIdentityService,
		);

		this.instantiationService = InstantiationServiceArg;

		const Provider = new MountainTauriSearchProvider(LogService);

		this.registerSearchResultProvider(
			Schemas.file,

			SearchProviderType.file,

			Provider,
		);

		this.registerSearchResultProvider(
			Schemas.file,

			SearchProviderType.text,

			Provider,
		);
	}
}

export { RemoteSearchService };

// Preserve the upstream DI registration so consumers binding ISearchService
// receive the Mountain-backed implementation transparently.
registerSingleton(
	ISearchService,

	RemoteSearchService,

	InstantiationType.Delayed,
);

// Re-export the legacy worker client name as a no-op subclass so any
// consumer reaching for it (debug overlays, internal tools) still gets a
// constructible class without inheriting the broken web-worker plumbing.
export class LocalFileSearchWorkerClient extends MountainTauriSearchProvider {}
