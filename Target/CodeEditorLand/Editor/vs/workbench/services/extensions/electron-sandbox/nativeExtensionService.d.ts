import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { ExtensionKind } from "../../../../platform/environment/common/environment.js";
import { IExtensionGalleryService } from "../../../../platform/extensionManagement/common/extensionManagement.js";
import { ExtensionIdentifier } from "../../../../platform/extensions/common/extensions.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INativeHostService } from "../../../../platform/native/common/native.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import {
	IRemoteAuthorityResolverService,
	ResolverResult,
} from "../../../../platform/remote/common/remoteAuthorityResolver.js";
import { IRemoteExtensionsScannerService } from "../../../../platform/remote/common/remoteExtensionsScanner.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspaceTrustManagementService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";
import {
	IWorkbenchExtensionEnablementService,
	IWorkbenchExtensionManagementService,
} from "../../extensionManagement/common/extensionManagement.js";
import { IHostService } from "../../host/browser/host.js";
import { ILifecycleService } from "../../lifecycle/common/lifecycle.js";
import { IRemoteAgentService } from "../../remote/common/remoteAgentService.js";
import { IRemoteExplorerService } from "../../remote/common/remoteExplorerService.js";
import {
	AbstractExtensionService,
	ResolvedExtensions,
} from "../common/abstractExtensionService.js";
import {
	ExtensionHostKind,
	ExtensionRunningPreference,
	IExtensionHostKindPicker,
} from "../common/extensionHostKind.js";
import { IExtensionHostManager } from "../common/extensionHostManagers.js";
import { IExtensionManifestPropertiesService } from "../common/extensionManifestPropertiesService.js";
import { IExtensionService } from "../common/extensions.js";

export declare class NativeExtensionService
	extends AbstractExtensionService
	implements IExtensionService
{
	private readonly _nativeHostService;
	private readonly _hostService;
	private readonly _remoteExplorerService;
	private readonly _extensionGalleryService;
	private readonly _workspaceTrustManagementService;
	private readonly _extensionScanner;
	private readonly _localCrashTracker;
	constructor(
		instantiationService: IInstantiationService,
		notificationService: INotificationService,
		environmentService: IWorkbenchEnvironmentService,
		telemetryService: ITelemetryService,
		extensionEnablementService: IWorkbenchExtensionEnablementService,
		fileService: IFileService,
		productService: IProductService,
		extensionManagementService: IWorkbenchExtensionManagementService,
		contextService: IWorkspaceContextService,
		configurationService: IConfigurationService,
		extensionManifestPropertiesService: IExtensionManifestPropertiesService,
		logService: ILogService,
		remoteAgentService: IRemoteAgentService,
		remoteExtensionsScannerService: IRemoteExtensionsScannerService,
		lifecycleService: ILifecycleService,
		remoteAuthorityResolverService: IRemoteAuthorityResolverService,
		_nativeHostService: INativeHostService,
		_hostService: IHostService,
		_remoteExplorerService: IRemoteExplorerService,
		_extensionGalleryService: IExtensionGalleryService,
		_workspaceTrustManagementService: IWorkspaceTrustManagementService,
		dialogService: IDialogService,
	);
	private _scanAllLocalExtensions;
	protected _onExtensionHostCrashed(
		extensionHost: IExtensionHostManager,
		code: number,
		signal: string | null,
	): void;
	private _sendExtensionHostCrashTelemetry;
	protected _resolveAuthority(
		remoteAuthority: string,
	): Promise<ResolverResult>;
	private _getCanonicalURI;
	protected _resolveExtensions(): Promise<ResolvedExtensions>;
	private _startLocalExtensionHost;
	protected _onExtensionHostExit(code: number): Promise<void>;
	private _handleNoResolverFound;
}
export declare class NativeExtensionHostKindPicker
	implements IExtensionHostKindPicker
{
	private readonly _logService;
	private readonly _hasRemoteExtHost;
	private readonly _hasWebWorkerExtHost;
	constructor(
		environmentService: IWorkbenchEnvironmentService,
		configurationService: IConfigurationService,
		_logService: ILogService,
	);
	pickExtensionHostKind(
		extensionId: ExtensionIdentifier,
		extensionKinds: ExtensionKind[],
		isInstalledLocally: boolean,
		isInstalledRemotely: boolean,
		preference: ExtensionRunningPreference,
	): ExtensionHostKind | null;
	static pickExtensionHostKind(
		extensionKinds: ExtensionKind[],
		isInstalledLocally: boolean,
		isInstalledRemotely: boolean,
		preference: ExtensionRunningPreference,
		hasRemoteExtHost: boolean,
		hasWebWorkerExtHost: boolean,
	): ExtensionHostKind | null;
}
