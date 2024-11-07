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
import { IObservable } from "../../../../../base/common/observable.js";
import { URI } from "../../../../../base/common/uri.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { IModelService } from "../../../../../editor/common/services/model.js";
import { ITextModelContentProvider } from "../../../../../editor/common/services/resolverService.js";
import { ChatEditingSession } from "./chatEditingSession.js";
let ChatEditingTextModelContentProvider = class {
  constructor(_currentSessionObs, _modelService) {
    this._currentSessionObs = _currentSessionObs;
    this._modelService = _modelService;
  }
  static {
    __name(this, "ChatEditingTextModelContentProvider");
  }
  static scheme = "chat-editing-text-model";
  static getEmptyFileURI() {
    return URI.from({
      scheme: ChatEditingTextModelContentProvider.scheme,
      query: JSON.stringify({ kind: "empty" })
    });
  }
  static getFileURI(documentId, path) {
    return URI.from({
      scheme: ChatEditingTextModelContentProvider.scheme,
      path,
      query: JSON.stringify({ kind: "doc", documentId })
    });
  }
  async provideTextContent(resource) {
    const existing = this._modelService.getModel(resource);
    if (existing && !existing.isDisposed()) {
      return existing;
    }
    const data = JSON.parse(resource.query);
    if (data.kind === "empty") {
      return this._modelService.createModel("", null, resource, false);
    }
    const session = this._currentSessionObs.get();
    if (!session) {
      return null;
    }
    return session.getVirtualModel(data.documentId);
  }
};
ChatEditingTextModelContentProvider = __decorateClass([
  __decorateParam(1, IModelService)
], ChatEditingTextModelContentProvider);
let ChatEditingSnapshotTextModelContentProvider = class {
  constructor(_currentSessionObs, _modelService) {
    this._currentSessionObs = _currentSessionObs;
    this._modelService = _modelService;
  }
  static {
    __name(this, "ChatEditingSnapshotTextModelContentProvider");
  }
  static scheme = "chat-editing-snapshot-text-model";
  static getSnapshotFileURI(requestId, path) {
    return URI.from({
      scheme: ChatEditingSnapshotTextModelContentProvider.scheme,
      path,
      query: JSON.stringify({ requestId: requestId ?? "" })
    });
  }
  async provideTextContent(resource) {
    const existing = this._modelService.getModel(resource);
    if (existing && !existing.isDisposed()) {
      return existing;
    }
    const data = JSON.parse(resource.query);
    const session = this._currentSessionObs.get();
    if (!session || !data.requestId) {
      return null;
    }
    return session.getSnapshotModel(data.requestId, resource);
  }
};
ChatEditingSnapshotTextModelContentProvider = __decorateClass([
  __decorateParam(1, IModelService)
], ChatEditingSnapshotTextModelContentProvider);
export {
  ChatEditingSnapshotTextModelContentProvider,
  ChatEditingTextModelContentProvider
};
//# sourceMappingURL=chatEditingTextModelContentProviders.js.map
