import { URI } from "../../../../base/common/uri.js";
import { IChannel } from "../../../../base/parts/ipc/common/ipc.js";
import {
	DidUninstallExtensionEvent,
	DidUpdateExtensionMetadata,
	IGalleryExtension,
	ILocalExtension,
	InstallExtensionEvent,
	InstallExtensionInfo,
	InstallExtensionResult,
	InstallOptions,
	IProductVersion,
	Metadata,
	UninstallExtensionEvent,
	UninstallExtensionInfo,
	UninstallOptions,
} from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { ExtensionManagementChannelClient as BaseExtensionManagementChannelClient } from "../../../../platform/extensionManagement/common/extensionManagementIpc.js";
import {
	ExtensionIdentifier,
	ExtensionType,
} from "../../../../platform/extensions/common/extensions.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IUserDataProfileService } from "../../userDataProfile/common/userDataProfile.js";
import {
	DidChangeProfileEvent,
	IProfileAwareExtensionManagementService,
} from "./extensionManagement.js";

export declare abstract class ProfileAwareExtensionManagementChannelClient
	extends BaseExtensionManagementChannelClient
	implements IProfileAwareExtensionManagementService
{
	protected readonly userDataProfileService: IUserDataProfileService;
	protected readonly uriIdentityService: IUriIdentityService;
	private readonly _onDidChangeProfile;
	readonly onDidChangeProfile: import("../../../workbench.web.main.internal.js").Event<{
		readonly added: ILocalExtension[];
		readonly removed: ILocalExtension[];
	}>;
	private readonly _onDidProfileAwareInstallExtensions;
	get onProfileAwareDidInstallExtensions(): import("../../../workbench.web.main.internal.js").Event<
		readonly InstallExtensionResult[]
	>;
	private readonly _onDidProfileAwareUninstallExtension;
	get onProfileAwareDidUninstallExtension(): import("../../../workbench.web.main.internal.js").Event<DidUninstallExtensionEvent>;
	private readonly _onDidProfileAwareUpdateExtensionMetadata;
	get onProfileAwareDidUpdateExtensionMetadata(): import("../../../workbench.web.main.internal.js").Event<DidUpdateExtensionMetadata>;
	constructor(
		channel: IChannel,
		userDataProfileService: IUserDataProfileService,
		uriIdentityService: IUriIdentityService,
	);
	protected onInstallExtensionEvent(
		data: InstallExtensionEvent,
	): Promise<void>;
	protected onDidInstallExtensionsEvent(
		results: readonly InstallExtensionResult[],
	): Promise<void>;
	protected onUninstallExtensionEvent(
		data: UninstallExtensionEvent,
	): Promise<void>;
	protected onDidUninstallExtensionEvent(
		data: DidUninstallExtensionEvent,
	): Promise<void>;
	protected onDidUpdateExtensionMetadataEvent(
		data: DidUpdateExtensionMetadata,
	): Promise<void>;
	install(
		vsix: URI,
		installOptions?: InstallOptions,
	): Promise<ILocalExtension>;
	installFromLocation(
		location: URI,
		profileLocation: URI,
	): Promise<ILocalExtension>;
	installFromGallery(
		extension: IGalleryExtension,
		installOptions?: InstallOptions,
	): Promise<ILocalExtension>;
	installGalleryExtensions(
		extensions: InstallExtensionInfo[],
	): Promise<InstallExtensionResult[]>;
	uninstall(
		extension: ILocalExtension,
		options?: UninstallOptions,
	): Promise<void>;
	uninstallExtensions(extensions: UninstallExtensionInfo[]): Promise<void>;
	getInstalled(
		type?: ExtensionType | null,
		extensionsProfileResource?: URI,
		productVersion?: IProductVersion,
	): Promise<ILocalExtension[]>;
	updateMetadata(
		local: ILocalExtension,
		metadata: Partial<Metadata>,
		extensionsProfileResource?: URI,
	): Promise<ILocalExtension>;
	toggleAppliationScope(
		local: ILocalExtension,
		fromProfileLocation: URI,
	): Promise<ILocalExtension>;
	copyExtensions(
		fromProfileLocation: URI,
		toProfileLocation: URI,
	): Promise<void>;
	private whenProfileChanged;
	protected switchExtensionsProfile(
		previousProfileLocation: URI,
		currentProfileLocation: URI,
		preserveExtensions?: ExtensionIdentifier[],
	): Promise<DidChangeProfileEvent>;
	protected getProfileLocation(profileLocation: URI): Promise<URI>;
	protected getProfileLocation(
		profileLocation?: URI,
	): Promise<URI | undefined>;
	protected abstract filterEvent(
		profileLocation: URI,
		isApplicationScoped: boolean,
	): boolean | Promise<boolean>;
}
