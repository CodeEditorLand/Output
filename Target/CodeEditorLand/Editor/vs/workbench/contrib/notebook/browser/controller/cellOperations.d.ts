import {
	IBulkEditService,
	ResourceEdit,
} from "../../../../../editor/browser/services/bulkEditService.js";
import { IPosition } from "../../../../../editor/common/core/position.js";
import { ILanguageService } from "../../../../../editor/common/languages/language.js";
import { INotificationService } from "../../../../../platform/notification/common/notification.js";
import {
	CellKind,
	IOutputDto,
	NotebookCellMetadata,
} from "../../common/notebookCommon.js";
import { ICellRange } from "../../common/notebookRange.js";
import { IActiveNotebookEditor, ICellViewModel } from "../notebookBrowser.js";
import {
	CellViewModel,
	NotebookViewModel,
} from "../viewModel/notebookViewModelImpl.js";
import {
	INotebookActionContext,
	INotebookCellActionContext,
} from "./coreActions.js";

export declare function changeCellToKind(
	kind: CellKind,
	context: INotebookActionContext,
	language?: string,
	mime?: string,
): Promise<void>;
export declare function runDeleteAction(
	editor: IActiveNotebookEditor,
	cell: ICellViewModel,
): void;
export declare function moveCellRange(
	context: INotebookActionContext,
	direction: "up" | "down",
): Promise<void>;
export declare function copyCellRange(
	context: INotebookCellActionContext,
	direction: "up" | "down",
): Promise<void>;
export declare function joinSelectedCells(
	bulkEditService: IBulkEditService,
	notificationService: INotificationService,
	context: INotebookCellActionContext,
): Promise<void>;
export declare function joinNotebookCells(
	editor: IActiveNotebookEditor,
	range: ICellRange,
	direction: "above" | "below",
	constraint?: CellKind,
): Promise<{
	edits: ResourceEdit[];
	cell: ICellViewModel;
	endFocus: ICellRange;
	endSelections: ICellRange[];
} | null>;
export declare function joinCellsWithSurrounds(
	bulkEditService: IBulkEditService,
	context: INotebookCellActionContext,
	direction: "above" | "below",
): Promise<void>;
export declare function computeCellLinesContents(
	cell: ICellViewModel,
	splitPoints: IPosition[],
): string[] | null;
export declare function insertCell(
	languageService: ILanguageService,
	editor: IActiveNotebookEditor,
	index: number,
	type: CellKind,
	direction?: "above" | "below",
	initialText?: string,
	ui?: boolean,
): CellViewModel | null;
export declare function insertCellAtIndex(
	viewModel: NotebookViewModel,
	index: number,
	source: string,
	language: string,
	type: CellKind,
	metadata: NotebookCellMetadata | undefined,
	outputs: IOutputDto[],
	synchronous: boolean,
	pushUndoStop: boolean,
): CellViewModel;
