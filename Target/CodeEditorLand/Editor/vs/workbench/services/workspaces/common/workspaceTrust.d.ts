import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IRemoteAuthorityResolverService } from "../../../../platform/remote/common/remoteAuthorityResolver.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	IWorkspace,
	IWorkspaceContextService,
	IWorkspaceFolder,
} from "../../../../platform/workspace/common/workspace.js";
import {
	IWorkspaceTrustEnablementService,
	IWorkspaceTrustManagementService,
	IWorkspaceTrustRequestService,
	IWorkspaceTrustTransitionParticipant,
	IWorkspaceTrustUriInfo,
	WorkspaceTrustRequestOptions,
	WorkspaceTrustUriResponse,
} from "../../../../platform/workspace/common/workspaceTrust.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";

export declare const WORKSPACE_TRUST_ENABLED =
	"security.workspace.trust.enabled";
export declare const WORKSPACE_TRUST_STARTUP_PROMPT =
	"security.workspace.trust.startupPrompt";
export declare const WORKSPACE_TRUST_BANNER = "security.workspace.trust.banner";
export declare const WORKSPACE_TRUST_UNTRUSTED_FILES =
	"security.workspace.trust.untrustedFiles";
export declare const WORKSPACE_TRUST_EMPTY_WINDOW =
	"security.workspace.trust.emptyWindow";
export declare const WORKSPACE_TRUST_EXTENSION_SUPPORT =
	"extensions.supportUntrustedWorkspaces";
export declare const WORKSPACE_TRUST_STORAGE_KEY = "content.trust.model.key";
export declare class CanonicalWorkspace implements IWorkspace {
	private readonly originalWorkspace;
	private readonly canonicalFolderUris;
	private readonly canonicalConfiguration;
	constructor(
		originalWorkspace: IWorkspace,
		canonicalFolderUris: URI[],
		canonicalConfiguration: URI | null | undefined,
	);
	get folders(): IWorkspaceFolder[];
	get transient(): boolean | undefined;
	get configuration(): URI | null | undefined;
	get id(): string;
}
export declare class WorkspaceTrustEnablementService
	extends Disposable
	implements IWorkspaceTrustEnablementService
{
	private readonly configurationService;
	private readonly environmentService;
	_serviceBrand: undefined;
	constructor(
		configurationService: IConfigurationService,
		environmentService: IWorkbenchEnvironmentService,
	);
	isWorkspaceTrustEnabled(): boolean;
}
export declare class WorkspaceTrustManagementService
	extends Disposable
	implements IWorkspaceTrustManagementService
{
	private readonly configurationService;
	private readonly remoteAuthorityResolverService;
	private readonly storageService;
	private readonly uriIdentityService;
	private readonly environmentService;
	private readonly workspaceService;
	private readonly workspaceTrustEnablementService;
	private readonly fileService;
	_serviceBrand: undefined;
	private readonly storageKey;
	private readonly _workspaceResolvedPromise;
	private readonly _workspaceResolvedPromiseResolve;
	private readonly _workspaceTrustInitializedPromise;
	private readonly _workspaceTrustInitializedPromiseResolve;
	private readonly _onDidChangeTrust;
	readonly onDidChangeTrust: Event<boolean>;
	private readonly _onDidChangeTrustedFolders;
	readonly onDidChangeTrustedFolders: Event<void>;
	private _canonicalStartupFiles;
	private _canonicalWorkspace;
	private _canonicalUrisResolved;
	private _isTrusted;
	private _trustStateInfo;
	private _remoteAuthority;
	private readonly _storedTrustState;
	private readonly _trustTransitionManager;
	constructor(
		configurationService: IConfigurationService,
		remoteAuthorityResolverService: IRemoteAuthorityResolverService,
		storageService: IStorageService,
		uriIdentityService: IUriIdentityService,
		environmentService: IWorkbenchEnvironmentService,
		workspaceService: IWorkspaceContextService,
		workspaceTrustEnablementService: IWorkspaceTrustEnablementService,
		fileService: IFileService,
	);
	private initializeWorkspaceTrust;
	private registerListeners;
	private getCanonicalUri;
	private resolveCanonicalUris;
	private loadTrustInfo;
	private saveTrustInfo;
	private getWorkspaceUris;
	private calculateWorkspaceTrust;
	private updateWorkspaceTrust;
	private getUrisTrust;
	private doGetUriTrustInfo;
	private doSetUrisTrust;
	private isEmptyWorkspace;
	private isTrustedVirtualResource;
	private isTrustedByRemote;
	private set isTrusted(value);
	get workspaceResolved(): Promise<void>;
	get workspaceTrustInitialized(): Promise<void>;
	get acceptsOutOfWorkspaceFiles(): boolean;
	set acceptsOutOfWorkspaceFiles(value: boolean);
	isWorkspaceTrusted(): boolean;
	isWorkspaceTrustForced(): boolean;
	canSetParentFolderTrust(): boolean;
	setParentFolderTrust(trusted: boolean): Promise<void>;
	canSetWorkspaceTrust(): boolean;
	setWorkspaceTrust(trusted: boolean): Promise<void>;
	getUriTrustInfo(uri: URI): Promise<IWorkspaceTrustUriInfo>;
	setUrisTrust(uris: URI[], trusted: boolean): Promise<void>;
	getTrustedUris(): URI[];
	setTrustedUris(uris: URI[]): Promise<void>;
	addWorkspaceTrustTransitionParticipant(
		participant: IWorkspaceTrustTransitionParticipant,
	): IDisposable;
}
export declare class WorkspaceTrustRequestService
	extends Disposable
	implements IWorkspaceTrustRequestService
{
	private readonly configurationService;
	private readonly workspaceTrustManagementService;
	_serviceBrand: undefined;
	private _openFilesTrustRequestPromise?;
	private _openFilesTrustRequestResolver?;
	private _workspaceTrustRequestPromise?;
	private _workspaceTrustRequestResolver?;
	private readonly _onDidInitiateOpenFilesTrustRequest;
	readonly onDidInitiateOpenFilesTrustRequest: Event<void>;
	private readonly _onDidInitiateWorkspaceTrustRequest;
	readonly onDidInitiateWorkspaceTrustRequest: Event<
		WorkspaceTrustRequestOptions | undefined
	>;
	private readonly _onDidInitiateWorkspaceTrustRequestOnStartup;
	readonly onDidInitiateWorkspaceTrustRequestOnStartup: Event<void>;
	constructor(
		configurationService: IConfigurationService,
		workspaceTrustManagementService: IWorkspaceTrustManagementService,
	);
	private get untrustedFilesSetting();
	private set untrustedFilesSetting(value);
	completeOpenFilesTrustRequest(
		result: WorkspaceTrustUriResponse,
		saveResponse?: boolean,
	): Promise<void>;
	requestOpenFilesTrust(uris: URI[]): Promise<WorkspaceTrustUriResponse>;
	private resolveWorkspaceTrustRequest;
	cancelWorkspaceTrustRequest(): void;
	completeWorkspaceTrustRequest(trusted?: boolean): Promise<void>;
	requestWorkspaceTrust(
		options?: WorkspaceTrustRequestOptions,
	): Promise<boolean | undefined>;
	requestWorkspaceTrustOnStartup(): void;
}
