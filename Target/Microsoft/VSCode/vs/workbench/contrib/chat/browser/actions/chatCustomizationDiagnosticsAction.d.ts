import { PromptsStorage } from '../../common/promptSyntax/service/promptsService.js';
import { PromptsType } from '../../common/promptSyntax/promptTypes.js';
import { URI } from '../../../../../base/common/uri.js';
import { IWorkspaceFolder } from '../../../../../platform/workspace/common/workspace.js';
import { IParsedHook } from '../promptSyntax/hookUtils.js';
/**
 * Information about a file that was loaded or skipped.
 */
export interface IFileStatusInfo {
    uri: URI;
    status: 'loaded' | 'skipped' | 'overwritten';
    reason?: string;
    name?: string;
    storage: PromptsStorage;
    /** For overwritten files, the name of the file that took precedence */
    overwrittenBy?: string;
    /** Extension ID if this file comes from an extension */
    extensionId?: string;
    /** If false, hidden from / menu (user-invocable: false) */
    userInvocable?: boolean;
    /** If true, won't be auto-loaded by agent (disable-model-invocation: true) */
    disableModelInvocation?: boolean;
}
/**
 * Path information with scan order.
 */
export interface IPathInfo {
    uri: URI;
    exists: boolean;
    storage: PromptsStorage;
    /** 1-based scan order (lower = higher priority) */
    scanOrder: number;
    /** Original path string for display (e.g., '~/.copilot/agents' or '.github/agents') */
    displayPath: string;
    /** Whether this is a default folder (vs custom configured) */
    isDefault: boolean;
}
/**
 * Status information for a specific type of prompt files.
 */
export interface ITypeStatusInfo {
    type: PromptsType;
    paths: IPathInfo[];
    files: IFileStatusInfo[];
    enabled: boolean;
    /** For hooks only: parsed hooks grouped by lifecycle */
    parsedHooks?: IParsedHook[];
}
/**
 * Registers the Diagnostics action for the chat context menu.
 */
export declare function registerChatCustomizationDiagnosticsAction(): void;
export interface ISpecialFilesStatus {
    agentsMd: {
        enabled: boolean;
        files: URI[];
    };
    copilotInstructions: {
        enabled: boolean;
        files: URI[];
    };
    claudeMd: {
        enabled: boolean;
        files: URI[];
    };
}
/**
 * Formats the status output as a compact markdown string with tree structure.
 * Files are grouped under their parent paths.
 * Special files (AGENTS.md, copilot-instructions.md) are merged into their respective sections.
 */
export declare function formatStatusOutput(statusInfos: ITypeStatusInfo[], specialFiles: ISpecialFilesStatus, workspaceFolders: readonly IWorkspaceFolder[]): string;
