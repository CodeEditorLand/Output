import "./media/interactive.css";

import * as DOM from "../../../../base/browser/dom.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import {
	ICodeEditorViewState,
	ICompositeCodeEditor,
} from "../../../../editor/common/editorCommon.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ITextResourceConfigurationService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { ITextEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { EditorPane } from "../../../browser/parts/editor/editorPane.js";
import {
	IEditorOpenContext,
	IEditorPaneScrollPosition,
	IEditorPaneSelectionChangeEvent,
	IEditorPaneWithScrolling,
} from "../../../common/editor.js";
import {
	IEditorGroup,
	IEditorGroupsService,
} from "../../../services/editor/common/editorGroupsService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import {
	INotebookEditorOptions,
	INotebookEditorViewState,
} from "../../notebook/browser/notebookBrowser.js";
import { NotebookEditorWidget } from "../../notebook/browser/notebookEditorWidget.js";
import { INotebookEditorService } from "../../notebook/browser/services/notebookEditorService.js";
import { INotebookExecutionStateService } from "../../notebook/common/notebookExecutionStateService.js";
import { INotebookKernelService } from "../../notebook/common/notebookKernelService.js";

import "./interactiveEditor.css";

import { ICodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { ReplEditorInput } from "./replEditorInput.js";

export interface InteractiveEditorViewState {
	readonly notebook?: INotebookEditorViewState;
	readonly input?: ICodeEditorViewState | null;
}
export interface InteractiveEditorOptions extends ITextEditorOptions {
	readonly viewState?: InteractiveEditorViewState;
}
export declare class ReplEditor
	extends EditorPane
	implements IEditorPaneWithScrolling
{
	private _rootElement;
	private _styleElement;
	private _notebookEditorContainer;
	private _notebookWidget;
	private _inputCellContainer;
	private _inputFocusIndicator;
	private _inputRunButtonContainer;
	private _inputEditorContainer;
	private _codeEditorWidget;
	private _notebookWidgetService;
	private _instantiationService;
	private _languageService;
	private _contextKeyService;
	private _configurationService;
	private _notebookKernelService;
	private _keybindingService;
	private _menuService;
	private _contextMenuService;
	private _editorGroupService;
	private _extensionService;
	private readonly _widgetDisposableStore;
	private _lastLayoutDimensions?;
	private _editorOptions;
	private _notebookOptions;
	private _editorMemento;
	private readonly _groupListener;
	private _runbuttonToolbar;
	private _hintElement;
	private _onDidFocusWidget;
	get onDidFocus(): Event<void>;
	private _onDidChangeSelection;
	readonly onDidChangeSelection: Event<IEditorPaneSelectionChangeEvent>;
	private _onDidChangeScroll;
	readonly onDidChangeScroll: Event<void>;
	constructor(
		group: IEditorGroup,
		telemetryService: ITelemetryService,
		themeService: IThemeService,
		storageService: IStorageService,
		instantiationService: IInstantiationService,
		notebookWidgetService: INotebookEditorService,
		contextKeyService: IContextKeyService,
		notebookKernelService: INotebookKernelService,
		languageService: ILanguageService,
		keybindingService: IKeybindingService,
		configurationService: IConfigurationService,
		menuService: IMenuService,
		contextMenuService: IContextMenuService,
		editorGroupService: IEditorGroupsService,
		textResourceConfigurationService: ITextResourceConfigurationService,
		notebookExecutionStateService: INotebookExecutionStateService,
		extensionService: IExtensionService,
	);
	private get inputCellContainerHeight();
	private get inputCellEditorHeight();
	protected createEditor(parent: HTMLElement): void;
	private _setupRunButtonToolbar;
	private _createLayoutStyles;
	private _computeEditorOptions;
	protected saveState(): void;
	getViewState(): InteractiveEditorViewState | undefined;
	private _saveEditorViewState;
	private _loadNotebookEditorViewState;
	setInput(
		input: ReplEditorInput,
		options: InteractiveEditorOptions | undefined,
		context: IEditorOpenContext,
		token: CancellationToken,
	): Promise<void>;
	setOptions(options: INotebookEditorOptions | undefined): void;
	private _toEditorPaneSelectionChangeReason;
	private _cellAtBottom;
	private _scrollIfNecessary;
	private _syncWithKernel;
	layout(dimension: DOM.Dimension, position: DOM.IDomPosition): void;
	private _layoutWidgets;
	private _validateDimension;
	private _hasConflictingDecoration;
	private _updateInputHint;
	getScrollPosition(): IEditorPaneScrollPosition;
	setScrollPosition(position: IEditorPaneScrollPosition): void;
	focus(): void;
	focusHistory(): void;
	protected setEditorVisible(visible: boolean): void;
	clearInput(): void;
	getControl(): ReplEditorControl & ICompositeCodeEditor;
	private getActiveCodeEditor;
}
export type ReplEditorControl = {
	activeCodeEditor: ICodeEditor | undefined;
	notebookEditor: NotebookEditorWidget | undefined;
};
export declare function isReplEditorControl(
	control: unknown,
): control is ReplEditorControl;
