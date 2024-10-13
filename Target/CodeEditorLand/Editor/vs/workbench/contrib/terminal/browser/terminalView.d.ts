import { IActionViewItem } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { IBaseActionViewItemOptions } from "../../../../base/browser/ui/actionbar/actionViewItems.js";
import { Action } from "../../../../base/common/actions.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import {
	IViewPaneOptions,
	ViewPane,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import {
	ITerminalProfileResolverService,
	ITerminalProfileService,
} from "../common/terminal.js";
import {
	ITerminalConfigurationService,
	ITerminalGroupService,
	ITerminalService,
} from "./terminal.js";
import { TerminalTabbedView } from "./terminalTabbedView.js";

export declare class TerminalViewPane extends ViewPane {
	private readonly _contextKeyService;
	private readonly _configurationService;
	private readonly _contextMenuService;
	private readonly _instantiationService;
	private readonly _terminalService;
	private readonly _terminalConfigurationService;
	private readonly _terminalGroupService;
	private readonly _notificationService;
	private readonly _keybindingService;
	private readonly _menuService;
	private readonly _terminalProfileService;
	private readonly _terminalProfileResolverService;
	private readonly _themeService;
	private readonly _accessibilityService;
	private _parentDomElement;
	private _terminalTabbedView?;
	get terminalTabbedView(): TerminalTabbedView | undefined;
	private _isInitialized;
	private readonly _newDropdown;
	private readonly _dropdownMenu;
	private readonly _singleTabMenu;
	private _viewShowing;
	private readonly _disposableStore;
	constructor(
		options: IViewPaneOptions,
		keybindingService: IKeybindingService,
		_contextKeyService: IContextKeyService,
		viewDescriptorService: IViewDescriptorService,
		_configurationService: IConfigurationService,
		_contextMenuService: IContextMenuService,
		_instantiationService: IInstantiationService,
		_terminalService: ITerminalService,
		_terminalConfigurationService: ITerminalConfigurationService,
		_terminalGroupService: ITerminalGroupService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		hoverService: IHoverService,
		_notificationService: INotificationService,
		_keybindingService: IKeybindingService,
		openerService: IOpenerService,
		_menuService: IMenuService,
		_terminalProfileService: ITerminalProfileService,
		_terminalProfileResolverService: ITerminalProfileResolverService,
		_themeService: IThemeService,
		_accessibilityService: IAccessibilityService,
	);
	private _updateForShellIntegration;
	private _gutterDecorationsEnabled;
	private _initializeTerminal;
	protected renderBody(container: HTMLElement): void;
	private _createTabsView;
	protected layoutBody(height: number, width: number): void;
	getActionViewItem(
		action: Action,
		options: IBaseActionViewItemOptions,
	): IActionViewItem | undefined;
	/**
	 * Actions might be of type Action (disposable) or Separator or SubmenuAction, which don't extend Disposable
	 */
	private _registerDisposableActions;
	private _getDefaultProfileName;
	private _getKeybindingLabel;
	private _updateTabActionBar;
	focus(): void;
	private _hasWelcomeScreen;
	shouldShowWelcome(): boolean;
}
