import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IPager } from "../../../../base/common/paging.js";
import { URI } from "../../../../base/common/uri.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import {
	IDeprecationInfo,
	IExtensionGalleryService,
	IExtensionInfo,
	IExtensionQueryOptions,
	IExtensionsControlManifest,
	IGalleryExtension,
	ILocalExtension,
	InstallExtensionResult,
	IQueryOptions,
} from "../../../../platform/extensionManagement/common/extensionManagement.js";
import {
	ExtensionType,
	IExtensionIdentifier,
	IExtensionManifest,
} from "../../../../platform/extensions/common/extensions.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import {
	IProgressService,
	ProgressLocation,
} from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUpdateService } from "../../../../platform/update/common/update.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	IOpenURLOptions,
	IURLHandler,
	IURLService,
} from "../../../../platform/url/common/url.js";
import { IIgnoredExtensionsManagementService } from "../../../../platform/userDataSync/common/ignoredExtensions.js";
import {
	IUserDataAutoSyncService,
	IUserDataSyncEnablementService,
} from "../../../../platform/userDataSync/common/userDataSync.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import {
	EnablementState,
	IExtensionManagementServer,
	IExtensionManagementServerService,
	IResourceExtension,
	IWorkbenchExtensionEnablementService,
	IWorkbenchExtensionManagementService,
} from "../../../services/extensionManagement/common/extensionManagement.js";
import { IExtensionManifestPropertiesService } from "../../../services/extensions/common/extensionManifestPropertiesService.js";
import {
	IExtensionsStatus as IExtensionRuntimeStatus,
	IExtensionService,
} from "../../../services/extensions/common/extensions.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { ILifecycleService } from "../../../services/lifecycle/common/lifecycle.js";
import { ILocaleService } from "../../../services/localization/common/locale.js";
import { IUserDataProfileService } from "../../../services/userDataProfile/common/userDataProfile.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import {
	AutoUpdateConfigurationValue,
	ExtensionRuntimeState,
	ExtensionState,
	IExtension,
	IExtensionsNotification,
	IExtensionsWorkbenchService,
	InstallExtensionOptions,
} from "../common/extensions.js";
import { IExtensionEditorOptions } from "../common/extensionsInput.js";

interface IExtensionStateProvider<T> {
	(extension: Extension): T;
}
export declare class Extension implements IExtension {
	private stateProvider;
	private runtimeStateProvider;
	readonly server: IExtensionManagementServer | undefined;
	local: ILocalExtension | undefined;
	private _gallery;
	private readonly resourceExtensionInfo;
	private readonly galleryService;
	private readonly telemetryService;
	private readonly logService;
	private readonly fileService;
	private readonly productService;
	enablementState: EnablementState;
	private galleryResourcesCache;
	constructor(
		stateProvider: IExtensionStateProvider<ExtensionState>,
		runtimeStateProvider: IExtensionStateProvider<
			ExtensionRuntimeState | undefined
		>,
		server: IExtensionManagementServer | undefined,
		local: ILocalExtension | undefined,
		_gallery: IGalleryExtension | undefined,
		resourceExtensionInfo:
			| {
					resourceExtension: IResourceExtension;
					isWorkspaceScoped: boolean;
			  }
			| undefined,
		galleryService: IExtensionGalleryService,
		telemetryService: ITelemetryService,
		logService: ILogService,
		fileService: IFileService,
		productService: IProductService,
	);
	get resourceExtension(): IResourceExtension | undefined;
	get gallery(): IGalleryExtension | undefined;
	set gallery(gallery: IGalleryExtension | undefined);
	get type(): ExtensionType;
	get isBuiltin(): boolean;
	get isWorkspaceScoped(): boolean;
	get name(): string;
	get displayName(): string;
	get identifier(): IExtensionIdentifier;
	get uuid(): string | undefined;
	get publisher(): string;
	get publisherDisplayName(): string;
	get publisherUrl(): URI | undefined;
	get publisherDomain():
		| {
				link: string;
				verified: boolean;
		  }
		| undefined;
	get publisherSponsorLink(): URI | undefined;
	get version(): string;
	get pinned(): boolean;
	get latestVersion(): string;
	get description(): string;
	get url(): string | undefined;
	get iconUrl(): string;
	get iconUrlFallback(): string;
	private get localIconUrl();
	private get resourceExtensionIconUrl();
	private get galleryIconUrl();
	private get galleryIconUrlFallback();
	private get defaultIconUrl();
	get repository(): string | undefined;
	get licenseUrl(): string | undefined;
	get supportUrl(): string | undefined;
	get state(): ExtensionState;
	isMalicious: boolean;
	deprecationInfo: IDeprecationInfo | undefined;
	get installCount(): number | undefined;
	get rating(): number | undefined;
	get ratingCount(): number | undefined;
	get outdated(): boolean;
	get outdatedTargetPlatform(): boolean;
	get runtimeState(): ExtensionRuntimeState | undefined;
	get telemetryData(): any;
	get preview(): boolean;
	get preRelease(): boolean;
	get isPreReleaseVersion(): boolean;
	private _extensionEnabledWithPreRelease;
	get hasPreReleaseVersion(): boolean;
	get hasReleaseVersion(): boolean;
	private getLocal;
	getManifest(token: CancellationToken): Promise<IExtensionManifest | null>;
	getGalleryManifest(
		token?: CancellationToken,
	): Promise<IExtensionManifest | null>;
	hasReadme(): boolean;
	getReadme(token: CancellationToken): Promise<string>;
	hasChangelog(): boolean;
	getChangelog(token: CancellationToken): Promise<string>;
	get categories(): readonly string[];
	get tags(): readonly string[];
	get dependencies(): string[];
	get extensionPack(): string[];
	setExtensionsControlManifest(
		extensionsControlManifest: IExtensionsControlManifest,
	): void;
	private getManifestFromLocalOrResource;
}
export declare class ExtensionsWorkbenchService
	extends Disposable
	implements IExtensionsWorkbenchService, IURLHandler
{
	private readonly instantiationService;
	private readonly editorService;
	private readonly extensionManagementService;
	private readonly galleryService;
	private readonly configurationService;
	private readonly telemetryService;
	private readonly notificationService;
	private readonly extensionEnablementService;
	private readonly hostService;
	private readonly progressService;
	private readonly extensionManagementServerService;
	private readonly languageService;
	private readonly extensionsSyncManagementService;
	private readonly userDataAutoSyncService;
	private readonly productService;
	private readonly extensionManifestPropertiesService;
	private readonly logService;
	private readonly extensionService;
	private readonly localeService;
	private readonly lifecycleService;
	private readonly fileService;
	private readonly userDataProfileService;
	private readonly storageService;
	private readonly dialogService;
	private readonly userDataSyncEnablementService;
	private readonly updateService;
	private readonly uriIdentityService;
	private readonly workspaceContextService;
	private readonly viewsService;
	private static readonly UpdatesCheckInterval;
	readonly _serviceBrand: undefined;
	private hasOutdatedExtensionsContextKey;
	private readonly localExtensions;
	private readonly remoteExtensions;
	private readonly webExtensions;
	private readonly extensionsServers;
	private updatesCheckDelayer;
	private autoUpdateDelayer;
	private readonly _onChange;
	get onChange(): Event<IExtension | undefined>;
	private extensionsNotification;
	private readonly _onDidChangeExtensionsNotification;
	readonly onDidChangeExtensionsNotification: Event<
		IExtensionsNotification | undefined
	>;
	private readonly _onReset;
	get onReset(): Event<void>;
	readonly preferPreReleases: boolean;
	private installing;
	private tasksInProgress;
	readonly whenInitialized: Promise<void>;
	constructor(
		instantiationService: IInstantiationService,
		editorService: IEditorService,
		extensionManagementService: IWorkbenchExtensionManagementService,
		galleryService: IExtensionGalleryService,
		configurationService: IConfigurationService,
		telemetryService: ITelemetryService,
		notificationService: INotificationService,
		urlService: IURLService,
		extensionEnablementService: IWorkbenchExtensionEnablementService,
		hostService: IHostService,
		progressService: IProgressService,
		extensionManagementServerService: IExtensionManagementServerService,
		languageService: ILanguageService,
		extensionsSyncManagementService: IIgnoredExtensionsManagementService,
		userDataAutoSyncService: IUserDataAutoSyncService,
		productService: IProductService,
		contextKeyService: IContextKeyService,
		extensionManifestPropertiesService: IExtensionManifestPropertiesService,
		logService: ILogService,
		extensionService: IExtensionService,
		localeService: ILocaleService,
		lifecycleService: ILifecycleService,
		fileService: IFileService,
		userDataProfileService: IUserDataProfileService,
		storageService: IStorageService,
		dialogService: IDialogService,
		userDataSyncEnablementService: IUserDataSyncEnablementService,
		updateService: IUpdateService,
		uriIdentityService: IUriIdentityService,
		workspaceContextService: IWorkspaceContextService,
		viewsService: IViewsService,
	);
	private registerAutoRestartConfig;
	private initialize;
	private initializeAutoUpdate;
	private isAutoUpdateEnabled;
	getAutoUpdateValue(): AutoUpdateConfigurationValue;
	updateAutoUpdateForAllExtensions(
		isAutoUpdateEnabled: boolean,
	): Promise<void>;
	private readonly autoRestartListenerDisposable;
	private registerAutoRestartListener;
	private reportInstalledExtensionsTelemetry;
	private onDidChangeRunningExtensions;
	private updateExtensionsPinnedState;
	private reset;
	private onDidChangeExtensions;
	private _local;
	get local(): IExtension[];
	private _installed;
	get installed(): IExtension[];
	get outdated(): IExtension[];
	queryLocal(server?: IExtensionManagementServer): Promise<IExtension[]>;
	queryGallery(token: CancellationToken): Promise<IPager<IExtension>>;
	queryGallery(
		options: IQueryOptions,
		token: CancellationToken,
	): Promise<IPager<IExtension>>;
	getExtensions(
		extensionInfos: IExtensionInfo[],
		token: CancellationToken,
	): Promise<IExtension[]>;
	getExtensions(
		extensionInfos: IExtensionInfo[],
		options: IExtensionQueryOptions,
		token: CancellationToken,
	): Promise<IExtension[]>;
	getResourceExtensions(
		locations: URI[],
		isWorkspaceScoped: boolean,
	): Promise<IExtension[]>;
	private onDidDismissedNotificationsValueChange;
	private updateExtensionsNotificaiton;
	private computeExtensionsNotifications;
	getExtensionsNotification(): IExtensionsNotification | undefined;
	private resolveQueryText;
	private fromGallery;
	private getInstalledExtensionMatchingGallery;
	private getInstalledExtensionMatchingLocation;
	open(
		extension: IExtension | string,
		options?: IExtensionEditorOptions,
	): Promise<void>;
	openSearch(searchValue: string, preserveFoucs?: boolean): Promise<void>;
	getExtensionRuntimeStatus(
		extension: IExtension,
	): IExtensionRuntimeStatus | undefined;
	updateRunningExtensions(auto?: boolean): Promise<void>;
	private getRuntimeState;
	private getPrimaryExtension;
	private getExtensionState;
	checkForUpdates(onlyBuiltin?: boolean): Promise<void>;
	updateAll(): Promise<InstallExtensionResult[]>;
	private syncInstalledExtensionsWithGallery;
	private isAutoCheckUpdatesEnabled;
	private eventuallyCheckForUpdates;
	private getUpdatesCheckInterval;
	private eventuallyAutoUpdateExtensions;
	private autoUpdateBuiltinExtensions;
	private syncPinnedBuiltinExtensions;
	private autoUpdateExtensions;
	private getProductVersion;
	private getProductCurrentVersion;
	private getProductUpdateVersion;
	private shouldAutoUpdateExtension;
	shouldRequireConsentToUpdate(
		extension: IExtension,
	): Promise<string | undefined>;
	isAutoUpdateEnabledFor(extensionOrPublisher: IExtension | string): boolean;
	private isAutoUpdateEnabledForPublisher;
	updateAutoUpdateEnablementFor(
		extensionOrPublisher: IExtension | string,
		enable: boolean,
	): Promise<void>;
	private onDidSelectedExtensionToAutoUpdateValueChange;
	canInstall(extension: IExtension): Promise<boolean>;
	install(
		arg: string | URI | IExtension,
		installOptions?: InstallExtensionOptions,
		progressLocation?: ProgressLocation,
	): Promise<IExtension>;
	installInServer(
		extension: IExtension,
		server: IExtensionManagementServer,
	): Promise<void>;
	canSetLanguage(extension: IExtension): boolean;
	setLanguage(extension: IExtension): Promise<void>;
	setEnablement(
		extensions: IExtension | IExtension[],
		enablementState: EnablementState,
	): Promise<void>;
	uninstall(e: IExtension): Promise<void>;
	private getAllPackExtensionsToUninstall;
	private getErrorMessageForUninstallingAnExtensionWithDependents;
	reinstall(extension: IExtension): Promise<IExtension>;
	isExtensionIgnoredToSync(extension: IExtension): boolean;
	togglePreRelease(extension: IExtension): Promise<void>;
	toggleExtensionIgnoredToSync(extension: IExtension): Promise<void>;
	toggleApplyExtensionToAllProfiles(extension: IExtension): Promise<void>;
	private getAllExtensions;
	private isInstalledExtensionSynced;
	updateSynchronizingInstalledExtension(
		extension: ILocalExtension,
		sync: boolean,
	): Promise<ILocalExtension>;
	private doInstall;
	private installFromVSIX;
	private installFromGallery;
	private waitAndGetInstalledExtension;
	private waitUntilExtensionIsEnabled;
	private promptAndSetEnablement;
	private checkAndSetEnablement;
	private getExtensionsRecursively;
	private getDependentsAfterDisablement;
	private getDependentsErrorMessageForDisablement;
	private getErrorMessageForDisablingAnExtensionWithDependents;
	private doSetEnablement;
	private _activityCallBack;
	private reportProgressFromOtherSources;
	private withProgress;
	private onError;
	handleURL(uri: URI, options?: IOpenURLOptions): Promise<boolean>;
	private onOpenExtensionUrl;
	private getPublishersToAutoUpdate;
	getEnabledAutoUpdateExtensions(): string[];
	private setEnabledAutoUpdateExtensions;
	private _enabledAutoUpdateExtensionsValue;
	private get enabledAuotUpdateExtensionsValue();
	private set enabledAuotUpdateExtensionsValue(value);
	private getEnabledAutoUpdateExtensionsValue;
	private setEnabledAutoUpdateExtensionsValue;
	getDisabledAutoUpdateExtensions(): string[];
	private setDisabledAutoUpdateExtensions;
	private _disabledAutoUpdateExtensionsValue;
	private get disabledAutoUpdateExtensionsValue();
	private set disabledAutoUpdateExtensionsValue(value);
	private getDisabledAutoUpdateExtensionsValue;
	private setDisabledAutoUpdateExtensionsValue;
	private getDismissedNotifications;
	private setDismissedNotifications;
	private _dismissedNotificationsValue;
	private get dismissedNotificationsValue();
	private set dismissedNotificationsValue(value);
	private getDismissedNotificationsValue;
	private setDismissedNotificationsValue;
}
export {};
