import { IStringDictionary } from "../../../../base/common/collections.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IMarkerService } from "../../../../platform/markers/common/markers.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IConfigurationResolverService } from "../../../services/configurationResolver/common/configurationResolver.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IOutputService } from "../../../services/output/common/output.js";
import { IPaneCompositePartService } from "../../../services/panecomposite/browser/panecomposite.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import {
	ITerminalGroupService,
	ITerminalService,
} from "../../terminal/browser/terminal.js";
import { ITerminalProfileResolverService } from "../../terminal/common/terminal.js";
import { ITaskEvent, Task } from "../common/tasks.js";
import {
	ITaskExecuteResult,
	ITaskResolver,
	ITaskSystem,
	ITaskSystemInfoResolver,
	ITaskTerminateResponse,
} from "../common/taskSystem.js";

export declare class TerminalTaskSystem
	extends Disposable
	implements ITaskSystem
{
	private _terminalService;
	private _terminalGroupService;
	private _outputService;
	private _paneCompositeService;
	private _viewsService;
	private _markerService;
	private _modelService;
	private _configurationResolverService;
	private _contextService;
	private _environmentService;
	private _outputChannelId;
	private _fileService;
	private _terminalProfileResolverService;
	private _pathService;
	private _viewDescriptorService;
	private _logService;
	private _notificationService;
	static TelemetryEventName: string;
	private static readonly ProcessVarName;
	private static _shellQuotes;
	private static _osShellQuotes;
	private _activeTasks;
	private _busyTasks;
	private _terminals;
	private _idleTaskTerminals;
	private _sameTaskTerminals;
	private _taskSystemInfoResolver;
	private _lastTask;
	private _currentTask;
	private _isRerun;
	private _previousPanelId;
	private _previousTerminalInstance;
	private _terminalStatusManager;
	private _terminalCreationQueue;
	private _hasReconnected;
	private readonly _onDidStateChange;
	private _reconnectedTerminals;
	taskShellIntegrationStartSequence(cwd: string | URI | undefined): string;
	get taskShellIntegrationOutputSequence(): string;
	constructor(
		_terminalService: ITerminalService,
		_terminalGroupService: ITerminalGroupService,
		_outputService: IOutputService,
		_paneCompositeService: IPaneCompositePartService,
		_viewsService: IViewsService,
		_markerService: IMarkerService,
		_modelService: IModelService,
		_configurationResolverService: IConfigurationResolverService,
		_contextService: IWorkspaceContextService,
		_environmentService: IWorkbenchEnvironmentService,
		_outputChannelId: string,
		_fileService: IFileService,
		_terminalProfileResolverService: ITerminalProfileResolverService,
		_pathService: IPathService,
		_viewDescriptorService: IViewDescriptorService,
		_logService: ILogService,
		_notificationService: INotificationService,
		instantiationService: IInstantiationService,
		taskSystemInfoResolver: ITaskSystemInfoResolver,
	);
	get onDidStateChange(): Event<ITaskEvent>;
	private _log;
	protected _showOutput(): void;
	reconnect(task: Task, resolver: ITaskResolver): ITaskExecuteResult;
	run(
		task: Task,
		resolver: ITaskResolver,
		trigger?: string,
	): ITaskExecuteResult;
	rerun(): ITaskExecuteResult | undefined;
	private _showTaskLoadErrors;
	isTaskVisible(task: Task): boolean;
	revealTask(task: Task): boolean;
	isActive(): Promise<boolean>;
	isActiveSync(): boolean;
	canAutoTerminate(): boolean;
	getActiveTasks(): Task[];
	getLastInstance(task: Task): Task | undefined;
	getBusyTasks(): Task[];
	customExecutionComplete(task: Task, result: number): Promise<void>;
	private _getInstances;
	private _removeFromActiveTasks;
	private _fireTaskEvent;
	terminate(task: Task): Promise<ITaskTerminateResponse>;
	terminateAll(): Promise<ITaskTerminateResponse[]>;
	private _showDependencyCycleMessage;
	private _executeTask;
	private _createInactiveDependencyPromise;
	private _adoptConfigurationForDependencyTask;
	private _getDependencyPromise;
	private _executeDependencyTask;
	private _resolveAndFindExecutable;
	private _findUnresolvedVariables;
	private _mergeMaps;
	private _acquireInput;
	private _resolveVariablesFromSet;
	private _executeCommand;
	private _isTaskEmpty;
	private _reexecuteCommand;
	private _executeInTerminal;
	private _createTerminalName;
	private _createShellLaunchConfig;
	private _addAllArgument;
	private _reconnectToTerminal;
	private _doCreateTerminal;
	private _reconnectToTerminals;
	private _deleteTaskAndTerminal;
	private _createTerminal;
	private _buildShellCommandLine;
	private _getQuotingOptions;
	private _collectTaskVariables;
	private _collectDefinitionVariables;
	private _collectCommandVariables;
	private _collectMatcherVariables;
	private _collectVariables;
	private _resolveCommandAndArgs;
	private _resolveVariables;
	private _resolveMatchers;
	private _resolveVariable;
	private _resolveOptions;
	static WellKnownCommands: IStringDictionary<boolean>;
	getSanitizedCommand(cmd: string): string;
	private _appendOutput;
}
