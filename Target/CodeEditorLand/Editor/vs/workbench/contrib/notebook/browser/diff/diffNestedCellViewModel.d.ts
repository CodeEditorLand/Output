import { Emitter } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { PrefixSumComputer } from "../../../../../editor/common/model/prefixSumComputer.js";
import { NotebookCellTextModel } from "../../common/model/notebookCellTextModel.js";
import { INotebookService } from "../../common/notebookService.js";
import {
	ICellOutputViewModel,
	IGenericCellViewModel,
} from "../notebookBrowser.js";
import { CellViewModelStateChangeEvent } from "../notebookViewEvents.js";
import { IDiffNestedCellViewModel } from "./notebookDiffEditorBrowser.js";

export declare class DiffNestedCellViewModel
	extends Disposable
	implements IDiffNestedCellViewModel, IGenericCellViewModel
{
	readonly textModel: NotebookCellTextModel;
	private _notebookService;
	private _id;
	get id(): string;
	get outputs(): import("../../common/notebookCommon.js").ICellOutput[];
	get language(): string;
	get metadata(): import("../../common/notebookCommon.js").NotebookCellMetadata;
	get uri(): import("../../../../workbench.web.main.internal.js").URI;
	get handle(): number;
	protected readonly _onDidChangeState: Emitter<CellViewModelStateChangeEvent>;
	private _hoveringOutput;
	get outputIsHovered(): boolean;
	set outputIsHovered(v: boolean);
	private _focusOnOutput;
	get outputIsFocused(): boolean;
	set outputIsFocused(v: boolean);
	private _focusInputInOutput;
	get inputInOutputIsFocused(): boolean;
	set inputInOutputIsFocused(v: boolean);
	private _outputViewModels;
	get outputsViewModels(): ICellOutputViewModel[];
	protected _outputCollection: number[];
	protected _outputsTop: PrefixSumComputer | null;
	protected readonly _onDidChangeOutputLayout: Emitter<void>;
	readonly onDidChangeOutputLayout: import("../../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		textModel: NotebookCellTextModel,
		_notebookService: INotebookService,
	);
	private _ensureOutputsTop;
	getOutputOffset(index: number): number;
	updateOutputHeight(index: number, height: number): void;
	getOutputTotalHeight(): number;
	dispose(): void;
}
