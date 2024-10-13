import {
	ITableContextMenuEvent,
	ITableEvent,
} from "../../../../base/browser/ui/table/table.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import {
	IOpenEvent,
	IWorkbenchTableOptions,
} from "../../../../platform/list/browser/listService.js";
import { FilterOptions } from "./markersFilterOptions.js";
import { Marker, MarkerTableItem, ResourceMarkers } from "./markersModel.js";
import { MarkersViewModel } from "./markersTreeViewer.js";
import { IProblemsWidget } from "./markersView.js";

export declare class MarkersTable
	extends Disposable
	implements IProblemsWidget
{
	private readonly container;
	private readonly markersViewModel;
	private resourceMarkers;
	private filterOptions;
	private readonly instantiationService;
	private readonly labelService;
	private _itemCount;
	private readonly table;
	constructor(
		container: HTMLElement,
		markersViewModel: MarkersViewModel,
		resourceMarkers: ResourceMarkers[],
		filterOptions: FilterOptions,
		options: IWorkbenchTableOptions<MarkerTableItem>,
		instantiationService: IInstantiationService,
		labelService: ILabelService,
	);
	get contextKeyService(): IContextKeyService;
	get onContextMenu(): Event<ITableContextMenuEvent<MarkerTableItem>>;
	get onDidOpen(): Event<IOpenEvent<MarkerTableItem | undefined>>;
	get onDidChangeFocus(): Event<ITableEvent<MarkerTableItem>>;
	get onDidChangeSelection(): Event<ITableEvent<MarkerTableItem>>;
	collapseMarkers(): void;
	domFocus(): void;
	filterMarkers(
		resourceMarkers: ResourceMarkers[],
		filterOptions: FilterOptions,
	): void;
	getFocus(): (MarkerTableItem | null)[];
	getHTMLElement(): HTMLElement;
	getRelativeTop(marker: MarkerTableItem | null): number | null;
	getSelection(): (MarkerTableItem | null)[];
	getVisibleItemCount(): number;
	isVisible(): boolean;
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
	private findMarkerIndex;
	private hasSelectedMarkerFor;
}
