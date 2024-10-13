import { IDisposable } from "../../../../base/common/lifecycle.js";
import {
	ContextKeyValue,
	IContextKey,
	IContextKeyService,
	RawContextKey,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { GroupIdentifier } from "../../../common/editor.js";
import { IAuxiliaryWindowService } from "../../../services/auxiliaryWindow/browser/auxiliaryWindowService.js";
import {
	EditorGroupLayout,
	GroupDirection,
	GroupOrientation,
	GroupsArrangement,
	GroupsOrder,
	IAuxiliaryEditorPart,
	IEditorDropTargetDelegate,
	IEditorGroupContextKeyProvider,
	IEditorGroupsService,
	IEditorPart,
	IEditorSideGroup,
	IEditorWorkingSet,
	IEditorWorkingSetOptions,
	IFindGroupScope,
	IMergeGroupOptions,
} from "../../../services/editor/common/editorGroupsService.js";
import { MultiWindowParts } from "../../part.js";
import { IAuxiliaryEditorPartOpenOptions } from "./auxiliaryEditorPart.js";
import { IEditorGroupView, IEditorPartsView } from "./editor.js";
import { EditorPart, MainEditorPart } from "./editorPart.js";

export declare class EditorParts
	extends MultiWindowParts<EditorPart>
	implements IEditorGroupsService, IEditorPartsView
{
	protected readonly instantiationService: IInstantiationService;
	private readonly storageService;
	private readonly auxiliaryWindowService;
	private readonly contextKeyService;
	readonly _serviceBrand: undefined;
	readonly mainPart: MainEditorPart;
	private mostRecentActiveParts;
	constructor(
		instantiationService: IInstantiationService,
		storageService: IStorageService,
		themeService: IThemeService,
		auxiliaryWindowService: IAuxiliaryWindowService,
		contextKeyService: IContextKeyService,
	);
	private registerListeners;
	protected createMainEditorPart(): MainEditorPart;
	private readonly mapPartToInstantiationService;
	getScopedInstantiationService(part: IEditorPart): IInstantiationService;
	private readonly _onDidCreateAuxiliaryEditorPart;
	readonly onDidCreateAuxiliaryEditorPart: import("../../../workbench.web.main.internal.js").Event<IAuxiliaryEditorPart>;
	createAuxiliaryEditorPart(
		options?: IAuxiliaryEditorPartOpenOptions,
	): Promise<IAuxiliaryEditorPart>;
	registerPart(part: EditorPart): IDisposable;
	protected unregisterPart(part: EditorPart): void;
	private registerEditorPartListeners;
	private doUpdateMostRecentActive;
	private getGroupsLabel;
	getPart(group: IEditorGroupView | GroupIdentifier): EditorPart;
	getPart(element: HTMLElement): EditorPart;
	private static readonly EDITOR_PARTS_UI_STATE_STORAGE_KEY;
	private readonly workspaceMemento;
	private _isReady;
	get isReady(): boolean;
	private readonly whenReadyPromise;
	readonly whenReady: Promise<void>;
	private readonly whenRestoredPromise;
	readonly whenRestored: Promise<void>;
	private restoreParts;
	private loadState;
	protected saveState(): void;
	private createState;
	private restoreState;
	get hasRestorableState(): boolean;
	private onDidChangeMementoState;
	private applyState;
	private static readonly EDITOR_WORKING_SETS_STORAGE_KEY;
	private editorWorkingSets;
	saveWorkingSet(name: string): IEditorWorkingSet;
	getWorkingSets(): IEditorWorkingSet[];
	deleteWorkingSet(workingSet: IEditorWorkingSet): void;
	applyWorkingSet(
		workingSet: IEditorWorkingSet | "empty",
		options?: IEditorWorkingSetOptions,
	): Promise<boolean>;
	private indexOfWorkingSet;
	private saveWorkingSets;
	private readonly _onDidActiveGroupChange;
	readonly onDidChangeActiveGroup: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidAddGroup;
	readonly onDidAddGroup: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidRemoveGroup;
	readonly onDidRemoveGroup: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidMoveGroup;
	readonly onDidMoveGroup: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidActivateGroup;
	readonly onDidActivateGroup: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidChangeGroupIndex;
	readonly onDidChangeGroupIndex: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidChangeGroupLocked;
	readonly onDidChangeGroupLocked: import("../../../workbench.web.main.internal.js").Event<IEditorGroupView>;
	private readonly _onDidChangeGroupMaximized;
	readonly onDidChangeGroupMaximized: import("../../../workbench.web.main.internal.js").Event<boolean>;
	get activeGroup(): IEditorGroupView;
	get sideGroup(): IEditorSideGroup;
	get groups(): IEditorGroupView[];
	get count(): number;
	getGroups(order?: GroupsOrder): IEditorGroupView[];
	getGroup(identifier: GroupIdentifier): IEditorGroupView | undefined;
	private assertGroupView;
	activateGroup(group: IEditorGroupView | GroupIdentifier): IEditorGroupView;
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
		group?: IEditorGroupView | GroupIdentifier,
	): void;
	toggleMaximizeGroup(group?: IEditorGroupView | GroupIdentifier): void;
	toggleExpandGroup(group?: IEditorGroupView | GroupIdentifier): void;
	restoreGroup(group: IEditorGroupView | GroupIdentifier): IEditorGroupView;
	applyLayout(layout: EditorGroupLayout): void;
	getLayout(): EditorGroupLayout;
	get orientation(): GroupOrientation;
	setGroupOrientation(orientation: GroupOrientation): void;
	findGroup(
		scope: IFindGroupScope,
		source?: IEditorGroupView | GroupIdentifier,
		wrap?: boolean,
	): IEditorGroupView | undefined;
	addGroup(
		location: IEditorGroupView | GroupIdentifier,
		direction: GroupDirection,
	): IEditorGroupView;
	removeGroup(group: IEditorGroupView | GroupIdentifier): void;
	moveGroup(
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
	copyGroup(
		group: IEditorGroupView | GroupIdentifier,
		location: IEditorGroupView | GroupIdentifier,
		direction: GroupDirection,
	): IEditorGroupView;
	createEditorDropTarget(
		container: HTMLElement,
		delegate: IEditorDropTargetDelegate,
	): IDisposable;
	private readonly globalContextKeys;
	private readonly scopedContextKeys;
	private registerGroupsContextKeyListeners;
	private updateGlobalContextKeys;
	bind<T extends ContextKeyValue>(
		contextKey: RawContextKey<T>,
		group: IEditorGroupView,
	): IContextKey<T>;
	private readonly contextKeyProviders;
	private readonly registeredContextKeys;
	registerContextKeyProvider<T extends ContextKeyValue>(
		provider: IEditorGroupContextKeyProvider<T>,
	): IDisposable;
	private readonly contextKeyProviderDisposables;
	private registerGroupContextKeyProvidersListeners;
	private updateRegisteredContextKey;
	get partOptions(): import("../../../common/editor.js").IEditorPartOptions;
	get onDidChangeEditorPartOptions(): import("../../../workbench.web.main.internal.js").Event<
		import("../../../common/editor.js").IEditorPartOptionsChangeEvent
	>;
}
