import { URI } from "../../../../base/common/uri.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import {
	IDialogService,
	IFileDialogService,
} from "../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { INativeHostService } from "../../../../platform/native/common/native.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IWorkspaceTrustManagementService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { IWorkspacesService } from "../../../../platform/workspaces/common/workspaces.js";
import { WorkspaceService } from "../../configuration/browser/configurationService.js";
import { IWorkbenchConfigurationService } from "../../configuration/common/configuration.js";
import { IJSONEditingService } from "../../configuration/common/jsonEditing.js";
import { INativeWorkbenchEnvironmentService } from "../../environment/electron-sandbox/environmentService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { IHostService } from "../../host/browser/host.js";
import { ILifecycleService } from "../../lifecycle/common/lifecycle.js";
import { ITextFileService } from "../../textfile/common/textfiles.js";
import { IUserDataProfileService } from "../../userDataProfile/common/userDataProfile.js";
import { IWorkingCopyBackupService } from "../../workingCopy/common/workingCopyBackup.js";
import { AbstractWorkspaceEditingService } from "../browser/abstractWorkspaceEditingService.js";

export declare class NativeWorkspaceEditingService extends AbstractWorkspaceEditingService {
	private nativeHostService;
	private storageService;
	private extensionService;
	private workingCopyBackupService;
	private readonly lifecycleService;
	private readonly labelService;
	constructor(
		jsonEditingService: IJSONEditingService,
		contextService: WorkspaceService,
		nativeHostService: INativeHostService,
		configurationService: IWorkbenchConfigurationService,
		storageService: IStorageService,
		extensionService: IExtensionService,
		workingCopyBackupService: IWorkingCopyBackupService,
		notificationService: INotificationService,
		commandService: ICommandService,
		fileService: IFileService,
		textFileService: ITextFileService,
		workspacesService: IWorkspacesService,
		environmentService: INativeWorkbenchEnvironmentService,
		fileDialogService: IFileDialogService,
		dialogService: IDialogService,
		lifecycleService: ILifecycleService,
		labelService: ILabelService,
		hostService: IHostService,
		uriIdentityService: IUriIdentityService,
		workspaceTrustManagementService: IWorkspaceTrustManagementService,
		userDataProfilesService: IUserDataProfilesService,
		userDataProfileService: IUserDataProfileService,
	);
	private registerListeners;
	private saveUntitledBeforeShutdown;
	isValidTargetWorkspacePath(workspaceUri: URI): Promise<boolean>;
	enterWorkspace(workspaceUri: URI): Promise<void>;
}
