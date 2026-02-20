import './media/aiCustomizationManagement.css';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { Event } from '../../../../base/common/event.js';
import { URI } from '../../../../base/common/uri.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IPromptsService, PromptsStorage } from '../../../../workbench/contrib/chat/common/promptSyntax/service/promptsService.js';
import { PromptsType } from '../../../../workbench/contrib/chat/common/promptSyntax/promptTypes.js';
import { AICustomizationManagementSection } from './aiCustomizationManagement.js';
import { IContextMenuService, IContextViewService } from '../../../../platform/contextview/browser/contextView.js';
import { IMatch } from '../../../../base/common/filters.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IMenuService } from '../../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IFileService } from '../../../../platform/files/common/files.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { IPathService } from '../../../../workbench/services/path/common/pathService.js';
import { ILabelService } from '../../../../platform/label/common/label.js';
import { IRemoteAgentService } from '../../../../workbench/services/remote/common/remoteAgentService.js';
import { ISessionsManagementService } from '../../sessions/browser/sessionsManagementService.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IClipboardService } from '../../../../platform/clipboard/common/clipboardService.js';
import { ISCMService } from '../../../../workbench/contrib/scm/common/scm.js';
/**
 * Represents an AI customization item in the list.
 */
export interface IAICustomizationListItem {
    readonly id: string;
    readonly uri: URI;
    readonly name: string;
    readonly filename: string;
    readonly description?: string;
    readonly storage: PromptsStorage;
    readonly promptType: PromptsType;
    gitStatus?: 'uncommitted' | 'committed';
    nameMatches?: IMatch[];
    descriptionMatches?: IMatch[];
}
/**
 * Maps section ID to prompt type.
 */
export declare function sectionToPromptType(section: AICustomizationManagementSection): PromptsType;
/**
 * Widget that displays a searchable list of AI customization items.
 */
export declare class AICustomizationListWidget extends Disposable {
    private readonly instantiationService;
    private readonly promptsService;
    private readonly contextViewService;
    private readonly openerService;
    private readonly contextMenuService;
    private readonly menuService;
    private readonly contextKeyService;
    private readonly fileService;
    private readonly workspaceContextService;
    private readonly pathService;
    private readonly labelService;
    private readonly remoteAgentService;
    private readonly activeSessionService;
    private readonly logService;
    private readonly clipboardService;
    private readonly scmService;
    readonly element: HTMLElement;
    private sectionHeader;
    private sectionDescription;
    private sectionLink;
    private searchAndButtonContainer;
    private searchContainer;
    private searchInput;
    private addButton;
    private listContainer;
    private list;
    private emptyStateContainer;
    private emptyStateIcon;
    private emptyStateText;
    private emptyStateSubtext;
    private currentSection;
    private allItems;
    private displayEntries;
    private searchQuery;
    private readonly collapsedGroups;
    private readonly delayedFilter;
    private readonly _onDidSelectItem;
    readonly onDidSelectItem: Event<IAICustomizationListItem>;
    private readonly _onDidChangeItemCount;
    readonly onDidChangeItemCount: Event<number>;
    private readonly _onDidRequestCreate;
    readonly onDidRequestCreate: Event<PromptsType>;
    private readonly _onDidRequestCreateManual;
    readonly onDidRequestCreateManual: Event<{
        type: PromptsType;
        target: 'worktree' | 'user';
    }>;
    constructor(instantiationService: IInstantiationService, promptsService: IPromptsService, contextViewService: IContextViewService, openerService: IOpenerService, contextMenuService: IContextMenuService, menuService: IMenuService, contextKeyService: IContextKeyService, fileService: IFileService, workspaceContextService: IWorkspaceContextService, pathService: IPathService, labelService: ILabelService, remoteAgentService: IRemoteAgentService, activeSessionService: ISessionsManagementService, logService: ILogService, clipboardService: IClipboardService, scmService: ISCMService);
    private create;
    /**
     * Handles context menu for list items.
     */
    private onContextMenu;
    /**
     * Sets the current section and loads items for that section.
     */
    setSection(section: AICustomizationManagementSection): Promise<void>;
    /**
     * Updates the section header based on the current section.
     */
    private updateSectionHeader;
    /**
     * Updates the add button label based on the current section.
     */
    private updateAddButton;
    /**
     * Gets the dropdown actions for the add button.
     */
    private getDropdownActions;
    /**
     * Checks if there's an active session root (worktree or repository).
     */
    private hasActiveWorktree;
    /**
     * Executes the primary create action based on context.
     */
    private executePrimaryCreateAction;
    /**
     * Gets the type label for the current section.
     */
    private getTypeLabel;
    /**
     * Refreshes the current section's items.
     */
    refresh(): Promise<void>;
    /**
     * Loads items for the current section.
     */
    private loadItems;
    /**
     * Updates git status on worktree items by checking SCM resource groups.
     * Files found in resource groups have uncommitted changes; others are committed.
     */
    private updateGitStatus;
    /**
     * Derives a friendly name from a filename by removing extension suffixes.
     */
    private getFriendlyName;
    /**
     * Filters items based on the current search query and builds grouped display entries.
     */
    private filterItems;
    /**
     * Toggles the collapsed state of a group.
     */
    private toggleGroup;
    private updateEmptyState;
    private getSectionIcon;
    private getEmptyStateInfo;
    /**
     * Sets the search query programmatically.
     */
    setSearchQuery(query: string): void;
    /**
     * Clears the search query.
     */
    clearSearch(): void;
    /**
     * Focuses the search input.
     */
    focusSearch(): void;
    /**
     * Focuses the list.
     */
    focusList(): void;
    /**
     * Layouts the widget.
     */
    layout(height: number, width: number): void;
    /**
     * Gets the total item count (before filtering).
     */
    get itemCount(): number;
}
