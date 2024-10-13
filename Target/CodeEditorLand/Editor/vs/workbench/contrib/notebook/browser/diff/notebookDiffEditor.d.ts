import * as DOM from "../../../../../base/browser/dom.js";
import { IMouseWheelEvent } from "../../../../../base/browser/mouseEvent.js";
import { CancellationToken } from "../../../../../base/common/cancellation.js";
import { Emitter, Event } from "../../../../../base/common/event.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import { EditorPane } from "../../../../browser/parts/editor/editorPane.js";
import {
	IEditorOpenContext,
	IEditorPaneScrollPosition,
	IEditorPaneSelection,
	IEditorPaneSelectionChangeEvent,
	IEditorPaneWithScrolling,
	IEditorPaneWithSelection,
} from "../../../../common/editor.js";
import { IEditorGroup } from "../../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { NotebookDiffEditorInput } from "../../common/notebookDiffEditorInput.js";
import { INotebookService } from "../../common/notebookService.js";
import { INotebookEditorWorkerService } from "../../common/services/notebookWorkerService.js";
import {
	CellEditState,
	ICellOutputViewModel,
	IGenericCellViewModel,
	IInsetRenderOutput,
	INotebookEditorCreationOptions,
	INotebookEditorOptions,
} from "../notebookBrowser.js";
import { NotebookOptions } from "../notebookOptions.js";
import { NotebookLayoutInfo } from "../notebookViewEvents.js";
import { INotebookDelegateForWebview } from "../view/renderers/backLayerWebView.js";
import {
	DiffElementCellViewModelBase,
	IDiffElementViewModelBase,
} from "./diffElementViewModel.js";
import { DiffNestedCellViewModel } from "./diffNestedCellViewModel.js";
import {
	DiffSide,
	IDiffCellInfo,
	INotebookTextDiffEditor,
} from "./notebookDiffEditorBrowser.js";

export declare class NotebookTextDiffEditor
	extends EditorPane
	implements
		INotebookTextDiffEditor,
		INotebookDelegateForWebview,
		IEditorPaneWithSelection,
		IEditorPaneWithScrolling
{
	private readonly instantiationService;
	private readonly contextKeyService;
	private readonly notebookEditorWorkerService;
	private readonly configurationService;
	private readonly notebookService;
	private readonly editorService;
	static readonly ENTIRE_DIFF_OVERVIEW_WIDTH = 30;
	creationOptions: INotebookEditorCreationOptions;
	static readonly ID: string;
	private _rootElement;
	private _listViewContainer;
	private _overflowContainer;
	private _overviewRulerContainer;
	private _overviewRuler;
	private _dimension;
	private notebookDiffViewModel?;
	private _list;
	private _modifiedWebview;
	private _originalWebview;
	private _webviewTransparentCover;
	private _fontInfo;
	private readonly _onMouseUp;
	readonly onMouseUp: Event<{
		readonly event: MouseEvent;
		readonly target: IDiffElementViewModelBase;
	}>;
	private readonly _onDidScroll;
	readonly onDidScroll: Event<void>;
	readonly onDidChangeScroll: Event<void>;
	private _eventDispatcher;
	protected _scopeContextKeyService: IContextKeyService;
	private _model;
	private readonly diffEditorCalcuator;
	private readonly _modifiedResourceDisposableStore;
	get textModel():
		| import("../../common/model/notebookTextModel.js").NotebookTextModel
		| undefined;
	private _revealFirst;
	private readonly _insetModifyQueueByOutputId;
	protected _onDidDynamicOutputRendered: Emitter<{
		cell: IGenericCellViewModel;
		output: ICellOutputViewModel;
	}>;
	onDidDynamicOutputRendered: Event<{
		cell: IGenericCellViewModel;
		output: ICellOutputViewModel;
	}>;
	private _notebookOptions;
	get notebookOptions(): NotebookOptions;
	private readonly _localStore;
	private _layoutCancellationTokenSource?;
	private readonly _onDidChangeSelection;
	readonly onDidChangeSelection: Event<IEditorPaneSelectionChangeEvent>;
	private _isDisposed;
	get isDisposed(): boolean;
	constructor(
		group: IEditorGroup,
		instantiationService: IInstantiationService,
		themeService: IThemeService,
		contextKeyService: IContextKeyService,
		notebookEditorWorkerService: INotebookEditorWorkerService,
		configurationService: IConfigurationService,
		telemetryService: ITelemetryService,
		storageService: IStorageService,
		notebookService: INotebookService,
		editorService: IEditorService,
	);
	private get fontInfo();
	private createFontInfo;
	private isOverviewRulerEnabled;
	getSelection(): IEditorPaneSelection | undefined;
	toggleNotebookCellSelection(cell: IGenericCellViewModel): void;
	updatePerformanceMetadata(
		cellId: string,
		executionId: string,
		duration: number,
		rendererId: string,
	): void;
	focusNotebookCell(
		cell: IGenericCellViewModel,
		focus: "output" | "editor" | "container",
	): Promise<void>;
	focusNextNotebookCell(
		cell: IGenericCellViewModel,
		focus: "output" | "editor" | "container",
	): Promise<void>;
	didFocusOutputInputChange(inputFocused: boolean): void;
	getScrollTop(): number;
	getScrollHeight(): number;
	getScrollPosition(): IEditorPaneScrollPosition;
	setScrollPosition(scrollPosition: IEditorPaneScrollPosition): void;
	delegateVerticalScrollbarPointerDown(browserEvent: PointerEvent): void;
	updateOutputHeight(
		cellInfo: IDiffCellInfo,
		output: ICellOutputViewModel,
		outputHeight: number,
		isInit: boolean,
	): void;
	setMarkupCellEditState(cellId: string, editState: CellEditState): void;
	didStartDragMarkupCell(
		cellId: string,
		event: {
			dragOffsetY: number;
		},
	): void;
	didDragMarkupCell(
		cellId: string,
		event: {
			dragOffsetY: number;
		},
	): void;
	didEndDragMarkupCell(cellId: string): void;
	didDropMarkupCell(cellId: string): void;
	didResizeOutput(cellId: string): void;
	protected createEditor(parent: HTMLElement): void;
	private _registerOverviewRuler;
	private _updateOutputsOffsetsInWebview;
	setInput(
		input: NotebookDiffEditorInput,
		options: INotebookEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	private _detachModel;
	private _attachModel;
	private _createModifiedWebview;
	_generateFontFamily(): string;
	private _createOriginalWebview;
	setOptions(options: INotebookEditorOptions | undefined): void;
	updateLayout(
		token: CancellationToken,
		selections?: number[],
	): Promise<void>;
	scheduleOutputHeightAck(
		cellInfo: IDiffCellInfo,
		outputId: string,
		height: number,
	): void;
	private pendingLayouts;
	layoutNotebookCell(
		cell: IDiffElementViewModelBase,
		height: number,
	): Promise<void>;
	setScrollTop(scrollTop: number): void;
	triggerScroll(event: IMouseWheelEvent): void;
	previousChange(): void;
	nextChange(): void;
	createOutput(
		cellDiffViewModel: DiffElementCellViewModelBase,
		cellViewModel: DiffNestedCellViewModel,
		output: IInsetRenderOutput,
		getOffset: () => number,
		diffSide: DiffSide,
	): void;
	updateMarkupCellHeight(): void;
	getCellByInfo(cellInfo: IDiffCellInfo): IGenericCellViewModel;
	getCellById(cellId: string): IGenericCellViewModel | undefined;
	removeInset(
		cellDiffViewModel: DiffElementCellViewModelBase,
		cellViewModel: DiffNestedCellViewModel,
		displayOutput: ICellOutputViewModel,
		diffSide: DiffSide,
	): void;
	showInset(
		cellDiffViewModel: DiffElementCellViewModelBase,
		cellViewModel: DiffNestedCellViewModel,
		displayOutput: ICellOutputViewModel,
		diffSide: DiffSide,
	): void;
	hideInset(
		cellDiffViewModel: DiffElementCellViewModelBase,
		cellViewModel: DiffNestedCellViewModel,
		output: ICellOutputViewModel,
	): void;
	getDomNode(): HTMLElement;
	getOverflowContainerDomNode(): HTMLElement;
	getControl(): INotebookTextDiffEditor | undefined;
	clearInput(): void;
	deltaCellOutputContainerClassNames(
		diffSide: DiffSide,
		cellId: string,
		added: string[],
		removed: string[],
	): void;
	getLayoutInfo(): NotebookLayoutInfo;
	layout(dimension: DOM.Dimension, _position: DOM.IDomPosition): void;
	dispose(): void;
}
