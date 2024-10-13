import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILoggerService } from "../../../../platform/log/common/log.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import {
	IViewDescriptor,
	IViewDescriptorService,
	ViewContainer,
	ViewContainerLocation,
	ViewVisibilityState,
} from "../../../common/views.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { ViewContainerModel } from "../common/viewContainerModel.js";

export declare class ViewDescriptorService
	extends Disposable
	implements IViewDescriptorService
{
	private readonly instantiationService;
	private readonly contextKeyService;
	private readonly storageService;
	private readonly extensionService;
	private readonly telemetryService;
	readonly _serviceBrand: undefined;
	private static readonly VIEWS_CUSTOMIZATIONS;
	private static readonly COMMON_CONTAINER_ID_PREFIX;
	private readonly _onDidChangeContainer;
	readonly onDidChangeContainer: Event<{
		views: IViewDescriptor[];
		from: ViewContainer;
		to: ViewContainer;
	}>;
	private readonly _onDidChangeLocation;
	readonly onDidChangeLocation: Event<{
		views: IViewDescriptor[];
		from: ViewContainerLocation;
		to: ViewContainerLocation;
	}>;
	private readonly _onDidChangeContainerLocation;
	readonly onDidChangeContainerLocation: Event<{
		viewContainer: ViewContainer;
		from: ViewContainerLocation;
		to: ViewContainerLocation;
	}>;
	private readonly viewContainerModels;
	private readonly viewsVisibilityActionDisposables;
	private canRegisterViewsVisibilityActions;
	private readonly activeViewContextKeys;
	private readonly movableViewContextKeys;
	private readonly defaultViewLocationContextKeys;
	private readonly defaultViewContainerLocationContextKeys;
	private readonly viewsRegistry;
	private readonly viewContainersRegistry;
	private viewContainersCustomLocations;
	private viewDescriptorsCustomLocations;
	private viewContainerBadgeEnablementStates;
	private readonly _onDidChangeViewContainers;
	readonly onDidChangeViewContainers: Event<{
		added: ReadonlyArray<{
			container: ViewContainer;
			location: ViewContainerLocation;
		}>;
		removed: ReadonlyArray<{
			container: ViewContainer;
			location: ViewContainerLocation;
		}>;
	}>;
	get viewContainers(): ReadonlyArray<ViewContainer>;
	private readonly logger;
	constructor(
		instantiationService: IInstantiationService,
		contextKeyService: IContextKeyService,
		storageService: IStorageService,
		extensionService: IExtensionService,
		telemetryService: ITelemetryService,
		loggerService: ILoggerService,
	);
	private migrateToViewsCustomizationsStorage;
	private registerGroupedViews;
	private deregisterGroupedViews;
	private moveOrphanViewsToDefaultLocation;
	whenExtensionsRegistered(): void;
	private onDidRegisterViews;
	private isGeneratedContainerId;
	private onDidDeregisterViews;
	private regroupViews;
	getViewDescriptorById(viewId: string): IViewDescriptor | null;
	getViewLocationById(viewId: string): ViewContainerLocation | null;
	getViewContainerByViewId(viewId: string): ViewContainer | null;
	getViewContainerLocation(
		viewContainer: ViewContainer,
	): ViewContainerLocation;
	getDefaultViewContainerLocation(
		viewContainer: ViewContainer,
	): ViewContainerLocation;
	getDefaultContainerById(viewId: string): ViewContainer | null;
	getViewContainerModel(container: ViewContainer): ViewContainerModel;
	getViewContainerById(id: string): ViewContainer | null;
	getViewContainersByLocation(
		location: ViewContainerLocation,
	): ViewContainer[];
	getDefaultViewContainer(
		location: ViewContainerLocation,
	): ViewContainer | undefined;
	moveViewContainerToLocation(
		viewContainer: ViewContainer,
		location: ViewContainerLocation,
		requestedIndex?: number,
		reason?: string,
	): void;
	getViewContainerBadgeEnablementState(id: string): boolean;
	setViewContainerBadgeEnablementState(
		id: string,
		badgesEnabled: boolean,
	): void;
	moveViewToLocation(
		view: IViewDescriptor,
		location: ViewContainerLocation,
		reason?: string,
	): void;
	moveViewsToContainer(
		views: IViewDescriptor[],
		viewContainer: ViewContainer,
		visibilityState?: ViewVisibilityState,
		reason?: string,
	): void;
	reset(): void;
	isViewContainerRemovedPermanently(viewContainerId: string): boolean;
	private onDidChangeDefaultContainer;
	private reportMovedViews;
	private moveViewsWithoutSaving;
	private moveViewContainerToLocationWithoutSaving;
	private cleanUpGeneratedViewContainer;
	private registerGeneratedViewContainer;
	private onDidStorageChange;
	private onDidViewCustomizationsStorageChange;
	private generateContainerId;
	private saveViewCustomizations;
	private _viewCustomizations;
	private get viewCustomizations();
	private set viewCustomizations(value);
	private getStoredViewCustomizationsValue;
	private setStoredViewCustomizationsValue;
	private getViewsByContainer;
	private onDidRegisterViewContainer;
	private getOrRegisterViewContainerModel;
	private onDidDeregisterViewContainer;
	private onDidChangeActiveViews;
	private onDidChangeVisibleViews;
	private registerViewsVisibilityActions;
	private registerViewsVisibilityActionsForContainer;
	private registerResetViewContainerAction;
	private addViews;
	private removeViews;
	private getOrCreateActiveViewContextKey;
	private getOrCreateVisibleViewContextKey;
	private getOrCreateMovableViewContextKey;
	private getOrCreateDefaultViewLocationContextKey;
	private getOrCreateDefaultViewContainerLocationContextKey;
}
