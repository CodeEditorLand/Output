import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import {
	IDialogService,
	IFileDialogService,
} from "../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { ISecretStorageService } from "../../../../platform/secrets/common/secrets.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	IAuthenticationProvider,
	IResourcePreview,
	IUserDataAutoSyncService,
	IUserDataSyncEnablementService,
	IUserDataSyncResource,
	IUserDataSyncService,
	IUserDataSyncStoreManagementService,
} from "../../../../platform/userDataSync/common/userDataSync.js";
import { IUserDataSyncAccountService } from "../../../../platform/userDataSync/common/userDataSyncAccount.js";
import { IUserDataSyncMachinesService } from "../../../../platform/userDataSync/common/userDataSyncMachines.js";
import { IViewDescriptorService } from "../../../common/views.js";
import {
	AuthenticationSession,
	IAuthenticationService,
} from "../../authentication/common/authentication.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { ILifecycleService } from "../../lifecycle/common/lifecycle.js";
import { IUserDataInitializationService } from "../../userData/browser/userDataInit.js";
import { IViewsService } from "../../views/common/viewsService.js";
import {
	AccountStatus,
	IUserDataSyncAccount,
	IUserDataSyncWorkbenchService,
} from "../common/userDataSync.js";

declare class UserDataSyncAccount implements IUserDataSyncAccount {
	readonly authenticationProviderId: string;
	private readonly session;
	constructor(
		authenticationProviderId: string,
		session: AuthenticationSession,
	);
	get sessionId(): string;
	get accountName(): string;
	get accountId(): string;
	get token(): string;
}
type MergeEditorInput = {
	base: URI;
	input1: {
		uri: URI;
	};
	input2: {
		uri: URI;
	};
	result: URI;
};
export declare function isMergeEditorInput(
	editor: unknown,
): editor is MergeEditorInput;
export declare class UserDataSyncWorkbenchService
	extends Disposable
	implements IUserDataSyncWorkbenchService
{
	private readonly userDataSyncService;
	private readonly uriIdentityService;
	private readonly authenticationService;
	private readonly userDataSyncAccountService;
	private readonly quickInputService;
	private readonly storageService;
	private readonly userDataSyncEnablementService;
	private readonly userDataAutoSyncService;
	private readonly telemetryService;
	private readonly logService;
	private readonly productService;
	private readonly extensionService;
	private readonly environmentService;
	private readonly secretStorageService;
	private readonly notificationService;
	private readonly progressService;
	private readonly dialogService;
	private readonly viewsService;
	private readonly viewDescriptorService;
	private readonly userDataSyncStoreManagementService;
	private readonly lifecycleService;
	private readonly instantiationService;
	private readonly editorService;
	private readonly userDataInitializationService;
	private readonly fileService;
	private readonly fileDialogService;
	private readonly userDataSyncMachinesService;
	_serviceBrand: any;
	private static DONOT_USE_WORKBENCH_SESSION_STORAGE_KEY;
	private static CACHED_AUTHENTICATION_PROVIDER_KEY;
	private static CACHED_SESSION_STORAGE_KEY;
	get enabled(): boolean;
	private _authenticationProviders;
	get authenticationProviders(): IAuthenticationProvider[];
	private _accountStatus;
	get accountStatus(): AccountStatus;
	private readonly _onDidChangeAccountStatus;
	readonly onDidChangeAccountStatus: Event<AccountStatus>;
	private readonly _onDidTurnOnSync;
	readonly onDidTurnOnSync: Event<void>;
	private _current;
	get current(): UserDataSyncAccount | undefined;
	private readonly syncEnablementContext;
	private readonly syncStatusContext;
	private readonly accountStatusContext;
	private readonly enableConflictsViewContext;
	private readonly hasConflicts;
	private readonly activityViewsEnablementContext;
	private turnOnSyncCancellationToken;
	constructor(
		userDataSyncService: IUserDataSyncService,
		uriIdentityService: IUriIdentityService,
		authenticationService: IAuthenticationService,
		userDataSyncAccountService: IUserDataSyncAccountService,
		quickInputService: IQuickInputService,
		storageService: IStorageService,
		userDataSyncEnablementService: IUserDataSyncEnablementService,
		userDataAutoSyncService: IUserDataAutoSyncService,
		telemetryService: ITelemetryService,
		logService: ILogService,
		productService: IProductService,
		extensionService: IExtensionService,
		environmentService: IBrowserWorkbenchEnvironmentService,
		secretStorageService: ISecretStorageService,
		notificationService: INotificationService,
		progressService: IProgressService,
		dialogService: IDialogService,
		contextKeyService: IContextKeyService,
		viewsService: IViewsService,
		viewDescriptorService: IViewDescriptorService,
		userDataSyncStoreManagementService: IUserDataSyncStoreManagementService,
		lifecycleService: ILifecycleService,
		instantiationService: IInstantiationService,
		editorService: IEditorService,
		userDataInitializationService: IUserDataInitializationService,
		fileService: IFileService,
		fileDialogService: IFileDialogService,
		userDataSyncMachinesService: IUserDataSyncMachinesService,
	);
	private updateAuthenticationProviders;
	private isSupportedAuthenticationProviderId;
	private waitAndInitialize;
	private initialize;
	private update;
	private updateCurrentAccount;
	private updateToken;
	private updateAccountStatus;
	turnOn(): Promise<void>;
	turnoff(everywhere: boolean): Promise<void>;
	synchroniseUserDataSyncStoreType(): Promise<void>;
	syncNow(): Promise<void>;
	private doTurnOnSync;
	private handleConflictsWhileTurningOn;
	private replace;
	accept(
		resource: IUserDataSyncResource,
		conflictResource: URI,
		content: string | null | undefined,
		apply:
			| boolean
			| {
					force: boolean;
			  },
	): Promise<void>;
	showConflicts(conflictToOpen?: IResourcePreview): Promise<void>;
	resetSyncedData(): Promise<void>;
	getAllLogResources(): Promise<URI[]>;
	showSyncActivity(): Promise<void>;
	downloadSyncActivity(): Promise<URI | undefined>;
	private waitForActiveSyncViews;
	signIn(): Promise<void>;
	private pick;
	private doPick;
	private getAccounts;
	private createQuickpickItems;
	private doSignIn;
	private onDidAuthFailure;
	private onDidChangeSessions;
	private onDidChangeStorage;
	private _cachedCurrentAuthenticationProviderId;
	private get currentAuthenticationProviderId();
	private set currentAuthenticationProviderId(value);
	private _cachedCurrentSessionId;
	private get currentSessionId();
	private set currentSessionId(value);
	private getStoredCachedSessionId;
	private get useWorkbenchSessionId();
	private set useWorkbenchSessionId(value);
}
export {};
