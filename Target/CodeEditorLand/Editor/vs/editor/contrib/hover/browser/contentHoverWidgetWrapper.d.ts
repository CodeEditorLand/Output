import { Disposable } from "../../../../base/common/lifecycle.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import {
	ICodeEditor,
	IEditorMouseEvent,
} from "../../../browser/editorBrowser.js";
import { Range } from "../../../common/core/range.js";
import { HoverVerbosityAction } from "../../../common/standalone/standaloneEnums.js";
import { ContentHoverWidget } from "./contentHoverWidget.js";
import { HoverStartMode, HoverStartSource } from "./hoverOperation.js";
import { IHoverWidget } from "./hoverTypes.js";

export declare class ContentHoverWidgetWrapper
	extends Disposable
	implements IHoverWidget
{
	private readonly _editor;
	private readonly _instantiationService;
	private readonly _keybindingService;
	private _currentResult;
	private _renderedContentHover;
	private readonly _contentHoverWidget;
	private readonly _participants;
	private readonly _hoverOperation;
	private readonly _onContentsChanged;
	readonly onContentsChanged: import("../../../../workbench/workbench.web.main.internal.js").Event<void>;
	constructor(
		_editor: ICodeEditor,
		_instantiationService: IInstantiationService,
		_keybindingService: IKeybindingService,
	);
	private _initializeHoverParticipants;
	private _registerListeners;
	/**
	 * Returns true if the hover shows now or will show.
	 */
	private _startShowingOrUpdateHover;
	private _startHoverOperationIfNecessary;
	private _setCurrentResult;
	private _addLoadingMessage;
	private _withResult;
	private _showHover;
	private _hideHover;
	private _getHoverContext;
	showsOrWillShow(mouseEvent: IEditorMouseEvent): boolean;
	private _findHoverAnchorCandidates;
	private _onMouseLeave;
	startShowingAtRange(
		range: Range,
		mode: HoverStartMode,
		source: HoverStartSource,
		focus: boolean,
	): void;
	getWidgetContent(): string | undefined;
	updateHoverVerbosityLevel(
		action: HoverVerbosityAction,
		index: number,
		focus?: boolean,
	): Promise<void>;
	doesHoverAtIndexSupportVerbosityAction(
		index: number,
		action: HoverVerbosityAction,
	): boolean;
	getAccessibleWidgetContent(): string | undefined;
	getAccessibleWidgetContentAtIndex(index: number): string | undefined;
	focusedHoverPartIndex(): number;
	containsNode(node: Node | null | undefined): boolean;
	focus(): void;
	focusHoverPartWithIndex(index: number): void;
	scrollUp(): void;
	scrollDown(): void;
	scrollLeft(): void;
	scrollRight(): void;
	pageUp(): void;
	pageDown(): void;
	goToTop(): void;
	goToBottom(): void;
	hide(): void;
	getDomNode(): HTMLElement;
	get isColorPickerVisible(): boolean;
	get isVisibleFromKeyboard(): boolean;
	get isVisible(): boolean;
	get isFocused(): boolean;
	get isResizing(): boolean;
	get widget(): ContentHoverWidget;
}
