import type { Terminal as RawXtermTerminal } from "@xterm/xterm";

import { IFocusTracker } from "../../../../../base/browser/dom.js";
import { Event } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";

import "./media/terminalChatWidget.css";

import { IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { InlineChatWidget } from "../../../inlineChat/browser/inlineChatWidget.js";
import {
	ITerminalInstance,
	type IXtermTerminal,
} from "../../../terminal/browser/terminal.js";

export declare class TerminalChatWidget extends Disposable {
	private readonly _terminalElement;
	private readonly _instance;
	private readonly _xterm;
	private readonly _container;
	private readonly _onDidHide;
	readonly onDidHide: Event<void>;
	private readonly _inlineChatWidget;
	get inlineChatWidget(): InlineChatWidget;
	private readonly _focusTracker;
	private readonly _focusedContextKey;
	private readonly _visibleContextKey;
	constructor(
		_terminalElement: HTMLElement,
		_instance: ITerminalInstance,
		_xterm: IXtermTerminal & {
			raw: RawXtermTerminal;
		},
		contextKeyService: IContextKeyService,
		instantiationService: IInstantiationService,
	);
	private _dimension?;
	private _relayout;
	private _doLayout;
	private _reset;
	reveal(): void;
	private _getTop;
	private _updateVerticalPosition;
	private _getTerminalWrapperHeight;
	hide(): void;
	private _setTerminalOffset;
	focus(): void;
	hasFocus(): boolean;
	input(): string;
	setValue(value?: string): void;
	acceptCommand(code: string, shouldExecute: boolean): void;
	get focusTracker(): IFocusTracker;
}
