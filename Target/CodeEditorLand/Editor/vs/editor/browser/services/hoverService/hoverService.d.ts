import type {
	IHoverOptions,
	IHoverWidget,
	IManagedHover,
	IManagedHoverContentOrFactory,
	IManagedHoverOptions,
} from "../../../../base/browser/ui/hover/hover.js";
import type { IHoverDelegate } from "../../../../base/browser/ui/hover/hoverDelegate.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILayoutService } from "../../../../platform/layout/browser/layoutService.js";

export declare class HoverService extends Disposable implements IHoverService {
	private readonly _instantiationService;
	private readonly _keybindingService;
	private readonly _layoutService;
	private readonly _accessibilityService;
	readonly _serviceBrand: undefined;
	private _contextViewHandler;
	private _currentHoverOptions;
	private _currentHover;
	private _lastHoverOptions;
	private _lastFocusedElementBeforeOpen;
	constructor(
		_instantiationService: IInstantiationService,
		contextMenuService: IContextMenuService,
		_keybindingService: IKeybindingService,
		_layoutService: ILayoutService,
		_accessibilityService: IAccessibilityService,
	);
	showHover(
		options: IHoverOptions,
		focus?: boolean,
		skipLastFocusedUpdate?: boolean,
	): IHoverWidget | undefined;
	hideHover(): void;
	private doHideHover;
	private _intersectionChange;
	showAndFocusLastHover(): void;
	private _keyDown;
	private _keyUp;
	private readonly _managedHovers;
	setupManagedHover(
		hoverDelegate: IHoverDelegate,
		targetElement: HTMLElement,
		content: IManagedHoverContentOrFactory,
		options?: IManagedHoverOptions | undefined,
	): IManagedHover;
	showManagedHover(target: HTMLElement): void;
	dispose(): void;
}
