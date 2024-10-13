import { Disposable } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ExtensionKind } from "../../../../platform/environment/common/environment.js";
import {
	ExtensionUntrustedWorkspaceSupportType,
	ExtensionVirtualWorkspaceSupportType,
	IExtensionIdentifier,
	IExtensionManifest,
} from "../../../../platform/extensions/common/extensions.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IWorkspaceTrustEnablementService } from "../../../../platform/workspace/common/workspaceTrust.js";

export declare const IExtensionManifestPropertiesService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IExtensionManifestPropertiesService>;
export interface IExtensionManifestPropertiesService {
	readonly _serviceBrand: undefined;
	prefersExecuteOnUI(manifest: IExtensionManifest): boolean;
	prefersExecuteOnWorkspace(manifest: IExtensionManifest): boolean;
	prefersExecuteOnWeb(manifest: IExtensionManifest): boolean;
	canExecuteOnUI(manifest: IExtensionManifest): boolean;
	canExecuteOnWorkspace(manifest: IExtensionManifest): boolean;
	canExecuteOnWeb(manifest: IExtensionManifest): boolean;
	getExtensionKind(manifest: IExtensionManifest): ExtensionKind[];
	getUserConfiguredExtensionKind(
		extensionIdentifier: IExtensionIdentifier,
	): ExtensionKind[] | undefined;
	getExtensionUntrustedWorkspaceSupportType(
		manifest: IExtensionManifest,
	): ExtensionUntrustedWorkspaceSupportType;
	getExtensionVirtualWorkspaceSupportType(
		manifest: IExtensionManifest,
	): ExtensionVirtualWorkspaceSupportType;
}
export declare class ExtensionManifestPropertiesService
	extends Disposable
	implements IExtensionManifestPropertiesService
{
	private readonly productService;
	private readonly configurationService;
	private readonly workspaceTrustEnablementService;
	private readonly logService;
	readonly _serviceBrand: undefined;
	private _extensionPointExtensionKindsMap;
	private _productExtensionKindsMap;
	private _configuredExtensionKindsMap;
	private _productVirtualWorkspaceSupportMap;
	private _configuredVirtualWorkspaceSupportMap;
	private readonly _configuredExtensionWorkspaceTrustRequestMap;
	private readonly _productExtensionWorkspaceTrustRequestMap;
	constructor(
		productService: IProductService,
		configurationService: IConfigurationService,
		workspaceTrustEnablementService: IWorkspaceTrustEnablementService,
		logService: ILogService,
	);
	prefersExecuteOnUI(manifest: IExtensionManifest): boolean;
	prefersExecuteOnWorkspace(manifest: IExtensionManifest): boolean;
	prefersExecuteOnWeb(manifest: IExtensionManifest): boolean;
	canExecuteOnUI(manifest: IExtensionManifest): boolean;
	canExecuteOnWorkspace(manifest: IExtensionManifest): boolean;
	canExecuteOnWeb(manifest: IExtensionManifest): boolean;
	getExtensionKind(manifest: IExtensionManifest): ExtensionKind[];
	getUserConfiguredExtensionKind(
		extensionIdentifier: IExtensionIdentifier,
	): ExtensionKind[] | undefined;
	getExtensionUntrustedWorkspaceSupportType(
		manifest: IExtensionManifest,
	): ExtensionUntrustedWorkspaceSupportType;
	getExtensionVirtualWorkspaceSupportType(
		manifest: IExtensionManifest,
	): ExtensionVirtualWorkspaceSupportType;
	private deduceExtensionKind;
	private getSupportedExtensionKindsForExtensionPoint;
	private getConfiguredExtensionKind;
	private getProductExtensionKind;
	private getProductVirtualWorkspaceSupport;
	private getConfiguredVirtualWorkspaceSupport;
	private getConfiguredExtensionWorkspaceTrustRequest;
	private getProductExtensionWorkspaceTrustRequest;
	private toArray;
}
