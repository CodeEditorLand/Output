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
import { Emitter, Event } from "../../../../../base/common/event.js";
import { Disposable, DisposableStore } from "../../../../../base/common/lifecycle.js";
import { basename } from "../../../../../base/common/resources.js";
import { URI } from "../../../../../base/common/uri.js";
import { ICodeEditorService } from "../../../../../editor/browser/services/codeEditorService.js";
import { Location } from "../../../../../editor/common/languages.js";
import { IWorkbenchContribution } from "../../../../common/contributions.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { ChatAgentLocation } from "../../common/chatAgents.js";
import { IBaseChatRequestVariableEntry, IChatRequestImplicitVariableEntry } from "../../common/chatModel.js";
import { IChatWidget, IChatWidgetService } from "../chat.js";
let ChatImplicitContextContribution = class extends Disposable {
  constructor(codeEditorService, editorService, chatWidgetService) {
    super();
    this.codeEditorService = codeEditorService;
    this.chatWidgetService = chatWidgetService;
    const activeEditorDisposables = this._register(new DisposableStore());
    this._register(Event.runAndSubscribe(
      editorService.onDidActiveEditorChange,
      () => {
        activeEditorDisposables.clear();
        const codeEditor = codeEditorService.getActiveCodeEditor();
        if (codeEditor) {
          activeEditorDisposables.add(codeEditor.onDidChangeModel(() => this.updateImplicitContext()));
          activeEditorDisposables.add(Event.debounce(codeEditor.onDidChangeCursorSelection, () => void 0, 500)(() => this.updateImplicitContext()));
          activeEditorDisposables.add(Event.debounce(codeEditor.onDidScrollChange, () => void 0, 500)(() => this.updateImplicitContext()));
        }
        this.updateImplicitContext();
      }
    ));
    this._register(chatWidgetService.onDidAddWidget((widget) => this.updateImplicitContext(widget)));
  }
  static {
    __name(this, "ChatImplicitContextContribution");
  }
  static ID = "chat.implicitContext";
  updateImplicitContext(updateWidget) {
    const codeEditor = this.codeEditorService.getActiveCodeEditor();
    const model = codeEditor?.getModel();
    const selection = codeEditor?.getSelection();
    let newValue;
    let isSelection = false;
    if (model) {
      if (selection && !selection.isEmpty()) {
        newValue = { uri: model.uri, range: selection };
        isSelection = true;
      } else {
        const visibleRanges = codeEditor?.getVisibleRanges();
        if (visibleRanges && visibleRanges.length > 0) {
          let range = visibleRanges[0];
          visibleRanges.slice(1).forEach((r) => {
            range = range.plusRange(r);
          });
          newValue = { uri: model.uri, range };
        } else {
          newValue = model.uri;
        }
      }
    }
    const widgets = updateWidget ? [updateWidget] : this.chatWidgetService.getAllWidgets(ChatAgentLocation.Panel);
    for (const widget of widgets) {
      if (widget.input.implicitContext) {
        widget.input.implicitContext.setValue(newValue, isSelection);
      }
    }
  }
};
ChatImplicitContextContribution = __decorateClass([
  __decorateParam(0, ICodeEditorService),
  __decorateParam(1, IEditorService),
  __decorateParam(2, IChatWidgetService)
], ChatImplicitContextContribution);
class ChatImplicitContext extends Disposable {
  static {
    __name(this, "ChatImplicitContext");
  }
  get id() {
    if (URI.isUri(this.value)) {
      return "vscode.implicit.file";
    } else if (this.value) {
      if (this._isSelection) {
        return "vscode.implicit.selection";
      } else {
        return "vscode.implicit.viewport";
      }
    } else {
      return "vscode.implicit";
    }
  }
  get name() {
    if (URI.isUri(this.value)) {
      return `file:${basename(this.value)}`;
    } else if (this.value) {
      return `file:${basename(this.value.uri)}`;
    } else {
      return "implicit";
    }
  }
  kind = "implicit";
  get modelDescription() {
    if (URI.isUri(this.value)) {
      return `User's active file`;
    } else if (this._isSelection) {
      return `User's active selection`;
    } else {
      return `User's current visible code`;
    }
  }
  // TODO@roblourens
  isDynamic = true;
  isFile = true;
  _isSelection = false;
  get isSelection() {
    return this._isSelection;
  }
  _onDidChangeValue = new Emitter();
  onDidChangeValue = this._onDidChangeValue.event;
  _value;
  get value() {
    return this._value;
  }
  _enabled = true;
  get enabled() {
    return this._enabled;
  }
  set enabled(value) {
    this._enabled = value;
    this._onDidChangeValue.fire();
  }
  constructor(value) {
    super();
    this._value = value;
  }
  setValue(value, isSelection) {
    this._value = value;
    this._isSelection = isSelection;
    this._onDidChangeValue.fire();
  }
  toBaseEntry() {
    return {
      id: this.id,
      name: this.name,
      value: this.value,
      isFile: true,
      isDynamic: true,
      modelDescription: this.modelDescription
    };
  }
}
export {
  ChatImplicitContext,
  ChatImplicitContextContribution
};
//# sourceMappingURL=chatImplicitContext.js.map
