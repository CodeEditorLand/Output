import { CancellationToken } from "../../../base/common/cancellation.js";
import { UriComponents } from "../../../base/common/uri.js";
import { IEnvironmentService } from "../../../platform/environment/common/environment.js";
import { IFileService } from "../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../platform/label/common/label.js";
import { INotificationService } from "../../../platform/notification/common/notification.js";
import {
	AuthInfo,
	Credentials,
	IRequestService,
} from "../../../platform/request/common/request.js";
import { ICanonicalUriService } from "../../../platform/workspace/common/canonicalUri.js";
import { IEditSessionIdentityService } from "../../../platform/workspace/common/editSessions.js";
import { IWorkspaceContextService } from "../../../platform/workspace/common/workspace.js";
import {
	IWorkspaceTrustManagementService,
	IWorkspaceTrustRequestService,
	WorkspaceTrustRequestOptions,
} from "../../../platform/workspace/common/workspaceTrust.js";
import { IEditorService } from "../../services/editor/common/editorService.js";
import { IExtHostContext } from "../../services/extensions/common/extHostCustomers.js";
import {
	IFileQueryBuilderOptions,
	ITextQueryBuilderOptions,
} from "../../services/search/common/queryBuilder.js";
import {
	IPatternInfo,
	ISearchService,
} from "../../services/search/common/search.js";
import { IWorkspaceEditingService } from "../../services/workspaces/common/workspaceEditing.js";
import {
	ITextSearchComplete,
	MainThreadWorkspaceShape,
} from "../common/extHost.protocol.js";

export declare class MainThreadWorkspace implements MainThreadWorkspaceShape {
	private readonly _searchService;
	private readonly _contextService;
	private readonly _editSessionIdentityService;
	private readonly _canonicalUriService;
	private readonly _editorService;
	private readonly _workspaceEditingService;
	private readonly _notificationService;
	private readonly _requestService;
	private readonly _instantiationService;
	private readonly _labelService;
	private readonly _environmentService;
	private readonly _workspaceTrustManagementService;
	private readonly _workspaceTrustRequestService;
	private readonly _toDispose;
	private readonly _activeCancelTokens;
	private readonly _proxy;
	private readonly _queryBuilder;
	constructor(
		extHostContext: IExtHostContext,
		_searchService: ISearchService,
		_contextService: IWorkspaceContextService,
		_editSessionIdentityService: IEditSessionIdentityService,
		_canonicalUriService: ICanonicalUriService,
		_editorService: IEditorService,
		_workspaceEditingService: IWorkspaceEditingService,
		_notificationService: INotificationService,
		_requestService: IRequestService,
		_instantiationService: IInstantiationService,
		_labelService: ILabelService,
		_environmentService: IEnvironmentService,
		fileService: IFileService,
		_workspaceTrustManagementService: IWorkspaceTrustManagementService,
		_workspaceTrustRequestService: IWorkspaceTrustRequestService,
	);
	dispose(): void;
	$updateWorkspaceFolders(
		extensionName: string,
		index: number,
		deleteCount: number,
		foldersToAdd: {
			uri: UriComponents;
			name?: string;
		}[],
	): Promise<void>;
	private getStatusMessage;
	private _onDidChangeWorkspace;
	private getWorkspaceData;
	$startFileSearch(
		_includeFolder: UriComponents | null,
		options: IFileQueryBuilderOptions<UriComponents>,
		token: CancellationToken,
	): Promise<UriComponents[] | null>;
	$startTextSearch(
		pattern: IPatternInfo,
		_folder: UriComponents | null,
		options: ITextQueryBuilderOptions<UriComponents>,
		requestId: number,
		token: CancellationToken,
	): Promise<ITextSearchComplete | null>;
	$checkExists(
		folders: readonly UriComponents[],
		includes: string[],
		token: CancellationToken,
	): Promise<boolean>;
	$save(
		uriComponents: UriComponents,
		options: {
			saveAs: boolean;
		},
	): Promise<UriComponents | undefined>;
	private _saveResultToUris;
	$saveAll(includeUntitled?: boolean): Promise<boolean>;
	$resolveProxy(url: string): Promise<string | undefined>;
	$lookupAuthorization(authInfo: AuthInfo): Promise<Credentials | undefined>;
	$lookupKerberosAuthorization(url: string): Promise<string | undefined>;
	$loadCertificates(): Promise<string[]>;
	$requestWorkspaceTrust(
		options?: WorkspaceTrustRequestOptions,
	): Promise<boolean | undefined>;
	private isWorkspaceTrusted;
	private _onDidGrantWorkspaceTrust;
	private registeredEditSessionProviders;
	$registerEditSessionIdentityProvider(handle: number, scheme: string): void;
	$unregisterEditSessionIdentityProvider(handle: number): void;
	private registeredCanonicalUriProviders;
	$registerCanonicalUriProvider(handle: number, scheme: string): void;
	$unregisterCanonicalUriProvider(handle: number): void;
}
