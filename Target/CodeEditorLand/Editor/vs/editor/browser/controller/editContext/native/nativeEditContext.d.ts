import "./nativeEditContext.css";

import { FastDomNode } from "../../../../../base/browser/fastDomNode.js";
import { IAccessibilityService } from "../../../../../platform/accessibility/common/accessibility.js";
import { IClipboardService } from "../../../../../platform/clipboard/common/clipboardService.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { Position } from "../../../../common/core/position.js";
import {
	ViewConfigurationChangedEvent,
	ViewCursorStateChangedEvent,
} from "../../../../common/viewEvents.js";
import { ViewContext } from "../../../../common/viewModel/viewContext.js";
import {
	RenderingContext,
	RestrictedRenderingContext,
} from "../../../view/renderingContext.js";
import { ViewController } from "../../../view/viewController.js";
import { AbstractEditContext } from "../editContext.js";
import { IVisibleRangeProvider } from "../textArea/textAreaEditContext.js";

export declare class NativeEditContext extends AbstractEditContext {
	private readonly _visibleRangeProvider;
	private readonly _accessibilityService;
	readonly domNode: FastDomNode<HTMLDivElement>;
	private readonly _editContext;
	private readonly _screenReaderSupport;
	private _parent;
	private _decorations;
	private _primarySelection;
	private _textStartPositionWithinEditor;
	private _targetWindowId;
	private readonly _focusTracker;
	private readonly _selectionChangeListener;
	constructor(
		context: ViewContext,
		overflowGuardContainer: FastDomNode<HTMLElement>,
		viewController: ViewController,
		_visibleRangeProvider: IVisibleRangeProvider,
		instantiationService: IInstantiationService,
		clipboardService: IClipboardService,
		_accessibilityService: IAccessibilityService,
	);
	dispose(): void;
	setAriaOptions(): void;
	getLastRenderData(): Position | null;
	prepareRender(ctx: RenderingContext): void;
	render(ctx: RestrictedRenderingContext): void;
	onCursorStateChanged(e: ViewCursorStateChangedEvent): boolean;
	onConfigurationChanged(e: ViewConfigurationChangedEvent): boolean;
	writeScreenReaderContent(): void;
	isFocused(): boolean;
	focus(): void;
	refreshFocusState(): void;
	setEditContextOnDomNode(): void;
	private _updateDomAttributes;
	private _updateEditContext;
	private _emitTypeEvent;
	private _onType;
	private _getNewEditContextState;
	private _handleTextFormatUpdate;
	private _updateSelectionAndControlBounds;
	private _updateCharacterBounds;
	private _ensureClipboardGetsEditorSelection;
	private _setSelectionChangeListener;
}
