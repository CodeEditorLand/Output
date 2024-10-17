import "./media/editorgroupview.css";

import { IBoundarySashes } from "../../../../base/browser/ui/sash/sash.js";
import { DisposableStore } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import {
	IDialogService,
	IFileDialogService,
} from "../../../../platform/dialogs/common/dialogs.js";
import { IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import {
	IThemeService,
	Themable,
} from "../../../../platform/theme/common/themeService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import {
	EditorsOrder,
	GroupIdentifier,
	IActiveEditorChangeEvent,
	IEditorCloseEvent,
	IEditorPane,
	IEditorWillMoveEvent,
	IEditorWillOpenEvent,
	IFindEditorOptions,
	IMatchEditorOptions,
	IUntypedEditorInput,
	IVisibleEditorPane,
} from "../../../common/editor.js";
import {
	IGroupModelChangeEvent,
	ISerializedEditorGroupModel,
} from "../../../common/editor/editorGroupModel.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import {
	IActiveEditorActions,
	ICloseAllEditorsOptions,
	ICloseEditorOptions,
	ICloseEditorsFilter,
	IEditorReplacement,
} from "../../../services/editor/common/editorGroupsService.js";
import { IEditorResolverService } from "../../../services/editor/common/editorResolverService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { IHostService } from "../../../services/host/browser/host.js";
import {
	EditorServiceImpl,
	IEditorGroupsView,
	IEditorGroupTitleHeight,
	IEditorGroupView,
	IEditorGroupViewOptions,
	IEditorPartsView,
	IInternalEditorOpenOptions,
	IInternalEditorTitleControlOptions,
	IInternalMoveCopyOptions,
} from "./editor.js";

export declare class EditorGroupView
	extends Themable
	implements IEditorGroupView
{
	private readonly editorPartsView;
	readonly groupsView: IEditorGroupsView;
	private groupsLabel;
	private _index;
	private readonly instantiationService;
	private readonly contextKeyService;
	private readonly telemetryService;
	private readonly keybindingService;
	private readonly menuService;
	private readonly contextMenuService;
	private readonly fileDialogService;
	private readonly editorService;
	private readonly filesConfigurationService;
	private readonly uriIdentityService;
	private readonly logService;
	private readonly editorResolverService;
	private readonly hostService;
	private readonly dialogService;
	private readonly fileService;
	static createNew(
		editorPartsView: IEditorPartsView,
		groupsView: IEditorGroupsView,
		groupsLabel: string,
		groupIndex: number,
		instantiationService: IInstantiationService,
		options?: IEditorGroupViewOptions,
	): IEditorGroupView;
	static createFromSerialized(
		serialized: ISerializedEditorGroupModel,
		editorPartsView: IEditorPartsView,
		groupsView: IEditorGroupsView,
		groupsLabel: string,
		groupIndex: number,
		instantiationService: IInstantiationService,
		options?: IEditorGroupViewOptions,
	): IEditorGroupView;
	static createCopy(
		copyFrom: IEditorGroupView,
		editorPartsView: IEditorPartsView,
		groupsView: IEditorGroupsView,
		groupsLabel: string,
		groupIndex: number,
		instantiationService: IInstantiationService,
		options?: IEditorGroupViewOptions,
	): IEditorGroupView;
	/**
	 * Access to the context key service scoped to this editor group.
	 */
	readonly scopedContextKeyService: IContextKeyService;
	private readonly _onDidFocus;
	readonly onDidFocus: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onWillDispose;
	readonly onWillDispose: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidModelChange;
	readonly onDidModelChange: import("../../../workbench.web.main.internal.js").Event<IGroupModelChangeEvent>;
	private readonly _onDidActiveEditorChange;
	readonly onDidActiveEditorChange: import("../../../workbench.web.main.internal.js").Event<IActiveEditorChangeEvent>;
	private readonly _onDidOpenEditorFail;
	readonly onDidOpenEditorFail: import("../../../workbench.web.main.internal.js").Event<EditorInput>;
	private readonly _onWillCloseEditor;
	readonly onWillCloseEditor: import("../../../workbench.web.main.internal.js").Event<IEditorCloseEvent>;
	private readonly _onDidCloseEditor;
	readonly onDidCloseEditor: import("../../../workbench.web.main.internal.js").Event<IEditorCloseEvent>;
	private readonly _onWillMoveEditor;
	readonly onWillMoveEditor: import("../../../workbench.web.main.internal.js").Event<IEditorWillMoveEvent>;
	private readonly _onWillOpenEditor;
	readonly onWillOpenEditor: import("../../../workbench.web.main.internal.js").Event<IEditorWillOpenEvent>;
	private readonly model;
	private active;
	private lastLayout;
	private readonly scopedInstantiationService;
	private readonly resourceContext;
	private readonly titleContainer;
	private readonly titleControl;
	private readonly progressBar;
	private readonly editorContainer;
	private readonly editorPane;
	private readonly disposedEditorsWorker;
	private readonly mapEditorToPendingConfirmation;
	private readonly containerToolBarMenuDisposable;
	private readonly whenRestoredPromise;
	readonly whenRestored: Promise<void>;
	constructor(
		from: IEditorGroupView | ISerializedEditorGroupModel | null,
		editorPartsView: IEditorPartsView,
		groupsView: IEditorGroupsView,
		groupsLabel: string,
		_index: number,
		options: IEditorGroupViewOptions | undefined,
		instantiationService: IInstantiationService,
		contextKeyService: IContextKeyService,
		themeService: IThemeService,
		telemetryService: ITelemetryService,
		keybindingService: IKeybindingService,
		menuService: IMenuService,
		contextMenuService: IContextMenuService,
		fileDialogService: IFileDialogService,
		editorService: EditorServiceImpl,
		filesConfigurationService: IFilesConfigurationService,
		uriIdentityService: IUriIdentityService,
		logService: ILogService,
		editorResolverService: IEditorResolverService,
		hostService: IHostService,
		dialogService: IDialogService,
		fileService: IFileService,
	);
	private handleGroupContextKeys;
	private registerContainerListeners;
	private createContainerToolbar;
	private createContainerContextMenu;
	private onShowContainerContextMenu;
	private doTrackFocus;
	private updateContainer;
	private updateTitleContainer;
	private restoreEditors;
	private registerListeners;
	private onDidGroupModelChange;
	private onDidOpenEditor;
	private handleOnDidCloseEditor;
	private canDispose;
	private toResourceTelemetryDescriptor;
	private toEditorTelemetryDescriptor;
	private onWillDisposeEditor;
	private handleDisposedEditors;
	private onDidChangeEditorPartOptions;
	private onDidChangeEditorDirty;
	private onDidChangeEditorTransient;
	private onDidChangeEditorLabel;
	private onDidChangeEditorSelection;
	private onDidVisibilityChange;
	private onDidGainFocus;
	get index(): number;
	get label(): string;
	get ariaLabel(): string;
	private _disposed;
	get disposed(): boolean;
	get isEmpty(): boolean;
	get titleHeight(): IEditorGroupTitleHeight;
	notifyIndexChanged(newIndex: number): void;
	notifyLabelChanged(newLabel: string): void;
	setActive(isActive: boolean): void;
	get id(): GroupIdentifier;
	get windowId(): number;
	get editors(): EditorInput[];
	get count(): number;
	get stickyCount(): number;
	get activeEditorPane(): IVisibleEditorPane | undefined;
	get activeEditor(): EditorInput | null;
	get selectedEditors(): EditorInput[];
	get previewEditor(): EditorInput | null;
	isPinned(editorOrIndex: EditorInput | number): boolean;
	isSticky(editorOrIndex: EditorInput | number): boolean;
	isSelected(editor: EditorInput): boolean;
	isTransient(editorOrIndex: EditorInput | number): boolean;
	isActive(editor: EditorInput | IUntypedEditorInput): boolean;
	setSelection(
		activeSelectedEditor: EditorInput,
		inactiveSelectedEditors: EditorInput[],
	): Promise<void>;
	contains(
		candidate: EditorInput | IUntypedEditorInput,
		options?: IMatchEditorOptions,
	): boolean;
	getEditors(
		order: EditorsOrder,
		options?: {
			excludeSticky?: boolean;
		},
	): EditorInput[];
	findEditors(resource: URI, options?: IFindEditorOptions): EditorInput[];
	getEditorByIndex(index: number): EditorInput | undefined;
	getIndexOfEditor(editor: EditorInput): number;
	isFirst(editor: EditorInput): boolean;
	isLast(editor: EditorInput): boolean;
	focus(): void;
	pinEditor(candidate?: EditorInput | undefined): void;
	stickEditor(candidate?: EditorInput | undefined): void;
	unstickEditor(candidate?: EditorInput | undefined): void;
	private doStickEditor;
	openEditor(
		editor: EditorInput,
		options?: IEditorOptions,
		internalOptions?: IInternalEditorOpenOptions,
	): Promise<IEditorPane | undefined>;
	private doOpenEditor;
	private doShowEditor;
	openEditors(
		editors: {
			editor: EditorInput;
			options?: IEditorOptions;
		}[],
	): Promise<IEditorPane | undefined>;
	moveEditors(
		editors: {
			editor: EditorInput;
			options?: IEditorOptions;
		}[],
		target: EditorGroupView,
	): boolean;
	moveEditor(
		editor: EditorInput,
		target: EditorGroupView,
		options?: IEditorOptions,
		internalOptions?: IInternalMoveCopyOptions,
	): boolean;
	private doMoveEditorInsideGroup;
	private doMoveOrCopyEditorAcrossGroups;
	copyEditors(
		editors: {
			editor: EditorInput;
			options?: IEditorOptions;
		}[],
		target: EditorGroupView,
	): void;
	copyEditor(
		editor: EditorInput,
		target: EditorGroupView,
		options?: IEditorOptions,
		internalOptions?: IInternalEditorTitleControlOptions,
	): void;
	closeEditor(
		editor?: EditorInput | undefined,
		options?: ICloseEditorOptions,
	): Promise<boolean>;
	private doCloseEditorWithConfirmationHandling;
	private doCloseEditor;
	private doCloseActiveEditor;
	private shouldRestoreFocus;
	private doCloseInactiveEditor;
	private handleCloseConfirmation;
	private doHandleCloseConfirmation;
	private shouldConfirmClose;
	closeEditors(
		args: EditorInput[] | ICloseEditorsFilter,
		options?: ICloseEditorOptions,
	): Promise<boolean>;
	private doGetEditorsToClose;
	private doCloseEditors;
	closeAllEditors(options?: ICloseAllEditorsOptions): Promise<boolean>;
	private doCloseAllEditors;
	replaceEditors(editors: EditorReplacement[]): Promise<void>;
	get isLocked(): boolean;
	lock(locked: boolean): void;
	createEditorActions(disposables: DisposableStore): IActiveEditorActions;
	updateStyles(): void;
	readonly element: HTMLElement;
	get minimumWidth(): number;
	get minimumHeight(): number;
	get maximumWidth(): number;
	get maximumHeight(): number;
	get proportionalLayout(): boolean;
	private _onDidChange;
	readonly onDidChange: import("../../../workbench.web.main.internal.js").Event<
		| {
				width: number;
				height: number;
		  }
		| undefined
	>;
	layout(width: number, height: number, top: number, left: number): void;
	relayout(): void;
	setBoundarySashes(sashes: IBoundarySashes): void;
	toJSON(): ISerializedEditorGroupModel;
	dispose(): void;
}
export interface EditorReplacement extends IEditorReplacement {
	readonly editor: EditorInput;
	readonly replacement: EditorInput;
	readonly options?: IEditorOptions;
}
