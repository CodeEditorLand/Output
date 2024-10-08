var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { CancellationTokenSource } from "../../../../../base/common/cancellation.js";
import { Emitter, Event } from "../../../../../base/common/event.js";
import { Lazy } from "../../../../../base/common/lazy.js";
import { Disposable, DisposableStore, MutableDisposable, toDisposable } from "../../../../../base/common/lifecycle.js";
import { IContextKey, IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IChatCodeBlockContextProviderService, IChatWidget, showChatView } from "../../../chat/browser/chat.js";
import { IChatProgress, IChatService } from "../../../chat/common/chatService.js";
import { isDetachedTerminalInstance, ITerminalContribution, ITerminalInstance, ITerminalService, IXtermTerminal } from "../../../terminal/browser/terminal.js";
import { TerminalChatWidget } from "./terminalChatWidget.js";
import { CancelablePromise, createCancelablePromise, DeferredPromise } from "../../../../../base/common/async.js";
import { assertType } from "../../../../../base/common/types.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../../platform/storage/common/storage.js";
import { IViewsService } from "../../../../services/views/common/viewsService.js";
import { ChatAgentLocation } from "../../../chat/common/chatAgents.js";
import { ChatModel, IChatResponseModel } from "../../../chat/common/chatModel.js";
import { TerminalChatContextKeys } from "./terminalChat.js";
var Message = /* @__PURE__ */ ((Message2) => {
  Message2[Message2["None"] = 0] = "None";
  Message2[Message2["AcceptSession"] = 1] = "AcceptSession";
  Message2[Message2["CancelSession"] = 2] = "CancelSession";
  Message2[Message2["PauseSession"] = 4] = "PauseSession";
  Message2[Message2["CancelRequest"] = 8] = "CancelRequest";
  Message2[Message2["CancelInput"] = 16] = "CancelInput";
  Message2[Message2["AcceptInput"] = 32] = "AcceptInput";
  Message2[Message2["ReturnInput"] = 64] = "ReturnInput";
  return Message2;
})(Message || {});
let TerminalChatController = class extends Disposable {
  constructor(_ctx, chatCodeBlockContextProviderService, _chatService, _contextKeyService, _instantiationService, _storageService, _terminalService, _viewsService) {
    super();
    this._ctx = _ctx;
    this._chatService = _chatService;
    this._contextKeyService = _contextKeyService;
    this._instantiationService = _instantiationService;
    this._storageService = _storageService;
    this._terminalService = _terminalService;
    this._viewsService = _viewsService;
    this._requestActiveContextKey = TerminalChatContextKeys.requestActive.bindTo(this._contextKeyService);
    this._responseContainsCodeBlockContextKey = TerminalChatContextKeys.responseContainsCodeBlock.bindTo(this._contextKeyService);
    this._responseContainsMulitpleCodeBlocksContextKey = TerminalChatContextKeys.responseContainsMultipleCodeBlocks.bindTo(this._contextKeyService);
    this._register(chatCodeBlockContextProviderService.registerProvider({
      getCodeBlockContext: /* @__PURE__ */ __name((editor) => {
        if (!editor || !this._terminalChatWidget?.hasValue || !this.hasFocus()) {
          return;
        }
        return {
          element: editor,
          code: editor.getValue(),
          codeBlockIndex: 0,
          languageId: editor.getModel().getLanguageId()
        };
      }, "getCodeBlockContext")
    }, "terminal"));
    TerminalChatController._promptHistory = JSON.parse(this._storageService.get(TerminalChatController._storageKey, StorageScope.PROFILE, "[]"));
    this._historyUpdate = (prompt) => {
      const idx = TerminalChatController._promptHistory.indexOf(prompt);
      if (idx >= 0) {
        TerminalChatController._promptHistory.splice(idx, 1);
      }
      TerminalChatController._promptHistory.unshift(prompt);
      this._historyOffset = -1;
      this._historyCandidate = "";
      this._storageService.store(TerminalChatController._storageKey, JSON.stringify(TerminalChatController._promptHistory), StorageScope.PROFILE, StorageTarget.USER);
    };
  }
  static {
    __name(this, "TerminalChatController");
  }
  static ID = "terminal.chat";
  static get(instance) {
    return instance.getContribution(TerminalChatController.ID);
  }
  /**
   * The controller for the currently focused chat widget. This is used to track action context since 'active terminals'
   * are only tracked for non-detached terminal instanecs.
   */
  static activeChatController;
  static _storageKey = "terminal-inline-chat-history";
  static _promptHistory = [];
  /**
   * The chat widget for the controller, this is lazy as we don't want to instantiate it until
   * both it's required and xterm is ready.
   */
  _terminalChatWidget;
  /**
   * The terminal chat widget for the controller, this will be undefined if xterm is not ready yet (ie. the
   * terminal is still initializing). This wraps the inline chat widget.
   */
  get terminalChatWidget() {
    return this._terminalChatWidget?.value;
  }
  /**
   * The base chat widget for the controller, this will be undefined if xterm is not ready yet (ie. the
   * terminal is still initializing).
   */
  get chatWidget() {
    return this._terminalChatWidget?.value.inlineChatWidget?.chatWidget;
  }
  _requestActiveContextKey;
  _responseContainsCodeBlockContextKey;
  _responseContainsMulitpleCodeBlocksContextKey;
  _messages = this._store.add(new Emitter());
  _lastResponseContent;
  get lastResponseContent() {
    return this._lastResponseContent;
  }
  onDidAcceptInput = Event.filter(this._messages.event, (m) => m === 32 /* AcceptInput */, this._store);
  get onDidHide() {
    return this.terminalChatWidget?.onDidHide ?? Event.None;
  }
  _terminalAgentName = "terminal";
  _model = this._register(new MutableDisposable());
  get scopedContextKeyService() {
    return this._terminalChatWidget?.value.inlineChatWidget.scopedContextKeyService ?? this._contextKeyService;
  }
  _sessionCtor;
  _historyOffset = -1;
  _historyCandidate = "";
  _historyUpdate;
  _currentRequestId;
  _activeRequestCts;
  xtermReady(xterm) {
    this._terminalChatWidget = new Lazy(() => {
      const chatWidget = this._register(this._instantiationService.createInstance(TerminalChatWidget, this._ctx.instance.domElement, this._ctx.instance, xterm));
      this._register(chatWidget.focusTracker.onDidFocus(() => {
        TerminalChatController.activeChatController = this;
        if (!isDetachedTerminalInstance(this._ctx.instance)) {
          this._terminalService.setActiveInstance(this._ctx.instance);
        }
      }));
      this._register(chatWidget.focusTracker.onDidBlur(() => {
        TerminalChatController.activeChatController = void 0;
        this._ctx.instance.resetScrollbarVisibility();
      }));
      if (!this._ctx.instance.domElement) {
        throw new Error("FindWidget expected terminal DOM to be initialized");
      }
      return chatWidget;
    });
  }
  async _createSession() {
    this._sessionCtor = createCancelablePromise(async (token) => {
      if (!this._model.value) {
        this._model.value = this._chatService.startSession(ChatAgentLocation.Terminal, token);
        if (!this._model.value) {
          throw new Error("Failed to start chat session");
        }
      }
    });
    this._register(toDisposable(() => this._sessionCtor?.cancel()));
  }
  _forcedPlaceholder = void 0;
  _updatePlaceholder() {
    const inlineChatWidget = this._terminalChatWidget?.value.inlineChatWidget;
    if (inlineChatWidget) {
      inlineChatWidget.placeholder = this._getPlaceholderText();
    }
  }
  _getPlaceholderText() {
    return this._forcedPlaceholder ?? "";
  }
  setPlaceholder(text) {
    this._forcedPlaceholder = text;
    this._updatePlaceholder();
  }
  resetPlaceholder() {
    this._forcedPlaceholder = void 0;
    this._updatePlaceholder();
  }
  clear() {
    this.cancel();
    this._model.clear();
    this._responseContainsCodeBlockContextKey.reset();
    this._requestActiveContextKey.reset();
    this._terminalChatWidget?.value.hide();
    this._terminalChatWidget?.value.setValue(void 0);
  }
  async acceptInput(isVoiceInput) {
    assertType(this._terminalChatWidget);
    if (!this._model.value) {
      await this.reveal();
    }
    assertType(this._model.value);
    this._messages.fire(32 /* AcceptInput */);
    const lastInput = this._terminalChatWidget.value.inlineChatWidget.value;
    if (!lastInput) {
      return;
    }
    const model = this._model.value;
    this._terminalChatWidget.value.inlineChatWidget.setChatModel(model);
    this._historyUpdate(lastInput);
    this._activeRequestCts?.cancel();
    this._activeRequestCts = new CancellationTokenSource();
    const store = new DisposableStore();
    this._requestActiveContextKey.set(true);
    let responseContent = "";
    const response = await this._terminalChatWidget.value.inlineChatWidget.chatWidget.acceptInput(lastInput, isVoiceInput);
    this._currentRequestId = response?.requestId;
    const responsePromise = new DeferredPromise();
    try {
      this._requestActiveContextKey.set(true);
      if (response) {
        store.add(response.onDidChange(async () => {
          responseContent += response.response.value;
          if (response.isCanceled) {
            this._requestActiveContextKey.set(false);
            responsePromise.complete(void 0);
            return;
          }
          if (response.isComplete) {
            this._requestActiveContextKey.set(false);
            this._requestActiveContextKey.set(false);
            const firstCodeBlock = await this.terminalChatWidget?.inlineChatWidget.getCodeBlockInfo(0);
            const secondCodeBlock = await this.terminalChatWidget?.inlineChatWidget.getCodeBlockInfo(1);
            this._responseContainsCodeBlockContextKey.set(!!firstCodeBlock);
            this._responseContainsMulitpleCodeBlocksContextKey.set(!!secondCodeBlock);
            this._terminalChatWidget?.value.inlineChatWidget.updateToolbar(true);
            responsePromise.complete(response);
          }
        }));
      }
      await responsePromise.p;
      this._lastResponseContent = response?.response.toMarkdown();
      return response;
    } catch {
      this._lastResponseContent = void 0;
      return;
    } finally {
      store.dispose();
    }
  }
  updateInput(text, selectAll = true) {
    const widget = this._terminalChatWidget?.value.inlineChatWidget;
    if (widget) {
      widget.value = text;
      if (selectAll) {
        widget.selectAll();
      }
    }
  }
  getInput() {
    return this._terminalChatWidget?.value.input() ?? "";
  }
  focus() {
    this._terminalChatWidget?.value.focus();
  }
  hasFocus() {
    return this._terminalChatWidget?.rawValue?.hasFocus() ?? false;
  }
  populateHistory(up) {
    if (!this._terminalChatWidget?.value) {
      return;
    }
    const len = TerminalChatController._promptHistory.length;
    if (len === 0) {
      return;
    }
    if (this._historyOffset === -1) {
      this._historyCandidate = this._terminalChatWidget.value.inlineChatWidget.value;
    }
    const newIdx = this._historyOffset + (up ? 1 : -1);
    if (newIdx >= len) {
      return;
    }
    let entry;
    if (newIdx < 0) {
      entry = this._historyCandidate;
      this._historyOffset = -1;
    } else {
      entry = TerminalChatController._promptHistory[newIdx];
      this._historyOffset = newIdx;
    }
    this._terminalChatWidget.value.inlineChatWidget.value = entry;
    this._terminalChatWidget.value.inlineChatWidget.selectAll();
  }
  cancel() {
    this._sessionCtor?.cancel();
    this._sessionCtor = void 0;
    this._activeRequestCts?.cancel();
    this._requestActiveContextKey.set(false);
    const model = this._terminalChatWidget?.value.inlineChatWidget.getChatModel();
    if (!model?.sessionId) {
      return;
    }
    this._chatService.cancelCurrentRequestForSession(model?.sessionId);
  }
  async acceptCommand(shouldExecute) {
    const code = await this.terminalChatWidget?.inlineChatWidget.getCodeBlockInfo(0);
    if (!code) {
      return;
    }
    this._terminalChatWidget?.value.acceptCommand(code.textEditorModel.getValue(), shouldExecute);
  }
  async reveal() {
    await this._createSession();
    this._terminalChatWidget?.value.reveal();
    this._terminalChatWidget?.value.focus();
  }
  async viewInChat() {
    const widget = await showChatView(this._viewsService);
    const currentRequest = this.terminalChatWidget?.inlineChatWidget.chatWidget.viewModel?.model.getRequests().find((r) => r.id === this._currentRequestId);
    if (!widget || !currentRequest?.response) {
      return;
    }
    const message = [];
    for (const item of currentRequest.response.response.value) {
      if (item.kind === "textEditGroup") {
        for (const group of item.edits) {
          message.push({
            kind: "textEdit",
            edits: group,
            uri: item.uri
          });
        }
      } else {
        message.push(item);
      }
    }
    this._chatService.addCompleteRequest(
      widget.viewModel.sessionId,
      // DEBT: Add hardcoded agent name until its removed
      `@${this._terminalAgentName} ${currentRequest.message.text}`,
      currentRequest.variableData,
      currentRequest.attempt,
      {
        message,
        result: currentRequest.response.result,
        followups: currentRequest.response.followups
      }
    );
    widget.focusLastMessage();
    this._terminalChatWidget?.rawValue?.hide();
  }
};
TerminalChatController = __decorateClass([
  __decorateParam(1, IChatCodeBlockContextProviderService),
  __decorateParam(2, IChatService),
  __decorateParam(3, IContextKeyService),
  __decorateParam(4, IInstantiationService),
  __decorateParam(5, IStorageService),
  __decorateParam(6, ITerminalService),
  __decorateParam(7, IViewsService)
], TerminalChatController);
export {
  TerminalChatController
};
//# sourceMappingURL=terminalChatController.js.map
