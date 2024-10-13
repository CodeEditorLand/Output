import { Dimension } from "../../../base/browser/dom.js";
import { GestureEvent } from "../../../base/browser/touch.js";
import { ActionsOrientation } from "../../../base/browser/ui/actionbar/actionbar.js";
import { Widget } from "../../../base/browser/ui/widget.js";
import { IAction } from "../../../base/common/actions.js";
import { IContextMenuService } from "../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../platform/instantiation/common/instantiation.js";
import { IColorTheme } from "../../../platform/theme/common/themeService.js";
import { IComposite } from "../../common/composite.js";
import { IPaneComposite } from "../../common/panecomposite.js";
import {
	IViewDescriptorService,
	ViewContainerLocation,
} from "../../common/views.js";
import {
	Before2D,
	CompositeDragAndDropData,
	ICompositeDragAndDrop,
} from "../dnd.js";
import {
	CompositeBarAction,
	IActivityHoverOptions,
	ICompositeBar,
	ICompositeBarColors,
} from "./compositeBarActions.js";

export interface ICompositeBarItem {
	readonly id: string;
	name?: string;
	pinned: boolean;
	order?: number;
	visible: boolean;
}
export declare class CompositeDragAndDrop implements ICompositeDragAndDrop {
	private viewDescriptorService;
	private targetContainerLocation;
	private orientation;
	private openComposite;
	private moveComposite;
	private getItems;
	constructor(
		viewDescriptorService: IViewDescriptorService,
		targetContainerLocation: ViewContainerLocation,
		orientation: ActionsOrientation,
		openComposite: (
			id: string,
			focus?: boolean,
		) => Promise<IPaneComposite | null>,
		moveComposite: (from: string, to: string, before?: Before2D) => void,
		getItems: () => ICompositeBarItem[],
	);
	drop(
		data: CompositeDragAndDropData,
		targetCompositeId: string | undefined,
		originalEvent: DragEvent,
		before?: Before2D,
	): void;
	onDragEnter(
		data: CompositeDragAndDropData,
		targetCompositeId: string | undefined,
		originalEvent: DragEvent,
	): boolean;
	onDragOver(
		data: CompositeDragAndDropData,
		targetCompositeId: string | undefined,
		originalEvent: DragEvent,
	): boolean;
	private getTargetIndex;
	private canDrop;
}
export interface ICompositeBarOptions {
	readonly icon: boolean;
	readonly orientation: ActionsOrientation;
	readonly colors: (theme: IColorTheme) => ICompositeBarColors;
	readonly compact?: boolean;
	readonly compositeSize: number;
	readonly overflowActionSize: number;
	readonly dndHandler: ICompositeDragAndDrop;
	readonly activityHoverOptions: IActivityHoverOptions;
	readonly preventLoopNavigation?: boolean;
	readonly getActivityAction: (compositeId: string) => CompositeBarAction;
	readonly getCompositePinnedAction: (compositeId: string) => IAction;
	readonly getCompositeBadgeAction: (compositeId: string) => IAction;
	readonly getOnCompositeClickAction: (compositeId: string) => IAction;
	readonly fillExtraContextMenuActions: (
		actions: IAction[],
		e?: MouseEvent | GestureEvent,
	) => void;
	readonly getContextMenuActionsForComposite: (
		compositeId: string,
	) => IAction[];
	readonly openComposite: (
		compositeId: string,
		preserveFocus?: boolean,
	) => Promise<IComposite | null>;
	readonly getDefaultCompositeId: () => string | undefined;
}
export declare class CompositeBar extends Widget implements ICompositeBar {
	private readonly options;
	private readonly instantiationService;
	private readonly contextMenuService;
	private readonly viewDescriptorService;
	private readonly _onDidChange;
	readonly onDidChange: import("../../workbench.web.main.internal.js").Event<void>;
	private dimension;
	private compositeSwitcherBar;
	private compositeOverflowAction;
	private compositeOverflowActionViewItem;
	private readonly model;
	private readonly visibleComposites;
	private readonly compositeSizeInBar;
	constructor(
		items: ICompositeBarItem[],
		options: ICompositeBarOptions,
		instantiationService: IInstantiationService,
		contextMenuService: IContextMenuService,
		viewDescriptorService: IViewDescriptorService,
	);
	getCompositeBarItems(): ICompositeBarItem[];
	setCompositeBarItems(items: ICompositeBarItem[]): void;
	getPinnedComposites(): ICompositeBarItem[];
	getPinnedCompositeIds(): string[];
	getVisibleComposites(): ICompositeBarItem[];
	create(parent: HTMLElement): HTMLElement;
	focus(index?: number): void;
	recomputeSizes(): void;
	layout(dimension: Dimension): void;
	addComposite({
		id,
		name,
		order,
		requestedIndex,
	}: {
		id: string;
		name: string;
		order?: number;
		requestedIndex?: number;
	}): void;
	removeComposite(id: string): void;
	hideComposite(id: string): void;
	activateComposite(id: string): void;
	deactivateComposite(id: string): void;
	pin(compositeId: string, open?: boolean): Promise<void>;
	unpin(compositeId: string): void;
	areBadgesEnabled(compositeId: string): boolean;
	toggleBadgeEnablement(compositeId: string): void;
	private resetActiveComposite;
	isPinned(compositeId: string): boolean;
	move(compositeId: string, toCompositeId: string, before?: boolean): void;
	getAction(compositeId: string): CompositeBarAction;
	private computeSizes;
	private updateCompositeSwitcher;
	private getOverflowingComposites;
	private showContextMenu;
	getContextMenuActions(e?: MouseEvent | GestureEvent): IAction[];
}
