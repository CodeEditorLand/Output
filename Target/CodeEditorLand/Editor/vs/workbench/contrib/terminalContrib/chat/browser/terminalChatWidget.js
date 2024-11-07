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
import { Dimension, getActiveWindow, IFocusTracker, trackFocus } from "../../../../../base/browser/dom.js";
import { Emitter, Event } from "../../../../../base/common/event.js";
import { Disposable, DisposableStore, MutableDisposable, toDisposable } from "../../../../../base/common/lifecycle.js";
import { MicrotaskDelay } from "../../../../../base/common/symbols.js";
import "./media/terminalChatWidget.css";
import { localize } from "../../../../../nls.js";
import { IContextKey, IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ChatAgentLocation } from "../../../chat/common/chatAgents.js";
import { InlineChatWidget } from "../../../inlineChat/browser/inlineChatWidget.js";
import { ITerminalInstance } from "../../../terminal/browser/terminal.js";
import { MENU_TERMINAL_CHAT_WIDGET, MENU_TERMINAL_CHAT_WIDGET_STATUS, TerminalChatCommandId, TerminalChatContextKeys } from "./terminalChat.js";
import { TerminalStickyScrollContribution } from "../../stickyScroll/browser/terminalStickyScrollContribution.js";
import { MENU_INLINE_CHAT_WIDGET_SECONDARY } from "../../../inlineChat/common/inlineChat.js";
import { CancelablePromise, createCancelablePromise, DeferredPromise } from "../../../../../base/common/async.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../../platform/storage/common/storage.js";
import { IViewsService } from "../../../../services/views/common/viewsService.js";
import { IChatAcceptInputOptions, showChatView } from "../../../chat/browser/chat.js";
import { ChatModel, IChatResponseModel } from "../../../chat/common/chatModel.js";
import { IChatService, IChatProgress } from "../../../chat/common/chatService.js";
import { CancellationTokenSource } from "../../../../../base/common/cancellation.js";
import { MenuId } from "../../../../../platform/actions/common/actions.js";
var Constants = /* @__PURE__ */ ((Constants2) => {
  Constants2[Constants2["HorizontalMargin"] = 10] = "HorizontalMargin";
  Constants2[Constants2["VerticalMargin"] = 30] = "VerticalMargin";
  return Constants2;
})(Constants || {});
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
const terminalChatPlaceholder = localize("default.placeholder", "Ask how to do something in the terminal");
let TerminalChatWidget = class extends Disposable {
  constructor(_terminalElement, _instance, _xterm, _contextKeyService, _chatService, _storageService, _viewsService, instantiationService) {
    super();
    this._terminalElement = _terminalElement;
    this._instance = _instance;
    this._xterm = _xterm;
    this._contextKeyService = _contextKeyService;
    this._chatService = _chatService;
    this._storageService = _storageService;
    this._viewsService = _viewsService;
    this._focusedContextKey = TerminalChatContextKeys.focused.bindTo(_contextKeyService);
    this._visibleContextKey = TerminalChatContextKeys.visible.bindTo(_contextKeyService);
    this._container = document.createElement("div");
    this._container.classList.add("terminal-inline-chat");
    _terminalElement.appendChild(this._container);
    this._inlineChatWidget = instantiationService.createInstance(
      InlineChatWidget,
      {
        location: ChatAgentLocation.Terminal,
        resolveData: /* @__PURE__ */ __name(() => {
          return void 0;
        }, "resolveData")
      },
      {
        statusMenuId: {
          menu: MENU_TERMINAL_CHAT_WIDGET_STATUS,
          options: {
            buttonConfigProvider: /* @__PURE__ */ __name((action) => {
              if (action.id === TerminalChatCommandId.ViewInChat || action.id === TerminalChatCommandId.RunCommand || action.id === TerminalChatCommandId.RunFirstCommand) {
                return { isSecondary: false };
              } else {
                return { isSecondary: true };
              }
            }, "buttonConfigProvider")
          }
        },
        secondaryMenuId: MENU_INLINE_CHAT_WIDGET_SECONDARY,
        chatWidgetViewOptions: {
          rendererOptions: { editableCodeBlock: true },
          menus: {
            telemetrySource: "terminal-inline-chat",
            executeToolbar: MenuId.ChatExecute,
            inputSideToolbar: MENU_TERMINAL_CHAT_WIDGET
          }
        }
      }
    );
    this._register(Event.any(
      this._inlineChatWidget.onDidChangeHeight,
      this._instance.onDimensionsChanged,
      this._inlineChatWidget.chatWidget.onDidChangeContentHeight,
      Event.debounce(this._xterm.raw.onCursorMove, () => void 0, MicrotaskDelay)
    )(() => this._relayout()));
    const observer = new ResizeObserver(() => this._relayout());
    observer.observe(this._terminalElement);
    this._register(toDisposable(() => observer.disconnect()));
    this._reset();
    this._container.appendChild(this._inlineChatWidget.domNode);
    this._focusTracker = this._register(trackFocus(this._container));
    this._register(this._focusTracker.onDidFocus(() => this._focusedContextKey.set(true)));
    this._register(this._focusTracker.onDidBlur(() => this._focusedContextKey.set(false)));
    this.hide();
    this._requestActiveContextKey = TerminalChatContextKeys.requestActive.bindTo(this._contextKeyService);
    this._responseContainsCodeBlockContextKey = TerminalChatContextKeys.responseContainsCodeBlock.bindTo(this._contextKeyService);
    this._responseContainsMulitpleCodeBlocksContextKey = TerminalChatContextKeys.responseContainsMultipleCodeBlocks.bindTo(this._contextKeyService);
    this._promptHistory = JSON.parse(this._storageService.get(this._storageKey, StorageScope.PROFILE, "[]"));
    this._historyUpdate = (prompt) => {
      const idx = this._promptHistory.indexOf(prompt);
      if (idx >= 0) {
        this._promptHistory.splice(idx, 1);
      }
      this._promptHistory.unshift(prompt);
      this._historyOffset = -1;
      this._historyCandidate = "";
      this._storageService.store(this._storageKey, JSON.stringify(this._promptHistory), StorageScope.PROFILE, StorageTarget.USER);
    };
  }
  static {
    __name(this, "TerminalChatWidget");
  }
  _container;
  _onDidHide = this._register(new Emitter());
  onDidHide = this._onDidHide.event;
  _inlineChatWidget;
  get inlineChatWidget() {
    return this._inlineChatWidget;
  }
  _focusTracker;
  _focusedContextKey;
  _visibleContextKey;
  _requestActiveContextKey;
  _responseContainsCodeBlockContextKey;
  _responseContainsMulitpleCodeBlocksContextKey;
  _messages = this._store.add(new Emitter());
  _storageKey = "terminal-inline-chat-history";
  _promptHistory = [];
  _lastResponseContent;
  get lastResponseContent() {
    return this._lastResponseContent;
  }
  _terminalAgentName = "terminal";
  _model = this._register(new MutableDisposable());
  _sessionCtor;
  _historyOffset = -1;
  _historyCandidate = "";
  _historyUpdate;
  _currentRequestId;
  _activeRequestCts;
  _dimension;
  _relayout() {
    if (this._dimension) {
      this._doLayout(this._inlineChatWidget.contentHeight);
    }
  }
  _doLayout(heightInPixel) {
    const xtermElement = this._xterm.raw.element;
    if (!xtermElement) {
      return;
    }
    const style = getActiveWindow().getComputedStyle(xtermElement);
    const xtermPadding = parseInt(style.paddingLeft) + parseInt(style.paddingRight);
    const width = Math.min(640, xtermElement.clientWidth - 12 - 2 - 10 /* HorizontalMargin */ - xtermPadding);
    const terminalWrapperHeight = this._getTerminalWrapperHeight() ?? Number.MAX_SAFE_INTEGER;
    let height = Math.min(480, heightInPixel, terminalWrapperHeight);
    const top = this._getTop() ?? 0;
    if (width === 0 || height === 0) {
      return;
    }
    let adjustedHeight = void 0;
    if (height < this._inlineChatWidget.contentHeight) {
      if (height - top > 0) {
        height = height - top - 30 /* VerticalMargin */;
      } else {
        height = height - 30 /* VerticalMargin */;
        adjustedHeight = height;
      }
    }
    this._container.style.paddingLeft = style.paddingLeft;
    this._dimension = new Dimension(width, height);
    this._inlineChatWidget.layout(this._dimension);
    this._updateVerticalPosition(adjustedHeight);
  }
  _reset() {
    this.inlineChatWidget.placeholder = terminalChatPlaceholder;
    this._inlineChatWidget.updateInfo(localize("welcome.1", "AI-generated commands may be incorrect"));
  }
  async reveal() {
    await this._createSession();
    this._doLayout(this._inlineChatWidget.contentHeight);
    this._container.classList.remove("hide");
    this._visibleContextKey.set(true);
    this.inlineChatWidget.placeholder = terminalChatPlaceholder;
    this._inlineChatWidget.focus();
    this._instance.scrollToBottom();
  }
  _getTop() {
    const font = this._instance.xterm?.getFont();
    if (!font?.charHeight) {
      return;
    }
    const terminalWrapperHeight = this._getTerminalWrapperHeight() ?? 0;
    const cellHeight = font.charHeight * font.lineHeight;
    const topPadding = terminalWrapperHeight - this._instance.rows * cellHeight;
    const cursorY = (this._instance.xterm?.raw.buffer.active.cursorY ?? 0) + 1;
    return topPadding + cursorY * cellHeight;
  }
  _updateVerticalPosition(adjustedHeight) {
    const top = this._getTop();
    if (!top) {
      return;
    }
    this._container.style.top = `${top}px`;
    const widgetHeight = this._inlineChatWidget.contentHeight;
    const terminalWrapperHeight = this._getTerminalWrapperHeight();
    if (!terminalWrapperHeight) {
      return;
    }
    if (top > terminalWrapperHeight - widgetHeight && terminalWrapperHeight - widgetHeight > 0) {
      this._setTerminalOffset(top - (terminalWrapperHeight - widgetHeight));
    } else if (adjustedHeight) {
      this._setTerminalOffset(adjustedHeight);
    } else {
      this._setTerminalOffset(void 0);
    }
  }
  _getTerminalWrapperHeight() {
    return this._terminalElement.clientHeight;
  }
  hide() {
    this._container.classList.add("hide");
    this._inlineChatWidget.reset();
    this._reset();
    this._inlineChatWidget.updateToolbar(false);
    this._visibleContextKey.set(false);
    this._inlineChatWidget.value = "";
    this._instance.focus();
    this._setTerminalOffset(void 0);
    this._onDidHide.fire();
  }
  _setTerminalOffset(offset) {
    if (offset === void 0 || this._container.classList.contains("hide")) {
      this._terminalElement.style.position = "";
      this._terminalElement.style.bottom = "";
      TerminalStickyScrollContribution.get(this._instance)?.hideUnlock();
    } else {
      this._terminalElement.style.position = "relative";
      this._terminalElement.style.bottom = `${offset}px`;
      TerminalStickyScrollContribution.get(this._instance)?.hideLock();
    }
  }
  focus() {
    this.inlineChatWidget.focus();
  }
  hasFocus() {
    return this._inlineChatWidget.hasFocus();
  }
  setValue(value) {
    this._inlineChatWidget.value = value ?? "";
  }
  async acceptCommand(shouldExecute) {
    const code = await this.inlineChatWidget.getCodeBlockInfo(0);
    if (!code) {
      return;
    }
    const value = code.textEditorModel.getValue();
    this._instance.runCommand(value, shouldExecute);
    this.hide();
  }
  get focusTracker() {
    return this._focusTracker;
  }
  async _createSession() {
    this._sessionCtor = createCancelablePromise(async (token) => {
      if (!this._model.value) {
        this._model.value = this._chatService.startSession(ChatAgentLocation.Terminal, token);
        const model = this._model.value;
        if (model) {
          this._inlineChatWidget.setChatModel(model);
        }
        if (!this._model.value) {
          throw new Error("Failed to start chat session");
        }
      }
    });
    this._register(toDisposable(() => this._sessionCtor?.cancel()));
  }
  _forcedPlaceholder = void 0;
  _updatePlaceholder() {
    const inlineChatWidget = this._inlineChatWidget;
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
    this.hide();
    this.setValue(void 0);
  }
  async acceptInput(query, options) {
    if (!this._model.value) {
      await this.reveal();
    }
    this._messages.fire(32 /* AcceptInput */);
    const lastInput = this._inlineChatWidget.value;
    if (!lastInput) {
      return;
    }
    this._historyUpdate(lastInput);
    this._activeRequestCts?.cancel();
    this._activeRequestCts = new CancellationTokenSource();
    const store = new DisposableStore();
    this._requestActiveContextKey.set(true);
    let responseContent = "";
    const response = await this._inlineChatWidget.chatWidget.acceptInput(lastInput, { isVoiceInput: options?.isVoiceInput });
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
            const firstCodeBlock = await this._inlineChatWidget.getCodeBlockInfo(0);
            const secondCodeBlock = await this._inlineChatWidget.getCodeBlockInfo(1);
            this._responseContainsCodeBlockContextKey.set(!!firstCodeBlock);
            this._responseContainsMulitpleCodeBlocksContextKey.set(!!secondCodeBlock);
            this._inlineChatWidget.updateToolbar(true);
            responsePromise.complete(response);
          }
        }));
      }
      await responsePromise.p;
      this._lastResponseContent = response?.response.getMarkdown();
      return response;
    } catch {
      this._lastResponseContent = void 0;
      return;
    } finally {
      store.dispose();
    }
  }
  populateHistory(up) {
    if (!this._inlineChatWidget) {
      return;
    }
    const len = this._promptHistory.length;
    if (len === 0) {
      return;
    }
    if (this._historyOffset === -1) {
      this._historyCandidate = this._inlineChatWidget.value;
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
      entry = this._promptHistory[newIdx];
      this._historyOffset = newIdx;
    }
    this._inlineChatWidget.value = entry;
    this._inlineChatWidget.selectAll();
  }
  cancel() {
    this._sessionCtor?.cancel();
    this._sessionCtor = void 0;
    this._activeRequestCts?.cancel();
    this._requestActiveContextKey.set(false);
    const model = this._inlineChatWidget.getChatModel();
    if (!model?.sessionId) {
      return;
    }
    this._chatService.cancelCurrentRequestForSession(model?.sessionId);
  }
  async viewInChat() {
    const widget = await showChatView(this._viewsService);
    const currentRequest = this._inlineChatWidget.chatWidget.viewModel?.model.getRequests().find((r) => r.id === this._currentRequestId);
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
    this.hide();
  }
};
TerminalChatWidget = __decorateClass([
  __decorateParam(3, IContextKeyService),
  __decorateParam(4, IChatService),
  __decorateParam(5, IStorageService),
  __decorateParam(6, IViewsService),
  __decorateParam(7, IInstantiationService)
], TerminalChatWidget);
export {
  TerminalChatWidget
};
//# sourceMappingURL=terminalChatWidget.js.map
