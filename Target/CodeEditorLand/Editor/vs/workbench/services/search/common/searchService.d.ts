import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { ResourceSet } from "../../../../base/common/map.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import {
	IAITextQuery,
	IFileQuery,
	ISearchComplete,
	ISearchProgressItem,
	ISearchResultProvider,
	ISearchService,
	ITextQuery,
	SearchProviderType,
} from "./search.js";

export declare class SearchService
	extends Disposable
	implements ISearchService
{
	private readonly modelService;
	private readonly editorService;
	private readonly telemetryService;
	private readonly logService;
	private readonly extensionService;
	private readonly fileService;
	private readonly uriIdentityService;
	readonly _serviceBrand: undefined;
	private readonly fileSearchProviders;
	private readonly textSearchProviders;
	private readonly aiTextSearchProviders;
	private deferredFileSearchesByScheme;
	private deferredTextSearchesByScheme;
	private deferredAITextSearchesByScheme;
	private loggedSchemesMissingProviders;
	constructor(
		modelService: IModelService,
		editorService: IEditorService,
		telemetryService: ITelemetryService,
		logService: ILogService,
		extensionService: IExtensionService,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
	);
	registerSearchResultProvider(
		scheme: string,
		type: SearchProviderType,
		provider: ISearchResultProvider,
	): IDisposable;
	textSearch(
		query: ITextQuery,
		token?: CancellationToken,
		onProgress?: (item: ISearchProgressItem) => void,
	): Promise<ISearchComplete>;
	aiTextSearch(
		query: IAITextQuery,
		token?: CancellationToken,
		onProgress?: (item: ISearchProgressItem) => void,
	): Promise<ISearchComplete>;
	getAIName(): Promise<string | undefined>;
	textSearchSplitSyncAsync(
		query: ITextQuery,
		token?: CancellationToken | undefined,
		onProgress?: ((result: ISearchProgressItem) => void) | undefined,
		notebookFilesToIgnore?: ResourceSet,
		asyncNotebookFilesToIgnore?: Promise<ResourceSet>,
	): {
		syncResults: ISearchComplete;
		asyncResults: Promise<ISearchComplete>;
	};
	fileSearch(
		query: IFileQuery,
		token?: CancellationToken,
	): Promise<ISearchComplete>;
	schemeHasFileSearchProvider(scheme: string): boolean;
	private doSearch;
	private getSchemesInQuery;
	private waitForProvider;
	private getSearchProvider;
	private getDeferredTextSearchesByScheme;
	private searchWithProviders;
	private groupFolderQueriesByScheme;
	private sendTelemetry;
	private getOpenEditorResults;
	private matches;
	clearCache(cacheKey: string): Promise<void>;
}
