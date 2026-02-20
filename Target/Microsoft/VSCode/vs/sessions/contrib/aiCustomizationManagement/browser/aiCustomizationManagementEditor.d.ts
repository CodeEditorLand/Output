import './media/aiCustomizationManagement.css';
import * as DOM from '../../../../base/browser/dom.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { ITextModelService } from '../../../../editor/common/services/resolverService.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { ILayoutService } from '../../../../platform/layout/browser/layoutService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IEditorOptions } from '../../../../platform/editor/common/editor.js';
import { EditorPane } from '../../../../workbench/browser/parts/editor/editorPane.js';
import { IEditorOpenContext } from '../../../../workbench/common/editor.js';
import { IEditorGroup } from '../../../../workbench/services/editor/common/editorGroupsService.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { AICustomizationManagementEditorInput } from './aiCustomizationManagementEditorInput.js';
import { AICustomizationManagementSection } from './aiCustomizationManagement.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IAgentSessionsService } from '../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsService.js';
import { ISessionsManagementService } from '../../sessions/browser/sessionsManagementService.js';
import { IWorkingCopyService } from '../../../../workbench/services/workingCopy/common/workingCopyService.js';
export declare const aiCustomizationManagementSashBorder: string;
/**
 * Editor pane for the AI Customizations Management Editor.
 * Provides a global view of all AI customizations with a sidebar for navigation
 * and a content area showing a searchable list of items.
 */
export declare class AICustomizationManagementEditor extends EditorPane {
    private readonly storageService;
    private readonly instantiationService;
    private readonly openerService;
    private readonly textModelService;
    private readonly configurationService;
    private readonly layoutService;
    private readonly commandService;
    private readonly activeSessionService;
    private readonly agentSessionsService;
    private readonly workingCopyService;
    static readonly ID = "workbench.editor.aiCustomizationManagement";
    private container;
    private splitViewContainer;
    private splitView;
    private sidebarContainer;
    private sectionsList;
    private contentContainer;
    private listWidget;
    private mcpListWidget;
    private modelsWidget;
    private promptsContentContainer;
    private mcpContentContainer;
    private modelsContentContainer;
    private modelsFooterElement;
    private editorContentContainer;
    private embeddedEditorContainer;
    private embeddedEditor;
    private editorItemNameElement;
    private editorItemPathElement;
    private editorSaveIndicator;
    private readonly editorModelChangeDisposables;
    private currentEditingUri;
    private currentWorktreeUri;
    private currentEditingIsWorktree;
    private currentModelRef;
    private viewMode;
    private dimension;
    private readonly sections;
    private selectedSection;
    private readonly editorDisposables;
    private readonly inputDisposables;
    private readonly customizationCreator;
    private readonly inEditorContextKey;
    private readonly sectionContextKey;
    constructor(group: IEditorGroup, telemetryService: ITelemetryService, themeService: IThemeService, storageService: IStorageService, instantiationService: IInstantiationService, contextKeyService: IContextKeyService, openerService: IOpenerService, textModelService: ITextModelService, configurationService: IConfigurationService, layoutService: ILayoutService, commandService: ICommandService, activeSessionService: ISessionsManagementService, agentSessionsService: IAgentSessionsService, workingCopyService: IWorkingCopyService);
    protected createEditor(parent: HTMLElement): void;
    private createSplitView;
    private createSidebar;
    private createContent;
    private isPromptsSection;
    private selectSection;
    private updateEditorTitle;
    private updateContentVisibility;
    private openItem;
    /**
     * Creates the embedded editor container with back button and CodeEditorWidget.
     */
    private createEmbeddedEditor;
    /**
     * Shows the embedded editor with the content of the given item.
     */
    private showEmbeddedEditor;
    /**
     * Goes back from the embedded editor view to the list view.
     */
    private goBackToList;
    /**
     * Creates a new customization using the AI-guided flow.
     * Closes the management editor and opens a chat session with a hidden
     * custom agent that guides the user through creating the customization.
     */
    private createNewItemWithAI;
    /**
     * Creates a new prompt file. If there's an active worktree, asks the user
     * whether to save in the worktree or user directory first.
     */
    private createNewItemManual;
    updateStyles(): void;
    setInput(input: AICustomizationManagementEditorInput, options: IEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void>;
    clearInput(): void;
    layout(dimension: DOM.Dimension): void;
    focus(): void;
    /**
     * Selects a specific section programmatically.
     */
    selectSectionById(sectionId: AICustomizationManagementSection): void;
    /**
     * Shows the spinning loader to indicate unsaved changes.
     */
    private showSavingSpinner;
    /**
     * Shows the checkmark after the file has been saved to disk.
     */
    private showSavedCheckmark;
    private clearSaveIndicator;
    /**
     * Commits a worktree file via the extension and refreshes the Changes view.
     */
    private commitWorktreeFile;
    /**
     * Refreshes the list widget.
     */
    refreshList(): void;
}
