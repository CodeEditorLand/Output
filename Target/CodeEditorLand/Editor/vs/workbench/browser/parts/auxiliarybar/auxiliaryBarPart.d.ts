import "./media/auxiliaryBarPart.css";

import { LayoutPriority } from "../../../../base/browser/ui/splitview/splitview.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import { IPaneCompositeBarOptions } from "../paneCompositeBar.js";
import {
	AbstractPaneCompositePart,
	CompositeBarPosition,
} from "../paneCompositePart.js";

export declare class AuxiliaryBarPart extends AbstractPaneCompositePart {
	private commandService;
	private readonly configurationService;
	static readonly activePanelSettingsKey =
		"workbench.auxiliarybar.activepanelid";
	static readonly pinnedPanelsKey = "workbench.auxiliarybar.pinnedPanels";
	static readonly placeholdeViewContainersKey =
		"workbench.auxiliarybar.placeholderPanels";
	static readonly viewContainersWorkspaceStateKey =
		"workbench.auxiliarybar.viewContainersWorkspaceState";
	readonly minimumWidth: number;
	readonly maximumWidth: number;
	readonly minimumHeight: number;
	readonly maximumHeight: number;
	get preferredHeight(): number | undefined;
	get preferredWidth(): number | undefined;
	readonly priority = LayoutPriority.Low;
	constructor(
		notificationService: INotificationService,
		storageService: IStorageService,
		contextMenuService: IContextMenuService,
		layoutService: IWorkbenchLayoutService,
		keybindingService: IKeybindingService,
		hoverService: IHoverService,
		instantiationService: IInstantiationService,
		themeService: IThemeService,
		viewDescriptorService: IViewDescriptorService,
		contextKeyService: IContextKeyService,
		extensionService: IExtensionService,
		commandService: ICommandService,
		menuService: IMenuService,
		configurationService: IConfigurationService,
	);
	private onDidChangeActivityBarLocation;
	updateStyles(): void;
	protected getCompositeBarOptions(): IPaneCompositeBarOptions;
	private fillExtraContextMenuActions;
	protected shouldShowCompositeBar(): boolean;
	protected getCompositeBarPosition(): CompositeBarPosition;
	protected createHeaderArea(): HTMLElement;
	private headerActionViewItemProvider;
	toJSON(): object;
}
