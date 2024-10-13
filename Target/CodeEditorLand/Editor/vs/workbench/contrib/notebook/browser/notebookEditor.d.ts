import * as DOM from "../../../../base/browser/dom.js";
import { IActionViewItem } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { IActionViewItemOptions } from "../../../../base/browser/ui/actionbar/actionViewItems.js";
import { IAction } from "../../../../base/common/actions.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { ITextResourceConfigurationService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IEditorProgressService } from "../../../../platform/progress/common/progress.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import {
	IEditorOpenContext,
	IEditorPaneScrollPosition,
	IEditorPaneSelection,
	IEditorPaneSelectionChangeEvent,
	IEditorPaneWithScrolling,
} from "../../../common/editor.js";
import {
	IEditorGroup,
	IEditorGroupsService,
} from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IPreferencesService } from "../../../services/preferences/common/preferences.js";
import { IWorkingCopyBackupService } from "../../../services/workingCopy/common/workingCopyBackup.js";
import { IExtensionsWorkbenchService } from "../../extensions/common/extensions.js";
import { NotebookTextModel } from "../common/model/notebookTextModel.js";
import { NotebookEditorInput } from "../common/notebookEditorInput.js";
import { INotebookService } from "../common/notebookService.js";
import { INotebookEditorWorkerService } from "../common/services/notebookWorkerService.js";
import {
	INotebookEditorOptions,
	INotebookEditorPane,
	INotebookEditorViewState,
} from "./notebookBrowser.js";
import { NotebookEditorWidget } from "./notebookEditorWidget.js";
import { INotebookEditorService } from "./services/notebookEditorService.js";

export declare class NotebookEditor
	extends EditorPane
	implements INotebookEditorPane, IEditorPaneWithScrolling
{
	private readonly _instantiationService;
	private readonly _editorService;
	private readonly _editorGroupService;
	private readonly _notebookWidgetService;
	private readonly _contextKeyService;
	private readonly _fileService;
	private readonly _editorProgressService;
	private readonly _notebookService;
	private readonly _extensionsWorkbenchService;
	private readonly _workingCopyBackupService;
	private readonly logService;
	private readonly _notebookEditorWorkerService;
	private readonly _preferencesService;
	static readonly ID: string;
	private readonly _editorMemento;
	private readonly _groupListener;
	private readonly _widgetDisposableStore;
	private _widget;
	private _rootElement;
	private _pagePosition?;
	private readonly _inputListener;
	private readonly _onDidFocusWidget;
	get onDidFocus(): Event<void>;
	private readonly _onDidBlurWidget;
	get onDidBlur(): Event<void>;
	private readonly _onDidChangeModel;
	readonly onDidChangeModel: Event<void>;
	private readonly _onDidChangeSelection;
	readonly onDidChangeSelection: Event<IEditorPaneSelectionChangeEvent>;
	protected readonly _onDidChangeScroll: Emitter<void>;
	readonly onDidChangeScroll: Event<void>;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		_instantiationService: IInstantiationService,
		storageService: IStorageService,
		_editorService: IEditorService,
		_editorGroupService: IEditorGroupsService,
		_notebookWidgetService: INotebookEditorService,
		_contextKeyService: IContextKeyService,
		_fileService: IFileService,
		configurationService: ITextResourceConfigurationService,
		_editorProgressService: IEditorProgressService,
		_notebookService: INotebookService,
		_extensionsWorkbenchService: IExtensionsWorkbenchService,
		_workingCopyBackupService: IWorkingCopyBackupService,
		logService: ILogService,
		_notebookEditorWorkerService: INotebookEditorWorkerService,
		_preferencesService: IPreferencesService,
	);
	private _onDidChangeFileSystemProvider;
	private _onDidChangeInputCapabilities;
	private _updateReadonly;
	get textModel(): NotebookTextModel | undefined;
	get minimumWidth(): number;
	get maximumWidth(): number;
	set minimumWidth(value: number);
	set maximumWidth(value: number);
	get scopedContextKeyService(): IContextKeyService | undefined;
	protected createEditor(parent: HTMLElement): void;
	getActionViewItem(
		action: IAction,
		options: IActionViewItemOptions,
	): IActionViewItem | undefined;
	getControl(): NotebookEditorWidget | undefined;
	setVisible(visible: boolean): void;
	protected setEditorVisible(visible: boolean): void;
	focus(): void;
	hasFocus(): boolean;
	setInput(
		input: NotebookEditorInput,
		options: INotebookEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
		noRetry?: boolean,
	): Promise<void>;
	private _handlePerfMark;
	private _handlePromptRecommendations;
	clearInput(): void;
	setOptions(options: INotebookEditorOptions | undefined): void;
	protected saveState(): void;
	getViewState(): INotebookEditorViewState | undefined;
	getSelection(): IEditorPaneSelection | undefined;
	getScrollPosition(): IEditorPaneScrollPosition;
	setScrollPosition(scrollPosition: IEditorPaneScrollPosition): void;
	private _saveEditorViewState;
	private _loadNotebookEditorViewState;
	layout(dimension: DOM.Dimension, position: DOM.IDomPosition): void;
}
