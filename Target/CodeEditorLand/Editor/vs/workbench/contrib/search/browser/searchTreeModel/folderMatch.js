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
import { ResourceMap } from "../../../../../base/common/map.js";
import { TernarySearchTree } from "../../../../../base/common/ternarySearchTree.js";
import { URI } from "../../../../../base/common/uri.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { IUriIdentityService } from "../../../../../platform/uriIdentity/common/uriIdentity.js";
import { IReplaceService } from "./../replace.js";
import { IFileMatch, IPatternInfo, ITextQuery, ITextSearchPreviewOptions, resultIsMatch } from "../../../../services/search/common/search.js";
import { FileMatchImpl } from "./fileMatch.js";
import { IChangeEvent, ISearchTreeFileMatch, ISearchTreeFolderMatch, ISearchTreeFolderMatchWithResource, ISearchTreeFolderMatchNoRoot, ISearchTreeFolderMatchWorkspaceRoot, ISearchModel, ISearchResult, isSearchTreeFolderMatchWorkspaceRoot, ITextSearchHeading, isSearchTreeFolderMatchNoRoot, FOLDER_MATCH_PREFIX, getFileMatches } from "./searchTreeCommon.js";
import { NotebookEditorWidget } from "../../../notebook/browser/notebookEditorWidget.js";
import { isINotebookFileMatchNoModel } from "../../common/searchNotebookHelpers.js";
import { NotebookCompatibleFileMatch } from "../notebookSearch/notebookSearchModel.js";
import { isINotebookFileMatchWithModel, getIDFromINotebookCellMatch } from "../notebookSearch/searchNotebookHelpers.js";
import { isNotebookFileMatch } from "../notebookSearch/notebookSearchModelBase.js";
import { textSearchResultToMatches } from "./match.js";
let FolderMatchImpl = class extends Disposable {
  constructor(_resource, _id, _index, _query, _parent, _searchResult, _closestRoot, replaceService, instantiationService, labelService, uriIdentityService) {
    super();
    this._resource = _resource;
    this._index = _index;
    this._query = _query;
    this._parent = _parent;
    this._searchResult = _searchResult;
    this._closestRoot = _closestRoot;
    this.replaceService = replaceService;
    this.instantiationService = instantiationService;
    this.uriIdentityService = uriIdentityService;
    this._fileMatches = new ResourceMap();
    this._folderMatches = new ResourceMap();
    this._folderMatchesMap = TernarySearchTree.forUris((key) => this.uriIdentityService.extUri.ignorePathCasing(key));
    this._unDisposedFileMatches = new ResourceMap();
    this._unDisposedFolderMatches = new ResourceMap();
    this._name = new Lazy(() => this.resource ? labelService.getUriBasenameLabel(this.resource) : "");
    this._id = FOLDER_MATCH_PREFIX + _id;
  }
  static {
    __name(this, "FolderMatchImpl");
  }
  _onChange = this._register(new Emitter());
  onChange = this._onChange.event;
  _onDispose = this._register(new Emitter());
  onDispose = this._onDispose.event;
  _fileMatches;
  _folderMatches;
  _folderMatchesMap;
  _unDisposedFileMatches;
  _unDisposedFolderMatches;
  _replacingAll = false;
  _name;
  _id;
  get searchModel() {
    return this._searchResult.searchModel;
  }
  get showHighlights() {
    return this._parent.showHighlights;
  }
  get closestRoot() {
    return this._closestRoot;
  }
  set replacingAll(b) {
    this._replacingAll = b;
  }
  id() {
    return this._id;
  }
  get resource() {
    return this._resource;
  }
  index() {
    return this._index;
  }
  name() {
    return this._name.value;
  }
  parent() {
    return this._parent;
  }
  isAIContributed() {
    return false;
  }
  get hasChildren() {
    return this._fileMatches.size > 0 || this._folderMatches.size > 0;
  }
  bindModel(model) {
    const fileMatch = this._fileMatches.get(model.uri);
    if (fileMatch) {
      fileMatch.bindModel(model);
    } else {
      const folderMatch = this.getFolderMatch(model.uri);
      const match = folderMatch?.getDownstreamFileMatch(model.uri);
      match?.bindModel(model);
    }
  }
  createIntermediateFolderMatch(resource, id, index, query, baseWorkspaceFolder) {
    const folderMatch = this._register(this.instantiationService.createInstance(FolderMatchWithResourceImpl, resource, id, index, query, this, this._searchResult, baseWorkspaceFolder));
    this.configureIntermediateMatch(folderMatch);
    this.doAddFolder(folderMatch);
    return folderMatch;
  }
  configureIntermediateMatch(folderMatch) {
    const disposable = folderMatch.onChange((event) => this.onFolderChange(folderMatch, event));
    this._register(folderMatch.onDispose(() => disposable.dispose()));
  }
  clear(clearingAll = false) {
    const changed = this.allDownstreamFileMatches();
    this.disposeMatches();
    this._onChange.fire({ elements: changed, removed: true, added: false, clearingAll });
  }
  remove(matches) {
    if (!Array.isArray(matches)) {
      matches = [matches];
    }
    const allMatches = getFileMatches(matches);
    this.doRemoveFile(allMatches);
  }
  async replace(match) {
    return this.replaceService.replace([match]).then(() => {
      this.doRemoveFile([match], true, true, true);
    });
  }
  replaceAll() {
    const matches = this.matches();
    return this.batchReplace(matches);
  }
  matches() {
    return [...this.fileMatchesIterator(), ...this.folderMatchesIterator()];
  }
  fileMatchesIterator() {
    return this._fileMatches.values();
  }
  folderMatchesIterator() {
    return this._folderMatches.values();
  }
  isEmpty() {
    return this.fileCount() + this.folderCount() === 0;
  }
  getDownstreamFileMatch(uri) {
    const directChildFileMatch = this._fileMatches.get(uri);
    if (directChildFileMatch) {
      return directChildFileMatch;
    }
    const folderMatch = this.getFolderMatch(uri);
    const match = folderMatch?.getDownstreamFileMatch(uri);
    if (match) {
      return match;
    }
    return null;
  }
  allDownstreamFileMatches() {
    let recursiveChildren = [];
    const iterator = this.folderMatchesIterator();
    for (const elem of iterator) {
      recursiveChildren = recursiveChildren.concat(elem.allDownstreamFileMatches());
    }
    return [...this.fileMatchesIterator(), ...recursiveChildren];
  }
  fileCount() {
    return this._fileMatches.size;
  }
  folderCount() {
    return this._folderMatches.size;
  }
  count() {
    return this.fileCount() + this.folderCount();
  }
  recursiveFileCount() {
    return this.allDownstreamFileMatches().length;
  }
  recursiveMatchCount() {
    return this.allDownstreamFileMatches().reduce((prev, match) => prev + match.count(), 0);
  }
  get query() {
    return this._query;
  }
  doAddFile(fileMatch) {
    this._fileMatches.set(fileMatch.resource, fileMatch);
    if (this._unDisposedFileMatches.has(fileMatch.resource)) {
      this._unDisposedFileMatches.delete(fileMatch.resource);
    }
  }
  hasOnlyReadOnlyMatches() {
    return Array.from(this._fileMatches.values()).every((fm) => fm.hasOnlyReadOnlyMatches());
  }
  uriHasParent(parent, child) {
    return this.uriIdentityService.extUri.isEqualOrParent(child, parent) && !this.uriIdentityService.extUri.isEqual(child, parent);
  }
  isInParentChain(folderMatch) {
    let matchItem = this;
    while (matchItem instanceof FolderMatchImpl) {
      if (matchItem.id() === folderMatch.id()) {
        return true;
      }
      matchItem = matchItem.parent();
    }
    return false;
  }
  getFolderMatch(resource) {
    const folderMatch = this._folderMatchesMap.findSubstr(resource);
    return folderMatch;
  }
  doAddFolder(folderMatch) {
    if (this.resource && !this.uriHasParent(this.resource, folderMatch.resource)) {
      throw Error(`${folderMatch.resource} does not belong as a child of ${this.resource}`);
    } else if (this.isInParentChain(folderMatch)) {
      throw Error(`${folderMatch.resource} is a parent of ${this.resource}`);
    }
    this._folderMatches.set(folderMatch.resource, folderMatch);
    this._folderMatchesMap.set(folderMatch.resource, folderMatch);
    if (this._unDisposedFolderMatches.has(folderMatch.resource)) {
      this._unDisposedFolderMatches.delete(folderMatch.resource);
    }
  }
  async batchReplace(matches) {
    const allMatches = getFileMatches(matches);
    await this.replaceService.replace(allMatches);
    this.doRemoveFile(allMatches, true, true, true);
  }
  onFileChange(fileMatch, removed = false) {
    let added = false;
    if (!this._fileMatches.has(fileMatch.resource)) {
      this.doAddFile(fileMatch);
      added = true;
    }
    if (fileMatch.count() === 0) {
      this.doRemoveFile([fileMatch], false, false);
      added = false;
      removed = true;
    }
    if (!this._replacingAll) {
      this._onChange.fire({ elements: [fileMatch], added, removed });
    }
  }
  onFolderChange(folderMatch, event) {
    if (!this._folderMatches.has(folderMatch.resource)) {
      this.doAddFolder(folderMatch);
    }
    if (folderMatch.isEmpty()) {
      this._folderMatches.delete(folderMatch.resource);
      folderMatch.dispose();
    }
    this._onChange.fire(event);
  }
  doRemoveFile(fileMatches, dispose = true, trigger = true, keepReadonly = false) {
    const removed = [];
    for (const match of fileMatches) {
      if (this._fileMatches.get(match.resource)) {
        if (keepReadonly && match.hasReadonlyMatches()) {
          continue;
        }
        this._fileMatches.delete(match.resource);
        if (dispose) {
          match.dispose();
        } else {
          this._unDisposedFileMatches.set(match.resource, match);
        }
        removed.push(match);
      } else {
        const folder = this.getFolderMatch(match.resource);
        if (folder) {
          folder.doRemoveFile([match], dispose, trigger);
        } else {
          throw Error(`FileMatch ${match.resource} is not located within FolderMatch ${this.resource}`);
        }
      }
    }
    if (trigger) {
      this._onChange.fire({ elements: removed, removed: true });
    }
  }
  async bindNotebookEditorWidget(editor, resource) {
    const fileMatch = this._fileMatches.get(resource);
    if (isNotebookFileMatch(fileMatch)) {
      if (fileMatch) {
        fileMatch.bindNotebookEditorWidget(editor);
        await fileMatch.updateMatchesForEditorWidget();
      } else {
        const folderMatches = this.folderMatchesIterator();
        for (const elem of folderMatches) {
          await elem.bindNotebookEditorWidget(editor, resource);
        }
      }
    }
  }
  addFileMatch(raw, silent, searchInstanceID) {
    const added = [];
    const updated = [];
    raw.forEach((rawFileMatch) => {
      const existingFileMatch = this.getDownstreamFileMatch(rawFileMatch.resource);
      if (existingFileMatch) {
        if (rawFileMatch.results) {
          rawFileMatch.results.filter(resultIsMatch).forEach((m) => {
            textSearchResultToMatches(m, existingFileMatch, false).forEach((m2) => existingFileMatch.add(m2));
          });
        }
        if (isINotebookFileMatchWithModel(rawFileMatch) || isINotebookFileMatchNoModel(rawFileMatch)) {
          rawFileMatch.cellResults?.forEach((rawCellMatch) => {
            if (isNotebookFileMatch(existingFileMatch)) {
              const existingCellMatch = existingFileMatch.getCellMatch(getIDFromINotebookCellMatch(rawCellMatch));
              if (existingCellMatch) {
                existingCellMatch.addContentMatches(rawCellMatch.contentResults);
                existingCellMatch.addWebviewMatches(rawCellMatch.webviewResults);
              } else {
                existingFileMatch.addCellMatch(rawCellMatch);
              }
            }
          });
        }
        updated.push(existingFileMatch);
        if (rawFileMatch.results && rawFileMatch.results.length > 0) {
          existingFileMatch.addContext(rawFileMatch.results);
        }
      } else {
        if (isSearchTreeFolderMatchWorkspaceRoot(this) || isSearchTreeFolderMatchNoRoot(this)) {
          const fileMatch = this.createAndConfigureFileMatch(rawFileMatch, searchInstanceID);
          added.push(fileMatch);
        }
      }
    });
    const elements = [...added, ...updated];
    if (!silent && elements.length) {
      this._onChange.fire({ elements, added: !!added.length });
    }
  }
  unbindNotebookEditorWidget(editor, resource) {
    const fileMatch = this._fileMatches.get(resource);
    if (isNotebookFileMatch(fileMatch)) {
      if (fileMatch) {
        fileMatch.unbindNotebookEditorWidget(editor);
      } else {
        const folderMatches = this.folderMatchesIterator();
        for (const elem of folderMatches) {
          elem.unbindNotebookEditorWidget(editor, resource);
        }
      }
    }
  }
  disposeMatches() {
    [...this._fileMatches.values()].forEach((fileMatch) => fileMatch.dispose());
    [...this._folderMatches.values()].forEach((folderMatch) => folderMatch.disposeMatches());
    [...this._unDisposedFileMatches.values()].forEach((fileMatch) => fileMatch.dispose());
    [...this._unDisposedFolderMatches.values()].forEach((folderMatch) => folderMatch.disposeMatches());
    this._fileMatches.clear();
    this._folderMatches.clear();
    this._unDisposedFileMatches.clear();
    this._unDisposedFolderMatches.clear();
  }
  dispose() {
    this.disposeMatches();
    this._onDispose.fire();
    super.dispose();
  }
};
FolderMatchImpl = __decorateClass([
  __decorateParam(7, IReplaceService),
  __decorateParam(8, IInstantiationService),
  __decorateParam(9, ILabelService),
  __decorateParam(10, IUriIdentityService)
], FolderMatchImpl);
let FolderMatchWithResourceImpl = class extends FolderMatchImpl {
  static {
    __name(this, "FolderMatchWithResourceImpl");
  }
  _normalizedResource;
  constructor(_resource, _id, _index, _query, _parent, _searchResult, _closestRoot, replaceService, instantiationService, labelService, uriIdentityService) {
    super(_resource, _id, _index, _query, _parent, _searchResult, _closestRoot, replaceService, instantiationService, labelService, uriIdentityService);
    this._normalizedResource = new Lazy(() => this.uriIdentityService.extUri.removeTrailingPathSeparator(this.uriIdentityService.extUri.normalizePath(
      this.resource
    )));
  }
  get resource() {
    return this._resource;
  }
  get normalizedResource() {
    return this._normalizedResource.value;
  }
};
FolderMatchWithResourceImpl = __decorateClass([
  __decorateParam(7, IReplaceService),
  __decorateParam(8, IInstantiationService),
  __decorateParam(9, ILabelService),
  __decorateParam(10, IUriIdentityService)
], FolderMatchWithResourceImpl);
let FolderMatchWorkspaceRootImpl = class extends FolderMatchWithResourceImpl {
  static {
    __name(this, "FolderMatchWorkspaceRootImpl");
  }
  constructor(_resource, _id, _index, _query, _parent, replaceService, instantiationService, labelService, uriIdentityService) {
    super(_resource, _id, _index, _query, _parent, _parent.parent(), null, replaceService, instantiationService, labelService, uriIdentityService);
  }
  normalizedUriParent(uri) {
    return this.uriIdentityService.extUri.normalizePath(this.uriIdentityService.extUri.dirname(uri));
  }
  uriEquals(uri1, ur2) {
    return this.uriIdentityService.extUri.isEqual(uri1, ur2);
  }
  createFileMatch(query, previewOptions, maxResults, parent, rawFileMatch, closestRoot, searchInstanceID) {
    const fileMatch = this.instantiationService.createInstance(
      NotebookCompatibleFileMatch,
      query,
      previewOptions,
      maxResults,
      parent,
      rawFileMatch,
      closestRoot,
      searchInstanceID
    );
    fileMatch.createMatches();
    parent.doAddFile(fileMatch);
    const disposable = fileMatch.onChange(({ didRemove }) => parent.onFileChange(fileMatch, didRemove));
    this._register(fileMatch.onDispose(() => disposable.dispose()));
    return fileMatch;
  }
  createAndConfigureFileMatch(rawFileMatch, searchInstanceID) {
    if (!this.uriHasParent(this.resource, rawFileMatch.resource)) {
      throw Error(`${rawFileMatch.resource} is not a descendant of ${this.resource}`);
    }
    const fileMatchParentParts = [];
    let uri = this.normalizedUriParent(rawFileMatch.resource);
    while (!this.uriEquals(this.normalizedResource, uri)) {
      fileMatchParentParts.unshift(uri);
      const prevUri = uri;
      uri = this.uriIdentityService.extUri.removeTrailingPathSeparator(this.normalizedUriParent(uri));
      if (this.uriEquals(prevUri, uri)) {
        throw Error(`${rawFileMatch.resource} is not correctly configured as a child of ${this.normalizedResource}`);
      }
    }
    const root = this.closestRoot ?? this;
    let parent = this;
    for (let i = 0; i < fileMatchParentParts.length; i++) {
      let folderMatch = parent.getFolderMatch(fileMatchParentParts[i]);
      if (!folderMatch) {
        folderMatch = parent.createIntermediateFolderMatch(fileMatchParentParts[i], fileMatchParentParts[i].toString(), -1, this._query, root);
      }
      parent = folderMatch;
    }
    return this.createFileMatch(this._query.contentPattern, this._query.previewOptions, this._query.maxResults, parent, rawFileMatch, root, searchInstanceID);
  }
};
FolderMatchWorkspaceRootImpl = __decorateClass([
  __decorateParam(5, IReplaceService),
  __decorateParam(6, IInstantiationService),
  __decorateParam(7, ILabelService),
  __decorateParam(8, IUriIdentityService)
], FolderMatchWorkspaceRootImpl);
let FolderMatchNoRootImpl = class extends FolderMatchImpl {
  static {
    __name(this, "FolderMatchNoRootImpl");
  }
  constructor(_id, _index, _query, _parent, replaceService, instantiationService, labelService, uriIdentityService) {
    super(null, _id, _index, _query, _parent, _parent.parent(), null, replaceService, instantiationService, labelService, uriIdentityService);
  }
  createAndConfigureFileMatch(rawFileMatch, searchInstanceID) {
    const fileMatch = this._register(this.instantiationService.createInstance(
      NotebookCompatibleFileMatch,
      this._query.contentPattern,
      this._query.previewOptions,
      this._query.maxResults,
      this,
      rawFileMatch,
      null,
      searchInstanceID
    ));
    fileMatch.createMatches();
    this.doAddFile(fileMatch);
    const disposable = fileMatch.onChange(({ didRemove }) => this.onFileChange(fileMatch, didRemove));
    this._register(fileMatch.onDispose(() => disposable.dispose()));
    return fileMatch;
  }
};
FolderMatchNoRootImpl = __decorateClass([
  __decorateParam(4, IReplaceService),
  __decorateParam(5, IInstantiationService),
  __decorateParam(6, ILabelService),
  __decorateParam(7, IUriIdentityService)
], FolderMatchNoRootImpl);
export {
  FolderMatchImpl,
  FolderMatchNoRootImpl,
  FolderMatchWithResourceImpl,
  FolderMatchWorkspaceRootImpl
};
//# sourceMappingURL=folderMatch.js.map
