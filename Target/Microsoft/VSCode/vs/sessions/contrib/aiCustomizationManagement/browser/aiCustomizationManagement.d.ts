import { RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
import { URI } from '../../../../base/common/uri.js';
import { ISessionsManagementService } from '../../sessions/browser/sessionsManagementService.js';
import { MenuId } from '../../../../platform/actions/common/actions.js';
/**
 * Editor pane ID for the AI Customizations Management Editor.
 */
export declare const AI_CUSTOMIZATION_MANAGEMENT_EDITOR_ID = "workbench.editor.aiCustomizationManagement";
/**
 * Editor input type ID for serialization.
 */
export declare const AI_CUSTOMIZATION_MANAGEMENT_EDITOR_INPUT_ID = "workbench.input.aiCustomizationManagement";
/**
 * Command IDs for the AI Customizations Management Editor.
 */
export declare const AICustomizationManagementCommands: {
    readonly OpenEditor: "aiCustomization.openManagementEditor";
    readonly CreateNewAgent: "aiCustomization.createNewAgent";
    readonly CreateNewSkill: "aiCustomization.createNewSkill";
    readonly CreateNewInstructions: "aiCustomization.createNewInstructions";
    readonly CreateNewPrompt: "aiCustomization.createNewPrompt";
};
/**
 * Section IDs for the sidebar navigation.
 */
export declare const AICustomizationManagementSection: {
    readonly Agents: "agents";
    readonly Skills: "skills";
    readonly Instructions: "instructions";
    readonly Prompts: "prompts";
    readonly Hooks: "hooks";
    readonly McpServers: "mcpServers";
    readonly Models: "models";
};
export type AICustomizationManagementSection = typeof AICustomizationManagementSection[keyof typeof AICustomizationManagementSection];
/**
 * Context key indicating the AI Customization Management Editor is focused.
 */
export declare const CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_EDITOR: RawContextKey<boolean>;
/**
 * Context key for the currently selected section.
 */
export declare const CONTEXT_AI_CUSTOMIZATION_MANAGEMENT_SECTION: RawContextKey<string>;
/**
 * Menu ID for the AI Customization Management Editor title bar actions.
 */
export declare const AICustomizationManagementTitleMenuId: MenuId;
/**
 * Menu ID for the AI Customization Management Editor item context menu.
 */
export declare const AICustomizationManagementItemMenuId: MenuId;
/**
 * Storage key for persisting the selected section.
 */
export declare const AI_CUSTOMIZATION_MANAGEMENT_SELECTED_SECTION_KEY = "aiCustomizationManagement.selectedSection";
/**
 * Storage key for persisting the sidebar width.
 */
export declare const AI_CUSTOMIZATION_MANAGEMENT_SIDEBAR_WIDTH_KEY = "aiCustomizationManagement.sidebarWidth";
/**
 * Storage key for persisting the search query.
 */
export declare const AI_CUSTOMIZATION_MANAGEMENT_SEARCH_KEY = "aiCustomizationManagement.searchQuery";
/**
 * Layout constants for the editor.
 */
export declare const SIDEBAR_DEFAULT_WIDTH = 200;
export declare const SIDEBAR_MIN_WIDTH = 150;
export declare const SIDEBAR_MAX_WIDTH = 350;
export declare const CONTENT_MIN_WIDTH = 400;
export declare function getActiveSessionRoot(activeSessionService: ISessionsManagementService): URI | undefined;
