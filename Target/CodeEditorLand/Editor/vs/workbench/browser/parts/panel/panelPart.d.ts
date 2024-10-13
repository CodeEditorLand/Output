import "./media/panelpart.css";

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

export declare class PanelPart extends AbstractPaneCompositePart {
	private commandService;
	private configurationService;
	readonly minimumWidth: number;
	readonly maximumWidth: number;
	readonly minimumHeight: number;
	readonly maximumHeight: number;
	get preferredHeight(): number | undefined;
	get preferredWidth(): number | undefined;
	static readonly activePanelSettingsKey =
		"workbench.panelpart.activepanelid";
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
	updateStyles(): void;
	protected getCompositeBarOptions(): IPaneCompositeBarOptions;
	private fillExtraContextMenuActions;
	layout(width: number, height: number, top: number, left: number): void;
	protected shouldShowCompositeBar(): boolean;
	protected getCompositeBarPosition(): CompositeBarPosition;
	toJSON(): object;
}
