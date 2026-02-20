var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { localize } from "../../../../nls.js";
import { MenuId } from "../../../../platform/actions/common/actions.js";
const AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID = "workbench.editor.aiCustomizationManagement";
const AI_CUSTOMIZATION_MANAGEMENT_EDITOR_INPUT_ID = "workbench.input.aiCustomizationManagement";
const AICustomizationManagementCommands = {
  OpenEditor: "aiCustomization.openManagementEditor",
  CreateNewAgent: "aiCustomization.createNewAgent",
  CreateNewSkill: "aiCustomization.createNewSkill",
  CreateNewInstructions: "aiCustomization.createNewInstructions",
  CreateNewPrompt: "aiCustomization.createNewPrompt"
};
const AICustomizationManagementSection = {
  Agents: "agents",
  Skills: "skills",
  Instructions: "instructions",
  Prompts: "prompts",
  Hooks: "hooks",
  McpServers: "mcpServers",
  Models: "models"
};
const CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_EDITOR = new RawContextKey("aiCustomizationManagementEditorFocused", false, localize("aiCustomizationManagementEditorFocused", "Whether the AI Customizations editor is focused"));
const CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_SECTION = new RawContextKey("aiCustomizationManagementSection", AICustomizationManagementSection.Agents, localize("aiCustomizationManagementSection", "The currently selected section in the AI Customizations editor"));
const AICustomizationManagementTitleMenuId = MenuId.for("AICustomizationManagementEditorTitle");
const AICustomizationManagementItemMenuId = MenuId.for("AICustomizationManagementEditorItem");
const AI_CUSTOMIZATION_MANAGEMENT_SELECTED_SECTION_KEY = "aiCustomizationManagement.selectedSection";
const AI_CUSTOMIZATION_MANAGEMENT_SIDEBAR_WIDTH_KEY = "aiCustomizationManagement.sidebarWidth";
const AI_CUSTOMIZATION_MANAGEMENT_SEARCH_KEY = "aiCustomizationManagement.searchQuery";
const SIDEBAR_DEFAULT_WIDTH = 200;
const SIDEBAR_MIN_WIDTH = 150;
const SIDEBAR_MAX_WIDTH = 350;
const CONTENT_MIN_WIDTH = 400;
function getActiveSessionRoot(activeSessionService) {
  const session = activeSessionService.getActiveSession();
  return session?.worktree ?? session?.repository;
}
__name(getActiveSessionRoot, "getActiveSessionRoot");
export {
  AICustomizationManagementCommands,
  AICustomizationManagementItemMenuId,
  AICustomizationManagementSection,
  AICustomizationManagementTitleMenuId,
  AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID,
  AI_CUSTOMIZATION_MANAGEMENT_EDITOR_INPUT_ID,
  AI_CUSTOMIZATION_MANAGEMENT_SEARCH_KEY,
  AI_CUSTOMIZATION_MANAGEMENT_SELECTED_SECTION_KEY,
  AI_CUSTOMIZATION_MANAGEMENT_SIDEBAR_WIDTH_KEY,
  CONTENT_MIN_WIDTH,
  CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_EDITOR,
  CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_SECTION,
  SIDEBAR_DEFAULT_WIDTH,
  SIDEBAR_MAX_WIDTH,
  SIDEBAR_MIN_WIDTH,
  getActiveSessionRoot
};
//# sourceMappingURL=aiCustomizationManagement.js.map
