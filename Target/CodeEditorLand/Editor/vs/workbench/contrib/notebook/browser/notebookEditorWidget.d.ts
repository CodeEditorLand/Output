import "./media/notebook.css";
import "./media/notebookCellChat.css";
import "./media/notebookCellEditorHint.css";
import "./media/notebookCellInsertToolbar.css";
import "./media/notebookCellStatusBar.css";
import "./media/notebookCellTitleToolbar.css";
import "./media/notebookFocusIndicator.css";
import "./media/notebookToolbar.css";
import "./media/notebookDnd.css";
import "./media/notebookFolding.css";
import "./media/notebookCellOutput.css";
import "./media/notebookEditorStickyScroll.css";
import "./media/notebookKernelActionViewItem.css";
import "./media/notebookOutline.css";

import * as DOM from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { ICodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { Range } from "../../../../editor/common/core/range.js";
import { Selection } from "../../../../editor/common/core/selection.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILayoutService } from "../../../../platform/layout/browser/layoutService.js";
import { IEditorProgressService } from "../../../../platform/progress/common/progress.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IWebviewElement } from "../../webview/browser/webview.js";
import { NotebookTextModel } from "../common/model/notebookTextModel.js";
import { INotebookFindOptions } from "../common/notebookCommon.js";
import { INotebookExecutionService } from "../common/notebookExecutionService.js";
import { INotebookExecutionStateService } from "../common/notebookExecutionStateService.js";
import { INotebookKernelService } from "../common/notebookKernelService.js";
import { INotebookLoggingService } from "../common/notebookLoggingService.js";
import { NotebookPerfMarks } from "../common/notebookPerformance.js";
import { ICellRange } from "../common/notebookRange.js";
import { INotebookRendererMessagingService } from "../common/notebookRendererMessagingService.js";
import { INotebookService } from "../common/notebookService.js";
import {
	CellFindMatchWithIndex,
	CellLayoutContext,
	IActiveNotebookEditorDelegate,
	IBaseCellEditorOptions,
	ICellOutputViewModel,
	ICellViewModel,
	ICommonCellInfo,
	IFocusNotebookCellOptions,
	IInsetRenderOutput,
	IModelDecorationsChangeAccessor,
	INotebookDeltaDecoration,
	INotebookEditor,
	INotebookEditorContribution,
	INotebookEditorCreationOptions,
	INotebookEditorDelegate,
	INotebookEditorMouseEvent,
	INotebookEditorOptions,
	INotebookEditorViewState,
	INotebookViewCellsUpdateEvent,
	INotebookViewZoneChangeAccessor,
	INotebookWebviewMessage,
} from "./notebookBrowser.js";
import { NotebookOptions } from "./notebookOptions.js";
import {
	NotebookCellStateChangedEvent,
	NotebookLayoutInfo,
} from "./notebookViewEvents.js";
import { INotebookEditorService } from "./services/notebookEditorService.js";
import { CodeCellViewModel } from "./viewModel/codeCellViewModel.js";
import { MarkupCellViewModel } from "./viewModel/markupCellViewModel.js";
import { NotebookViewModel } from "./viewModel/notebookViewModelImpl.js";

export declare function getDefaultNotebookCreationOptions(): INotebookEditorCreationOptions;
export declare class NotebookEditorWidget
	extends Disposable
	implements INotebookEditorDelegate, INotebookEditor
{
	readonly creationOptions: INotebookEditorCreationOptions;
	private readonly notebookRendererMessaging;
	private readonly notebookEditorService;
	private readonly notebookKernelService;
	private readonly _notebookService;
	private readonly configurationService;
	private readonly layoutService;
	private readonly contextMenuService;
	private readonly telemetryService;
	private readonly notebookExecutionService;
	private readonly notebookExecutionStateService;
	private editorProgressService;
	private readonly logService;
	private readonly keybindingService;
	private readonly _onDidChangeCellState;
	readonly onDidChangeCellState: Event<NotebookCellStateChangedEvent>;
	private readonly _onDidChangeViewCells;
	readonly onDidChangeViewCells: Event<INotebookViewCellsUpdateEvent>;
	private readonly _onWillChangeModel;
	readonly onWillChangeModel: Event<NotebookTextModel | undefined>;
	private readonly _onDidChangeModel;
	readonly onDidChangeModel: Event<NotebookTextModel | undefined>;
	private readonly _onDidAttachViewModel;
	readonly onDidAttachViewModel: Event<void>;
	private readonly _onDidChangeOptions;
	readonly onDidChangeOptions: Event<void>;
	private readonly _onDidChangeDecorations;
	readonly onDidChangeDecorations: Event<void>;
	private readonly _onDidScroll;
	readonly onDidScroll: Event<void>;
	private readonly _onDidChangeLayout;
	readonly onDidChangeLayout: Event<void>;
	private readonly _onDidChangeActiveCell;
	readonly onDidChangeActiveCell: Event<void>;
	private readonly _onDidChangeFocus;
	readonly onDidChangeFocus: Event<void>;
	private readonly _onDidChangeSelection;
	readonly onDidChangeSelection: Event<void>;
	private readonly _onDidChangeVisibleRanges;
	readonly onDidChangeVisibleRanges: Event<void>;
	private readonly _onDidFocusEmitter;
	readonly onDidFocusWidget: Event<void>;
	private readonly _onDidBlurEmitter;
	readonly onDidBlurWidget: Event<void>;
	private readonly _onDidChangeActiveEditor;
	readonly onDidChangeActiveEditor: Event<this>;
	private readonly _onDidChangeActiveKernel;
	readonly onDidChangeActiveKernel: Event<void>;
	private readonly _onMouseUp;
	readonly onMouseUp: Event<INotebookEditorMouseEvent>;
	private readonly _onMouseDown;
	readonly onMouseDown: Event<INotebookEditorMouseEvent>;
	private readonly _onDidReceiveMessage;
	readonly onDidReceiveMessage: Event<INotebookWebviewMessage>;
	private readonly _onDidRenderOutput;
	private readonly onDidRenderOutput;
	private readonly _onDidRemoveOutput;
	private readonly onDidRemoveOutput;
	private readonly _onDidResizeOutputEmitter;
	readonly onDidResizeOutput: Event<ICellViewModel>;
	private _overlayContainer;
	private _notebookTopToolbarContainer;
	private _notebookTopToolbar;
	private _notebookStickyScrollContainer;
	private _notebookStickyScroll;
	private _notebookOverviewRulerContainer;
	private _notebookOverviewRuler;
	private _body;
	private _styleElement;
	private _overflowContainer;
	private _webview;
	private _webviewResolvePromise;
	private _webviewTransparentCover;
	private _listDelegate;
	private _list;
	private _listViewInfoAccessor;
	private _dndController;
	private _listTopCellToolbar;
	private _renderedEditors;
	private _editorPool;
	private _viewContext;
	private _notebookViewModel;
	private readonly _localStore;
	private _localCellStateListeners;
	private _fontInfo;
	private _dimension?;
	private _position?;
	private _shadowElement?;
	private _shadowElementViewInfo;
	private readonly _editorFocus;
	private readonly _outputFocus;
	private readonly _editorEditable;
	private readonly _cursorNavMode;
	private readonly _outputInputFocus;
	protected readonly _contributions: Map<string, INotebookEditorContribution>;
	private _scrollBeyondLastLine;
	private readonly _insetModifyQueueByOutputId;
	private _cellContextKeyManager;
	private readonly _uuid;
	private _focusTracker;
	private _webviewFocused;
	private _isVisible;
	get isVisible(): boolean;
	private _isDisposed;
	get isDisposed(): boolean;
	set viewModel(newModel: NotebookViewModel | undefined);
	get viewModel(): NotebookViewModel | undefined;
	get textModel(): NotebookTextModel | undefined;
	get isReadOnly(): boolean;
	get activeCodeEditor(): ICodeEditor | undefined;
	get activeCellAndCodeEditor(): [ICellViewModel, ICodeEditor] | undefined;
	get codeEditors(): [ICellViewModel, ICodeEditor][];
	get visibleRanges(): ICellRange[];
	private _baseCellEditorOptions;
	readonly isReplHistory: boolean;
	private _readOnly;
	readonly scopedContextKeyService: IContextKeyService;
	private readonly instantiationService;
	private readonly _notebookOptions;
	private _currentProgress;
	get notebookOptions(): NotebookOptions;
	constructor(
		creationOptions: INotebookEditorCreationOptions,
		dimension: DOM.Dimension | undefined,
		instantiationService: IInstantiationService,
		editorGroupsService: IEditorGroupsService,
		notebookRendererMessaging: INotebookRendererMessagingService,
		notebookEditorService: INotebookEditorService,
		notebookKernelService: INotebookKernelService,
		_notebookService: INotebookService,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		layoutService: ILayoutService,
		contextMenuService: IContextMenuService,
		telemetryService: ITelemetryService,
		notebookExecutionService: INotebookExecutionService,
		notebookExecutionStateService: INotebookExecutionStateService,
		editorProgressService: IEditorProgressService,
		logService: INotebookLoggingService,
		keybindingService: IKeybindingService,
	);
	private _debugFlag;
	private _debug;
	/**
	 * EditorId
	 */
	getId(): string;
	getViewModel(): NotebookViewModel | undefined;
	getLength(): number;
	getSelections(): ICellRange[];
	setSelections(selections: ICellRange[]): void;
	getFocus(): ICellRange;
	setFocus(focus: ICellRange): void;
	getSelectionViewModels(): ICellViewModel[];
	hasModel(): this is IActiveNotebookEditorDelegate;
	showProgress(): void;
	hideProgress(): void;
	getBaseCellEditorOptions(language: string): IBaseCellEditorOptions;
	private _updateForNotebookConfiguration;
	private _generateFontInfo;
	private _createBody;
	private _generateFontFamily;
	private _createLayoutStyles;
	private _createCellList;
	private showListContextMenu;
	private _registerNotebookOverviewRuler;
	private _registerNotebookActionsToolbar;
	private _registerNotebookStickyScroll;
	private _updateOutputRenderers;
	getDomNode(): HTMLElement;
	getOverflowContainerDomNode(): HTMLElement;
	getInnerWebview(): IWebviewElement | undefined;
	setEditorProgressService(
		editorProgressService: IEditorProgressService,
	): void;
	setParentContextKeyService(
		parentContextKeyService: IContextKeyService,
	): void;
	setModel(
		textModel: NotebookTextModel,
		viewState: INotebookEditorViewState | undefined,
		perf?: NotebookPerfMarks,
		viewType?: string,
	): Promise<void>;
	private _backgroundMarkdownRenderRunning;
	private _backgroundMarkdownRendering;
	private _backgroundMarkdownRenderingWithDeadline;
	private updateContextKeysOnFocusChange;
	setOptions(options: INotebookEditorOptions | undefined): Promise<void>;
	private _parseIndexedCellOptions;
	private _detachModel;
	private _updateForOptions;
	private _resolveWebview;
	private _ensureWebview;
	private _attachModel;
	private _bindCellListener;
	private _lastCellWithEditorFocus;
	private _validateCellFocusMode;
	private _warmupWithMarkdownRenderer;
	private _warmupViewportMarkdownCells;
	private createMarkupCellInitialization;
	restoreListViewState(viewState: INotebookEditorViewState | undefined): void;
	private _restoreSelectedKernel;
	getEditorViewState(): INotebookEditorViewState;
	private _allowScrollBeyondLastLine;
	private getBodyHeight;
	layout(
		dimension: DOM.Dimension,
		shadowElement?: HTMLElement,
		position?: DOM.IDomPosition,
	): void;
	private layoutNotebook;
	private updateShadowElement;
	private layoutContainerOverShadowElement;
	focus(): void;
	onShow(): void;
	private focusEditor;
	focusContainer(clearSelection?: boolean): void;
	selectOutputContent(cell: ICellViewModel): void;
	selectInputContents(cell: ICellViewModel): void;
	onWillHide(): void;
	private clearActiveCellWidgets;
	private editorHasDomFocus;
	updateEditorFocus(): void;
	updateCellFocusMode(): void;
	hasEditorFocus(): boolean;
	hasWebviewFocus(): boolean;
	hasOutputTextSelection(): boolean;
	_didFocusOutputInputChange(hasFocus: boolean): void;
	focusElement(cell: ICellViewModel): void;
	get scrollTop(): number;
	get scrollBottom(): number;
	getAbsoluteTopOfElement(cell: ICellViewModel): number;
	getHeightOfElement(cell: ICellViewModel): number;
	scrollToBottom(): void;
	setScrollTop(scrollTop: number): void;
	revealCellRangeInView(range: ICellRange): void;
	revealInView(cell: ICellViewModel): Promise<void>;
	revealInViewAtTop(cell: ICellViewModel): void;
	revealInCenter(cell: ICellViewModel): void;
	revealInCenterIfOutsideViewport(cell: ICellViewModel): Promise<void>;
	revealFirstLineIfOutsideViewport(cell: ICellViewModel): Promise<void>;
	revealLineInViewAsync(cell: ICellViewModel, line: number): Promise<void>;
	revealLineInCenterAsync(cell: ICellViewModel, line: number): Promise<void>;
	revealLineInCenterIfOutsideViewportAsync(
		cell: ICellViewModel,
		line: number,
	): Promise<void>;
	revealRangeInViewAsync(
		cell: ICellViewModel,
		range: Selection | Range,
	): Promise<void>;
	revealRangeInCenterAsync(
		cell: ICellViewModel,
		range: Selection | Range,
	): Promise<void>;
	revealRangeInCenterIfOutsideViewportAsync(
		cell: ICellViewModel,
		range: Selection | Range,
	): Promise<void>;
	revealCellOffsetInCenter(cell: ICellViewModel, offset: number): void;
	revealOffsetInCenterIfOutsideViewport(offset: number): void;
	getViewIndexByModelIndex(index: number): number;
	getViewHeight(cell: ICellViewModel): number;
	getCellRangeFromViewRange(
		startIndex: number,
		endIndex: number,
	): ICellRange | undefined;
	getCellsInRange(range?: ICellRange): ReadonlyArray<ICellViewModel>;
	setCellEditorSelection(cell: ICellViewModel, range: Range): void;
	setHiddenAreas(_ranges: ICellRange[]): boolean;
	getVisibleRangesPlusViewportAboveAndBelow(): ICellRange[];
	deltaCellDecorations(
		oldDecorations: string[],
		newDecorations: INotebookDeltaDecoration[],
	): string[];
	deltaCellContainerClassNames(
		cellId: string,
		added: string[],
		removed: string[],
	): void;
	changeModelDecorations<T>(
		callback: (changeAccessor: IModelDecorationsChangeAccessor) => T,
	): T | null;
	changeViewZones(
		callback: (accessor: INotebookViewZoneChangeAccessor) => void,
	): void;
	private _loadKernelPreloads;
	get activeKernel():
		| import("../common/notebookKernelService.js").INotebookKernel
		| undefined;
	cancelNotebookCells(cells?: Iterable<ICellViewModel>): Promise<void>;
	executeNotebookCells(cells?: Iterable<ICellViewModel>): Promise<void>;
	private _pendingLayouts;
	layoutNotebookCell(
		cell: ICellViewModel,
		height: number,
		context?: CellLayoutContext,
	): Promise<void>;
	getActiveCell(): ICellViewModel | undefined;
	private _toggleNotebookCellSelection;
	private getCellsInViewRange;
	focusNotebookCell(
		cell: ICellViewModel,
		focusItem: "editor" | "container" | "output",
		options?: IFocusNotebookCellOptions,
	): Promise<void>;
	focusNextNotebookCell(
		cell: ICellViewModel,
		focusItem: "editor" | "container" | "output",
	): Promise<void>;
	private _warmupCell;
	private _warmupAll;
	find(
		query: string,
		options: INotebookFindOptions,
		token: CancellationToken,
		skipWarmup?: boolean,
		shouldGetSearchPreviewInfo?: boolean,
		ownerID?: string,
	): Promise<CellFindMatchWithIndex[]>;
	findHighlightCurrent(matchIndex: number, ownerID?: string): Promise<number>;
	findUnHighlightCurrent(matchIndex: number, ownerID?: string): Promise<void>;
	findStop(ownerID?: string): void;
	getLayoutInfo(): NotebookLayoutInfo;
	createMarkupPreview(cell: MarkupCellViewModel): Promise<void>;
	private cellIsHidden;
	unhideMarkupPreviews(cells: readonly MarkupCellViewModel[]): Promise<void>;
	hideMarkupPreviews(cells: readonly MarkupCellViewModel[]): Promise<void>;
	deleteMarkupPreviews(cells: readonly MarkupCellViewModel[]): Promise<void>;
	private updateSelectedMarkdownPreviews;
	createOutput(
		cell: CodeCellViewModel,
		output: IInsetRenderOutput,
		offset: number,
		createWhenIdle: boolean,
	): Promise<void>;
	updateOutput(
		cell: CodeCellViewModel,
		output: IInsetRenderOutput,
		offset: number,
	): Promise<void>;
	copyOutputImage(cellOutput: ICellOutputViewModel): Promise<void>;
	removeInset(output: ICellOutputViewModel): void;
	hideInset(output: ICellOutputViewModel): void;
	postMessage(message: any): void;
	addClassName(className: string): void;
	removeClassName(className: string): void;
	cellAt(index: number): ICellViewModel | undefined;
	getCellByInfo(cellInfo: ICommonCellInfo): ICellViewModel;
	getCellByHandle(handle: number): ICellViewModel | undefined;
	getCellIndex(cell: ICellViewModel): number | undefined;
	getNextVisibleCellIndex(index: number): number | undefined;
	getPreviousVisibleCellIndex(index: number): number | undefined;
	private _updateScrollHeight;
	private _updateOutputHeight;
	private readonly _pendingOutputHeightAcks;
	private _scheduleOutputHeightAck;
	private _getCellById;
	private _updateMarkupCellHeight;
	private _setMarkupCellEditState;
	private _didStartDragMarkupCell;
	private _didDragMarkupCell;
	private _didDropMarkupCell;
	private _didEndDragMarkupCell;
	private _didResizeOutput;
	private _updatePerformanceMetadata;
	getContribution<T extends INotebookEditorContribution>(id: string): T;
	dispose(): void;
	toJSON(): {
		notebookUri: URI | undefined;
	};
}
export declare const notebookCellBorder: string;
export declare const focusedEditorBorderColor: string;
export declare const cellStatusIconSuccess: string;
export declare const runningCellRulerDecorationColor: string;
export declare const cellStatusIconError: string;
export declare const cellStatusIconRunning: string;
export declare const notebookOutputContainerBorderColor: string;
export declare const notebookOutputContainerColor: string;
export declare const CELL_TOOLBAR_SEPERATOR: string;
export declare const focusedCellBackground: string;
export declare const selectedCellBackground: string;
export declare const cellHoverBackground: string;
export declare const selectedCellBorder: string;
export declare const inactiveSelectedCellBorder: string;
export declare const focusedCellBorder: string;
export declare const inactiveFocusedCellBorder: string;
export declare const cellStatusBarItemHover: string;
export declare const cellInsertionIndicator: string;
export declare const listScrollbarSliderBackground: string;
export declare const listScrollbarSliderHoverBackground: string;
export declare const listScrollbarSliderActiveBackground: string;
export declare const cellSymbolHighlight: string;
export declare const cellEditorBackground: string;
