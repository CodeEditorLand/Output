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
import * as dom from "../../../../../base/browser/dom.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { Emitter } from "../../../../../base/common/event.js";
import { Disposable, DisposableStore, IDisposable } from "../../../../../base/common/lifecycle.js";
import { MarkdownRenderer } from "../../../../../editor/browser/widget/markdownRenderer/browser/markdownRenderer.js";
import { localize } from "../../../../../nls.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IChatProgressMessage, IChatToolInvocation, IChatToolInvocationSerialized } from "../../common/chatService.js";
import { IChatRendererContent } from "../../common/chatViewModel.js";
import { ChatTreeItem } from "../chat.js";
import { ChatConfirmationWidget } from "./chatConfirmationWidget.js";
import { IChatContentPart, IChatContentPartRenderContext } from "./chatContentParts.js";
import { ChatProgressContentPart } from "./chatProgressContentPart.js";
let ChatToolInvocationPart = class extends Disposable {
  static {
    __name(this, "ChatToolInvocationPart");
  }
  domNode;
  _onDidChangeHeight = this._register(new Emitter());
  onDidChangeHeight = this._onDidChangeHeight.event;
  constructor(toolInvocation, context, renderer, instantiationService) {
    super();
    this.domNode = dom.$(".chat-tool-invocation-part");
    const partStore = this._register(new DisposableStore());
    const render = /* @__PURE__ */ __name(() => {
      dom.clearNode(this.domNode);
      const subPart = partStore.add(instantiationService.createInstance(ChatToolInvocationSubPart, toolInvocation, context, renderer));
      this.domNode.appendChild(subPart.domNode);
      partStore.add(subPart.onNeedsRerender(() => {
        render();
        this._onDidChangeHeight.fire();
      }));
    }, "render");
    render();
  }
  hasSameContent(other, followingContent, element) {
    return other.kind === "toolInvocation" || other.kind === "toolInvocationSerialized";
  }
  addDisposable(disposable) {
    this._register(disposable);
  }
};
ChatToolInvocationPart = __decorateClass([
  __decorateParam(3, IInstantiationService)
], ChatToolInvocationPart);
let ChatToolInvocationSubPart = class extends Disposable {
  static {
    __name(this, "ChatToolInvocationSubPart");
  }
  domNode;
  _onNeedsRerender = this._register(new Emitter());
  onNeedsRerender = this._onNeedsRerender.event;
  constructor(toolInvocation, context, renderer, instantiationService) {
    super();
    if (toolInvocation.kind === "toolInvocation" && toolInvocation.confirmationMessages) {
      const title = toolInvocation.confirmationMessages.title;
      const message = toolInvocation.confirmationMessages.message;
      const confirmWidget = this._register(instantiationService.createInstance(
        ChatConfirmationWidget,
        title,
        message,
        [{ label: localize("continue", "Continue"), data: true }, { label: localize("cancel", "Cancel"), data: false, isSecondary: true }]
      ));
      this.domNode = confirmWidget.domNode;
      this._register(confirmWidget.onDidClick((button) => {
        toolInvocation.confirmed.complete(button.data);
      }));
      toolInvocation.confirmed.p.then(() => this._onNeedsRerender.fire());
      toolInvocation.isCompleteDeferred.p.then(() => this._onNeedsRerender.fire());
    } else {
      const message = toolInvocation.invocationMessage + "\u2026";
      const progressMessage = {
        kind: "progressMessage",
        content: { value: message }
      };
      const iconOverride = toolInvocation.isConfirmed === false ? Codicon.error : toolInvocation.isComplete ? Codicon.check : void 0;
      const progressPart = this._register(instantiationService.createInstance(ChatProgressContentPart, progressMessage, renderer, context, void 0, true, iconOverride));
      this.domNode = progressPart.domNode;
    }
  }
};
ChatToolInvocationSubPart = __decorateClass([
  __decorateParam(3, IInstantiationService)
], ChatToolInvocationSubPart);
export {
  ChatToolInvocationPart
};
//# sourceMappingURL=chatToolInvocationPart.js.map
