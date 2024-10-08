var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import * as dom from "../../../../base/browser/dom.js";
import { DEFAULT_FONT_FAMILY } from "../../../../base/browser/fonts.js";
import { IHistoryNavigationWidget } from "../../../../base/browser/history.js";
import { StandardKeyboardEvent } from "../../../../base/browser/keyboardEvent.js";
import * as aria from "../../../../base/browser/ui/aria/aria.js";
import { Button } from "../../../../base/browser/ui/button/button.js";
import { IHoverDelegate } from "../../../../base/browser/ui/hover/hoverDelegate.js";
import { createInstantHoverDelegate } from "../../../../base/browser/ui/hover/hoverDelegateFactory.js";
import { renderLabelWithIcons } from "../../../../base/browser/ui/iconLabel/iconLabels.js";
import { ProgressBar } from "../../../../base/browser/ui/progressbar/progressbar.js";
import { IAction } from "../../../../base/common/actions.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { HistoryNavigator2 } from "../../../../base/common/history.js";
import { KeyCode } from "../../../../base/common/keyCodes.js";
import { Disposable, DisposableStore, IDisposable, MutableDisposable } from "../../../../base/common/lifecycle.js";
import { ResourceSet } from "../../../../base/common/map.js";
import { basename, dirname } from "../../../../base/common/path.js";
import { isMacintosh } from "../../../../base/common/platform.js";
import { URI } from "../../../../base/common/uri.js";
import { IEditorConstructionOptions } from "../../../../editor/browser/config/editorConfiguration.js";
import { EditorExtensionsRegistry } from "../../../../editor/browser/editorExtensions.js";
import { CodeEditorWidget } from "../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";
import { EditorOptions } from "../../../../editor/common/config/editorOptions.js";
import { IDimension } from "../../../../editor/common/core/dimension.js";
import { IPosition } from "../../../../editor/common/core/position.js";
import { Range } from "../../../../editor/common/core/range.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { CopyPasteController } from "../../../../editor/contrib/dropOrPasteInto/browser/copyPasteController.js";
import { ContentHoverController } from "../../../../editor/contrib/hover/browser/contentHoverController.js";
import { GlyphHoverController } from "../../../../editor/contrib/hover/browser/glyphHoverController.js";
import { SuggestController } from "../../../../editor/contrib/suggest/browser/suggestController.js";
import { localize } from "../../../../nls.js";
import { IAccessibilityService } from "../../../../platform/accessibility/common/accessibility.js";
import { DropdownWithPrimaryActionViewItem, IDropdownWithPrimaryActionViewItemOptions } from "../../../../platform/actions/browser/dropdownWithPrimaryActionViewItem.js";
import { createAndFillInActionBarActions, IMenuEntryActionViewItemOptions, MenuEntryActionViewItem } from "../../../../platform/actions/browser/menuEntryActionViewItem.js";
import { HiddenItemStrategy, MenuWorkbenchToolBar } from "../../../../platform/actions/browser/toolbar.js";
import { IMenuService, MenuId, MenuItemAction } from "../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKey, IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { FileKind, IFileService } from "../../../../platform/files/common/files.js";
import { registerAndCreateHistoryNavigationContext } from "../../../../platform/history/browser/contextScopedHistoryWidget.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ServiceCollection } from "../../../../platform/instantiation/common/serviceCollection.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { WorkbenchList } from "../../../../platform/list/browser/listService.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { ResourceLabels } from "../../../browser/labels.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { AccessibilityVerbositySettingId } from "../../accessibility/browser/accessibilityConfiguration.js";
import { AccessibilityCommandId } from "../../accessibility/common/accessibilityCommands.js";
import { getSimpleCodeEditorWidgetOptions, getSimpleEditorOptions, setupSimpleEditorSelectionStyling } from "../../codeEditor/browser/simpleEditorOptions.js";
import { ChatAgentLocation, IChatAgentService } from "../common/chatAgents.js";
import { CONTEXT_CHAT_INPUT_CURSOR_AT_TOP, CONTEXT_CHAT_INPUT_HAS_FOCUS, CONTEXT_CHAT_INPUT_HAS_TEXT, CONTEXT_IN_CHAT_INPUT } from "../common/chatContextKeys.js";
import { ChatEditingSessionState, IChatEditingSession, WorkingSetEntryState } from "../common/chatEditingService.js";
import { IChatRequestVariableEntry } from "../common/chatModel.js";
import { IChatFollowup } from "../common/chatService.js";
import { IChatResponseViewModel } from "../common/chatViewModel.js";
import { IChatHistoryEntry, IChatInputState, IChatWidgetHistoryService } from "../common/chatWidgetHistoryService.js";
import { ILanguageModelChatMetadata, ILanguageModelsService } from "../common/languageModels.js";
import { CancelAction, ChatModelPickerActionId, ChatSubmitSecondaryAgentAction, IChatExecuteActionContext, SubmitAction } from "./actions/chatExecuteActions.js";
import { IChatWidget } from "./chat.js";
import { ChatAttachmentModel } from "./chatAttachmentModel.js";
import { IDisposableReference } from "./chatContentParts/chatCollections.js";
import { CollapsibleListPool, IChatCollapsibleListItem } from "./chatContentParts/chatReferencesContentPart.js";
import { ChatEditingAcceptAllAction, ChatEditingDiscardAllAction, ChatEditingShowChangesAction } from "./chatEditingActions.js";
import { ChatFollowups } from "./chatFollowups.js";
import { IChatViewState } from "./chatWidget.js";
const $ = dom.$;
const INPUT_EDITOR_MAX_HEIGHT = 250;
let ChatInputPart = class extends Disposable {
  constructor(location, options, getContribsInputState, historyService, modelService, instantiationService, contextKeyService, configurationService, keybindingService, accessibilityService, languageModelsService, logService, hoverService, fileService, commandService, editorService) {
    super();
    this.location = location;
    this.options = options;
    this.historyService = historyService;
    this.modelService = modelService;
    this.instantiationService = instantiationService;
    this.contextKeyService = contextKeyService;
    this.configurationService = configurationService;
    this.keybindingService = keybindingService;
    this.accessibilityService = accessibilityService;
    this.languageModelsService = languageModelsService;
    this.logService = logService;
    this.hoverService = hoverService;
    this.fileService = fileService;
    this.commandService = commandService;
    this.editorService = editorService;
    this._attachmentModel = this._register(new ChatAttachmentModel());
    this.getInputState = () => {
      return {
        ...getContribsInputState(),
        chatContextAttachments: this._attachmentModel.attachments
      };
    };
    this.inputEditorMaxHeight = this.options.renderStyle === "compact" ? INPUT_EDITOR_MAX_HEIGHT / 3 : INPUT_EDITOR_MAX_HEIGHT;
    this.inputEditorHasText = CONTEXT_CHAT_INPUT_HAS_TEXT.bindTo(contextKeyService);
    this.chatCursorAtTop = CONTEXT_CHAT_INPUT_CURSOR_AT_TOP.bindTo(contextKeyService);
    this.inputEditorHasFocus = CONTEXT_CHAT_INPUT_HAS_FOCUS.bindTo(contextKeyService);
    this.history = this.loadHistory();
    this._register(this.historyService.onDidClearHistory(() => this.history = new HistoryNavigator2([{ text: "" }], 50, historyKeyFn)));
    this._register(this.configurationService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(AccessibilityVerbositySettingId.Chat)) {
        this.inputEditor.updateOptions({ ariaLabel: this._getAriaLabel() });
      }
    }));
    this._chatEditsListPool = this._register(this.instantiationService.createInstance(CollapsibleListPool, this._onDidChangeVisibility.event, MenuId.ChatEditingSessionWidgetToolbar));
  }
  static {
    __name(this, "ChatInputPart");
  }
  static INPUT_SCHEME = "chatSessionInput";
  static _counter = 0;
  _onDidLoadInputState = this._register(new Emitter());
  onDidLoadInputState = this._onDidLoadInputState.event;
  _onDidChangeHeight = this._register(new Emitter());
  onDidChangeHeight = this._onDidChangeHeight.event;
  _onDidFocus = this._register(new Emitter());
  onDidFocus = this._onDidFocus.event;
  _onDidBlur = this._register(new Emitter());
  onDidBlur = this._onDidBlur.event;
  _onDidChangeContext = this._register(new Emitter());
  onDidChangeContext = this._onDidChangeContext.event;
  _onDidAcceptFollowup = this._register(new Emitter());
  onDidAcceptFollowup = this._onDidAcceptFollowup.event;
  _attachmentModel;
  get attachmentModel() {
    return this._attachmentModel;
  }
  _indexOfLastAttachedContextDeletedWithKeyboard = -1;
  _onDidChangeVisibility = this._register(new Emitter());
  _contextResourceLabels = this.instantiationService.createInstance(ResourceLabels, { onDidChangeVisibility: this._onDidChangeVisibility.event });
  inputEditorMaxHeight;
  inputEditorHeight = 0;
  container;
  inputSideToolbarContainer;
  followupsContainer;
  followupsDisposables = this._register(new DisposableStore());
  attachedContextContainer;
  attachedContextDisposables = this._register(new DisposableStore());
  chatEditingSessionWidgetContainer;
  _inputPartHeight = 0;
  get inputPartHeight() {
    return this._inputPartHeight;
  }
  _followupsHeight = 0;
  get followupsHeight() {
    return this._followupsHeight;
  }
  _inputEditor;
  _inputEditorElement;
  executeToolbar;
  inputActionsToolbar;
  get inputEditor() {
    return this._inputEditor;
  }
  history;
  historyNavigationBackwardsEnablement;
  historyNavigationForewardsEnablement;
  inputModel;
  inputEditorHasText;
  chatCursorAtTop;
  inputEditorHasFocus;
  _waitForPersistedLanguageModel = this._register(new MutableDisposable());
  _onDidChangeCurrentLanguageModel = new Emitter();
  _currentLanguageModel;
  get currentLanguageModel() {
    return this._currentLanguageModel;
  }
  cachedDimensions;
  cachedExecuteToolbarWidth;
  cachedInputToolbarWidth;
  inputUri = URI.parse(`${ChatInputPart.INPUT_SCHEME}:input-${ChatInputPart._counter++}`);
  _chatEditsActionsDisposables = this._register(new DisposableStore());
  _chatEditsDisposables = this._register(new DisposableStore());
  _chatEditsProgress;
  _chatEditsListPool;
  _chatEditList;
  get selectedElements() {
    const edits = [];
    const editsList = this._chatEditList?.object;
    const selectedElements = editsList?.getSelectedElements() ?? [];
    for (const element of selectedElements) {
      if (element.kind === "reference" && URI.isUri(element.reference)) {
        edits.push(element.reference);
      }
    }
    return edits;
  }
  getInputState;
  setCurrentLanguageModelToDefault() {
    const defaultLanguageModel = this.languageModelsService.getLanguageModelIds().find((id) => this.languageModelsService.lookupLanguageModel(id)?.isDefault);
    const hasUserSelectableLanguageModels = this.languageModelsService.getLanguageModelIds().find((id) => {
      const model = this.languageModelsService.lookupLanguageModel(id);
      return model?.isUserSelectable && !model.isDefault;
    });
    this._currentLanguageModel = hasUserSelectableLanguageModels ? defaultLanguageModel : void 0;
  }
  setCurrentLanguageModelByUser(modelId) {
    this._currentLanguageModel = modelId;
    this._waitForPersistedLanguageModel.clear();
    if (this.cachedDimensions) {
      this.layout(this.cachedDimensions.height, this.cachedDimensions.width);
    }
  }
  loadHistory() {
    const history = this.historyService.getHistory(this.location);
    if (history.length === 0) {
      history.push({ text: "" });
    }
    return new HistoryNavigator2(history, 50, historyKeyFn);
  }
  _getAriaLabel() {
    const verbose = this.configurationService.getValue(AccessibilityVerbositySettingId.Chat);
    if (verbose) {
      const kbLabel = this.keybindingService.lookupKeybinding(AccessibilityCommandId.OpenAccessibilityHelp)?.getLabel();
      return kbLabel ? localize("actions.chat.accessibiltyHelp", "Chat Input,  Type to ask questions or type / for topics, press enter to send out the request. Use {0} for Chat Accessibility Help.", kbLabel) : localize("chatInput.accessibilityHelpNoKb", "Chat Input,  Type code here and press Enter to run. Use the Chat Accessibility Help command for more information.");
    }
    return localize("chatInput", "Chat Input");
  }
  initForNewChatModel(state) {
    this.history = this.loadHistory();
    this.history.add({
      text: state.inputValue ?? this.history.current().text,
      state: state.inputState ?? this.getInputState()
    });
    const attachments = state.inputState?.chatContextAttachments ?? [];
    this._attachmentModel.clearAndSetContext(...attachments);
    if (state.inputValue) {
      this.setValue(state.inputValue, false);
    }
    if (state.selectedLanguageModelId) {
      const model = this.languageModelsService.lookupLanguageModel(state.selectedLanguageModelId);
      if (model) {
        this._currentLanguageModel = state.selectedLanguageModelId;
        this._onDidChangeCurrentLanguageModel.fire(this._currentLanguageModel);
      } else {
        this._waitForPersistedLanguageModel.value = this.languageModelsService.onDidChangeLanguageModels((e) => {
          const persistedModel = e.added?.find((m) => m.identifier === state.selectedLanguageModelId);
          if (persistedModel) {
            this._waitForPersistedLanguageModel.clear();
            if (persistedModel.metadata.isUserSelectable) {
              this._currentLanguageModel = state.selectedLanguageModelId;
              this._onDidChangeCurrentLanguageModel.fire(this._currentLanguageModel);
            }
          }
        });
      }
    }
  }
  logInputHistory() {
    const historyStr = [...this.history].map((entry) => JSON.stringify(entry)).join("\n");
    this.logService.info(`[${this.location}] Chat input history:`, historyStr);
  }
  setVisible(visible) {
    this._onDidChangeVisibility.fire(visible);
  }
  get element() {
    return this.container;
  }
  showPreviousValue() {
    const inputState = this.getInputState();
    if (this.history.isAtEnd()) {
      this.saveCurrentValue(inputState);
    } else {
      if (!this.history.has({ text: this._inputEditor.getValue(), state: inputState })) {
        this.saveCurrentValue(inputState);
        this.history.resetCursor();
      }
    }
    this.navigateHistory(true);
  }
  showNextValue() {
    const inputState = this.getInputState();
    if (this.history.isAtEnd()) {
      return;
    } else {
      if (!this.history.has({ text: this._inputEditor.getValue(), state: inputState })) {
        this.saveCurrentValue(inputState);
        this.history.resetCursor();
      }
    }
    this.navigateHistory(false);
  }
  navigateHistory(previous) {
    const historyEntry = previous ? this.history.previous() : this.history.next();
    const historyAttachments = historyEntry.state?.chatContextAttachments ?? [];
    this._attachmentModel.clearAndSetContext(...historyAttachments);
    aria.status(historyEntry.text);
    this.setValue(historyEntry.text, true);
    this._onDidLoadInputState.fire(historyEntry.state);
    const model = this._inputEditor.getModel();
    if (!model) {
      return;
    }
    if (previous) {
      const endOfFirstViewLine = this._inputEditor._getViewModel()?.getLineLength(1) ?? 1;
      const endOfFirstModelLine = model.getLineLength(1);
      if (endOfFirstViewLine === endOfFirstModelLine) {
        this._inputEditor.setPosition({ lineNumber: 1, column: endOfFirstViewLine + 1 });
      } else {
        this._inputEditor.setPosition({ lineNumber: 1, column: endOfFirstViewLine });
      }
    } else {
      this._inputEditor.setPosition(getLastPosition(model));
    }
  }
  setValue(value, transient) {
    this.inputEditor.setValue(value);
    this.inputEditor.setPosition({ lineNumber: 1, column: value.length + 1 });
    if (!transient) {
      this.saveCurrentValue(this.getInputState());
    }
  }
  saveCurrentValue(inputState) {
    const newEntry = { text: this._inputEditor.getValue(), state: inputState };
    this.history.replaceLast(newEntry);
  }
  focus() {
    this._inputEditor.focus();
  }
  hasFocus() {
    return this._inputEditor.hasWidgetFocus();
  }
  /**
   * Reset the input and update history.
   * @param userQuery If provided, this will be added to the history. Followups and programmatic queries should not be passed.
   */
  async acceptInput(isUserQuery) {
    if (isUserQuery) {
      const userQuery = this._inputEditor.getValue();
      const entry = { text: userQuery, state: this.getInputState() };
      this.history.replaceLast(entry);
      this.history.add({ text: "" });
    }
    this.attachmentModel.clear();
    this._onDidLoadInputState.fire({});
    if (this.accessibilityService.isScreenReaderOptimized() && isMacintosh) {
      this._acceptInputForVoiceover();
    } else {
      this._inputEditor.focus();
      this._inputEditor.setValue("");
    }
  }
  _acceptInputForVoiceover() {
    const domNode = this._inputEditor.getDomNode();
    if (!domNode) {
      return;
    }
    domNode.remove();
    this._inputEditor.setValue("");
    this._inputEditorElement.appendChild(domNode);
    this._inputEditor.focus();
  }
  render(container, initialValue, widget) {
    let elements;
    if (this.options.renderStyle === "compact") {
      elements = dom.h(".interactive-input-part", [
        dom.h(".interactive-input-and-edit-session", [
          dom.h(".chat-editing-session@chatEditingSessionWidgetContainer"),
          dom.h(".interactive-input-and-side-toolbar@inputAndSideToolbar", [
            dom.h(".chat-input-container@inputContainer", [
              dom.h(".chat-editor-container@editorContainer"),
              dom.h(".chat-input-toolbars@inputToolbars")
            ])
          ]),
          dom.h(".chat-attached-context@attachedContextContainer"),
          dom.h(".interactive-input-followups@followupsContainer")
        ])
      ]);
    } else {
      elements = dom.h(".interactive-input-part", [
        dom.h(".interactive-input-followups@followupsContainer"),
        dom.h(".chat-editing-session@chatEditingSessionWidgetContainer"),
        dom.h(".interactive-input-and-side-toolbar@inputAndSideToolbar", [
          dom.h(".chat-input-container@inputContainer", [
            dom.h(".chat-editor-container@editorContainer"),
            dom.h(".chat-attached-context@attachedContextContainer"),
            dom.h(".chat-input-toolbars@inputToolbars")
          ])
        ])
      ]);
    }
    this.container = elements.root;
    container.append(this.container);
    this.container.classList.toggle("compact", this.options.renderStyle === "compact");
    this.followupsContainer = elements.followupsContainer;
    const inputAndSideToolbar = elements.inputAndSideToolbar;
    const inputContainer = elements.inputContainer;
    const editorContainer = elements.editorContainer;
    this.attachedContextContainer = elements.attachedContextContainer;
    const toolbarsContainer = elements.inputToolbars;
    this.chatEditingSessionWidgetContainer = elements.chatEditingSessionWidgetContainer;
    this.initAttachedContext(this.attachedContextContainer);
    this._register(this._attachmentModel.onDidChangeContext(() => this.initAttachedContext(this.attachedContextContainer)));
    this.renderChatEditingSessionState(null, widget);
    const inputScopedContextKeyService = this._register(this.contextKeyService.createScoped(inputContainer));
    CONTEXT_IN_CHAT_INPUT.bindTo(inputScopedContextKeyService).set(true);
    const scopedInstantiationService = this._register(this.instantiationService.createChild(new ServiceCollection([IContextKeyService, inputScopedContextKeyService])));
    const { historyNavigationBackwardsEnablement, historyNavigationForwardsEnablement } = this._register(registerAndCreateHistoryNavigationContext(inputScopedContextKeyService, this));
    this.historyNavigationBackwardsEnablement = historyNavigationBackwardsEnablement;
    this.historyNavigationForewardsEnablement = historyNavigationForwardsEnablement;
    const options = getSimpleEditorOptions(this.configurationService);
    options.overflowWidgetsDomNode = this.options.editorOverflowWidgetsDomNode;
    options.pasteAs = EditorOptions.pasteAs.defaultValue;
    options.readOnly = false;
    options.ariaLabel = this._getAriaLabel();
    options.fontFamily = DEFAULT_FONT_FAMILY;
    options.fontSize = 13;
    options.lineHeight = 20;
    options.padding = this.options.renderStyle === "compact" ? { top: 2, bottom: 2 } : { top: 8, bottom: 8 };
    options.cursorWidth = 1;
    options.wrappingStrategy = "advanced";
    options.bracketPairColorization = { enabled: false };
    options.suggest = {
      showIcons: false,
      showSnippets: false,
      showWords: true,
      showStatusBar: false,
      insertMode: "replace"
    };
    options.scrollbar = { ...options.scrollbar ?? {}, vertical: "hidden" };
    options.stickyScroll = { enabled: false };
    this._inputEditorElement = dom.append(editorContainer, $(chatInputEditorContainerSelector));
    const editorOptions = getSimpleCodeEditorWidgetOptions();
    editorOptions.contributions?.push(...EditorExtensionsRegistry.getSomeEditorContributions([ContentHoverController.ID, GlyphHoverController.ID, CopyPasteController.ID]));
    this._inputEditor = this._register(scopedInstantiationService.createInstance(CodeEditorWidget, this._inputEditorElement, options, editorOptions));
    SuggestController.get(this._inputEditor)?.forceRenderingAbove();
    this._register(this._inputEditor.onDidChangeModelContent(() => {
      const currentHeight = Math.min(this._inputEditor.getContentHeight(), this.inputEditorMaxHeight);
      if (currentHeight !== this.inputEditorHeight) {
        this.inputEditorHeight = currentHeight;
        this._onDidChangeHeight.fire();
      }
      const model = this._inputEditor.getModel();
      const inputHasText = !!model && model.getValue().trim().length > 0;
      this.inputEditorHasText.set(inputHasText);
    }));
    this._register(this._inputEditor.onDidFocusEditorText(() => {
      this.inputEditorHasFocus.set(true);
      this._onDidFocus.fire();
      inputContainer.classList.toggle("focused", true);
    }));
    this._register(this._inputEditor.onDidBlurEditorText(() => {
      this.inputEditorHasFocus.set(false);
      inputContainer.classList.toggle("focused", false);
      this._onDidBlur.fire();
    }));
    const hoverDelegate = this._register(createInstantHoverDelegate());
    this._register(dom.addStandardDisposableListener(toolbarsContainer, dom.EventType.CLICK, (e) => this.inputEditor.focus()));
    this.inputActionsToolbar = this._register(this.instantiationService.createInstance(MenuWorkbenchToolBar, toolbarsContainer, MenuId.ChatInput, {
      telemetrySource: this.options.menus.telemetrySource,
      menuOptions: { shouldForwardArgs: true },
      hiddenItemStrategy: HiddenItemStrategy.Ignore,
      hoverDelegate
    }));
    this.inputActionsToolbar.context = { widget };
    this._register(this.inputActionsToolbar.onDidChangeMenuItems(() => {
      if (this.cachedDimensions && typeof this.cachedInputToolbarWidth === "number" && this.cachedInputToolbarWidth !== this.inputActionsToolbar.getItemsWidth()) {
        this.layout(this.cachedDimensions.height, this.cachedDimensions.width);
      }
    }));
    this.executeToolbar = this._register(this.instantiationService.createInstance(MenuWorkbenchToolBar, toolbarsContainer, this.options.menus.executeToolbar, {
      telemetrySource: this.options.menus.telemetrySource,
      menuOptions: {
        shouldForwardArgs: true
      },
      hoverDelegate,
      hiddenItemStrategy: HiddenItemStrategy.Ignore,
      // keep it lean when hiding items and avoid a "..." overflow menu
      actionViewItemProvider: /* @__PURE__ */ __name((action, options2) => {
        if (this.location === ChatAgentLocation.Panel) {
          if ((action.id === SubmitAction.ID || action.id === CancelAction.ID) && action instanceof MenuItemAction) {
            const dropdownAction = this.instantiationService.createInstance(MenuItemAction, { id: "chat.moreExecuteActions", title: localize("notebook.moreExecuteActionsLabel", "More..."), icon: Codicon.chevronDown }, void 0, void 0, void 0, void 0);
            return this.instantiationService.createInstance(ChatSubmitDropdownActionItem, action, dropdownAction, options2);
          }
        }
        if (action.id === ChatModelPickerActionId && action instanceof MenuItemAction) {
          if (!this._currentLanguageModel) {
            this.setCurrentLanguageModelToDefault();
          }
          if (this._currentLanguageModel) {
            const itemDelegate = {
              onDidChangeModel: this._onDidChangeCurrentLanguageModel.event,
              setModel: /* @__PURE__ */ __name((modelId) => {
                this.setCurrentLanguageModelByUser(modelId);
              }, "setModel")
            };
            return this.instantiationService.createInstance(ModelPickerActionViewItem, action, this._currentLanguageModel, itemDelegate, { hoverDelegate: options2.hoverDelegate, keybinding: options2.keybinding ?? void 0 });
          }
        }
        return void 0;
      }, "actionViewItemProvider")
    }));
    this.executeToolbar.context = { widget };
    this._register(this.executeToolbar.onDidChangeMenuItems(() => {
      if (this.cachedDimensions && typeof this.cachedExecuteToolbarWidth === "number" && this.cachedExecuteToolbarWidth !== this.executeToolbar.getItemsWidth()) {
        this.layout(this.cachedDimensions.height, this.cachedDimensions.width);
      }
    }));
    if (this.options.menus.inputSideToolbar) {
      const toolbarSide = this._register(this.instantiationService.createInstance(MenuWorkbenchToolBar, inputAndSideToolbar, this.options.menus.inputSideToolbar, {
        telemetrySource: this.options.menus.telemetrySource,
        menuOptions: {
          shouldForwardArgs: true
        },
        hoverDelegate
      }));
      this.inputSideToolbarContainer = toolbarSide.getElement();
      toolbarSide.getElement().classList.add("chat-side-toolbar");
      toolbarSide.context = { widget };
    }
    let inputModel = this.modelService.getModel(this.inputUri);
    if (!inputModel) {
      inputModel = this.modelService.createModel("", null, this.inputUri, true);
      this._register(inputModel);
    }
    this.inputModel = inputModel;
    this.inputModel.updateOptions({ bracketColorizationOptions: { enabled: false, independentColorPoolPerBracketType: false } });
    this._inputEditor.setModel(this.inputModel);
    if (initialValue) {
      this.inputModel.setValue(initialValue);
      const lineNumber = this.inputModel.getLineCount();
      this._inputEditor.setPosition({ lineNumber, column: this.inputModel.getLineMaxColumn(lineNumber) });
    }
    const onDidChangeCursorPosition = /* @__PURE__ */ __name(() => {
      const model = this._inputEditor.getModel();
      if (!model) {
        return;
      }
      const position = this._inputEditor.getPosition();
      if (!position) {
        return;
      }
      const atTop = position.lineNumber === 1 && position.column - 1 <= (this._inputEditor._getViewModel()?.getLineLength(1) ?? 0);
      this.chatCursorAtTop.set(atTop);
      this.historyNavigationBackwardsEnablement.set(atTop);
      this.historyNavigationForewardsEnablement.set(position.equals(getLastPosition(model)));
    }, "onDidChangeCursorPosition");
    this._register(this._inputEditor.onDidChangeCursorPosition((e) => onDidChangeCursorPosition()));
    onDidChangeCursorPosition();
  }
  initAttachedContext(container, isLayout = false) {
    const oldHeight = container.offsetHeight;
    dom.clearNode(container);
    this.attachedContextDisposables.clear();
    const hoverDelegate = this.attachedContextDisposables.add(createInstantHoverDelegate());
    dom.setVisibility(Boolean(this.attachmentModel.size), this.attachedContextContainer);
    if (!this.attachmentModel.size) {
      this._indexOfLastAttachedContextDeletedWithKeyboard = -1;
    }
    this.attachmentModel.attachments.forEach(async (attachment, index) => {
      if (attachment.isFile && this.location === ChatAgentLocation.EditingSession) {
        return;
      }
      const widget = dom.append(container, $(".chat-attached-context-attachment.show-file-icons"));
      const label = this._contextResourceLabels.create(widget, { supportIcons: true, hoverDelegate, hoverTargetOverrride: widget });
      let ariaLabel;
      const file = URI.isUri(attachment.value) ? attachment.value : attachment.value && typeof attachment.value === "object" && "uri" in attachment.value && URI.isUri(attachment.value.uri) ? attachment.value.uri : void 0;
      const range = attachment.value && typeof attachment.value === "object" && "range" in attachment.value && Range.isIRange(attachment.value.range) ? attachment.value.range : void 0;
      if (file && attachment.isFile) {
        const fileBasename = basename(file.path);
        const fileDirname = dirname(file.path);
        const friendlyName = `${fileBasename} ${fileDirname}`;
        ariaLabel = range ? localize("chat.fileAttachmentWithRange", "Attached file, {0}, line {1} to line {2}", friendlyName, range.startLineNumber, range.endLineNumber) : localize("chat.fileAttachment", "Attached file, {0}", friendlyName);
        label.setFile(file, {
          fileKind: FileKind.FILE,
          hidePath: true,
          range
        });
        this.attachButtonAndDisposables(widget, index, attachment, hoverDelegate);
      } else if (attachment.isImage) {
        ariaLabel = localize("chat.imageAttachment", "Attached image, {0}", attachment.name);
        const hoverElement = dom.$("div.chat-attached-context-hover");
        hoverElement.setAttribute("aria-label", ariaLabel);
        const pillIcon = dom.$("div.chat-attached-context-pill", {}, dom.$("span.codicon.codicon-file-media"));
        const textLabel = dom.$("span.chat-attached-context-custom-text", {}, attachment.name);
        widget.appendChild(pillIcon);
        widget.appendChild(textLabel);
        let buffer;
        try {
          this.attachButtonAndDisposables(widget, index, attachment, hoverDelegate);
          if (attachment.value instanceof URI) {
            const readFile = await this.fileService.readFile(attachment.value);
            buffer = readFile.value.buffer;
          } else {
            buffer = attachment.value;
          }
          this.createImageElements(buffer, widget, hoverElement);
        } catch (error) {
          console.error("Error processing attachment:", error);
        }
        widget.style.position = "relative";
        if (!this.attachedContextDisposables.isDisposed) {
          this.attachedContextDisposables.add(this.hoverService.setupManagedHover(hoverDelegate, widget, hoverElement, { trapFocus: false }));
        }
      } else {
        const attachmentLabel = attachment.fullName ?? attachment.name;
        const withIcon = attachment.icon?.id ? `$(${attachment.icon.id}) ${attachmentLabel}` : attachmentLabel;
        label.setLabel(withIcon, void 0);
        ariaLabel = localize("chat.attachment", "Attached context, {0}", attachment.name);
        this.attachButtonAndDisposables(widget, index, attachment, hoverDelegate);
      }
      widget.tabIndex = 0;
      widget.ariaLabel = ariaLabel;
    });
    if (oldHeight !== container.offsetHeight && !isLayout) {
      this._onDidChangeHeight.fire();
    }
  }
  attachButtonAndDisposables(widget, index, attachment, hoverDelegate) {
    const clearButton = new Button(widget, {
      supportIcons: true,
      hoverDelegate,
      title: localize("chat.attachment.clearButton", "Remove from context")
    });
    if (index === Math.min(this._indexOfLastAttachedContextDeletedWithKeyboard, this.attachmentModel.size - 1)) {
      clearButton.focus();
    }
    this.attachedContextDisposables.add(clearButton);
    clearButton.icon = Codicon.close;
    const disp = clearButton.onDidClick((e) => {
      this._attachmentModel.delete(attachment.id);
      disp.dispose();
      if (dom.isKeyboardEvent(e)) {
        const event = new StandardKeyboardEvent(e);
        if (event.equals(KeyCode.Enter) || event.equals(KeyCode.Space)) {
          this._indexOfLastAttachedContextDeletedWithKeyboard = index;
        }
      }
      if (this._attachmentModel.size === 0) {
        this.focus();
      }
      this._onDidChangeHeight.fire();
      this._onDidChangeContext.fire({ removed: [attachment] });
    });
    this.attachedContextDisposables.add(disp);
  }
  // Helper function to create and replace image
  createImageElements(buffer, widget, hoverElement) {
    const blob = new Blob([buffer], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    const pillImg = dom.$("img.chat-attached-context-pill-image", { src: url, alt: "" });
    const pill = dom.$("div.chat-attached-context-pill", {}, pillImg);
    const existingPill = widget.querySelector(".chat-attached-context-pill");
    if (existingPill) {
      existingPill.replaceWith(pill);
    }
    const hoverImage = dom.$("img.chat-attached-context-image", { src: url, alt: "" });
    hoverElement.appendChild(hoverImage);
    hoverImage.onload = () => {
      URL.revokeObjectURL(url);
    };
  }
  async renderChatEditingSessionState(chatEditingSession, chatWidget) {
    dom.setVisibility(Boolean(chatEditingSession), this.chatEditingSessionWidgetContainer);
    if (!chatEditingSession) {
      dom.clearNode(this.chatEditingSessionWidgetContainer);
      this._chatEditsDisposables.clear();
      this._chatEditList = void 0;
      this._chatEditsProgress?.dispose();
      return;
    }
    const currentChatEditingState = chatEditingSession.state.get();
    if (this._chatEditList && !chatWidget?.viewModel?.requestInProgress && (currentChatEditingState === ChatEditingSessionState.Idle || currentChatEditingState === ChatEditingSessionState.Initial)) {
      this._chatEditsProgress?.stop();
    }
    const innerContainer = this.chatEditingSessionWidgetContainer.querySelector(".chat-editing-session-container.show-file-icons") ?? dom.append(this.chatEditingSessionWidgetContainer, $(".chat-editing-session-container.show-file-icons"));
    const modifiedFiles = new ResourceSet();
    const entries = chatEditingSession?.entries.get().map((entry) => {
      modifiedFiles.add(entry.modifiedURI);
      return {
        reference: entry.modifiedURI,
        state: entry.state.get(),
        kind: "reference"
      };
    }) ?? [];
    for (const attachment of this.attachmentModel.attachments) {
      if (attachment.isFile && URI.isUri(attachment.value) && !modifiedFiles.has(attachment.value)) {
        entries.unshift({
          reference: attachment.value,
          state: WorkingSetEntryState.Attached,
          kind: "reference"
        });
        modifiedFiles.add(attachment.value);
      }
    }
    chatEditingSession?.workingSet.get().forEach((file) => {
      if (!modifiedFiles.has(file)) {
        entries.unshift({
          reference: file,
          state: WorkingSetEntryState.Attached,
          kind: "reference"
        });
      }
    });
    entries.sort((a, b) => {
      if (a.kind === "reference" && b.kind === "reference") {
        if (a.state === b.state || a.state === void 0 || b.state === void 0) {
          return a.reference.toString().localeCompare(b.reference.toString());
        }
        return a.state - b.state;
      }
      return 0;
    });
    const overviewRegion = innerContainer.querySelector(".chat-editing-session-overview") ?? dom.append(innerContainer, $(".chat-editing-session-overview"));
    if (entries.length !== this._chatEditList?.object.length) {
      const overviewText = overviewRegion.querySelector("span") ?? dom.append(overviewRegion, $("span"));
      overviewText.textContent = localize("chatEditingSession.workingSet", "Working Set");
      if (entries.length === 1) {
        overviewText.textContent += " " + localize("chatEditingSession.oneFile", "(1 file)");
      } else if (entries.length > 1) {
        overviewText.textContent += " " + localize("chatEditingSession.manyFiles", "({0} files)", entries.length);
      }
    }
    this._chatEditsActionsDisposables.clear();
    const actionsContainer = innerContainer.querySelector(".chat-editing-session-toolbar-actions") ?? dom.append(overviewRegion, $(".chat-editing-session-toolbar-actions"));
    const button = this._chatEditsActionsDisposables.add(new Button(actionsContainer, {
      supportIcons: false,
      secondary: true
    }));
    button.label = localize("chatAddFiles", "Add Files...");
    this._chatEditsActionsDisposables.add(button.onDidClick(() => {
      this.commandService.executeCommand("workbench.action.chat.attachContext", { widget: chatWidget, showFilesOnly: true, placeholder: localize("chatAttachFiles", "Search for files to add to your working set") });
    }));
    dom.append(actionsContainer, button.element);
    const clearButton = this._chatEditsActionsDisposables.add(new Button(actionsContainer, { supportIcons: true }));
    clearButton.icon = Codicon.close;
    this._chatEditsActionsDisposables.add(clearButton.onDidClick((e) => {
      this.commandService.executeCommand("workbench.action.chat.newEditSession");
    }));
    dom.append(actionsContainer, clearButton.element);
    if (!chatEditingSession) {
      return;
    }
    if (currentChatEditingState === ChatEditingSessionState.StreamingEdits || chatWidget?.viewModel?.requestInProgress) {
      this._chatEditsProgress ??= new ProgressBar(innerContainer);
      this._chatEditsProgress?.infinite().show(500);
    }
    if (!this._chatEditList) {
      this._chatEditList = this._chatEditsListPool.get();
      const list2 = this._chatEditList.object;
      this._chatEditsDisposables.add(this._chatEditList);
      this._chatEditsActionsDisposables.add(list2.onDidFocus(() => {
        this._onDidFocus.fire();
      }));
      this._chatEditsDisposables.add(list2.onDidOpen((e) => {
        if (e.element?.kind === "reference" && URI.isUri(e.element.reference)) {
          const modifiedFileUri = e.element.reference;
          const editedFile = chatEditingSession.entries.get().find((e2) => e2.modifiedURI.toString() === modifiedFileUri.toString());
          if (editedFile?.state.get() === WorkingSetEntryState.Modified) {
            void this.editorService.openEditor({
              original: { resource: URI.from(editedFile.originalURI, true) },
              modified: { resource: URI.from(editedFile.modifiedURI, true) }
            });
          } else {
            void this.editorService.openEditor({ resource: modifiedFileUri });
          }
        }
      }));
      dom.append(innerContainer, list2.getHTMLElement());
    }
    const maxItemsShown = 6;
    const itemsShown = Math.min(entries.length, maxItemsShown);
    const height = itemsShown * 22;
    const list = this._chatEditList.object;
    list.layout(height);
    list.getHTMLElement().style.height = `${height}px`;
    list.splice(0, list.length, entries);
    {
      const actionsContainer2 = innerContainer.querySelector(".chat-editing-session-actions") ?? dom.append(innerContainer, $(".chat-editing-session-actions"));
      dom.clearNode(actionsContainer2);
      const actionsContainerRight = actionsContainer2.querySelector(".chat-editing-session-actions-group") ?? $(".chat-editing-session-actions-group");
      if (chatEditingSession.entries.get().find((e) => e.state.get() === WorkingSetEntryState.Modified)) {
        const actions = [];
        actions.push(
          {
            command: ChatEditingShowChangesAction.ID,
            label: ChatEditingShowChangesAction.LABEL,
            isSecondary: true
          },
          {
            command: ChatEditingDiscardAllAction.ID,
            label: ChatEditingDiscardAllAction.LABEL,
            isSecondary: true,
            container: actionsContainerRight
          },
          {
            command: ChatEditingAcceptAllAction.ID,
            label: ChatEditingAcceptAllAction.LABEL,
            isSecondary: false,
            container: actionsContainerRight
          }
        );
        for (const action of actions) {
          const button2 = this._chatEditsActionsDisposables.add(new Button(action.container ?? actionsContainer2, {
            supportIcons: false,
            secondary: action.isSecondary
          }));
          button2.label = action.label;
          this._chatEditsActionsDisposables.add(button2.onDidClick(() => {
            this.commandService.executeCommand(action.command);
          }));
          dom.append(action.container ?? actionsContainer2, button2.element);
        }
        dom.append(actionsContainer2, actionsContainerRight);
      }
    }
  }
  async renderFollowups(items, response) {
    if (!this.options.renderFollowups) {
      return;
    }
    this.followupsDisposables.clear();
    dom.clearNode(this.followupsContainer);
    if (items && items.length > 0) {
      this.followupsDisposables.add(this.instantiationService.createInstance(ChatFollowups, this.followupsContainer, items, this.location, void 0, (followup) => this._onDidAcceptFollowup.fire({ followup, response })));
    }
    this._onDidChangeHeight.fire();
  }
  get contentHeight() {
    const data = this.getLayoutData();
    return data.followupsHeight + data.inputPartEditorHeight + data.inputPartVerticalPadding + data.inputEditorBorder + data.attachmentsHeight + data.toolbarsHeight + data.chatEditingStateHeight;
  }
  layout(height, width) {
    this.cachedDimensions = new dom.Dimension(width, height);
    return this._layout(height, width);
  }
  previousInputEditorDimension;
  _layout(height, width, allowRecurse = true) {
    this.initAttachedContext(this.attachedContextContainer, true);
    const data = this.getLayoutData();
    const inputEditorHeight = Math.min(data.inputPartEditorHeight, height - data.followupsHeight - data.attachmentsHeight - data.inputPartVerticalPadding - data.toolbarsHeight);
    const followupsWidth = width - data.inputPartHorizontalPadding;
    this.followupsContainer.style.width = `${followupsWidth}px`;
    this._inputPartHeight = data.inputPartVerticalPadding + data.followupsHeight + inputEditorHeight + data.inputEditorBorder + data.attachmentsHeight + data.toolbarsHeight + data.chatEditingStateHeight;
    this._followupsHeight = data.followupsHeight;
    const initialEditorScrollWidth = this._inputEditor.getScrollWidth();
    const newEditorWidth = width - data.inputPartHorizontalPadding - data.editorBorder - data.inputPartHorizontalPaddingInside - data.toolbarsWidth - data.sideToolbarWidth;
    const newDimension = { width: newEditorWidth, height: inputEditorHeight };
    if (!this.previousInputEditorDimension || (this.previousInputEditorDimension.width !== newDimension.width || this.previousInputEditorDimension.height !== newDimension.height)) {
      this._inputEditor.layout(newDimension);
      this.previousInputEditorDimension = newDimension;
    }
    if (allowRecurse && initialEditorScrollWidth < 10) {
      return this._layout(height, width, false);
    }
  }
  getLayoutData() {
    const executeToolbarWidth = this.cachedExecuteToolbarWidth = this.executeToolbar.getItemsWidth();
    const inputToolbarWidth = this.cachedInputToolbarWidth = this.inputActionsToolbar.getItemsWidth();
    const executeToolbarPadding = (this.executeToolbar.getItemsLength() - 1) * 4;
    const inputToolbarPadding = this.inputActionsToolbar.getItemsLength() ? (this.inputActionsToolbar.getItemsLength() - 1) * 4 : 0;
    return {
      inputEditorBorder: 2,
      followupsHeight: this.followupsContainer.offsetHeight,
      inputPartEditorHeight: Math.min(this._inputEditor.getContentHeight(), this.inputEditorMaxHeight),
      inputPartHorizontalPadding: this.options.renderStyle === "compact" ? 16 : 32,
      inputPartVerticalPadding: this.options.renderStyle === "compact" ? 12 : 28,
      attachmentsHeight: this.attachedContextContainer.offsetHeight,
      editorBorder: 2,
      inputPartHorizontalPaddingInside: 12,
      toolbarsWidth: this.options.renderStyle === "compact" ? executeToolbarWidth + executeToolbarPadding + inputToolbarWidth + inputToolbarPadding : 0,
      toolbarsHeight: this.options.renderStyle === "compact" ? 0 : 22,
      chatEditingStateHeight: this.chatEditingSessionWidgetContainer.offsetHeight,
      sideToolbarWidth: this.inputSideToolbarContainer ? dom.getTotalWidth(this.inputSideToolbarContainer) + 4 : 0
    };
  }
  getViewState() {
    return this.getInputState();
  }
  saveState() {
    this.saveCurrentValue(this.getInputState());
    const inputHistory = [...this.history];
    this.historyService.saveHistory(this.location, inputHistory);
  }
};
ChatInputPart = __decorateClass([
  __decorateParam(3, IChatWidgetHistoryService),
  __decorateParam(4, IModelService),
  __decorateParam(5, IInstantiationService),
  __decorateParam(6, IContextKeyService),
  __decorateParam(7, IConfigurationService),
  __decorateParam(8, IKeybindingService),
  __decorateParam(9, IAccessibilityService),
  __decorateParam(10, ILanguageModelsService),
  __decorateParam(11, ILogService),
  __decorateParam(12, IHoverService),
  __decorateParam(13, IFileService),
  __decorateParam(14, ICommandService),
  __decorateParam(15, IEditorService)
], ChatInputPart);
const historyKeyFn = /* @__PURE__ */ __name((entry) => JSON.stringify(entry), "historyKeyFn");
function getLastPosition(model) {
  return { lineNumber: model.getLineCount(), column: model.getLineLength(model.getLineCount()) + 1 };
}
__name(getLastPosition, "getLastPosition");
let ChatSubmitDropdownActionItem = class extends DropdownWithPrimaryActionViewItem {
  static {
    __name(this, "ChatSubmitDropdownActionItem");
  }
  constructor(action, dropdownAction, options, menuService, contextMenuService, chatAgentService, contextKeyService, keybindingService, notificationService, themeService, accessibilityService) {
    super(
      action,
      dropdownAction,
      [],
      "",
      {
        ...options,
        getKeyBinding: /* @__PURE__ */ __name((action2) => keybindingService.lookupKeybinding(action2.id, contextKeyService), "getKeyBinding")
      },
      contextMenuService,
      keybindingService,
      notificationService,
      contextKeyService,
      themeService,
      accessibilityService
    );
    const menu = menuService.createMenu(MenuId.ChatExecuteSecondary, contextKeyService);
    const setActions = /* @__PURE__ */ __name(() => {
      const secondary = [];
      createAndFillInActionBarActions(menu, { shouldForwardArgs: true }, secondary);
      const secondaryAgent = chatAgentService.getSecondaryAgent();
      if (secondaryAgent) {
        secondary.forEach((a) => {
          if (a.id === ChatSubmitSecondaryAgentAction.ID) {
            a.label = localize("chat.submitToSecondaryAgent", "Send to @{0}", secondaryAgent.name);
          }
          return a;
        });
      }
      this.update(dropdownAction, secondary);
    }, "setActions");
    setActions();
    this._register(menu.onDidChange(() => setActions()));
  }
};
ChatSubmitDropdownActionItem = __decorateClass([
  __decorateParam(3, IMenuService),
  __decorateParam(4, IContextMenuService),
  __decorateParam(5, IChatAgentService),
  __decorateParam(6, IContextKeyService),
  __decorateParam(7, IKeybindingService),
  __decorateParam(8, INotificationService),
  __decorateParam(9, IThemeService),
  __decorateParam(10, IAccessibilityService)
], ChatSubmitDropdownActionItem);
let ModelPickerActionViewItem = class extends MenuEntryActionViewItem {
  constructor(action, currentLanguageModel, delegate, options, keybindingService, notificationService, contextKeyService, themeService, contextMenuService, _languageModelsService, _accessibilityService) {
    super(action, options, keybindingService, notificationService, contextKeyService, themeService, contextMenuService, _accessibilityService);
    this.currentLanguageModel = currentLanguageModel;
    this.delegate = delegate;
    this._languageModelsService = _languageModelsService;
    this._register(delegate.onDidChangeModel((modelId) => {
      this.currentLanguageModel = modelId;
      this.updateLabel();
    }));
  }
  static {
    __name(this, "ModelPickerActionViewItem");
  }
  async onClick(event) {
    this._openContextMenu();
  }
  render(container) {
    super.render(container);
    container.classList.add("chat-modelPicker-item");
    this._register(dom.addDisposableListener(container, dom.EventType.KEY_UP, (e) => {
      const event = new StandardKeyboardEvent(e);
      if (event.equals(KeyCode.Enter) || event.equals(KeyCode.Space)) {
        this._openContextMenu();
      }
    }));
  }
  updateLabel() {
    if (this.label) {
      const model = this._languageModelsService.lookupLanguageModel(this.currentLanguageModel);
      if (model) {
        this.label.textContent = model.name;
        dom.reset(this.label, ...renderLabelWithIcons(`${model.name}$(chevron-down)`));
      }
    }
  }
  _openContextMenu() {
    const setLanguageModelAction = /* @__PURE__ */ __name((id, modelMetadata) => {
      return {
        id,
        label: modelMetadata.name,
        tooltip: "",
        class: void 0,
        enabled: true,
        checked: id === this.currentLanguageModel,
        run: /* @__PURE__ */ __name(() => {
          this.currentLanguageModel = id;
          this.updateLabel();
          this.delegate.setModel(id);
        }, "run")
      };
    }, "setLanguageModelAction");
    const models = this._languageModelsService.getLanguageModelIds().map((modelId) => ({ id: modelId, model: this._languageModelsService.lookupLanguageModel(modelId) })).filter((entry) => entry.model?.isUserSelectable);
    this._contextMenuService.showContextMenu({
      getAnchor: /* @__PURE__ */ __name(() => this.element, "getAnchor"),
      getActions: /* @__PURE__ */ __name(() => models.map((entry) => setLanguageModelAction(entry.id, entry.model)), "getActions")
    });
  }
};
ModelPickerActionViewItem = __decorateClass([
  __decorateParam(4, IKeybindingService),
  __decorateParam(5, INotificationService),
  __decorateParam(6, IContextKeyService),
  __decorateParam(7, IThemeService),
  __decorateParam(8, IContextMenuService),
  __decorateParam(9, ILanguageModelsService),
  __decorateParam(10, IAccessibilityService)
], ModelPickerActionViewItem);
const chatInputEditorContainerSelector = ".interactive-input-editor";
setupSimpleEditorSelectionStyling(chatInputEditorContainerSelector);
export {
  ChatInputPart
};
//# sourceMappingURL=chatInputPart.js.map
