import { Disposable } from "../../../../base/common/lifecycle.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import {
	ICodeEditor,
	IEditorMouseEvent,
	IOverlayWidget,
	IOverlayWidgetPosition,
} from "../../../browser/editorBrowser.js";
import { ILanguageService } from "../../../common/languages/language.js";
import { IHoverWidget } from "./hoverTypes.js";

export declare class GlyphHoverWidget
	extends Disposable
	implements IOverlayWidget, IHoverWidget
{
	static readonly ID = "editor.contrib.modesGlyphHoverWidget";
	private readonly _editor;
	private readonly _hover;
	private _isVisible;
	private _messages;
	private readonly _markdownRenderer;
	private readonly _hoverOperation;
	private readonly _renderDisposeables;
	private _hoverComputerOptions;
	constructor(
		editor: ICodeEditor,
		languageService: ILanguageService,
		openerService: IOpenerService,
	);
	dispose(): void;
	getId(): string;
	getDomNode(): HTMLElement;
	getPosition(): IOverlayWidgetPosition | null;
	private _updateFont;
	private _onModelDecorationsChanged;
	showsOrWillShow(mouseEvent: IEditorMouseEvent): boolean;
	private _startShowingAt;
	hide(): void;
	private _withResult;
	private _renderMessages;
	private _updateContents;
	private _showAt;
	private _onMouseLeave;
}
