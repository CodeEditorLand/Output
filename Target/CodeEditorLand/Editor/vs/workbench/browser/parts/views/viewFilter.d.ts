import { Widget } from "../../../../base/browser/ui/widget.js";
import { MenuId } from "../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextViewService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";

export declare const viewFilterSubmenu: MenuId;
export interface IFilterWidgetOptions {
	readonly text?: string;
	readonly placeholder?: string;
	readonly ariaLabel?: string;
	readonly history?: string[];
	readonly focusContextKey?: string;
}
export declare class FilterWidget extends Widget {
	private readonly options;
	private readonly instantiationService;
	private readonly contextViewService;
	private readonly keybindingService;
	readonly element: HTMLElement;
	private readonly delayedFilterUpdate;
	private readonly filterInputBox;
	private readonly filterBadge;
	private readonly toolbar;
	private readonly focusContextKey;
	private readonly _onDidChangeFilterText;
	readonly onDidChangeFilterText: import("../../../workbench.web.main.internal.js").Event<string>;
	private moreFiltersActionViewItem;
	private isMoreFiltersChecked;
	private lastWidth?;
	private focusTracker;
	get onDidFocus(): import("../../../workbench.web.main.internal.js").Event<void>;
	get onDidBlur(): import("../../../workbench.web.main.internal.js").Event<void>;
	constructor(
		options: IFilterWidgetOptions,
		instantiationService: IInstantiationService,
		contextViewService: IContextViewService,
		contextKeyService: IContextKeyService,
		keybindingService: IKeybindingService,
	);
	hasFocus(): boolean;
	focus(): void;
	blur(): void;
	updateBadge(message: string | undefined): void;
	setFilterText(filterText: string): void;
	getFilterText(): string;
	getHistory(): string[];
	layout(width: number): void;
	relayout(): void;
	checkMoreFilters(checked: boolean): void;
	private createInput;
	private createBadge;
	private createToolBar;
	private onDidInputChange;
	private adjustInputBox;
	private handleKeyboardEvent;
	private onInputKeyDown;
}
