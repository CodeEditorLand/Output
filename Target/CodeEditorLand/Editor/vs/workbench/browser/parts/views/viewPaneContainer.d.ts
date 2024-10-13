import { Dimension } from "../../../../base/browser/dom.js";
import { IActionViewItem } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { IBoundarySashes } from "../../../../base/browser/ui/sash/sash.js";
import { IPaneViewOptions } from "../../../../base/browser/ui/splitview/paneview.js";
import { IAction } from "../../../../base/common/actions.js";
import { Event } from "../../../../base/common/event.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";

import "./media/paneviewlet.css";

import { IBaseActionViewItemOptions } from "../../../../base/browser/ui/actionbar/actionViewItems.js";
import {
	Action2,
	IAction2Options,
	MenuId,
} from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import {
	IInstantiationService,
	ServicesAccessor,
} from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { Component } from "../../../common/component.js";
import {
	IAddedViewDescriptorRef,
	IView,
	IViewContainerModel,
	IViewDescriptor,
	IViewDescriptorService,
	IViewPaneContainer,
	ViewContainer,
} from "../../../common/views.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import { CompositeMenuActions } from "../../actions.js";
import { ViewPane } from "./viewPane.js";
import { IViewletViewOptions } from "./viewsViewlet.js";

export declare const ViewsSubMenu: MenuId;
export interface IViewPaneContainerOptions extends IPaneViewOptions {
	mergeViewWithContainerWhenSingleView: boolean;
}
export declare class ViewPaneContainer
	extends Component
	implements IViewPaneContainer
{
	private options;
	protected instantiationService: IInstantiationService;
	protected configurationService: IConfigurationService;
	protected layoutService: IWorkbenchLayoutService;
	protected contextMenuService: IContextMenuService;
	protected telemetryService: ITelemetryService;
	protected extensionService: IExtensionService;
	protected storageService: IStorageService;
	protected contextService: IWorkspaceContextService;
	protected viewDescriptorService: IViewDescriptorService;
	readonly viewContainer: ViewContainer;
	private lastFocusedPane;
	private lastMergedCollapsedPane;
	private paneItems;
	private paneview?;
	private visible;
	private areExtensionsReady;
	private didLayout;
	private dimension;
	private _boundarySashes;
	private readonly visibleViewsCountFromCache;
	private readonly visibleViewsStorageId;
	protected readonly viewContainerModel: IViewContainerModel;
	private readonly _onTitleAreaUpdate;
	readonly onTitleAreaUpdate: Event<void>;
	private readonly _onDidChangeVisibility;
	readonly onDidChangeVisibility: Event<boolean>;
	private readonly _onDidAddViews;
	readonly onDidAddViews: Event<IView[]>;
	private readonly _onDidRemoveViews;
	readonly onDidRemoveViews: Event<IView[]>;
	private readonly _onDidChangeViewVisibility;
	readonly onDidChangeViewVisibility: Event<IView>;
	private readonly _onDidFocusView;
	readonly onDidFocusView: Event<IView>;
	private readonly _onDidBlurView;
	readonly onDidBlurView: Event<IView>;
	get onDidSashChange(): Event<number>;
	get panes(): ViewPane[];
	get views(): IView[];
	get length(): number;
	private _menuActions?;
	get menuActions(): CompositeMenuActions | undefined;
	constructor(
		id: string,
		options: IViewPaneContainerOptions,
		instantiationService: IInstantiationService,
		configurationService: IConfigurationService,
		layoutService: IWorkbenchLayoutService,
		contextMenuService: IContextMenuService,
		telemetryService: ITelemetryService,
		extensionService: IExtensionService,
		themeService: IThemeService,
		storageService: IStorageService,
		contextService: IWorkspaceContextService,
		viewDescriptorService: IViewDescriptorService,
	);
	create(parent: HTMLElement): void;
	getTitle(): string;
	private showContextMenu;
	getActionsContext(): unknown;
	getActionViewItem(
		action: IAction,
		options: IBaseActionViewItemOptions,
	): IActionViewItem | undefined;
	focus(): void;
	private get orientation();
	layout(dimension: Dimension): void;
	setBoundarySashes(sashes: IBoundarySashes): void;
	getOptimalWidth(): number;
	addPanes(
		panes: {
			pane: ViewPane;
			size: number;
			index?: number;
			disposable: IDisposable;
		}[],
	): void;
	setVisible(visible: boolean): void;
	isVisible(): boolean;
	protected updateTitleArea(): void;
	protected createView(
		viewDescriptor: IViewDescriptor,
		options: IViewletViewOptions,
	): ViewPane;
	getView(id: string): ViewPane | undefined;
	private saveViewSizes;
	private restoreViewSizes;
	private computeInitialSizes;
	protected saveState(): void;
	private onContextMenu;
	openView(id: string, focus?: boolean): IView | undefined;
	protected onDidAddViewDescriptors(
		added: IAddedViewDescriptorRef[],
	): ViewPane[];
	private onDidRemoveViewDescriptors;
	toggleViewVisibility(viewId: string): void;
	private addPane;
	removePanes(panes: ViewPane[]): void;
	private removePane;
	movePane(from: ViewPane, to: ViewPane): void;
	resizePane(pane: ViewPane, size: number): void;
	getPaneSize(pane: ViewPane): number;
	private updateViewHeaders;
	isViewMergedWithContainer(): boolean;
	private onDidScrollPane;
	private onDidSashReset;
	dispose(): void;
}
export declare abstract class ViewPaneContainerAction<
	T extends IViewPaneContainer,
> extends Action2 {
	readonly desc: Readonly<IAction2Options> & {
		viewPaneContainerId: string;
	};
	constructor(
		desc: Readonly<IAction2Options> & {
			viewPaneContainerId: string;
		},
	);
	run(accessor: ServicesAccessor, ...args: any[]): unknown;
	abstract runInViewPaneContainer(
		accessor: ServicesAccessor,
		viewPaneContainer: T,
		...args: any[]
	): unknown;
}
