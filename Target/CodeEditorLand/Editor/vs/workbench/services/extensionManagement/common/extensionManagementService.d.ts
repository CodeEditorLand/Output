import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IDownloadService } from "../../../../platform/download/common/download.js";
import {
	DidUpdateExtensionMetadata,
	IExtensionGalleryService,
	IExtensionIdentifier,
	IExtensionsControlManifest,
	IGalleryExtension,
	ILocalExtension,
	InstallExtensionInfo,
	InstallExtensionResult,
	InstallOperation,
	InstallOptions,
	IProductVersion,
	Metadata,
	UninstallExtensionInfo,
	UninstallOptions,
} from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { IExtensionsScannerService } from "../../../../platform/extensionManagement/common/extensionsScannerService.js";
import {
	ExtensionType,
	IExtensionManifest,
	TargetPlatform,
} from "../../../../platform/extensions/common/extensions.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IUserDataSyncEnablementService } from "../../../../platform/userDataSync/common/userDataSync.js";
import { IWorkspaceTrustRequestService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { IExtensionManifestPropertiesService } from "../../extensions/common/extensionManifestPropertiesService.js";
import { IUserDataProfileService } from "../../userDataProfile/common/userDataProfile.js";
import {
	DidChangeProfileForServerEvent,
	DidUninstallExtensionOnServerEvent,
	IExtensionManagementServer,
	IExtensionManagementServerService,
	InstallExtensionOnServerEvent,
	IResourceExtension,
	IWorkbenchExtensionManagementService,
	UninstallExtensionOnServerEvent,
} from "./extensionManagement.js";

export declare class ExtensionManagementService
	extends Disposable
	implements IWorkbenchExtensionManagementService
{
	protected readonly extensionManagementServerService: IExtensionManagementServerService;
	private readonly extensionGalleryService;
	private readonly userDataProfileService;
	private readonly userDataProfilesService;
	protected readonly configurationService: IConfigurationService;
	protected readonly productService: IProductService;
	protected readonly downloadService: IDownloadService;
	private readonly userDataSyncEnablementService;
	private readonly dialogService;
	private readonly workspaceTrustRequestService;
	private readonly extensionManifestPropertiesService;
	private readonly fileService;
	private readonly logService;
	private readonly instantiationService;
	private readonly extensionsScannerService;
	private readonly telemetryService;
	readonly _serviceBrand: undefined;
	private readonly _onInstallExtension;
	readonly onInstallExtension: Event<InstallExtensionOnServerEvent>;
	private readonly _onDidInstallExtensions;
	readonly onDidInstallExtensions: Event<readonly InstallExtensionResult[]>;
	private readonly _onUninstallExtension;
	readonly onUninstallExtension: Event<UninstallExtensionOnServerEvent>;
	private readonly _onDidUninstallExtension;
	readonly onDidUninstallExtension: Event<DidUninstallExtensionOnServerEvent>;
	readonly onDidUpdateExtensionMetadata: Event<DidUpdateExtensionMetadata>;
	private readonly _onDidProfileAwareInstallExtensions;
	readonly onProfileAwareDidInstallExtensions: Event<
		readonly InstallExtensionResult[]
	>;
	private readonly _onDidProfileAwareUninstallExtension;
	readonly onProfileAwareDidUninstallExtension: Event<DidUninstallExtensionOnServerEvent>;
	readonly onProfileAwareDidUpdateExtensionMetadata: Event<DidUpdateExtensionMetadata>;
	readonly onDidChangeProfile: Event<DidChangeProfileForServerEvent>;
	readonly onDidEnableExtensions: Event<ILocalExtension[]>;
	protected readonly servers: IExtensionManagementServer[];
	private readonly workspaceExtensionManagementService;
	constructor(
		extensionManagementServerService: IExtensionManagementServerService,
		extensionGalleryService: IExtensionGalleryService,
		userDataProfileService: IUserDataProfileService,
		userDataProfilesService: IUserDataProfilesService,
		configurationService: IConfigurationService,
		productService: IProductService,
		downloadService: IDownloadService,
		userDataSyncEnablementService: IUserDataSyncEnablementService,
		dialogService: IDialogService,
		workspaceTrustRequestService: IWorkspaceTrustRequestService,
		extensionManifestPropertiesService: IExtensionManifestPropertiesService,
		fileService: IFileService,
		logService: ILogService,
		instantiationService: IInstantiationService,
		extensionsScannerService: IExtensionsScannerService,
		telemetryService: ITelemetryService,
	);
	getInstalled(
		type?: ExtensionType,
		profileLocation?: URI,
		productVersion?: IProductVersion,
	): Promise<ILocalExtension[]>;
	uninstall(
		extension: ILocalExtension,
		options: UninstallOptions,
	): Promise<void>;
	uninstallExtensions(extensions: UninstallExtensionInfo[]): Promise<void>;
	private uninstallInServer;
	private getDependentsErrorMessage;
	reinstallFromGallery(extension: ILocalExtension): Promise<ILocalExtension>;
	updateMetadata(
		extension: ILocalExtension,
		metadata: Partial<Metadata>,
	): Promise<ILocalExtension>;
	resetPinnedStateForAllUserExtensions(pinned: boolean): Promise<void>;
	zip(extension: ILocalExtension): Promise<URI>;
	download(
		extension: IGalleryExtension,
		operation: InstallOperation,
		donotVerifySignature: boolean,
	): Promise<URI>;
	install(vsix: URI, options?: InstallOptions): Promise<ILocalExtension>;
	installVSIX(
		vsix: URI,
		manifest: IExtensionManifest,
		options?: InstallOptions,
	): Promise<ILocalExtension>;
	private getServersToInstall;
	installFromLocation(location: URI): Promise<ILocalExtension>;
	protected installVSIXInServer(
		vsix: URI,
		server: IExtensionManagementServer,
		options: InstallOptions | undefined,
	): Promise<ILocalExtension>;
	getManifest(vsix: URI): Promise<IExtensionManifest>;
	canInstall(
		extension: IGalleryExtension | IResourceExtension,
	): Promise<boolean>;
	private canInstallGalleryExtension;
	private canInstallResourceExtension;
	updateFromGallery(
		gallery: IGalleryExtension,
		extension: ILocalExtension,
		installOptions?: InstallOptions,
	): Promise<ILocalExtension>;
	installGalleryExtensions(
		extensions: InstallExtensionInfo[],
	): Promise<InstallExtensionResult[]>;
	installFromGallery(
		gallery: IGalleryExtension,
		installOptions?: InstallOptions,
	): Promise<ILocalExtension>;
	getExtensions(locations: URI[]): Promise<IResourceExtension[]>;
	getInstalledWorkspaceExtensionLocations(): URI[];
	getInstalledWorkspaceExtensions(
		includeInvalid: boolean,
	): Promise<ILocalExtension[]>;
	installResourceExtension(
		extension: IResourceExtension,
		installOptions: InstallOptions,
	): Promise<ILocalExtension>;
	private uninstallExtensionFromWorkspace;
	private validateAndGetExtensionManagementServersToInstall;
	private getExtensionManagementServerToInstall;
	private isExtensionsSyncEnabled;
	private hasToFlagExtensionsMachineScoped;
	getExtensionsControlManifest(): Promise<IExtensionsControlManifest>;
	private getServer;
	private getWorkspaceExtensionsServer;
	protected checkForWorkspaceTrust(
		manifest: IExtensionManifest,
		requireTrust: boolean,
	): Promise<void>;
	private checkInstallingExtensionOnWeb;
	private _targetPlatformPromise;
	getTargetPlatform(): Promise<TargetPlatform>;
	cleanUp(): Promise<void>;
	toggleAppliationScope(
		extension: ILocalExtension,
		fromProfileLocation: URI,
	): Promise<ILocalExtension>;
	copyExtensions(from: URI, to: URI): Promise<void>;
	registerParticipant(): void;
	installExtensionsFromProfile(
		extensions: IExtensionIdentifier[],
		fromProfileLocation: URI,
		toProfileLocation: URI,
	): Promise<ILocalExtension[]>;
}
