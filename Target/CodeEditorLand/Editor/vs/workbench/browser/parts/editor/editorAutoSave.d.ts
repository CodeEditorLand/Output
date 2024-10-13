import { Disposable } from "../../../../base/common/lifecycle.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IMarkerService } from "../../../../platform/markers/common/markers.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { IWorkingCopyService } from "../../../services/workingCopy/common/workingCopyService.js";

export declare class EditorAutoSave
	extends Disposable
	implements IWorkbenchContribution
{
	private readonly filesConfigurationService;
	private readonly hostService;
	private readonly editorService;
	private readonly editorGroupService;
	private readonly workingCopyService;
	private readonly logService;
	private readonly markerService;
	private readonly uriIdentityService;
	static readonly ID = "workbench.contrib.editorAutoSave";
	private readonly scheduledAutoSavesAfterDelay;
	private lastActiveEditor;
	private lastActiveGroupId;
	private readonly lastActiveEditorControlDisposable;
	private readonly waitingOnConditionAutoSaveWorkingCopies;
	private readonly waitingOnConditionAutoSaveEditors;
	constructor(
		filesConfigurationService: IFilesConfigurationService,
		hostService: IHostService,
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
		workingCopyService: IWorkingCopyService,
		logService: ILogService,
		markerService: IMarkerService,
		uriIdentityService: IUriIdentityService,
	);
	private registerListeners;
	private onConditionChanged;
	private onWindowFocusChange;
	private onActiveWindowChange;
	private onDidActiveEditorChange;
	private maybeTriggerAutoSave;
	private onDidChangeAutoSaveConfiguration;
	private saveAllDirtyAutoSaveables;
	private onDidRegister;
	private onDidUnregister;
	private onDidChangeDirty;
	private onDidChangeContent;
	private scheduleAutoSave;
	private discardAutoSave;
}
