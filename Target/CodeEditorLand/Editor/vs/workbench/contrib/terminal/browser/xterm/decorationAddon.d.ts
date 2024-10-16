import type { IDecoration, ITerminalAddon, Terminal } from "@xterm/xterm";

import { Disposable } from "../../../../../base/common/lifecycle.js";
import { IAccessibilitySignalService } from "../../../../../platform/accessibilitySignal/browser/accessibilitySignalService.js";
import { IClipboardService } from "../../../../../platform/clipboard/common/clipboardService.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IContextMenuService } from "../../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { INotificationService } from "../../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../../platform/opener/common/opener.js";
import { IQuickInputService } from "../../../../../platform/quickinput/common/quickInput.js";
import {
	IMarkProperties,
	ITerminalCapabilityStore,
	ITerminalCommand,
} from "../../../../../platform/terminal/common/capabilities/capabilities.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import { ILifecycleService } from "../../../../services/lifecycle/common/lifecycle.js";

export declare class DecorationAddon
	extends Disposable
	implements ITerminalAddon
{
	private readonly _capabilities;
	private readonly _clipboardService;
	private readonly _contextMenuService;
	private readonly _configurationService;
	private readonly _themeService;
	private readonly _openerService;
	private readonly _quickInputService;
	private readonly _commandService;
	private readonly _accessibilitySignalService;
	private readonly _notificationService;
	protected _terminal: Terminal | undefined;
	private _capabilityDisposables;
	private _decorations;
	private _placeholderDecoration;
	private _showGutterDecorations?;
	private _showOverviewRulerDecorations?;
	private _terminalDecorationHoverManager;
	private readonly _onDidRequestRunCommand;
	readonly onDidRequestRunCommand: import("../../../../workbench.web.main.internal.js").Event<{
		command: ITerminalCommand;
		noNewLine?: boolean;
	}>;
	private readonly _onDidRequestCopyAsHtml;
	readonly onDidRequestCopyAsHtml: import("../../../../workbench.web.main.internal.js").Event<{
		command: ITerminalCommand;
	}>;
	constructor(
		_capabilities: ITerminalCapabilityStore,
		_clipboardService: IClipboardService,
		_contextMenuService: IContextMenuService,
		_configurationService: IConfigurationService,
		_themeService: IThemeService,
		_openerService: IOpenerService,
		_quickInputService: IQuickInputService,
		lifecycleService: ILifecycleService,
		_commandService: ICommandService,
		instantiationService: IInstantiationService,
		_accessibilitySignalService: IAccessibilitySignalService,
		_notificationService: INotificationService,
	);
	private _removeCapabilityDisposables;
	private _createCapabilityDisposables;
	registerMarkDecoration(mark: IMarkProperties): IDecoration | undefined;
	private _updateDecorationVisibility;
	private _disposeAllDecorations;
	private _updateGutterDecorationVisibility;
	private _updateCommandDecorationVisibility;
	refreshLayouts(): void;
	private _refreshStyles;
	private _dispose;
	private _clearPlaceholder;
	clearDecorations(): void;
	private _attachToCommandCapability;
	private _getCommandDetectionListeners;
	activate(terminal: Terminal): void;
	registerCommandDecoration(
		command?: ITerminalCommand,
		beforeCommandExecution?: boolean,
		markProperties?: IMarkProperties,
	): IDecoration | undefined;
	private _createDisposables;
	private _updateClasses;
	private _createContextMenu;
	private _getContextMenuActions;
	private _getCommandActions;
	private _showToggleVisibilityQuickPick;
	private _getDecorationCssColor;
}
