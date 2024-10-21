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
import { binarySearch, coalesceInPlace } from "../../../../base/common/arrays.js";
import { Disposable, DisposableStore, toDisposable } from "../../../../base/common/lifecycle.js";
import { ICodeEditor, IViewZone } from "../../../../editor/browser/editorBrowser.js";
import { LineSource, renderLines, RenderOptions } from "../../../../editor/browser/widget/diffEditor/components/diffEditorViewZones/renderLines.js";
import { diffAddDecoration, diffDeleteDecoration, diffWholeLineAddDecoration } from "../../../../editor/browser/widget/diffEditor/registrations.contribution.js";
import { EditorOption } from "../../../../editor/common/config/editorOptions.js";
import { Range } from "../../../../editor/common/core/range.js";
import { IDocumentDiff } from "../../../../editor/common/diff/documentDiffProvider.js";
import { IEditorContribution, ScrollType } from "../../../../editor/common/editorCommon.js";
import { IModelDeltaDecoration, ITextModel, TrackedRangeStickiness } from "../../../../editor/common/model.js";
import { InlineDecoration, InlineDecorationType } from "../../../../editor/common/viewModel.js";
import { ChatEditingSessionState, IChatEditingService, IChatEditingSession, IModifiedFileEntry, WorkingSetEntryState } from "../common/chatEditingService.js";
import { localize } from "../../../../nls.js";
import { IContextKey, IContextKeyService, RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { autorun, derived } from "../../../../base/common/observable.js";
import { isEqual } from "../../../../base/common/resources.js";
const ctxHasEditorModification = new RawContextKey("chat.hasEditorModifications", void 0, localize("chat.hasEditorModifications", "The current editor contains chat modifications"));
let ChatEditorController = class extends Disposable {
  constructor(_editor, _chatEditingService, contextKeyService) {
    super();
    this._editor = _editor;
    this._chatEditingService = _chatEditingService;
    this._register(this._editor.onDidChangeModel(() => this._update()));
    this._register(this._chatEditingService.onDidChangeEditingSession(() => this._updateSessionDecorations()));
    this._register(toDisposable(() => this._clearRendering()));
    this._ctxHasEditorModification = ctxHasEditorModification.bindTo(contextKeyService);
    this._register(autorun((r) => {
      if (this._editor.getOption(EditorOption.inDiffEditor)) {
        return;
      }
      const session = this._chatEditingService.currentEditingSessionObs.read(r);
      const entry = session?.entries.read(r).find((e) => isEqual(e.modifiedURI, this._editor.getModel()?.uri));
      if (!entry || entry.state.read(r) !== WorkingSetEntryState.Modified) {
        this._clearRendering();
        return;
      }
      const diff = entry?.diffInfo.read(r);
      this._updateWithDiff(entry, diff);
    }));
    const shouldBeReadOnly = derived(this, (r) => {
      const value = this._chatEditingService.currentEditingSessionObs.read(r);
      if (!value || value.state.read(r) !== ChatEditingSessionState.StreamingEdits) {
        return false;
      }
      return value.entries.read(r).some((e) => isEqual(e.modifiedURI, this._editor.getModel()?.uri));
    });
    let actualReadonly;
    let actualDeco;
    this._register(autorun((r) => {
      const value = shouldBeReadOnly.read(r);
      if (value) {
        actualReadonly ??= this._editor.getOption(EditorOption.readOnly);
        actualDeco ??= this._editor.getOption(EditorOption.renderValidationDecorations);
        this._editor.updateOptions({
          readOnly: true,
          renderValidationDecorations: "off"
        });
      } else {
        if (actualReadonly !== void 0 && actualDeco !== void 0) {
          this._editor.updateOptions({
            readOnly: actualReadonly,
            renderValidationDecorations: actualDeco
          });
          actualReadonly = void 0;
          actualDeco = void 0;
        }
      }
    }));
  }
  static {
    __name(this, "ChatEditorController");
  }
  static ID = "editor.contrib.chatEditorController";
  _sessionStore = this._register(new DisposableStore());
  _decorations = this._editor.createDecorationsCollection();
  _viewZones = [];
  _ctxHasEditorModification;
  static get(editor) {
    const controller = editor.getContribution(ChatEditorController.ID);
    return controller;
  }
  dispose() {
    this._clearRendering();
    super.dispose();
  }
  _update() {
    this._sessionStore.clear();
    if (!this._editor.hasModel()) {
      return;
    }
    if (this._editor.getOption(EditorOption.inDiffEditor)) {
      return;
    }
    if (this._editor.getOption(EditorOption.inDiffEditor)) {
      this._clearRendering();
      return;
    }
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
    const diff = entry.diffInfo.get();
    this._updateWithDiff(entry, diff);
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
    this._ctxHasEditorModification.reset();
  }
  _updateWithDiff(entry, diff) {
    if (!diff) {
      this._clearRendering();
      return;
    }
    this._ctxHasEditorModification.set(true);
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
        originalModel.tokenization.forceTokenization(Math.max(1, originalRange.endLineNumberExclusive - 1));
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
          modifiedDecorations.push({
            range: i.modifiedRange,
            options: {
              ...diffAddDecoration,
              stickiness: TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
            }
          });
        }
        if (!diffEntry.modified.isEmpty) {
          modifiedDecorations.push({
            range: diffEntry.modified.toInclusiveRange(),
            options: {
              ...diffWholeLineAddDecoration,
              stickiness: TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
            }
          });
        }
        const domNode = document.createElement("div");
        domNode.className = "chat-editing-original-zone view-lines line-delete monaco-mouse-cursor-text";
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
  revealNext() {
    this._reveal(true);
  }
  revealPrevious() {
    this._reveal(false);
  }
  _reveal(next) {
    const position = this._editor.getPosition();
    if (!position) {
      return;
    }
    const decorations = this._decorations.getRanges().sort((a, b) => Range.compareRangesUsingStarts(a, b));
    for (let i = 0; i < decorations.length; i++) {
      const decoration = decorations[i];
      for (let j = 0; j < decorations.length; j++) {
        if (i !== j && decoration && decorations[j]?.containsRange(decoration)) {
          decorations[i] = void 0;
          break;
        }
      }
    }
    coalesceInPlace(decorations);
    if (decorations.length === 0) {
      return;
    }
    let idx = binarySearch(decorations, Range.fromPositions(position), Range.compareRangesUsingStarts);
    if (idx < 0) {
      idx = ~idx;
    }
    let target;
    if (decorations[idx]?.containsPosition(position)) {
      target = idx + (next ? 1 : -1);
    } else {
      target = next ? idx : idx - 1;
    }
    target = (target + decorations.length) % decorations.length;
    const targetPosition = decorations[target].getStartPosition();
    this._editor.setPosition(targetPosition);
    this._editor.revealPositionInCenter(targetPosition, ScrollType.Smooth);
    this._editor.focus();
  }
};
ChatEditorController = __decorateClass([
  __decorateParam(1, IChatEditingService),
  __decorateParam(2, IContextKeyService)
], ChatEditorController);
export {
  ChatEditorController,
  ctxHasEditorModification
};
//# sourceMappingURL=chatEditorController.js.map
