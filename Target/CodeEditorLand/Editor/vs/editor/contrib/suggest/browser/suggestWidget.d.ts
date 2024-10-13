import * as dom from "../../../../base/browser/dom.js";
import { IKeyboardEvent } from "../../../../base/browser/keyboardEvent.js";

import "../../../../base/browser/ui/codicons/codiconStyles.js";

import { Event } from "../../../../base/common/event.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";

import "./media/suggest.css";

import {
	ContentWidgetPositionPreference,
	ICodeEditor,
	IContentWidget,
	IContentWidgetPosition,
} from "../../../browser/editorBrowser.js";
import { IPosition } from "../../../common/core/position.js";

import "../../symbolIcons/browser/symbolIcons.js";

import { ResizableHTMLElement } from "../../../../base/browser/ui/resizable/resizable.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { CompletionModel } from "./completionModel.js";
import { CompletionItem } from "./suggest.js";

export declare const editorSuggestWidgetSelectedBackground: string;
export interface ISelectedSuggestion {
	item: CompletionItem;
	index: number;
	model: CompletionModel;
}
export declare class SuggestWidget implements IDisposable {
	private readonly editor;
	private readonly _storageService;
	private static LOADING_MESSAGE;
	private static NO_SUGGESTIONS_MESSAGE;
	private _state;
	private _isAuto;
	private _loadingTimeout?;
	private readonly _pendingLayout;
	private readonly _pendingShowDetails;
	private _currentSuggestionDetails?;
	private _focusedItem?;
	private _ignoreFocusEvents;
	private _completionModel?;
	private _cappedHeight?;
	private _forceRenderingAbove;
	private _explainMode;
	readonly element: ResizableHTMLElement;
	private readonly _messageElement;
	private readonly _listElement;
	private readonly _list;
	private readonly _status;
	private readonly _details;
	private readonly _contentWidget;
	private readonly _persistedSize;
	private readonly _ctxSuggestWidgetVisible;
	private readonly _ctxSuggestWidgetDetailsVisible;
	private readonly _ctxSuggestWidgetMultipleSuggestions;
	private readonly _ctxSuggestWidgetHasFocusedSuggestion;
	private readonly _showTimeout;
	private readonly _disposables;
	private readonly _onDidSelect;
	private readonly _onDidFocus;
	private readonly _onDidHide;
	private readonly _onDidShow;
	readonly onDidSelect: Event<ISelectedSuggestion>;
	readonly onDidFocus: Event<ISelectedSuggestion>;
	readonly onDidHide: Event<this>;
	readonly onDidShow: Event<this>;
	private readonly _onDetailsKeydown;
	readonly onDetailsKeyDown: Event<IKeyboardEvent>;
	constructor(
		editor: ICodeEditor,
		_storageService: IStorageService,
		_contextKeyService: IContextKeyService,
		_themeService: IThemeService,
		instantiationService: IInstantiationService,
	);
	dispose(): void;
	private _onEditorMouseDown;
	private _onCursorSelectionChanged;
	private _onListMouseDownOrTap;
	private _onListSelection;
	private _select;
	private _onThemeChange;
	private _onListFocus;
	private _setState;
	private _show;
	showTriggered(auto: boolean, delay: number): void;
	showSuggestions(
		completionModel: CompletionModel,
		selectionIndex: number,
		isFrozen: boolean,
		isAuto: boolean,
		noFocus: boolean,
	): void;
	focusSelected(): void;
	selectNextPage(): boolean;
	selectNext(): boolean;
	selectLast(): boolean;
	selectPreviousPage(): boolean;
	selectPrevious(): boolean;
	selectFirst(): boolean;
	getFocusedItem(): ISelectedSuggestion | undefined;
	toggleDetailsFocus(): void;
	toggleDetails(focused?: boolean): void;
	private _showDetails;
	toggleExplainMode(): void;
	resetPersistedSize(): void;
	hideWidget(): void;
	isFrozen(): boolean;
	_afterRender(position: ContentWidgetPositionPreference | null): void;
	private _layout;
	private _resize;
	private _positionDetails;
	getLayoutInfo(): {
		itemHeight: number;
		statusBarHeight: number;
		borderWidth: number;
		borderHeight: number;
		typicalHalfwidthCharacterWidth: number;
		verticalPadding: number;
		horizontalPadding: number;
		defaultSize: dom.Dimension;
	};
	private _isDetailsVisible;
	private _setDetailsVisible;
	forceRenderingAbove(): void;
	stopForceRenderingAbove(): void;
}
export declare class SuggestContentWidget implements IContentWidget {
	private readonly _widget;
	private readonly _editor;
	readonly allowEditorOverflow = true;
	readonly suppressMouseDown = false;
	private _position?;
	private _preference?;
	private _preferenceLocked;
	private _added;
	private _hidden;
	constructor(_widget: SuggestWidget, _editor: ICodeEditor);
	dispose(): void;
	getId(): string;
	getDomNode(): HTMLElement;
	show(): void;
	hide(): void;
	layout(): void;
	getPosition(): IContentWidgetPosition | null;
	beforeRender(): dom.Dimension;
	afterRender(position: ContentWidgetPositionPreference | null): void;
	setPreference(preference: ContentWidgetPositionPreference): void;
	lockPreference(): void;
	unlockPreference(): void;
	setPosition(position: IPosition | null): void;
}
