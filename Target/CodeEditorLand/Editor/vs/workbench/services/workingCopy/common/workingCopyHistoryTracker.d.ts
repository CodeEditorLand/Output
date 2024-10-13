import { Disposable } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IUndoRedoService } from "../../../../platform/undoRedo/common/undoRedo.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IPathService } from "../../path/common/pathService.js";
import { IWorkingCopyHistoryService } from "./workingCopyHistory.js";
import { IWorkingCopyService } from "./workingCopyService.js";

export declare class WorkingCopyHistoryTracker
	extends Disposable
	implements IWorkbenchContribution
{
	private readonly workingCopyService;
	private readonly workingCopyHistoryService;
	private readonly uriIdentityService;
	private readonly pathService;
	private readonly configurationService;
	private readonly undoRedoService;
	private readonly contextService;
	private readonly fileService;
	private static readonly SETTINGS;
	private static readonly UNDO_REDO_SAVE_SOURCE;
	private readonly limiter;
	private readonly resourceExcludeMatcher;
	private readonly pendingAddHistoryEntryOperations;
	private readonly workingCopyContentVersion;
	private readonly historyEntryContentVersion;
	constructor(
		workingCopyService: IWorkingCopyService,
		workingCopyHistoryService: IWorkingCopyHistoryService,
		uriIdentityService: IUriIdentityService,
		pathService: IPathService,
		configurationService: IConfigurationService,
		undoRedoService: IUndoRedoService,
		contextService: IWorkspaceContextService,
		fileService: IFileService,
	);
	private registerListeners;
	private onDidRunFileOperation;
	private onDidChangeContent;
	private getContentVersion;
	private onDidSave;
	private resolveSourceFromUndoRedo;
	private shouldTrackHistoryFromSaveEvent;
	private shouldTrackHistoryFromFileOperationEvent;
	private shouldTrackHistory;
}
