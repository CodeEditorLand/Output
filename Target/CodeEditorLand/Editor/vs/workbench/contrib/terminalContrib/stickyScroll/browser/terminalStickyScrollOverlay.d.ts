import type {
	Terminal as RawXtermTerminal,
	Terminal as XTermTerminal,
} from "@xterm/xterm";

import { Disposable } from "../../../../../base/common/lifecycle.js";

import "./media/stickyScroll.css";

import { IMenuService } from "../../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../../platform/contextview/browser/contextView.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import { ICommandDetectionCapability } from "../../../../../platform/terminal/common/capabilities/capabilities.js";
import { IThemeService } from "../../../../../platform/theme/common/themeService.js";
import {
	ITerminalConfigurationService,
	ITerminalInstance,
	IXtermColorProvider,
	IXtermTerminal,
} from "../../../terminal/browser/terminal.js";

export declare class TerminalStickyScrollOverlay extends Disposable {
	private readonly _instance;
	private readonly _xterm;
	private readonly _xtermColorProvider;
	private readonly _commandDetection;
	private readonly _contextMenuService;
	private readonly _keybindingService;
	private readonly _terminalConfigurationService;
	private readonly _themeService;
	private _stickyScrollOverlay?;
	private _serializeAddon?;
	private _webglAddon?;
	private _element?;
	private _currentStickyCommand?;
	private _currentContent?;
	private _contextMenu;
	private readonly _refreshListeners;
	private _state;
	private _isRefreshQueued;
	private _rawMaxLineCount;
	constructor(
		_instance: ITerminalInstance,
		_xterm: IXtermTerminal & {
			raw: RawXtermTerminal;
		},
		_xtermColorProvider: IXtermColorProvider,
		_commandDetection: ICommandDetectionCapability,
		xtermCtor: Promise<typeof XTermTerminal>,
		configurationService: IConfigurationService,
		contextKeyService: IContextKeyService,
		_contextMenuService: IContextMenuService,
		_keybindingService: IKeybindingService,
		menuService: IMenuService,
		_terminalConfigurationService: ITerminalConfigurationService,
		_themeService: IThemeService,
	);
	lockHide(): void;
	unlockHide(): void;
	private _setState;
	private _installRefreshListeners;
	private _uninstallRefreshListeners;
	private _setVisible;
	private _refresh;
	private _refreshNow;
	private _updateContent;
	private _ensureElement;
	private _syncOptions;
	private _getOptions;
	private _refreshGpuAcceleration;
	private _shouldLoadWebgl;
	private _getTheme;
	private _getSerializeAddonConstructor;
	private _getWebglAddonConstructor;
}
