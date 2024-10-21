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
import { h, svgElem } from "../../../../../../base/browser/dom.js";
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
import { appendRemoveOnDispose } from "../../../../../browser/widget/diffEditor/utils.js";
import { EditorOption } from "../../../../../common/config/editorOptions.js";
import { SingleLineEdit } from "../../../../../common/core/lineEdit.js";
import { LineRange } from "../../../../../common/core/lineRange.js";
import { OffsetRange } from "../../../../../common/core/offsetRange.js";
import { Position } from "../../../../../common/core/position.js";
import { Range } from "../../../../../common/core/range.js";
import { AbstractText, SingleTextEdit, StringText, TextEdit } from "../../../../../common/core/textEdit.js";
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
    const inlineEdit = this._edit.read(reader);
    if (!inlineEdit) {
      return void 0;
    }
    const text = new TextModelText(this._editor.getModel());
    const edit = inlineEdit.edit.extendToFullLine(text);
    this._originalModel.get().setValue(this._editor.getModel().getValueInRange(edit.range));
    this._modifiedModel.get().setValue(edit.text);
    const diffAlgo = this._diffProviderFactoryService.createDiffProvider({ diffAlgorithm: "advanced" });
    return ObservablePromise.fromFn(async () => {
      const result = await diffAlgo.computeDiff(this._originalModel.get(), this._modifiedModel.get(), {
        computeMoves: false,
        ignoreTrimWhitespace: false,
        maxComputationTimeMs: 1e3
      }, token);
      if (result.identical) {
        return void 0;
      }
      const rangeStartPos = edit.range.getStartPosition();
      const innerChanges = result.changes.flatMap((c) => c.innerChanges);
      function addRangeToPos(pos, range) {
        const start = TextLength.fromPosition(range.getStartPosition());
        return TextLength.ofRange(range).createRange(start.addToPosition(pos));
      }
      __name(addRangeToPos, "addRangeToPos");
      const edits = innerChanges.map((c) => new SingleTextEdit(
        addRangeToPos(rangeStartPos, c.originalRange),
        this._modifiedModel.get().getValueInRange(c.modifiedRange)
      ));
      const diffEdits = new TextEdit(edits);
      return new InlineEditWithChanges(text, diffEdits, inlineEdit.isCollapsed);
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
  constructor(originalText, edit, isCollapsed) {
    this.originalText = originalText;
    this.edit = edit;
    this.isCollapsed = isCollapsed;
  }
  static {
    __name(this, "InlineEditWithChanges");
  }
  lineEdit = SingleLineEdit.fromSingleTextEdit(this.edit.toSingle(this.originalText), this.originalText);
  originalLineRange = this.lineEdit.lineRange;
  modifiedLineRange = this.lineEdit.toLineEdit().getNewLineRanges()[0];
}
let InlineEditsView = class extends Disposable {
  constructor(_editor, _edit, _instantiationService) {
    super();
    this._editor = _editor;
    this._edit = _edit;
    this._instantiationService = _instantiationService;
    this._register(appendRemoveOnDispose(this._editor.getDomNode(), this._elements.root));
    this._register(observableCodeEditor(_editor).createOverlayWidget({
      domNode: this._elements.root,
      position: constObservable(null),
      allowEditorOverflow: false,
      minContentWidthInPx: derived((reader) => {
        const x = this._previewEditorLeft.read(reader)?.left;
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
      const layoutInfo = this._previewEditorLayoutInfo.read(reader);
      if (!layoutInfo) {
        this._indicator.root.style.visibility = "hidden";
        return;
      }
      this._indicator.root.style.visibility = "";
      const i = this._editorObs.layoutInfo.read(reader);
      const range = new OffsetRange(0, i.height - 30);
      const topEdit = layoutInfo.edit1;
      this._indicator.root.classList.toggle("top", topEdit.y < range.start);
      this._indicator.root.classList.toggle("bottom", topEdit.y > range.endExclusive);
      const showAnyway = !this._diffViewInformation.read(reader);
      this._indicator.root.classList.toggle("visible", showAnyway);
      this._indicator.root.classList.toggle("contained", range.contains(topEdit.y));
      this._indicator.root.style.top = `${range.clip(topEdit.y)}px`;
      this._indicator.root.style.right = `${i.minimap.minimapWidth + i.verticalScrollbarWidth}px`;
    }));
    this._register(autorun((reader) => {
      const layoutInfo = this._previewEditorLayoutInfo.read(reader);
      if (!layoutInfo) {
        this._elements.path.style.visibility = "hidden";
        return;
      }
      this._elements.path.style.visibility = "";
      const topEdit = layoutInfo.edit1;
      const editHeight = layoutInfo.editHeight;
      const width = this._previewEditorWidth.read(reader) + 10;
      const pathBuilder = new PathBuilder();
      pathBuilder.moveTo(layoutInfo.code1.deltaX(-5));
      pathBuilder.lineTo(layoutInfo.code1);
      pathBuilder.lineTo(layoutInfo.edit1);
      pathBuilder.lineTo(layoutInfo.edit1.deltaX(width));
      pathBuilder.lineTo(layoutInfo.edit2.deltaX(width));
      pathBuilder.lineTo(layoutInfo.edit2);
      pathBuilder.curveTo2(layoutInfo.edit2.deltaX(-20), layoutInfo.code2.deltaX(20), layoutInfo.code2.deltaX(0));
      pathBuilder.lineTo(layoutInfo.code2.deltaX(-5));
      this._elements.path.setAttribute("d", pathBuilder.build());
      this._elements.path.style.fill = "none";
      this._elements.path.style.stroke = "var(--vscode-activityBarBadge-background)";
      this._elements.path.style.strokeWidth = "1px";
      this._elements.editorContainer.style.top = `${topEdit.y}px`;
      this._elements.editorContainer.style.left = `${topEdit.x}px`;
      this._previewEditor.layout({ height: editHeight, width });
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
    ]),
    svgElem("svg", { style: { overflow: "visible", pointerEvents: "none", position: "absolute" } }, [
      svgElem("path@path", {
        d: ""
      })
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
  _diffViewInformation = derived(this, (reader) => {
    const edit = this._edit.read(reader);
    if (!edit || edit.isCollapsed) {
      return void 0;
    }
    return true;
  });
  _uiState = derived(this, (reader) => {
    const edit = this._edit.read(reader);
    if (!edit) {
      return void 0;
    }
    let newText = edit.edit.apply(edit.originalText);
    const indentationAdjustmentEdit = createReindentEdit(newText, edit.modifiedLineRange);
    newText = indentationAdjustmentEdit.applyToString(newText);
    let mappings = RangeMapping.fromEdit(edit.edit);
    mappings = applyEditToModifiedRangeMappings(mappings, indentationAdjustmentEdit);
    const diff = lineRangeMappingFromRangeMappings(mappings, edit.originalText, new StringText(newText));
    const originalDisplayRange = edit.originalText.lineRange.intersect(
      LineRange.ofLength(edit.originalLineRange.startLineNumber - 1, edit.lineEdit.newLines.length + 2)
    );
    return {
      diff,
      edit,
      newText,
      newTextLineCount: edit.modifiedLineRange.length,
      originalDisplayRange
    };
  });
  _decorations = derived(this, (reader) => {
    this._updatePreviewEditor.read(reader);
    const s = this._uiState.read(reader);
    if (!s) {
      return void 0;
    }
    const diff = s.diff;
    const originalDecorations = [];
    const modifiedDecorations = [];
    if (s.edit.originalLineRange.length === 0) {
      return void 0;
    }
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
  _rootVisibility = derived(this, (reader) => !!this._diffViewInformation.read(reader) ? "block" : "none");
  _updateRootVisibility = derived((reader) => {
    this._elements.root.style.display = this._rootVisibility.read(reader);
  });
  _updatePreviewEditor = derived((reader) => {
    this._updateRootVisibility.read(reader);
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
  _previewEditorWidth = derived(this, (reader) => {
    const edit = this._edit.read(reader);
    if (!edit) {
      return 0;
    }
    this._updatePreviewEditor.read(reader);
    return maxLeftInRange(this._previewEditorObs, edit.modifiedLineRange, reader);
  });
  _previewEditorLeft = derived(this, (reader) => {
    const state = this._uiState.read(reader);
    if (!state) {
      return null;
    }
    const maxLeft = maxLeftInRange(this._editorObs, state.originalDisplayRange, reader);
    const contentLeft = this._editorObs.layoutInfoContentLeft.read(reader);
    return { left: contentLeft + maxLeft };
  });
  _previewEditorLayoutInfo = derived(this, (reader) => {
    const inlineEdit = this._edit.read(reader);
    if (!inlineEdit) {
      return null;
    }
    const range = inlineEdit.originalLineRange;
    const scrollLeft = this._editorObs.scrollLeft.read(reader);
    const left = this._previewEditorLeft.read(reader).left + 20 - scrollLeft;
    const selectionTop = this._editor.getTopForLineNumber(range.startLineNumber) - this._editorObs.scrollTop.read(reader);
    const selectionBottom = this._editor.getTopForLineNumber(range.endLineNumberExclusive) - this._editorObs.scrollTop.read(reader);
    const codeLeft = this._editorObs.layoutInfoContentLeft.read(reader);
    const code1 = new Point(left, selectionTop);
    const codeStart1 = new Point(codeLeft, selectionTop);
    const code2 = new Point(left, selectionBottom);
    const codeStart2 = new Point(0, selectionBottom);
    const codeHeight = selectionBottom - selectionTop;
    const codeEditDist = 60;
    const editHeight = this._editor.getOption(EditorOption.lineHeight) * inlineEdit.modifiedLineRange.length;
    const edit1 = new Point(left + codeEditDist, selectionTop);
    const edit2 = new Point(left + codeEditDist, selectionTop + editHeight);
    return {
      code1,
      codeStart1,
      code2,
      codeStart2,
      codeHeight,
      edit1,
      edit2,
      editHeight
    };
  });
};
InlineEditsView = __decorateClass([
  __decorateParam(2, IInstantiationService)
], InlineEditsView);
function offsetRangeToRange(columnOffsetRange, startPos) {
  return new Range(
    startPos.lineNumber,
    startPos.column + columnOffsetRange.start,
    startPos.lineNumber,
    startPos.column + columnOffsetRange.endExclusive
  );
}
__name(offsetRangeToRange, "offsetRangeToRange");
function createReindentEdit(text, range) {
  const newLines = splitLines(text);
  const edits = [];
  const minIndent = findFirstMin(range.mapToLineArray((l) => getIndentationLength(newLines[l - 1])), numberComparator);
  range.forEach((lineNumber) => {
    edits.push(new SingleTextEdit(offsetRangeToRange(new OffsetRange(0, minIndent), new Position(lineNumber, 1)), ""));
  });
  return new TextEdit(edits);
}
__name(createReindentEdit, "createReindentEdit");
class PathBuilder {
  static {
    __name(this, "PathBuilder");
  }
  _data = "";
  moveTo(point) {
    this._data += `M ${point.x} ${point.y} `;
    return this;
  }
  lineTo(point) {
    this._data += `L ${point.x} ${point.y} `;
    return this;
  }
  curveTo(cp, to) {
    this._data += `Q ${cp.x} ${cp.y} ${to.x} ${to.y} `;
    return this;
  }
  curveTo2(cp1, cp2, to) {
    this._data += `C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${to.x} ${to.y} `;
    return this;
  }
  build() {
    return this._data;
  }
}
export {
  InlineEditWithChanges,
  InlineEditsView,
  InlineEditsViewAndDiffProducer
};
//# sourceMappingURL=inlineEditsView.js.map
