import "./media/menubarControl.css";

import { Dimension } from "../../../../base/browser/dom.js";
import { IAction, Separator } from "../../../../base/common/actions.js";
import { RunOnceScheduler } from "../../../../base/common/async.js";
import { Event } from "../../../../base/common/event.js";
import {
	Disposable,
	DisposableStore,
} from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import {
	IMenu,
	IMenuService,
} from "../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUpdateService } from "../../../../platform/update/common/update.js";
import {
	IRecentlyOpened,
	IWorkspacesService,
} from "../../../../platform/workspaces/common/workspaces.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { IPreferencesService } from "../../../services/preferences/common/preferences.js";

export type IOpenRecentAction = IAction & {
	uri: URI;
	remoteAuthority?: string;
};
export declare abstract class MenubarControl extends Disposable {
	protected readonly menuService: IMenuService;
	protected readonly workspacesService: IWorkspacesService;
	protected readonly contextKeyService: IContextKeyService;
	protected readonly keybindingService: IKeybindingService;
	protected readonly configurationService: IConfigurationService;
	protected readonly labelService: ILabelService;
	protected readonly updateService: IUpdateService;
	protected readonly storageService: IStorageService;
	protected readonly notificationService: INotificationService;
	protected readonly preferencesService: IPreferencesService;
	protected readonly environmentService: IWorkbenchEnvironmentService;
	protected readonly accessibilityService: IAccessibilityService;
	protected readonly hostService: IHostService;
	protected readonly commandService: ICommandService;
	protected keys: string[];
	protected mainMenu: IMenu;
	protected menus: {
		[index: string]: IMenu | undefined;
	};
	protected topLevelTitles: {
		[menu: string]: string;
	};
	protected readonly mainMenuDisposables: DisposableStore;
	protected recentlyOpened: IRecentlyOpened;
	protected menuUpdater: RunOnceScheduler;
	protected static readonly MAX_MENU_RECENT_ENTRIES = 10;
	constructor(
		menuService: IMenuService,
		workspacesService: IWorkspacesService,
		contextKeyService: IContextKeyService,
		keybindingService: IKeybindingService,
		configurationService: IConfigurationService,
		labelService: ILabelService,
		updateService: IUpdateService,
		storageService: IStorageService,
		notificationService: INotificationService,
		preferencesService: IPreferencesService,
		environmentService: IWorkbenchEnvironmentService,
		accessibilityService: IAccessibilityService,
		hostService: IHostService,
		commandService: ICommandService,
	);
	protected abstract doUpdateMenubar(firstTime: boolean): void;
	protected registerListeners(): void;
	protected setupMainMenu(): void;
	protected updateMenubar(): void;
	protected calculateActionLabel(action: {
		id: string;
		label: string;
	}): string;
	protected onUpdateStateChange(): void;
	protected onUpdateKeybindings(): void;
	protected getOpenRecentActions(): (Separator | IOpenRecentAction)[];
	protected onDidChangeWindowFocus(hasFocus: boolean): void;
	private onConfigurationUpdated;
	private get menubarHidden();
	protected onDidChangeRecentlyOpened(): void;
	private createOpenRecentMenuAction;
	private notifyUserOfCustomMenubarAccessibility;
}
export declare class CustomMenubarControl extends MenubarControl {
	private readonly telemetryService;
	private menubar;
	private container;
	private alwaysOnMnemonics;
	private focusInsideMenubar;
	private pendingFirstTimeUpdate;
	private visible;
	private actionRunner;
	private readonly webNavigationMenu;
	private readonly _onVisibilityChange;
	private readonly _onFocusStateChange;
	constructor(
		menuService: IMenuService,
		workspacesService: IWorkspacesService,
		contextKeyService: IContextKeyService,
		keybindingService: IKeybindingService,
		configurationService: IConfigurationService,
		labelService: ILabelService,
		updateService: IUpdateService,
		storageService: IStorageService,
		notificationService: INotificationService,
		preferencesService: IPreferencesService,
		environmentService: IWorkbenchEnvironmentService,
		accessibilityService: IAccessibilityService,
		telemetryService: ITelemetryService,
		hostService: IHostService,
		commandService: ICommandService,
	);
	protected doUpdateMenubar(firstTime: boolean): void;
	private getUpdateAction;
	private get currentMenubarVisibility();
	private get currentDisableMenuBarAltFocus();
	private insertActionsBefore;
	private get currentEnableMenuBarMnemonics();
	private get currentCompactMenuMode();
	private onDidVisibilityChange;
	private toActionsArray;
	private readonly reinstallDisposables;
	private setupCustomMenubar;
	private getWebNavigationActions;
	private getMenuBarOptions;
	protected onDidChangeWindowFocus(hasFocus: boolean): void;
	protected onUpdateStateChange(): void;
	protected onDidChangeRecentlyOpened(): void;
	protected onUpdateKeybindings(): void;
	protected registerListeners(): void;
	get onVisibilityChange(): Event<boolean>;
	get onFocusStateChange(): Event<boolean>;
	getMenubarItemsDimensions(): Dimension;
	create(parent: HTMLElement): HTMLElement;
	layout(dimension: Dimension): void;
	toggleFocus(): void;
}
