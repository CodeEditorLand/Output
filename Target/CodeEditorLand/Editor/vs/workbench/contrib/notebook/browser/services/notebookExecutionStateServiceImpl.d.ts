import { Disposable } from "../../../../../base/common/lifecycle.js";
import { URI } from "../../../../../base/common/uri.js";
import { IAccessibilitySignalService } from "../../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../../platform/log/common/log.js";
import {
	ICellExecutionStateChangedEvent,
	IExecutionStateChangedEvent,
	INotebookCellExecution,
	INotebookExecution,
	INotebookExecutionStateService,
	INotebookFailStateChangedEvent,
} from "../../common/notebookExecutionStateService.js";
import { INotebookService } from "../../common/notebookService.js";

export declare class NotebookExecutionStateService
	extends Disposable
	implements INotebookExecutionStateService
{
	private readonly _instantiationService;
	private readonly _logService;
	private readonly _notebookService;
	private readonly _accessibilitySignalService;
	_serviceBrand: undefined;
	private readonly _executions;
	private readonly _notebookExecutions;
	private readonly _notebookListeners;
	private readonly _cellListeners;
	private readonly _lastFailedCells;
	private readonly _onDidChangeExecution;
	onDidChangeExecution: import("../../../../workbench.web.main.internal.js").Event<
		ICellExecutionStateChangedEvent | IExecutionStateChangedEvent
	>;
	private readonly _onDidChangeLastRunFailState;
	onDidChangeLastRunFailState: import("../../../../workbench.web.main.internal.js").Event<INotebookFailStateChangedEvent>;
	constructor(
		_instantiationService: IInstantiationService,
		_logService: ILogService,
		_notebookService: INotebookService,
		_accessibilitySignalService: IAccessibilitySignalService,
	);
	getLastFailedCellForNotebook(notebook: URI): number | undefined;
	forceCancelNotebookExecutions(notebookUri: URI): void;
	getCellExecution(cellUri: URI): INotebookCellExecution | undefined;
	getExecution(notebook: URI): INotebookExecution | undefined;
	getCellExecutionsForNotebook(notebook: URI): INotebookCellExecution[];
	getCellExecutionsByHandleForNotebook(
		notebook: URI,
	): Map<number, INotebookCellExecution> | undefined;
	private _onCellExecutionDidChange;
	private _onCellExecutionDidComplete;
	private _onExecutionDidChange;
	private _onExecutionDidComplete;
	createCellExecution(
		notebookUri: URI,
		cellHandle: number,
	): INotebookCellExecution;
	createExecution(notebookUri: URI): INotebookExecution;
	private _createNotebookCellExecution;
	private _createNotebookExecution;
	private _setLastFailedCell;
	private _setLastFailedCellVisibility;
	private _clearLastFailedCell;
	private _getFailedCellListener;
	dispose(): void;
}
