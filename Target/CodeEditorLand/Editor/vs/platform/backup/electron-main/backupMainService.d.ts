import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { ILogService } from "../../log/common/log.js";
import { IStateService } from "../../state/node/state.js";
import { IFolderBackupInfo, IWorkspaceBackupInfo } from "../common/backup.js";
import { IEmptyWindowBackupInfo } from "../node/backup.js";
import { IBackupMainService } from "./backup.js";

export declare class BackupMainService implements IBackupMainService {
	private readonly environmentMainService;
	private readonly configurationService;
	private readonly logService;
	private readonly stateService;
	readonly _serviceBrand: undefined;
	private static readonly backupWorkspacesMetadataStorageKey;
	protected backupHome: string;
	private workspaces;
	private folders;
	private emptyWindows;
	private readonly backupUriComparer;
	private readonly backupPathComparer;
	constructor(
		environmentMainService: IEnvironmentMainService,
		configurationService: IConfigurationService,
		logService: ILogService,
		stateService: IStateService,
	);
	initialize(): Promise<void>;
	protected getWorkspaceBackups(): IWorkspaceBackupInfo[];
	protected getFolderBackups(): IFolderBackupInfo[];
	isHotExitEnabled(): boolean;
	private isHotExitOnExitAndWindowClose;
	private getHotExitConfig;
	getEmptyWindowBackups(): IEmptyWindowBackupInfo[];
	registerWorkspaceBackup(workspaceInfo: IWorkspaceBackupInfo): string;
	registerWorkspaceBackup(
		workspaceInfo: IWorkspaceBackupInfo,
		migrateFrom: string,
	): Promise<string>;
	private moveBackupFolder;
	registerFolderBackup(folderInfo: IFolderBackupInfo): string;
	registerEmptyWindowBackup(emptyWindowInfo: IEmptyWindowBackupInfo): string;
	private validateWorkspaces;
	private validateFolders;
	private validateEmptyWorkspaces;
	private deleteStaleBackup;
	private prepareNewEmptyWindowBackup;
	private convertToEmptyWindowBackup;
	getDirtyWorkspaces(): Promise<
		Array<IWorkspaceBackupInfo | IFolderBackupInfo>
	>;
	private hasBackups;
	private doHasBackups;
	private storeWorkspacesMetadata;
	protected getFolderHash(folder: IFolderBackupInfo): string;
}
