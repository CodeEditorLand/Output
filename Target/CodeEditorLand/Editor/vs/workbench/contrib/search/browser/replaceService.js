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
import * as nls from "../../../../nls.js";
import { URI } from "../../../../base/common/uri.js";
import * as network from "../../../../base/common/network.js";
import { Disposable, IReference } from "../../../../base/common/lifecycle.js";
import { IReplaceService } from "./replace.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ISearchViewModelWorkbenchService } from "./searchTreeModel/searchViewModelWorkbenchService.js";
import { IProgress, IProgressStep } from "../../../../platform/progress/common/progress.js";
import { ITextModelService, ITextModelContentProvider } from "../../../../editor/common/services/resolverService.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { ScrollType } from "../../../../editor/common/editorCommon.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { createTextBufferFactoryFromSnapshot } from "../../../../editor/common/model/textModel.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { IBulkEditService, ResourceTextEdit } from "../../../../editor/browser/services/bulkEditService.js";
import { Range } from "../../../../editor/common/core/range.js";
import { EditOperation, ISingleEditOperation } from "../../../../editor/common/core/editOperation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { dirname } from "../../../../base/common/resources.js";
import { Promises } from "../../../../base/common/async.js";
import { SaveSourceRegistry } from "../../../common/editor.js";
import { CellUri, IResolvedNotebookEditorModel } from "../../notebook/common/notebookCommon.js";
import { INotebookEditorModelResolverService } from "../../notebook/common/notebookEditorModelResolverService.js";
import { ISearchTreeFileMatch, isSearchTreeFileMatch, ISearchTreeMatch, FileMatchOrMatch, isSearchTreeMatch } from "./searchTreeModel/searchTreeCommon.js";
import { isIMatchInNotebook } from "./notebookSearch/notebookSearchModelBase.js";
const REPLACE_PREVIEW = "replacePreview";
const toReplaceResource = /* @__PURE__ */ __name((fileResource) => {
  return fileResource.with({ scheme: network.Schemas.internal, fragment: REPLACE_PREVIEW, query: JSON.stringify({ scheme: fileResource.scheme }) });
}, "toReplaceResource");
const toFileResource = /* @__PURE__ */ __name((replaceResource) => {
  return replaceResource.with({ scheme: JSON.parse(replaceResource.query)["scheme"], fragment: "", query: "" });
}, "toFileResource");
let ReplacePreviewContentProvider = class {
  constructor(instantiationService, textModelResolverService) {
    this.instantiationService = instantiationService;
    this.textModelResolverService = textModelResolverService;
    this.textModelResolverService.registerTextModelContentProvider(network.Schemas.internal, this);
  }
  static {
    __name(this, "ReplacePreviewContentProvider");
  }
  static ID = "workbench.contrib.replacePreviewContentProvider";
  provideTextContent(uri) {
    if (uri.fragment === REPLACE_PREVIEW) {
      return this.instantiationService.createInstance(ReplacePreviewModel).resolve(uri);
    }
    return null;
  }
};
ReplacePreviewContentProvider = __decorateClass([
  __decorateParam(0, IInstantiationService),
  __decorateParam(1, ITextModelService)
], ReplacePreviewContentProvider);
let ReplacePreviewModel = class extends Disposable {
  constructor(modelService, languageService, textModelResolverService, replaceService, searchWorkbenchService) {
    super();
    this.modelService = modelService;
    this.languageService = languageService;
    this.textModelResolverService = textModelResolverService;
    this.replaceService = replaceService;
    this.searchWorkbenchService = searchWorkbenchService;
  }
  static {
    __name(this, "ReplacePreviewModel");
  }
  async resolve(replacePreviewUri) {
    const fileResource = toFileResource(replacePreviewUri);
    const fileMatch = this.searchWorkbenchService.searchModel.searchResult.matches(false).filter((match) => match.resource.toString() === fileResource.toString())[0];
    const ref = this._register(await this.textModelResolverService.createModelReference(fileResource));
    const sourceModel = ref.object.textEditorModel;
    const sourceModelLanguageId = sourceModel.getLanguageId();
    const replacePreviewModel = this.modelService.createModel(createTextBufferFactoryFromSnapshot(sourceModel.createSnapshot()), this.languageService.createById(sourceModelLanguageId), replacePreviewUri);
    this._register(fileMatch.onChange(({ forceUpdateModel }) => this.update(sourceModel, replacePreviewModel, fileMatch, forceUpdateModel)));
    this._register(this.searchWorkbenchService.searchModel.onReplaceTermChanged(() => this.update(sourceModel, replacePreviewModel, fileMatch)));
    this._register(fileMatch.onDispose(() => replacePreviewModel.dispose()));
    this._register(replacePreviewModel.onWillDispose(() => this.dispose()));
    this._register(sourceModel.onWillDispose(() => this.dispose()));
    return replacePreviewModel;
  }
  update(sourceModel, replacePreviewModel, fileMatch, override = false) {
    if (!sourceModel.isDisposed() && !replacePreviewModel.isDisposed()) {
      this.replaceService.updateReplacePreview(fileMatch, override);
    }
  }
};
ReplacePreviewModel = __decorateClass([
  __decorateParam(0, IModelService),
  __decorateParam(1, ILanguageService),
  __decorateParam(2, ITextModelService),
  __decorateParam(3, IReplaceService),
  __decorateParam(4, ISearchViewModelWorkbenchService)
], ReplacePreviewModel);
let ReplaceService = class {
  constructor(textFileService, editorService, textModelResolverService, bulkEditorService, labelService, notebookEditorModelResolverService) {
    this.textFileService = textFileService;
    this.editorService = editorService;
    this.textModelResolverService = textModelResolverService;
    this.bulkEditorService = bulkEditorService;
    this.labelService = labelService;
    this.notebookEditorModelResolverService = notebookEditorModelResolverService;
  }
  static {
    __name(this, "ReplaceService");
  }
  static REPLACE_SAVE_SOURCE = SaveSourceRegistry.registerSource("searchReplace.source", nls.localize("searchReplace.source", "Search and Replace"));
  async replace(arg, progress = void 0, resource = null) {
    const edits = this.createEdits(arg, resource);
    await this.bulkEditorService.apply(edits, { progress });
    const rawTextPromises = edits.map(async (e) => {
      if (e.resource.scheme === network.Schemas.vscodeNotebookCell) {
        const notebookResource = CellUri.parse(e.resource)?.notebook;
        if (notebookResource) {
          let ref;
          try {
            ref = await this.notebookEditorModelResolverService.resolve(notebookResource);
            await ref.object.save({ source: ReplaceService.REPLACE_SAVE_SOURCE });
          } finally {
            ref?.dispose();
          }
        }
        return;
      } else {
        return this.textFileService.files.get(e.resource)?.save({ source: ReplaceService.REPLACE_SAVE_SOURCE });
      }
    });
    return Promises.settled(rawTextPromises);
  }
  async openReplacePreview(element, preserveFocus, sideBySide, pinned) {
    const fileMatch = isSearchTreeMatch(element) ? element.parent() : element;
    const editor = await this.editorService.openEditor({
      original: { resource: fileMatch.resource },
      modified: { resource: toReplaceResource(fileMatch.resource) },
      label: nls.localize("fileReplaceChanges", "{0} \u2194 {1} (Replace Preview)", fileMatch.name(), fileMatch.name()),
      description: this.labelService.getUriLabel(dirname(fileMatch.resource), { relative: true }),
      options: {
        preserveFocus,
        pinned,
        revealIfVisible: true
      }
    });
    const input = editor?.input;
    const disposable = fileMatch.onDispose(() => {
      input?.dispose();
      disposable.dispose();
    });
    await this.updateReplacePreview(fileMatch);
    if (editor) {
      const editorControl = editor.getControl();
      if (isSearchTreeMatch(element) && editorControl) {
        editorControl.revealLineInCenter(element.range().startLineNumber, ScrollType.Immediate);
      }
    }
  }
  async updateReplacePreview(fileMatch, override = false) {
    const replacePreviewUri = toReplaceResource(fileMatch.resource);
    const [sourceModelRef, replaceModelRef] = await Promise.all([this.textModelResolverService.createModelReference(fileMatch.resource), this.textModelResolverService.createModelReference(replacePreviewUri)]);
    const sourceModel = sourceModelRef.object.textEditorModel;
    const replaceModel = replaceModelRef.object.textEditorModel;
    try {
      if (sourceModel && replaceModel) {
        if (override) {
          replaceModel.setValue(sourceModel.getValue());
        } else {
          replaceModel.undo();
        }
        this.applyEditsToPreview(fileMatch, replaceModel);
      }
    } finally {
      sourceModelRef.dispose();
      replaceModelRef.dispose();
    }
  }
  applyEditsToPreview(fileMatch, replaceModel) {
    const resourceEdits = this.createEdits(fileMatch, replaceModel.uri);
    const modelEdits = [];
    for (const resourceEdit of resourceEdits) {
      modelEdits.push(
        EditOperation.replaceMove(
          Range.lift(resourceEdit.textEdit.range),
          resourceEdit.textEdit.text
        )
      );
    }
    replaceModel.pushEditOperations([], modelEdits.sort((a, b) => Range.compareRangesUsingStarts(a.range, b.range)), () => []);
  }
  createEdits(arg, resource = null) {
    const edits = [];
    if (isSearchTreeMatch(arg)) {
      if (!arg.isReadonly) {
        if (isIMatchInNotebook(arg)) {
          const match = arg;
          edits.push(this.createEdit(match, match.replaceString, match.cell?.uri));
        } else {
          const match = arg;
          edits.push(this.createEdit(match, match.replaceString, resource));
        }
      }
    }
    if (isSearchTreeFileMatch(arg)) {
      arg = [arg];
    }
    if (arg instanceof Array) {
      arg.forEach((element) => {
        const fileMatch = element;
        if (fileMatch.count() > 0) {
          edits.push(...fileMatch.matches().flatMap(
            (match) => this.createEdits(match, resource)
          ));
        }
      });
    }
    return edits;
  }
  createEdit(match, text, resource = null) {
    const fileMatch = match.parent();
    return new ResourceTextEdit(
      resource ?? fileMatch.resource,
      { range: match.range(), text },
      void 0,
      void 0
    );
  }
};
ReplaceService = __decorateClass([
  __decorateParam(0, ITextFileService),
  __decorateParam(1, IEditorService),
  __decorateParam(2, ITextModelService),
  __decorateParam(3, IBulkEditService),
  __decorateParam(4, ILabelService),
  __decorateParam(5, INotebookEditorModelResolverService)
], ReplaceService);
export {
  ReplacePreviewContentProvider,
  ReplaceService
};
//# sourceMappingURL=replaceService.js.map
