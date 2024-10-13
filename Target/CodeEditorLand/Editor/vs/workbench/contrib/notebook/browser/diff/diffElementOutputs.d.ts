import {
	Disposable,
	DisposableStore,
} from "../../../../../base/common/lifecycle.js";
import { IQuickInputService } from "../../../../../platform/quickinput/common/quickInput.js";
import { NotebookTextModel } from "../../common/model/notebookTextModel.js";
import { INotebookService } from "../../common/notebookService.js";
import {
	ICellOutputViewModel,
	IInsetRenderOutput,
} from "../notebookBrowser.js";
import { DiffElementCellViewModelBase } from "./diffElementViewModel.js";
import { DiffNestedCellViewModel } from "./diffNestedCellViewModel.js";
import {
	DiffSide,
	INotebookTextDiffEditor,
} from "./notebookDiffEditorBrowser.js";

export declare class OutputElement extends Disposable {
	private _notebookEditor;
	private _notebookTextModel;
	private _notebookService;
	private _quickInputService;
	private _diffElementViewModel;
	private _diffSide;
	private _nestedCell;
	private _outputContainer;
	readonly output: ICellOutputViewModel;
	readonly resizeListener: DisposableStore;
	domNode: HTMLElement;
	renderResult?: IInsetRenderOutput;
	constructor(
		_notebookEditor: INotebookTextDiffEditor,
		_notebookTextModel: NotebookTextModel,
		_notebookService: INotebookService,
		_quickInputService: IQuickInputService,
		_diffElementViewModel: DiffElementCellViewModelBase,
		_diffSide: DiffSide,
		_nestedCell: DiffNestedCellViewModel,
		_outputContainer: HTMLElement,
		output: ICellOutputViewModel,
	);
	render(index: number, beforeElement?: HTMLElement): void;
	private _renderMissingRenderer;
	private _renderSearchForMimetype;
	private _renderMessage;
	private pickActiveMimeTypeRenderer;
	private generateRendererInfo;
	getCellOutputCurrentIndex(): number;
	updateHeight(index: number, height: number): void;
	getOutputOffsetInContainer(index: number): number;
	getOutputOffsetInCell(index: number): number;
}
export declare class OutputContainer extends Disposable {
	private _editor;
	private _notebookTextModel;
	private _diffElementViewModel;
	private _nestedCellViewModel;
	private _diffSide;
	private _outputContainer;
	private _notebookService;
	private readonly _quickInputService;
	private _outputEntries;
	constructor(
		_editor: INotebookTextDiffEditor,
		_notebookTextModel: NotebookTextModel,
		_diffElementViewModel: DiffElementCellViewModelBase,
		_nestedCellViewModel: DiffNestedCellViewModel,
		_diffSide: DiffSide,
		_outputContainer: HTMLElement,
		_notebookService: INotebookService,
		_quickInputService: IQuickInputService,
	);
	private _updateOutputs;
	render(): void;
	showOutputs(): void;
	hideOutputs(): void;
	private _renderOutput;
}
