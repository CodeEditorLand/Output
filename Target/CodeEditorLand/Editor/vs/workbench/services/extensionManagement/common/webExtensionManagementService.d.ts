import { Event } from "../../../../base/common/event.js";
import { URI } from "../../../../base/common/uri.js";
import {
	AbstractExtensionManagementService,
	IInstallExtensionTask,
	InstallExtensionTaskOptions,
	IUninstallExtensionTask,
	UninstallExtensionTaskOptions,
} from "../../../../platform/extensionManagement/common/abstractExtensionManagementService.js";
import {
	IExtensionGalleryService,
	IGalleryExtension,
	ILocalExtension,
	InstallOptions,
	IProductVersion,
	Metadata,
} from "../../../../platform/extensionManagement/common/extensionManagement.js";
import {
	ExtensionType,
	IExtensionIdentifier,
	IExtensionManifest,
	TargetPlatform,
} from "../../../../platform/extensions/common/extensions.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IExtensionManifestPropertiesService } from "../../extensions/common/extensionManifestPropertiesService.js";
import { IUserDataProfileService } from "../../userDataProfile/common/userDataProfile.js";
import {
	IProfileAwareExtensionManagementService,
	IWebExtensionsScannerService,
} from "./extensionManagement.js";

export declare class WebExtensionManagementService
	extends AbstractExtensionManagementService
	implements IProfileAwareExtensionManagementService
{
	private readonly webExtensionsScannerService;
	private readonly extensionManifestPropertiesService;
	private readonly userDataProfileService;
	readonly _serviceBrand: undefined;
	private readonly disposables;
	get onProfileAwareInstallExtension(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").InstallExtensionEvent
	>;
	get onInstallExtension(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").InstallExtensionEvent
	>;
	get onProfileAwareDidInstallExtensions(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").InstallExtensionResult[]
	>;
	get onDidInstallExtensions(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").InstallExtensionResult[]
	>;
	get onProfileAwareUninstallExtension(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").UninstallExtensionEvent
	>;
	get onUninstallExtension(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").UninstallExtensionEvent
	>;
	get onProfileAwareDidUninstallExtension(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").DidUninstallExtensionEvent
	>;
	get onDidUninstallExtension(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").DidUninstallExtensionEvent
	>;
	private readonly _onDidChangeProfile;
	readonly onDidChangeProfile: Event<{
		readonly added: ILocalExtension[];
		readonly removed: ILocalExtension[];
	}>;
	get onProfileAwareDidUpdateExtensionMetadata(): Event<
		import("../../../../platform/extensionManagement/common/extensionManagement.js").DidUpdateExtensionMetadata
	>;
	constructor(
		extensionGalleryService: IExtensionGalleryService,
		telemetryService: ITelemetryService,
		logService: ILogService,
		webExtensionsScannerService: IWebExtensionsScannerService,
		extensionManifestPropertiesService: IExtensionManifestPropertiesService,
		userDataProfileService: IUserDataProfileService,
		productService: IProductService,
		userDataProfilesService: IUserDataProfilesService,
		uriIdentityService: IUriIdentityService,
	);
	private filterEvent;
	getTargetPlatform(): Promise<TargetPlatform>;
	canInstall(gallery: IGalleryExtension): Promise<boolean>;
	getInstalled(
		type?: ExtensionType,
		profileLocation?: URI,
	): Promise<ILocalExtension[]>;
	install(location: URI, options?: InstallOptions): Promise<ILocalExtension>;
	installFromLocation(
		location: URI,
		profileLocation: URI,
	): Promise<ILocalExtension>;
	protected copyExtension(
		extension: ILocalExtension,
		fromProfileLocation: URI,
		toProfileLocation: URI,
		metadata: Partial<Metadata>,
	): Promise<ILocalExtension>;
	installExtensionsFromProfile(
		extensions: IExtensionIdentifier[],
		fromProfileLocation: URI,
		toProfileLocation: URI,
	): Promise<ILocalExtension[]>;
	updateMetadata(
		local: ILocalExtension,
		metadata: Partial<Metadata>,
		profileLocation: URI,
	): Promise<ILocalExtension>;
	copyExtensions(
		fromProfileLocation: URI,
		toProfileLocation: URI,
	): Promise<void>;
	protected getCompatibleVersion(
		extension: IGalleryExtension,
		sameVersion: boolean,
		includePreRelease: boolean,
		productVersion: IProductVersion,
	): Promise<IGalleryExtension | null>;
	private isConfiguredToExecuteOnWeb;
	protected getCurrentExtensionsManifestLocation(): URI;
	protected createInstallExtensionTask(
		manifest: IExtensionManifest,
		extension: URI | IGalleryExtension,
		options: InstallExtensionTaskOptions,
	): IInstallExtensionTask;
	protected createUninstallExtensionTask(
		extension: ILocalExtension,
		options: UninstallExtensionTaskOptions,
	): IUninstallExtensionTask;
	zip(extension: ILocalExtension): Promise<URI>;
	getManifest(vsix: URI): Promise<IExtensionManifest>;
	download(): Promise<URI>;
	reinstallFromGallery(): Promise<ILocalExtension>;
	cleanUp(): Promise<void>;
	private whenProfileChanged;
}
