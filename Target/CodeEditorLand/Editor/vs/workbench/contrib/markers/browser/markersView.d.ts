import "./media/markers.css";

import {
	ITableContextMenuEvent,
	ITableEvent,
} from "../../../../base/browser/ui/table/table.js";
import {
	ITreeContextMenuEvent,
	ITreeEvent,
} from "../../../../base/browser/ui/tree/tree.js";
import { Event } from "../../../../base/common/event.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IOpenEvent } from "../../../../platform/list/browser/listService.js";
import { IMarkerService } from "../../../../platform/markers/common/markers.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import {
	FilterViewPane,
	IViewPaneOptions,
} from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { MarkersViewMode } from "../common/markers.js";
import { IMarkersView } from "./markers.js";
import { FilterOptions } from "./markersFilterOptions.js";
import {
	Marker,
	MarkerElement,
	MarkerTableItem,
	ResourceMarkers,
} from "./markersModel.js";
import { MarkersFilters } from "./markersViewActions.js";

export interface IProblemsWidget {
	get contextKeyService(): IContextKeyService;
	get onContextMenu():
		| Event<ITreeContextMenuEvent<MarkerElement | null>>
		| Event<ITableContextMenuEvent<MarkerTableItem>>;
	get onDidChangeFocus():
		| Event<ITreeEvent<MarkerElement | null>>
		| Event<ITableEvent<MarkerTableItem>>;
	get onDidChangeSelection():
		| Event<ITreeEvent<MarkerElement | null>>
		| Event<ITableEvent<MarkerTableItem>>;
	get onDidOpen(): Event<
		IOpenEvent<MarkerElement | MarkerTableItem | undefined>
	>;
	collapseMarkers(): void;
	dispose(): void;
	domFocus(): void;
	filterMarkers(
		resourceMarkers: ResourceMarkers[],
		filterOptions: FilterOptions,
	): void;
	getFocus(): (MarkerElement | MarkerTableItem | null)[];
	getHTMLElement(): HTMLElement;
	getRelativeTop(
		location: MarkerElement | MarkerTableItem | null,
	): number | null;
	getSelection(): (MarkerElement | MarkerTableItem | null)[];
	getVisibleItemCount(): number;
	layout(height: number, width: number): void;
	reset(resourceMarkers: ResourceMarkers[]): void;
	revealMarkers(
		activeResource: ResourceMarkers | null,
		focus: boolean,
		lastSelectedRelativeTop: number,
	): void;
	setAriaLabel(label: string): void;
	setMarkerSelection(selection?: Marker[], focus?: Marker[]): void;
	toggleVisibility(hide: boolean): void;
	update(resourceMarkers: ResourceMarkers[]): void;
	updateMarker(marker: Marker): void;
}
export declare class MarkersView
	extends FilterViewPane
	implements IMarkersView
{
	private readonly editorService;
	private readonly markerService;
	private readonly workspaceContextService;
	private readonly uriIdentityService;
	private lastSelectedRelativeTop;
	private currentActiveResource;
	private readonly rangeHighlightDecorations;
	private readonly markersModel;
	private readonly filter;
	private readonly onVisibleDisposables;
	private widget;
	private readonly widgetDisposables;
	private widgetContainer;
	private widgetIdentityProvider;
	private widgetAccessibilityProvider;
	private messageBoxContainer;
	private ariaLabelElement;
	readonly filters: MarkersFilters;
	private currentHeight;
	private currentWidth;
	private readonly memento;
	private readonly panelState;
	private cachedFilterStats;
	private currentResourceGotAddedToMarkersData;
	private readonly markersViewModel;
	readonly onDidChangeVisibility: Event<boolean>;
	constructor(
		options: IViewPaneOptions,
		instantiationService: IInstantiationService,
		viewDescriptorService: IViewDescriptorService,
		editorService: IEditorService,
		configurationService: IConfigurationService,
		telemetryService: ITelemetryService,
		markerService: IMarkerService,
		contextKeyService: IContextKeyService,
		workspaceContextService: IWorkspaceContextService,
		contextMenuService: IContextMenuService,
		uriIdentityService: IUriIdentityService,
		keybindingService: IKeybindingService,
		storageService: IStorageService,
		openerService: IOpenerService,
		themeService: IThemeService,
		hoverService: IHoverService,
	);
	render(): void;
	protected renderBody(parent: HTMLElement): void;
	getTitle(): string;
	protected layoutBodyContent(height?: number, width?: number): void;
	focus(): void;
	focusFilter(): void;
	updateBadge(total: number, filtered: number): void;
	checkMoreFilters(): void;
	clearFilterText(): void;
	showQuickFixes(marker: Marker): void;
	openFileAtElement(
		element: any,
		preserveFocus: boolean,
		sideByside: boolean,
		pinned: boolean,
	): boolean;
	private refreshPanel;
	private onDidChangeViewState;
	private resetWidget;
	private updateFilter;
	private getDefaultViewMode;
	private getFilesExcludeExpressions;
	private getFilesExclude;
	private getResourceMarkers;
	private createMessageBox;
	private createArialLabelElement;
	private createWidget;
	private createTable;
	private createTree;
	collapseAll(): void;
	setMultiline(multiline: boolean): void;
	setViewMode(viewMode: MarkersViewMode): void;
	private onDidChangeMarkersViewVisibility;
	private reInitialize;
	private onDidChangeModel;
	private onDidChangeViewMode;
	private isCurrentResourceGotAddedToMarkersData;
	private onActiveEditorChanged;
	private setCurrentActiveEditor;
	private onSelected;
	private hasNoProblems;
	private renderContent;
	private renderMessage;
	private renderFilterMessageForActiveFile;
	private renderFilteredByFilterMessage;
	private renderNoProblemsMessageForActiveFile;
	private renderNoProblemsMessage;
	private setAriaLabel;
	private clearFilters;
	private autoReveal;
	private getResourceForCurrentActiveResource;
	private updateRangeHighlights;
	private highlightCurrentSelectedMarkerRange;
	private onContextMenu;
	private getMenuActions;
	getFocusElement(): MarkerElement | undefined;
	getFocusedSelectedElements(): MarkerElement[] | null;
	getAllResourceMarkers(): ResourceMarkers[];
	getFilterStats(): {
		total: number;
		filtered: number;
	};
	private toggleVisibility;
	saveState(): void;
	dispose(): void;
}
