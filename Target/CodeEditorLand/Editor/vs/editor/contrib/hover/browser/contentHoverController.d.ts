import { Disposable } from "../../../../base/common/lifecycle.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { Range } from "../../../common/core/range.js";
import { IEditorContribution } from "../../../common/editorCommon.js";
import { HoverVerbosityAction } from "../../../common/languages.js";
import { HoverStartMode, HoverStartSource } from "./hoverOperation.js";

import "./hover.css";

export declare class ContentHoverController
	extends Disposable
	implements IEditorContribution
{
	private readonly _editor;
	private readonly _instantiationService;
	private readonly _keybindingService;
	private readonly _onHoverContentsChanged;
	readonly onHoverContentsChanged: import("../../../../workbench/workbench.web.main.internal.js").Event<void>;
	static readonly ID = "editor.contrib.contentHover";
	shouldKeepOpenOnEditorMouseMoveOrLeave: boolean;
	private readonly _listenersStore;
	private _contentWidget;
	private _mouseMoveEvent;
	private _reactToEditorMouseMoveRunner;
	private _hoverSettings;
	private _hoverState;
	constructor(
		_editor: ICodeEditor,
		_instantiationService: IInstantiationService,
		_keybindingService: IKeybindingService,
	);
	static get(editor: ICodeEditor): ContentHoverController | null;
	private _hookListeners;
	private _unhookListeners;
	private _cancelScheduler;
	private _onEditorScrollChanged;
	private _onEditorMouseDown;
	private _shouldNotHideCurrentHoverWidget;
	private _isMouseOnContentHoverWidget;
	private _onEditorMouseUp;
	private _onEditorMouseLeave;
	private _shouldNotRecomputeCurrentHoverWidget;
	private _onEditorMouseMove;
	private _reactToEditorMouseMove;
	private _tryShowHoverWidget;
	private _onKeyDown;
	private _hideWidgets;
	private _getOrCreateContentWidget;
	hideContentHover(): void;
	showContentHover(
		range: Range,
		mode: HoverStartMode,
		source: HoverStartSource,
		focus: boolean,
		activatedByColorDecoratorClick?: boolean,
	): void;
	private _isContentWidgetResizing;
	focusedHoverPartIndex(): number;
	doesHoverAtIndexSupportVerbosityAction(
		index: number,
		action: HoverVerbosityAction,
	): boolean;
	updateHoverVerbosityLevel(
		action: HoverVerbosityAction,
		index: number,
		focus?: boolean,
	): void;
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
	getWidgetContent(): string | undefined;
	getAccessibleWidgetContent(): string | undefined;
	getAccessibleWidgetContentAtIndex(index: number): string | undefined;
	get isColorPickerVisible(): boolean | undefined;
	get isHoverVisible(): boolean | undefined;
	dispose(): void;
}
