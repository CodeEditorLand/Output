import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IRequestService } from "../../../../platform/request/common/request.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IUserDataInitializer } from "../../userData/browser/userDataInit.js";
import { IUserDataProfileService } from "../common/userDataProfile.js";

export declare class UserDataProfileInitializer
	implements IUserDataInitializer
{
	private readonly environmentService;
	private readonly fileService;
	private readonly userDataProfileService;
	private readonly storageService;
	private readonly logService;
	private readonly uriIdentityService;
	private readonly requestService;
	_serviceBrand: any;
	private readonly initialized;
	private readonly initializationFinished;
	constructor(
		environmentService: IBrowserWorkbenchEnvironmentService,
		fileService: IFileService,
		userDataProfileService: IUserDataProfileService,
		storageService: IStorageService,
		logService: ILogService,
		uriIdentityService: IUriIdentityService,
		requestService: IRequestService,
	);
	whenInitializationFinished(): Promise<void>;
	requiresInitialization(): Promise<boolean>;
	initializeRequiredResources(): Promise<void>;
	initializeOtherResources(
		instantiationService: IInstantiationService,
	): Promise<void>;
	private initializeInstalledExtensionsPromise;
	initializeInstalledExtensions(
		instantiationService: IInstantiationService,
	): Promise<void>;
	private profileTemplatePromise;
	private getProfileTemplate;
	private doGetProfileTemplate;
	private initialize;
}
