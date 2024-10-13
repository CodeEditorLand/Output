import { UriComponents } from "../../../base/common/uri.js";
import { ILanguageService } from "../../../editor/common/languages/language.js";
import { INotebookEditorService } from "../../contrib/notebook/browser/services/notebookEditorService.js";
import { INotebookExecutionStateService } from "../../contrib/notebook/common/notebookExecutionStateService.js";
import {
	INotebookKernelService,
	VariablesResult,
} from "../../contrib/notebook/common/notebookKernelService.js";
import { INotebookService } from "../../contrib/notebook/common/notebookService.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import { SerializableObjectWithBuffers } from "../../services/extensions/common/proxyIdentifier.js";
import {
	ICellExecuteUpdateDto,
	ICellExecutionCompleteDto,
	INotebookKernelDto2,
	MainThreadNotebookKernelsShape,
} from "../common/extHost.protocol.js";

export declare class MainThreadNotebookKernels
	implements MainThreadNotebookKernelsShape
{
	private readonly _languageService;
	private readonly _notebookKernelService;
	private readonly _notebookExecutionStateService;
	private readonly _notebookService;
	private readonly _editors;
	private readonly _disposables;
	private readonly _kernels;
	private readonly _kernelDetectionTasks;
	private readonly _kernelSourceActionProviders;
	private readonly _kernelSourceActionProvidersEventRegistrations;
	private readonly _proxy;
	private readonly _executions;
	private readonly _notebookExecutions;
	constructor(
		extHostContext: IExtHostContext,
		_languageService: ILanguageService,
		_notebookKernelService: INotebookKernelService,
		_notebookExecutionStateService: INotebookExecutionStateService,
		_notebookService: INotebookService,
		notebookEditorService: INotebookEditorService,
	);
	dispose(): void;
	private _onEditorAdd;
	private _onEditorRemove;
	$postMessage(
		handle: number,
		editorId: string | undefined,
		message: any,
	): Promise<boolean>;
	private variableRequestIndex;
	private variableRequestMap;
	$receiveVariable(requestId: string, variable: VariablesResult): void;
	$addKernel(handle: number, data: INotebookKernelDto2): Promise<void>;
	$updateKernel(handle: number, data: Partial<INotebookKernelDto2>): void;
	$removeKernel(handle: number): void;
	$updateNotebookPriority(
		handle: number,
		notebook: UriComponents,
		value: number | undefined,
	): void;
	$createExecution(
		handle: number,
		controllerId: string,
		rawUri: UriComponents,
		cellHandle: number,
	): void;
	$updateExecution(
		handle: number,
		data: SerializableObjectWithBuffers<ICellExecuteUpdateDto[]>,
	): void;
	$completeExecution(
		handle: number,
		data: SerializableObjectWithBuffers<ICellExecutionCompleteDto>,
	): void;
	$createNotebookExecution(
		handle: number,
		controllerId: string,
		rawUri: UriComponents,
	): void;
	$beginNotebookExecution(handle: number): void;
	$completeNotebookExecution(handle: number): void;
	$addKernelDetectionTask(
		handle: number,
		notebookType: string,
	): Promise<void>;
	$removeKernelDetectionTask(handle: number): void;
	$addKernelSourceActionProvider(
		handle: number,
		eventHandle: number,
		notebookType: string,
	): Promise<void>;
	$removeKernelSourceActionProvider(
		handle: number,
		eventHandle: number,
	): void;
	$emitNotebookKernelSourceActionsChangeEvent(eventHandle: number): void;
	$variablesUpdated(notebookUri: UriComponents): void;
}
