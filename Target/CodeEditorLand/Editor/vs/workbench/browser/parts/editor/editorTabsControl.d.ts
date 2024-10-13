import "./media/editortabscontrol.css";

import { Dimension } from "../../../../base/browser/dom.js";
import { IManagedHoverTooltipMarkdownString } from "../../../../base/browser/ui/hover/hover.js";
import { ActionRunner, IAction } from "../../../../base/common/actions.js";
import { ResolvedKeybinding } from "../../../../base/common/keybindings.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { DraggedTreeItemsIdentifier } from "../../../../editor/common/services/treeViewsDnd.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { LocalSelectionTransfer } from "../../../../platform/dnd/browser/dnd.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import {
	IThemeService,
	Themable,
} from "../../../../platform/theme/common/themeService.js";
import {
	GroupIdentifier,
	IEditorCommandsContext,
	IEditorPartOptions,
	IToolbarActions,
} from "../../../common/editor.js";
import { IReadonlyEditorGroupModel } from "../../../common/editor/editorGroupModel.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IAuxiliaryEditorPart } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorResolverService } from "../../../services/editor/common/editorResolverService.js";
import { IHostService } from "../../../services/host/browser/host.js";
import {
	DraggedEditorGroupIdentifier,
	DraggedEditorIdentifier,
} from "../../dnd.js";
import {
	IEditorGroupsView,
	IEditorGroupView,
	IEditorPartsView,
	IInternalEditorOpenOptions,
} from "./editor.js";
import { IEditorTitleControlDimensions } from "./editorTitleControl.js";

export declare class EditorCommandsContextActionRunner extends ActionRunner {
	private context;
	constructor(context: IEditorCommandsContext);
	run(
		action: IAction,
		context?: {
			preserveFocus?: boolean;
		},
	): Promise<void>;
}
export interface IEditorTabsControl extends IDisposable {
	updateOptions(
		oldOptions: IEditorPartOptions,
		newOptions: IEditorPartOptions,
	): void;
	openEditor(
		editor: EditorInput,
		options?: IInternalEditorOpenOptions,
	): boolean;
	openEditors(editors: EditorInput[]): boolean;
	beforeCloseEditor(editor: EditorInput): void;
	closeEditor(editor: EditorInput): void;
	closeEditors(editors: EditorInput[]): void;
	moveEditor(
		editor: EditorInput,
		fromIndex: number,
		targetIndex: number,
		stickyStateChange: boolean,
	): void;
	pinEditor(editor: EditorInput): void;
	stickEditor(editor: EditorInput): void;
	unstickEditor(editor: EditorInput): void;
	setActive(isActive: boolean): void;
	updateEditorSelections(): void;
	updateEditorLabel(editor: EditorInput): void;
	updateEditorDirty(editor: EditorInput): void;
	layout(dimensions: IEditorTitleControlDimensions): Dimension;
	getHeight(): number;
}
export declare abstract class EditorTabsControl
	extends Themable
	implements IEditorTabsControl
{
	protected readonly parent: HTMLElement;
	protected readonly editorPartsView: IEditorPartsView;
	protected readonly groupsView: IEditorGroupsView;
	protected readonly groupView: IEditorGroupView;
	protected readonly tabsModel: IReadonlyEditorGroupModel;
	protected readonly contextMenuService: IContextMenuService;
	protected instantiationService: IInstantiationService;
	protected readonly contextKeyService: IContextKeyService;
	private readonly keybindingService;
	private readonly notificationService;
	protected quickInputService: IQuickInputService;
	private readonly editorResolverService;
	private readonly hostService;
	protected readonly editorTransfer: LocalSelectionTransfer<DraggedEditorIdentifier>;
	protected readonly groupTransfer: LocalSelectionTransfer<DraggedEditorGroupIdentifier>;
	protected readonly treeItemsTransfer: LocalSelectionTransfer<DraggedTreeItemsIdentifier>;
	private static readonly EDITOR_TAB_HEIGHT;
	protected editorActionsToolbarContainer: HTMLElement | undefined;
	private editorActionsToolbar;
	private readonly editorActionsToolbarDisposables;
	private readonly editorActionsDisposables;
	private readonly contextMenuContextKeyService;
	private resourceContext;
	private editorPinnedContext;
	private editorIsFirstContext;
	private editorIsLastContext;
	private editorStickyContext;
	private editorAvailableEditorIds;
	private editorCanSplitInGroupContext;
	private sideBySideEditorContext;
	private groupLockedContext;
	private renderDropdownAsChildElement;
	constructor(
		parent: HTMLElement,
		editorPartsView: IEditorPartsView,
		groupsView: IEditorGroupsView,
		groupView: IEditorGroupView,
		tabsModel: IReadonlyEditorGroupModel,
		contextMenuService: IContextMenuService,
		instantiationService: IInstantiationService,
		contextKeyService: IContextKeyService,
		keybindingService: IKeybindingService,
		notificationService: INotificationService,
		quickInputService: IQuickInputService,
		themeService: IThemeService,
		editorResolverService: IEditorResolverService,
		hostService: IHostService,
	);
	protected create(parent: HTMLElement): HTMLElement;
	private get editorActionsEnabled();
	protected createEditorActionsToolBar(
		parent: HTMLElement,
		classes: string[],
	): void;
	private handleEditorActionToolBarVisibility;
	private doCreateEditorActionsToolBar;
	private actionViewItemProvider;
	protected updateEditorActionsToolbar(): void;
	protected abstract prepareEditorActions(
		editorActions: IToolbarActions,
	): IToolbarActions;
	private getEditorPaneAwareContextKeyService;
	protected clearEditorActionsToolbar(): void;
	protected onGroupDragStart(e: DragEvent, element: HTMLElement): boolean;
	protected onGroupDragEnd(
		e: DragEvent,
		previousDragEvent: DragEvent | undefined,
		element: HTMLElement,
		isNewWindowOperation: boolean,
	): Promise<void>;
	protected maybeCreateAuxiliaryEditorPartAt(
		e: DragEvent,
		offsetElement: HTMLElement,
	): Promise<IAuxiliaryEditorPart | undefined>;
	protected isNewWindowOperation(e: DragEvent): boolean;
	protected isMoveOperation(
		e: DragEvent,
		sourceGroup: GroupIdentifier,
		sourceEditor?: EditorInput,
	): boolean;
	protected doFillResourceDataTransfers(
		editors: readonly EditorInput[],
		e: DragEvent,
		disableStandardTransfer: boolean,
	): boolean;
	protected onTabContextMenu(
		editor: EditorInput,
		e: Event,
		node: HTMLElement,
	): void;
	protected getKeybinding(action: IAction): ResolvedKeybinding | undefined;
	protected getKeybindingLabel(action: IAction): string | undefined;
	protected get tabHeight(): 35 | 22;
	protected getHoverTitle(
		editor: EditorInput,
	): string | IManagedHoverTooltipMarkdownString;
	protected updateTabHeight(): void;
	updateOptions(
		oldOptions: IEditorPartOptions,
		newOptions: IEditorPartOptions,
	): void;
	abstract openEditor(editor: EditorInput): boolean;
	abstract openEditors(editors: EditorInput[]): boolean;
	abstract beforeCloseEditor(editor: EditorInput): void;
	abstract closeEditor(editor: EditorInput): void;
	abstract closeEditors(editors: EditorInput[]): void;
	abstract moveEditor(
		editor: EditorInput,
		fromIndex: number,
		targetIndex: number,
	): void;
	abstract pinEditor(editor: EditorInput): void;
	abstract stickEditor(editor: EditorInput): void;
	abstract unstickEditor(editor: EditorInput): void;
	abstract setActive(isActive: boolean): void;
	abstract updateEditorSelections(): void;
	abstract updateEditorLabel(editor: EditorInput): void;
	abstract updateEditorDirty(editor: EditorInput): void;
	abstract layout(dimensions: IEditorTitleControlDimensions): Dimension;
	abstract getHeight(): number;
}
