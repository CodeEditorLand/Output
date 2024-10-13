import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import {
	IDialogService,
	IFileDialogService,
} from "../../../../platform/dialogs/common/dialogs.js";
import { IEnvironmentService } from "../../../../platform/environment/common/environment.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import {
	IProgress,
	IProgressService,
	IProgressStep,
} from "../../../../platform/progress/common/progress.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IRequestService } from "../../../../platform/request/common/request.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IEditSessionIdentityService } from "../../../../platform/workspace/common/editSessions.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IActivityService } from "../../../services/activity/common/activity.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ILifecycleService } from "../../../services/lifecycle/common/lifecycle.js";
import { IRemoteAgentService } from "../../../services/remote/common/remoteAgentService.js";
import { IWorkspaceIdentityService } from "../../../services/workspaces/common/workspaceIdentityService.js";
import { ISCMService } from "../../scm/common/scm.js";
import {
	IEditSessionsLogService,
	IEditSessionsStorageService,
} from "../common/editSessions.js";

export declare class EditSessionsContribution
	extends Disposable
	implements IWorkbenchContribution
{
	private readonly editSessionsStorageService;
	private readonly fileService;
	private readonly progressService;
	private readonly openerService;
	private readonly telemetryService;
	private readonly scmService;
	private readonly notificationService;
	private readonly dialogService;
	private readonly logService;
	private readonly environmentService;
	private readonly instantiationService;
	private readonly productService;
	private configurationService;
	private readonly contextService;
	private readonly editSessionIdentityService;
	private readonly quickInputService;
	private commandService;
	private readonly contextKeyService;
	private readonly fileDialogService;
	private readonly lifecycleService;
	private readonly storageService;
	private readonly activityService;
	private readonly editorService;
	private readonly remoteAgentService;
	private readonly extensionService;
	private readonly requestService;
	private readonly userDataProfilesService;
	private readonly uriIdentityService;
	private readonly workspaceIdentityService;
	private continueEditSessionOptions;
	private readonly shouldShowViewsContext;
	private readonly pendingEditSessionsContext;
	private static APPLICATION_LAUNCHED_VIA_CONTINUE_ON_STORAGE_KEY;
	private readonly accountsMenuBadgeDisposable;
	private registeredCommands;
	private workspaceStateSynchronizer;
	private editSessionsStorageClient;
	constructor(
		editSessionsStorageService: IEditSessionsStorageService,
		fileService: IFileService,
		progressService: IProgressService,
		openerService: IOpenerService,
		telemetryService: ITelemetryService,
		scmService: ISCMService,
		notificationService: INotificationService,
		dialogService: IDialogService,
		logService: IEditSessionsLogService,
		environmentService: IEnvironmentService,
		instantiationService: IInstantiationService,
		productService: IProductService,
		configurationService: IConfigurationService,
		contextService: IWorkspaceContextService,
		editSessionIdentityService: IEditSessionIdentityService,
		quickInputService: IQuickInputService,
		commandService: ICommandService,
		contextKeyService: IContextKeyService,
		fileDialogService: IFileDialogService,
		lifecycleService: ILifecycleService,
		storageService: IStorageService,
		activityService: IActivityService,
		editorService: IEditorService,
		remoteAgentService: IRemoteAgentService,
		extensionService: IExtensionService,
		requestService: IRequestService,
		userDataProfilesService: IUserDataProfilesService,
		uriIdentityService: IUriIdentityService,
		workspaceIdentityService: IWorkspaceIdentityService,
	);
	private autoResumeEditSession;
	private updateAccountsMenuBadge;
	private autoStoreEditSession;
	private registerViews;
	private registerActions;
	private registerShowEditSessionOutputChannelAction;
	private registerShowEditSessionViewAction;
	private registerContinueEditSessionAction;
	private registerResumeLatestEditSessionAction;
	private registerStoreLatestEditSessionAction;
	resumeEditSession(
		ref?: string,
		silent?: boolean,
		forceApplyUnrelatedChange?: boolean,
		applyPartialMatch?: boolean,
		progress?: IProgress<IProgressStep>,
		serializedData?: string,
	): Promise<void>;
	private generateChanges;
	private willChangeLocalContents;
	storeEditSession(
		fromStoreCommand: boolean,
		cancellationToken: CancellationToken,
	): Promise<string | undefined>;
	private getChangedResources;
	private hasEditSession;
	private shouldContinueOnWithEditSession;
	private registerContributedEditSessionOptions;
	private generateStandaloneOptionCommand;
	private registerContinueInLocalFolderAction;
	private pickContinueEditSessionDestination;
	private resolveDestination;
	private createPickItems;
}
