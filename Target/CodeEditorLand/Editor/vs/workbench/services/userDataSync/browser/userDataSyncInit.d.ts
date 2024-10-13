import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IRequestService } from "../../../../platform/request/common/request.js";
import { ISecretStorageService } from "../../../../platform/secrets/common/secrets.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IUserDataSyncStoreManagementService } from "../../../../platform/userDataSync/common/userDataSync.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IUserDataInitializer } from "../../userData/browser/userDataInit.js";

export declare class UserDataSyncInitializer implements IUserDataInitializer {
	private readonly environmentService;
	private readonly secretStorageService;
	private readonly userDataSyncStoreManagementService;
	private readonly fileService;
	private readonly userDataProfilesService;
	private readonly storageService;
	private readonly productService;
	private readonly requestService;
	private readonly logService;
	private readonly uriIdentityService;
	_serviceBrand: any;
	private readonly initialized;
	private readonly initializationFinished;
	private globalStateUserData;
	constructor(
		environmentService: IBrowserWorkbenchEnvironmentService,
		secretStorageService: ISecretStorageService,
		userDataSyncStoreManagementService: IUserDataSyncStoreManagementService,
		fileService: IFileService,
		userDataProfilesService: IUserDataProfilesService,
		storageService: IStorageService,
		productService: IProductService,
		requestService: IRequestService,
		logService: ILogService,
		uriIdentityService: IUriIdentityService,
	);
	private _userDataSyncStoreClientPromise;
	private createUserDataSyncStoreClient;
	private initializeUserDataSyncStore;
	whenInitializationFinished(): Promise<void>;
	requiresInitialization(): Promise<boolean>;
	initializeRequiredResources(): Promise<void>;
	initializeOtherResources(
		instantiationService: IInstantiationService,
	): Promise<void>;
	private initializeExtensions;
	private initializeInstalledExtensionsPromise;
	initializeInstalledExtensions(
		instantiationService: IInstantiationService,
	): Promise<void>;
	private initializeNewExtensionsPromise;
	private initializeNewExtensions;
	private extensionsPreviewInitializerPromise;
	private getExtensionsPreviewInitializer;
	private initialize;
	private createSyncResourceInitializer;
}
