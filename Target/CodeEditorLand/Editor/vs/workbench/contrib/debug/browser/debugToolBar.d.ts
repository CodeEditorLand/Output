import { IActionViewItem } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { DisposableStore } from "../../../../base/common/lifecycle.js";
import { ServicesAccessor } from "../../../../editor/browser/editorExtensions.js";
import { IDropdownWithPrimaryActionViewItemOptions } from "../../../../platform/actions/browser/dropdownWithPrimaryActionViewItem.js";
import {
	IMenuService,
	MenuItemAction,
} from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import {
	IThemeService,
	Themable,
} from "../../../../platform/theme/common/themeService.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import { IDebugService } from "../common/debug.js";

import "./media/debugToolBar.css";

export declare class DebugToolBar
	extends Themable
	implements IWorkbenchContribution
{
	private readonly notificationService;
	private readonly telemetryService;
	private readonly debugService;
	private readonly layoutService;
	private readonly storageService;
	private readonly configurationService;
	private readonly instantiationService;
	private $el;
	private dragArea;
	private actionBar;
	private activeActions;
	private updateScheduler;
	private debugToolBarMenu;
	private isVisible;
	private isBuilt;
	private readonly stopActionViewItemDisposables;
	/** coordinate of the debug toolbar per aux window */
	private readonly auxWindowCoordinates;
	private readonly trackPixelRatioListener;
	constructor(
		notificationService: INotificationService,
		telemetryService: ITelemetryService,
		debugService: IDebugService,
		layoutService: IWorkbenchLayoutService,
		storageService: IStorageService,
		configurationService: IConfigurationService,
		themeService: IThemeService,
		instantiationService: IInstantiationService,
		menuService: IMenuService,
		contextKeyService: IContextKeyService,
	);
	private registerListeners;
	private getCurrentXPercent;
	private getCurrentYPosition;
	private storePosition;
	updateStyles(): void;
	/** Gets the stored X position of the middle of the toolbar based on the current window width */
	private getStoredXPosition;
	private getStoredYPosition;
	private setCoordinates;
	private get yDefault();
	private _yRange;
	private get yRange();
	private show;
	private doShowInActiveContainer;
	private hide;
	dispose(): void;
}
export declare function createDisconnectMenuItemAction(
	action: MenuItemAction,
	disposables: DisposableStore,
	accessor: ServicesAccessor,
	options: IDropdownWithPrimaryActionViewItemOptions,
): IActionViewItem | undefined;
