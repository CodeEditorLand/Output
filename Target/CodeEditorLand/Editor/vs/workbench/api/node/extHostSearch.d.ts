import type * as vscode from "vscode";

import { IDisposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import * as pfs from "../../../base/node/pfs.js";
import { ILogService } from "../../../platform/log/common/log.js";
import {
	IFileQuery,
	IRawFileQuery,
	ISearchCompleteStats,
	ITextQuery,
} from "../../services/search/common/search.js";
import { TextSearchManager } from "../../services/search/common/textSearchManager.js";
import { IExtHostConfiguration } from "../common/extHostConfiguration.js";
import { IExtHostInitDataService } from "../common/extHostInitDataService.js";
import { IExtHostRpcService } from "../common/extHostRpcService.js";
import { ExtHostSearch } from "../common/extHostSearch.js";
import { IURITransformerService } from "../common/extHostUriTransformerService.js";

export declare class NativeExtHostSearch
	extends ExtHostSearch
	implements IDisposable
{
	private readonly configurationService;
	protected _pfs: typeof pfs;
	private _internalFileSearchHandle;
	private _internalFileSearchProvider;
	private _registeredEHSearchProvider;
	private _numThreadsPromise;
	private readonly _disposables;
	private isDisposed;
	constructor(
		extHostRpc: IExtHostRpcService,
		initData: IExtHostInitDataService,
		_uriTransformer: IURITransformerService,
		configurationService: IExtHostConfiguration,
		_logService: ILogService,
	);
	private handleConfigurationChanged;
	getNumThreads(): Promise<number | undefined>;
	getNumThreadsCached(): Promise<number | undefined>;
	dispose(): void;
	$enableExtensionHostSearch(): void;
	private _registerEHSearchProviders;
	private registerInternalFileSearchProvider;
	$provideFileSearchResults(
		handle: number,
		session: number,
		rawQuery: IRawFileQuery,
		token: vscode.CancellationToken,
	): Promise<ISearchCompleteStats>;
	doInternalFileSearchWithCustomCallback(
		rawQuery: IFileQuery,
		token: vscode.CancellationToken,
		handleFileMatch: (data: URI[]) => void,
	): Promise<ISearchCompleteStats>;
	private doInternalFileSearch;
	$clearCache(cacheKey: string): Promise<void>;
	protected createTextSearchManager(
		query: ITextQuery,
		provider: vscode.TextSearchProviderNew,
	): TextSearchManager;
}
