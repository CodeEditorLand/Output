import type * as vscode from "vscode";

import { CancellationToken } from "../../../base/common/cancellation.js";
import { IDisposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import { ILogService } from "../../../platform/log/common/log.js";
import {
	IAITextQuery,
	IFileQuery,
	IRawAITextQuery,
	IRawFileQuery,
	IRawQuery,
	IRawTextQuery,
	ISearchCompleteStats,
	ITextQuery,
} from "../../services/search/common/search.js";
import { TextSearchManager } from "../../services/search/common/textSearchManager.js";
import {
	ExtHostSearchShape,
	MainThreadSearchShape,
} from "./extHost.protocol.js";
import { IExtHostRpcService } from "./extHostRpcService.js";
import { IURITransformerService } from "./extHostUriTransformerService.js";

export interface IExtHostSearch extends ExtHostSearchShape {
	registerTextSearchProviderOld(
		scheme: string,
		provider: vscode.TextSearchProvider,
	): IDisposable;
	registerAITextSearchProviderOld(
		scheme: string,
		provider: vscode.AITextSearchProvider,
	): IDisposable;
	registerFileSearchProviderOld(
		scheme: string,
		provider: vscode.FileSearchProvider,
	): IDisposable;
	registerTextSearchProvider(
		scheme: string,
		provider: vscode.TextSearchProviderNew,
	): IDisposable;
	registerAITextSearchProvider(
		scheme: string,
		provider: vscode.AITextSearchProviderNew,
	): IDisposable;
	registerFileSearchProvider(
		scheme: string,
		provider: vscode.FileSearchProviderNew,
	): IDisposable;
	doInternalFileSearchWithCustomCallback(
		query: IFileQuery,
		token: CancellationToken,
		handleFileMatch: (data: URI[]) => void,
	): Promise<ISearchCompleteStats>;
}
export declare const IExtHostSearch: import("../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IExtHostSearch>;
export declare class ExtHostSearch implements IExtHostSearch {
	private extHostRpc;
	protected _uriTransformer: IURITransformerService;
	protected _logService: ILogService;
	protected readonly _proxy: MainThreadSearchShape;
	protected _handlePool: number;
	private readonly _textSearchProvider;
	private readonly _textSearchUsedSchemes;
	private readonly _aiTextSearchProvider;
	private readonly _aiTextSearchUsedSchemes;
	private readonly _fileSearchProvider;
	private readonly _fileSearchUsedSchemes;
	private readonly _fileSearchManager;
	constructor(
		extHostRpc: IExtHostRpcService,
		_uriTransformer: IURITransformerService,
		_logService: ILogService,
	);
	protected _transformScheme(scheme: string): string;
	registerTextSearchProviderOld(
		scheme: string,
		provider: vscode.TextSearchProvider,
	): IDisposable;
	registerTextSearchProvider(
		scheme: string,
		provider: vscode.TextSearchProviderNew,
	): IDisposable;
	registerAITextSearchProviderOld(
		scheme: string,
		provider: vscode.AITextSearchProvider,
	): IDisposable;
	registerAITextSearchProvider(
		scheme: string,
		provider: vscode.AITextSearchProviderNew,
	): IDisposable;
	registerFileSearchProviderOld(
		scheme: string,
		provider: vscode.FileSearchProvider,
	): IDisposable;
	registerFileSearchProvider(
		scheme: string,
		provider: vscode.FileSearchProviderNew,
	): IDisposable;
	$provideFileSearchResults(
		handle: number,
		session: number,
		rawQuery: IRawFileQuery,
		token: vscode.CancellationToken,
	): Promise<ISearchCompleteStats>;
	doInternalFileSearchWithCustomCallback(
		query: IFileQuery,
		token: CancellationToken,
		handleFileMatch: (data: URI[]) => void,
	): Promise<ISearchCompleteStats>;
	$clearCache(cacheKey: string): Promise<void>;
	$provideTextSearchResults(
		handle: number,
		session: number,
		rawQuery: IRawTextQuery,
		token: vscode.CancellationToken,
	): Promise<ISearchCompleteStats>;
	$provideAITextSearchResults(
		handle: number,
		session: number,
		rawQuery: IRawAITextQuery,
		token: vscode.CancellationToken,
	): Promise<ISearchCompleteStats>;
	$enableExtensionHostSearch(): void;
	$getAIName(handle: number): Promise<string | undefined>;
	protected createTextSearchManager(
		query: ITextQuery,
		provider: vscode.TextSearchProviderNew,
	): TextSearchManager;
	protected createAITextSearchManager(
		query: IAITextQuery,
		provider: vscode.AITextSearchProviderNew,
	): TextSearchManager;
}
export declare function reviveQuery<U extends IRawQuery>(
	rawQuery: U,
): U extends IRawTextQuery
	? ITextQuery
	: U extends IRawAITextQuery
		? IAITextQuery
		: IFileQuery;
