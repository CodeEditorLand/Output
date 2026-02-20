var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import "./media/chatWidget.css";
import "./media/chatWelcomePart.css";
import * as dom from "../../../../base/browser/dom.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { Separator, toAction } from "../../../../base/common/actions.js";
import { Radio } from "../../../../base/browser/ui/radio/radio.js";
import { DropdownMenuActionViewItem } from "../../../../base/browser/ui/dropdown/dropdownActionViewItem.js";
import { Emitter } from "../../../../base/common/event.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Disposable, DisposableStore, MutableDisposable } from "../../../../base/common/lifecycle.js";
import { observableValue } from "../../../../base/common/observable.js";
import { URI } from "../../../../base/common/uri.js";
import { CodeEditorWidget } from "../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";
import { EditorExtensionsRegistry } from "../../../../editor/browser/editorExtensions.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService, RawContextKey, ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { renderIcon } from "../../../../base/browser/ui/iconLabel/iconLabels.js";
import { basename, isEqual } from "../../../../base/common/resources.js";
import { localize } from "../../../../nls.js";
import { AgentSessionProviders } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessions.js";
import { ISessionsManagementService } from "../../sessions/browser/sessionsManagementService.js";
import { ChatSessionPosition, getResourceForNewChatSession } from "../../../../workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.js";
import { ChatSessionPickerActionItem } from "../../../../workbench/contrib/chat/browser/chatSessions/chatSessionPickerActionItem.js";
import { SearchableOptionPickerActionItem } from "../../../../workbench/contrib/chat/browser/chatSessions/searchableOptionPickerActionItem.js";
import { ChatAgentLocation, ChatModeKind } from "../../../../workbench/contrib/chat/common/constants.js";
import { IChatSessionsService } from "../../../../workbench/contrib/chat/common/chatSessionsService.js";
import { ILanguageModelsService } from "../../../../workbench/contrib/chat/common/languageModels.js";
import { EnhancedModelPickerActionItem } from "../../../../workbench/contrib/chat/browser/widget/input/modelPickerActionItem2.js";
import { WorkspaceFolderCountContext } from "../../../../workbench/common/contextkeys.js";
import { IViewDescriptorService } from "../../../../workbench/common/views.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IWorkspacesService, isRecentFolder } from "../../../../platform/workspaces/common/workspaces.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ViewPane } from "../../../../workbench/browser/parts/views/viewPane.js";
import { ContextMenuController } from "../../../../editor/contrib/contextmenu/browser/contextmenu.js";
import { getSimpleEditorOptions } from "../../../../workbench/contrib/codeEditor/browser/simpleEditorOptions.js";
import { isString } from "../../../../base/common/types.js";
class LabeledDropdownMenuActionViewItem extends DropdownMenuActionViewItem {
  static {
    __name(this, "LabeledDropdownMenuActionViewItem");
  }
  renderLabel(element) {
    const classNames = typeof this.options.classNames === "string" ? this.options.classNames.split(/\s+/g).filter((s) => !!s) : this.options.classNames ?? [];
    if (classNames.length > 0) {
      const icon = dom.append(element, dom.$("span"));
      icon.classList.add("codicon", ...classNames);
    }
    const label = dom.append(element, dom.$("span.sessions-chat-dropdown-label"));
    label.textContent = this._action.label;
    dom.append(element, renderIcon(Codicon.chevronDown));
    return null;
  }
}
class TargetConfig extends Disposable {
  static {
    __name(this, "TargetConfig");
  }
  constructor(options) {
    super();
    this._allowedTargets = observableValue("allowedTargets", /* @__PURE__ */ new Set());
    this.allowedTargets = this._allowedTargets;
    this._selectedTarget = observableValue("selectedTarget", void 0);
    this.selectedTarget = this._selectedTarget;
    this._onDidChangeSelectedTarget = this._register(new Emitter());
    this.onDidChangeSelectedTarget = this._onDidChangeSelectedTarget.event;
    this._onDidChangeAllowedTargets = this._register(new Emitter());
    this.onDidChangeAllowedTargets = this._onDidChangeAllowedTargets.event;
    const initialSet = new Set(options.allowedTargets);
    this._allowedTargets.set(initialSet, void 0);
    const defaultTarget = options.defaultTarget && initialSet.has(options.defaultTarget) ? options.defaultTarget : initialSet.values().next().value;
    this._selectedTarget.set(defaultTarget, void 0);
  }
  setSelectedTarget(target) {
    const allowed = this._allowedTargets.get();
    if (!allowed.has(target)) {
      throw new Error(`Target "${target}" is not in the allowed set`);
    }
    if (this._selectedTarget.get() !== target) {
      this._selectedTarget.set(target, void 0);
      this._onDidChangeSelectedTarget.fire(target);
    }
  }
  setAllowedTargets(targets) {
    const newSet = new Set(targets);
    this._allowedTargets.set(newSet, void 0);
    this._onDidChangeAllowedTargets.fire(newSet);
    const current = this._selectedTarget.get();
    if (current && !newSet.has(current)) {
      const fallback = newSet.values().next().value;
      this._selectedTarget.set(fallback, void 0);
      this._onDidChangeSelectedTarget.fire(fallback);
    }
  }
}
let NewChatWidget = class NewChatWidget2 extends Disposable {
  static {
    __name(this, "NewChatWidget");
  }
  constructor(options, instantiationService, chatSessionsService, modelService, configurationService, languageModelsService, contextKeyService, contextMenuService, logService, _hoverService, workspaceContextService, fileDialogService, workspacesService, storageService) {
    super();
    this.instantiationService = instantiationService;
    this.chatSessionsService = chatSessionsService;
    this.modelService = modelService;
    this.configurationService = configurationService;
    this.languageModelsService = languageModelsService;
    this.contextKeyService = contextKeyService;
    this.contextMenuService = contextMenuService;
    this.logService = logService;
    this.workspaceContextService = workspaceContextService;
    this.fileDialogService = fileDialogService;
    this.workspacesService = workspacesService;
    this.storageService = storageService;
    this._currentLanguageModel = observableValue("currentLanguageModel", void 0);
    this._modelPickerDisposable = this._register(new MutableDisposable());
    this._welcomeContentDisposables = this._register(new DisposableStore());
    this._localMode = "worktree";
    this._recentlyPickedFolders = [];
    this._cachedRecentFolders = [];
    this._pickerWidgets = /* @__PURE__ */ new Map();
    this._pickerWidgetDisposables = this._register(new DisposableStore());
    this._optionEmitters = /* @__PURE__ */ new Map();
    this._selectedOptions = /* @__PURE__ */ new Map();
    this._optionContextKeys = /* @__PURE__ */ new Map();
    this._whenClauseKeys = /* @__PURE__ */ new Set();
    this._pendingSessionResources = /* @__PURE__ */ new Map();
    this._localModeDisposables = this._register(new DisposableStore());
    this._targetConfig = this._register(new TargetConfig(options.targetConfig));
    this._options = options;
    const lastFolder = this.storageService.get(
      "agentSessions.lastPickedFolder",
      0
      /* StorageScope.PROFILE */
    );
    if (lastFolder) {
      try {
        this._selectedFolderUri = URI.parse(lastFolder);
      } catch {
      }
    }
    try {
      const stored = this.storageService.get(
        "agentSessions.recentlyPickedFolders",
        0
        /* StorageScope.PROFILE */
      );
      if (stored) {
        this._recentlyPickedFolders = JSON.parse(stored).map((s) => URI.parse(s));
      }
    } catch {
    }
    this.workspacesService.getRecentlyOpened().then((recent) => {
      this._cachedRecentFolders = recent.workspaces.filter(isRecentFolder).slice(0, 10);
    }).catch((error) => {
      this.logService.error("Failed to fetch recently opened workspaces for agent sessions", error);
    });
    this._register(this._targetConfig.onDidChangeSelectedTarget(() => {
      this._generatePendingSessionResource();
      this._notifyFolderSelection();
      this._renderExtensionPickers(true);
      this._renderLocalModePicker();
    }));
    this._register(this._targetConfig.onDidChangeAllowedTargets(() => {
      if (this._targetDropdownContainer) {
        dom.clearNode(this._targetDropdownContainer);
        this._renderTargetDropdown(this._targetDropdownContainer);
      }
      this._renderExtensionPickers(true);
    }));
    this._register(this.chatSessionsService.onDidChangeOptionGroups(() => this._renderExtensionPickers()));
    this._register(this.chatSessionsService.onDidChangeSessionOptions((e) => {
      if (this._pendingSessionResource && isEqual(this._pendingSessionResource, e)) {
        this._syncOptionsFromSession(this._pendingSessionResource);
        this._renderExtensionPickers();
      }
    }));
    const workspaceFolderCountKey = /* @__PURE__ */ new Set([WorkspaceFolderCountContext.key]);
    this._register(this.contextKeyService.onDidChangeContext((e) => {
      if (e.affectsSome(workspaceFolderCountKey)) {
        this._renderExtensionPickers(true);
      }
      if (this._whenClauseKeys.size > 0 && e.affectsSome(this._whenClauseKeys)) {
        this._renderExtensionPickers(true);
      }
    }));
  }
  // --- Rendering ---
  render(container) {
    const wrapper = dom.append(container, dom.$(".sessions-chat-widget"));
    const welcomeElement = dom.append(wrapper, dom.$(".chat-full-welcome"));
    const header = dom.append(welcomeElement, dom.$(".chat-full-welcome-header"));
    dom.append(header, dom.$(".chat-full-welcome-letterpress"));
    this._pickersContainer = dom.append(welcomeElement, dom.$(".chat-full-welcome-pickers-container"));
    this._inputSlot = dom.append(welcomeElement, dom.$(".chat-full-welcome-inputSlot"));
    const inputArea = dom.$(".sessions-chat-input-area");
    this._createEditor(inputArea);
    this._createToolbar(inputArea);
    this._inputSlot.appendChild(inputArea);
    this._localModeContainer = dom.append(welcomeElement, dom.$(".chat-full-welcome-local-mode"));
    this._localModeDropdownContainer = dom.append(this._localModeContainer, dom.$(".sessions-chat-local-mode-left"));
    dom.append(this._localModeContainer, dom.$(".sessions-chat-local-mode-spacer"));
    this._localModePickersContainer = dom.append(this._localModeContainer, dom.$(".sessions-chat-local-mode-right"));
    this._renderOptionGroupPickers();
    this._initDefaultModel();
    this._generatePendingSessionResource();
    this._renderLocalModePicker();
    welcomeElement.classList.add("revealed");
  }
  _getEffectiveTarget() {
    const target = this._targetConfig.selectedTarget.get();
    if (target === AgentSessionProviders.Local && this._localMode === "worktree") {
      return AgentSessionProviders.Background;
    }
    return target;
  }
  _generatePendingSessionResource() {
    const target = this._getEffectiveTarget();
    if (!target || target === AgentSessionProviders.Local) {
      this._pendingSessionResource = void 0;
      return;
    }
    const existing = this._pendingSessionResources.get(target);
    if (existing) {
      this._pendingSessionResource = existing;
      return;
    }
    this._pendingSessionResource = getResourceForNewChatSession({
      type: target,
      position: this._options.sessionPosition ?? ChatSessionPosition.Sidebar,
      displayName: ""
    });
    this._pendingSessionResources.set(target, this._pendingSessionResource);
    this.chatSessionsService.getOrCreateChatSession(this._pendingSessionResource, CancellationToken.None).catch((err) => this.logService.trace("Failed to create pending session:", err));
  }
  // --- Editor ---
  _createEditor(container) {
    const editorContainer = dom.append(container, dom.$(".sessions-chat-editor"));
    const uri = URI.from({ scheme: "sessions-chat", path: `input-${Date.now()}` });
    const textModel = this._register(this.modelService.createModel("", null, uri, true));
    const editorOptions = {
      ...getSimpleEditorOptions(this.configurationService),
      readOnly: false,
      ariaLabel: localize("chatInput", "Chat input"),
      placeholder: localize("chatPlaceholder", "Run tasks in the background, type '#' for adding context"),
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: 13,
      lineHeight: 20,
      padding: { top: 8, bottom: 2 },
      wrappingStrategy: "advanced",
      stickyScroll: { enabled: false },
      renderWhitespace: "none"
    };
    const widgetOptions = {
      isSimpleWidget: true,
      contributions: EditorExtensionsRegistry.getSomeEditorContributions([
        ContextMenuController.ID
      ])
    };
    this._editor = this._register(this.instantiationService.createInstance(CodeEditorWidget, editorContainer, editorOptions, widgetOptions));
    this._editor.setModel(textModel);
    this._register(this._editor.onKeyDown((e) => {
      if (e.keyCode === 3 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        this._send();
      }
    }));
    this._register(this._editor.onDidContentSizeChange(() => {
      const contentHeight = this._editor.getContentHeight();
      const clampedHeight = Math.min(Math.max(contentHeight, 36), 200);
      editorContainer.style.height = `${clampedHeight}px`;
      this._editor.layout();
    }));
  }
  _createToolbar(container) {
    const toolbar = dom.append(container, dom.$(".sessions-chat-toolbar"));
    const modelPickerContainer = dom.append(toolbar, dom.$(".sessions-chat-model-picker"));
    this._createModelPicker(modelPickerContainer);
    dom.append(toolbar, dom.$(".sessions-chat-toolbar-spacer"));
    const sendButton = dom.append(toolbar, dom.$(".sessions-chat-send-button"));
    sendButton.tabIndex = 0;
    sendButton.role = "button";
    sendButton.title = localize("send", "Send");
    dom.append(sendButton, renderIcon(Codicon.send));
    this._register(dom.addDisposableListener(sendButton, dom.EventType.CLICK, () => this._send()));
  }
  // --- Model picker ---
  _createModelPicker(container) {
    const delegate = {
      currentModel: this._currentLanguageModel,
      setModel: /* @__PURE__ */ __name((model) => {
        this._currentLanguageModel.set(model, void 0);
      }, "setModel"),
      getModels: /* @__PURE__ */ __name(() => this._getAvailableModels(), "getModels"),
      canManageModels: /* @__PURE__ */ __name(() => true, "canManageModels")
    };
    const pickerOptions = {
      onlyShowIconsForDefaultActions: observableValue("onlyShowIcons", false),
      hoverPosition: {
        hoverPosition: 3
        /* HoverPosition.ABOVE */
      }
    };
    const action = { id: "sessions.modelPicker", label: "", enabled: true, class: void 0, tooltip: "", run: /* @__PURE__ */ __name(() => {
    }, "run") };
    const modelPicker = this.instantiationService.createInstance(EnhancedModelPickerActionItem, action, delegate, pickerOptions);
    this._modelPickerDisposable.value = modelPicker;
    modelPicker.render(container);
  }
  _initDefaultModel() {
    const models = this._getAvailableModels();
    if (models.length > 0) {
      this._currentLanguageModel.set(models[0], void 0);
    }
    this._register(this.languageModelsService.onDidChangeLanguageModels(() => {
      if (!this._currentLanguageModel.get()) {
        const models2 = this._getAvailableModels();
        if (models2.length > 0) {
          this._currentLanguageModel.set(models2[0], void 0);
        }
      }
    }));
  }
  _getAvailableModels() {
    return this.languageModelsService.getLanguageModelIds().map((id) => {
      const metadata = this.languageModelsService.lookupLanguageModel(id);
      return metadata ? { metadata, identifier: id } : void 0;
    }).filter((m) => !!m && !!m.metadata.isUserSelectable);
  }
  // --- Welcome: Target & option pickers (dropdown row below input) ---
  _renderOptionGroupPickers() {
    if (!this._pickersContainer) {
      return;
    }
    this._disposePickerWidgets();
    dom.clearNode(this._pickersContainer);
    const pickersRow = dom.append(this._pickersContainer, dom.$(".chat-full-welcome-pickers"));
    const leftHalf = dom.append(pickersRow, dom.$(".sessions-chat-pickers-left-half"));
    this._targetDropdownContainer = dom.append(leftHalf, dom.$(".sessions-chat-dropdown-wrapper"));
    this._renderTargetDropdown(this._targetDropdownContainer);
    const rightHalf = dom.append(pickersRow, dom.$(".sessions-chat-pickers-right-half"));
    this._extensionPickersLeftContainer = dom.append(rightHalf, dom.$(".sessions-chat-pickers-left-separator"));
    this._extensionPickersRightContainer = dom.append(rightHalf, dom.$(".sessions-chat-extension-pickers-right"));
    this._renderExtensionPickers();
  }
  _renderTargetDropdown(container) {
    const allowed = this._targetConfig.allowedTargets.get();
    if (allowed.size === 0) {
      return;
    }
    const activeType = this._targetConfig.selectedTarget.get() ?? AgentSessionProviders.Local;
    const targets = [AgentSessionProviders.Local, AgentSessionProviders.Cloud].filter((t) => allowed.has(t));
    const activeIndex = targets.indexOf(activeType);
    const radio = new Radio({
      items: targets.map((target) => ({
        text: getAgentSessionProviderName(target),
        isActive: target === activeType
      }))
    });
    this._welcomeContentDisposables.add(radio);
    container.appendChild(radio.domNode);
    if (activeIndex >= 0) {
      radio.setActiveItem(activeIndex);
    }
    this._welcomeContentDisposables.add(radio.onDidSelect((index) => {
      this._targetConfig.setSelectedTarget(targets[index]);
    }));
  }
  _renderLocalModePicker() {
    if (!this._localModeContainer || !this._localModeDropdownContainer || !this._localModePickersContainer) {
      return;
    }
    this._localModeDisposables.clear();
    dom.clearNode(this._localModeDropdownContainer);
    dom.clearNode(this._localModePickersContainer);
    const selectedTarget = this._targetConfig.selectedTarget.get();
    if (selectedTarget !== AgentSessionProviders.Local) {
      this._localModeContainer.style.visibility = "hidden";
      return;
    }
    this._localModeContainer.style.visibility = "";
    const modeLabel = this._localMode === "workspace" ? localize("localMode.workspace", "Workspace") : localize("localMode.worktree", "Worktree");
    const modeIcon = this._localMode === "workspace" ? Codicon.folder : Codicon.worktree;
    const modeAction = toAction({ id: "localMode", label: modeLabel, run: /* @__PURE__ */ __name(() => {
    }, "run") });
    const modeDropdown = this._localModeDisposables.add(new LabeledDropdownMenuActionViewItem(modeAction, {
      getActions: /* @__PURE__ */ __name(() => [
        toAction({
          id: "localMode.workspace",
          label: localize("localMode.workspace", "Workspace"),
          checked: this._localMode === "workspace",
          run: /* @__PURE__ */ __name(() => this._setLocalMode("workspace"), "run")
        }),
        toAction({
          id: "localMode.worktree",
          label: localize("localMode.worktree", "Worktree"),
          checked: this._localMode === "worktree",
          run: /* @__PURE__ */ __name(() => this._setLocalMode("worktree"), "run")
        })
      ], "getActions")
    }, this.contextMenuService, { classNames: [...ThemeIcon.asClassNameArray(modeIcon)] }));
    const modeSlot = dom.append(this._localModeDropdownContainer, dom.$(".sessions-chat-picker-slot"));
    modeDropdown.render(modeSlot);
    this._renderLocalModePickers();
  }
  _setLocalMode(mode) {
    if (this._localMode !== mode) {
      this._localMode = mode;
      this._generatePendingSessionResource();
      this._notifyFolderSelection();
      this._renderLocalModePicker();
    }
  }
  _notifyFolderSelection() {
    this._selectedOptions.clear();
    if (!this._pendingSessionResource) {
      return;
    }
    const folderUri = this._selectedFolderUri ?? this.workspaceContextService.getWorkspace().folders[0]?.uri;
    if (folderUri) {
      this.chatSessionsService.notifySessionOptionsChange(this._pendingSessionResource, [{ optionId: "repository", value: folderUri.fsPath }]).catch((err) => this.logService.error("Failed to notify extension of folder selection:", err));
    }
  }
  _addToRecentlyPickedFolders(folderUri) {
    this._recentlyPickedFolders = [folderUri, ...this._recentlyPickedFolders.filter((f) => !isEqual(f, folderUri))].slice(0, 10);
    this.storageService.store(
      "agentSessions.recentlyPickedFolders",
      JSON.stringify(this._recentlyPickedFolders.map((f) => f.toString())),
      0,
      1
      /* StorageTarget.MACHINE */
    );
  }
  _renderLocalModePickers() {
    if (!this._localModePickersContainer) {
      return;
    }
    dom.clearNode(this._localModePickersContainer);
    if (this._localMode === "worktree") {
      this._renderExtensionPickersInContainer(this._localModePickersContainer, AgentSessionProviders.Background);
    }
  }
  // --- Welcome: Extension option pickers ---
  _renderExtensionPickers(force) {
    if (!this._extensionPickersRightContainer) {
      return;
    }
    const activeSessionType = this._getEffectiveTarget();
    if (!activeSessionType) {
      this._clearExtensionPickers();
      return;
    }
    if (this._targetConfig.selectedTarget.get() === AgentSessionProviders.Local) {
      this._clearExtensionPickers();
      this._renderLocalFolderPickerInTopRow();
      this._renderLocalModePicker();
      return;
    }
    const optionGroups = this.chatSessionsService.getOptionGroupsForSessionType(activeSessionType);
    if (!optionGroups || optionGroups.length === 0) {
      this._clearExtensionPickers();
      return;
    }
    const visibleGroups = [];
    this._whenClauseKeys.clear();
    for (const group of optionGroups) {
      if (isModelOptionGroup(group)) {
        continue;
      }
      if (group.when) {
        const expr = ContextKeyExpr.deserialize(group.when);
        if (expr) {
          for (const key of expr.keys()) {
            this._whenClauseKeys.add(key);
          }
        }
      }
      const hasItems = group.items.length > 0 || (group.commands || []).length > 0 || !!group.searchable;
      const passesWhenClause = this._evaluateOptionGroupVisibility(group);
      if (hasItems && passesWhenClause) {
        visibleGroups.push(group);
      }
    }
    if (visibleGroups.length === 0) {
      this._clearExtensionPickers();
      return;
    }
    visibleGroups.sort((a, b) => {
      const aRepo = isRepoOrFolderGroup(a) ? 0 : 1;
      const bRepo = isRepoOrFolderGroup(b) ? 0 : 1;
      if (aRepo !== bRepo) {
        return aRepo - bRepo;
      }
      return (a.when ? 1 : 0) - (b.when ? 1 : 0);
    });
    if (!force && this._pickerWidgets.size === visibleGroups.length) {
      const allMatch = visibleGroups.every((g) => this._pickerWidgets.has(g.id));
      if (allMatch) {
        return;
      }
    }
    this._clearExtensionPickers();
    if (this._extensionPickersLeftContainer) {
      this._extensionPickersLeftContainer.style.display = "block";
    }
    for (const optionGroup of visibleGroups) {
      const initialItem = this._getDefaultOptionForGroup(optionGroup);
      const initialState = { group: optionGroup, item: initialItem };
      if (initialItem) {
        this._updateOptionContextKey(optionGroup.id, initialItem.id);
      }
      const emitter = this._getOrCreateOptionEmitter(optionGroup.id);
      const itemDelegate = {
        getCurrentOption: /* @__PURE__ */ __name(() => this._selectedOptions.get(optionGroup.id) ?? this._getDefaultOptionForGroup(optionGroup), "getCurrentOption"),
        onDidChangeOption: emitter.event,
        setOption: /* @__PURE__ */ __name((option) => {
          this._selectedOptions.set(optionGroup.id, option);
          this._updateOptionContextKey(optionGroup.id, option.id);
          emitter.fire(option);
          if (this._pendingSessionResource) {
            this.chatSessionsService.notifySessionOptionsChange(this._pendingSessionResource, [{ optionId: optionGroup.id, value: option }]).catch((err) => this.logService.error(`Failed to notify extension of ${optionGroup.id} change:`, err));
          }
          this._renderExtensionPickers(true);
        }, "setOption"),
        getOptionGroup: /* @__PURE__ */ __name(() => {
          const groups = this.chatSessionsService.getOptionGroupsForSessionType(activeSessionType);
          return groups?.find((g) => g.id === optionGroup.id);
        }, "getOptionGroup"),
        getSessionResource: /* @__PURE__ */ __name(() => this._pendingSessionResource, "getSessionResource")
      };
      const action = toAction({ id: optionGroup.id, label: optionGroup.name, run: /* @__PURE__ */ __name(() => {
      }, "run") });
      const widget = this.instantiationService.createInstance(optionGroup.searchable ? SearchableOptionPickerActionItem : ChatSessionPickerActionItem, action, initialState, itemDelegate);
      this._pickerWidgetDisposables.add(widget);
      this._pickerWidgets.set(optionGroup.id, widget);
      const targetContainer = this._extensionPickersRightContainer;
      const slot = dom.append(targetContainer, dom.$(".sessions-chat-picker-slot"));
      widget.render(slot);
    }
  }
  _renderLocalFolderPickerInTopRow() {
    if (!this._extensionPickersRightContainer) {
      return;
    }
    if (this._extensionPickersLeftContainer) {
      this._extensionPickersLeftContainer.style.display = "block";
    }
    this._renderLocalFolderPickerInContainer(this._extensionPickersRightContainer, this._pickerWidgetDisposables);
  }
  _renderLocalFolderPickerInContainer(container, disposables) {
    const currentFolderUri = this._selectedFolderUri ?? this.workspaceContextService.getWorkspace().folders[0]?.uri;
    const folderName = currentFolderUri ? basename(currentFolderUri) : localize("pickFolder", "Pick Folder");
    const switchFolder = /* @__PURE__ */ __name(async (folderUri) => {
      this._selectedFolderUri = folderUri;
      this._addToRecentlyPickedFolders(folderUri);
      this.storageService.store(
        "agentSessions.lastPickedFolder",
        folderUri.toString(),
        0,
        1
        /* StorageTarget.MACHINE */
      );
      this._notifyFolderSelection();
      this._renderExtensionPickers(true);
    }, "switchFolder");
    const folderAction = toAction({ id: "folderPicker", label: folderName, run: /* @__PURE__ */ __name(() => {
    }, "run") });
    const folderDropdown = disposables.add(new LabeledDropdownMenuActionViewItem(folderAction, {
      getActions: /* @__PURE__ */ __name(() => this._getFolderPickerActions(currentFolderUri, switchFolder), "getActions")
    }, this.contextMenuService, { classNames: [...ThemeIcon.asClassNameArray(Codicon.folder)] }));
    const slot = dom.append(container, dom.$(".sessions-chat-picker-slot"));
    folderDropdown.render(slot);
  }
  _getFolderPickerActions(currentFolderUri, switchFolder) {
    const seenUris = /* @__PURE__ */ new Set();
    if (currentFolderUri) {
      seenUris.add(currentFolderUri.toString());
    }
    const actions = [];
    const allFolders = [
      ...this._recentlyPickedFolders.map((uri) => ({ uri })),
      ...this._cachedRecentFolders.map((r) => ({ uri: r.folderUri, label: r.label }))
    ];
    for (const folder of allFolders) {
      const key = folder.uri.toString();
      if (seenUris.has(key)) {
        continue;
      }
      seenUris.add(key);
      actions.push(toAction({
        id: key,
        label: folder.label || basename(folder.uri),
        run: /* @__PURE__ */ __name(() => switchFolder(folder.uri), "run")
      }));
    }
    actions.push(new Separator());
    actions.push(toAction({
      id: "browse",
      label: localize("browseFolder", "Browse..."),
      run: /* @__PURE__ */ __name(async () => {
        const selected = await this.fileDialogService.showOpenDialog({
          canSelectFiles: false,
          canSelectFolders: true,
          canSelectMany: false,
          title: localize("selectFolder", "Select Folder")
        });
        if (selected?.[0]) {
          await switchFolder(selected[0]);
        }
      }, "run")
    }));
    return actions;
  }
  _renderExtensionPickersInContainer(container, sessionType) {
    const optionGroups = this.chatSessionsService.getOptionGroupsForSessionType(sessionType);
    if (!optionGroups || optionGroups.length === 0) {
      return;
    }
    const visibleGroups = [];
    for (const group of optionGroups) {
      if (isModelOptionGroup(group)) {
        continue;
      }
      if (group.id === "repository") {
        continue;
      }
      const hasItems = group.items.length > 0 || (group.commands || []).length > 0 || !!group.searchable;
      const passesWhenClause = this._evaluateOptionGroupVisibility(group);
      if (hasItems && passesWhenClause) {
        visibleGroups.push(group);
      }
    }
    for (const optionGroup of visibleGroups) {
      const initialItem = this._getDefaultOptionForGroup(optionGroup);
      const initialState = { group: optionGroup, item: initialItem };
      if (initialItem) {
        this._updateOptionContextKey(optionGroup.id, initialItem.id);
      }
      const emitter = this._getOrCreateOptionEmitter(optionGroup.id);
      const itemDelegate = {
        getCurrentOption: /* @__PURE__ */ __name(() => this._selectedOptions.get(optionGroup.id) ?? this._getDefaultOptionForGroup(optionGroup), "getCurrentOption"),
        onDidChangeOption: emitter.event,
        setOption: /* @__PURE__ */ __name((option) => {
          this._selectedOptions.set(optionGroup.id, option);
          this._updateOptionContextKey(optionGroup.id, option.id);
          emitter.fire(option);
          if (this._pendingSessionResource) {
            this.chatSessionsService.notifySessionOptionsChange(this._pendingSessionResource, [{ optionId: optionGroup.id, value: option }]).catch((err) => this.logService.error(`Failed to notify extension of ${optionGroup.id} change:`, err));
          }
          this._renderLocalModePickers();
        }, "setOption"),
        getOptionGroup: /* @__PURE__ */ __name(() => {
          const groups = this.chatSessionsService.getOptionGroupsForSessionType(sessionType);
          return groups?.find((g) => g.id === optionGroup.id);
        }, "getOptionGroup"),
        getSessionResource: /* @__PURE__ */ __name(() => this._pendingSessionResource, "getSessionResource")
      };
      const action = toAction({ id: optionGroup.id, label: optionGroup.name, run: /* @__PURE__ */ __name(() => {
      }, "run") });
      const widget = this.instantiationService.createInstance(optionGroup.searchable ? SearchableOptionPickerActionItem : ChatSessionPickerActionItem, action, initialState, itemDelegate);
      this._localModeDisposables.add(widget);
      const slot = dom.append(container, dom.$(".sessions-chat-picker-slot"));
      widget.render(slot);
    }
  }
  _evaluateOptionGroupVisibility(optionGroup) {
    if (!optionGroup.when) {
      return true;
    }
    const expr = ContextKeyExpr.deserialize(optionGroup.when);
    return !expr || this.contextKeyService.contextMatchesRules(expr);
  }
  _getDefaultOptionForGroup(optionGroup) {
    const selectedOption = this._selectedOptions.get(optionGroup.id);
    if (selectedOption) {
      return selectedOption;
    }
    if (this._pendingSessionResource) {
      const sessionOption = this.chatSessionsService.getSessionOption(this._pendingSessionResource, optionGroup.id);
      if (!isString(sessionOption)) {
        return sessionOption;
      }
    }
    return optionGroup.items.find((item) => item.default === true);
  }
  _syncOptionsFromSession(sessionResource) {
    const activeSessionType = this._getEffectiveTarget();
    if (!activeSessionType) {
      return;
    }
    const optionGroups = this.chatSessionsService.getOptionGroupsForSessionType(activeSessionType);
    if (!optionGroups) {
      return;
    }
    for (const optionGroup of optionGroups) {
      if (isModelOptionGroup(optionGroup)) {
        continue;
      }
      const currentOption = this.chatSessionsService.getSessionOption(sessionResource, optionGroup.id);
      if (!currentOption) {
        continue;
      }
      let item;
      if (typeof currentOption === "string") {
        item = optionGroup.items.find((m) => m.id === currentOption.trim());
      } else {
        item = currentOption;
      }
      if (item) {
        const { locked: _locked, ...unlocked } = item;
        this._selectedOptions.set(optionGroup.id, unlocked);
        this._updateOptionContextKey(optionGroup.id, item.id);
        this._optionEmitters.get(optionGroup.id)?.fire(item);
      }
    }
  }
  _updateOptionContextKey(optionGroupId, optionItemId) {
    let contextKey = this._optionContextKeys.get(optionGroupId);
    if (!contextKey) {
      const rawKey = new RawContextKey(`chatSessionOption.${optionGroupId}`, "");
      contextKey = rawKey.bindTo(this.contextKeyService);
      this._optionContextKeys.set(optionGroupId, contextKey);
    }
    contextKey.set(optionItemId.trim());
  }
  _getOrCreateOptionEmitter(optionGroupId) {
    let emitter = this._optionEmitters.get(optionGroupId);
    if (!emitter) {
      emitter = new Emitter();
      this._optionEmitters.set(optionGroupId, emitter);
      this._pickerWidgetDisposables.add(emitter);
    }
    return emitter;
  }
  _disposePickerWidgets() {
    this._pickerWidgetDisposables.clear();
    this._pickerWidgets.clear();
    this._optionEmitters.clear();
  }
  _clearExtensionPickers() {
    this._pickerWidgetDisposables.clear();
    this._pickerWidgets.clear();
    this._optionEmitters.clear();
    if (this._extensionPickersLeftContainer) {
      this._extensionPickersLeftContainer.style.display = "none";
    }
    if (this._extensionPickersRightContainer) {
      dom.clearNode(this._extensionPickersRightContainer);
    }
  }
  // --- Send ---
  _send() {
    const query = this._editor.getModel()?.getValue().trim();
    if (!query) {
      return;
    }
    const target = this._getEffectiveTarget();
    if (!target) {
      this.logService.warn("ChatWelcomeWidget: No target selected, cannot create session");
      return;
    }
    const position = this._options.sessionPosition ?? ChatSessionPosition.Sidebar;
    const resource = this._pendingSessionResource ?? getResourceForNewChatSession({ type: target, position, displayName: "" });
    const contribution = target !== AgentSessionProviders.Local ? this.chatSessionsService.getChatSessionContribution(target) : void 0;
    const sendOptions = {
      location: ChatAgentLocation.Chat,
      userSelectedModelId: this._currentLanguageModel.get()?.identifier,
      modeInfo: {
        kind: ChatModeKind.Agent,
        isBuiltin: true,
        modeInstructions: void 0,
        modeId: "agent",
        applyCodeBlockSuggestionId: void 0
      },
      agentIdSilent: contribution?.type
    };
    const folderUri = this._selectedFolderUri ?? this.workspaceContextService.getWorkspace().folders[0]?.uri;
    this._options.onSendRequest?.({
      resource,
      target,
      query,
      sendOptions,
      selectedOptions: new Map(this._selectedOptions),
      folderUri
    });
  }
  // --- Layout ---
  layout(_height, _width) {
    this._editor?.layout();
  }
  setVisible(_visible) {
  }
  focusInput() {
    this._editor?.focus();
  }
  updateAllowedTargets(targets) {
    this._targetConfig.setAllowedTargets(targets);
  }
};
NewChatWidget = __decorate([
  __param(1, IInstantiationService),
  __param(2, IChatSessionsService),
  __param(3, IModelService),
  __param(4, IConfigurationService),
  __param(5, ILanguageModelsService),
  __param(6, IContextKeyService),
  __param(7, IContextMenuService),
  __param(8, ILogService),
  __param(9, IHoverService),
  __param(10, IWorkspaceContextService),
  __param(11, IFileDialogService),
  __param(12, IWorkspacesService),
  __param(13, IStorageService)
], NewChatWidget);
const SessionsViewId = "workbench.view.sessions.chat";
let NewChatViewPane = class NewChatViewPane2 extends ViewPane {
  static {
    __name(this, "NewChatViewPane");
  }
  constructor(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService, activeSessionService, workspaceContextService, logService) {
    super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
    this.activeSessionService = activeSessionService;
    this.workspaceContextService = workspaceContextService;
    this.logService = logService;
  }
  renderBody(container) {
    super.renderBody(container);
    this._widget = this._register(this.instantiationService.createInstance(NewChatWidget, {
      targetConfig: {
        allowedTargets: this.computeAllowedTargets(),
        defaultTarget: AgentSessionProviders.Local
      },
      onSendRequest: /* @__PURE__ */ __name((data) => {
        this.activeSessionService.sendRequestForNewSession(data.resource, data.query, data.sendOptions, data.selectedOptions, data.folderUri).catch((e) => this.logService.error("NewChatViewPane: Failed to open session and send request", e));
      }, "onSendRequest")
    }));
    this._widget.render(container);
    this._widget.focusInput();
    this._register(this.workspaceContextService.onDidChangeWorkspaceFolders(() => {
      this._widget?.updateAllowedTargets(this.computeAllowedTargets());
    }));
  }
  computeAllowedTargets() {
    const targets = [AgentSessionProviders.Local, AgentSessionProviders.Cloud];
    return targets;
  }
  layoutBody(height, width) {
    super.layoutBody(height, width);
    this._widget?.layout(height, width);
  }
  focus() {
    super.focus();
    this._widget?.focusInput();
  }
  setVisible(visible) {
    super.setVisible(visible);
    this._widget?.setVisible(visible);
  }
};
NewChatViewPane = __decorate([
  __param(1, IKeybindingService),
  __param(2, IContextMenuService),
  __param(3, IConfigurationService),
  __param(4, IContextKeyService),
  __param(5, IViewDescriptorService),
  __param(6, IInstantiationService),
  __param(7, IOpenerService),
  __param(8, IThemeService),
  __param(9, IHoverService),
  __param(10, ISessionsManagementService),
  __param(11, IWorkspaceContextService),
  __param(12, ILogService)
], NewChatViewPane);
function isModelOptionGroup(group) {
  if (group.id === "models") {
    return true;
  }
  const nameLower = group.name.toLowerCase();
  return nameLower === "model" || nameLower === "models";
}
__name(isModelOptionGroup, "isModelOptionGroup");
function isRepoOrFolderGroup(group) {
  const idLower = group.id.toLowerCase();
  const nameLower = group.name.toLowerCase();
  return idLower === "repositories" || idLower === "folders" || nameLower === "repository" || nameLower === "repositories" || nameLower === "folder" || nameLower === "folders";
}
__name(isRepoOrFolderGroup, "isRepoOrFolderGroup");
function getAgentSessionProviderName(provider) {
  switch (provider) {
    case AgentSessionProviders.Local:
      return localize("chat.session.providerLabel.local", "Local");
    case AgentSessionProviders.Background:
      return localize("chat.session.providerLabel.background", "Worktree");
    case AgentSessionProviders.Cloud:
      return localize("chat.session.providerLabel.cloud", "Cloud");
    case AgentSessionProviders.Claude:
      return "Claude";
    case AgentSessionProviders.Codex:
      return "Codex";
    case AgentSessionProviders.Growth:
      return "Growth";
  }
}
__name(getAgentSessionProviderName, "getAgentSessionProviderName");
export {
  NewChatViewPane,
  SessionsViewId
};
//# sourceMappingURL=newChatViewPane.js.map
