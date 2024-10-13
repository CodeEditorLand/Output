import { IStringDictionary } from "../../../../base/common/collections.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import {
	ConfigurationModel,
	ConfigurationParseOptions,
	UserSettings,
} from "../../../../platform/configuration/common/configurationModels.js";
import { DefaultConfiguration as BaseDefaultConfiguration } from "../../../../platform/configuration/common/configurations.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import {
	IWorkspaceFolder,
	IWorkspaceIdentifier,
	WorkbenchState,
} from "../../../../platform/workspace/common/workspace.js";
import { IStoredWorkspaceFolder } from "../../../../platform/workspaces/common/workspaces.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IRemoteAgentService } from "../../remote/common/remoteAgentService.js";
import { IConfigurationCache } from "../common/configuration.js";
import { IJSONEditingService } from "../common/jsonEditing.js";

export declare class DefaultConfiguration extends BaseDefaultConfiguration {
	private readonly configurationCache;
	static readonly DEFAULT_OVERRIDES_CACHE_EXISTS_KEY =
		"DefaultOverridesCacheExists";
	private readonly configurationRegistry;
	private cachedConfigurationDefaultsOverrides;
	private readonly cacheKey;
	private updateCache;
	constructor(
		configurationCache: IConfigurationCache,
		environmentService: IBrowserWorkbenchEnvironmentService,
		logService: ILogService,
	);
	protected getConfigurationDefaultOverrides(): IStringDictionary<any>;
	initialize(): Promise<ConfigurationModel>;
	reload(): ConfigurationModel;
	hasCachedConfigurationDefaultsOverrides(): boolean;
	private initiaizeCachedConfigurationDefaultsOverridesPromise;
	private initializeCachedConfigurationDefaultsOverrides;
	protected onDidUpdateConfiguration(
		properties: string[],
		defaultsOverrides?: boolean,
	): void;
	private updateCachedConfigurationDefaultsOverrides;
}
export declare class ApplicationConfiguration extends UserSettings {
	private readonly _onDidChangeConfiguration;
	readonly onDidChangeConfiguration: Event<ConfigurationModel>;
	private readonly reloadConfigurationScheduler;
	constructor(
		userDataProfilesService: IUserDataProfilesService,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
		logService: ILogService,
	);
	initialize(): Promise<ConfigurationModel>;
	loadConfiguration(): Promise<ConfigurationModel>;
}
export declare class UserConfiguration extends Disposable {
	private settingsResource;
	private tasksResource;
	private configurationParseOptions;
	private readonly fileService;
	private readonly uriIdentityService;
	private readonly logService;
	private readonly _onDidChangeConfiguration;
	readonly onDidChangeConfiguration: Event<ConfigurationModel>;
	private readonly userConfiguration;
	private readonly userConfigurationChangeDisposable;
	private readonly reloadConfigurationScheduler;
	get hasTasksLoaded(): boolean;
	constructor(
		settingsResource: URI,
		tasksResource: URI | undefined,
		configurationParseOptions: ConfigurationParseOptions,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
		logService: ILogService,
	);
	reset(
		settingsResource: URI,
		tasksResource: URI | undefined,
		configurationParseOptions: ConfigurationParseOptions,
	): Promise<ConfigurationModel>;
	private doReset;
	initialize(): Promise<ConfigurationModel>;
	reload(
		settingsConfiguration?: ConfigurationModel,
	): Promise<ConfigurationModel>;
	reparse(
		parseOptions?: Partial<ConfigurationParseOptions>,
	): ConfigurationModel;
	getRestrictedSettings(): string[];
}
export declare class RemoteUserConfiguration extends Disposable {
	private readonly _cachedConfiguration;
	private readonly _fileService;
	private _userConfiguration;
	private _userConfigurationInitializationPromise;
	private readonly _onDidChangeConfiguration;
	readonly onDidChangeConfiguration: Event<ConfigurationModel>;
	private readonly _onDidInitialize;
	readonly onDidInitialize: Event<ConfigurationModel>;
	constructor(
		remoteAuthority: string,
		configurationCache: IConfigurationCache,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
		remoteAgentService: IRemoteAgentService,
		logService: ILogService,
	);
	initialize(): Promise<ConfigurationModel>;
	reload(): Promise<ConfigurationModel>;
	reparse(): ConfigurationModel;
	getRestrictedSettings(): string[];
	private onDidUserConfigurationChange;
	private updateCache;
}
export declare class WorkspaceConfiguration extends Disposable {
	private readonly configurationCache;
	private readonly fileService;
	private readonly uriIdentityService;
	private readonly logService;
	private readonly _cachedConfiguration;
	private _workspaceConfiguration;
	private readonly _workspaceConfigurationDisposables;
	private _workspaceIdentifier;
	private _isWorkspaceTrusted;
	private readonly _onDidUpdateConfiguration;
	readonly onDidUpdateConfiguration: Event<boolean>;
	private _initialized;
	get initialized(): boolean;
	constructor(
		configurationCache: IConfigurationCache,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
		logService: ILogService,
	);
	initialize(
		workspaceIdentifier: IWorkspaceIdentifier,
		workspaceTrusted: boolean,
	): Promise<void>;
	reload(): Promise<void>;
	getFolders(): IStoredWorkspaceFolder[];
	setFolders(
		folders: IStoredWorkspaceFolder[],
		jsonEditingService: IJSONEditingService,
	): Promise<void>;
	isTransient(): boolean;
	getConfiguration(): ConfigurationModel;
	updateWorkspaceTrust(trusted: boolean): ConfigurationModel;
	reparseWorkspaceSettings(): ConfigurationModel;
	getRestrictedSettings(): string[];
	private waitAndInitialize;
	private doInitialize;
	private isUntrusted;
	private onDidWorkspaceConfigurationChange;
	private updateCache;
}
export declare class FolderConfiguration extends Disposable {
	readonly workspaceFolder: IWorkspaceFolder;
	private readonly workbenchState;
	private workspaceTrusted;
	private readonly configurationCache;
	protected readonly _onDidChange: Emitter<void>;
	readonly onDidChange: Event<void>;
	private folderConfiguration;
	private readonly scopes;
	private readonly configurationFolder;
	private cachedFolderConfiguration;
	constructor(
		useCache: boolean,
		workspaceFolder: IWorkspaceFolder,
		configFolderRelativePath: string,
		workbenchState: WorkbenchState,
		workspaceTrusted: boolean,
		fileService: IFileService,
		uriIdentityService: IUriIdentityService,
		logService: ILogService,
		configurationCache: IConfigurationCache,
	);
	loadConfiguration(): Promise<ConfigurationModel>;
	updateWorkspaceTrust(trusted: boolean): ConfigurationModel;
	reparse(): ConfigurationModel;
	getRestrictedSettings(): string[];
	private isUntrusted;
	private onDidFolderConfigurationChange;
	private createFileServiceBasedConfiguration;
	private updateCache;
}
