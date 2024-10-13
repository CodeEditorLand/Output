import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import {
	IExtensionGalleryService,
	IGalleryExtension,
	Metadata,
} from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { IExtensionStorageService } from "../../../../platform/extensionManagement/common/extensionStorage.js";
import { IExtensionResourceLoaderService } from "../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";
import {
	ExtensionType,
	IBuiltinExtensionsScannerService,
	IExtension,
	IExtensionManifest,
} from "../../../../platform/extensions/common/extensions.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IExtensionManifestPropertiesService } from "../../extensions/common/extensionManifestPropertiesService.js";
import { ILifecycleService } from "../../lifecycle/common/lifecycle.js";
import {
	IScannedExtension,
	IWebExtensionsScannerService,
	ScanOptions,
} from "../common/extensionManagement.js";

export declare class WebExtensionsScannerService
	extends Disposable
	implements IWebExtensionsScannerService
{
	private readonly environmentService;
	private readonly builtinExtensionsScannerService;
	private readonly fileService;
	private readonly logService;
	private readonly galleryService;
	private readonly extensionManifestPropertiesService;
	private readonly extensionResourceLoaderService;
	private readonly extensionStorageService;
	private readonly storageService;
	private readonly productService;
	private readonly userDataProfilesService;
	private readonly uriIdentityService;
	readonly _serviceBrand: undefined;
	private readonly systemExtensionsCacheResource;
	private readonly customBuiltinExtensionsCacheResource;
	private readonly resourcesAccessQueueMap;
	private readonly extensionsEnabledWithApiProposalVersion;
	constructor(
		environmentService: IBrowserWorkbenchEnvironmentService,
		builtinExtensionsScannerService: IBuiltinExtensionsScannerService,
		fileService: IFileService,
		logService: ILogService,
		galleryService: IExtensionGalleryService,
		extensionManifestPropertiesService: IExtensionManifestPropertiesService,
		extensionResourceLoaderService: IExtensionResourceLoaderService,
		extensionStorageService: IExtensionStorageService,
		storageService: IStorageService,
		productService: IProductService,
		userDataProfilesService: IUserDataProfilesService,
		uriIdentityService: IUriIdentityService,
		lifecycleService: ILifecycleService,
	);
	private _customBuiltinExtensionsInfoPromise;
	private readCustomBuiltinExtensionsInfoFromEnv;
	private checkAdditionalBuiltinExtensions;
	/**
	 * All system extensions bundled with the product
	 */
	private readSystemExtensions;
	/**
	 * All extensions defined via `additionalBuiltinExtensions` API
	 */
	private readCustomBuiltinExtensions;
	private getCustomBuiltinExtensionsFromLocations;
	private getCustomBuiltinExtensionsFromGallery;
	private getCustomBuiltinExtensionsFromCache;
	private _migrateExtensionsStoragePromise;
	private migrateExtensionsStorage;
	private updateCaches;
	private updateSystemExtensionsCache;
	private _updateCustomBuiltinExtensionsCachePromise;
	private updateCustomBuiltinExtensionsCache;
	private resolveBuiltinExtensionGalleryResources;
	private resolveBuiltinGalleryExtensions;
	private resolveDependenciesAndPackedExtensions;
	private getExtensionsWithDependenciesAndPackedExtensions;
	scanSystemExtensions(): Promise<IExtension[]>;
	scanUserExtensions(
		profileLocation: URI,
		scanOptions?: ScanOptions,
	): Promise<IScannedExtension[]>;
	scanExtensionsUnderDevelopment(): Promise<IExtension[]>;
	scanExistingExtension(
		extensionLocation: URI,
		extensionType: ExtensionType,
		profileLocation: URI,
	): Promise<IScannedExtension | null>;
	scanExtensionManifest(
		extensionLocation: URI,
	): Promise<IExtensionManifest | null>;
	addExtensionFromGallery(
		galleryExtension: IGalleryExtension,
		metadata: Metadata,
		profileLocation: URI,
	): Promise<IScannedExtension>;
	addExtension(
		location: URI,
		metadata: Metadata,
		profileLocation: URI,
	): Promise<IScannedExtension>;
	removeExtension(
		extension: IScannedExtension,
		profileLocation: URI,
	): Promise<void>;
	updateMetadata(
		extension: IScannedExtension,
		metadata: Partial<Metadata>,
		profileLocation: URI,
	): Promise<IScannedExtension>;
	copyExtensions(
		fromProfileLocation: URI,
		toProfileLocation: URI,
		filter: (extension: IScannedExtension) => boolean,
	): Promise<void>;
	private addWebExtension;
	private addToInstalledExtensions;
	private scanInstalledExtensions;
	private toWebExtensionFromGallery;
	private toWebExtensionFromExtensionGalleryResource;
	private getPackageNLSResourceMapFromResources;
	private toWebExtension;
	private toScannedExtension;
	private listExtensionResources;
	private translateManifest;
	private getExtensionManifest;
	private getTranslations;
	private readInstalledExtensions;
	private writeInstalledExtensions;
	private readCustomBuiltinExtensionsCache;
	private writeCustomBuiltinExtensionsCache;
	private readSystemExtensionsCache;
	private writeSystemExtensionsCache;
	private withWebExtensions;
	private migrateWebExtensions;
	private storeWebExtensions;
	private getResourceAccessQueue;
}
