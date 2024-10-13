import { IModelService } from "../../../../editor/common/services/model.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IAccessibilitySignalService } from "../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IMarkerService } from "../../../../platform/markers/common/markers.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import {
	IWorkspaceContextService,
	IWorkspaceFolder,
} from "../../../../platform/workspace/common/workspace.js";
import {
	IWorkspaceTrustManagementService,
	IWorkspaceTrustRequestService,
} from "../../../../platform/workspace/common/workspaceTrust.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IConfigurationResolverService } from "../../../services/configurationResolver/common/configurationResolver.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ILifecycleService } from "../../../services/lifecycle/common/lifecycle.js";
import { IOutputService } from "../../../services/output/common/output.js";
import { IPaneCompositePartService } from "../../../services/panecomposite/browser/panecomposite.js";
import { IPathService } from "../../../services/path/common/pathService.js";
import { IPreferencesService } from "../../../services/preferences/common/preferences.js";
import { IRemoteAgentService } from "../../../services/remote/common/remoteAgentService.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import {
	ITerminalGroupService,
	ITerminalService,
} from "../../terminal/browser/terminal.js";
import { ITerminalProfileResolverService } from "../../terminal/common/terminal.js";
import { AbstractTaskService } from "../browser/abstractTaskService.js";
import * as TaskConfig from "../common/taskConfiguration.js";
import { ITaskFilter } from "../common/taskService.js";
import { ITaskSystem } from "../common/taskSystem.js";

interface IWorkspaceFolderConfigurationResult {
	workspaceFolder: IWorkspaceFolder;
	config: TaskConfig.IExternalTaskRunnerConfiguration | undefined;
	hasErrors: boolean;
}
export declare class TaskService extends AbstractTaskService {
	constructor(
		configurationService: IConfigurationService,
		markerService: IMarkerService,
		outputService: IOutputService,
		paneCompositeService: IPaneCompositePartService,
		viewsService: IViewsService,
		commandService: ICommandService,
		editorService: IEditorService,
		fileService: IFileService,
		contextService: IWorkspaceContextService,
		telemetryService: ITelemetryService,
		textFileService: ITextFileService,
		lifecycleService: ILifecycleService,
		modelService: IModelService,
		extensionService: IExtensionService,
		quickInputService: IQuickInputService,
		configurationResolverService: IConfigurationResolverService,
		terminalService: ITerminalService,
		terminalGroupService: ITerminalGroupService,
		storageService: IStorageService,
		progressService: IProgressService,
		openerService: IOpenerService,
		dialogService: IDialogService,
		notificationService: INotificationService,
		contextKeyService: IContextKeyService,
		environmentService: IWorkbenchEnvironmentService,
		terminalProfileResolverService: ITerminalProfileResolverService,
		pathService: IPathService,
		textModelResolverService: ITextModelService,
		preferencesService: IPreferencesService,
		viewDescriptorService: IViewDescriptorService,
		workspaceTrustRequestService: IWorkspaceTrustRequestService,
		workspaceTrustManagementService: IWorkspaceTrustManagementService,
		logService: ILogService,
		themeService: IThemeService,
		instantiationService: IInstantiationService,
		remoteAgentService: IRemoteAgentService,
		accessibilitySignalService: IAccessibilitySignalService,
	);
	protected _getTaskSystem(): ITaskSystem;
	protected _computeLegacyConfiguration(
		workspaceFolder: IWorkspaceFolder,
	): Promise<IWorkspaceFolderConfigurationResult>;
	protected _versionAndEngineCompatible(filter?: ITaskFilter): boolean;
	beforeShutdown(): boolean | Promise<boolean>;
}
export {};
