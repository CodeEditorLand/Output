import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { Lazy } from "../../../../base/common/lazy.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../../base/common/map.js";
import { TernarySearchTree } from "../../../../base/common/ternarySearchTree.js";
import { URI } from "../../../../base/common/uri.js";
import { Range } from "../../../../editor/common/core/range.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	IFileService,
	IFileStatWithPartialMetadata,
} from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import {
	IProgress,
	IProgressStep,
} from "../../../../platform/progress/common/progress.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { ReplacePattern } from "../../../services/search/common/replace.js";
import {
	IAITextQuery,
	IFileMatch,
	IPatternInfo,
	ISearchComplete,
	ISearchProgressItem,
	ISearchRange,
	ISearchService,
	ITextQuery,
	ITextSearchMatch,
	ITextSearchPreviewOptions,
	ITextSearchResult,
	SearchSortOrder,
} from "../../../services/search/common/search.js";
import { ICellViewModel } from "../../notebook/browser/notebookBrowser.js";
import { NotebookEditorWidget } from "../../notebook/browser/notebookEditorWidget.js";
import { INotebookEditorService } from "../../notebook/browser/services/notebookEditorService.js";
import { INotebookSearchService } from "../common/notebookSearch.js";
import { INotebookCellMatchNoModel } from "../common/searchNotebookHelpers.js";
import { INotebookCellMatchWithModel } from "./notebookSearch/searchNotebookHelpers.js";
import { IReplaceService } from "./replace.js";

export declare class Match {
	protected _parent: FileMatch;
	private _fullPreviewLines;
	readonly aiContributed: boolean;
	private static readonly MAX_PREVIEW_CHARS;
	protected _id: string;
	protected _range: Range;
	private _oneLinePreviewText;
	private _rangeInPreviewText;
	private _fullPreviewRange;
	constructor(
		_parent: FileMatch,
		_fullPreviewLines: string[],
		_fullPreviewRange: ISearchRange,
		_documentRange: ISearchRange,
		aiContributed: boolean,
	);
	id(): string;
	parent(): FileMatch;
	text(): string;
	range(): Range;
	preview(): {
		before: string;
		fullBefore: string;
		inside: string;
		after: string;
	};
	get replaceString(): string;
	fullMatchText(includeSurrounding?: boolean): string;
	rangeInPreview(): {
		startColumn: number;
		endColumn: number;
		startLineNumber: number;
		endLineNumber: number;
	};
	fullPreviewLines(): string[];
	getMatchString(): string;
	isReadonly(): boolean;
}
export declare class CellMatch {
	private readonly _parent;
	private _cell;
	private readonly _cellIndex;
	private _contentMatches;
	private _webviewMatches;
	private _context;
	constructor(
		_parent: FileMatch,
		_cell: ICellViewModel | undefined,
		_cellIndex: number,
	);
	hasCellViewModel(): boolean;
	get context(): Map<number, string>;
	matches(): MatchInNotebook[];
	get contentMatches(): MatchInNotebook[];
	get webviewMatches(): MatchInNotebook[];
	remove(matches: MatchInNotebook | MatchInNotebook[]): void;
	clearAllMatches(): void;
	addContentMatches(textSearchMatches: ITextSearchMatch[]): void;
	addContext(textSearchMatches: ITextSearchMatch[]): void;
	addWebviewMatches(textSearchMatches: ITextSearchMatch[]): void;
	setCellModel(cell: ICellViewModel): void;
	get parent(): FileMatch;
	get id(): string;
	get cellIndex(): number;
	get cell(): ICellViewModel | undefined;
}
export declare class MatchInNotebook extends Match {
	private readonly _cellParent;
	private _webviewIndex;
	constructor(
		_cellParent: CellMatch,
		_fullPreviewLines: string[],
		_fullPreviewRange: ISearchRange,
		_documentRange: ISearchRange,
		webviewIndex?: number,
	);
	parent(): FileMatch;
	get cellParent(): CellMatch;
	private notebookMatchTypeString;
	isWebviewMatch(): boolean;
	isReadonly(): boolean;
	get cellIndex(): number;
	get webviewIndex(): number | undefined;
	get cell(): ICellViewModel | undefined;
}
export declare class FileMatch extends Disposable implements IFileMatch {
	private _query;
	private _previewOptions;
	private _maxResults;
	private _parent;
	private rawMatch;
	private _closestRoot;
	private readonly searchInstanceID;
	private readonly modelService;
	private readonly replaceService;
	private readonly notebookEditorService;
	private static readonly _CURRENT_FIND_MATCH;
	private static readonly _FIND_MATCH;
	private static getDecorationOption;
	protected _onChange: Emitter<{
		didRemove?: boolean;
		forceUpdateModel?: boolean;
	}>;
	readonly onChange: Event<{
		didRemove?: boolean;
		forceUpdateModel?: boolean;
	}>;
	private _onDispose;
	readonly onDispose: Event<void>;
	private _resource;
	private _fileStat?;
	private _model;
	private _modelListener;
	private _textMatches;
	private _cellMatches;
	private _removedTextMatches;
	private _selectedMatch;
	private _name;
	private _updateScheduler;
	private _modelDecorations;
	private _context;
	get context(): Map<number, string>;
	get cellContext(): Map<string, Map<number, string>>;
	private _notebookEditorWidget;
	private _editorWidgetListener;
	private _notebookUpdateScheduler;
	private _findMatchDecorationModel;
	private _lastEditorWidgetIdForUpdate;
	constructor(
		_query: IPatternInfo,
		_previewOptions: ITextSearchPreviewOptions | undefined,
		_maxResults: number | undefined,
		_parent: FolderMatch,
		rawMatch: IFileMatch,
		_closestRoot: FolderMatchWorkspaceRoot | null,
		searchInstanceID: string,
		modelService: IModelService,
		replaceService: IReplaceService,
		labelService: ILabelService,
		notebookEditorService: INotebookEditorService,
	);
	addWebviewMatchesToCell(
		cellID: string,
		webviewMatches: ITextSearchMatch[],
	): void;
	addContentMatchesToCell(
		cellID: string,
		contentMatches: ITextSearchMatch[],
	): void;
	getCellMatch(cellID: string): CellMatch | undefined;
	addCellMatch(
		rawCell: INotebookCellMatchNoModel | INotebookCellMatchWithModel,
	): void;
	get closestRoot(): FolderMatchWorkspaceRoot | null;
	hasReadonlyMatches(): boolean;
	createMatches(isAiContributed: boolean): void;
	bindModel(model: ITextModel): void;
	private onModelWillDispose;
	private unbindModel;
	private updateMatchesForModel;
	protected updatesMatchesForLineAfterReplace(
		lineNumber: number,
		modelChange: boolean,
	): Promise<void>;
	private updateMatches;
	updateHighlights(): void;
	id(): string;
	parent(): FolderMatch;
	get hasChildren(): boolean;
	matches(): Match[];
	textMatches(): Match[];
	cellMatches(): CellMatch[];
	remove(matches: Match | Match[]): void;
	private replaceQ;
	replace(toReplace: Match): Promise<void>;
	setSelectedMatch(match: Match | null): void;
	getSelectedMatch(): Match | null;
	isMatchSelected(match: Match): boolean;
	count(): number;
	get resource(): URI;
	name(): string;
	addContext(results: ITextSearchResult[] | undefined): void;
	add(match: Match, trigger?: boolean): void;
	private removeMatch;
	resolveFileStat(fileService: IFileService): Promise<void>;
	get fileStat(): IFileStatWithPartialMetadata | undefined;
	set fileStat(stat: IFileStatWithPartialMetadata | undefined);
	dispose(): void;
	hasOnlyReadOnlyMatches(): boolean;
	bindNotebookEditorWidget(widget: NotebookEditorWidget): void;
	unbindNotebookEditorWidget(widget?: NotebookEditorWidget): void;
	updateNotebookHighlights(): void;
	private _addNotebookHighlights;
	private _removeNotebookHighlights;
	private updateNotebookMatches;
	private setNotebookFindMatchDecorationsUsingCellMatches;
	updateMatchesForEditorWidget(): Promise<void>;
	showMatch(match: MatchInNotebook): Promise<void>;
	private highlightCurrentFindMatchDecoration;
	private revealCellRange;
}
export interface IChangeEvent {
	elements: FileMatch[];
	added?: boolean;
	removed?: boolean;
	clearingAll?: boolean;
}
export declare class FolderMatch extends Disposable {
	protected _resource: URI | null;
	private _id;
	protected _index: number;
	protected _query: ITextQuery;
	private _parent;
	private _searchResult;
	private _closestRoot;
	private readonly replaceService;
	protected readonly instantiationService: IInstantiationService;
	protected readonly uriIdentityService: IUriIdentityService;
	protected _onChange: Emitter<IChangeEvent>;
	readonly onChange: Event<IChangeEvent>;
	private _onDispose;
	readonly onDispose: Event<void>;
	protected _fileMatches: ResourceMap<FileMatch>;
	protected _folderMatches: ResourceMap<FolderMatchWithResource>;
	protected _folderMatchesMap: TernarySearchTree<
		URI,
		FolderMatchWithResource
	>;
	protected _unDisposedFileMatches: ResourceMap<FileMatch>;
	protected _unDisposedFolderMatches: ResourceMap<FolderMatchWithResource>;
	private _replacingAll;
	private _name;
	constructor(
		_resource: URI | null,
		_id: string,
		_index: number,
		_query: ITextQuery,
		_parent: TextSearchResult | FolderMatch,
		_searchResult: SearchResult,
		_closestRoot: FolderMatchWorkspaceRoot | null,
		replaceService: IReplaceService,
		instantiationService: IInstantiationService,
		labelService: ILabelService,
		uriIdentityService: IUriIdentityService,
	);
	get searchModel(): SearchModel;
	get showHighlights(): boolean;
	get closestRoot(): FolderMatchWorkspaceRoot | null;
	set replacingAll(b: boolean);
	id(): string;
	get resource(): URI | null;
	index(): number;
	name(): string;
	parent(): TextSearchResult | FolderMatch;
	get hasChildren(): boolean;
	bindModel(model: ITextModel): void;
	bindNotebookEditorWidget(
		editor: NotebookEditorWidget,
		resource: URI,
	): Promise<void>;
	unbindNotebookEditorWidget(
		editor: NotebookEditorWidget,
		resource: URI,
	): void;
	createIntermediateFolderMatch(
		resource: URI,
		id: string,
		index: number,
		query: ITextQuery,
		baseWorkspaceFolder: FolderMatchWorkspaceRoot,
	): FolderMatchWithResource;
	configureIntermediateMatch(folderMatch: FolderMatchWithResource): void;
	clear(clearingAll?: boolean): void;
	remove(
		matches:
			| FileMatch
			| FolderMatchWithResource
			| (FileMatch | FolderMatchWithResource)[],
	): void;
	replace(match: FileMatch): Promise<any>;
	replaceAll(): Promise<any>;
	matches(): (FileMatch | FolderMatchWithResource)[];
	fileMatchesIterator(): IterableIterator<FileMatch>;
	folderMatchesIterator(): IterableIterator<FolderMatchWithResource>;
	isEmpty(): boolean;
	getDownstreamFileMatch(uri: URI): FileMatch | null;
	allDownstreamFileMatches(): FileMatch[];
	private fileCount;
	private folderCount;
	count(): number;
	recursiveFileCount(): number;
	recursiveMatchCount(): number;
	get query(): ITextQuery | null;
	addFileMatch(
		raw: IFileMatch[],
		silent: boolean,
		searchInstanceID: string,
		isAiContributed: boolean,
	): void;
	doAddFile(fileMatch: FileMatch): void;
	hasOnlyReadOnlyMatches(): boolean;
	protected uriHasParent(parent: URI, child: URI): boolean;
	private isInParentChain;
	getFolderMatch(resource: URI): FolderMatchWithResource | undefined;
	doAddFolder(folderMatch: FolderMatchWithResource): void;
	private batchReplace;
	onFileChange(fileMatch: FileMatch, removed?: boolean): void;
	onFolderChange(
		folderMatch: FolderMatchWithResource,
		event: IChangeEvent,
	): void;
	private doRemoveFile;
	private disposeMatches;
	dispose(): void;
}
export declare class FolderMatchWithResource extends FolderMatch {
	protected _normalizedResource: Lazy<URI>;
	constructor(
		_resource: URI,
		_id: string,
		_index: number,
		_query: ITextQuery,
		_parent: TextSearchResult | FolderMatch,
		_searchResult: SearchResult,
		_closestRoot: FolderMatchWorkspaceRoot | null,
		replaceService: IReplaceService,
		instantiationService: IInstantiationService,
		labelService: ILabelService,
		uriIdentityService: IUriIdentityService,
	);
	get resource(): URI;
	get normalizedResource(): URI;
}
/**
 * FolderMatchWorkspaceRoot => folder for workspace root
 */
export declare class FolderMatchWorkspaceRoot extends FolderMatchWithResource {
	private readonly _ai;
	constructor(
		_resource: URI,
		_id: string,
		_index: number,
		_query: ITextQuery,
		_parent: TextSearchResult,
		_ai: boolean,
		replaceService: IReplaceService,
		instantiationService: IInstantiationService,
		labelService: ILabelService,
		uriIdentityService: IUriIdentityService,
	);
	private normalizedUriParent;
	private uriEquals;
	private createFileMatch;
	createAndConfigureFileMatch(
		rawFileMatch: IFileMatch<URI>,
		searchInstanceID: string,
	): FileMatch;
}
/**
 * BaseFolderMatch => optional resource ("other files" node)
 * FolderMatch => required resource (normal folder node)
 */
export declare class FolderMatchNoRoot extends FolderMatch {
	constructor(
		_id: string,
		_index: number,
		_query: ITextQuery,
		_parent: TextSearchResult,
		replaceService: IReplaceService,
		instantiationService: IInstantiationService,
		labelService: ILabelService,
		uriIdentityService: IUriIdentityService,
	);
	createAndConfigureFileMatch(
		rawFileMatch: IFileMatch,
		searchInstanceID: string,
	): FileMatch;
}
export declare class TextSearchResult extends Disposable {
	private _allowOtherResults;
	private _parent;
	private _id;
	private readonly instantiationService;
	private readonly uriIdentityService;
	private _onChange;
	readonly onChange: Event<IChangeEvent>;
	private _isDirty;
	private _showHighlights;
	private _query;
	private _rangeHighlightDecorations;
	private disposePastResults;
	private _folderMatches;
	private _otherFilesMatch;
	private _folderMatchesMap;
	resource: null;
	hidden: boolean;
	cachedSearchComplete: ISearchComplete | undefined;
	constructor(
		_allowOtherResults: boolean,
		_parent: SearchResult,
		_id: string,
		instantiationService: IInstantiationService,
		uriIdentityService: IUriIdentityService,
	);
	hide(): void;
	get isAIContributed(): boolean;
	id(): string;
	parent(): SearchResult;
	get hasChildren(): boolean;
	name(): string;
	get isDirty(): boolean;
	getFolderMatch(
		resource: URI,
	): FolderMatchWorkspaceRoot | FolderMatch | undefined;
	add(
		allRaw: IFileMatch[],
		searchInstanceID: string,
		ai: boolean,
		silent?: boolean,
	): void;
	remove(
		matches: FileMatch | FolderMatch | (FileMatch | FolderMatch)[],
		ai?: boolean,
	): void;
	groupFilesByFolder(fileMatches: IFileMatch[]): {
		byFolder: ResourceMap<IFileMatch[]>;
		other: IFileMatch[];
	};
	isEmpty(): boolean;
	findFolderSubstr(resource: URI): FolderMatchWithResource | undefined;
	get query(): ITextQuery | null;
	set query(query: ITextQuery | null);
	private _createBaseFolderMatch;
	folderMatches(): FolderMatch[];
	private disposeMatches;
	matches(): FileMatch[];
	get showHighlights(): boolean;
	toggleHighlights(value: boolean): void;
	get rangeHighlightDecorations(): RangeHighlightDecorations;
	fileCount(): number;
	count(): number;
	clear(): void;
	dispose(): Promise<void>;
}
export declare class ReplaceableTextSearchResult extends TextSearchResult {
	private readonly replaceService;
	constructor(
		_allowOtherResults: boolean,
		parent: SearchResult,
		id: string,
		instantiationService: IInstantiationService,
		uriIdentityService: IUriIdentityService,
		replaceService: IReplaceService,
	);
	replace(match: FileMatch): Promise<any>;
	replaceAll(progress: IProgress<IProgressStep>): Promise<any>;
	private set replacingAll(value);
}
/**
 * Compares instances of the same match type. Different match types should not be siblings
 * and their sort order is undefined.
 */
export declare function searchMatchComparer(
	elementA: RenderableMatch,
	elementB: RenderableMatch,
	sortOrder?: SearchSortOrder,
): number;
export declare function compareNotebookPos(
	match1: MatchInNotebook,
	match2: MatchInNotebook,
): number;
export declare function searchComparer(
	elementA: RenderableMatch,
	elementB: RenderableMatch,
	sortOrder?: SearchSortOrder,
): number;
export declare const PLAIN_TEXT_SEARCH__RESULT_ID = "plainTextSearch";
export declare const AI_TEXT_SEARCH_RESULT_ID = "aiTextSearch";
export declare class SearchResult extends Disposable {
	readonly searchModel: SearchModel;
	private readonly instantiationService;
	private readonly modelService;
	private readonly notebookEditorService;
	private _onChange;
	readonly onChange: Event<IChangeEvent>;
	private _onWillChangeModelListener;
	private _onDidChangeModelListener;
	private _plainTextSearchResult;
	private _aiTextSearchResult;
	constructor(
		searchModel: SearchModel,
		instantiationService: IInstantiationService,
		modelService: IModelService,
		notebookEditorService: INotebookEditorService,
	);
	get plainTextSearchResult(): ReplaceableTextSearchResult;
	get aiTextSearchResult(): TextSearchResult;
	get children(): TextSearchResult[];
	get hasChildren(): boolean;
	get textSearchResults(): TextSearchResult[];
	batchReplace(elementsToReplace: RenderableMatch[]): Promise<void>;
	batchRemove(elementsToRemove: RenderableMatch[]): void;
	get isDirty(): boolean;
	get query(): ITextQuery | null;
	set query(query: ITextQuery | null);
	private onDidAddNotebookEditorWidget;
	folderMatches(ai?: boolean): FolderMatch[];
	private onModelAdded;
	private onNotebookEditorWidgetAdded;
	private onNotebookEditorWidgetRemoved;
	add(
		allRaw: IFileMatch[],
		searchInstanceID: string,
		ai: boolean,
		silent?: boolean,
	): void;
	clear(): void;
	remove(
		matches: FileMatch | FolderMatch | (FileMatch | FolderMatch)[],
		ai?: boolean,
	): void;
	replace(match: FileMatch): Promise<any>;
	matches(ai?: boolean): FileMatch[];
	isEmpty(): boolean;
	fileCount(): number;
	count(): number;
	setCachedSearchComplete(
		cachedSearchComplete: ISearchComplete | undefined,
		ai: boolean,
	): void;
	getCachedSearchComplete(ai: boolean): ISearchComplete | undefined;
	toggleHighlights(value: boolean, ai?: boolean): void;
	getRangeHighlightDecorations(ai?: boolean): RangeHighlightDecorations;
	replaceAll(progress: IProgress<IProgressStep>): Promise<any>;
	dispose(): Promise<void>;
}
export declare enum SearchModelLocation {
	PANEL = 0,
	QUICK_ACCESS = 1,
}
export declare class SearchModel extends Disposable {
	private readonly searchService;
	private readonly telemetryService;
	private readonly configurationService;
	private readonly instantiationService;
	private readonly logService;
	private readonly notebookSearchService;
	private _searchResult;
	private _searchQuery;
	private _replaceActive;
	private _replaceString;
	private _replacePattern;
	private _preserveCase;
	private _startStreamDelay;
	private readonly _resultQueue;
	private readonly _aiResultQueue;
	private readonly _onReplaceTermChanged;
	readonly onReplaceTermChanged: Event<void>;
	private readonly _onSearchResultChanged;
	readonly onSearchResultChanged: Event<IChangeEvent>;
	private currentCancelTokenSource;
	private currentAICancelTokenSource;
	private searchCancelledForNewSearch;
	private aiSearchCancelledForNewSearch;
	location: SearchModelLocation;
	private readonly _aiTextResultProviderName;
	constructor(
		searchService: ISearchService,
		telemetryService: ITelemetryService,
		configurationService: IConfigurationService,
		instantiationService: IInstantiationService,
		logService: ILogService,
		notebookSearchService: INotebookSearchService,
	);
	getAITextResultProviderName(): Promise<string>;
	isReplaceActive(): boolean;
	set replaceActive(replaceActive: boolean);
	get replacePattern(): ReplacePattern | null;
	get replaceString(): string;
	set preserveCase(value: boolean);
	get preserveCase(): boolean;
	set replaceString(replaceString: string);
	get searchResult(): SearchResult;
	addAIResults(
		onProgress?: (result: ISearchProgressItem) => void,
	): Promise<ISearchComplete>;
	aiSearch(
		query: IAITextQuery,
		onProgress?: (result: ISearchProgressItem) => void,
	): Promise<ISearchComplete>;
	private doSearch;
	get hasAIResults(): boolean;
	get hasPlainResults(): boolean;
	search(
		query: ITextQuery,
		onProgress?: (result: ISearchProgressItem) => void,
		callerToken?: CancellationToken,
	): {
		asyncResults: Promise<ISearchComplete>;
		syncResults: IFileMatch<URI>[];
	};
	private onSearchCompleted;
	private onSearchError;
	private onSearchProgress;
	private get searchConfig();
	cancelSearch(cancelledForNewSearch?: boolean): boolean;
	cancelAISearch(cancelledForNewSearch?: boolean): boolean;
	dispose(): void;
}
export type FileMatchOrMatch = FileMatch | Match;
export type RenderableMatch =
	| TextSearchResult
	| FolderMatch
	| FileMatch
	| Match;
export declare class SearchViewModelWorkbenchService
	implements ISearchViewModelWorkbenchService
{
	private readonly instantiationService;
	readonly _serviceBrand: undefined;
	private _searchModel;
	constructor(instantiationService: IInstantiationService);
	get searchModel(): SearchModel;
	set searchModel(searchModel: SearchModel);
}
export declare const ISearchViewModelWorkbenchService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<ISearchViewModelWorkbenchService>;
export interface ISearchViewModelWorkbenchService {
	readonly _serviceBrand: undefined;
	searchModel: SearchModel;
}
/**
 * Can add a range highlight decoration to a model.
 * It will automatically remove it when the model has its decorations changed.
 */
export declare class RangeHighlightDecorations implements IDisposable {
	private readonly _modelService;
	private _decorationId;
	private _model;
	private readonly _modelDisposables;
	constructor(_modelService: IModelService);
	removeHighlightRange(): void;
	highlightRange(
		resource: URI | ITextModel,
		range: Range,
		ownerId?: number,
	): void;
	private doHighlightRange;
	private setModel;
	private clearModelListeners;
	dispose(): void;
	private static readonly _RANGE_HIGHLIGHT_DECORATION;
}
export declare function textSearchMatchesToNotebookMatches(
	textSearchMatches: ITextSearchMatch[],
	cell: CellMatch,
): MatchInNotebook[];
export declare function arrayContainsElementOrParent(
	element: RenderableMatch,
	testArray: RenderableMatch[],
): boolean;
