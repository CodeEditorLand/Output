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
import { Disposable, DisposableStore, toDisposable } from "../../../../base/common/lifecycle.js";
import { Constants } from "../../../../base/common/uint.js";
import { ICodeEditor, IViewZone } from "../../../../editor/browser/editorBrowser.js";
import { LineSource, renderLines, RenderOptions } from "../../../../editor/browser/widget/diffEditor/components/diffEditorViewZones/renderLines.js";
import { diffAddDecoration, diffDeleteDecoration, diffWholeLineAddDecoration } from "../../../../editor/browser/widget/diffEditor/registrations.contribution.js";
import { EditorOption } from "../../../../editor/common/config/editorOptions.js";
import { IDocumentDiff } from "../../../../editor/common/diff/documentDiffProvider.js";
import { IEditorContribution } from "../../../../editor/common/editorCommon.js";
import { IModelDeltaDecoration, ITextModel } from "../../../../editor/common/model.js";
import { IEditorWorkerService } from "../../../../editor/common/services/editorWorker.js";
import { InlineDecoration, InlineDecorationType } from "../../../../editor/common/viewModel.js";
import { IChatEditingService, IChatEditingSession, IModifiedFileEntry, WorkingSetEntryState } from "../common/chatEditingService.js";
let ChatEditorController = class extends Disposable {
  constructor(_editor, _chatEditingService, _editorWorkerService) {
    super();
    this._editor = _editor;
    this._chatEditingService = _chatEditingService;
    this._editorWorkerService = _editorWorkerService;
    this._register(this._editor.onDidChangeModel(() => this._update()));
    this._register(this._chatEditingService.onDidChangeEditingSession(() => this._updateSessionDecorations()));
    this._register(toDisposable(() => this._clearRendering()));
  }
  static {
    __name(this, "ChatEditorController");
  }
  static ID = "editor.contrib.chatEditorController";
  _sessionStore = this._register(new DisposableStore());
  _decorations = this._editor.createDecorationsCollection();
  _viewZones = [];
  _update() {
    this._sessionStore.clear();
    if (!this._editor.hasModel()) {
      return;
    }
    if (this._editor.getOption(EditorOption.inDiffEditor)) {
      return;
    }
    const model = this._editor.getModel();
    if (this._editor.getOption(EditorOption.inDiffEditor)) {
      this._clearRendering();
      return;
    }
    this._sessionStore.add(model.onDidChangeContent(() => this._updateSessionDecorations()));
    this._updateSessionDecorations();
  }
  _updateSessionDecorations() {
    if (!this._editor.hasModel()) {
      this._clearRendering();
      return;
    }
    const model = this._editor.getModel();
    const editingSession = this._chatEditingService.getEditingSession(model.uri);
    const entry = this._getEntry(editingSession, model);
    if (!entry || entry.state.get() !== WorkingSetEntryState.Modified) {
      this._clearRendering();
      return;
    }
    this._editorWorkerService.computeDiff(
      entry.originalURI,
      model.uri,
      {
        ignoreTrimWhitespace: false,
        maxComputationTimeMs: Constants.MAX_SAFE_SMALL_INTEGER,
        computeMoves: false
      },
      "advanced"
    ).then((diff) => {
      if (!this._editor.hasModel()) {
        this._clearRendering();
        return;
      }
      const model2 = this._editor.getModel();
      const editingSession2 = this._chatEditingService.getEditingSession(model2.uri);
      const entry2 = this._getEntry(editingSession2, model2);
      if (!entry2) {
        this._clearRendering();
        return;
      }
      this._updateWithDiff(model2, entry2, diff);
    });
  }
  _getEntry(editingSession, model) {
    if (!editingSession) {
      return null;
    }
    return editingSession.entries.get().find((e) => e.modifiedURI.toString() === model.uri.toString()) || null;
  }
  _clearRendering() {
    this._editor.changeViewZones((viewZoneChangeAccessor) => {
      for (const id of this._viewZones) {
        viewZoneChangeAccessor.removeZone(id);
      }
    });
    this._viewZones = [];
    this._decorations.clear();
  }
  _updateWithDiff(model, entry, diff) {
    if (!diff) {
      this._clearRendering();
      return;
    }
    const originalModel = entry.originalModel;
    this._editor.changeViewZones((viewZoneChangeAccessor) => {
      for (const id of this._viewZones) {
        viewZoneChangeAccessor.removeZone(id);
      }
      this._viewZones = [];
      const modifiedDecorations = [];
      const mightContainNonBasicASCII = originalModel.mightContainNonBasicASCII();
      const mightContainRTL = originalModel.mightContainRTL();
      const renderOptions = RenderOptions.fromEditor(this._editor);
      for (const diffEntry of diff.changes) {
        const originalRange = diffEntry.original;
        originalModel.tokenization.forceTokenization(originalRange.endLineNumberExclusive - 1);
        const source = new LineSource(
          originalRange.mapToLineArray((l) => originalModel.tokenization.getLineTokens(l)),
          [],
          mightContainNonBasicASCII,
          mightContainRTL
        );
        const decorations = [];
        for (const i of diffEntry.innerChanges || []) {
          decorations.push(new InlineDecoration(
            i.originalRange.delta(-(diffEntry.original.startLineNumber - 1)),
            diffDeleteDecoration.className,
            InlineDecorationType.Regular
          ));
          modifiedDecorations.push({ range: i.modifiedRange, options: diffAddDecoration });
        }
        if (!diffEntry.modified.isEmpty) {
          modifiedDecorations.push({ range: diffEntry.modified.toInclusiveRange(), options: diffWholeLineAddDecoration });
        }
        const domNode = document.createElement("div");
        domNode.className = "chat-editing-original-zone line-delete";
        const result = renderLines(source, renderOptions, decorations, domNode);
        const viewZoneData = {
          afterLineNumber: diffEntry.modified.startLineNumber - 1,
          heightInLines: result.heightInLines,
          domNode,
          ordinal: 5e4 + 2
          // more than https://github.com/microsoft/vscode/blob/bf52a5cfb2c75a7327c9adeaefbddc06d529dcad/src/vs/workbench/contrib/inlineChat/browser/inlineChatZoneWidget.ts#L42
        };
        this._viewZones.push(viewZoneChangeAccessor.addZone(viewZoneData));
      }
      this._decorations.set(modifiedDecorations);
    });
  }
};
ChatEditorController = __decorateClass([
  __decorateParam(1, IChatEditingService),
  __decorateParam(2, IEditorWorkerService)
], ChatEditorController);
export {
  ChatEditorController
};
//# sourceMappingURL=chatEditorController.js.map
