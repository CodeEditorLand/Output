import { Disposable } from "../../../../base/common/lifecycle.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { IEditorContribution } from "../../../common/editorCommon.js";

import "./hover.css";

export declare class GlyphHoverController
	extends Disposable
	implements IEditorContribution
{
	private readonly _editor;
	private readonly _instantiationService;
	static readonly ID = "editor.contrib.marginHover";
	shouldKeepOpenOnEditorMouseMoveOrLeave: boolean;
	private readonly _listenersStore;
	private _glyphWidget;
	private _mouseMoveEvent;
	private _reactToEditorMouseMoveRunner;
	private _hoverSettings;
	private _hoverState;
	constructor(
		_editor: ICodeEditor,
		_instantiationService: IInstantiationService,
	);
	static get(editor: ICodeEditor): GlyphHoverController | null;
	private _hookListeners;
	private _unhookListeners;
	private _cancelScheduler;
	private _onEditorScrollChanged;
	private _onEditorMouseDown;
	private _isMouseOnGlyphHoverWidget;
	private _onEditorMouseUp;
	private _onEditorMouseLeave;
	private _shouldNotRecomputeCurrentHoverWidget;
	private _onEditorMouseMove;
	private _reactToEditorMouseMove;
	private _tryShowHoverWidget;
	private _onKeyDown;
	private _hideWidgets;
	private _getOrCreateGlyphWidget;
	hideContentHover(): void;
	dispose(): void;
}
