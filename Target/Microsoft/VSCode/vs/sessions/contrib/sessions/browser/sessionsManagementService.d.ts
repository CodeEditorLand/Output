import { Disposable } from '../../../../base/common/lifecycle.js';
import { IObservable } from '../../../../base/common/observable.js';
import { URI } from '../../../../base/common/uri.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IContextKeyService, RawContextKey } from '../../../../platform/contextkey/common/contextkey.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { ISessionOpenOptions } from '../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsOpener.js';
import { IChatWidgetService } from '../../../../workbench/contrib/chat/browser/chat.js';
import { IChatSessionItem, IChatSessionProviderOptionItem, IChatSessionsService } from '../../../../workbench/contrib/chat/common/chatSessionsService.js';
import { IChatService, IChatSendRequestOptions } from '../../../../workbench/contrib/chat/common/chatService/chatService.js';
import { IAgentSession } from '../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsModel.js';
import { IAgentSessionsService } from '../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsService.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { IWorkspaceEditingService } from '../../../../workbench/services/workspaces/common/workspaceEditing.js';
import { IViewsService } from '../../../../workbench/services/views/common/viewsService.js';
export declare const IsNewChatSessionContext: RawContextKey<boolean>;
/**
 * An active session item extends IChatSessionItem with repository information.
 * - For agent session items: repository is the workingDirectory from metadata
 * - For new sessions: repository comes from the session option with id 'repository'
 */
export type IActiveSessionItem = (IChatSessionItem | IAgentSession) & {
    /**
     * The repository URI for this session.
     */
    readonly repository: URI | undefined;
    /**
     * The worktree URI for this session.
     */
    readonly worktree: URI | undefined;
};
export interface ISessionsManagementService {
    readonly _serviceBrand: undefined;
    /**
     * Observable for the currently active session.
     */
    readonly activeSession: IObservable<IActiveSessionItem | undefined>;
    /**
     * Returns the currently active session, if any.
     */
    getActiveSession(): IActiveSessionItem | undefined;
    /**
     * Select an existing session as the active session.
     * Sets `isNewChatSession` context to false and opens the session.
     */
    openSession(sessionResource: URI, openOptions?: ISessionOpenOptions): Promise<void>;
    /**
     * Switch to the new-session view.
     * No-op if the current session is already a new session.
     */
    openNewSession(): void;
    /**
     * Open a new session, apply options, and send the initial request.
     * This is the main entry point for the new-chat welcome widget.
     */
    sendRequestForNewSession(sessionResource: URI, query: string, sendOptions: IChatSendRequestOptions, selectedOptions?: ReadonlyMap<string, IChatSessionProviderOptionItem>, folderUri?: URI): Promise<void>;
}
export declare const ISessionsManagementService: import("../../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<ISessionsManagementService>;
export declare class SessionsManagementService extends Disposable implements ISessionsManagementService {
    private readonly storageService;
    private readonly agentSessionsService;
    private readonly chatSessionsService;
    private readonly chatWidgetService;
    private readonly chatService;
    private readonly instantiationService;
    private readonly logService;
    private readonly workspaceContextService;
    private readonly workspaceEditingService;
    private readonly viewsService;
    readonly _serviceBrand: undefined;
    private readonly _activeSession;
    readonly activeSession: IObservable<IActiveSessionItem | undefined>;
    private lastSelectedSession;
    private readonly isNewChatSessionContext;
    constructor(storageService: IStorageService, agentSessionsService: IAgentSessionsService, chatSessionsService: IChatSessionsService, chatWidgetService: IChatWidgetService, chatService: IChatService, instantiationService: IInstantiationService, logService: ILogService, contextKeyService: IContextKeyService, workspaceContextService: IWorkspaceContextService, workspaceEditingService: IWorkspaceEditingService, viewsService: IViewsService);
    private refreshActiveSessionFromModel;
    private showNextSession;
    private getRepositoryFromMetadata;
    private getRepositoryFromSessionOption;
    getActiveSession(): IActiveSessionItem | undefined;
    openSession(sessionResource: URI, openOptions?: ISessionOpenOptions): Promise<void>;
    /**
     * Open an existing agent session - set it as active and reveal it.
     */
    private openExistingSession;
    /**
     * Open a fresh local chat session - show the ChatViewPane and clear the widget.
     */
    private openLocalSession;
    /**
     * Open a new remote session - load the model first, then show it in the ChatViewPane.
     */
    private openNewRemoteSession;
    sendRequestForNewSession(sessionResource: URI, query: string, sendOptions: IChatSendRequestOptions, selectedOptions?: ReadonlyMap<string, IChatSessionProviderOptionItem>, folderUri?: URI): Promise<void>;
    /**
     * Local sessions run directly through the ChatWidget.
     * Set the workspace folder, open a fresh chat view, and submit via acceptInput.
     */
    private sendLocalSession;
    /**
     * Custom sessions (worktree, cloud, etc.) go through the chat service.
     * Apply selected options, send the request, then wait for the extension
     * to create an agent session so it appears in the sidebar.
     */
    private sendCustomSession;
    openNewSession(): void;
    private setActiveSession;
    private loadLastSelectedSession;
    private saveLastSelectedSession;
}
