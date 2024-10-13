import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IProgressIndicator } from "../../../../platform/progress/common/progress.js";
import { IPaneComposite } from "../../../common/panecomposite.js";
import {
	IView,
	IViewDescriptorService,
	IViewPaneContainer,
	ViewContainer,
	ViewContainerLocation,
} from "../../../common/views.js";
import { IEditorService } from "../../editor/common/editorService.js";
import {
	IWorkbenchLayoutService,
	Parts,
} from "../../layout/browser/layoutService.js";
import { IPaneCompositePartService } from "../../panecomposite/browser/panecomposite.js";
import { IViewsService } from "../common/viewsService.js";

export declare class ViewsService extends Disposable implements IViewsService {
	private readonly viewDescriptorService;
	private readonly paneCompositeService;
	private readonly contextKeyService;
	private readonly layoutService;
	private readonly editorService;
	readonly _serviceBrand: undefined;
	private readonly viewDisposable;
	private readonly viewPaneContainers;
	private readonly _onDidChangeViewVisibility;
	readonly onDidChangeViewVisibility: Event<{
		id: string;
		visible: boolean;
	}>;
	private readonly _onDidChangeViewContainerVisibility;
	readonly onDidChangeViewContainerVisibility: Event<{
		id: string;
		visible: boolean;
		location: ViewContainerLocation;
	}>;
	private readonly _onDidChangeFocusedView;
	readonly onDidChangeFocusedView: Event<void>;
	private readonly viewContainerDisposables;
	private readonly enabledViewContainersContextKeys;
	private readonly visibleViewContextKeys;
	private readonly focusedViewContextKey;
	constructor(
		viewDescriptorService: IViewDescriptorService,
		paneCompositeService: IPaneCompositePartService,
		contextKeyService: IContextKeyService,
		layoutService: IWorkbenchLayoutService,
		editorService: IEditorService,
	);
	private onViewsAdded;
	private onViewsVisibilityChanged;
	private onViewsRemoved;
	private getOrCreateActiveViewContextKey;
	private onDidChangeContainers;
	private onDidRegisterViewContainer;
	private onDidDeregisterViewContainer;
	private onDidChangeContainerLocation;
	private onViewDescriptorsAdded;
	private onViewDescriptorsRemoved;
	private updateViewContainerEnablementContextKey;
	private openComposite;
	private getComposite;
	isViewContainerVisible(id: string): boolean;
	isViewContainerActive(id: string): boolean;
	getVisibleViewContainer(
		location: ViewContainerLocation,
	): ViewContainer | null;
	getActiveViewPaneContainerWithId(
		viewContainerId: string,
	): IViewPaneContainer | null;
	openViewContainer(
		id: string,
		focus?: boolean,
	): Promise<IPaneComposite | null>;
	closeViewContainer(id: string): Promise<void>;
	isViewVisible(id: string): boolean;
	getActiveViewWithId<T extends IView>(id: string): T | null;
	getViewWithId<T extends IView>(id: string): T | null;
	getFocusedViewName(): string;
	openView<T extends IView>(id: string, focus?: boolean): Promise<T | null>;
	closeView(id: string): void;
	private getActiveViewPaneContainer;
	getViewProgressIndicator(viewId: string): IProgressIndicator | undefined;
	private getViewContainerProgressIndicator;
	private registerOpenViewContainerAction;
	private registerOpenViewAction;
	private registerFocusViewAction;
	private registerResetViewLocationAction;
	private registerPaneComposite;
	private deregisterPaneComposite;
	private createViewPaneContainer;
}
export declare function getPartByLocation(
	viewContainerLocation: ViewContainerLocation,
): Parts.AUXILIARYBAR_PART | Parts.SIDEBAR_PART | Parts.PANEL_PART;
