var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Emitter } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { basename } from "../../../../base/common/resources.js";
import { URI } from "../../../../base/common/uri.js";
import { IRange } from "../../../../editor/common/core/range.js";
import { IChatRequestVariableEntry } from "../common/chatModel.js";
class ChatAttachmentModel extends Disposable {
  static {
    __name(this, "ChatAttachmentModel");
  }
  _attachments = /* @__PURE__ */ new Map();
  get attachments() {
    return Array.from(this._attachments.values());
  }
  _onDidChangeContext = this._register(new Emitter());
  onDidChangeContext = this._onDidChangeContext.event;
  get size() {
    return this._attachments.size;
  }
  getAttachmentIDs() {
    return new Set(this._attachments.keys());
  }
  clear() {
    this._attachments.clear();
    this._onDidChangeContext.fire();
  }
  delete(variableEntryId) {
    this._attachments.delete(variableEntryId);
    this._onDidChangeContext.fire();
  }
  addFile(uri, range) {
    this.addContext({
      value: uri,
      id: uri.toString() + (range?.toString() ?? ""),
      name: basename(uri),
      isFile: true,
      isDynamic: true
    });
  }
  addContext(...attachments) {
    for (const attachment of attachments) {
      if (!this._attachments.has(attachment.id)) {
        this._attachments.set(attachment.id, attachment);
      }
    }
    this._onDidChangeContext.fire();
  }
  clearAndSetContext(...attachments) {
    this.clear();
    this.addContext(...attachments);
  }
}
export {
  ChatAttachmentModel
};
//# sourceMappingURL=chatAttachmentModel.js.map
