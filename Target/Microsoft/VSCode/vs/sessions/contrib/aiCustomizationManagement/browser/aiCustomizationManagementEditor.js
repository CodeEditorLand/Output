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
var AICustomizationManagementEditor_1;
import "./media/aiCustomizationManagement.css";
import * as DOM from "../../../../base/browser/dom.js";
import { DisposableStore, MutableDisposable, toDisposable } from "../../../../base/common/lifecycle.js";
import { Event } from "../../../../base/common/event.js";
import { autorun } from "../../../../base/common/observable.js";
import { Sizing, SplitView } from "../../../../base/browser/ui/splitview/splitview.js";
import { CodeEditorWidget } from "../../../../editor/browser/widget/codeEditor/codeEditorWidget.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ILayoutService } from "../../../../platform/layout/browser/layoutService.js";
import { getSimpleEditorOptions } from "../../../../workbench/contrib/codeEditor/browser/simpleEditorOptions.js";
import { localize } from "../../../../nls.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { EditorPane } from "../../../../workbench/browser/parts/editor/editorPane.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { WorkbenchList } from "../../../../platform/list/browser/listService.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { basename, isEqual } from "../../../../base/common/resources.js";
import { URI } from "../../../../base/common/uri.js";
import { registerColor } from "../../../../platform/theme/common/colorRegistry.js";
import { PANEL_BORDER } from "../../../../workbench/common/theme.js";
import { AICustomizationManagementEditorInput } from "./aiCustomizationManagementEditorInput.js";
import { AICustomizationListWidget } from "./aiCustomizationListWidget.js";
import { McpListWidget } from "./mcpListWidget.js";
import { AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID, AI_CUSTOMIZATION_MANAGEMENT_SIDEBAR_WIDTH_KEY, AI_CUSTOMIZATION_MANAGEMENT_SELECTED_SECTION_KEY, AICustomizationManagementSection, CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_EDITOR, CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_SECTION, SIDEBAR_DEFAULT_WIDTH, SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH, CONTENT_MIN_WIDTH, getActiveSessionRoot } from "./aiCustomizationManagement.js";
import { agentIcon, instructionsIcon, promptIcon, skillIcon, hookIcon } from "../../aiCustomizationTreeView/browser/aiCustomizationTreeViewIcons.js";
import { ChatModelsWidget } from "../../../../workbench/contrib/chat/browser/chatManagement/chatModelsWidget.js";
import { PromptsType } from "../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js";
import { PromptsStorage } from "../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js";
import { NEW_PROMPT_COMMAND_ID, NEW_INSTRUCTIONS_COMMAND_ID, NEW_AGENT_COMMAND_ID, NEW_SKILL_COMMAND_ID } from "../../../../workbench/contrib/chat/browser/promptSyntax/newPromptFileActions.js";
import { showConfigureHooksQuickPick } from "../../../../workbench/contrib/chat/browser/promptSyntax/hookActions.js";
import { CustomizationCreatorService } from "./customizationCreatorService.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IAgentSessionsService } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsService.js";
import { ISessionsManagementService } from "../../sessions/browser/sessionsManagementService.js";
import { AgentSessionProviders } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessions.js";
import { IWorkingCopyService } from "../../../../workbench/services/workingCopy/common/workingCopyService.js";
const $ = DOM.$;
const aiCustomizationManagementSashBorder = registerColor("aiCustomizationManagement.sashBorder", PANEL_BORDER, localize("aiCustomizationManagementSashBorder", "The color of the AI Customization Management editor splitview sash border."));
class SectionItemDelegate {
  static {
    __name(this, "SectionItemDelegate");
  }
  getHeight() {
    return 26;
  }
  getTemplateId() {
    return "sectionItem";
  }
}
class SectionItemRenderer {
  static {
    __name(this, "SectionItemRenderer");
  }
  constructor() {
    this.templateId = "sectionItem";
  }
  renderTemplate(container) {
    container.classList.add("section-list-item");
    const icon = DOM.append(container, $(".section-icon"));
    const label = DOM.append(container, $(".section-label"));
    return { container, icon, label };
  }
  renderElement(element, index, templateData) {
    templateData.icon.className = "section-icon";
    templateData.icon.classList.add(...ThemeIcon.asClassNameArray(element.icon));
    templateData.label.textContent = element.label;
  }
  disposeTemplate() {
  }
}
let AICustomizationManagementEditor = class AICustomizationManagementEditor2 extends EditorPane {
  static {
    __name(this, "AICustomizationManagementEditor");
  }
  static {
    AICustomizationManagementEditor_1 = this;
  }
  static {
    this.ID = AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID;
  }
  constructor(group, telemetryService, themeService, storageService, instantiationService, contextKeyService, openerService, textModelService, configurationService, layoutService, commandService, activeSessionService, agentSessionsService, workingCopyService) {
    super(AICustomizationManagementEditor_1.ID, group, telemetryService, themeService, storageService);
    this.storageService = storageService;
    this.instantiationService = instantiationService;
    this.openerService = openerService;
    this.textModelService = textModelService;
    this.configurationService = configurationService;
    this.layoutService = layoutService;
    this.commandService = commandService;
    this.activeSessionService = activeSessionService;
    this.agentSessionsService = agentSessionsService;
    this.workingCopyService = workingCopyService;
    this.editorModelChangeDisposables = this._register(new DisposableStore());
    this.currentEditingIsWorktree = false;
    this.viewMode = "list";
    this.sections = [];
    this.selectedSection = AICustomizationManagementSection.Agents;
    this.editorDisposables = this._register(new DisposableStore());
    this.inputDisposables = this._register(new MutableDisposable());
    this.inEditorContextKey = CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_EDITOR.bindTo(contextKeyService);
    this.sectionContextKey = CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_SECTION.bindTo(contextKeyService);
    this.customizationCreator = this.instantiationService.createInstance(CustomizationCreatorService);
    this._register(autorun((reader) => {
      this.activeSessionService.activeSession.read(reader);
      if (this.viewMode !== "editor" || !this.currentEditingIsWorktree) {
        return;
      }
      this.currentWorktreeUri = getActiveSessionRoot(this.activeSessionService);
    }));
    this._register(toDisposable(() => {
      this.currentModelRef?.dispose();
      this.currentModelRef = void 0;
    }));
    this.sections.push({ id: AICustomizationManagementSection.Agents, label: localize("agents", "Agents"), icon: agentIcon }, { id: AICustomizationManagementSection.Skills, label: localize("skills", "Skills"), icon: skillIcon }, { id: AICustomizationManagementSection.Instructions, label: localize("instructions", "Instructions"), icon: instructionsIcon }, { id: AICustomizationManagementSection.Prompts, label: localize("prompts", "Prompts"), icon: promptIcon }, { id: AICustomizationManagementSection.Hooks, label: localize("hooks", "Hooks"), icon: hookIcon }, { id: AICustomizationManagementSection.McpServers, label: localize("mcpServers", "MCP Servers"), icon: Codicon.server }, { id: AICustomizationManagementSection.Models, label: localize("models", "Models"), icon: Codicon.vm });
    const savedSection = this.storageService.get(
      AI_CUSTOMIZATION_MANAGEMENT_SELECTED_SECTION_KEY,
      0
      /* StorageScope.PROFILE */
    );
    if (savedSection && Object.values(AICustomizationManagementSection).includes(savedSection)) {
      this.selectedSection = savedSection;
    }
  }
  createEditor(parent) {
    this.editorDisposables.clear();
    this.container = DOM.append(parent, $(".ai-customization-management-editor"));
    this.createSplitView();
    this.updateStyles();
  }
  createSplitView() {
    this.splitViewContainer = DOM.append(this.container, $(".management-split-view"));
    this.sidebarContainer = $(".management-sidebar");
    this.contentContainer = $(".management-content");
    this.createSidebar();
    this.createContent();
    this.splitView = this.editorDisposables.add(new SplitView(this.splitViewContainer, {
      orientation: 1,
      proportionalLayout: true
    }));
    const savedWidth = this.storageService.getNumber(AI_CUSTOMIZATION_MANAGEMENT_SIDEBAR_WIDTH_KEY, 0, SIDEBAR_DEFAULT_WIDTH);
    this.splitView.addView({
      onDidChange: Event.None,
      element: this.sidebarContainer,
      minimumSize: SIDEBAR_MIN_WIDTH,
      maximumSize: SIDEBAR_MAX_WIDTH,
      layout: /* @__PURE__ */ __name((width, _, height) => {
        this.sidebarContainer.style.width = `${width}px`;
        if (height !== void 0) {
          const listHeight = height - 24;
          this.sectionsList.layout(listHeight, width);
        }
      }, "layout")
    }, savedWidth, void 0, true);
    this.splitView.addView({
      onDidChange: Event.None,
      element: this.contentContainer,
      minimumSize: CONTENT_MIN_WIDTH,
      maximumSize: Number.POSITIVE_INFINITY,
      layout: /* @__PURE__ */ __name((width, _, height) => {
        this.contentContainer.style.width = `${width}px`;
        if (height !== void 0) {
          this.listWidget.layout(height - 16, width - 24);
          this.mcpListWidget.layout(height - 16, width - 24);
          const modelsFooterHeight = this.modelsFooterElement?.offsetHeight || 80;
          this.modelsWidget.layout(height - 16 - modelsFooterHeight, width);
          if (this.viewMode === "editor" && this.embeddedEditor) {
            const editorHeaderHeight = 50;
            const padding = 24;
            const editorHeight = height - editorHeaderHeight - padding;
            const editorWidth = width - padding;
            this.embeddedEditor.layout({ width: Math.max(0, editorWidth), height: Math.max(0, editorHeight) });
          }
        }
      }, "layout")
    }, Sizing.Distribute, void 0, true);
    this.editorDisposables.add(this.splitView.onDidSashChange(() => {
      const width = this.splitView.getViewSize(0);
      this.storageService.store(
        AI_CUSTOMIZATION_MANAGEMENT_SIDEBAR_WIDTH_KEY,
        width,
        0,
        0
        /* StorageTarget.USER */
      );
    }));
    this.editorDisposables.add(this.splitView.onDidSashReset(() => {
      const totalWidth = this.splitView.getViewSize(0) + this.splitView.getViewSize(1);
      this.splitView.resizeView(0, SIDEBAR_DEFAULT_WIDTH);
      this.splitView.resizeView(1, totalWidth - SIDEBAR_DEFAULT_WIDTH);
    }));
  }
  createSidebar() {
    const sidebarContent = DOM.append(this.sidebarContainer, $(".sidebar-content"));
    const sectionsListContainer = DOM.append(sidebarContent, $(".sidebar-sections-list"));
    this.sectionsList = this.editorDisposables.add(this.instantiationService.createInstance(WorkbenchList, "AICustomizationManagementSections", sectionsListContainer, new SectionItemDelegate(), [new SectionItemRenderer()], {
      multipleSelectionSupport: false,
      setRowLineHeight: false,
      horizontalScrolling: false,
      accessibilityProvider: {
        getAriaLabel: /* @__PURE__ */ __name((item) => item.label, "getAriaLabel"),
        getWidgetAriaLabel: /* @__PURE__ */ __name(() => localize("sectionsAriaLabel", "AI Customization Sections"), "getWidgetAriaLabel")
      },
      openOnSingleClick: true,
      identityProvider: {
        getId: /* @__PURE__ */ __name((item) => item.id, "getId")
      }
    }));
    this.sectionsList.splice(0, this.sectionsList.length, this.sections);
    const selectedIndex = this.sections.findIndex((s) => s.id === this.selectedSection);
    if (selectedIndex >= 0) {
      this.sectionsList.setSelection([selectedIndex]);
    }
    this.editorDisposables.add(this.sectionsList.onDidChangeSelection((e) => {
      if (e.elements.length > 0) {
        this.selectSection(e.elements[0].id);
      }
    }));
  }
  createContent() {
    const contentInner = DOM.append(this.contentContainer, $(".content-inner"));
    this.promptsContentContainer = DOM.append(contentInner, $(".prompts-content-container"));
    this.listWidget = this.editorDisposables.add(this.instantiationService.createInstance(AICustomizationListWidget));
    this.promptsContentContainer.appendChild(this.listWidget.element);
    this.editorDisposables.add(this.listWidget.onDidSelectItem((item) => {
      this.openItem(item);
    }));
    this.editorDisposables.add(this.listWidget.onDidRequestCreate((promptType) => {
      this.createNewItemWithAI(promptType);
    }));
    this.editorDisposables.add(this.listWidget.onDidRequestCreateManual(({ type, target }) => {
      this.createNewItemManual(type, target);
    }));
    this.modelsContentContainer = DOM.append(contentInner, $(".models-content-container"));
    this.modelsWidget = this.editorDisposables.add(this.instantiationService.createInstance(ChatModelsWidget));
    this.modelsContentContainer.appendChild(this.modelsWidget.element);
    this.modelsFooterElement = DOM.append(this.modelsContentContainer, $(".section-footer"));
    const modelsDescription = DOM.append(this.modelsFooterElement, $("p.section-footer-description"));
    modelsDescription.textContent = localize("modelsDescription", "Browse and manage language models from different providers. Select models for use in chat, code completion, and other AI features.");
    const modelsLink = DOM.append(this.modelsFooterElement, $("a.section-footer-link"));
    modelsLink.textContent = localize("learnMoreModels", "Learn more about language models");
    modelsLink.href = "https://code.visualstudio.com/docs/copilot/customization/language-models";
    this.editorDisposables.add(DOM.addDisposableListener(modelsLink, "click", (e) => {
      e.preventDefault();
      this.openerService.open(URI.parse(modelsLink.href));
    }));
    this.mcpContentContainer = DOM.append(contentInner, $(".mcp-content-container"));
    this.mcpListWidget = this.editorDisposables.add(this.instantiationService.createInstance(McpListWidget));
    this.mcpContentContainer.appendChild(this.mcpListWidget.element);
    this.editorContentContainer = DOM.append(contentInner, $(".editor-content-container"));
    this.createEmbeddedEditor();
    this.updateContentVisibility();
    if (this.isPromptsSection(this.selectedSection)) {
      void this.listWidget.setSection(this.selectedSection);
    }
  }
  isPromptsSection(section) {
    return section === AICustomizationManagementSection.Agents || section === AICustomizationManagementSection.Skills || section === AICustomizationManagementSection.Instructions || section === AICustomizationManagementSection.Prompts || section === AICustomizationManagementSection.Hooks;
  }
  selectSection(section) {
    if (this.selectedSection === section) {
      return;
    }
    if (this.viewMode === "editor") {
      this.goBackToList();
    }
    this.selectedSection = section;
    this.sectionContextKey.set(section);
    this.storageService.store(
      AI_CUSTOMIZATION_MANAGEMENT_SELECTED_SECTION_KEY,
      section,
      0,
      0
      /* StorageTarget.USER */
    );
    this.updateEditorTitle();
    this.updateContentVisibility();
    if (this.isPromptsSection(section)) {
      void this.listWidget.setSection(section);
    }
  }
  updateEditorTitle() {
    const sectionItem = this.sections.find((s) => s.id === this.selectedSection);
    if (sectionItem && this.input instanceof AICustomizationManagementEditorInput) {
      this.input.setSectionLabel(sectionItem.label);
    }
  }
  updateContentVisibility() {
    const isEditorMode = this.viewMode === "editor";
    const isPromptsSection = this.isPromptsSection(this.selectedSection);
    const isModelsSection = this.selectedSection === AICustomizationManagementSection.Models;
    const isMcpSection = this.selectedSection === AICustomizationManagementSection.McpServers;
    this.promptsContentContainer.style.display = !isEditorMode && isPromptsSection ? "" : "none";
    this.modelsContentContainer.style.display = !isEditorMode && isModelsSection ? "" : "none";
    this.mcpContentContainer.style.display = !isEditorMode && isMcpSection ? "" : "none";
    this.editorContentContainer.style.display = isEditorMode ? "" : "none";
    if (isModelsSection) {
      this.modelsWidget.render();
      if (this.dimension) {
        this.layout(this.dimension);
      }
    }
  }
  openItem(item) {
    const isWorktreeFile = item.storage === PromptsStorage.local;
    const isReadOnly = item.storage === PromptsStorage.extension;
    this.showEmbeddedEditor(item.uri, item.name, isWorktreeFile, isReadOnly);
  }
  /**
   * Creates the embedded editor container with back button and CodeEditorWidget.
   */
  createEmbeddedEditor() {
    const editorHeader = DOM.append(this.editorContentContainer, $(".editor-header"));
    const backButton = DOM.append(editorHeader, $("button.editor-back-button"));
    backButton.setAttribute("aria-label", localize("backToList", "Back to list"));
    const backIcon = DOM.append(backButton, $(`.codicon.codicon-${Codicon.arrowLeft.id}`));
    backIcon.setAttribute("aria-hidden", "true");
    this.editorDisposables.add(DOM.addDisposableListener(backButton, "click", () => {
      this.goBackToList();
    }));
    const itemInfo = DOM.append(editorHeader, $(".editor-item-info"));
    this.editorItemNameElement = DOM.append(itemInfo, $(".editor-item-name"));
    this.editorItemPathElement = DOM.append(itemInfo, $(".editor-item-path"));
    this.editorSaveIndicator = DOM.append(editorHeader, $(".editor-save-indicator"));
    this.embeddedEditorContainer = DOM.append(this.editorContentContainer, $(".embedded-editor-container"));
    const overflowWidgetsDomNode = this.layoutService.getContainer(DOM.getWindow(this.embeddedEditorContainer)).appendChild($(".embedded-editor-overflow-widgets.monaco-editor"));
    this.editorDisposables.add(toDisposable(() => overflowWidgetsDomNode.remove()));
    const editorOptions = {
      ...getSimpleEditorOptions(this.configurationService),
      readOnly: false,
      minimap: { enabled: false },
      lineNumbers: "on",
      wordWrap: "on",
      scrollBeyondLastLine: false,
      automaticLayout: false,
      folding: true,
      renderLineHighlight: "all",
      scrollbar: {
        vertical: "auto",
        horizontal: "auto"
      },
      overflowWidgetsDomNode
    };
    this.embeddedEditor = this.editorDisposables.add(this.instantiationService.createInstance(CodeEditorWidget, this.embeddedEditorContainer, editorOptions, {
      isSimpleWidget: false
      // Use default contributions for full IntelliSense, completions, linting, etc.
    }));
  }
  /**
   * Shows the embedded editor with the content of the given item.
   */
  async showEmbeddedEditor(uri, displayName, isWorktreeFile = false, isReadOnly = false) {
    this.currentModelRef?.dispose();
    this.currentModelRef = void 0;
    this.currentEditingUri = uri;
    this.viewMode = "editor";
    this.editorItemNameElement.textContent = displayName;
    this.editorItemPathElement.textContent = basename(uri);
    const worktreeDir = getActiveSessionRoot(this.activeSessionService);
    this.currentWorktreeUri = isWorktreeFile ? worktreeDir : void 0;
    this.currentEditingIsWorktree = isWorktreeFile;
    this.updateContentVisibility();
    try {
      const ref = await this.textModelService.createModelReference(uri);
      this.currentModelRef = ref;
      this.embeddedEditor.setModel(ref.object.textEditorModel);
      this.embeddedEditor.updateOptions({ readOnly: isReadOnly });
      if (this.dimension) {
        this.layout(this.dimension);
      }
      this.embeddedEditor.focus();
      this.editorModelChangeDisposables.clear();
      this.editorModelChangeDisposables.add(ref.object.textEditorModel.onDidChangeContent(() => {
        this.showSavingSpinner();
      }));
      this.editorModelChangeDisposables.add(this.workingCopyService.onDidSave((e) => {
        if (isEqual(e.workingCopy.resource, uri)) {
          this.showSavedCheckmark();
        }
      }));
    } catch (error) {
      console.error("Failed to load model for embedded editor:", error);
      this.goBackToList();
    }
  }
  /**
   * Goes back from the embedded editor view to the list view.
   */
  goBackToList() {
    const fileUri = this.currentEditingUri;
    const worktreeUri = this.currentWorktreeUri;
    if (fileUri && worktreeUri) {
      this.commitWorktreeFile(worktreeUri, fileUri);
    }
    this.currentModelRef?.dispose();
    this.currentModelRef = void 0;
    this.currentEditingUri = void 0;
    this.currentWorktreeUri = void 0;
    this.currentEditingIsWorktree = false;
    this.editorModelChangeDisposables.clear();
    this.clearSaveIndicator();
    this.embeddedEditor.setModel(null);
    this.viewMode = "list";
    this.updateContentVisibility();
    if (this.dimension) {
      this.layout(this.dimension);
    }
    this.listWidget?.focusSearch();
  }
  /**
   * Creates a new customization using the AI-guided flow.
   * Closes the management editor and opens a chat session with a hidden
   * custom agent that guides the user through creating the customization.
   */
  async createNewItemWithAI(type) {
    if (this.input) {
      await this.group.closeEditor(this.input);
    }
    await this.customizationCreator.createWithAI(type);
  }
  /**
   * Creates a new prompt file. If there's an active worktree, asks the user
   * whether to save in the worktree or user directory first.
   */
  async createNewItemManual(type, target) {
    if (type === PromptsType.hook) {
      const isWorktree2 = target === "worktree";
      await this.instantiationService.invokeFunction(showConfigureHooksQuickPick, {
        openEditor: /* @__PURE__ */ __name(async (resource, options2) => {
          await this.showEmbeddedEditor(resource, basename(resource), isWorktree2);
          return;
        }, "openEditor"),
        onHookFileCreated: isWorktree2 ? (_uri) => {
        } : void 0
      });
      return;
    }
    const targetDir = target === "worktree" ? this.customizationCreator.resolveTargetDirectory(type) : await this.customizationCreator.resolveUserDirectory(type);
    const isWorktree = target === "worktree";
    const options = {
      targetFolder: targetDir,
      targetStorage: target === "user" ? PromptsStorage.user : PromptsStorage.local,
      openFile: /* @__PURE__ */ __name(async (uri) => {
        await this.showEmbeddedEditor(uri, basename(uri), isWorktree);
        return this.embeddedEditor;
      }, "openFile")
    };
    let commandId;
    switch (type) {
      case PromptsType.prompt:
        commandId = NEW_PROMPT_COMMAND_ID;
        break;
      case PromptsType.instructions:
        commandId = NEW_INSTRUCTIONS_COMMAND_ID;
        break;
      case PromptsType.agent:
        commandId = NEW_AGENT_COMMAND_ID;
        break;
      case PromptsType.skill:
        commandId = NEW_SKILL_COMMAND_ID;
        break;
      default:
        return;
    }
    await this.commandService.executeCommand(commandId, options);
    void this.listWidget.refresh();
  }
  updateStyles() {
    const borderColor = this.theme.getColor(aiCustomizationManagementSashBorder);
    if (borderColor) {
      this.splitView?.style({ separatorBorder: borderColor });
    }
  }
  async setInput(input, options, context, token) {
    this.inEditorContextKey.set(true);
    this.sectionContextKey.set(this.selectedSection);
    await super.setInput(input, options, context, token);
    this.updateEditorTitle();
    if (this.dimension) {
      this.layout(this.dimension);
    }
  }
  clearInput() {
    this.inEditorContextKey.set(false);
    this.inputDisposables.clear();
    if (this.viewMode === "editor") {
      this.goBackToList();
    }
    super.clearInput();
  }
  layout(dimension) {
    this.dimension = dimension;
    if (this.container && this.splitView) {
      this.splitViewContainer.style.height = `${dimension.height}px`;
      this.splitView.layout(dimension.width, dimension.height);
    }
  }
  focus() {
    super.focus();
    if (this.viewMode === "editor") {
      this.embeddedEditor?.focus();
      return;
    }
    if (this.selectedSection === AICustomizationManagementSection.McpServers) {
      this.mcpListWidget?.focusSearch();
    } else if (this.selectedSection === AICustomizationManagementSection.Models) {
      this.modelsWidget?.focusSearch();
    } else {
      this.listWidget?.focusSearch();
    }
  }
  /**
   * Selects a specific section programmatically.
   */
  selectSectionById(sectionId) {
    const index = this.sections.findIndex((s) => s.id === sectionId);
    if (index >= 0) {
      this.sectionsList.setFocus([index]);
      this.sectionsList.setSelection([index]);
    }
  }
  /**
   * Shows the spinning loader to indicate unsaved changes.
   */
  showSavingSpinner() {
    this.editorSaveIndicator.className = "editor-save-indicator visible";
    this.editorSaveIndicator.classList.add(...ThemeIcon.asClassNameArray(Codicon.loading), "codicon-modifier-spin");
    this.editorSaveIndicator.title = localize("saving", "Saving...");
  }
  /**
   * Shows the checkmark after the file has been saved to disk.
   */
  showSavedCheckmark() {
    this.editorSaveIndicator.className = "editor-save-indicator visible saved";
    this.editorSaveIndicator.classList.add(...ThemeIcon.asClassNameArray(Codicon.check));
    this.editorSaveIndicator.title = localize("saved", "Saved");
  }
  clearSaveIndicator() {
    this.editorSaveIndicator.className = "editor-save-indicator";
    this.editorSaveIndicator.title = "";
  }
  /**
   * Commits a worktree file via the extension and refreshes the Changes view.
   */
  async commitWorktreeFile(worktreeUri, fileUri) {
    await this.commandService.executeCommand("github.copilot.cli.sessions.commitToWorktree", { worktreeUri, fileUri });
    await this.agentSessionsService.model.resolve(AgentSessionProviders.Background);
    this.refreshList();
  }
  /**
   * Refreshes the list widget.
   */
  refreshList() {
    void this.listWidget.refresh();
  }
};
AICustomizationManagementEditor = AICustomizationManagementEditor_1 = __decorate([
  __param(1, ITelemetryService),
  __param(2, IThemeService),
  __param(3, IStorageService),
  __param(4, IInstantiationService),
  __param(5, IContextKeyService),
  __param(6, IOpenerService),
  __param(7, ITextModelService),
  __param(8, IConfigurationService),
  __param(9, ILayoutService),
  __param(10, ICommandService),
  __param(11, ISessionsManagementService),
  __param(12, IAgentSessionsService),
  __param(13, IWorkingCopyService)
], AICustomizationManagementEditor);
export {
  AICustomizationManagementEditor,
  aiCustomizationManagementSashBorder
};
//# sourceMappingURL=aiCustomizationManagementEditor.js.map
