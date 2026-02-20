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
import "./media/aiCustomizationManagement.css";
import * as DOM from "../../../../base/browser/dom.js";
import { Disposable, DisposableStore } from "../../../../base/common/lifecycle.js";
import { Emitter } from "../../../../base/common/event.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { autorun } from "../../../../base/common/observable.js";
import { basename, dirname } from "../../../../base/common/resources.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { localize } from "../../../../nls.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { WorkbenchList } from "../../../../platform/list/browser/listService.js";
import { IPromptsService, PromptsStorage } from "../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js";
import { PromptsType } from "../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js";
import { agentIcon, instructionsIcon, promptIcon, skillIcon, hookIcon, userIcon, workspaceIcon, extensionIcon } from "../../aiCustomizationTreeView/browser/aiCustomizationTreeViewIcons.js";
import { AICustomizationManagementItemMenuId, AICustomizationManagementSection, getActiveSessionRoot } from "./aiCustomizationManagement.js";
import { InputBox } from "../../../../base/browser/ui/inputbox/inputBox.js";
import { defaultButtonStyles, defaultInputBoxStyles } from "../../../../platform/theme/browser/defaultStyles.js";
import { Delayer } from "../../../../base/common/async.js";
import { IContextMenuService, IContextViewService } from "../../../../platform/contextview/browser/contextView.js";
import { HighlightedLabel } from "../../../../base/browser/ui/highlightedlabel/highlightedLabel.js";
import { matchesFuzzy } from "../../../../base/common/filters.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { ButtonWithDropdown } from "../../../../base/browser/ui/button/button.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { getFlatContextMenuActions } from "../../../../platform/actions/browser/menuEntryActionViewItem.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IPathService } from "../../../../workbench/services/path/common/pathService.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { parseAllHookFiles } from "../../../../workbench/contrib/chat/browser/promptSyntax/hookUtils.js";
import { OS } from "../../../../base/common/platform.js";
import { IRemoteAgentService } from "../../../../workbench/services/remote/common/remoteAgentService.js";
import { ISessionsManagementService } from "../../sessions/browser/sessionsManagementService.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { Action, Separator } from "../../../../base/common/actions.js";
import { IClipboardService } from "../../../../platform/clipboard/common/clipboardService.js";
import { ISCMService } from "../../../../workbench/contrib/scm/common/scm.js";
const $ = DOM.$;
const ITEM_HEIGHT = 44;
const GROUP_HEADER_HEIGHT = 32;
const GROUP_HEADER_HEIGHT_WITH_SEPARATOR = 40;
class AICustomizationListDelegate {
  static {
    __name(this, "AICustomizationListDelegate");
  }
  getHeight(element) {
    if (element.type === "group-header") {
      return element.isFirst ? GROUP_HEADER_HEIGHT : GROUP_HEADER_HEIGHT_WITH_SEPARATOR;
    }
    return ITEM_HEIGHT;
  }
  getTemplateId(element) {
    return element.type === "group-header" ? "groupHeader" : "aiCustomizationItem";
  }
}
class GroupHeaderRenderer {
  static {
    __name(this, "GroupHeaderRenderer");
  }
  constructor() {
    this.templateId = "groupHeader";
  }
  renderTemplate(container) {
    const disposables = new DisposableStore();
    container.classList.add("ai-customization-group-header");
    const chevron = DOM.append(container, $(".group-chevron"));
    const icon = DOM.append(container, $(".group-icon"));
    const label = DOM.append(container, $(".group-label"));
    const count = DOM.append(container, $(".group-count"));
    return { container, chevron, icon, label, count, disposables };
  }
  renderElement(element, _index, templateData) {
    templateData.chevron.className = "group-chevron";
    templateData.chevron.classList.add(...ThemeIcon.asClassNameArray(element.collapsed ? Codicon.chevronRight : Codicon.chevronDown));
    templateData.icon.className = "group-icon";
    templateData.icon.classList.add(...ThemeIcon.asClassNameArray(element.icon));
    templateData.label.textContent = element.label;
    templateData.count.textContent = `${element.count}`;
    templateData.container.classList.toggle("collapsed", element.collapsed);
    templateData.container.classList.toggle("has-previous-group", !element.isFirst);
  }
  disposeTemplate(templateData) {
    templateData.disposables.dispose();
  }
}
class AICustomizationItemRenderer {
  static {
    __name(this, "AICustomizationItemRenderer");
  }
  constructor() {
    this.templateId = "aiCustomizationItem";
  }
  renderTemplate(container) {
    const disposables = new DisposableStore();
    const elementDisposables = new DisposableStore();
    container.classList.add("ai-customization-list-item");
    const leftSection = DOM.append(container, $(".item-left"));
    const storageBadge = DOM.append(leftSection, $(".storage-badge"));
    const textContainer = DOM.append(leftSection, $(".item-text"));
    const nameLabel = disposables.add(new HighlightedLabel(DOM.append(textContainer, $(".item-name"))));
    const description = disposables.add(new HighlightedLabel(DOM.append(textContainer, $(".item-description"))));
    const gitStatusBadge = DOM.append(container, $(".git-status-badge"));
    const actionsContainer = DOM.append(container, $(".item-right"));
    return {
      container,
      actionsContainer,
      nameLabel,
      description,
      storageBadge,
      gitStatusBadge,
      disposables,
      elementDisposables
    };
  }
  renderElement(entry, index, templateData) {
    templateData.elementDisposables.clear();
    const element = entry.item;
    templateData.nameLabel.set(element.name, element.nameMatches);
    const secondaryText = element.description || element.filename;
    if (secondaryText) {
      templateData.description.set(secondaryText, element.description ? element.descriptionMatches : void 0);
      templateData.description.element.style.display = "";
      templateData.description.element.classList.toggle("is-filename", !element.description);
    } else {
      templateData.description.set("", void 0);
      templateData.description.element.style.display = "none";
    }
    let storageBadgeIcon;
    let storageBadgeLabel;
    switch (element.storage) {
      case PromptsStorage.local:
        storageBadgeIcon = workspaceIcon;
        storageBadgeLabel = localize("worktree", "Worktree");
        break;
      case PromptsStorage.user:
        storageBadgeIcon = userIcon;
        storageBadgeLabel = localize("user", "User");
        break;
      case PromptsStorage.extension:
        storageBadgeIcon = extensionIcon;
        storageBadgeLabel = localize("extension", "Extension");
        break;
    }
    templateData.storageBadge.className = "storage-badge";
    templateData.storageBadge.classList.add(...ThemeIcon.asClassNameArray(storageBadgeIcon));
    templateData.storageBadge.title = storageBadgeLabel;
    const gitBadge = templateData.gitStatusBadge;
    gitBadge.className = "git-status-badge";
    if (element.gitStatus === "committed") {
      gitBadge.classList.add(...ThemeIcon.asClassNameArray(Codicon.check));
      gitBadge.classList.add("committed");
      gitBadge.textContent = "";
      gitBadge.title = localize("committedStatus", "Committed");
      gitBadge.style.display = "";
    } else {
      gitBadge.style.display = "none";
    }
  }
  disposeTemplate(templateData) {
    templateData.elementDisposables.dispose();
    templateData.disposables.dispose();
  }
}
function sectionToPromptType(section) {
  switch (section) {
    case AICustomizationManagementSection.Agents:
      return PromptsType.agent;
    case AICustomizationManagementSection.Skills:
      return PromptsType.skill;
    case AICustomizationManagementSection.Instructions:
      return PromptsType.instructions;
    case AICustomizationManagementSection.Hooks:
      return PromptsType.hook;
    case AICustomizationManagementSection.Prompts:
    default:
      return PromptsType.prompt;
  }
}
__name(sectionToPromptType, "sectionToPromptType");
let AICustomizationListWidget = class AICustomizationListWidget2 extends Disposable {
  static {
    __name(this, "AICustomizationListWidget");
  }
  constructor(instantiationService, promptsService, contextViewService, openerService, contextMenuService, menuService, contextKeyService, fileService, workspaceContextService, pathService, labelService, remoteAgentService, activeSessionService, logService, clipboardService, scmService) {
    super();
    this.instantiationService = instantiationService;
    this.promptsService = promptsService;
    this.contextViewService = contextViewService;
    this.openerService = openerService;
    this.contextMenuService = contextMenuService;
    this.menuService = menuService;
    this.contextKeyService = contextKeyService;
    this.fileService = fileService;
    this.workspaceContextService = workspaceContextService;
    this.pathService = pathService;
    this.labelService = labelService;
    this.remoteAgentService = remoteAgentService;
    this.activeSessionService = activeSessionService;
    this.logService = logService;
    this.clipboardService = clipboardService;
    this.scmService = scmService;
    this.currentSection = AICustomizationManagementSection.Agents;
    this.allItems = [];
    this.displayEntries = [];
    this.searchQuery = "";
    this.collapsedGroups = /* @__PURE__ */ new Set();
    this.delayedFilter = new Delayer(200);
    this._onDidSelectItem = this._register(new Emitter());
    this.onDidSelectItem = this._onDidSelectItem.event;
    this._onDidChangeItemCount = this._register(new Emitter());
    this.onDidChangeItemCount = this._onDidChangeItemCount.event;
    this._onDidRequestCreate = this._register(new Emitter());
    this.onDidRequestCreate = this._onDidRequestCreate.event;
    this._onDidRequestCreateManual = this._register(new Emitter());
    this.onDidRequestCreateManual = this._onDidRequestCreateManual.event;
    this.element = $(".ai-customization-list-widget");
    this.create();
    this._register(this.workspaceContextService.onDidChangeWorkspaceFolders(() => this.refresh()));
    this._register(autorun((reader) => {
      this.activeSessionService.activeSession.read(reader);
      this.updateAddButton();
      this.refresh();
    }));
    const trackRepoChanges = /* @__PURE__ */ __name((repo) => {
      this._register(repo.provider.onDidChangeResources(() => {
        this.updateGitStatus(this.allItems);
        this.filterItems();
      }));
    }, "trackRepoChanges");
    for (const repo of [...this.scmService.repositories]) {
      trackRepoChanges(repo);
    }
    this._register(this.scmService.onDidAddRepository((repo) => trackRepoChanges(repo)));
  }
  create() {
    this.searchAndButtonContainer = DOM.append(this.element, $(".list-search-and-button-container"));
    this.searchContainer = DOM.append(this.searchAndButtonContainer, $(".list-search-container"));
    this.searchInput = this._register(new InputBox(this.searchContainer, this.contextViewService, {
      placeholder: localize("searchPlaceholder", "Type to search..."),
      inputBoxStyles: defaultInputBoxStyles
    }));
    this._register(this.searchInput.onDidChange(() => {
      this.searchQuery = this.searchInput.value;
      this.delayedFilter.trigger(() => this.filterItems());
    }));
    const addButtonContainer = DOM.append(this.searchAndButtonContainer, $(".list-add-button-container"));
    this.addButton = this._register(new ButtonWithDropdown(addButtonContainer, {
      ...defaultButtonStyles,
      supportIcons: true,
      contextMenuProvider: this.contextMenuService,
      addPrimaryActionToDropdown: false,
      actions: { getActions: /* @__PURE__ */ __name(() => this.getDropdownActions(), "getActions") }
    }));
    this.addButton.element.classList.add("list-add-button");
    this._register(this.addButton.onDidClick(() => this.executePrimaryCreateAction()));
    this.updateAddButton();
    this.listContainer = DOM.append(this.element, $(".list-container"));
    this.emptyStateContainer = DOM.append(this.element, $(".list-empty-state"));
    this.emptyStateIcon = DOM.append(this.emptyStateContainer, $(".empty-state-icon"));
    this.emptyStateText = DOM.append(this.emptyStateContainer, $(".empty-state-text"));
    this.emptyStateSubtext = DOM.append(this.emptyStateContainer, $(".empty-state-subtext"));
    this.emptyStateContainer.style.display = "none";
    this.list = this._register(this.instantiationService.createInstance(WorkbenchList, "AICustomizationManagementList", this.listContainer, new AICustomizationListDelegate(), [
      new GroupHeaderRenderer(),
      this.instantiationService.createInstance(AICustomizationItemRenderer)
    ], {
      identityProvider: {
        getId: /* @__PURE__ */ __name((entry) => entry.type === "group-header" ? entry.id : entry.item.id, "getId")
      },
      accessibilityProvider: {
        getAriaLabel: /* @__PURE__ */ __name((entry) => {
          if (entry.type === "group-header") {
            return localize("groupAriaLabel", "{0}, {1} items, {2}", entry.label, entry.count, entry.collapsed ? localize("collapsed", "collapsed") : localize("expanded", "expanded"));
          }
          return entry.item.description ? localize("itemAriaLabel", "{0}, {1}", entry.item.name, entry.item.description) : entry.item.name;
        }, "getAriaLabel"),
        getWidgetAriaLabel: /* @__PURE__ */ __name(() => localize("listAriaLabel", "AI Customizations"), "getWidgetAriaLabel")
      },
      keyboardNavigationLabelProvider: {
        getKeyboardNavigationLabel: /* @__PURE__ */ __name((entry) => entry.type === "group-header" ? entry.label : entry.item.name, "getKeyboardNavigationLabel")
      },
      multipleSelectionSupport: false,
      openOnSingleClick: true
    }));
    this._register(this.list.onDidOpen((e) => {
      if (e.element) {
        if (e.element.type === "group-header") {
          this.toggleGroup(e.element);
        } else {
          this._onDidSelectItem.fire(e.element.item);
        }
      }
    }));
    this._register(this.list.onContextMenu((e) => this.onContextMenu(e)));
    this._register(this.promptsService.onDidChangeCustomAgents(() => this.refresh()));
    this._register(this.promptsService.onDidChangeSlashCommands(() => this.refresh()));
    this.sectionHeader = DOM.append(this.element, $(".section-footer"));
    this.sectionDescription = DOM.append(this.sectionHeader, $("p.section-footer-description"));
    this.sectionLink = DOM.append(this.sectionHeader, $("a.section-footer-link"));
    this._register(DOM.addDisposableListener(this.sectionLink, "click", (e) => {
      e.preventDefault();
      const href = this.sectionLink.href;
      if (href) {
        this.openerService.open(URI.parse(href));
      }
    }));
    this.updateSectionHeader();
  }
  /**
   * Handles context menu for list items.
   */
  onContextMenu(e) {
    if (!e.element || e.element.type !== "file-item") {
      return;
    }
    const item = e.element.item;
    const context = {
      uri: item.uri.toString(),
      name: item.name,
      promptType: item.promptType,
      storage: item.storage
    };
    const actions = this.menuService.getMenuActions(AICustomizationManagementItemMenuId, this.contextKeyService, {
      arg: context,
      shouldForwardArgs: true
    });
    const flatActions = getFlatContextMenuActions(actions);
    const copyActions = [
      new Separator(),
      new Action("copyFullPath", localize("copyFullPath", "Copy Full Path"), void 0, true, async () => {
        await this.clipboardService.writeText(item.uri.fsPath);
      }),
      new Action("copyRelativePath", localize("copyRelativePath", "Copy Relative Path"), void 0, true, async () => {
        const basePath = getActiveSessionRoot(this.activeSessionService);
        if (basePath && item.uri.fsPath.startsWith(basePath.fsPath)) {
          const relative = item.uri.fsPath.substring(basePath.fsPath.length + 1);
          await this.clipboardService.writeText(relative);
        } else {
          const relativePath = this.labelService.getUriLabel(item.uri, { relative: true });
          await this.clipboardService.writeText(relativePath);
        }
      })
    ];
    this.contextMenuService.showContextMenu({
      getAnchor: /* @__PURE__ */ __name(() => e.anchor, "getAnchor"),
      getActions: /* @__PURE__ */ __name(() => [...flatActions, ...copyActions], "getActions")
    });
  }
  /**
   * Sets the current section and loads items for that section.
   */
  async setSection(section) {
    this.currentSection = section;
    this.updateSectionHeader();
    this.updateAddButton();
    await this.loadItems();
  }
  /**
   * Updates the section header based on the current section.
   */
  updateSectionHeader() {
    let description;
    let docsUrl;
    let learnMoreLabel;
    switch (this.currentSection) {
      case AICustomizationManagementSection.Agents:
        description = localize("agentsDescription", "Configure the AI to adopt different personas tailored to specific development tasks. Each agent has its own instructions, tools, and behavior.");
        docsUrl = "https://code.visualstudio.com/docs/copilot/customization/custom-agents";
        learnMoreLabel = localize("learnMoreAgents", "Learn more about custom agents");
        break;
      case AICustomizationManagementSection.Skills:
        description = localize("skillsDescription", "Folders of instructions, scripts, and resources that Copilot loads when relevant to perform specialized tasks.");
        docsUrl = "https://code.visualstudio.com/docs/copilot/customization/agent-skills";
        learnMoreLabel = localize("learnMoreSkills", "Learn more about agent skills");
        break;
      case AICustomizationManagementSection.Instructions:
        description = localize("instructionsDescription", "Define common guidelines and rules that automatically influence how AI generates code and handles development tasks.");
        docsUrl = "https://code.visualstudio.com/docs/copilot/customization/custom-instructions";
        learnMoreLabel = localize("learnMoreInstructions", "Learn more about custom instructions");
        break;
      case AICustomizationManagementSection.Hooks:
        description = localize("hooksDescription", "Prompts executed at specific points during an agentic lifecycle.");
        docsUrl = "https://code.visualstudio.com/docs/copilot/customization/hooks";
        learnMoreLabel = localize("learnMoreHooks", "Learn more about hooks");
        break;
      case AICustomizationManagementSection.Prompts:
      default:
        description = localize("promptsDescription", "Reusable prompts for common development tasks like generating code, performing reviews, or scaffolding components.");
        docsUrl = "https://code.visualstudio.com/docs/copilot/customization/prompt-files";
        learnMoreLabel = localize("learnMorePrompts", "Learn more about prompt files");
        break;
    }
    this.sectionDescription.textContent = description;
    this.sectionLink.textContent = learnMoreLabel;
    this.sectionLink.href = docsUrl;
  }
  /**
   * Updates the add button label based on the current section.
   */
  updateAddButton() {
    const typeLabel = this.getTypeLabel();
    if (this.currentSection === AICustomizationManagementSection.Hooks) {
      this.addButton.label = `$(${Codicon.add.id}) New ${typeLabel}`;
      const hasWorktree2 = !!this.activeSessionService.getActiveSession()?.worktree;
      this.addButton.enabled = hasWorktree2;
      const disabledTitle = hasWorktree2 ? "" : localize("hooksCreateDisabled", "Open a session with a worktree to configure hooks.");
      this.addButton.primaryButton.setTitle(disabledTitle);
      this.addButton.dropdownButton.setTitle(disabledTitle);
      return;
    }
    this.addButton.primaryButton.setTitle("");
    this.addButton.dropdownButton.setTitle("");
    this.addButton.enabled = true;
    const hasWorktree = this.hasActiveWorktree();
    if (hasWorktree) {
      this.addButton.label = `$(${Codicon.add.id}) New ${typeLabel} (Worktree)`;
    } else {
      this.addButton.label = `$(${Codicon.add.id}) New ${typeLabel} (User)`;
    }
  }
  /**
   * Gets the dropdown actions for the add button.
   */
  getDropdownActions() {
    const typeLabel = this.getTypeLabel();
    const actions = [];
    const promptType = sectionToPromptType(this.currentSection);
    const hasWorktree = this.hasActiveWorktree();
    if (hasWorktree && promptType !== PromptsType.hook) {
      actions.push(new Action("createUser", `$(${Codicon.account.id}) New ${typeLabel} (User)`, void 0, true, () => {
        this._onDidRequestCreateManual.fire({ type: promptType, target: "user" });
      }));
    }
    actions.push(new Action("createWithAI", `$(${Codicon.sparkle.id}) Generate ${typeLabel}`, void 0, true, () => {
      this._onDidRequestCreate.fire(promptType);
    }));
    return actions;
  }
  /**
   * Checks if there's an active session root (worktree or repository).
   */
  hasActiveWorktree() {
    return !!getActiveSessionRoot(this.activeSessionService);
  }
  /**
   * Executes the primary create action based on context.
   */
  executePrimaryCreateAction() {
    const promptType = sectionToPromptType(this.currentSection);
    if (promptType === PromptsType.hook && !this.activeSessionService.getActiveSession()?.worktree) {
      return;
    }
    const target = this.hasActiveWorktree() || promptType === PromptsType.hook ? "worktree" : "user";
    this._onDidRequestCreateManual.fire({ type: promptType, target });
  }
  /**
   * Gets the type label for the current section.
   */
  getTypeLabel() {
    switch (this.currentSection) {
      case AICustomizationManagementSection.Agents:
        return localize("agent", "Agent");
      case AICustomizationManagementSection.Skills:
        return localize("skill", "Skill");
      case AICustomizationManagementSection.Instructions:
        return localize("instructions", "Instructions");
      case AICustomizationManagementSection.Hooks:
        return localize("hook", "Hook");
      case AICustomizationManagementSection.Prompts:
      default:
        return localize("prompt", "Prompt");
    }
  }
  /**
   * Refreshes the current section's items.
   */
  async refresh() {
    this.updateAddButton();
    await this.loadItems();
  }
  /**
   * Loads items for the current section.
   */
  async loadItems() {
    const promptType = sectionToPromptType(this.currentSection);
    const items = [];
    const folders = this.workspaceContextService.getWorkspace().folders;
    const activeRepo = getActiveSessionRoot(this.activeSessionService);
    this.logService.info(`[AICustomizationListWidget] loadItems: section=${this.currentSection}, promptType=${promptType}, workspaceFolders=[${folders.map((f) => f.uri.toString()).join(", ")}], activeRepo=${activeRepo?.toString() ?? "none"}`);
    if (promptType === PromptsType.agent) {
      const agents = await this.promptsService.getCustomAgents(CancellationToken.None);
      for (const agent of agents) {
        const filename = basename(agent.uri);
        items.push({
          id: agent.uri.toString(),
          uri: agent.uri,
          name: agent.name,
          filename,
          description: agent.description,
          storage: agent.source.storage,
          promptType
        });
      }
    } else if (promptType === PromptsType.skill) {
      const skills = await this.promptsService.findAgentSkills(CancellationToken.None);
      for (const skill of skills || []) {
        const filename = basename(skill.uri);
        const skillName = skill.name || basename(dirname(skill.uri)) || filename;
        items.push({
          id: skill.uri.toString(),
          uri: skill.uri,
          name: skillName,
          filename,
          description: skill.description,
          storage: skill.storage,
          promptType
        });
      }
    } else if (promptType === PromptsType.prompt) {
      const commands = await this.promptsService.getPromptSlashCommands(CancellationToken.None);
      for (const command of commands) {
        const filename = basename(command.promptPath.uri);
        items.push({
          id: command.promptPath.uri.toString(),
          uri: command.promptPath.uri,
          name: command.name,
          filename,
          description: command.description,
          storage: command.promptPath.storage,
          promptType
        });
      }
    } else if (promptType === PromptsType.hook) {
      const workspaceFolder = this.workspaceContextService.getWorkspace().folders[0];
      const workspaceRootUri = workspaceFolder?.uri;
      const userHomeUri = await this.pathService.userHome();
      const userHome = userHomeUri.fsPath ?? userHomeUri.path;
      const remoteEnv = await this.remoteAgentService.getEnvironment();
      const targetOS = remoteEnv?.os ?? OS;
      const parsedHooks = await parseAllHookFiles(this.promptsService, this.fileService, this.labelService, workspaceRootUri, userHome, targetOS, CancellationToken.None);
      for (const hook of parsedHooks) {
        const storage = hook.filePath.startsWith("~") ? PromptsStorage.user : PromptsStorage.local;
        items.push({
          id: `${hook.fileUri.toString()}#${hook.hookType}-${hook.index}`,
          uri: hook.fileUri,
          name: `${hook.hookTypeLabel}: ${hook.commandLabel}`,
          filename: basename(hook.fileUri),
          description: hook.filePath,
          storage,
          promptType
        });
      }
    } else {
      const allItems = await this.promptsService.listPromptFiles(promptType, CancellationToken.None);
      const workspaceItems = allItems.filter((item) => item.storage === PromptsStorage.local);
      const userItems = allItems.filter((item) => item.storage === PromptsStorage.user);
      const extensionItems = allItems.filter((item) => item.storage === PromptsStorage.extension);
      const mapToListItem = /* @__PURE__ */ __name((item) => {
        const filename = basename(item.uri);
        const friendlyName = item.name || this.getFriendlyName(filename);
        return {
          id: item.uri.toString(),
          uri: item.uri,
          name: friendlyName,
          filename,
          description: item.description,
          storage: item.storage,
          promptType
        };
      }, "mapToListItem");
      items.push(...workspaceItems.map(mapToListItem));
      items.push(...userItems.map(mapToListItem));
      items.push(...extensionItems.map(mapToListItem));
    }
    items.sort((a, b) => a.name.localeCompare(b.name));
    this.updateGitStatus(items);
    this.logService.info(`[AICustomizationListWidget] loadItems complete: ${items.length} items loaded [${items.map((i) => `${i.name}(${i.storage}:${i.uri.toString()})`).join(", ")}]`);
    this.allItems = items;
    this.filterItems();
    this._onDidChangeItemCount.fire(items.length);
  }
  /**
   * Updates git status on worktree items by checking SCM resource groups.
   * Files found in resource groups have uncommitted changes; others are committed.
   */
  updateGitStatus(items) {
    const uncommittedUris = /* @__PURE__ */ new Set();
    for (const repo of [...this.scmService.repositories]) {
      for (const group of repo.provider.groups) {
        for (const resource of group.resources) {
          uncommittedUris.add(resource.sourceUri.toString());
        }
      }
    }
    for (const item of items) {
      if (item.storage === PromptsStorage.local) {
        item.gitStatus = uncommittedUris.has(item.uri.toString()) ? "uncommitted" : "committed";
      }
    }
  }
  /**
   * Derives a friendly name from a filename by removing extension suffixes.
   */
  getFriendlyName(filename) {
    let name = filename.replace(/\.instructions\.md$/i, "").replace(/\.prompt\.md$/i, "").replace(/\.agent\.md$/i, "").replace(/\.md$/i, "");
    name = name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return name || filename;
  }
  /**
   * Filters items based on the current search query and builds grouped display entries.
   */
  filterItems() {
    let matchedItems;
    if (!this.searchQuery.trim()) {
      matchedItems = this.allItems.map((item) => ({ ...item, nameMatches: void 0, descriptionMatches: void 0 }));
    } else {
      const query = this.searchQuery.toLowerCase();
      matchedItems = [];
      for (const item of this.allItems) {
        const nameMatches = matchesFuzzy(query, item.name, true);
        const descriptionMatches = item.description ? matchesFuzzy(query, item.description, true) : null;
        const filenameMatches = matchesFuzzy(query, item.filename, true);
        if (nameMatches || descriptionMatches || filenameMatches) {
          matchedItems.push({
            ...item,
            nameMatches: nameMatches || void 0,
            descriptionMatches: descriptionMatches || void 0
          });
        }
      }
    }
    const totalBeforeFilter = matchedItems.length;
    this.logService.info(`[AICustomizationListWidget] filterItems: allItems=${this.allItems.length}, matched=${totalBeforeFilter}`);
    const groups = [
      { storage: PromptsStorage.local, label: localize("worktreeGroup", "Worktree"), icon: workspaceIcon, items: [] },
      { storage: PromptsStorage.user, label: localize("userGroup", "User"), icon: userIcon, items: [] },
      { storage: PromptsStorage.extension, label: localize("extensionGroup", "Extensions"), icon: extensionIcon, items: [] }
    ];
    for (const item of matchedItems) {
      const group = groups.find((g) => g.storage === item.storage);
      if (group) {
        group.items.push(item);
      }
    }
    for (const group of groups) {
      group.items.sort((a, b) => a.name.localeCompare(b.name));
    }
    this.displayEntries = [];
    let isFirstGroup = true;
    for (const group of groups) {
      if (group.items.length === 0) {
        continue;
      }
      const collapsed = this.collapsedGroups.has(group.storage);
      this.displayEntries.push({
        type: "group-header",
        id: `group-${group.storage}`,
        storage: group.storage,
        label: group.label,
        icon: group.icon,
        count: group.items.length,
        isFirst: isFirstGroup,
        collapsed
      });
      isFirstGroup = false;
      if (!collapsed) {
        for (const item of group.items) {
          this.displayEntries.push({ type: "file-item", item });
        }
      }
    }
    this.list.splice(0, this.list.length, this.displayEntries);
    this.logService.info(`[AICustomizationListWidget] filterItems complete: ${this.displayEntries.length} display entries spliced into list`);
    this.updateEmptyState();
  }
  /**
   * Toggles the collapsed state of a group.
   */
  toggleGroup(entry) {
    if (this.collapsedGroups.has(entry.storage)) {
      this.collapsedGroups.delete(entry.storage);
    } else {
      this.collapsedGroups.add(entry.storage);
    }
    this.filterItems();
  }
  updateEmptyState() {
    const hasItems = this.displayEntries.length > 0;
    if (!hasItems) {
      this.emptyStateContainer.style.display = "flex";
      this.listContainer.style.display = "none";
      this.emptyStateIcon.className = "empty-state-icon";
      const sectionIcon = this.getSectionIcon();
      this.emptyStateIcon.classList.add(...ThemeIcon.asClassNameArray(sectionIcon));
      if (this.searchQuery.trim()) {
        this.emptyStateText.textContent = localize("noMatchingItems", "No items match '{0}'", this.searchQuery);
        this.emptyStateSubtext.textContent = localize("tryDifferentSearch", "Try a different search term");
      } else {
        const emptyInfo = this.getEmptyStateInfo();
        this.emptyStateText.textContent = emptyInfo.title;
        this.emptyStateSubtext.textContent = emptyInfo.description;
      }
    } else {
      this.emptyStateContainer.style.display = "none";
      this.listContainer.style.display = "";
    }
  }
  getSectionIcon() {
    switch (this.currentSection) {
      case AICustomizationManagementSection.Agents:
        return agentIcon;
      case AICustomizationManagementSection.Skills:
        return skillIcon;
      case AICustomizationManagementSection.Instructions:
        return instructionsIcon;
      case AICustomizationManagementSection.Hooks:
        return hookIcon;
      case AICustomizationManagementSection.Prompts:
      default:
        return promptIcon;
    }
  }
  getEmptyStateInfo() {
    switch (this.currentSection) {
      case AICustomizationManagementSection.Agents:
        return {
          title: localize("noAgents", "No agents yet"),
          description: localize("createFirstAgent", "Create your first custom agent to get started")
        };
      case AICustomizationManagementSection.Skills:
        return {
          title: localize("noSkills", "No skills yet"),
          description: localize("createFirstSkill", "Create your first skill to extend agent capabilities")
        };
      case AICustomizationManagementSection.Instructions:
        return {
          title: localize("noInstructions", "No instructions yet"),
          description: localize("createFirstInstructions", "Add instructions to teach Copilot about your codebase")
        };
      case AICustomizationManagementSection.Hooks:
        return {
          title: localize("noHooks", "No hooks yet"),
          description: localize("createFirstHook", "Create hooks to execute commands at agent lifecycle events")
        };
      case AICustomizationManagementSection.Prompts:
      default:
        return {
          title: localize("noPrompts", "No prompts yet"),
          description: localize("createFirstPrompt", "Create reusable prompts for common tasks")
        };
    }
  }
  /**
   * Sets the search query programmatically.
   */
  setSearchQuery(query) {
    this.searchInput.value = query;
  }
  /**
   * Clears the search query.
   */
  clearSearch() {
    this.searchInput.value = "";
  }
  /**
   * Focuses the search input.
   */
  focusSearch() {
    this.searchInput.focus();
  }
  /**
   * Focuses the list.
   */
  focusList() {
    this.list.domFocus();
    if (this.displayEntries.length > 0) {
      this.list.setFocus([0]);
    }
  }
  /**
   * Layouts the widget.
   */
  layout(height, width) {
    const sectionFooterHeight = this.sectionHeader.offsetHeight || 100;
    const searchBarHeight = this.searchAndButtonContainer.offsetHeight || 40;
    const margins = 12;
    const listHeight = height - sectionFooterHeight - searchBarHeight - margins;
    this.searchInput.layout();
    this.listContainer.style.height = `${Math.max(0, listHeight)}px`;
    this.list.layout(Math.max(0, listHeight), width);
  }
  /**
   * Gets the total item count (before filtering).
   */
  get itemCount() {
    return this.allItems.length;
  }
};
AICustomizationListWidget = __decorate([
  __param(0, IInstantiationService),
  __param(1, IPromptsService),
  __param(2, IContextViewService),
  __param(3, IOpenerService),
  __param(4, IContextMenuService),
  __param(5, IMenuService),
  __param(6, IContextKeyService),
  __param(7, IFileService),
  __param(8, IWorkspaceContextService),
  __param(9, IPathService),
  __param(10, ILabelService),
  __param(11, IRemoteAgentService),
  __param(12, ISessionsManagementService),
  __param(13, ILogService),
  __param(14, IClipboardService),
  __param(15, ISCMService)
], AICustomizationListWidget);
export {
  AICustomizationListWidget,
  sectionToPromptType
};
//# sourceMappingURL=aiCustomizationListWidget.js.map
