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
import { Disposable } from "../../../../base/common/lifecycle.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { observableValue } from "../../../../base/common/observable.js";
import { URI } from "../../../../base/common/uri.js";
import { createDecorator, IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IContextKeyService, RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { openSession as openSessionDefault } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsOpener.js";
import { ChatViewId, ChatViewPaneTarget, IChatWidgetService } from "../../../../workbench/contrib/chat/browser/chat.js";
import { IChatSessionsService } from "../../../../workbench/contrib/chat/common/chatSessionsService.js";
import { IChatService } from "../../../../workbench/contrib/chat/common/chatService/chatService.js";
import { ChatAgentLocation } from "../../../../workbench/contrib/chat/common/constants.js";
import { isAgentSession } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsModel.js";
import { IAgentSessionsService } from "../../../../workbench/contrib/chat/browser/agentSessions/agentSessionsService.js";
import { LocalChatSessionUri } from "../../../../workbench/contrib/chat/common/model/chatUri.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspaceEditingService } from "../../../../workbench/services/workspaces/common/workspaceEditing.js";
import { IViewsService } from "../../../../workbench/services/views/common/viewsService.js";
const IsNewChatSessionContext = new RawContextKey("isNewChatSession", true);
const LAST_SELECTED_SESSION_KEY = "agentSessions.lastSelectedSession";
const repositoryOptionId = "repository";
const ISessionsManagementService = createDecorator("sessionsManagementService");
let SessionsManagementService = class SessionsManagementService2 extends Disposable {
  static {
    __name(this, "SessionsManagementService");
  }
  constructor(storageService, agentSessionsService, chatSessionsService, chatWidgetService, chatService, instantiationService, logService, contextKeyService, workspaceContextService, workspaceEditingService, viewsService) {
    super();
    this.storageService = storageService;
    this.agentSessionsService = agentSessionsService;
    this.chatSessionsService = chatSessionsService;
    this.chatWidgetService = chatWidgetService;
    this.chatService = chatService;
    this.instantiationService = instantiationService;
    this.logService = logService;
    this.workspaceContextService = workspaceContextService;
    this.workspaceEditingService = workspaceEditingService;
    this.viewsService = viewsService;
    this._activeSession = observableValue(this, void 0);
    this.activeSession = this._activeSession;
    this.isNewChatSessionContext = IsNewChatSessionContext.bindTo(contextKeyService);
    this.lastSelectedSession = this.loadLastSelectedSession();
    this._register(this.storageService.onWillSaveState(() => this.saveLastSelectedSession()));
    this._register(this.chatSessionsService.onDidChangeSessionOptions((sessionResource) => {
      const currentActive = this._activeSession.get();
      if (currentActive && currentActive.resource.toString() === sessionResource.toString()) {
        const repository = this.getRepositoryFromSessionOption(sessionResource);
        if (currentActive.repository?.toString() !== repository?.toString()) {
          this._activeSession.set({ ...currentActive, repository }, void 0);
        }
      }
    }));
    this._register(this.agentSessionsService.model.onDidChangeSessions(() => this.refreshActiveSessionFromModel()));
  }
  refreshActiveSessionFromModel() {
    const currentActive = this._activeSession.get();
    if (!currentActive) {
      return;
    }
    const agentSession = this.agentSessionsService.model.getSession(currentActive.resource);
    if (!agentSession) {
      if (isAgentSession(currentActive)) {
        this.showNextSession();
      }
      return;
    }
    const [repository, worktree] = this.getRepositoryFromMetadata(agentSession.metadata);
    const activeSessionItem = {
      ...agentSession,
      repository,
      worktree
    };
    this._activeSession.set(activeSessionItem, void 0);
  }
  showNextSession() {
    const sessions = this.agentSessionsService.model.sessions.filter((s) => !s.isArchived()).sort((a, b) => (b.timing.lastRequestEnded ?? b.timing.created) - (a.timing.lastRequestEnded ?? a.timing.created));
    if (sessions.length > 0) {
      this.setActiveSession(sessions[0]);
      this.instantiationService.invokeFunction(openSessionDefault, sessions[0]);
    } else {
      this.openNewSession();
    }
  }
  getRepositoryFromMetadata(metadata) {
    if (!metadata) {
      return [void 0, void 0];
    }
    const repositoryPath = metadata?.repositoryPath;
    const repositoryPathUri = typeof repositoryPath === "string" ? URI.file(repositoryPath) : void 0;
    const worktreePath = metadata?.worktreePath;
    const worktreePathUri = typeof worktreePath === "string" ? URI.file(worktreePath) : void 0;
    return [
      URI.isUri(repositoryPathUri) ? repositoryPathUri : void 0,
      URI.isUri(worktreePathUri) ? worktreePathUri : void 0
    ];
  }
  getRepositoryFromSessionOption(sessionResource) {
    const optionValue = this.chatSessionsService.getSessionOption(sessionResource, repositoryOptionId);
    if (!optionValue) {
      return void 0;
    }
    const optionId = typeof optionValue === "string" ? optionValue : optionValue.id;
    if (!optionId) {
      return void 0;
    }
    try {
      return URI.parse(optionId);
    } catch {
      return void 0;
    }
  }
  getActiveSession() {
    return this._activeSession.get();
  }
  async openSession(sessionResource, openOptions) {
    this.isNewChatSessionContext.set(false);
    const existingSession = this.agentSessionsService.model.getSession(sessionResource);
    if (existingSession) {
      await this.openExistingSession(existingSession, openOptions);
    } else if (LocalChatSessionUri.isLocalSession(sessionResource)) {
      await this.openLocalSession();
    } else {
      await this.openNewRemoteSession(sessionResource);
    }
  }
  /**
   * Open an existing agent session - set it as active and reveal it.
   */
  async openExistingSession(session, openOptions) {
    this.setActiveSession(session);
    await this.instantiationService.invokeFunction(openSessionDefault, session, openOptions);
  }
  /**
   * Open a fresh local chat session - show the ChatViewPane and clear the widget.
   */
  async openLocalSession() {
    const view = await this.viewsService.openView(ChatViewId);
    if (view) {
      await view.widget.clear();
      if (view.widget.viewModel) {
        const folder = this.workspaceContextService.getWorkspace().folders[0];
        const activeSessionItem = {
          resource: view.widget.viewModel.sessionResource,
          label: view.widget.viewModel.model.title || "",
          timing: view.widget.viewModel.model.timing,
          repository: folder?.uri,
          worktree: void 0
        };
        this._activeSession.set(activeSessionItem, void 0);
      }
    }
  }
  /**
   * Open a new remote session - load the model first, then show it in the ChatViewPane.
   */
  async openNewRemoteSession(sessionResource) {
    const modelRef = await this.chatService.loadSessionForResource(sessionResource, ChatAgentLocation.Chat, CancellationToken.None);
    const chatWidget = await this.chatWidgetService.openSession(sessionResource, ChatViewPaneTarget);
    if (!chatWidget?.viewModel) {
      this.logService.warn(`[ActiveSessionService] Failed to open session: ${sessionResource.toString()}`);
      modelRef?.dispose();
      return;
    }
    const repository = this.getRepositoryFromSessionOption(sessionResource);
    const activeSessionItem = {
      resource: sessionResource,
      label: chatWidget.viewModel.model.title || "",
      timing: chatWidget.viewModel.model.timing,
      repository,
      worktree: void 0
    };
    this.logService.info(`[ActiveSessionService] Active session changed (new): ${sessionResource.toString()}, repository: ${repository?.toString() ?? "none"}`);
    this._activeSession.set(activeSessionItem, void 0);
  }
  async sendRequestForNewSession(sessionResource, query, sendOptions, selectedOptions, folderUri) {
    if (LocalChatSessionUri.isLocalSession(sessionResource)) {
      await this.sendLocalSession(sessionResource, query, folderUri);
    } else {
      await this.sendCustomSession(sessionResource, query, sendOptions, selectedOptions);
    }
  }
  /**
   * Local sessions run directly through the ChatWidget.
   * Set the workspace folder, open a fresh chat view, and submit via acceptInput.
   */
  async sendLocalSession(sessionResource, query, folderUri) {
    if (folderUri) {
      await this.workspaceEditingService.updateFolders(0, this.workspaceContextService.getWorkspace().folders.length, [{ uri: folderUri }]);
    }
    await this.openSession(sessionResource);
    const widget = this.chatWidgetService.lastFocusedWidget;
    if (widget) {
      widget.setInput(query);
      widget.acceptInput(query);
    }
  }
  /**
   * Custom sessions (worktree, cloud, etc.) go through the chat service.
   * Apply selected options, send the request, then wait for the extension
   * to create an agent session so it appears in the sidebar.
   */
  async sendCustomSession(sessionResource, query, sendOptions, selectedOptions) {
    await this.openSession(sessionResource);
    if (selectedOptions && selectedOptions.size > 0) {
      const modelRef = this.chatService.getActiveSessionReference(sessionResource);
      if (modelRef) {
        const model = modelRef.object;
        const contributedSession = model.contributedChatSession;
        if (contributedSession) {
          const initialSessionOptions = [...selectedOptions.entries()].map(([optionId, value]) => ({ optionId, value }));
          model.setContributedChatSession({
            ...contributedSession,
            initialSessionOptions
          });
        }
        modelRef.dispose();
      }
    }
    const existingResources = new Set(this.agentSessionsService.model.sessions.map((s) => s.resource.toString()));
    const result = await this.chatService.sendRequest(sessionResource, query, sendOptions);
    if (result.kind === "rejected") {
      this.logService.error(`[ActiveSessionService] sendRequest rejected: ${result.reason}`);
      return;
    }
    let newSession = this.agentSessionsService.model.sessions.find((s) => !existingResources.has(s.resource.toString()));
    if (!newSession) {
      let listener;
      newSession = await Promise.race([
        new Promise((resolve) => {
          listener = this.agentSessionsService.model.onDidChangeSessions(() => {
            const session = this.agentSessionsService.model.sessions.find((s) => !existingResources.has(s.resource.toString()));
            if (session) {
              resolve(session);
            }
          });
        }),
        new Promise((resolve) => setTimeout(() => resolve(void 0), 3e4))
      ]);
      listener?.dispose();
    }
    if (newSession) {
      this.setActiveSession(newSession);
    }
  }
  openNewSession() {
    if (this.isNewChatSessionContext.get()) {
      return;
    }
    this.isNewChatSessionContext.set(true);
    this._activeSession.set(void 0, void 0);
  }
  setActiveSession(session) {
    this.lastSelectedSession = session.resource;
    const [repository, worktree] = this.getRepositoryFromMetadata(session.metadata);
    const activeSessionItem = {
      ...session,
      repository,
      worktree
    };
    this.logService.info(`[ActiveSessionService] Active session changed: ${session.resource.toString()}, repository: ${repository?.toString() ?? "none"}`);
    this._activeSession.set(activeSessionItem, void 0);
  }
  loadLastSelectedSession() {
    const cached = this.storageService.get(
      LAST_SELECTED_SESSION_KEY,
      1
      /* StorageScope.WORKSPACE */
    );
    if (!cached) {
      return void 0;
    }
    try {
      return URI.parse(cached);
    } catch {
      return void 0;
    }
  }
  saveLastSelectedSession() {
    if (this.lastSelectedSession) {
      this.storageService.store(
        LAST_SELECTED_SESSION_KEY,
        this.lastSelectedSession.toString(),
        1,
        1
        /* StorageTarget.MACHINE */
      );
    }
  }
};
SessionsManagementService = __decorate([
  __param(0, IStorageService),
  __param(1, IAgentSessionsService),
  __param(2, IChatSessionsService),
  __param(3, IChatWidgetService),
  __param(4, IChatService),
  __param(5, IInstantiationService),
  __param(6, ILogService),
  __param(7, IContextKeyService),
  __param(8, IWorkspaceContextService),
  __param(9, IWorkspaceEditingService),
  __param(10, IViewsService)
], SessionsManagementService);
export {
  ISessionsManagementService,
  IsNewChatSessionContext,
  SessionsManagementService
};
//# sourceMappingURL=sessionsManagementService.js.map
