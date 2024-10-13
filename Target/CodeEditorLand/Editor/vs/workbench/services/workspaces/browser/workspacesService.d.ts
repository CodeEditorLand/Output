import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import {
	IFolderBackupInfo,
	IWorkspaceBackupInfo,
} from "../../../../platform/backup/common/backup.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	IWorkspaceContextService,
	IWorkspaceIdentifier,
} from "../../../../platform/workspace/common/workspace.js";
import {
	IEnterWorkspaceResult,
	IRecent,
	IRecentlyOpened,
	IWorkspaceFolderCreationData,
	IWorkspacesService,
} from "../../../../platform/workspaces/common/workspaces.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";

export declare class BrowserWorkspacesService
	extends Disposable
	implements IWorkspacesService
{
	private readonly storageService;
	private readonly contextService;
	private readonly logService;
	private readonly fileService;
	private readonly environmentService;
	private readonly uriIdentityService;
	static readonly RECENTLY_OPENED_KEY = "recently.opened";
	readonly _serviceBrand: undefined;
	private readonly _onRecentlyOpenedChange;
	readonly onDidChangeRecentlyOpened: import("../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		storageService: IStorageService,
		contextService: IWorkspaceContextService,
		logService: ILogService,
		fileService: IFileService,
		environmentService: IWorkbenchEnvironmentService,
		uriIdentityService: IUriIdentityService,
	);
	private registerListeners;
	private onDidChangeWorkspaceFolders;
	private addWorkspaceToRecentlyOpened;
	getRecentlyOpened(): Promise<IRecentlyOpened>;
	addRecentlyOpened(recents: IRecent[]): Promise<void>;
	removeRecentlyOpened(paths: URI[]): Promise<void>;
	private doRemoveRecentlyOpened;
	private saveRecentlyOpened;
	clearRecentlyOpened(): Promise<void>;
	enterWorkspace(
		workspaceUri: URI,
	): Promise<IEnterWorkspaceResult | undefined>;
	createUntitledWorkspace(
		folders?: IWorkspaceFolderCreationData[],
		remoteAuthority?: string,
	): Promise<IWorkspaceIdentifier>;
	deleteUntitledWorkspace(workspace: IWorkspaceIdentifier): Promise<void>;
	getWorkspaceIdentifier(workspaceUri: URI): Promise<IWorkspaceIdentifier>;
	getDirtyWorkspaces(): Promise<
		Array<IWorkspaceBackupInfo | IFolderBackupInfo>
	>;
}
