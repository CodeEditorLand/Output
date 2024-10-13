import { Dimension } from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspaceTrustManagementService } from "../../../../platform/workspace/common/workspaceTrust.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import { IEditorOpenContext } from "../../../common/editor.js";
import { IWorkbenchConfigurationService } from "../../../services/configuration/common/configuration.js";
import { IEditorGroup } from "../../../services/editor/common/editorGroupsService.js";
import { IWorkbenchExtensionEnablementService } from "../../../services/extensionManagement/common/extensionManagement.js";
import { IExtensionManifestPropertiesService } from "../../../services/extensions/common/extensionManifestPropertiesService.js";
import { WorkspaceTrustEditorInput } from "../../../services/workspaces/browser/workspaceTrustEditorInput.js";
import { IExtensionsWorkbenchService } from "../../extensions/common/extensions.js";

export declare const shieldIcon: ThemeIcon;
export declare class WorkspaceTrustEditor extends EditorPane {
	private readonly workspaceService;
	private readonly extensionWorkbenchService;
	private readonly extensionManifestPropertiesService;
	private readonly instantiationService;
	private readonly workspaceTrustManagementService;
	private readonly configurationService;
	private readonly extensionEnablementService;
	private readonly productService;
	private readonly keybindingService;
	static readonly ID: string;
	private rootElement;
	private headerContainer;
	private headerTitleContainer;
	private headerTitleIcon;
	private headerTitleText;
	private headerDescription;
	private bodyScrollBar;
	private affectedFeaturesContainer;
	private trustedContainer;
	private untrustedContainer;
	private configurationContainer;
	private workspaceTrustedUrisTable;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		storageService: IStorageService,
		workspaceService: IWorkspaceContextService,
		extensionWorkbenchService: IExtensionsWorkbenchService,
		extensionManifestPropertiesService: IExtensionManifestPropertiesService,
		instantiationService: IInstantiationService,
		workspaceTrustManagementService: IWorkspaceTrustManagementService,
		configurationService: IWorkbenchConfigurationService,
		extensionEnablementService: IWorkbenchExtensionEnablementService,
		productService: IProductService,
		keybindingService: IKeybindingService,
	);
	protected createEditor(parent: HTMLElement): void;
	focus(): void;
	setInput(
		input: WorkspaceTrustEditorInput,
		options: IEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	private registerListeners;
	private getHeaderContainerClass;
	private getHeaderTitleText;
	private getHeaderTitleIconClassNames;
	private getFeaturesHeaderText;
	private rendering;
	private readonly rerenderDisposables;
	private render;
	private getExtensionCount;
	private createHeaderElement;
	private createConfigurationElement;
	private createAffectedFeaturesElement;
	private renderAffectedFeatures;
	private createButtonRow;
	private addTrustButtonToElement;
	private addDontTrustButtonToElement;
	private addTrustedTextToElement;
	private renderLimitationsHeaderElement;
	private renderLimitationsListElement;
	private layoutParticipants;
	layout(dimension: Dimension): void;
}
