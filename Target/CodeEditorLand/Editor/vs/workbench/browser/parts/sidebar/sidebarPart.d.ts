import "./media/sidebarpart.css";
import "./sidebarActions.js";

import { AnchorAlignment } from "../../../../base/browser/ui/contextview/contextview.js";
import { LayoutPriority } from "../../../../base/browser/ui/grid/grid.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
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
import { ActivityBarCompositeBar } from "../activitybar/activitybarPart.js";
import { IPaneCompositeBarOptions } from "../paneCompositeBar.js";
import {
	AbstractPaneCompositePart,
	CompositeBarPosition,
} from "../paneCompositePart.js";

export declare class SidebarPart extends AbstractPaneCompositePart {
	private readonly configurationService;
	static readonly activeViewletSettingsKey =
		"workbench.sidebar.activeviewletid";
	readonly minimumWidth: number;
	readonly maximumWidth: number;
	readonly minimumHeight: number;
	readonly maximumHeight: number;
	get snap(): boolean;
	readonly priority: LayoutPriority;
	get preferredWidth(): number | undefined;
	private readonly activityBarPart;
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
		configurationService: IConfigurationService,
		menuService: IMenuService,
	);
	private onDidChangeActivityBarLocation;
	updateStyles(): void;
	layout(width: number, height: number, top: number, left: number): void;
	protected getTitleAreaDropDownAnchorAlignment(): AnchorAlignment;
	protected createCompositeBar(): ActivityBarCompositeBar;
	protected getCompositeBarOptions(): IPaneCompositeBarOptions;
	protected shouldShowCompositeBar(): boolean;
	private shouldShowActivityBar;
	protected getCompositeBarPosition(): CompositeBarPosition;
	private rememberActivityBarVisiblePosition;
	private getRememberedActivityBarVisiblePosition;
	getPinnedPaneCompositeIds(): string[];
	getVisiblePaneCompositeIds(): string[];
	focusActivityBar(): Promise<void>;
	private registerActions;
	toJSON(): object;
}
