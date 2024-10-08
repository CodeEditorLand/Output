var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Disposable } from "../../../../../base/common/lifecycle.js";
import {
  IChatRequestVariableEntry,
  isChatRequestVariableEntry
} from "../../common/chatModel.js";
import { IChatWidget } from "../chat.js";
import { ChatWidget, IChatWidgetContrib } from "../chatWidget.js";
class ChatContextAttachments extends Disposable {
  constructor(widget) {
    super();
    this.widget = widget;
    this._register(
      this.widget.onDidChangeContext(({ removed, added }) => {
        removed?.forEach(
          (attachment) => this._attachedContext.delete(attachment.id)
        );
        added?.forEach((attachment) => {
          if (!this._attachedContext.has(attachment.id)) {
            this._attachedContext.set(attachment.id, attachment);
          }
        });
      })
    );
    this._register(
      this.widget.onDidSubmitAgent(() => {
        this._clearAttachedContext();
      })
    );
  }
  static {
    __name(this, "ChatContextAttachments");
  }
  _attachedContext = /* @__PURE__ */ new Map();
  static ID = "chatContextAttachments";
  get id() {
    return ChatContextAttachments.ID;
  }
  getInputState() {
    return [...this._attachedContext.values()];
  }
  setInputState(s) {
    const attachments = Array.isArray(s) ? s.filter(isChatRequestVariableEntry) : [];
    this.setContext(true, ...attachments);
  }
  getContext() {
    return new Set(this._attachedContext.keys());
  }
  setContext(overwrite, ...attachments) {
    if (overwrite) {
      this._attachedContext.clear();
    }
    const newAttachments = [];
    for (const attachment of attachments) {
      if (!this._attachedContext.has(attachment.id)) {
        this._attachedContext.set(attachment.id, attachment);
        newAttachments.push(attachment);
      }
    }
    this.widget.setContext(overwrite, ...newAttachments);
  }
  _clearAttachedContext() {
    this._attachedContext.clear();
  }
}
ChatWidget.CONTRIBS.push(ChatContextAttachments);
export {
  ChatContextAttachments
};
//# sourceMappingURL=chatContextAttachments.js.map
