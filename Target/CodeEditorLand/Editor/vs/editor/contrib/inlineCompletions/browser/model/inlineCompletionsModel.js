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
import { mapFindFirst } from "../../../../../base/common/arraysFind.js";
import { itemsEquals } from "../../../../../base/common/equals.js";
import { BugIndicatingError, onUnexpectedError, onUnexpectedExternalError } from "../../../../../base/common/errors.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { IObservable, IReader, ITransaction, autorun, derived, derivedHandleChanges, derivedOpts, observableSignal, observableValue, recomputeInitiallyAndOnChange, subtransaction, transaction } from "../../../../../base/common/observable.js";
import { commonPrefixLength } from "../../../../../base/common/strings.js";
import { isDefined } from "../../../../../base/common/types.js";
import { ICommandService } from "../../../../../platform/commands/common/commands.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ICodeEditor } from "../../../../browser/editorBrowser.js";
import { EditOperation } from "../../../../common/core/editOperation.js";
import { LineRange } from "../../../../common/core/lineRange.js";
import { Position } from "../../../../common/core/position.js";
import { Range } from "../../../../common/core/range.js";
import { Selection } from "../../../../common/core/selection.js";
import { SingleTextEdit } from "../../../../common/core/textEdit.js";
import { TextLength } from "../../../../common/core/textLength.js";
import { ScrollType } from "../../../../common/editorCommon.js";
import { Command, InlineCompletion, InlineCompletionContext, InlineCompletionTriggerKind, PartialAcceptTriggerKind } from "../../../../common/languages.js";
import { ILanguageConfigurationService } from "../../../../common/languages/languageConfigurationRegistry.js";
import { EndOfLinePreference, ITextModel } from "../../../../common/model.js";
import { TextModelText } from "../../../../common/model/textModelText.js";
import { IFeatureDebounceInformation } from "../../../../common/services/languageFeatureDebounce.js";
import { IModelContentChangedEvent } from "../../../../common/textModelEvents.js";
import { SnippetController2 } from "../../../snippet/browser/snippetController2.js";
import { addPositions, getEndPositionsAfterApplying, substringPos, subtractPositions } from "../utils.js";
import { computeGhostText } from "./computeGhostText.js";
import { GhostText, GhostTextOrReplacement, ghostTextOrReplacementEquals, ghostTextsOrReplacementsEqual } from "./ghostText.js";
import { InlineCompletionWithUpdatedRange, InlineCompletionsSource } from "./inlineCompletionsSource.js";
import { InlineEdit } from "./inlineEdit.js";
import { InlineCompletionItem } from "./provideInlineCompletions.js";
import { singleTextEditAugments, singleTextRemoveCommonPrefix } from "./singleTextEditHelpers.js";
import { SuggestItemInfo } from "./suggestWidgetAdaptor.js";
let InlineCompletionsModel = class extends Disposable {
  constructor(textModel, selectedSuggestItem, _textModelVersionId, _positions, _debounceValue, _suggestPreviewEnabled, _suggestPreviewMode, _inlineSuggestMode, _enabled, _shouldHideInlineEdit, _instantiationService, _commandService, _languageConfigurationService) {
    super();
    this.textModel = textModel;
    this.selectedSuggestItem = selectedSuggestItem;
    this._textModelVersionId = _textModelVersionId;
    this._positions = _positions;
    this._debounceValue = _debounceValue;
    this._suggestPreviewEnabled = _suggestPreviewEnabled;
    this._suggestPreviewMode = _suggestPreviewMode;
    this._inlineSuggestMode = _inlineSuggestMode;
    this._enabled = _enabled;
    this._shouldHideInlineEdit = _shouldHideInlineEdit;
    this._instantiationService = _instantiationService;
    this._commandService = _commandService;
    this._languageConfigurationService = _languageConfigurationService;
    this._register(recomputeInitiallyAndOnChange(this._fetchInlineCompletionsPromise));
    let lastItem = void 0;
    this._register(autorun((reader) => {
      const item = this.inlineCompletionState.read(reader);
      const completion = item?.inlineCompletion;
      if (completion?.semanticId !== lastItem?.semanticId) {
        lastItem = completion;
        if (completion) {
          const i = completion.inlineCompletion;
          const src = i.source;
          src.provider.handleItemDidShow?.(src.inlineCompletions, i.sourceInlineCompletion, i.insertText);
        }
      }
    }));
  }
  static {
    __name(this, "InlineCompletionsModel");
  }
  _source = this._register(this._instantiationService.createInstance(InlineCompletionsSource, this.textModel, this._textModelVersionId, this._debounceValue));
  _isActive = observableValue(this, false);
  _forceUpdateExplicitlySignal = observableSignal(this);
  // We use a semantic id to keep the same inline completion selected even if the provider reorders the completions.
  _selectedInlineCompletionId = observableValue(this, void 0);
  _primaryPosition = derived(this, (reader) => this._positions.read(reader)[0] ?? new Position(1, 1));
  _isAcceptingPartially = false;
  get isAcceptingPartially() {
    return this._isAcceptingPartially;
  }
  _preserveCurrentCompletionReasons = /* @__PURE__ */ new Set([
    1 /* Redo */,
    0 /* Undo */,
    2 /* AcceptWord */
  ]);
  _getReason(e) {
    if (e?.isUndoing) {
      return 0 /* Undo */;
    }
    if (e?.isRedoing) {
      return 1 /* Redo */;
    }
    if (this.isAcceptingPartially) {
      return 2 /* AcceptWord */;
    }
    return 3 /* Other */;
  }
  dontRefetchSignal = observableSignal(this);
  _fetchInlineCompletionsPromise = derivedHandleChanges({
    owner: this,
    createEmptyChangeSummary: /* @__PURE__ */ __name(() => ({
      dontRefetch: false,
      preserveCurrentCompletion: false,
      inlineCompletionTriggerKind: InlineCompletionTriggerKind.Automatic
    }), "createEmptyChangeSummary"),
    handleChange: /* @__PURE__ */ __name((ctx, changeSummary) => {
      if (ctx.didChange(this._textModelVersionId) && this._preserveCurrentCompletionReasons.has(this._getReason(ctx.change))) {
        changeSummary.preserveCurrentCompletion = true;
      } else if (ctx.didChange(this._forceUpdateExplicitlySignal)) {
        changeSummary.inlineCompletionTriggerKind = InlineCompletionTriggerKind.Explicit;
      } else if (ctx.didChange(this.dontRefetchSignal)) {
        changeSummary.dontRefetch = true;
      }
      return true;
    }, "handleChange")
  }, (reader, changeSummary) => {
    this.dontRefetchSignal.read(reader);
    this._forceUpdateExplicitlySignal.read(reader);
    const shouldUpdate = this._enabled.read(reader) && this.selectedSuggestItem.read(reader) || this._isActive.read(reader);
    if (!shouldUpdate) {
      this._source.cancelUpdate();
      return void 0;
    }
    this._textModelVersionId.read(reader);
    const suggestWidgetInlineCompletions = this._source.suggestWidgetInlineCompletions.get();
    const suggestItem = this.selectedSuggestItem.read(reader);
    if (suggestWidgetInlineCompletions && !suggestItem) {
      const inlineCompletions = this._source.inlineCompletions.get();
      transaction((tx) => {
        if (!inlineCompletions || suggestWidgetInlineCompletions.request.versionId > inlineCompletions.request.versionId) {
          this._source.inlineCompletions.set(suggestWidgetInlineCompletions.clone(), tx);
        }
        this._source.clearSuggestWidgetInlineCompletions(tx);
      });
    }
    const cursorPosition = this._primaryPosition.get();
    if (changeSummary.dontRefetch) {
      return Promise.resolve(true);
    }
    const context = {
      triggerKind: changeSummary.inlineCompletionTriggerKind,
      selectedSuggestionInfo: suggestItem?.toSelectedSuggestionInfo()
    };
    const itemToPreserveCandidate = this.selectedInlineCompletion.get();
    const itemToPreserve = changeSummary.preserveCurrentCompletion || itemToPreserveCandidate?.forwardStable ? itemToPreserveCandidate : void 0;
    return this._source.fetch(cursorPosition, context, itemToPreserve);
  });
  async trigger(tx) {
    this._isActive.set(true, tx);
    await this._fetchInlineCompletionsPromise.get();
  }
  async triggerExplicitly(tx) {
    subtransaction(tx, (tx2) => {
      this._isActive.set(true, tx2);
      this._forceUpdateExplicitlySignal.trigger(tx2);
    });
    await this._fetchInlineCompletionsPromise.get();
  }
  stop(tx) {
    subtransaction(tx, (tx2) => {
      this._isActive.set(false, tx2);
      this._source.clear(tx2);
    });
  }
  _collapsedInlineEditId = observableValue(this, void 0);
  collapseInlineEdit() {
    const currentInlineEdit = this.inlineEditState.get()?.inlineCompletion;
    if (!currentInlineEdit) {
      return;
    }
    this._collapsedInlineEditId.set(currentInlineEdit.semanticId, void 0);
  }
  _inlineCompletionItems = derivedOpts({ owner: this }, (reader) => {
    const c = this._source.inlineCompletions.read(reader);
    if (!c) {
      return void 0;
    }
    const cursorPosition = this._primaryPosition.read(reader);
    let inlineEditCompletion = void 0;
    const filteredCompletions = [];
    for (const completion of c.inlineCompletions) {
      if (!completion.inlineCompletion.sourceInlineCompletion.isInlineEdit) {
        if (completion.isVisible(this.textModel, cursorPosition, reader)) {
          filteredCompletions.push(completion);
        }
      } else if (filteredCompletions.length === 0 && completion.inlineCompletion.sourceInlineCompletion.isInlineEdit) {
        inlineEditCompletion = completion;
      }
    }
    return {
      items: filteredCompletions,
      inlineEditCompletion
    };
  });
  _filteredInlineCompletionItems = derivedOpts({ owner: this, equalsFn: itemsEquals() }, (reader) => {
    const c = this._inlineCompletionItems.read(reader);
    return c?.items ?? [];
  });
  selectedInlineCompletionIndex = derived(this, (reader) => {
    const selectedInlineCompletionId = this._selectedInlineCompletionId.read(reader);
    const filteredCompletions = this._filteredInlineCompletionItems.read(reader);
    const idx = this._selectedInlineCompletionId === void 0 ? -1 : filteredCompletions.findIndex((v) => v.semanticId === selectedInlineCompletionId);
    if (idx === -1) {
      this._selectedInlineCompletionId.set(void 0, void 0);
      return 0;
    }
    return idx;
  });
  selectedInlineCompletion = derived(this, (reader) => {
    const filteredCompletions = this._filteredInlineCompletionItems.read(reader);
    const idx = this.selectedInlineCompletionIndex.read(reader);
    return filteredCompletions[idx];
  });
  activeCommands = derivedOpts(
    { owner: this, equalsFn: itemsEquals() },
    (r) => this.selectedInlineCompletion.read(r)?.inlineCompletion.source.inlineCompletions.commands ?? []
  );
  lastTriggerKind = this._source.inlineCompletions.map(this, (v) => v?.request.context.triggerKind);
  inlineCompletionsCount = derived(this, (reader) => {
    if (this.lastTriggerKind.read(reader) === InlineCompletionTriggerKind.Explicit) {
      return this._filteredInlineCompletionItems.read(reader).length;
    } else {
      return void 0;
    }
  });
  state = derivedOpts({
    owner: this,
    equalsFn: /* @__PURE__ */ __name((a, b) => {
      if (!a || !b) {
        return a === b;
      }
      if (a.kind === "ghostText" && b.kind === "ghostText") {
        return ghostTextsOrReplacementsEqual(a.ghostTexts, b.ghostTexts) && a.inlineCompletion === b.inlineCompletion && a.suggestItem === b.suggestItem;
      } else if (a.kind === "inlineEdit" && b.kind === "inlineEdit") {
        return a.inlineEdit.equals(b.inlineEdit) && a.cursorAtInlineEdit === b.cursorAtInlineEdit;
      }
      return false;
    }, "equalsFn")
  }, (reader) => {
    const model = this.textModel;
    const item = this._inlineCompletionItems.read(reader);
    if (item?.inlineEditCompletion) {
      let edit = item.inlineEditCompletion.toSingleTextEdit(reader);
      edit = singleTextRemoveCommonPrefix(edit, model);
      if (edit.isEffectiveDeletion(new TextModelText(model))) {
        return void 0;
      }
      const cursorPos = this._primaryPosition.read(reader);
      const cursorAtInlineEdit = LineRange.fromRangeInclusive(edit.range).contains(cursorPos.lineNumber);
      if (item.inlineEditCompletion.request.context.triggerKind === InlineCompletionTriggerKind.Automatic && this._shouldHideInlineEdit.read(reader) && !cursorAtInlineEdit) {
        return void 0;
      }
      const cursorDist = LineRange.fromRange(edit.range).distanceToLine(this._primaryPosition.read(reader).lineNumber);
      const currentItemIsCollapsed = cursorDist > 1 && this._collapsedInlineEditId.read(reader) === item.inlineEditCompletion.semanticId;
      return { kind: "inlineEdit", inlineEdit: new InlineEdit(edit, currentItemIsCollapsed), inlineCompletion: item.inlineEditCompletion, edits: [edit], cursorAtInlineEdit };
    }
    const suggestItem = this.selectedSuggestItem.read(reader);
    if (suggestItem) {
      const suggestCompletionEdit = singleTextRemoveCommonPrefix(suggestItem.toSingleTextEdit(), model);
      const augmentation = this._computeAugmentation(suggestCompletionEdit, reader);
      const isSuggestionPreviewEnabled = this._suggestPreviewEnabled.read(reader);
      if (!isSuggestionPreviewEnabled && !augmentation) {
        return void 0;
      }
      const fullEdit = augmentation?.edit ?? suggestCompletionEdit;
      const fullEditPreviewLength = augmentation ? augmentation.edit.text.length - suggestCompletionEdit.text.length : 0;
      const mode = this._suggestPreviewMode.read(reader);
      const positions = this._positions.read(reader);
      const edits = [fullEdit, ...getSecondaryEdits(this.textModel, positions, fullEdit)];
      const ghostTexts = edits.map((edit, idx) => computeGhostText(edit, model, mode, positions[idx], fullEditPreviewLength)).filter(isDefined);
      const primaryGhostText = ghostTexts[0] ?? new GhostText(fullEdit.range.endLineNumber, []);
      return { kind: "ghostText", edits, primaryGhostText, ghostTexts, inlineCompletion: augmentation?.completion, suggestItem };
    } else {
      if (!this._isActive.read(reader)) {
        return void 0;
      }
      const inlineCompletion = this.selectedInlineCompletion.read(reader);
      if (!inlineCompletion) {
        return void 0;
      }
      const replacement = inlineCompletion.toSingleTextEdit(reader);
      const mode = this._inlineSuggestMode.read(reader);
      const positions = this._positions.read(reader);
      const edits = [replacement, ...getSecondaryEdits(this.textModel, positions, replacement)];
      const ghostTexts = edits.map((edit, idx) => computeGhostText(edit, model, mode, positions[idx], 0)).filter(isDefined);
      if (!ghostTexts[0]) {
        return void 0;
      }
      return { kind: "ghostText", edits, primaryGhostText: ghostTexts[0], ghostTexts, inlineCompletion, suggestItem: void 0 };
    }
  });
  status = derived(this, (reader) => {
    if (this._source.loading.read(reader)) {
      return "loading";
    }
    const s = this.state.read(reader);
    if (s?.kind === "ghostText") {
      return "ghostText";
    }
    if (s?.kind === "inlineEdit") {
      return "inlineEdit";
    }
    return "noSuggestion";
  });
  inlineCompletionState = derived((reader) => {
    const s = this.state.read(reader);
    if (!s || s.kind !== "ghostText") {
      return void 0;
    }
    return s;
  });
  inlineEditState = derived((reader) => {
    const s = this.state.read(reader);
    if (!s || s.kind !== "inlineEdit") {
      return void 0;
    }
    return s;
  });
  _computeAugmentation(suggestCompletion, reader) {
    const model = this.textModel;
    const suggestWidgetInlineCompletions = this._source.suggestWidgetInlineCompletions.read(reader);
    const candidateInlineCompletions = suggestWidgetInlineCompletions ? suggestWidgetInlineCompletions.inlineCompletions : [this.selectedInlineCompletion.read(reader)].filter(isDefined);
    const augmentedCompletion = mapFindFirst(candidateInlineCompletions, (completion) => {
      let r = completion.toSingleTextEdit(reader);
      r = singleTextRemoveCommonPrefix(
        r,
        model,
        Range.fromPositions(r.range.getStartPosition(), suggestCompletion.range.getEndPosition())
      );
      return singleTextEditAugments(r, suggestCompletion) ? { completion, edit: r } : void 0;
    });
    return augmentedCompletion;
  }
  ghostTexts = derivedOpts({ owner: this, equalsFn: ghostTextsOrReplacementsEqual }, (reader) => {
    const v = this.inlineCompletionState.read(reader);
    if (!v) {
      return void 0;
    }
    return v.ghostTexts;
  });
  primaryGhostText = derivedOpts({ owner: this, equalsFn: ghostTextOrReplacementEquals }, (reader) => {
    const v = this.inlineCompletionState.read(reader);
    if (!v) {
      return void 0;
    }
    return v?.primaryGhostText;
  });
  async _deltaSelectedInlineCompletionIndex(delta) {
    await this.triggerExplicitly();
    const completions = this._filteredInlineCompletionItems.get() || [];
    if (completions.length > 0) {
      const newIdx = (this.selectedInlineCompletionIndex.get() + delta + completions.length) % completions.length;
      this._selectedInlineCompletionId.set(completions[newIdx].semanticId, void 0);
    } else {
      this._selectedInlineCompletionId.set(void 0, void 0);
    }
  }
  async next() {
    await this._deltaSelectedInlineCompletionIndex(1);
  }
  async previous() {
    await this._deltaSelectedInlineCompletionIndex(-1);
  }
  async accept(editor) {
    if (editor.getModel() !== this.textModel) {
      throw new BugIndicatingError();
    }
    let completion;
    const state = this.state.get();
    if (state?.kind === "ghostText") {
      if (!state || state.primaryGhostText.isEmpty() || !state.inlineCompletion) {
        return;
      }
      completion = state.inlineCompletion.toInlineCompletion(void 0);
    } else if (state?.kind === "inlineEdit") {
      completion = state.inlineCompletion.toInlineCompletion(void 0);
    } else {
      return;
    }
    if (completion.command) {
      completion.source.addRef();
    }
    editor.pushUndoStop();
    if (completion.snippetInfo) {
      editor.executeEdits(
        "inlineSuggestion.accept",
        [
          EditOperation.replace(completion.range, ""),
          ...completion.additionalTextEdits
        ]
      );
      editor.setPosition(completion.snippetInfo.range.getStartPosition(), "inlineCompletionAccept");
      SnippetController2.get(editor)?.insert(completion.snippetInfo.snippet, { undoStopBefore: false });
    } else {
      const edits = state.edits;
      const selections = getEndPositionsAfterApplying(edits).map((p) => Selection.fromPositions(p));
      editor.executeEdits("inlineSuggestion.accept", [
        ...edits.map((edit) => EditOperation.replace(edit.range, edit.text)),
        ...completion.additionalTextEdits
      ]);
      editor.setSelections(selections, "inlineCompletionAccept");
    }
    this.stop();
    if (completion.command) {
      await this._commandService.executeCommand(completion.command.id, ...completion.command.arguments || []).then(void 0, onUnexpectedExternalError);
      completion.source.removeRef();
    }
  }
  async acceptNextWord(editor) {
    await this._acceptNext(editor, (pos, text) => {
      const langId = this.textModel.getLanguageIdAtPosition(pos.lineNumber, pos.column);
      const config = this._languageConfigurationService.getLanguageConfiguration(langId);
      const wordRegExp = new RegExp(config.wordDefinition.source, config.wordDefinition.flags.replace("g", ""));
      const m1 = text.match(wordRegExp);
      let acceptUntilIndexExclusive = 0;
      if (m1 && m1.index !== void 0) {
        if (m1.index === 0) {
          acceptUntilIndexExclusive = m1[0].length;
        } else {
          acceptUntilIndexExclusive = m1.index;
        }
      } else {
        acceptUntilIndexExclusive = text.length;
      }
      const wsRegExp = /\s+/g;
      const m2 = wsRegExp.exec(text);
      if (m2 && m2.index !== void 0) {
        if (m2.index + m2[0].length < acceptUntilIndexExclusive) {
          acceptUntilIndexExclusive = m2.index + m2[0].length;
        }
      }
      return acceptUntilIndexExclusive;
    }, PartialAcceptTriggerKind.Word);
  }
  async acceptNextLine(editor) {
    await this._acceptNext(editor, (pos, text) => {
      const m = text.match(/\n/);
      if (m && m.index !== void 0) {
        return m.index + 1;
      }
      return text.length;
    }, PartialAcceptTriggerKind.Line);
  }
  async _acceptNext(editor, getAcceptUntilIndex, kind) {
    if (editor.getModel() !== this.textModel) {
      throw new BugIndicatingError();
    }
    const state = this.inlineCompletionState.get();
    if (!state || state.primaryGhostText.isEmpty() || !state.inlineCompletion) {
      return;
    }
    const ghostText = state.primaryGhostText;
    const completion = state.inlineCompletion.toInlineCompletion(void 0);
    if (completion.snippetInfo || completion.filterText !== completion.insertText) {
      await this.accept(editor);
      return;
    }
    const firstPart = ghostText.parts[0];
    const ghostTextPos = new Position(ghostText.lineNumber, firstPart.column);
    const ghostTextVal = firstPart.text;
    const acceptUntilIndexExclusive = getAcceptUntilIndex(ghostTextPos, ghostTextVal);
    if (acceptUntilIndexExclusive === ghostTextVal.length && ghostText.parts.length === 1) {
      this.accept(editor);
      return;
    }
    const partialGhostTextVal = ghostTextVal.substring(0, acceptUntilIndexExclusive);
    const positions = this._positions.get();
    const cursorPosition = positions[0];
    completion.source.addRef();
    try {
      this._isAcceptingPartially = true;
      try {
        editor.pushUndoStop();
        const replaceRange = Range.fromPositions(cursorPosition, ghostTextPos);
        const newText = editor.getModel().getValueInRange(replaceRange) + partialGhostTextVal;
        const primaryEdit = new SingleTextEdit(replaceRange, newText);
        const edits = [primaryEdit, ...getSecondaryEdits(this.textModel, positions, primaryEdit)];
        const selections = getEndPositionsAfterApplying(edits).map((p) => Selection.fromPositions(p));
        editor.executeEdits("inlineSuggestion.accept", edits.map((edit) => EditOperation.replace(edit.range, edit.text)));
        editor.setSelections(selections, "inlineCompletionPartialAccept");
        editor.revealPositionInCenterIfOutsideViewport(editor.getPosition(), ScrollType.Immediate);
      } finally {
        this._isAcceptingPartially = false;
      }
      if (completion.source.provider.handlePartialAccept) {
        const acceptedRange = Range.fromPositions(completion.range.getStartPosition(), TextLength.ofText(partialGhostTextVal).addToPosition(ghostTextPos));
        const text = editor.getModel().getValueInRange(acceptedRange, EndOfLinePreference.LF);
        completion.source.provider.handlePartialAccept(
          completion.source.inlineCompletions,
          completion.sourceInlineCompletion,
          text.length,
          { kind }
        );
      }
    } finally {
      completion.source.removeRef();
    }
  }
  handleSuggestAccepted(item) {
    const itemEdit = singleTextRemoveCommonPrefix(item.toSingleTextEdit(), this.textModel);
    const augmentedCompletion = this._computeAugmentation(itemEdit, void 0);
    if (!augmentedCompletion) {
      return;
    }
    const inlineCompletion = augmentedCompletion.completion.inlineCompletion;
    inlineCompletion.source.provider.handlePartialAccept?.(
      inlineCompletion.source.inlineCompletions,
      inlineCompletion.sourceInlineCompletion,
      itemEdit.text.length,
      {
        kind: PartialAcceptTriggerKind.Suggest
      }
    );
  }
  extractReproSample() {
    const value = this.textModel.getValue();
    const item = this.state.get()?.inlineCompletion?.toInlineCompletion(void 0);
    return {
      documentValue: value,
      inlineCompletion: item?.sourceInlineCompletion
    };
  }
};
InlineCompletionsModel = __decorateClass([
  __decorateParam(10, IInstantiationService),
  __decorateParam(11, ICommandService),
  __decorateParam(12, ILanguageConfigurationService)
], InlineCompletionsModel);
var VersionIdChangeReason = /* @__PURE__ */ ((VersionIdChangeReason2) => {
  VersionIdChangeReason2[VersionIdChangeReason2["Undo"] = 0] = "Undo";
  VersionIdChangeReason2[VersionIdChangeReason2["Redo"] = 1] = "Redo";
  VersionIdChangeReason2[VersionIdChangeReason2["AcceptWord"] = 2] = "AcceptWord";
  VersionIdChangeReason2[VersionIdChangeReason2["Other"] = 3] = "Other";
  return VersionIdChangeReason2;
})(VersionIdChangeReason || {});
function getSecondaryEdits(textModel, positions, primaryEdit) {
  if (positions.length === 1) {
    return [];
  }
  const primaryPosition = positions[0];
  const secondaryPositions = positions.slice(1);
  const primaryEditStartPosition = primaryEdit.range.getStartPosition();
  const primaryEditEndPosition = primaryEdit.range.getEndPosition();
  const replacedTextAfterPrimaryCursor = textModel.getValueInRange(
    Range.fromPositions(primaryPosition, primaryEditEndPosition)
  );
  const positionWithinTextEdit = subtractPositions(primaryPosition, primaryEditStartPosition);
  if (positionWithinTextEdit.lineNumber < 1) {
    onUnexpectedError(new BugIndicatingError(
      `positionWithinTextEdit line number should be bigger than 0.
			Invalid subtraction between ${primaryPosition.toString()} and ${primaryEditStartPosition.toString()}`
    ));
    return [];
  }
  const secondaryEditText = substringPos(primaryEdit.text, positionWithinTextEdit);
  return secondaryPositions.map((pos) => {
    const posEnd = addPositions(subtractPositions(pos, primaryEditStartPosition), primaryEditEndPosition);
    const textAfterSecondaryCursor = textModel.getValueInRange(
      Range.fromPositions(pos, posEnd)
    );
    const l = commonPrefixLength(replacedTextAfterPrimaryCursor, textAfterSecondaryCursor);
    const range = Range.fromPositions(pos, pos.delta(0, l));
    return new SingleTextEdit(range, secondaryEditText);
  });
}
__name(getSecondaryEdits, "getSecondaryEdits");
export {
  InlineCompletionsModel,
  VersionIdChangeReason,
  getSecondaryEdits
};
//# sourceMappingURL=inlineCompletionsModel.js.map
