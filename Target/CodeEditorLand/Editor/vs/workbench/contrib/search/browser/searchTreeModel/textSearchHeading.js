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
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../../../base/common/map.js";
import { TernarySearchTree } from "../../../../../base/common/ternarySearchTree.js";
import { URI } from "../../../../../base/common/uri.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IProgress, IProgressStep } from "../../../../../platform/progress/common/progress.js";
import { IUriIdentityService } from "../../../../../platform/uriIdentity/common/uriIdentity.js";
import { IReplaceService } from "../replace.js";
import { IFileMatch, ISearchComplete, ITextQuery } from "../../../../services/search/common/search.js";
import { RangeHighlightDecorations } from "./rangeDecorations.js";
import { FolderMatchNoRootImpl, FolderMatchWorkspaceRootImpl } from "./folderMatch.js";
import { IChangeEvent, ISearchTreeFileMatch, ISearchTreeFolderMatch, ISearchTreeFolderMatchWithResource, ISearchTreeFolderMatchWorkspaceRoot, IPlainTextSearchHeading, ISearchResult, isSearchTreeFileMatch, isSearchTreeFolderMatch, ITextSearchHeading, ISearchTreeMatch, TEXT_SEARCH_HEADING_PREFIX, PLAIN_TEXT_SEARCH__RESULT_ID } from "./searchTreeCommon.js";
import { isNotebookFileMatch } from "../notebookSearch/notebookSearchModelBase.js";
let TextSearchHeadingImpl = class extends Disposable {
  constructor(_allowOtherResults, _parent, instantiationService, uriIdentityService) {
    super();
    this._allowOtherResults = _allowOtherResults;
    this._parent = _parent;
    this.instantiationService = instantiationService;
    this.uriIdentityService = uriIdentityService;
    this._rangeHighlightDecorations = this.instantiationService.createInstance(RangeHighlightDecorations);
    this._register(this.onChange((e) => {
      if (e.removed) {
        this._isDirty = !this.isEmpty();
      }
    }));
  }
  static {
    __name(this, "TextSearchHeadingImpl");
  }
  _onChange = this._register(new Emitter());
  onChange = this._onChange.event;
  _isDirty = false;
  _showHighlights = false;
  _query = null;
  _rangeHighlightDecorations;
  disposePastResults = /* @__PURE__ */ __name(() => Promise.resolve(), "disposePastResults");
  _folderMatches = [];
  _otherFilesMatch = null;
  _folderMatchesMap = TernarySearchTree.forUris((key) => this.uriIdentityService.extUri.ignorePathCasing(key));
  resource = null;
  hidden = false;
  cachedSearchComplete;
  hide() {
    this.hidden = true;
    this.clear();
  }
  parent() {
    return this._parent;
  }
  get hasChildren() {
    return this._folderMatches.length > 0;
  }
  get isDirty() {
    return this._isDirty;
  }
  getFolderMatch(resource) {
    const folderMatch = this._folderMatchesMap.findSubstr(resource);
    if (!folderMatch && this._allowOtherResults && this._otherFilesMatch) {
      return this._otherFilesMatch;
    }
    return folderMatch;
  }
  add(allRaw, searchInstanceID, silent = false) {
    const { byFolder, other } = this.groupFilesByFolder(allRaw);
    byFolder.forEach((raw) => {
      if (!raw.length) {
        return;
      }
      const folderMatch = this.getFolderMatch(raw[0].resource);
      folderMatch?.addFileMatch(raw, silent, searchInstanceID);
    });
    if (!this.isAIContributed) {
      this._otherFilesMatch?.addFileMatch(other, silent, searchInstanceID);
    }
    this.disposePastResults();
  }
  remove(matches, ai = false) {
    if (!Array.isArray(matches)) {
      matches = [matches];
    }
    matches.forEach((m) => {
      if (isSearchTreeFolderMatch(m)) {
        m.clear();
      }
    });
    const fileMatches = matches.filter((m) => isSearchTreeFileMatch(m));
    const { byFolder, other } = this.groupFilesByFolder(fileMatches);
    byFolder.forEach((matches2) => {
      if (!matches2.length) {
        return;
      }
      this.getFolderMatch(matches2[0].resource)?.remove(matches2);
    });
    if (other.length) {
      this.getFolderMatch(other[0].resource)?.remove(other);
    }
  }
  groupFilesByFolder(fileMatches) {
    const rawPerFolder = new ResourceMap();
    const otherFileMatches = [];
    this._folderMatches.forEach((fm) => rawPerFolder.set(fm.resource, []));
    fileMatches.forEach((rawFileMatch) => {
      const folderMatch = this.getFolderMatch(rawFileMatch.resource);
      if (!folderMatch) {
        return;
      }
      const resource = folderMatch.resource;
      if (resource) {
        rawPerFolder.get(resource).push(rawFileMatch);
      } else {
        otherFileMatches.push(rawFileMatch);
      }
    });
    return {
      byFolder: rawPerFolder,
      other: otherFileMatches
    };
  }
  isEmpty() {
    return this.folderMatches().every((folderMatch) => folderMatch.isEmpty());
  }
  findFolderSubstr(resource) {
    return this._folderMatchesMap.findSubstr(resource);
  }
  get query() {
    return this._query;
  }
  set query(query) {
    const oldFolderMatches = this.folderMatches();
    this.disposePastResults = async () => {
      oldFolderMatches.forEach((match) => match.clear());
      oldFolderMatches.forEach((match) => match.dispose());
      this._isDirty = false;
    };
    this.cachedSearchComplete = void 0;
    this._rangeHighlightDecorations.removeHighlightRange();
    this._folderMatchesMap = TernarySearchTree.forUris((key) => this.uriIdentityService.extUri.ignorePathCasing(key));
    if (!query) {
      return;
    }
    this._folderMatches = (query && query.folderQueries || []).map((fq) => fq.folder).map((resource, index) => this._createBaseFolderMatch(resource, resource.toString(), index, query, this.isAIContributed));
    this._folderMatches.forEach((fm) => this._folderMatchesMap.set(fm.resource, fm));
    if (this._allowOtherResults) {
      this._otherFilesMatch = this._createBaseFolderMatch(null, "otherFiles", this._folderMatches.length + 1, query, this.isAIContributed);
    }
    this._query = query;
  }
  _createBaseFolderMatch(resource, id, index, query, ai) {
    let folderMatch;
    if (resource) {
      folderMatch = this._register(this.createWorkspaceRootWithResourceImpl(resource, id, index, query));
    } else {
      folderMatch = this._register(this.instantiationService.createInstance(FolderMatchNoRootImpl, id, index, query, this));
    }
    const disposable = folderMatch.onChange((event) => this._onChange.fire(event));
    this._register(folderMatch.onDispose(() => disposable.dispose()));
    return folderMatch;
  }
  folderMatches() {
    return this._otherFilesMatch && this._allowOtherResults ? [
      ...this._folderMatches,
      this._otherFilesMatch
    ] : this._folderMatches;
  }
  disposeMatches() {
    this.folderMatches().forEach((folderMatch) => folderMatch.dispose());
    this._folderMatches = [];
    this._folderMatchesMap = TernarySearchTree.forUris((key) => this.uriIdentityService.extUri.ignorePathCasing(key));
    this._rangeHighlightDecorations.removeHighlightRange();
  }
  matches() {
    const matches = [];
    this.folderMatches().forEach((folderMatch) => {
      matches.push(folderMatch.allDownstreamFileMatches());
    });
    return [].concat(...matches);
  }
  get showHighlights() {
    return this._showHighlights;
  }
  toggleHighlights(value) {
    if (this._showHighlights === value) {
      return;
    }
    this._showHighlights = value;
    let selectedMatch = null;
    this.matches().forEach((fileMatch) => {
      fileMatch.updateHighlights();
      if (isNotebookFileMatch(fileMatch)) {
        fileMatch.updateNotebookHighlights();
      }
      if (!selectedMatch) {
        selectedMatch = fileMatch.getSelectedMatch();
      }
    });
    if (this._showHighlights && selectedMatch) {
      this._rangeHighlightDecorations.highlightRange(
        selectedMatch.parent().resource,
        selectedMatch.range()
      );
    } else {
      this._rangeHighlightDecorations.removeHighlightRange();
    }
  }
  get rangeHighlightDecorations() {
    return this._rangeHighlightDecorations;
  }
  fileCount() {
    return this.folderMatches().reduce((prev, match) => prev + match.recursiveFileCount(), 0);
  }
  count() {
    return this.matches().reduce((prev, match) => prev + match.count(), 0);
  }
  clear() {
    this.folderMatches().forEach((folderMatch) => folderMatch.clear(true));
    this.disposeMatches();
    this._folderMatches = [];
    this._otherFilesMatch = null;
    this.cachedSearchComplete = void 0;
  }
  async dispose() {
    this._rangeHighlightDecorations.dispose();
    this.disposeMatches();
    super.dispose();
    await this.disposePastResults();
  }
};
TextSearchHeadingImpl = __decorateClass([
  __decorateParam(2, IInstantiationService),
  __decorateParam(3, IUriIdentityService)
], TextSearchHeadingImpl);
let PlainTextSearchHeadingImpl = class extends TextSearchHeadingImpl {
  constructor(parent, instantiationService, uriIdentityService, replaceService) {
    super(true, parent, instantiationService, uriIdentityService);
    this.replaceService = replaceService;
  }
  static {
    __name(this, "PlainTextSearchHeadingImpl");
  }
  id() {
    return TEXT_SEARCH_HEADING_PREFIX + PLAIN_TEXT_SEARCH__RESULT_ID;
  }
  get isAIContributed() {
    return false;
  }
  replace(match) {
    return this.getFolderMatch(match.resource)?.replace(match) ?? Promise.resolve();
  }
  name() {
    return "Text";
  }
  replaceAll(progress) {
    this.replacingAll = true;
    const promise = this.replaceService.replace(this.matches(), progress);
    return promise.then(() => {
      this.replacingAll = false;
      this.clear();
    }, () => {
      this.replacingAll = false;
    });
  }
  set replacingAll(running) {
    this.folderMatches().forEach((folderMatch) => {
      folderMatch.replacingAll = running;
    });
  }
  createWorkspaceRootWithResourceImpl(resource, id, index, query) {
    return this.instantiationService.createInstance(FolderMatchWorkspaceRootImpl, resource, id, index, query, this);
  }
};
PlainTextSearchHeadingImpl = __decorateClass([
  __decorateParam(1, IInstantiationService),
  __decorateParam(2, IUriIdentityService),
  __decorateParam(3, IReplaceService)
], PlainTextSearchHeadingImpl);
export {
  PlainTextSearchHeadingImpl,
  TextSearchHeadingImpl
};
//# sourceMappingURL=textSearchHeading.js.map
