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
import { h } from "../../../../../../base/browser/dom.js";
import { renderIcon } from "../../../../../../base/browser/ui/iconLabel/iconLabels.js";
import { numberComparator } from "../../../../../../base/common/arrays.js";
import { findFirstMin } from "../../../../../../base/common/arraysFind.js";
import { Codicon } from "../../../../../../base/common/codicons.js";
import { createHotClass } from "../../../../../../base/common/hotReloadHelpers.js";
import { Disposable } from "../../../../../../base/common/lifecycle.js";
import { autorun, constObservable, derived, derivedDisposable, derivedWithCancellationToken, IObservable, observableFromEvent, ObservablePromise } from "../../../../../../base/common/observable.js";
import { getIndentationLength, splitLines } from "../../../../../../base/common/strings.js";
import { MenuWorkbenchToolBar } from "../../../../../../platform/actions/browser/toolbar.js";
import { MenuId, MenuItemAction } from "../../../../../../platform/actions/common/actions.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { ICodeEditor } from "../../../../../browser/editorBrowser.js";
import { observableCodeEditor } from "../../../../../browser/observableCodeEditor.js";
import { EmbeddedCodeEditorWidget } from "../../../../../browser/widget/codeEditor/embeddedCodeEditorWidget.js";
import { IDiffProviderFactoryService } from "../../../../../browser/widget/diffEditor/diffProviderFactoryService.js";
import { diffAddDecoration, diffAddDecorationEmpty, diffDeleteDecorationEmpty, diffWholeLineAddDecoration, diffWholeLineDeleteDecoration } from "../../../../../browser/widget/diffEditor/registrations.contribution.js";
import { appendRemoveOnDispose, applyStyle } from "../../../../../browser/widget/diffEditor/utils.js";
import { EditorOption } from "../../../../../common/config/editorOptions.js";
import { LineRange } from "../../../../../common/core/lineRange.js";
import { OffsetRange } from "../../../../../common/core/offsetRange.js";
import { Position } from "../../../../../common/core/position.js";
import { Range } from "../../../../../common/core/range.js";
import { ArrayText, SingleTextEdit, TextEdit } from "../../../../../common/core/textEdit.js";
import { TextLength } from "../../../../../common/core/textLength.js";
import { lineRangeMappingFromRangeMappings, RangeMapping } from "../../../../../common/diff/rangeMapping.js";
import { IModelDeltaDecoration } from "../../../../../common/model.js";
import { TextModel } from "../../../../../common/model/textModel.js";
import { TextModelText } from "../../../../../common/model/textModelText.js";
import { IModelService } from "../../../../../common/services/model.js";
import { InlineEdit } from "../../model/inlineEdit.js";
import "./inlineEditsView.css";
import { applyEditToModifiedRangeMappings, maxLeftInRange, Point, StatusBarViewItem, UniqueUriGenerator } from "./utils.js";
let InlineEditsViewAndDiffProducer = class extends Disposable {
  constructor(_editor, _edit, _instantiationService, _diffProviderFactoryService, _modelService) {
    super();
    this._editor = _editor;
    this._edit = _edit;
    this._instantiationService = _instantiationService;
    this._diffProviderFactoryService = _diffProviderFactoryService;
    this._modelService = _modelService;
    this._register(new InlineEditsView(this._editor, this._inlineEdit, this._instantiationService));
  }
  static {
    __name(this, "InlineEditsViewAndDiffProducer");
  }
  static hot = createHotClass(InlineEditsViewAndDiffProducer);
  _modelUriGenerator = new UniqueUriGenerator("inline-edits");
  _originalModel = derivedDisposable(() => this._modelService.createModel(
    "",
    null,
    this._modelUriGenerator.getUniqueUri()
  )).keepObserved(this._store);
  _modifiedModel = derivedDisposable(() => this._modelService.createModel(
    "",
    null,
    this._modelUriGenerator.getUniqueUri()
  )).keepObserved(this._store);
  _inlineEditPromise = derivedWithCancellationToken(this, (reader, token) => {
    const edit = this._edit.read(reader);
    if (!edit) {
      return void 0;
    }
    const range = edit.range;
    if (edit.text.trim() === "") {
      return void 0;
    }
    this._originalModel.get().setValue(this._editor.getModel().getValueInRange(range));
    this._modifiedModel.get().setValue(edit.text);
    const d = this._diffProviderFactoryService.createDiffProvider({ diffAlgorithm: "advanced" });
    return ObservablePromise.fromFn(async () => {
      const result = await d.computeDiff(this._originalModel.get(), this._modifiedModel.get(), {
        computeMoves: false,
        ignoreTrimWhitespace: false,
        maxComputationTimeMs: 1e3
      }, token);
      if (result.identical) {
        return void 0;
      }
      const rangeStartPos = Range.lift(edit.range).getStartPosition();
      const innerChanges = result.changes.flatMap((c) => c.innerChanges);
      function addRangeToPos(pos, range2) {
        const start = TextLength.fromPosition(range2.getStartPosition());
        return TextLength.ofRange(range2).createRange(start.addToPosition(pos));
      }
      __name(addRangeToPos, "addRangeToPos");
      const edits = innerChanges.map((c) => new SingleTextEdit(addRangeToPos(rangeStartPos, c.originalRange), this._modifiedModel.get().getValueInRange(c.modifiedRange)));
      return new InlineEditWithChanges(new TextEdit(edits));
    });
  });
  _inlineEdit = this._inlineEditPromise.map((p, reader) => p?.promiseResult?.read(reader)?.data);
};
InlineEditsViewAndDiffProducer = __decorateClass([
  __decorateParam(2, IInstantiationService),
  __decorateParam(3, IDiffProviderFactoryService),
  __decorateParam(4, IModelService)
], InlineEditsViewAndDiffProducer);
class InlineEditWithChanges {
  constructor(diffedTextEdit) {
    this.diffedTextEdit = diffedTextEdit;
  }
  static {
    __name(this, "InlineEditWithChanges");
  }
  originalLineRange = LineRange.fromRangeInclusive(RangeMapping.fromEditJoin(this.diffedTextEdit).originalRange);
  modifiedLineRange = LineRange.fromRangeInclusive(RangeMapping.fromEditJoin(this.diffedTextEdit).modifiedRange);
}
let InlineEditsView = class extends Disposable {
  constructor(_editor, _edit, _instantiationService) {
    super();
    this._editor = _editor;
    this._edit = _edit;
    this._instantiationService = _instantiationService;
    const visible = derived(this, (reader) => this._edit.read(reader) !== void 0);
    this._register(applyStyle(this._elements.root, {
      display: derived(this, (reader) => visible.read(reader) ? "block" : "none")
    }));
    this._register(appendRemoveOnDispose(this._editor.getDomNode(), this._elements.root));
    this._register(observableCodeEditor(_editor).createOverlayWidget({
      domNode: this._elements.root,
      position: constObservable(null),
      allowEditorOverflow: false,
      minContentWidthInPx: derived((reader) => {
        const x = this._layout1.read(reader)?.left;
        if (x === void 0) {
          return 0;
        }
        const width = this._previewEditorWidth.read(reader);
        return x + width;
      })
    }));
    this._register(observableCodeEditor(_editor).createOverlayWidget({
      domNode: this._indicator.root,
      position: constObservable(null),
      allowEditorOverflow: false,
      minContentWidthInPx: constObservable(0)
    }));
    this._previewEditor.setModel(this._previewTextModel);
    this._register(this._previewEditorObs.setDecorations(this._decorations.map((d) => d?.modifiedDecorations ?? [])));
    this._register(observableCodeEditor(_editor).setDecorations(this._decorations.map((d) => d?.originalDecorations ?? [])));
    this._register(autorun((reader) => {
      const layoutInfo = this._layout.read(reader);
      if (!layoutInfo) {
        this._indicator.root.style.visibility = "hidden";
        return;
      }
      this._indicator.root.style.visibility = "";
      const { topEdit, editHeight } = layoutInfo;
      this._elements.editorContainer.style.top = `${topEdit.y}px`;
      this._elements.editorContainer.style.left = `${topEdit.x}px`;
      const width = this._previewEditorWidth.read(reader);
      this._previewEditor.layout({ height: editHeight, width });
      const i = this._editorObs.layoutInfo.read(reader);
      const range = new OffsetRange(0, i.height - 30);
      this._indicator.root.classList.toggle("top", topEdit.y < range.start);
      this._indicator.root.classList.toggle("bottom", topEdit.y > range.endExclusive);
      this._indicator.root.classList.toggle("contained", range.contains(topEdit.y));
      this._indicator.root.style.top = `${range.clip(topEdit.y)}px`;
      this._indicator.root.style.right = `${i.minimap.minimapWidth + i.verticalScrollbarWidth}px`;
    }));
    const toolbarDropdownVisible = observableFromEvent(this, this._toolbar.onDidChangeDropdownVisibility, (e) => e ?? false);
    this._register(autorun((reader) => {
      this._elements.root.classList.toggle("toolbarDropdownVisible", toolbarDropdownVisible.read(reader));
    }));
  }
  static {
    __name(this, "InlineEditsView");
  }
  _editorObs = observableCodeEditor(this._editor);
  _elements = h("div.inline-edits-view", {
    style: {
      position: "absolute",
      overflow: "visible",
      top: "0px",
      left: "0px"
    }
  }, [
    h("div.editorContainer@editorContainer", { style: { position: "absolute" } }, [
      h("div.preview@editor", { style: {} }),
      h("div.toolbar@toolbar", { style: {} })
    ])
  ]);
  _indicator = h("div.inline-edits-view-indicator", {
    style: {
      position: "absolute",
      overflow: "visible"
    }
  }, [
    h("div.icon", {}, [
      renderIcon(Codicon.arrowLeft)
    ]),
    h("div.label", {}, [
      " inline edit"
    ])
  ]);
  _previewEditorWidth = derived(this, (reader) => {
    const edit = this._edit.read(reader);
    if (!edit) {
      return 0;
    }
    return maxLeftInRange(this._previewEditorObs, edit.modifiedLineRange, reader);
  });
  _uiState = derived(this, (reader) => {
    const edit = this._edit.read(reader);
    if (!edit) {
      return void 0;
    }
    let newText = edit.diffedTextEdit.apply(new TextModelText(this._editor.getModel()));
    let mappings = RangeMapping.fromEdit(edit.diffedTextEdit);
    const newLines = splitLines(newText);
    function offsetRangeToRange(offsetRange, startPos) {
      return new Range(
        startPos.lineNumber,
        startPos.column + offsetRange.start,
        startPos.lineNumber,
        startPos.column + offsetRange.endExclusive
      );
    }
    __name(offsetRangeToRange, "offsetRangeToRange");
    const edits = [];
    const minIndent = findFirstMin(edit.modifiedLineRange.mapToLineArray((l) => getIndentationLength(newLines[l - 1])), numberComparator);
    edit.modifiedLineRange.forEach((lineNumber) => {
      edits.push(new SingleTextEdit(offsetRangeToRange(new OffsetRange(0, minIndent), new Position(lineNumber, 1)), ""));
    });
    const indentationAdjustmentEdit = new TextEdit(edits);
    newText = indentationAdjustmentEdit.applyToString(newText);
    mappings = applyEditToModifiedRangeMappings(mappings, indentationAdjustmentEdit);
    const diff = lineRangeMappingFromRangeMappings(mappings, new TextModelText(this._editor.getModel()), new ArrayText(newLines));
    return {
      diff,
      edit,
      newText,
      newTextLineCount: edit.modifiedLineRange.length
    };
  });
  _toolbar = this._register(this._instantiationService.createInstance(MenuWorkbenchToolBar, this._elements.toolbar, MenuId.InlineEditsActions, {
    menuOptions: { renderShortTitle: true },
    toolbarOptions: {
      primaryGroup: /* @__PURE__ */ __name((g) => g.startsWith("primary"), "primaryGroup")
    },
    actionViewItemProvider: /* @__PURE__ */ __name((action, options) => {
      if (action instanceof MenuItemAction) {
        return this._instantiationService.createInstance(StatusBarViewItem, action, void 0);
      }
      return void 0;
    }, "actionViewItemProvider")
  }));
  _previewTextModel = this._register(this._instantiationService.createInstance(
    TextModel,
    "",
    this._editor.getModel().getLanguageId(),
    { ...TextModel.DEFAULT_CREATION_OPTIONS, bracketPairColorizationOptions: { enabled: true, independentColorPoolPerBracketType: false } },
    null
  ));
  _previewEditor = this._register(this._instantiationService.createInstance(
    EmbeddedCodeEditorWidget,
    this._elements.editor,
    {
      glyphMargin: false,
      lineNumbers: "off",
      minimap: { enabled: false },
      guides: {
        indentation: false,
        bracketPairs: false,
        bracketPairsHorizontal: false,
        highlightActiveIndentation: false
      },
      folding: false,
      selectOnLineNumbers: false,
      selectionHighlight: false,
      columnSelection: false,
      overviewRulerBorder: false,
      overviewRulerLanes: 0,
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      bracketPairColorization: { enabled: true, independentColorPoolPerBracketType: false },
      scrollBeyondLastLine: false,
      scrollbar: {
        vertical: "hidden",
        horizontal: "hidden"
      },
      readOnly: true,
      wordWrap: "off"
    },
    { contributions: [] },
    this._editor
  ));
  _previewEditorObs = observableCodeEditor(this._previewEditor);
  _ensureModelTextIsSet = derived((reader) => {
    const uiState = this._uiState.read(reader);
    if (!uiState) {
      return;
    }
    this._previewTextModel.setValue(uiState.newText);
    const range = uiState.edit.originalLineRange;
    this._previewEditor.setHiddenAreas([
      new Range(1, 1, range.startLineNumber - 1, 1),
      new Range(range.startLineNumber + uiState.newTextLineCount, 1, this._previewTextModel.getLineCount() + 1, 1)
    ], void 0, true);
  }).recomputeInitiallyAndOnChange(this._store);
  _decorations = derived(this, (reader) => {
    this._ensureModelTextIsSet.read(reader);
    const s = this._uiState.read(reader);
    if (!s) {
      return void 0;
    }
    const diff = s.diff;
    const originalDecorations = [];
    const modifiedDecorations = [];
    for (const m of diff) {
      if (m.modified.isEmpty || m.original.isEmpty) {
        if (!m.original.isEmpty) {
          originalDecorations.push({ range: m.original.toInclusiveRange(), options: diffWholeLineDeleteDecoration });
        }
        if (!m.modified.isEmpty) {
          modifiedDecorations.push({ range: m.modified.toInclusiveRange(), options: diffWholeLineAddDecoration });
        }
      } else {
        for (const i of m.innerChanges || []) {
          if (m.original.contains(i.originalRange.startLineNumber)) {
            originalDecorations.push({
              range: i.originalRange,
              options: i.originalRange.isEmpty() ? diffDeleteDecorationEmpty : {
                className: "char-delete",
                description: "char-delete",
                shouldFillLineOnLineBreak: false
              }
            });
          }
          if (m.modified.contains(i.modifiedRange.startLineNumber)) {
            modifiedDecorations.push({ range: i.modifiedRange, options: i.modifiedRange.isEmpty() ? diffAddDecorationEmpty : diffAddDecoration });
          }
        }
      }
    }
    return { originalDecorations, modifiedDecorations };
  });
  _layout1 = derived(this, (reader) => {
    const inlineEdit = this._edit.read(reader);
    if (!inlineEdit) {
      return null;
    }
    const maxLeft = maxLeftInRange(this._editorObs, inlineEdit.originalLineRange, reader);
    const contentLeft = this._editorObs.layoutInfoContentLeft.read(reader);
    return { left: contentLeft + maxLeft };
  });
  _layout = derived(this, (reader) => {
    const inlineEdit = this._edit.read(reader);
    if (!inlineEdit) {
      return null;
    }
    const range = inlineEdit.originalLineRange;
    const scrollLeft = this._editorObs.scrollLeft.read(reader);
    const left = this._layout1.read(reader).left + 20 - scrollLeft;
    const selectionTop = this._editor.getTopForLineNumber(range.startLineNumber) - this._editorObs.scrollTop.read(reader);
    const selectionBottom = this._editor.getTopForLineNumber(range.endLineNumberExclusive) - this._editorObs.scrollTop.read(reader);
    const topCode = new Point(left, selectionTop);
    const bottomCode = new Point(left, selectionBottom);
    const codeHeight = selectionBottom - selectionTop;
    const codeEditDist = 50;
    const editHeight = this._editor.getOption(EditorOption.lineHeight) * inlineEdit.modifiedLineRange.length;
    const topEdit = new Point(left + codeEditDist, selectionTop);
    const bottomEdit = new Point(left + codeEditDist, selectionBottom);
    return {
      topCode,
      bottomCode,
      codeHeight,
      topEdit,
      bottomEdit,
      editHeight
    };
  });
};
InlineEditsView = __decorateClass([
  __decorateParam(2, IInstantiationService)
], InlineEditsView);
export {
  InlineEditWithChanges,
  InlineEditsView,
  InlineEditsViewAndDiffProducer
};
//# sourceMappingURL=inlineEditsView.js.map
