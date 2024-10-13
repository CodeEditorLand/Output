import { Event } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { URI } from "../../../../../base/common/uri.js";
import { IBulkEditService } from "../../../../../editor/browser/services/bulkEditService.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { TrackedRangeStickiness } from "../../../../../editor/common/model.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { FoldingRegions } from "../../../../../editor/contrib/folding/browser/foldingRanges.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IUndoRedoService } from "../../../../../platform/undoRedo/common/undoRedo.js";
import { NotebookCellTextModel } from "../../common/model/notebookCellTextModel.js";
import { NotebookTextModel } from "../../common/model/notebookTextModel.js";
import {
	INotebookFindOptions,
	ISelectionState,
} from "../../common/notebookCommon.js";
import { INotebookExecutionStateService } from "../../common/notebookExecutionStateService.js";
import { ICellRange } from "../../common/notebookRange.js";
import {
	CellFindMatchWithIndex,
	CellFoldingState,
	EditorFoldingStateDelegate,
	ICellViewModel,
	IModelDecorationsChangeAccessor,
	INotebookDeltaCellStatusBarItems,
	INotebookDeltaDecoration,
	INotebookEditorViewState,
	INotebookViewCellsUpdateEvent,
	INotebookViewModel,
} from "../notebookBrowser.js";
import { NotebookLayoutInfo } from "../notebookViewEvents.js";
import { CodeCellViewModel } from "./codeCellViewModel.js";
import { MarkupCellViewModel } from "./markupCellViewModel.js";
import { ViewContext } from "./viewContext.js";

export interface NotebookViewModelOptions {
	isReadOnly: boolean;
}
export declare class NotebookViewModel
	extends Disposable
	implements EditorFoldingStateDelegate, INotebookViewModel
{
	viewType: string;
	private _notebook;
	private _viewContext;
	private _layoutInfo;
	private _options;
	private readonly _instantiationService;
	private readonly _bulkEditService;
	private readonly _undoService;
	private readonly _textModelService;
	private readonly _localStore;
	private _handleToViewCellMapping;
	get options(): NotebookViewModelOptions;
	private readonly _onDidChangeOptions;
	get onDidChangeOptions(): Event<void>;
	private _viewCells;
	get viewCells(): ICellViewModel[];
	get length(): number;
	get notebookDocument(): NotebookTextModel;
	get uri(): URI;
	get metadata(): import("../../common/notebookCommon.js").NotebookDocumentMetadata;
	private get isRepl();
	private readonly _onDidChangeViewCells;
	get onDidChangeViewCells(): Event<INotebookViewCellsUpdateEvent>;
	private _lastNotebookEditResource;
	get lastNotebookEditResource(): URI | null;
	get layoutInfo(): NotebookLayoutInfo | null;
	private readonly _onDidChangeSelection;
	get onDidChangeSelection(): Event<string>;
	private _selectionCollection;
	private get selectionHandles();
	private set selectionHandles(value);
	private _decorationsTree;
	private _decorations;
	private _lastDecorationId;
	private readonly _instanceId;
	readonly id: string;
	private _foldingRanges;
	private _onDidFoldingStateChanged;
	onDidFoldingStateChanged: Event<void>;
	private _hiddenRanges;
	private _focused;
	get focused(): boolean;
	private _decorationIdToCellMap;
	private _statusBarItemIdToCellMap;
	constructor(
		viewType: string,
		_notebook: NotebookTextModel,
		_viewContext: ViewContext,
		_layoutInfo: NotebookLayoutInfo | null,
		_options: NotebookViewModelOptions,
		_instantiationService: IInstantiationService,
		_bulkEditService: IBulkEditService,
		_undoService: IUndoRedoService,
		_textModelService: ITextModelService,
		notebookExecutionStateService: INotebookExecutionStateService,
	);
	updateOptions(newOptions: Partial<NotebookViewModelOptions>): void;
	getFocus(): ICellRange;
	getSelections(): ICellRange[];
	setEditorFocus(focused: boolean): void;
	validateRange(cellRange: ICellRange | null | undefined): ICellRange | null;
	updateSelectionsState(
		state: ISelectionState,
		source?: "view" | "model",
	): void;
	getFoldingStartIndex(index: number): number;
	getFoldingState(index: number): CellFoldingState;
	getFoldedLength(index: number): number;
	updateFoldingRanges(ranges: FoldingRegions): void;
	getHiddenRanges(): ICellRange[];
	getCellByHandle(handle: number): CellViewModel | undefined;
	getCellIndexByHandle(handle: number): number;
	getCellIndex(cell: ICellViewModel): number;
	cellAt(index: number): CellViewModel | undefined;
	getCellsInRange(range?: ICellRange): ReadonlyArray<ICellViewModel>;
	/**
	 * If this._viewCells[index] is visible then return index
	 */
	getNearestVisibleCellIndexUpwards(index: number): number;
	getNextVisibleCellIndex(index: number): number;
	getPreviousVisibleCellIndex(index: number): number;
	hasCell(cell: ICellViewModel): boolean;
	getVersionId(): number;
	getAlternativeId(): string;
	getTrackedRange(id: string): ICellRange | null;
	private _getDecorationRange;
	setTrackedRange(
		id: string | null,
		newRange: ICellRange | null,
		newStickiness: TrackedRangeStickiness,
	): string | null;
	private _deltaCellDecorationsImpl;
	deltaCellDecorations(
		oldDecorations: string[],
		newDecorations: INotebookDeltaDecoration[],
	): string[];
	deltaCellStatusBarItems(
		oldItems: string[],
		newItems: INotebookDeltaCellStatusBarItems[],
	): string[];
	nearestCodeCellIndex(index: number): number;
	getEditorViewState(): INotebookEditorViewState;
	restoreEditorViewState(
		viewState: INotebookEditorViewState | undefined,
	): void;
	/**
	 * Editor decorations across cells. For example, find decorations for multiple code cells
	 * The reason that we can't completely delegate this to CodeEditorWidget is most of the time, the editors for cells are not created yet but we already have decorations for them.
	 */
	changeModelDecorations<T>(
		callback: (changeAccessor: IModelDecorationsChangeAccessor) => T,
	): T | null;
	private _deltaModelDecorationsImpl;
	find(
		value: string,
		options: INotebookFindOptions,
	): CellFindMatchWithIndex[];
	replaceOne(cell: ICellViewModel, range: Range, text: string): Promise<void>;
	replaceAll(
		matches: CellFindMatchWithIndex[],
		texts: string[],
	): Promise<void>;
	private _withElement;
	undo(): Promise<readonly URI[]>;
	redo(): Promise<readonly URI[]>;
	equal(notebook: NotebookTextModel): boolean;
	dispose(): void;
}
export type CellViewModel = (CodeCellViewModel | MarkupCellViewModel) &
	ICellViewModel;
export declare function createCellViewModel(
	instantiationService: IInstantiationService,
	notebookViewModel: NotebookViewModel,
	cell: NotebookCellTextModel,
	viewContext: ViewContext,
): CodeCellViewModel | MarkupCellViewModel;
