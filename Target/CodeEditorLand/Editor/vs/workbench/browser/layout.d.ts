import { IDimension } from "../../base/browser/dom.js";
import { Direction } from "../../base/browser/ui/grid/grid.js";
import { CodeWindow } from "../../base/browser/window.js";
import { Event } from "../../base/common/event.js";
import {
	Disposable,
	DisposableStore,
	IDisposable,
} from "../../base/common/lifecycle.js";
import { ServicesAccessor } from "../../platform/instantiation/common/instantiation.js";
import {
	IWorkbenchLayoutService,
	MULTI_WINDOW_PARTS,
	PanelAlignment,
	Parts,
	Position,
	SINGLE_WINDOW_PARTS,
} from "../services/layout/browser/layoutService.js";
import { Part } from "./part.js";

export declare const TITLE_BAR_SETTINGS: string[];
export declare abstract class Layout
	extends Disposable
	implements IWorkbenchLayoutService
{
	protected readonly parent: HTMLElement;
	readonly _serviceBrand: undefined;
	private readonly _onDidChangeZenMode;
	readonly onDidChangeZenMode: Event<boolean>;
	private readonly _onDidChangeMainEditorCenteredLayout;
	readonly onDidChangeMainEditorCenteredLayout: Event<boolean>;
	private readonly _onDidChangePanelAlignment;
	readonly onDidChangePanelAlignment: Event<PanelAlignment>;
	private readonly _onDidChangeWindowMaximized;
	readonly onDidChangeWindowMaximized: Event<{
		windowId: number;
		maximized: boolean;
	}>;
	private readonly _onDidChangePanelPosition;
	readonly onDidChangePanelPosition: Event<string>;
	private readonly _onDidChangePartVisibility;
	readonly onDidChangePartVisibility: Event<void>;
	private readonly _onDidChangeNotificationsVisibility;
	readonly onDidChangeNotificationsVisibility: Event<boolean>;
	private readonly _onDidLayoutMainContainer;
	readonly onDidLayoutMainContainer: Event<IDimension>;
	private readonly _onDidLayoutActiveContainer;
	readonly onDidLayoutActiveContainer: Event<IDimension>;
	private readonly _onDidLayoutContainer;
	readonly onDidLayoutContainer: Event<{
		container: HTMLElement;
		dimension: IDimension;
	}>;
	private readonly _onDidAddContainer;
	readonly onDidAddContainer: Event<{
		container: HTMLElement;
		disposables: DisposableStore;
	}>;
	private readonly _onDidChangeActiveContainer;
	readonly onDidChangeActiveContainer: Event<void>;
	readonly mainContainer: HTMLDivElement;
	get activeContainer(): HTMLElement;
	get containers(): Iterable<HTMLElement>;
	private getContainerFromDocument;
	private readonly containerStylesLoaded;
	whenContainerStylesLoaded(window: CodeWindow): Promise<void> | undefined;
	private _mainContainerDimension;
	get mainContainerDimension(): IDimension;
	get activeContainerDimension(): IDimension;
	private getContainerDimension;
	get mainContainerOffset(): {
		top: number;
		quickPickTop: number;
	};
	get activeContainerOffset(): {
		top: number;
		quickPickTop: number;
	};
	private computeContainerOffset;
	private readonly parts;
	private initialized;
	private workbenchGrid;
	private titleBarPartView;
	private bannerPartView;
	private activityBarPartView;
	private sideBarPartView;
	private panelPartView;
	private auxiliaryBarPartView;
	private editorPartView;
	private statusBarPartView;
	private environmentService;
	private extensionService;
	private configurationService;
	private storageService;
	private hostService;
	private editorService;
	private mainPartEditorService;
	private editorGroupService;
	private paneCompositeService;
	private titleService;
	private viewDescriptorService;
	private contextService;
	private workingCopyBackupService;
	private notificationService;
	private themeService;
	private statusBarService;
	private logService;
	private telemetryService;
	private auxiliaryWindowService;
	private state;
	private stateModel;
	private disposed;
	constructor(parent: HTMLElement);
	protected initLayout(accessor: ServicesAccessor): void;
	private registerLayoutListeners;
	private onMenubarToggled;
	private handleContainerDidLayout;
	private onFullscreenChanged;
	private onActiveWindowChanged;
	private onWindowFocusChanged;
	private getActiveContainerId;
	private doUpdateLayoutConfiguration;
	private setSideBarPosition;
	private updateWindowsBorder;
	private initLayoutState;
	private getDefaultLayoutViews;
	private shouldRestoreEditors;
	protected willRestoreEditors(): boolean;
	private resolveEditorsToOpen;
	private _openedDefaultEditors;
	get openedDefaultEditors(): boolean;
	private getInitialEditorsState;
	private readonly whenReadyPromise;
	protected readonly whenReady: Promise<void>;
	private readonly whenRestoredPromise;
	readonly whenRestored: Promise<void>;
	private restored;
	isRestored(): boolean;
	protected restoreParts(): void;
	registerPart(part: Part): IDisposable;
	protected getPart(key: Parts): Part;
	registerNotifications(delegate: {
		onDidChangeNotificationsVisibility: Event<boolean>;
	}): void;
	hasFocus(part: Parts): boolean;
	focusPart(part: MULTI_WINDOW_PARTS, targetWindow: Window): void;
	focusPart(part: SINGLE_WINDOW_PARTS): void;
	getContainer(targetWindow: Window): HTMLElement;
	getContainer(targetWindow: Window, part: Parts): HTMLElement | undefined;
	isVisible(part: MULTI_WINDOW_PARTS, targetWindow: Window): boolean;
	isVisible(part: SINGLE_WINDOW_PARTS): boolean;
	isVisible(part: Parts, targetWindow?: Window): boolean;
	private shouldShowBannerFirst;
	focus(): void;
	private focusPanelOrEditor;
	getMaximumEditorDimensions(container: HTMLElement): IDimension;
	private isZenModeActive;
	private setZenModeActive;
	toggleZenMode(skipLayout?: boolean, restoring?: boolean): void;
	private setStatusBarHidden;
	protected createWorkbenchLayout(): void;
	layout(): void;
	isMainEditorLayoutCentered(): boolean;
	centerMainEditorLayout(active: boolean, skipLayout?: boolean): void;
	resizePart(
		part: Parts,
		sizeChangeWidth: number,
		sizeChangeHeight: number,
	): void;
	private setActivityBarHidden;
	private setBannerHidden;
	private setEditorHidden;
	getLayoutClasses(): string[];
	private setSideBarHidden;
	private hasViews;
	private adjustPartPositions;
	setPanelAlignment(alignment: PanelAlignment, skipLayout?: boolean): void;
	private setPanelHidden;
	toggleMaximizedPanel(): void;
	private panelOpensMaximized;
	private setAuxiliaryBarHidden;
	setPartHidden(
		hidden: boolean,
		part: Exclude<
			SINGLE_WINDOW_PARTS,
			Parts.STATUSBAR_PART | Parts.TITLEBAR_PART
		>,
	): void;
	setPartHidden(
		hidden: boolean,
		part: Exclude<
			MULTI_WINDOW_PARTS,
			Parts.STATUSBAR_PART | Parts.TITLEBAR_PART
		>,
		targetWindow: Window,
	): void;
	hasMainWindowBorder(): boolean;
	getMainWindowBorderRadius(): string | undefined;
	isPanelMaximized(): boolean;
	getSideBarPosition(): Position;
	getPanelAlignment(): PanelAlignment;
	updateMenubarVisibility(skipLayout: boolean): void;
	updateCustomTitleBarVisibility(): void;
	toggleMenuBar(): void;
	getPanelPosition(): Position;
	setPanelPosition(position: Position): void;
	isWindowMaximized(targetWindow: Window): boolean;
	updateWindowMaximizedState(targetWindow: Window, maximized: boolean): void;
	getVisibleNeighborPart(
		part: Parts,
		direction: Direction,
	): Parts | undefined;
	private onDidChangeWCO;
	private arrangeEditorNodes;
	private arrangeMiddleSectionNodes;
	private createGridDescriptor;
	dispose(): void;
}
