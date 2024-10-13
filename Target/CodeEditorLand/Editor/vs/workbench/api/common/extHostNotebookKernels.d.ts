import * as vscode from "vscode";

import { CancellationToken } from "../../../base/common/cancellation.js";
import { UriComponents } from "../../../base/common/uri.js";
import {
	ExtensionIdentifier,
	IExtensionDescription,
} from "../../../platform/extensions/common/extensions.js";
import { ILogService } from "../../../platform/log/common/log.js";
import {
	INotebookKernelSourceAction,
	NotebookCellExecutionState,
} from "../../contrib/notebook/common/notebookCommon.js";
import {
	ExtHostNotebookKernelsShape,
	IMainContext,
} from "./extHost.protocol.js";
import { ExtHostCommands } from "./extHostCommands.js";
import { IExtHostInitDataService } from "./extHostInitDataService.js";
import { ExtHostNotebookController } from "./extHostNotebook.js";

export declare class ExtHostNotebookKernels
	implements ExtHostNotebookKernelsShape
{
	private readonly _initData;
	private readonly _extHostNotebook;
	private _commands;
	private readonly _logService;
	private readonly _proxy;
	private readonly _activeExecutions;
	private readonly _activeNotebookExecutions;
	private _kernelDetectionTask;
	private _kernelDetectionTaskHandlePool;
	private _kernelSourceActionProviders;
	private _kernelSourceActionProviderHandlePool;
	private readonly _kernelData;
	private _handlePool;
	private readonly _onDidChangeCellExecutionState;
	readonly onDidChangeNotebookCellExecutionState: import("../../workbench.web.main.internal.js").Event<vscode.NotebookCellExecutionStateChangeEvent>;
	constructor(
		mainContext: IMainContext,
		_initData: IExtHostInitDataService,
		_extHostNotebook: ExtHostNotebookController,
		_commands: ExtHostCommands,
		_logService: ILogService,
	);
	createNotebookController(
		extension: IExtensionDescription,
		id: string,
		viewType: string,
		label: string,
		handler?: (
			cells: vscode.NotebookCell[],
			notebook: vscode.NotebookDocument,
			controller: vscode.NotebookController,
		) => void | Thenable<void>,
		preloads?: vscode.NotebookRendererScript[],
	): vscode.NotebookController;
	getIdByController(controller: vscode.NotebookController): string | null;
	createNotebookControllerDetectionTask(
		extension: IExtensionDescription,
		viewType: string,
	): vscode.NotebookControllerDetectionTask;
	registerKernelSourceActionProvider(
		extension: IExtensionDescription,
		viewType: string,
		provider: vscode.NotebookKernelSourceActionProvider,
	): {
		dispose: () => void;
	};
	$provideKernelSourceActions(
		handle: number,
		token: CancellationToken,
	): Promise<INotebookKernelSourceAction[]>;
	$acceptNotebookAssociation(
		handle: number,
		uri: UriComponents,
		value: boolean,
	): void;
	$executeCells(
		handle: number,
		uri: UriComponents,
		handles: number[],
	): Promise<void>;
	$cancelCells(
		handle: number,
		uri: UriComponents,
		handles: number[],
	): Promise<void>;
	private id;
	private variableStore;
	$provideVariables(
		handle: number,
		requestId: string,
		notebookUri: UriComponents,
		parentId: number | undefined,
		kind: "named" | "indexed",
		start: number,
		token: CancellationToken,
	): Promise<void>;
	$acceptKernelMessageFromRenderer(
		handle: number,
		editorId: string,
		message: any,
	): void;
	$cellExecutionChanged(
		uri: UriComponents,
		cellHandle: number,
		state: NotebookCellExecutionState | undefined,
	): void;
	_createNotebookCellExecution(
		cell: vscode.NotebookCell,
		controllerId: string,
	): vscode.NotebookCellExecution;
	_createNotebookExecution(
		nb: vscode.NotebookDocument,
		controllerId: string,
	): vscode.NotebookExecution;
}
export declare function createKernelId(
	extensionIdentifier: ExtensionIdentifier,
	id: string,
): string;
