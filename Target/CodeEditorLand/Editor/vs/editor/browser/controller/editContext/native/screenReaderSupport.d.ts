import { FastDomNode } from "../../../../../base/browser/fastDomNode.js";
import { IAccessibilityService } from "../../../../../platform/accessibility/common/accessibility.js";
import { IKeybindingService } from "../../../../../platform/keybinding/common/keybinding.js";
import {
	ViewConfigurationChangedEvent,
	ViewCursorStateChangedEvent,
} from "../../../../common/viewEvents.js";
import { ViewContext } from "../../../../common/viewModel/viewContext.js";
import {
	RenderingContext,
	RestrictedRenderingContext,
} from "../../../view/renderingContext.js";
import { ScreenReaderContentState } from "../screenReaderUtils.js";

export declare class ScreenReaderSupport {
	private readonly _domNode;
	private readonly _context;
	private readonly _keybindingService;
	private readonly _accessibilityService;
	private _contentLeft;
	private _contentWidth;
	private _lineHeight;
	private _fontInfo;
	private _accessibilityPageSize;
	private _primarySelection;
	private _screenReaderContentState;
	constructor(
		_domNode: FastDomNode<HTMLElement>,
		_context: ViewContext,
		_keybindingService: IKeybindingService,
		_accessibilityService: IAccessibilityService,
	);
	onConfigurationChanged(e: ViewConfigurationChangedEvent): void;
	private _updateConfigurationSettings;
	private _updateDomAttributes;
	onCursorStateChanged(e: ViewCursorStateChangedEvent): void;
	prepareRender(ctx: RenderingContext): void;
	render(ctx: RestrictedRenderingContext): void;
	setAriaOptions(): void;
	writeScreenReaderContent(): void;
	get screenReaderContentState(): ScreenReaderContentState | undefined;
	private _getScreenReaderContentState;
	private _setSelectionOfScreenReaderContent;
}
