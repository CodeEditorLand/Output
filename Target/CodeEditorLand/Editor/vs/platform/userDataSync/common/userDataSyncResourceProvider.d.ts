import { URI } from "../../../base/common/uri.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IEnvironmentService } from "../../environment/common/environment.js";
import { IFileService } from "../../files/common/files.js";
import { IInstantiationService } from "../../instantiation/common/instantiation.js";
import { IStorageService } from "../../storage/common/storage.js";
import { IUriIdentityService } from "../../uriIdentity/common/uriIdentity.js";
import { IUserDataProfilesService } from "../../userDataProfile/common/userDataProfile.js";
import {
	ISyncResourceHandle,
	ISyncUserDataProfile,
	IUserDataSyncLocalStoreService,
	IUserDataSyncLogService,
	IUserDataSyncResource,
	IUserDataSyncResourceProviderService,
	IUserDataSyncStoreService,
	SyncResource,
} from "./userDataSync.js";
import { IUserDataSyncMachine } from "./userDataSyncMachines.js";

export declare class UserDataSyncResourceProviderService
	implements IUserDataSyncResourceProviderService
{
	private readonly userDataSyncStoreService;
	private readonly userDataSyncLocalStoreService;
	protected readonly logService: IUserDataSyncLogService;
	private readonly environmentService;
	private readonly storageService;
	private readonly fileService;
	private readonly userDataProfilesService;
	private readonly configurationService;
	private readonly instantiationService;
	_serviceBrand: any;
	private static readonly NOT_EXISTING_RESOURCE;
	private static readonly REMOTE_BACKUP_AUTHORITY;
	private static readonly LOCAL_BACKUP_AUTHORITY;
	private readonly extUri;
	constructor(
		userDataSyncStoreService: IUserDataSyncStoreService,
		userDataSyncLocalStoreService: IUserDataSyncLocalStoreService,
		logService: IUserDataSyncLogService,
		uriIdentityService: IUriIdentityService,
		environmentService: IEnvironmentService,
		storageService: IStorageService,
		fileService: IFileService,
		userDataProfilesService: IUserDataProfilesService,
		configurationService: IConfigurationService,
		instantiationService: IInstantiationService,
	);
	getRemoteSyncedProfiles(): Promise<ISyncUserDataProfile[]>;
	getLocalSyncedProfiles(location?: URI): Promise<ISyncUserDataProfile[]>;
	getLocalSyncedMachines(location?: URI): Promise<IUserDataSyncMachine[]>;
	getRemoteSyncResourceHandles(
		syncResource: SyncResource,
		profile?: ISyncUserDataProfile,
	): Promise<ISyncResourceHandle[]>;
	getLocalSyncResourceHandles(
		syncResource: SyncResource,
		profile?: ISyncUserDataProfile,
		location?: URI,
	): Promise<ISyncResourceHandle[]>;
	resolveUserDataSyncResource({
		uri,
	}: ISyncResourceHandle): IUserDataSyncResource | undefined;
	getAssociatedResources({ uri }: ISyncResourceHandle): Promise<
		{
			resource: URI;
			comparableResource: URI;
		}[]
	>;
	getMachineId({ uri }: ISyncResourceHandle): Promise<string | undefined>;
	resolveContent(uri: URI): Promise<string | null>;
	private getContentFromStore;
	private resolveNodeContent;
	private resolveLatestContent;
	private getSettingsAssociatedResources;
	private resolveSettingsNodeContent;
	private getKeybindingsAssociatedResources;
	private resolveKeybindingsNodeContent;
	private getTasksAssociatedResources;
	private resolveTasksNodeContent;
	private getSnippetsAssociatedResources;
	private resolveSnippetsNodeContent;
	private getExtensionsAssociatedResources;
	private resolveExtensionsNodeContent;
	private resolveLatestExtensionsContent;
	private getGlobalStateAssociatedResources;
	private resolveGlobalStateNodeContent;
	private resolveLatestGlobalStateContent;
	private getProfilesAssociatedResources;
	private resolveProfileNodeContent;
	private resolveLatestProfilesContent;
	private toUri;
	private resolveUri;
	private parseSyncData;
	private getUserData;
}
