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
import "../../../browser/media/sidebarActionButton.css";
import "./media/customizationsToolbar.css";
import { Codicon } from "../../../../base/common/codicons.js";
import { Disposable, DisposableStore } from "../../../../base/common/lifecycle.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { localize, localize2 } from "../../../../nls.js";
import { Action2, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { IActionViewItemService } from "../../../../platform/actions/browser/actionViewItemService.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { registerWorkbenchContribution2 } from "../../../../workbench/common/contributions.js";
import { IEditorGroupsService } from "../../../../workbench/services/editor/common/editorGroupsService.js";
import { AICustomizationManagementEditor } from "../../aiCustomizationManagement/browser/aiCustomizationManagementEditor.js";
import { AICustomizationManagementSection } from "../../aiCustomizationManagement/browser/aiCustomizationManagement.js";
import { AICustomizationManagementEditorInput } from "../../aiCustomizationManagement/browser/aiCustomizationManagementEditorInput.js";
import { IPromptsService } from "../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js";
import { PromptsType } from "../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js";
import { ILanguageModelsService } from "../../../../workbench/contrib/chat/common/languageModels.js";
import { IMcpService } from "../../../../workbench/contrib/mcp/common/mcpTypes.js";
import { Menus } from "../../../browser/menus.js";
import { agentIcon, instructionsIcon, promptIcon, skillIcon, hookIcon, workspaceIcon, userIcon, extensionIcon } from "../../aiCustomizationTreeView/browser/aiCustomizationTreeViewIcons.js";
import { ActionViewItem } from "../../../../base/browser/ui/actionbar/actionViewItems.js";
import { $, append } from "../../../../base/browser/dom.js";
import { autorun } from "../../../../base/common/observable.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { ISessionsManagementService } from "./sessionsManagementService.js";
import { Button } from "../../../../base/browser/ui/button/button.js";
import { defaultButtonStyles } from "../../../../platform/theme/browser/defaultStyles.js";
import { getPromptSourceCounts, getSkillSourceCounts, getSourceCountsTotal } from "./customizationCounts.js";
const CUSTOMIZATION_ITEMS = [
  {
    id: "sessions.customization.agents",
    label: localize("agents", "Agents"),
    icon: agentIcon,
    section: AICustomizationManagementSection.Agents,
    getSourceCounts: /* @__PURE__ */ __name((ps) => getPromptSourceCounts(ps, PromptsType.agent), "getSourceCounts")
  },
  {
    id: "sessions.customization.skills",
    label: localize("skills", "Skills"),
    icon: skillIcon,
    section: AICustomizationManagementSection.Skills,
    getSourceCounts: /* @__PURE__ */ __name((ps) => getSkillSourceCounts(ps), "getSourceCounts")
  },
  {
    id: "sessions.customization.instructions",
    label: localize("instructions", "Instructions"),
    icon: instructionsIcon,
    section: AICustomizationManagementSection.Instructions,
    getSourceCounts: /* @__PURE__ */ __name((ps) => getPromptSourceCounts(ps, PromptsType.instructions), "getSourceCounts")
  },
  {
    id: "sessions.customization.prompts",
    label: localize("prompts", "Prompts"),
    icon: promptIcon,
    section: AICustomizationManagementSection.Prompts,
    getSourceCounts: /* @__PURE__ */ __name((ps) => getPromptSourceCounts(ps, PromptsType.prompt), "getSourceCounts")
  },
  {
    id: "sessions.customization.hooks",
    label: localize("hooks", "Hooks"),
    icon: hookIcon,
    section: AICustomizationManagementSection.Hooks,
    getSourceCounts: /* @__PURE__ */ __name((ps) => getPromptSourceCounts(ps, PromptsType.hook), "getSourceCounts")
  },
  {
    id: "sessions.customization.mcpServers",
    label: localize("mcpServers", "MCP Servers"),
    icon: Codicon.server,
    section: AICustomizationManagementSection.McpServers,
    getCount: /* @__PURE__ */ __name((_lm, mcp) => Promise.resolve(mcp.servers.get().length), "getCount")
  },
  {
    id: "sessions.customization.models",
    label: localize("models", "Models"),
    icon: Codicon.vm,
    section: AICustomizationManagementSection.Models,
    getCount: /* @__PURE__ */ __name((lm) => Promise.resolve(lm.getLanguageModelIds().length), "getCount")
  }
];
let CustomizationLinkViewItem = class CustomizationLinkViewItem2 extends ActionViewItem {
  static {
    __name(this, "CustomizationLinkViewItem");
  }
  constructor(action, options, _config, _promptsService, _languageModelsService, _mcpService, _workspaceContextService, _activeSessionService) {
    super(void 0, action, { ...options, icon: false, label: false });
    this._config = _config;
    this._promptsService = _promptsService;
    this._languageModelsService = _languageModelsService;
    this._mcpService = _mcpService;
    this._workspaceContextService = _workspaceContextService;
    this._activeSessionService = _activeSessionService;
    this._viewItemDisposables = this._register(new DisposableStore());
  }
  getTooltip() {
    return void 0;
  }
  render(container) {
    super.render(container);
    container.classList.add("customization-link-widget", "sidebar-action");
    const buttonContainer = append(container, $(".customization-link-button-container"));
    this._button = this._viewItemDisposables.add(new Button(buttonContainer, {
      ...defaultButtonStyles,
      secondary: true,
      title: false,
      supportIcons: true,
      buttonSecondaryBackground: "transparent",
      buttonSecondaryHoverBackground: void 0,
      buttonSecondaryForeground: void 0,
      buttonSecondaryBorder: void 0
    }));
    this._button.element.classList.add("customization-link-button", "sidebar-action-button");
    this._button.label = `$(${this._config.icon.id}) ${this._config.label}`;
    this._viewItemDisposables.add(this._button.onDidClick(() => {
      this._action.run();
    }));
    this._countContainer = append(this._button.element, $("span.customization-link-counts"));
    this._viewItemDisposables.add(this._promptsService.onDidChangeCustomAgents(() => this._updateCounts()));
    this._viewItemDisposables.add(this._promptsService.onDidChangeSlashCommands(() => this._updateCounts()));
    this._viewItemDisposables.add(this._languageModelsService.onDidChangeLanguageModels(() => this._updateCounts()));
    this._viewItemDisposables.add(autorun((reader) => {
      this._mcpService.servers.read(reader);
      this._updateCounts();
    }));
    this._viewItemDisposables.add(this._workspaceContextService.onDidChangeWorkspaceFolders(() => this._updateCounts()));
    this._viewItemDisposables.add(autorun((reader) => {
      this._activeSessionService.activeSession.read(reader);
      this._updateCounts();
    }));
    this._updateCounts();
  }
  async _updateCounts() {
    if (!this._countContainer) {
      return;
    }
    if (this._config.getSourceCounts) {
      const counts = await this._config.getSourceCounts(this._promptsService);
      this._renderSourceCounts(this._countContainer, counts);
    } else if (this._config.getCount) {
      const count = await this._config.getCount(this._languageModelsService, this._mcpService);
      this._renderSimpleCount(this._countContainer, count);
    }
  }
  _renderSourceCounts(container, counts) {
    container.textContent = "";
    const total = getSourceCountsTotal(counts);
    container.classList.toggle("hidden", total === 0);
    if (total === 0) {
      return;
    }
    const sources = [
      { count: counts.workspace, icon: workspaceIcon, title: localize("workspaceCount", "{0} from workspace", counts.workspace) },
      { count: counts.user, icon: userIcon, title: localize("userCount", "{0} from user", counts.user) },
      { count: counts.extension, icon: extensionIcon, title: localize("extensionCount", "{0} from extensions", counts.extension) }
    ];
    for (const source of sources) {
      if (source.count === 0) {
        continue;
      }
      const badge = append(container, $("span.source-count-badge"));
      badge.title = source.title;
      const icon = append(badge, $("span.source-count-icon"));
      icon.classList.add(...ThemeIcon.asClassNameArray(source.icon));
      const num = append(badge, $("span.source-count-num"));
      num.textContent = `${source.count}`;
    }
  }
  _renderSimpleCount(container, count) {
    container.textContent = "";
    container.classList.toggle("hidden", count === 0);
    if (count > 0) {
      const badge = append(container, $("span.source-count-badge"));
      const num = append(badge, $("span.source-count-num"));
      num.textContent = `${count}`;
    }
  }
};
CustomizationLinkViewItem = __decorate([
  __param(3, IPromptsService),
  __param(4, ILanguageModelsService),
  __param(5, IMcpService),
  __param(6, IWorkspaceContextService),
  __param(7, ISessionsManagementService)
], CustomizationLinkViewItem);
let CustomizationsToolbarContribution = class CustomizationsToolbarContribution2 extends Disposable {
  static {
    __name(this, "CustomizationsToolbarContribution");
  }
  static {
    this.ID = "workbench.contrib.sessionsCustomizationsToolbar";
  }
  constructor(actionViewItemService, instantiationService) {
    super();
    for (const [index, config] of CUSTOMIZATION_ITEMS.entries()) {
      this._register(actionViewItemService.register(Menus.SidebarCustomizations, config.id, (action, options) => {
        return instantiationService.createInstance(CustomizationLinkViewItem, action, options, config);
      }, void 0));
      this._register(registerAction2(class extends Action2 {
        constructor() {
          super({
            id: config.id,
            title: localize2("customizationAction", "{0}", config.label),
            menu: {
              id: Menus.SidebarCustomizations,
              group: "navigation",
              order: index + 1
            }
          });
        }
        async run(accessor) {
          const editorGroupsService = accessor.get(IEditorGroupsService);
          const input = AICustomizationManagementEditorInput.getOrCreate();
          const editor = await editorGroupsService.activeGroup.openEditor(input, { pinned: true });
          if (editor instanceof AICustomizationManagementEditor) {
            editor.selectSectionById(config.section);
          }
        }
      }));
    }
  }
};
CustomizationsToolbarContribution = __decorate([
  __param(0, IActionViewItemService),
  __param(1, IInstantiationService)
], CustomizationsToolbarContribution);
registerWorkbenchContribution2(
  CustomizationsToolbarContribution.ID,
  CustomizationsToolbarContribution,
  3
  /* WorkbenchPhase.AfterRestored */
);
//# sourceMappingURL=customizationsToolbar.contribution.js.map
