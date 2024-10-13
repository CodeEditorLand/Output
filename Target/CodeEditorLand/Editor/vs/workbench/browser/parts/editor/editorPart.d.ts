import { Dimension } from "../../../../base/browser/dom.js";
import {
	ISerializedGrid,
	IViewSize,
	LayoutPriority,
} from "../../../../base/browser/ui/grid/grid.js";
import { IBoundarySashes } from "../../../../base/browser/ui/sash/sash.js";
import { Event } from "../../../../base/common/event.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { DeepPartial } from "../../../../base/common/types.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import {
	GroupIdentifier,
	IEditorPartOptions,
	IEditorPartOptionsChangeEvent,
} from "../../../common/editor.js";
import {
	EditorGroupLayout,
	GroupDirection,
	GroupOrientation,
	GroupsArrangement,
	GroupsOrder,
	IEditorDropTargetDelegate,
	IEditorPart,
	IEditorSideGroup,
	IFindGroupScope,
	IMergeGroupOptions,
} from "../../../services/editor/common/editorGroupsService.js";
import { IHostService } from "../../../services/host/browser/host.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import { Part } from "../../part.js";
import {
	IEditorGroupsView,
	IEditorGroupView,
	IEditorGroupViewOptions,
	IEditorPartCreationOptions,
	IEditorPartsView,
} from "./editor.js";

export interface IEditorPartUIState {
	readonly serializedGrid: ISerializedGrid;
	readonly activeGroup: GroupIdentifier;
	readonly mostRecentActiveGroups: GroupIdentifier[];
}
export declare class EditorPart
	extends Part
	implements IEditorPart, IEditorGroupsView
{
	protected readonly editorPartsView: IEditorPartsView;
	private readonly groupsLabel;
	readonly windowId: number;
	private readonly instantiationService;
	private readonly configurationService;
	private readonly hostService;
	private readonly contextKeyService;
	private static readonly EDITOR_PART_UI_STATE_STORAGE_KEY;
	private static readonly EDITOR_PART_CENTERED_VIEW_STORAGE_KEY;
	private readonly _onDidFocus;
	readonly onDidFocus: Event<void>;
	private readonly _onDidLayout;
	readonly onDidLayout: Event<Dimension>;
	private readonly _onDidChangeActiveGroup;
	readonly onDidChangeActiveGroup: Event<IEditorGroupView>;
	private readonly _onDidChangeGroupIndex;
	readonly onDidChangeGroupIndex: Event<IEditorGroupView>;
	private readonly _onDidChangeGroupLabel;
	readonly onDidChangeGroupLabel: Event<IEditorGroupView>;
	private readonly _onDidChangeGroupLocked;
	readonly onDidChangeGroupLocked: Event<IEditorGroupView>;
	private readonly _onDidChangeGroupMaximized;
	readonly onDidChangeGroupMaximized: Event<boolean>;
	private readonly _onDidActivateGroup;
	readonly onDidActivateGroup: Event<IEditorGroupView>;
	private readonly _onDidAddGroup;
	readonly onDidAddGroup: Event<IEditorGroupView>;
	private readonly _onDidRemoveGroup;
	readonly onDidRemoveGroup: Event<IEditorGroupView>;
	private readonly _onDidMoveGroup;
	readonly onDidMoveGroup: Event<IEditorGroupView>;
	private readonly onDidSetGridWidget;
	private readonly _onDidChangeSizeConstraints;
	readonly onDidChangeSizeConstraints: Event<
		| {
				width: number;
				height: number;
		  }
		| undefined
	>;
	private readonly _onDidScroll;
	readonly onDidScroll: Event<void>;
	private readonly _onDidChangeEditorPartOptions;
	readonly onDidChangeEditorPartOptions: Event<IEditorPartOptionsChangeEvent>;
	private readonly _onWillDispose;
	readonly onWillDispose: Event<void>;
	private readonly workspaceMemento;
	private readonly profileMemento;
	private readonly groupViews;
	private mostRecentActiveGroups;
	protected container: HTMLElement | undefined;
	private scopedInstantiationService;
	private centeredLayoutWidget;
	private gridWidget;
	private readonly gridWidgetDisposables;
	private readonly gridWidgetView;
	constructor(
		editorPartsView: IEditorPartsView,
		id: string,
		groupsLabel: string,
		windowId: number,
		instantiationService: IInstantiationService,
		themeService: IThemeService,
		configurationService: IConfigurationService,
		storageService: IStorageService,
		layoutService: IWorkbenchLayoutService,
		hostService: IHostService,
		contextKeyService: IContextKeyService,
	);
	private registerListeners;
	private onConfigurationUpdated;
	private handleChangedPartOptions;
	private enforcedPartOptions;
	private _partOptions;
	get partOptions(): IEditorPartOptions;
	enforcePartOptions(options: DeepPartial<IEditorPartOptions>): IDisposable;
	private top;
	private left;
	private _contentDimension;
	get contentDimension(): Dimension;
	private _activeGroup;
	get activeGroup(): IEditorGroupView;
	readonly sideGroup: IEditorSideGroup;
	get groups(): IEditorGroupView[];
	get count(): number;
	get orientation(): GroupOrientation;
	private _isReady;
	get isReady(): boolean;
	private readonly whenReadyPromise;
	readonly whenReady: Promise<void>;
	private readonly whenRestoredPromise;
	readonly whenRestored: Promise<void>;
	get hasRestorableState(): boolean;
	private _willRestoreState;
	get willRestoreState(): boolean;
	getGroups(order?: GroupsOrder): IEditorGroupView[];
	private fillGridNodes;
	hasGroup(identifier: GroupIdentifier): boolean;
	getGroup(identifier: GroupIdentifier): IEditorGroupView | undefined;
	findGroup(
		scope: IFindGroupScope,
		source?: IEditorGroupView | GroupIdentifier,
		wrap?: boolean,
	): IEditorGroupView | undefined;
	private doFindGroupByDirection;
	private doFindGroupByLocation;
	activateGroup(
		group: IEditorGroupView | GroupIdentifier,
		preserveWindowOrder?: boolean,
	): IEditorGroupView;
	restoreGroup(group: IEditorGroupView | GroupIdentifier): IEditorGroupView;
	getSize(group: IEditorGroupView | GroupIdentifier): {
		width: number;
		height: number;
	};
	setSize(
		group: IEditorGroupView | GroupIdentifier,
		size: {
			width: number;
			height: number;
		},
	): void;
	arrangeGroups(
		arrangement: GroupsArrangement,
		target?: IEditorGroupView | GroupIdentifier,
	): void;
	toggleMaximizeGroup(target?: IEditorGroupView | GroupIdentifier): void;
	toggleExpandGroup(target?: IEditorGroupView | GroupIdentifier): void;
	private unmaximizeGroup;
	hasMaximizedGroup(): boolean;
	private isGroupMaximized;
	isGroupExpanded(targetGroup: IEditorGroupView): boolean;
	setGroupOrientation(orientation: GroupOrientation): void;
	applyLayout(layout: EditorGroupLayout): void;
	getLayout(): EditorGroupLayout;
	private serializedNodeToGroupLayoutArgument;
	protected shouldRestoreFocus(target: Element | undefined): boolean;
	private isTwoDimensionalGrid;
	addGroup(
		location: IEditorGroupView | GroupIdentifier,
		direction: GroupDirection,
		groupToCopy?: IEditorGroupView,
	): IEditorGroupView;
	private getSplitSizingStyle;
	private doCreateGroupView;
	private doSetGroupActive;
	private doRestoreGroup;
	private doUpdateMostRecentActive;
	private toGridViewDirection;
	private toGridViewOrientation;
	removeGroup(
		group: IEditorGroupView | GroupIdentifier,
		preserveFocus?: boolean,
	): void;
	private doRemoveGroupWithEditors;
	private doRemoveEmptyGroup;
	moveGroup(
		group: IEditorGroupView | GroupIdentifier,
		location: IEditorGroupView | GroupIdentifier,
		direction: GroupDirection,
	): IEditorGroupView;
	copyGroup(
		group: IEditorGroupView | GroupIdentifier,
		location: IEditorGroupView | GroupIdentifier,
		direction: GroupDirection,
	): IEditorGroupView;
	mergeGroup(
		group: IEditorGroupView | GroupIdentifier,
		target: IEditorGroupView | GroupIdentifier,
		options?: IMergeGroupOptions,
	): boolean;
	mergeAllGroups(target: IEditorGroupView | GroupIdentifier): boolean;
	protected assertGroupView(
		group: IEditorGroupView | GroupIdentifier,
	): IEditorGroupView;
	createEditorDropTarget(
		container: unknown,
		delegate: IEditorDropTargetDelegate,
	): IDisposable;
	get minimumWidth(): number;
	get maximumWidth(): number;
	get minimumHeight(): number;
	get maximumHeight(): number;
	get snap(): boolean;
	get onDidChange(): Event<IViewSize | undefined>;
	readonly priority: LayoutPriority;
	private get gridSeparatorBorder();
	updateStyles(): void;
	protected createContentArea(
		parent: HTMLElement,
		options?: IEditorPartCreationOptions,
	): HTMLElement;
	private handleContextKeys;
	private setupDragAndDropSupport;
	centerLayout(active: boolean): void;
	isLayoutCentered(): boolean;
	private doCreateGridControl;
	private doCreateGridControlWithPreviousState;
	private doCreateGridControlWithState;
	private doSetGridWidget;
	private updateContainer;
	private notifyGroupIndexChange;
	notifyGroupsLabelChange(newLabel: string): void;
	private get isEmpty();
	setBoundarySashes(sashes: IBoundarySashes): void;
	layout(width: number, height: number, top: number, left: number): void;
	private doLayout;
	protected saveState(): void;
	protected loadState(): IEditorPartUIState | undefined;
	createState(): IEditorPartUIState;
	applyState(
		state: IEditorPartUIState | "empty",
		options?: IEditorGroupViewOptions,
	): Promise<void>;
	private doApplyState;
	private doApplyEmptyState;
	private doPrepareApplyState;
	private doApplyGridState;
	private onDidChangeMementoState;
	toJSON(): object;
	private disposeGroups;
	dispose(): void;
}
export declare class MainEditorPart extends EditorPart {
	constructor(
		editorPartsView: IEditorPartsView,
		instantiationService: IInstantiationService,
		themeService: IThemeService,
		configurationService: IConfigurationService,
		storageService: IStorageService,
		layoutService: IWorkbenchLayoutService,
		hostService: IHostService,
		contextKeyService: IContextKeyService,
	);
}
