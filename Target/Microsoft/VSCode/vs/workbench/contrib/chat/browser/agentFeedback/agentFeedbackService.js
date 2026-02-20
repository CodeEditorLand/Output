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
import { Emitter, Event } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { URI } from "../../../../../base/common/uri.js";
import { CommentThreadCollapsibleState, CommentThreadState } from "../../../../../editor/common/languages.js";
import { createDecorator } from "../../../../../platform/instantiation/common/instantiation.js";
import { ICommentService } from "../../../comments/browser/commentService.js";
import { generateUuid } from "../../../../../base/common/uuid.js";
import { registerAction2, Action2, MenuId } from "../../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../../platform/contextkey/common/contextkey.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { localize } from "../../../../../nls.js";
import { isEqual } from "../../../../../base/common/resources.js";
import { IChatEditingService } from "../../common/editing/chatEditingService.js";
import { IAgentSessionsService } from "../agentSessions/agentSessionsService.js";
import { agentSessionContainsResource, editingEntriesContainResource } from "../sessionResourceMatching.js";
import { IChatWidgetService } from "../chat.js";
const IAgentFeedbackService = createDecorator("agentFeedbackService");
const AGENT_FEEDBACK_OWNER = "agentFeedbackController";
const AGENT_FEEDBACK_CONTEXT_VALUE = "agentFeedback";
const AGENT_FEEDBACK_ATTACHMENT_ID_PREFIX = "agentFeedback:";
let AgentFeedbackService = class AgentFeedbackService2 extends Disposable {
  static {
    __name(this, "AgentFeedbackService");
  }
  constructor(_commentService, _chatEditingService, _agentSessionsService, _chatWidgetService) {
    super();
    this._commentService = _commentService;
    this._chatEditingService = _chatEditingService;
    this._agentSessionsService = _agentSessionsService;
    this._chatWidgetService = _chatWidgetService;
    this._onDidChangeFeedback = this._store.add(new Emitter());
    this.onDidChangeFeedback = this._onDidChangeFeedback.event;
    this._onDidChangeNavigation = this._store.add(new Emitter());
    this.onDidChangeNavigation = this._onDidChangeNavigation.event;
    this._feedbackBySession = /* @__PURE__ */ new Map();
    this._sessionUpdatedOrder = /* @__PURE__ */ new Map();
    this._sessionUpdatedSequence = 0;
    this._navigationAnchorBySession = /* @__PURE__ */ new Map();
    this._controllerRegistered = false;
    this._nextThreadHandle = 1;
    this._activeThreadIds = /* @__PURE__ */ new Set();
    this._registerChatWidgetListeners();
  }
  _registerChatWidgetListeners() {
    for (const widget of this._chatWidgetService.getAllWidgets()) {
      this._registerWidgetListeners(widget);
    }
    this._store.add(this._chatWidgetService.onDidAddWidget((widget) => {
      this._registerWidgetListeners(widget);
    }));
  }
  _registerWidgetListeners(widget) {
    this._store.add(widget.attachmentModel.onDidChange((e) => {
      for (const deletedId of e.deleted) {
        if (!deletedId.startsWith(AGENT_FEEDBACK_ATTACHMENT_ID_PREFIX)) {
          continue;
        }
        const sessionResourceString = deletedId.slice(AGENT_FEEDBACK_ATTACHMENT_ID_PREFIX.length);
        if (!sessionResourceString) {
          continue;
        }
        const sessionResource = URI.parse(sessionResourceString);
        if (this.getFeedback(sessionResource).length > 0) {
          this.clearFeedback(sessionResource);
        }
      }
    }));
  }
  _ensureController() {
    if (this._controllerRegistered) {
      return;
    }
    this._controllerRegistered = true;
    const self = this;
    const controller = {
      id: AGENT_FEEDBACK_OWNER,
      label: "Agent Feedback",
      features: {},
      contextValue: AGENT_FEEDBACK_CONTEXT_VALUE,
      owner: AGENT_FEEDBACK_OWNER,
      activeComment: void 0,
      createCommentThreadTemplate: /* @__PURE__ */ __name(async () => {
      }, "createCommentThreadTemplate"),
      updateCommentThreadTemplate: /* @__PURE__ */ __name(async () => {
      }, "updateCommentThreadTemplate"),
      deleteCommentThreadMain: /* @__PURE__ */ __name(() => {
      }, "deleteCommentThreadMain"),
      toggleReaction: /* @__PURE__ */ __name(async () => {
      }, "toggleReaction"),
      getDocumentComments: /* @__PURE__ */ __name(async (resource, _token) => {
        const threads = [];
        for (const [, sessionFeedback] of self._feedbackBySession) {
          for (const f of sessionFeedback) {
            if (f.resourceUri.toString() === resource.toString()) {
              threads.push(self._createThread(f));
            }
          }
        }
        return {
          threads,
          commentingRanges: { ranges: [], resource, fileComments: false },
          uniqueOwner: AGENT_FEEDBACK_OWNER
        };
      }, "getDocumentComments"),
      getNotebookComments: /* @__PURE__ */ __name(async (_resource, _token) => {
        return { threads: [], uniqueOwner: AGENT_FEEDBACK_OWNER };
      }, "getNotebookComments"),
      setActiveCommentAndThread: /* @__PURE__ */ __name(async () => {
      }, "setActiveCommentAndThread")
    };
    this._commentService.registerCommentController(AGENT_FEEDBACK_OWNER, controller);
    this._store.add({ dispose: /* @__PURE__ */ __name(() => this._commentService.unregisterCommentController(AGENT_FEEDBACK_OWNER), "dispose") });
    this._store.add(registerAction2(class extends Action2 {
      constructor() {
        super({
          id: "agentFeedback.deleteThread",
          title: localize("agentFeedback.delete", "Delete Feedback"),
          icon: Codicon.trash,
          menu: {
            id: MenuId.CommentThreadTitle,
            when: ContextKeyExpr.equals("commentController", AGENT_FEEDBACK_CONTEXT_VALUE),
            group: "navigation"
          }
        });
      }
      run(accessor, ...args) {
        const agentFeedbackService = accessor.get(IAgentFeedbackService);
        const arg = args[0];
        const thread = arg?.thread ?? arg;
        if (thread?.threadId) {
          const sessionResource = self._findSessionForFeedback(thread.threadId);
          if (sessionResource) {
            agentFeedbackService.removeFeedback(sessionResource, thread.threadId);
          }
        }
      }
    }));
  }
  addFeedback(sessionResource, resourceUri, range, text) {
    this._ensureController();
    const key = sessionResource.toString();
    let feedbackItems = this._feedbackBySession.get(key);
    if (!feedbackItems) {
      feedbackItems = [];
      this._feedbackBySession.set(key, feedbackItems);
    }
    const feedback = {
      id: generateUuid(),
      text,
      resourceUri,
      range,
      sessionResource
    };
    feedbackItems.push(feedback);
    this._sessionUpdatedOrder.set(key, ++this._sessionUpdatedSequence);
    this._onDidChangeNavigation.fire(sessionResource);
    this._syncThreads(sessionResource);
    this._onDidChangeFeedback.fire({ sessionResource, feedbackItems });
    return feedback;
  }
  removeFeedback(sessionResource, feedbackId) {
    const key = sessionResource.toString();
    const feedbackItems = this._feedbackBySession.get(key);
    if (!feedbackItems) {
      return;
    }
    const idx = feedbackItems.findIndex((f) => f.id === feedbackId);
    if (idx >= 0) {
      const removed = feedbackItems[idx];
      feedbackItems.splice(idx, 1);
      this._activeThreadIds.delete(feedbackId);
      if (this._navigationAnchorBySession.get(key) === feedbackId) {
        this._navigationAnchorBySession.delete(key);
        this._onDidChangeNavigation.fire(sessionResource);
      }
      if (feedbackItems.length > 0) {
        this._sessionUpdatedOrder.set(key, ++this._sessionUpdatedSequence);
      } else {
        this._sessionUpdatedOrder.delete(key);
      }
      const thread = this._createThread(removed);
      thread.isDisposed = true;
      this._commentService.updateComments(AGENT_FEEDBACK_OWNER, {
        added: [],
        removed: [thread],
        changed: [],
        pending: []
      });
      this._onDidChangeFeedback.fire({ sessionResource, feedbackItems });
    }
  }
  /**
   * Find which session a feedback item belongs to by its ID.
   */
  _findSessionForFeedback(feedbackId) {
    for (const [, feedbackItems] of this._feedbackBySession) {
      const item = feedbackItems.find((f) => f.id === feedbackId);
      if (item) {
        return item.sessionResource;
      }
    }
    return void 0;
  }
  getFeedback(sessionResource) {
    return this._feedbackBySession.get(sessionResource.toString()) ?? [];
  }
  getMostRecentSessionForResource(resourceUri) {
    let bestSession;
    let bestSequence = -1;
    for (const [, feedbackItems] of this._feedbackBySession) {
      if (!feedbackItems.length) {
        continue;
      }
      const candidate = feedbackItems[0].sessionResource;
      if (!this._sessionContainsResource(candidate, resourceUri, feedbackItems)) {
        continue;
      }
      const sequence = this._sessionUpdatedOrder.get(candidate.toString()) ?? 0;
      if (sequence > bestSequence) {
        bestSession = candidate;
        bestSequence = sequence;
      }
    }
    return bestSession;
  }
  _sessionContainsResource(sessionResource, resourceUri, feedbackItems) {
    if (feedbackItems.some((item) => isEqual(item.resourceUri, resourceUri))) {
      return true;
    }
    for (const editingSession of this._chatEditingService.editingSessionsObs.get()) {
      if (!isEqual(editingSession.chatSessionResource, sessionResource)) {
        continue;
      }
      if (editingEntriesContainResource(editingSession.entries.get(), resourceUri)) {
        return true;
      }
    }
    for (const session of this._agentSessionsService.model.sessions) {
      if (!isEqual(session.resource, sessionResource)) {
        continue;
      }
      if (agentSessionContainsResource(session, resourceUri)) {
        return true;
      }
    }
    return false;
  }
  getNextFeedback(sessionResource, next) {
    const key = sessionResource.toString();
    const feedbackItems = this._feedbackBySession.get(key);
    if (!feedbackItems?.length) {
      this._navigationAnchorBySession.delete(key);
      return void 0;
    }
    const anchorId = this._navigationAnchorBySession.get(key);
    let anchorIndex = anchorId ? feedbackItems.findIndex((item) => item.id === anchorId) : -1;
    if (anchorIndex < 0 && !next) {
      anchorIndex = 0;
    }
    const nextIndex = next ? (anchorIndex + 1) % feedbackItems.length : (anchorIndex - 1 + feedbackItems.length) % feedbackItems.length;
    const feedback = feedbackItems[nextIndex];
    this._navigationAnchorBySession.set(key, feedback.id);
    this._onDidChangeNavigation.fire(sessionResource);
    return feedback;
  }
  getNavigationBearing(sessionResource) {
    const key = sessionResource.toString();
    const feedbackItems = this._feedbackBySession.get(key) ?? [];
    const anchorId = this._navigationAnchorBySession.get(key);
    const activeIdx = anchorId ? feedbackItems.findIndex((item) => item.id === anchorId) : -1;
    return { activeIdx, totalCount: feedbackItems.length };
  }
  clearFeedback(sessionResource) {
    const key = sessionResource.toString();
    const feedbackItems = this._feedbackBySession.get(key);
    if (feedbackItems && feedbackItems.length > 0) {
      const removedThreads = feedbackItems.map((f) => {
        this._activeThreadIds.delete(f.id);
        const thread = this._createThread(f);
        thread.isDisposed = true;
        return thread;
      });
      this._commentService.updateComments(AGENT_FEEDBACK_OWNER, {
        added: [],
        removed: removedThreads,
        changed: [],
        pending: []
      });
    }
    this._feedbackBySession.delete(key);
    this._sessionUpdatedOrder.delete(key);
    this._navigationAnchorBySession.delete(key);
    this._onDidChangeNavigation.fire(sessionResource);
    this._onDidChangeFeedback.fire({ sessionResource, feedbackItems: [] });
  }
  /**
   * Sync feedback threads to the ICommentService using updateComments for
   * incremental add/remove, which the editor controller listens to.
   */
  _syncThreads(_sessionResource) {
    const currentIds = /* @__PURE__ */ new Set();
    const allFeedback = [];
    for (const [, sessionFeedback] of this._feedbackBySession) {
      for (const f of sessionFeedback) {
        currentIds.add(f.id);
        allFeedback.push(f);
      }
    }
    const added = [];
    const removed = [];
    for (const f of allFeedback) {
      if (!this._activeThreadIds.has(f.id)) {
        added.push(this._createThread(f));
      }
    }
    for (const id of this._activeThreadIds) {
      if (!currentIds.has(id)) {
        removed.push(this._createRemovedThread(id));
      }
    }
    this._activeThreadIds.clear();
    for (const id of currentIds) {
      this._activeThreadIds.add(id);
    }
    if (added.length || removed.length) {
      this._commentService.updateComments(AGENT_FEEDBACK_OWNER, {
        added,
        removed,
        changed: [],
        pending: []
      });
    }
  }
  _createRemovedThread(feedbackId) {
    const noopEvent = Event.None;
    return {
      isDocumentCommentThread() {
        return true;
      },
      commentThreadHandle: -1,
      controllerHandle: 0,
      threadId: feedbackId,
      resource: null,
      range: void 0,
      label: void 0,
      contextValue: void 0,
      comments: void 0,
      onDidChangeComments: noopEvent,
      collapsibleState: CommentThreadCollapsibleState.Collapsed,
      initialCollapsibleState: CommentThreadCollapsibleState.Collapsed,
      onDidChangeInitialCollapsibleState: noopEvent,
      state: void 0,
      applicability: void 0,
      canReply: false,
      input: void 0,
      onDidChangeInput: noopEvent,
      onDidChangeLabel: noopEvent,
      onDidChangeCollapsibleState: noopEvent,
      onDidChangeState: noopEvent,
      onDidChangeCanReply: noopEvent,
      isDisposed: true,
      isTemplate: false
    };
  }
  _createThread(feedback) {
    const handle = this._nextThreadHandle++;
    const threadComment = {
      uniqueIdInThread: 1,
      body: feedback.text,
      userName: "You"
    };
    return new AgentFeedbackThread(handle, feedback.id, feedback.resourceUri.toString(), feedback.range, [threadComment]);
  }
};
AgentFeedbackService = __decorate([
  __param(0, ICommentService),
  __param(1, IChatEditingService),
  __param(2, IAgentSessionsService),
  __param(3, IChatWidgetService)
], AgentFeedbackService);
class AgentFeedbackThread {
  static {
    __name(this, "AgentFeedbackThread");
  }
  get collapsibleState() {
    return this._collapsibleState;
  }
  set collapsibleState(value) {
    this._collapsibleState = value;
    this._onDidChangeCollapsibleState.fire(value);
  }
  constructor(commentThreadHandle, threadId, resource, range, comments) {
    this.commentThreadHandle = commentThreadHandle;
    this.threadId = threadId;
    this.resource = resource;
    this.range = range;
    this.comments = comments;
    this._onDidChangeComments = new Emitter();
    this.onDidChangeComments = this._onDidChangeComments.event;
    this._onDidChangeCollapsibleState = new Emitter();
    this.onDidChangeCollapsibleState = this._onDidChangeCollapsibleState.event;
    this._onDidChangeInitialCollapsibleState = new Emitter();
    this.onDidChangeInitialCollapsibleState = this._onDidChangeInitialCollapsibleState.event;
    this._onDidChangeInput = new Emitter();
    this.onDidChangeInput = this._onDidChangeInput.event;
    this._onDidChangeLabel = new Emitter();
    this.onDidChangeLabel = this._onDidChangeLabel.event;
    this._onDidChangeState = new Emitter();
    this.onDidChangeState = this._onDidChangeState.event;
    this._onDidChangeCanReply = new Emitter();
    this.onDidChangeCanReply = this._onDidChangeCanReply.event;
    this.controllerHandle = 0;
    this.label = void 0;
    this.contextValue = void 0;
    this.applicability = void 0;
    this.input = void 0;
    this.isTemplate = false;
    this._collapsibleState = CommentThreadCollapsibleState.Collapsed;
    this.initialCollapsibleState = CommentThreadCollapsibleState.Collapsed;
    this.state = CommentThreadState.Unresolved;
    this.canReply = false;
    this.isDisposed = false;
  }
  isDocumentCommentThread() {
    return true;
  }
}
export {
  AgentFeedbackService,
  IAgentFeedbackService
};
//# sourceMappingURL=agentFeedbackService.js.map
