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
import { IToggleStyles, Toggle } from "../toggle/toggle.js";
import { Widget } from "../widget.js";
import {
	CaseSensitiveToggle,
	RegexToggle,
	WholeWordsToggle,
} from "./findInputToggles.js";

import "./findInput.css";

export interface IFindInputOptions {
	readonly placeholder?: string;
	readonly width?: number;
	readonly validation?: IInputValidator;
	readonly label: string;
	readonly flexibleHeight?: boolean;
	readonly flexibleWidth?: boolean;
	readonly flexibleMaxHeight?: number;
	readonly showCommonFindToggles?: boolean;
	readonly appendCaseSensitiveLabel?: string;
	readonly appendWholeWordsLabel?: string;
	readonly appendRegexLabel?: string;
	readonly history?: string[];
	readonly additionalToggles?: Toggle[];
	readonly showHistoryHint?: () => boolean;
	readonly toggleStyles: IToggleStyles;
	readonly inputBoxStyles: IInputBoxStyles;
}
export declare class FindInput extends Widget {
	static readonly OPTION_CHANGE: string;
	private placeholder;
	private validation?;
	private label;
	private readonly showCommonFindToggles;
	private fixFocusOnOptionClickEnabled;
	private imeSessionInProgress;
	private readonly additionalTogglesDisposables;
	protected readonly controls: HTMLDivElement;
	protected readonly regex?: RegexToggle;
	protected readonly wholeWords?: WholeWordsToggle;
	protected readonly caseSensitive?: CaseSensitiveToggle;
	protected additionalToggles: Toggle[];
	readonly domNode: HTMLElement;
	readonly inputBox: HistoryInputBox;
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
	private _onCaseSensitiveKeyDown;
	readonly onCaseSensitiveKeyDown: Event<IKeyboardEvent>;
	private _onRegexKeyDown;
	readonly onRegexKeyDown: Event<IKeyboardEvent>;
	constructor(
		parent: HTMLElement | null,
		contextViewProvider: IContextViewProvider | undefined,
		options: IFindInputOptions,
	);
	get isImeSessionInProgress(): boolean;
	get onDidChange(): Event<string>;
	layout(style: {
		collapsedFindWidget: boolean;
		narrowFindWidget: boolean;
		reducedFindWidget: boolean;
	}): void;
	enable(): void;
	disable(): void;
	setFocusInputOnOptionClick(value: boolean): void;
	setEnabled(enabled: boolean): void;
	setAdditionalToggles(toggles: Toggle[] | undefined): void;
	private updateInputBoxPadding;
	clear(): void;
	getValue(): string;
	setValue(value: string): void;
	onSearchSubmit(): void;
	select(): void;
	focus(): void;
	getCaseSensitive(): boolean;
	setCaseSensitive(value: boolean): void;
	getWholeWords(): boolean;
	setWholeWords(value: boolean): void;
	getRegex(): boolean;
	setRegex(value: boolean): void;
	focusOnCaseSensitive(): void;
	focusOnRegex(): void;
	private _lastHighlightFindOptions;
	highlightFindOptions(): void;
	validate(): void;
	showMessage(message: InputBoxMessage): void;
	clearMessage(): void;
	private clearValidation;
}
