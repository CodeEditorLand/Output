import { Event } from "../../../common/event.js";
import { IKeyboardEvent } from "../../keyboardEvent.js";
import { IMouseEvent } from "../../mouseEvent.js";
import { IContextViewProvider } from "../contextview/contextview.js";
import {
	HistoryInputBox,
	IInputBoxStyles,
	IInputValidator,
	IMessage as InputBoxMessage,
} from "../inputbox/inputBox.js";
import { IToggleStyles } from "../toggle/toggle.js";
import { Widget } from "../widget.js";

import "./findInput.css";

export interface IReplaceInputOptions {
	readonly placeholder?: string;
	readonly width?: number;
	readonly validation?: IInputValidator;
	readonly label: string;
	readonly flexibleHeight?: boolean;
	readonly flexibleWidth?: boolean;
	readonly flexibleMaxHeight?: number;
	readonly appendPreserveCaseLabel?: string;
	readonly history?: string[];
	readonly showHistoryHint?: () => boolean;
	readonly inputBoxStyles: IInputBoxStyles;
	readonly toggleStyles: IToggleStyles;
}
export declare class ReplaceInput extends Widget {
	private readonly _showOptionButtons;
	static readonly OPTION_CHANGE: string;
	private contextViewProvider;
	private placeholder;
	private validation?;
	private label;
	private fixFocusOnOptionClickEnabled;
	private preserveCase;
	private cachedOptionsWidth;
	domNode: HTMLElement;
	inputBox: HistoryInputBox;
	private readonly _onDidOptionChange;
	readonly onDidOptionChange: Event<boolean>;
	private readonly _onKeyDown;
	readonly onKeyDown: Event<IKeyboardEvent>;
	private readonly _onMouseDown;
	readonly onMouseDown: Event<IMouseEvent>;
	private readonly _onInput;
	readonly onInput: Event<void>;
	private readonly _onKeyUp;
	readonly onKeyUp: Event<IKeyboardEvent>;
	private _onPreserveCaseKeyDown;
	readonly onPreserveCaseKeyDown: Event<IKeyboardEvent>;
	constructor(
		parent: HTMLElement | null,
		contextViewProvider: IContextViewProvider | undefined,
		_showOptionButtons: boolean,
		options: IReplaceInputOptions,
	);
	enable(): void;
	disable(): void;
	setFocusInputOnOptionClick(value: boolean): void;
	setEnabled(enabled: boolean): void;
	clear(): void;
	getValue(): string;
	setValue(value: string): void;
	onSearchSubmit(): void;
	protected applyStyles(): void;
	select(): void;
	focus(): void;
	getPreserveCase(): boolean;
	setPreserveCase(value: boolean): void;
	focusOnPreserve(): void;
	private _lastHighlightFindOptions;
	highlightFindOptions(): void;
	validate(): void;
	showMessage(message: InputBoxMessage): void;
	clearMessage(): void;
	private clearValidation;
	set width(newWidth: number);
	dispose(): void;
}
