import {
	IDialogService,
	IFileDialogService,
} from "../../../../platform/dialogs/common/dialogs.js";
import { IEnvironmentService } from "../../../../platform/environment/common/environment.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INativeHostService } from "../../../../platform/native/common/native.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IEditorGroupsService } from "../../editor/common/editorGroupsService.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IFilesConfigurationService } from "../../filesConfiguration/common/filesConfigurationService.js";
import {
	ILifecycleService,
	ShutdownReason,
} from "../../lifecycle/common/lifecycle.js";
import { IWorkingCopy } from "../common/workingCopy.js";
import { IWorkingCopyBackupService } from "../common/workingCopyBackup.js";
import { WorkingCopyBackupTracker } from "../common/workingCopyBackupTracker.js";
import { IWorkingCopyEditorService } from "../common/workingCopyEditorService.js";
import { IWorkingCopyService } from "../common/workingCopyService.js";

export declare class NativeWorkingCopyBackupTracker
	extends WorkingCopyBackupTracker
	implements IWorkbenchContribution
{
	private readonly fileDialogService;
	private readonly dialogService;
	private readonly contextService;
	private readonly nativeHostService;
	private readonly environmentService;
	private readonly progressService;
	static readonly ID = "workbench.contrib.nativeWorkingCopyBackupTracker";
	constructor(
		workingCopyBackupService: IWorkingCopyBackupService,
		filesConfigurationService: IFilesConfigurationService,
		workingCopyService: IWorkingCopyService,
		lifecycleService: ILifecycleService,
		fileDialogService: IFileDialogService,
		dialogService: IDialogService,
		contextService: IWorkspaceContextService,
		nativeHostService: INativeHostService,
		logService: ILogService,
		environmentService: IEnvironmentService,
		progressService: IProgressService,
		workingCopyEditorService: IWorkingCopyEditorService,
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
	);
	protected onFinalBeforeShutdown(reason: ShutdownReason): Promise<boolean>;
	protected onBeforeShutdownWithModified(
		reason: ShutdownReason,
		modifiedWorkingCopies: readonly IWorkingCopy[],
	): Promise<boolean>;
	private handleModifiedBeforeShutdown;
	private shouldBackupBeforeShutdown;
	private showErrorDialog;
	private toForceShutdownLabel;
	private backupBeforeShutdown;
	private confirmBeforeShutdown;
	private doSaveAllBeforeShutdown;
	private doRevertAllBeforeShutdown;
	private onBeforeShutdownWithoutModified;
	private noVeto;
	private discardBackupsBeforeShutdown;
	private withProgressAndCancellation;
}
