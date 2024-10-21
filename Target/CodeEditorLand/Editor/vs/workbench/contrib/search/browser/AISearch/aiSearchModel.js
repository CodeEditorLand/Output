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
import { Lazy } from "../../../../../base/common/lazy.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { URI } from "../../../../../base/common/uri.js";
import { IPosition } from "../../../../../editor/common/core/position.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { IModelService } from "../../../../../editor/common/services/model.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { IUriIdentityService } from "../../../../../platform/uriIdentity/common/uriIdentity.js";
import { IFileMatch, IPatternInfo, ITextQuery, ITextSearchPreviewOptions, resultIsMatch } from "../../../../services/search/common/search.js";
import { NotebookEditorWidget } from "../../../notebook/browser/notebookEditorWidget.js";
import { IReplaceService } from "../replace.js";
import { FileMatchImpl } from "../searchTreeModel/fileMatch.js";
import { ISearchResult, TEXT_SEARCH_HEADING_PREFIX, AI_TEXT_SEARCH_RESULT_ID, ISearchTreeFolderMatchWorkspaceRoot, ISearchTreeFolderMatch, ISearchTreeFolderMatchWithResource, ITextSearchHeading, IChangeEvent, ISearchModel, ISearchTreeFileMatch, FOLDER_MATCH_PREFIX, getFileMatches, FILE_MATCH_PREFIX } from "../searchTreeModel/searchTreeCommon.js";
import { TextSearchHeadingImpl } from "../searchTreeModel/textSearchHeading.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { textSearchResultToMatches } from "../searchTreeModel/match.js";
import { ISearchTreeAIFileMatch } from "./aiSearchModelBase.js";
let AITextSearchHeadingImpl = class extends TextSearchHeadingImpl {
  static {
    __name(this, "AITextSearchHeadingImpl");
  }
  constructor(parent, instantiationService, uriIdentityService) {
    super(false, parent, instantiationService, uriIdentityService);
  }
  name() {
    return "AI";
  }
  id() {
    return TEXT_SEARCH_HEADING_PREFIX + AI_TEXT_SEARCH_RESULT_ID;
  }
  get isAIContributed() {
    return true;
  }
  createWorkspaceRootWithResourceImpl(resource, id, index, query) {
    return this.instantiationService.createInstance(AIFolderMatchWorkspaceRootImpl, resource, id, index, query, this);
  }
};
AITextSearchHeadingImpl = __decorateClass([
  __decorateParam(1, IInstantiationService),
  __decorateParam(2, IUriIdentityService)
], AITextSearchHeadingImpl);
let AIFolderMatchWorkspaceRootImpl = class extends Disposable {
  // id to fileMatch
  constructor(_resource, _id, _index, _query, _parent, instantiationService, labelService) {
    super();
    this._resource = _resource;
    this._index = _index;
    this._query = _query;
    this._parent = _parent;
    this.instantiationService = instantiationService;
    this._fileMatches = /* @__PURE__ */ new Map();
    this._id = FOLDER_MATCH_PREFIX + _id;
    this._name = new Lazy(() => this.resource ? labelService.getUriBasenameLabel(this.resource) : "");
    this._unDisposedFileMatches = /* @__PURE__ */ new Map();
  }
  static {
    __name(this, "AIFolderMatchWorkspaceRootImpl");
  }
  _onChange = this._register(new Emitter());
  onChange = this._onChange.event;
  _onDispose = this._register(new Emitter());
  onDispose = this._onDispose.event;
  _id;
  _name;
  _unDisposedFileMatches;
  // id to fileMatch
  _fileMatches;
  get resource() {
    return this._resource;
  }
  id() {
    return this._id;
  }
  index() {
    return this._index;
  }
  name() {
    return this._name.value;
  }
  count() {
    return this._fileMatches.size;
  }
  doAddFile(fileMatch) {
    this._fileMatches.set(fileMatch.id(), fileMatch);
  }
  latestRank = 0;
  createAndConfigureFileMatch(rawFileMatch, searchInstanceID) {
    const fileMatch = this.instantiationService.createInstance(
      AIFileMatch,
      this._query.contentPattern,
      this._query.previewOptions,
      this._query.maxResults,
      this,
      rawFileMatch,
      this,
      rawFileMatch.resource.toString() + "_" + Date.now().toString(),
      this.latestRank++
    );
    fileMatch.createMatches();
    this.doAddFile(fileMatch);
    const disposable = fileMatch.onChange(({ didRemove }) => this.onFileChange(fileMatch, didRemove));
    this._register(fileMatch.onDispose(() => disposable.dispose()));
    return fileMatch;
  }
  isAIContributed() {
    return true;
  }
  onFileChange(fileMatch, removed = false) {
    let added = false;
    if (!this._fileMatches.has(fileMatch.id())) {
      this.doAddFile(fileMatch);
      added = true;
    }
    if (fileMatch.count() === 0) {
      this.doRemoveFile([fileMatch], false, false);
      added = false;
      removed = true;
    }
    this._onChange.fire({ elements: [fileMatch], added, removed });
  }
  get hasChildren() {
    return this._fileMatches.size > 0;
  }
  parent() {
    return this._parent;
  }
  matches() {
    return [...this._fileMatches.values()];
  }
  allDownstreamFileMatches() {
    return [...this._fileMatches.values()];
  }
  remove(matches) {
    if (!Array.isArray(matches)) {
      matches = [matches];
    }
    const allMatches = getFileMatches(matches);
    this.doRemoveFile(allMatches);
  }
  addFileMatch(raw, silent, searchInstanceID) {
    const added = [];
    const updated = [];
    raw.forEach((rawFileMatch) => {
      const fileMatch = this.createAndConfigureFileMatch(rawFileMatch, searchInstanceID);
      added.push(fileMatch);
    });
    const elements = [...added, ...updated];
    if (!silent && elements.length) {
      this._onChange.fire({ elements, added: !!added.length });
    }
  }
  isEmpty() {
    return this.recursiveFileCount() === 0;
  }
  clear(clearingAll) {
    const changed = this.allDownstreamFileMatches();
    this.disposeMatches();
    this._onChange.fire({ elements: changed, removed: true, added: false, clearingAll });
  }
  get showHighlights() {
    return this._parent.showHighlights;
  }
  get searchModel() {
    return this._searchResult.searchModel;
  }
  get _searchResult() {
    return this._parent.parent();
  }
  get query() {
    return this._query;
  }
  getDownstreamFileMatch(uri) {
    for (const fileMatch of this._fileMatches.values()) {
      if (fileMatch.resource.toString() === uri.toString()) {
        return fileMatch;
      }
    }
    return null;
  }
  replaceAll() {
    throw new Error("Cannot replace in AI search");
  }
  recursiveFileCount() {
    return this._fileMatches.size;
  }
  doRemoveFile(fileMatches, dispose = true, trigger = true, keepReadonly = false) {
    const removed = [];
    for (const match of fileMatches) {
      if (this._fileMatches.get(match.id())) {
        if (keepReadonly && match.hasReadonlyMatches()) {
          continue;
        }
        this._fileMatches.delete(match.id());
        if (dispose) {
          match.dispose();
        } else {
          this._unDisposedFileMatches.set(match.id(), match);
        }
        removed.push(match);
      }
    }
    if (trigger) {
      this._onChange.fire({ elements: removed, removed: true });
    }
  }
  replace(match) {
    throw new Error("Cannot replace in AI search");
  }
  replacingAll = false;
  bindModel(model) {
  }
  unbindNotebookEditorWidget(editor, resource) {
  }
  bindNotebookEditorWidget(editor, resource) {
    return Promise.resolve();
  }
  hasOnlyReadOnlyMatches() {
    return Array.from(this._fileMatches.values()).every((fm) => fm.hasOnlyReadOnlyMatches());
  }
  fileMatchesIterator() {
    return this._fileMatches.values();
  }
  folderMatchesIterator() {
    return [].values();
  }
  recursiveMatchCount() {
    return this._fileMatches.size;
  }
  disposeMatches() {
    [...this._fileMatches.values()].forEach((fileMatch) => fileMatch.dispose());
    [...this._unDisposedFileMatches.values()].forEach((fileMatch) => fileMatch.dispose());
  }
  dispose() {
    this.disposeMatches();
    this._onDispose.fire();
    super.dispose();
  }
};
AIFolderMatchWorkspaceRootImpl = __decorateClass([
  __decorateParam(5, IInstantiationService),
  __decorateParam(6, ILabelService)
], AIFolderMatchWorkspaceRootImpl);
let AIFileMatch = class extends FileMatchImpl {
  constructor(_query, _previewOptions, _maxResults, _parent, rawMatch, _closestRoot, _id, rank, modelService, replaceService, labelService) {
    super(_query, _previewOptions, _maxResults, _parent, rawMatch, _closestRoot, modelService, replaceService, labelService);
    this._id = _id;
    this.rank = rank;
  }
  static {
    __name(this, "AIFileMatch");
  }
  id() {
    return FILE_MATCH_PREFIX + this._id;
  }
  getFullRange() {
    let earliestStart = void 0;
    let latestEnd = void 0;
    for (const match of this.matches()) {
      const matchStart = match.range().getStartPosition();
      const matchEnd = match.range().getEndPosition();
      if (earliestStart === void 0) {
        earliestStart = matchStart;
      } else if (matchStart.isBefore(earliestStart)) {
        earliestStart = matchStart;
      }
      if (latestEnd === void 0) {
        latestEnd = matchEnd;
      } else if (!matchEnd.isBefore(latestEnd)) {
        latestEnd = matchEnd;
      }
    }
    if (earliestStart === void 0 || latestEnd === void 0) {
      return void 0;
    }
    return new Range(earliestStart.lineNumber, earliestStart.column, latestEnd.lineNumber, latestEnd.column);
  }
  rangeAsString() {
    const range = this.getFullRange();
    if (!range) {
      return void 0;
    }
    return range.startLineNumber + ":" + range.startColumn + "-" + range.endLineNumber + ":" + range.endColumn;
  }
  name() {
    const range = this.rangeAsString();
    return super.name() + range ? " " + range : "";
  }
  createMatches() {
    if (this.rawMatch.results) {
      this.rawMatch.results.filter(resultIsMatch).forEach((rawMatch) => {
        textSearchResultToMatches(rawMatch, this, true).forEach((m) => this.add(m));
      });
    }
  }
};
AIFileMatch = __decorateClass([
  __decorateParam(8, IModelService),
  __decorateParam(9, IReplaceService),
  __decorateParam(10, ILabelService)
], AIFileMatch);
export {
  AIFolderMatchWorkspaceRootImpl,
  AITextSearchHeadingImpl
};
//# sourceMappingURL=aiSearchModel.js.map
