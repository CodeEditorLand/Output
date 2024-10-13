import { CancellationToken } from "../../../base/common/cancellation.js";
import { IStringDictionary } from "../../../base/common/collections.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IDownloadService } from "../../download/common/download.js";
import { INativeEnvironmentService } from "../../environment/common/environment.js";
import {
	ExtensionType,
	IExtension,
	IExtensionManifest,
	TargetPlatform,
} from "../../extensions/common/extensions.js";
import { IFileService } from "../../files/common/files.js";
import { IInstantiationService } from "../../instantiation/common/instantiation.js";
import { ILogService } from "../../log/common/log.js";
import { IProductService } from "../../product/common/productService.js";
import { ITelemetryService } from "../../telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../userDataProfile/common/userDataProfile.js";
import {
	AbstractExtensionManagementService,
	IInstallExtensionTask,
	InstallExtensionTaskOptions,
	IUninstallExtensionTask,
	UninstallExtensionTaskOptions,
} from "../common/abstractExtensionManagementService.js";
import {
	IExtensionGalleryService,
	IExtensionIdentifier,
	IExtensionManagementService,
	IGalleryExtension,
	ILocalExtension,
	InstallOperation,
	InstallOptions,
	IProductVersion,
	Metadata,
} from "../common/extensionManagement.js";
import { ExtensionKey } from "../common/extensionManagementUtil.js";
import { IExtensionsProfileScannerService } from "../common/extensionsProfileScannerService.js";
import {
	IExtensionsScannerService,
	IScannedExtension,
} from "../common/extensionsScannerService.js";

export declare const INativeServerExtensionManagementService: import("../../instantiation/common/instantiation.js").ServiceIdentifier<INativeServerExtensionManagementService>;
export interface INativeServerExtensionManagementService
	extends IExtensionManagementService {
	readonly _serviceBrand: undefined;
	scanAllUserInstalledExtensions(): Promise<ILocalExtension[]>;
	scanInstalledExtensionAtLocation(
		location: URI,
	): Promise<ILocalExtension | null>;
	markAsUninstalled(...extensions: IExtension[]): Promise<void>;
}
export declare class ExtensionManagementService
	extends AbstractExtensionManagementService
	implements INativeServerExtensionManagementService
{
	private readonly environmentService;
	private readonly extensionsScannerService;
	private readonly extensionsProfileScannerService;
	private downloadService;
	private readonly instantiationService;
	private readonly fileService;
	private readonly configurationService;
	private readonly extensionsScanner;
	private readonly manifestCache;
	private readonly extensionsDownloader;
	private readonly extractingGalleryExtensions;
	constructor(
		galleryService: IExtensionGalleryService,
		telemetryService: ITelemetryService,
		logService: ILogService,
		environmentService: INativeEnvironmentService,
		extensionsScannerService: IExtensionsScannerService,
		extensionsProfileScannerService: IExtensionsProfileScannerService,
		downloadService: IDownloadService,
		instantiationService: IInstantiationService,
		fileService: IFileService,
		configurationService: IConfigurationService,
		productService: IProductService,
		uriIdentityService: IUriIdentityService,
		userDataProfilesService: IUserDataProfilesService,
	);
	private _targetPlatformPromise;
	getTargetPlatform(): Promise<TargetPlatform>;
	zip(extension: ILocalExtension): Promise<URI>;
	getManifest(vsix: URI): Promise<IExtensionManifest>;
	getInstalled(
		type?: ExtensionType,
		profileLocation?: URI,
		productVersion?: IProductVersion,
	): Promise<ILocalExtension[]>;
	scanAllUserInstalledExtensions(): Promise<ILocalExtension[]>;
	scanInstalledExtensionAtLocation(
		location: URI,
	): Promise<ILocalExtension | null>;
	install(vsix: URI, options?: InstallOptions): Promise<ILocalExtension>;
	installFromLocation(
		location: URI,
		profileLocation: URI,
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
	reinstallFromGallery(extension: ILocalExtension): Promise<ILocalExtension>;
	protected copyExtension(
		extension: ILocalExtension,
		fromProfileLocation: URI,
		toProfileLocation: URI,
		metadata: Partial<Metadata>,
	): Promise<ILocalExtension>;
	copyExtensions(
		fromProfileLocation: URI,
		toProfileLocation: URI,
	): Promise<void>;
	markAsUninstalled(...extensions: IExtension[]): Promise<void>;
	cleanUp(): Promise<void>;
	download(
		extension: IGalleryExtension,
		operation: InstallOperation,
		donotVerifySignature: boolean,
	): Promise<URI>;
	private downloadVsix;
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
	private downloadAndExtractGalleryExtension;
	private downloadExtension;
	private extractVSIX;
	private collectFiles;
	private onDidChangeExtensionsFromAnotherSource;
	private readonly knownDirectories;
	private watchForExtensionsNotInstalledBySystem;
	private onDidFilesChange;
	private addExtensionsToProfile;
	private setInstalled;
}
export declare class ExtensionsScanner extends Disposable {
	private readonly beforeRemovingExtension;
	private readonly fileService;
	private readonly extensionsScannerService;
	private readonly extensionsProfileScannerService;
	private readonly uriIdentityService;
	private readonly telemetryService;
	private readonly logService;
	private readonly uninstalledResource;
	private readonly uninstalledFileLimiter;
	private readonly _onExtract;
	readonly onExtract: import("../../../workbench/workbench.web.main.internal.js").Event<URI>;
	private scanAllExtensionPromise;
	private scanUserExtensionsPromise;
	constructor(
		beforeRemovingExtension: (e: ILocalExtension) => Promise<void>,
		fileService: IFileService,
		extensionsScannerService: IExtensionsScannerService,
		extensionsProfileScannerService: IExtensionsProfileScannerService,
		uriIdentityService: IUriIdentityService,
		telemetryService: ITelemetryService,
		logService: ILogService,
	);
	cleanUp(): Promise<void>;
	scanExtensions(
		type: ExtensionType | null,
		profileLocation: URI,
		productVersion: IProductVersion,
	): Promise<ILocalExtension[]>;
	scanAllUserExtensions(excludeOutdated: boolean): Promise<ILocalExtension[]>;
	scanUserExtensionAtLocation(location: URI): Promise<ILocalExtension | null>;
	extractUserExtension(
		extensionKey: ExtensionKey,
		zipPath: string,
		metadata: Metadata,
		removeIfExists: boolean,
		token: CancellationToken,
	): Promise<ILocalExtension>;
	scanMetadata(
		local: ILocalExtension,
		profileLocation?: URI,
	): Promise<Metadata | undefined>;
	private getScannedExtension;
	updateMetadata(
		local: ILocalExtension,
		metadata: Partial<Metadata>,
		profileLocation?: URI,
	): Promise<ILocalExtension>;
	getUninstalledExtensions(): Promise<IStringDictionary<boolean>>;
	setUninstalled(...extensions: IExtension[]): Promise<void>;
	setInstalled(extensionKey: ExtensionKey): Promise<void>;
	removeExtension(
		extension: ILocalExtension | IScannedExtension,
		type: string,
	): Promise<void>;
	removeUninstalledExtension(
		extension: ILocalExtension | IScannedExtension,
	): Promise<void>;
	copyExtension(
		extension: ILocalExtension,
		fromProfileLocation: URI,
		toProfileLocation: URI,
		metadata: Partial<Metadata>,
	): Promise<ILocalExtension>;
	copyExtensions(
		fromProfileLocation: URI,
		toProfileLocation: URI,
		productVersion: IProductVersion,
	): Promise<void>;
	private deleteExtensionFromLocation;
	private withUninstalledExtensions;
	private rename;
	scanLocalExtension(
		location: URI,
		type: ExtensionType,
		profileLocation?: URI,
	): Promise<ILocalExtension>;
	private toLocalExtension;
	private removeUninstalledExtensions;
	private removeTemporarilyDeletedFolders;
}
