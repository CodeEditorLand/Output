import "./media/activitybarpart.css";
import "./media/activityaction.css";

import { IAction } from "../../../../base/common/actions.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import {
	IWorkbenchLayoutService,
	Parts,
} from "../../../services/layout/browser/layoutService.js";
import { IViewsService } from "../../../services/views/common/viewsService.js";
import { Part } from "../../part.js";
import {
	IPaneCompositeBarOptions,
	PaneCompositeBar,
} from "../paneCompositeBar.js";
import { IPaneCompositePart } from "../paneCompositePart.js";

export declare class ActivitybarPart extends Part {
	private readonly paneCompositePart;
	private readonly instantiationService;
	static readonly ACTION_HEIGHT = 48;
	static readonly pinnedViewContainersKey =
		"workbench.activity.pinnedViewlets2";
	static readonly placeholderViewContainersKey =
		"workbench.activity.placeholderViewlets";
	static readonly viewContainersWorkspaceStateKey =
		"workbench.activity.viewletsWorkspaceState";
	readonly minimumWidth: number;
	readonly maximumWidth: number;
	readonly minimumHeight: number;
	readonly maximumHeight: number;
	private readonly compositeBar;
	private content;
	constructor(
		paneCompositePart: IPaneCompositePart,
		instantiationService: IInstantiationService,
		layoutService: IWorkbenchLayoutService,
		themeService: IThemeService,
		storageService: IStorageService,
	);
	private createCompositeBar;
	protected createContentArea(parent: HTMLElement): HTMLElement;
	getPinnedPaneCompositeIds(): string[];
	getVisiblePaneCompositeIds(): string[];
	focus(): void;
	updateStyles(): void;
	show(focus?: boolean): void;
	hide(): void;
	layout(width: number, height: number): void;
	toJSON(): object;
}
export declare class ActivityBarCompositeBar extends PaneCompositeBar {
	private readonly configurationService;
	private readonly menuService;
	private element;
	private menuBar;
	private menuBarContainer;
	private compositeBarContainer;
	private readonly globalCompositeBar;
	private readonly keyboardNavigationDisposables;
	constructor(
		options: IPaneCompositeBarOptions,
		part: Parts,
		paneCompositePart: IPaneCompositePart,
		showGlobalActivities: boolean,
		instantiationService: IInstantiationService,
		storageService: IStorageService,
		extensionService: IExtensionService,
		viewDescriptorService: IViewDescriptorService,
		viewService: IViewsService,
		contextKeyService: IContextKeyService,
		environmentService: IWorkbenchEnvironmentService,
		configurationService: IConfigurationService,
		menuService: IMenuService,
		layoutService: IWorkbenchLayoutService,
	);
	private fillContextMenuActions;
	private uninstallMenubar;
	private installMenubar;
	private registerKeyboardNavigationListeners;
	create(parent: HTMLElement): HTMLElement;
	layout(width: number, height: number): void;
	getActivityBarContextMenuActions(): IAction[];
}
