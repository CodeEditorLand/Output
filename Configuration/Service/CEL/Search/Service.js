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
import { Disposable } from "../../../../base/common/lifecycle.js";
import { Schemas } from "../../../../base/common/network.js";
import { URI } from "../../../../base/common/uri.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import {
  InstantiationType,
  registerSingleton
} from "../../../../platform/instantiation/common/extensions.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { ISearchService, SearchProviderType } from "../common/search.js";
import { SearchService } from "../common/searchService.js";
const TauriInvoke = /* @__PURE__ */ __name((Channel, Args) => {
  const Bridge = globalThis && globalThis.__TAURI__ || null;
  const Invoke = Bridge && Bridge.core && Bridge.core.invoke || Bridge && Bridge.invoke;
  if (typeof Invoke !== "function") {
    return Promise.resolve(null);
  }
  try {
    return Invoke("MountainIPCInvoke", {
      method: Channel,
      params: Args
    }).catch(() => null);
  } catch {
    return Promise.resolve(null);
  }
}, "TauriInvoke");
const ToUri = /* @__PURE__ */ __name((Raw) => {
  try {
    return typeof Raw === "string" ? URI.parse(Raw) : URI.revive(Raw);
  } catch {
    return URI.parse("file:///");
  }
}, "ToUri");
const BuildIncludePattern = /* @__PURE__ */ __name((Query) => {
  if (!Query) return "**";
  if (typeof Query.filePattern === "string" && Query.filePattern.length > 0) {
    return Query.filePattern;
  }
  const Folders = Array.isArray(Query.folderQueries) ? Query.folderQueries : [];
  if (Folders.length > 0) return "**";
  return "**";
}, "BuildIncludePattern");
const BuildExcludePattern = /* @__PURE__ */ __name((Query) => {
  if (!Query) return "";
  const Sources = [];
  if (Query.excludePattern && typeof Query.excludePattern === "object") {
    Sources.push(Object.keys(Query.excludePattern));
  }
  const Folders = Array.isArray(Query.folderQueries) ? Query.folderQueries : [];
  for (const Folder of Folders) {
    if (Folder && Folder.excludePattern && typeof Folder.excludePattern === "object") {
      const P = Folder.excludePattern.pattern || Folder.excludePattern;
      if (P && typeof P === "object") Sources.push(Object.keys(P));
    }
  }
  const Flat = [];
  for (const Set of Sources) {
    for (const Key of Set) Flat.push(Key);
  }
  return Flat.join(",");
}, "BuildExcludePattern");
class MountainTauriSearchProvider extends Disposable {
  static {
    __name(this, "MountainTauriSearchProvider");
  }
  async getAIName() {
    return void 0;
  }
  async clearCache(_CacheKey) {
  }
  async fileSearch(Query, _Token) {
    const Include = BuildIncludePattern(Query);
    const Exclude = BuildExcludePattern(Query);
    const Cap = Query && Query.maxResults || 1e4;
    const Raw = await TauriInvoke("search:findFiles", [
      Include,
      Exclude,
      Cap,
      true,
      false
    ]);
    const Uris = Array.isArray(Raw) ? Raw : [];
    const Results = Uris.map((U) => ({ resource: ToUri(U) }));
    return { results: Results, messages: [], limitHit: Uris.length >= Cap };
  }
  async textSearch(Query, OnProgress, _Token) {
    const Pattern = Query && Query.contentPattern && Query.contentPattern.pattern || "";
    if (!Pattern) {
      return { results: [], messages: [], limitHit: false };
    }
    const IsRegex = !!(Query && Query.contentPattern && Query.contentPattern.isRegExp);
    const IsCase = !!(Query && Query.contentPattern && Query.contentPattern.isCaseSensitive);
    const IsWord = !!(Query && Query.contentPattern && Query.contentPattern.isWordMatch);
    const Include = BuildIncludePattern(Query);
    const Exclude = BuildExcludePattern(Query);
    const Cap = Query && Query.maxResults || 1e4;
    const QueryShape = {
      pattern: Pattern,
      isRegExp: IsRegex,
      isCaseSensitive: IsCase,
      isWordMatch: IsWord,
      isMultiline: false
    };
    const OptionsShape = {
      includePattern: Include,
      excludePattern: Exclude,
      maxResults: Cap
    };
    const Raw = await TauriInvoke("search:findInFiles", [
      QueryShape,
      OptionsShape
    ]);
    const Files = Array.isArray(Raw) ? Raw : [];
    const Results = [];
    let TotalMatches = 0;
    for (const File of Files) {
      if (!File || typeof File !== "object") continue;
      const Resource = ToUri(File.resource);
      const Matches = Array.isArray(File.matches) ? File.matches : [];
      const Hits = Matches.map((M) => {
        const Line = Math.max(0, (M && M.lineNumber || 1) - 1);
        const Cols = Array.isArray(M && M.columns) ? M.columns : [];
        const Ranges = Cols.length > 0 ? Cols : [{ start: 0, end: (M && M.preview || "").length }];
        return {
          rangeLocations: Ranges.map((R) => ({
            source: {
              startLineNumber: Line,
              startColumn: R.start || 0,
              endLineNumber: Line,
              endColumn: R.end || 0
            },
            preview: {
              startLineNumber: 0,
              startColumn: R.start || 0,
              endLineNumber: 0,
              endColumn: R.end || 0
            }
          })),
          previewText: M && M.preview || ""
        };
      });
      TotalMatches += Hits.length;
      const FileMatch = { resource: Resource, results: Hits };
      Results.push(FileMatch);
      if (typeof OnProgress === "function") {
        try {
          OnProgress(FileMatch);
        } catch {
        }
      }
    }
    return {
      results: Results,
      messages: [],
      limitHit: TotalMatches >= Cap
    };
  }
}
let RemoteSearchService = class extends SearchService {
  static {
    __name(this, "RemoteSearchService");
  }
  constructor(ModelService, EditorService, TelemetryService, LogService, ExtensionService, FileService, InstantiationServiceArg, UriIdentityService) {
    super(
      ModelService,
      EditorService,
      TelemetryService,
      LogService,
      ExtensionService,
      FileService,
      UriIdentityService
    );
    this.instantiationService = InstantiationServiceArg;
    const Provider = new MountainTauriSearchProvider();
    this.registerSearchResultProvider(
      Schemas.file,
      SearchProviderType.file,
      Provider
    );
    this.registerSearchResultProvider(
      Schemas.file,
      SearchProviderType.text,
      Provider
    );
  }
};
RemoteSearchService = __decorateClass([
  __decorateParam(0, IModelService),
  __decorateParam(1, IEditorService),
  __decorateParam(2, ITelemetryService),
  __decorateParam(3, ILogService),
  __decorateParam(4, IExtensionService),
  __decorateParam(5, IFileService),
  __decorateParam(6, IInstantiationService),
  __decorateParam(7, IUriIdentityService)
], RemoteSearchService);
registerSingleton(
  ISearchService,
  RemoteSearchService,
  InstantiationType.Delayed
);
class LocalFileSearchWorkerClient extends MountainTauriSearchProvider {
  static {
    __name(this, "LocalFileSearchWorkerClient");
  }
}
export {
  LocalFileSearchWorkerClient,
  RemoteSearchService
};
//# sourceMappingURL=Service.js.map
