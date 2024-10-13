import { Disposable } from "../../../base/common/lifecycle.js";
import { IAuxiliaryWindowsMainService } from "../../auxiliaryWindow/electron-main/auxiliaryWindows.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IEnvironmentMainService } from "../../environment/electron-main/environmentMainService.js";
import { ILifecycleMainService } from "../../lifecycle/electron-main/lifecycleMainService.js";
import { ILogService } from "../../log/common/log.js";
import { INativeHostMainService } from "../../native/electron-main/nativeHostMainService.js";
import { IProductService } from "../../product/common/productService.js";
import { IStateService } from "../../state/node/state.js";
import { ITelemetryService } from "../../telemetry/common/telemetry.js";
import { IUpdateService } from "../../update/common/update.js";
import { IWindowsMainService } from "../../windows/electron-main/windows.js";
import { IWorkspacesHistoryMainService } from "../../workspaces/electron-main/workspacesHistoryMainService.js";
import { IMenubarData } from "../common/menubar.js";

export declare class Menubar extends Disposable {
	private readonly updateService;
	private readonly configurationService;
	private readonly windowsMainService;
	private readonly environmentMainService;
	private readonly telemetryService;
	private readonly workspacesHistoryMainService;
	private readonly stateService;
	private readonly lifecycleMainService;
	private readonly logService;
	private readonly nativeHostMainService;
	private readonly productService;
	private readonly auxiliaryWindowsMainService;
	private static readonly lastKnownMenubarStorageKey;
	private willShutdown;
	private appMenuInstalled;
	private closedLastWindow;
	private noActiveMainWindow;
	private menuUpdater;
	private menuGC;
	private oldMenus;
	private menubarMenus;
	private keybindings;
	private readonly fallbackMenuHandlers;
	constructor(
		updateService: IUpdateService,
		configurationService: IConfigurationService,
		windowsMainService: IWindowsMainService,
		environmentMainService: IEnvironmentMainService,
		telemetryService: ITelemetryService,
		workspacesHistoryMainService: IWorkspacesHistoryMainService,
		stateService: IStateService,
		lifecycleMainService: ILifecycleMainService,
		logService: ILogService,
		nativeHostMainService: INativeHostMainService,
		productService: IProductService,
		auxiliaryWindowsMainService: IAuxiliaryWindowsMainService,
	);
	private restoreCachedMenubarData;
	private addFallbackHandlers;
	private registerListeners;
	private get currentEnableMenuBarMnemonics();
	private get currentEnableNativeTabs();
	updateMenu(menubarData: IMenubarData, windowId: number): void;
	private scheduleUpdateMenu;
	private doUpdateMenu;
	private onDidChangeWindowsCount;
	private onDidChangeWindowFocus;
	private install;
	private doSetApplicationMenu;
	private setMacApplicationMenu;
	private confirmBeforeQuit;
	private shouldDrawMenu;
	private setMenu;
	private setMenuById;
	private insertCheckForUpdatesItems;
	private createOpenRecentMenuItem;
	private isOptionClick;
	private isKeyboardEvent;
	private createRoleMenuItem;
	private setMacWindowMenu;
	private getUpdateMenuItems;
	private createMenuItem;
	private makeContextAwareClickHandler;
	private runActionInRenderer;
	private withKeybinding;
	private likeAction;
	private openUrl;
	private reportMenuActionTelemetry;
	private mnemonicLabel;
}
