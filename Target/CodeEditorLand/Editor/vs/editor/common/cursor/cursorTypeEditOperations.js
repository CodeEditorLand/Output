var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { CharCode } from "../../../base/common/charCode.js";
import { onUnexpectedError } from "../../../base/common/errors.js";
import * as strings from "../../../base/common/strings.js";
import { ReplaceCommand, ReplaceCommandWithOffsetCursorState, ReplaceCommandWithoutChangingPosition, ReplaceCommandThatPreservesSelection } from "../commands/replaceCommand.js";
import { ShiftCommand } from "../commands/shiftCommand.js";
import { SurroundSelectionCommand } from "../commands/surroundSelectionCommand.js";
import { CursorConfiguration, EditOperationResult, EditOperationType, ICursorSimpleModel, isQuote } from "../cursorCommon.js";
import { WordCharacterClass, getMapForWordSeparators } from "../core/wordCharacterClassifier.js";
import { Range } from "../core/range.js";
import { Selection } from "../core/selection.js";
import { Position } from "../core/position.js";
import { ICommand, ICursorStateComputerData, IEditOperationBuilder } from "../editorCommon.js";
import { ITextModel } from "../model.js";
import { EnterAction, IndentAction, StandardAutoClosingPairConditional } from "../languages/languageConfiguration.js";
import { getIndentationAtPosition } from "../languages/languageConfigurationRegistry.js";
import { IElectricAction } from "../languages/supports/electricCharacter.js";
import { EditorAutoClosingStrategy, EditorAutoIndentStrategy } from "../config/editorOptions.js";
import { createScopedLineTokens } from "../languages/supports.js";
import { getIndentActionForType, getIndentForEnter, getInheritIndentForLine } from "../languages/autoIndent.js";
import { getEnterAction } from "../languages/enterAction.js";
class AutoIndentOperation {
  static {
    __name(this, "AutoIndentOperation");
  }
  static getEdits(config, model, selections, ch, isDoingComposition) {
    if (!isDoingComposition && this._isAutoIndentType(config, model, selections)) {
      const indentationForSelections = [];
      for (const selection of selections) {
        const indentation = this._findActualIndentationForSelection(config, model, selection, ch);
        if (indentation === null) {
          return;
        }
        indentationForSelections.push({ selection, indentation });
      }
      const autoClosingPairClose = AutoClosingOpenCharTypeOperation.getAutoClosingPairClose(config, model, selections, ch, false);
      return this._getIndentationAndAutoClosingPairEdits(config, model, indentationForSelections, ch, autoClosingPairClose);
    }
    return;
  }
  static _isAutoIndentType(config, model, selections) {
    if (config.autoIndent < EditorAutoIndentStrategy.Full) {
      return false;
    }
    for (let i = 0, len = selections.length; i < len; i++) {
      if (!model.tokenization.isCheapToTokenize(selections[i].getEndPosition().lineNumber)) {
        return false;
      }
    }
    return true;
  }
  static _findActualIndentationForSelection(config, model, selection, ch) {
    const actualIndentation = getIndentActionForType(config, model, selection, ch, {
      shiftIndent: /* @__PURE__ */ __name((indentation) => {
        return shiftIndent(config, indentation);
      }, "shiftIndent"),
      unshiftIndent: /* @__PURE__ */ __name((indentation) => {
        return unshiftIndent(config, indentation);
      }, "unshiftIndent")
    }, config.languageConfigurationService);
    if (actualIndentation === null) {
      return null;
    }
    const currentIndentation = getIndentationAtPosition(model, selection.startLineNumber, selection.startColumn);
    if (actualIndentation === config.normalizeIndentation(currentIndentation)) {
      return null;
    }
    return actualIndentation;
  }
  static _getIndentationAndAutoClosingPairEdits(config, model, indentationForSelections, ch, autoClosingPairClose) {
    const commands = indentationForSelections.map(({ selection, indentation }) => {
      if (autoClosingPairClose !== null) {
        const indentationEdit = this._getEditFromIndentationAndSelection(config, model, indentation, selection, ch, false);
        return new TypeWithIndentationAndAutoClosingCommand(indentationEdit, selection, ch, autoClosingPairClose);
      } else {
        const indentationEdit = this._getEditFromIndentationAndSelection(config, model, indentation, selection, ch, true);
        return typeCommand(indentationEdit.range, indentationEdit.text, false);
      }
    });
    const editOptions = { shouldPushStackElementBefore: true, shouldPushStackElementAfter: false };
    return new EditOperationResult(EditOperationType.TypingOther, commands, editOptions);
  }
  static _getEditFromIndentationAndSelection(config, model, indentation, selection, ch, includeChInEdit = true) {
    const startLineNumber = selection.startLineNumber;
    const firstNonWhitespaceColumn = model.getLineFirstNonWhitespaceColumn(startLineNumber);
    let text = config.normalizeIndentation(indentation);
    if (firstNonWhitespaceColumn !== 0) {
      const startLine = model.getLineContent(startLineNumber);
      text += startLine.substring(firstNonWhitespaceColumn - 1, selection.startColumn - 1);
    }
    text += includeChInEdit ? ch : "";
    const range = new Range(startLineNumber, 1, selection.endLineNumber, selection.endColumn);
    return { range, text };
  }
}
class AutoClosingOvertypeOperation {
  static {
    __name(this, "AutoClosingOvertypeOperation");
  }
  static getEdits(prevEditOperationType, config, model, selections, autoClosedCharacters, ch) {
    if (isAutoClosingOvertype(config, model, selections, autoClosedCharacters, ch)) {
      return this._runAutoClosingOvertype(prevEditOperationType, selections, ch);
    }
    return;
  }
  static _runAutoClosingOvertype(prevEditOperationType, selections, ch) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      const selection = selections[i];
      const position = selection.getPosition();
      const typeSelection = new Range(position.lineNumber, position.column, position.lineNumber, position.column + 1);
      commands[i] = new ReplaceCommand(typeSelection, ch);
    }
    return new EditOperationResult(EditOperationType.TypingOther, commands, {
      shouldPushStackElementBefore: shouldPushStackElementBetween(prevEditOperationType, EditOperationType.TypingOther),
      shouldPushStackElementAfter: false
    });
  }
}
class AutoClosingOvertypeWithInterceptorsOperation {
  static {
    __name(this, "AutoClosingOvertypeWithInterceptorsOperation");
  }
  static getEdits(config, model, selections, autoClosedCharacters, ch) {
    if (isAutoClosingOvertype(config, model, selections, autoClosedCharacters, ch)) {
      const commands = selections.map((s) => new ReplaceCommand(new Range(s.positionLineNumber, s.positionColumn, s.positionLineNumber, s.positionColumn + 1), "", false));
      return new EditOperationResult(EditOperationType.TypingOther, commands, {
        shouldPushStackElementBefore: true,
        shouldPushStackElementAfter: false
      });
    }
    return;
  }
}
class AutoClosingOpenCharTypeOperation {
  static {
    __name(this, "AutoClosingOpenCharTypeOperation");
  }
  static getEdits(config, model, selections, ch, chIsAlreadyTyped, isDoingComposition) {
    if (!isDoingComposition) {
      const autoClosingPairClose = this.getAutoClosingPairClose(config, model, selections, ch, chIsAlreadyTyped);
      if (autoClosingPairClose !== null) {
        return this._runAutoClosingOpenCharType(selections, ch, chIsAlreadyTyped, autoClosingPairClose);
      }
    }
    return;
  }
  static _runAutoClosingOpenCharType(selections, ch, chIsAlreadyTyped, autoClosingPairClose) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      const selection = selections[i];
      commands[i] = new TypeWithAutoClosingCommand(selection, ch, !chIsAlreadyTyped, autoClosingPairClose);
    }
    return new EditOperationResult(EditOperationType.TypingOther, commands, {
      shouldPushStackElementBefore: true,
      shouldPushStackElementAfter: false
    });
  }
  static getAutoClosingPairClose(config, model, selections, ch, chIsAlreadyTyped) {
    for (const selection of selections) {
      if (!selection.isEmpty()) {
        return null;
      }
    }
    const positions = selections.map((s) => {
      const position = s.getPosition();
      if (chIsAlreadyTyped) {
        return { lineNumber: position.lineNumber, beforeColumn: position.column - ch.length, afterColumn: position.column };
      } else {
        return { lineNumber: position.lineNumber, beforeColumn: position.column, afterColumn: position.column };
      }
    });
    const pair = this._findAutoClosingPairOpen(config, model, positions.map((p) => new Position(p.lineNumber, p.beforeColumn)), ch);
    if (!pair) {
      return null;
    }
    let autoCloseConfig;
    let shouldAutoCloseBefore;
    const chIsQuote = isQuote(ch);
    if (chIsQuote) {
      autoCloseConfig = config.autoClosingQuotes;
      shouldAutoCloseBefore = config.shouldAutoCloseBefore.quote;
    } else {
      const pairIsForComments = config.blockCommentStartToken ? pair.open.includes(config.blockCommentStartToken) : false;
      if (pairIsForComments) {
        autoCloseConfig = config.autoClosingComments;
        shouldAutoCloseBefore = config.shouldAutoCloseBefore.comment;
      } else {
        autoCloseConfig = config.autoClosingBrackets;
        shouldAutoCloseBefore = config.shouldAutoCloseBefore.bracket;
      }
    }
    if (autoCloseConfig === "never") {
      return null;
    }
    const containedPair = this._findContainedAutoClosingPair(config, pair);
    const containedPairClose = containedPair ? containedPair.close : "";
    let isContainedPairPresent = true;
    for (const position of positions) {
      const { lineNumber, beforeColumn, afterColumn } = position;
      const lineText = model.getLineContent(lineNumber);
      const lineBefore = lineText.substring(0, beforeColumn - 1);
      const lineAfter = lineText.substring(afterColumn - 1);
      if (!lineAfter.startsWith(containedPairClose)) {
        isContainedPairPresent = false;
      }
      if (lineAfter.length > 0) {
        const characterAfter = lineAfter.charAt(0);
        const isBeforeCloseBrace = this._isBeforeClosingBrace(config, lineAfter);
        if (!isBeforeCloseBrace && !shouldAutoCloseBefore(characterAfter)) {
          return null;
        }
      }
      if (pair.open.length === 1 && (ch === "'" || ch === '"') && autoCloseConfig !== "always") {
        const wordSeparators = getMapForWordSeparators(config.wordSeparators, []);
        if (lineBefore.length > 0) {
          const characterBefore = lineBefore.charCodeAt(lineBefore.length - 1);
          if (wordSeparators.get(characterBefore) === WordCharacterClass.Regular) {
            return null;
          }
        }
      }
      if (!model.tokenization.isCheapToTokenize(lineNumber)) {
        return null;
      }
      model.tokenization.forceTokenization(lineNumber);
      const lineTokens = model.tokenization.getLineTokens(lineNumber);
      const scopedLineTokens = createScopedLineTokens(lineTokens, beforeColumn - 1);
      if (!pair.shouldAutoClose(scopedLineTokens, beforeColumn - scopedLineTokens.firstCharOffset)) {
        return null;
      }
      const neutralCharacter = pair.findNeutralCharacter();
      if (neutralCharacter) {
        const tokenType = model.tokenization.getTokenTypeIfInsertingCharacter(lineNumber, beforeColumn, neutralCharacter);
        if (!pair.isOK(tokenType)) {
          return null;
        }
      }
    }
    if (isContainedPairPresent) {
      return pair.close.substring(0, pair.close.length - containedPairClose.length);
    } else {
      return pair.close;
    }
  }
  /**
   * Find another auto-closing pair that is contained by the one passed in.
   *
   * e.g. when having [(,)] and [(*,*)] as auto-closing pairs
   * this method will find [(,)] as a containment pair for [(*,*)]
   */
  static _findContainedAutoClosingPair(config, pair) {
    if (pair.open.length <= 1) {
      return null;
    }
    const lastChar = pair.close.charAt(pair.close.length - 1);
    const candidates = config.autoClosingPairs.autoClosingPairsCloseByEnd.get(lastChar) || [];
    let result = null;
    for (const candidate of candidates) {
      if (candidate.open !== pair.open && pair.open.includes(candidate.open) && pair.close.endsWith(candidate.close)) {
        if (!result || candidate.open.length > result.open.length) {
          result = candidate;
        }
      }
    }
    return result;
  }
  /**
   * Determine if typing `ch` at all `positions` in the `model` results in an
   * auto closing open sequence being typed.
   *
   * Auto closing open sequences can consist of multiple characters, which
   * can lead to ambiguities. In such a case, the longest auto-closing open
   * sequence is returned.
   */
  static _findAutoClosingPairOpen(config, model, positions, ch) {
    const candidates = config.autoClosingPairs.autoClosingPairsOpenByEnd.get(ch);
    if (!candidates) {
      return null;
    }
    let result = null;
    for (const candidate of candidates) {
      if (result === null || candidate.open.length > result.open.length) {
        let candidateIsMatch = true;
        for (const position of positions) {
          const relevantText = model.getValueInRange(new Range(position.lineNumber, position.column - candidate.open.length + 1, position.lineNumber, position.column));
          if (relevantText + ch !== candidate.open) {
            candidateIsMatch = false;
            break;
          }
        }
        if (candidateIsMatch) {
          result = candidate;
        }
      }
    }
    return result;
  }
  static _isBeforeClosingBrace(config, lineAfter) {
    const nextChar = lineAfter.charAt(0);
    const potentialStartingBraces = config.autoClosingPairs.autoClosingPairsOpenByStart.get(nextChar) || [];
    const potentialClosingBraces = config.autoClosingPairs.autoClosingPairsCloseByStart.get(nextChar) || [];
    const isBeforeStartingBrace = potentialStartingBraces.some((x) => lineAfter.startsWith(x.open));
    const isBeforeClosingBrace = potentialClosingBraces.some((x) => lineAfter.startsWith(x.close));
    return !isBeforeStartingBrace && isBeforeClosingBrace;
  }
}
class SurroundSelectionOperation {
  static {
    __name(this, "SurroundSelectionOperation");
  }
  static getEdits(config, model, selections, ch, isDoingComposition) {
    if (!isDoingComposition && this._isSurroundSelectionType(config, model, selections, ch)) {
      return this._runSurroundSelectionType(config, selections, ch);
    }
    return;
  }
  static _runSurroundSelectionType(config, selections, ch) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      const selection = selections[i];
      const closeCharacter = config.surroundingPairs[ch];
      commands[i] = new SurroundSelectionCommand(selection, ch, closeCharacter);
    }
    return new EditOperationResult(EditOperationType.Other, commands, {
      shouldPushStackElementBefore: true,
      shouldPushStackElementAfter: true
    });
  }
  static _isSurroundSelectionType(config, model, selections, ch) {
    if (!shouldSurroundChar(config, ch) || !config.surroundingPairs.hasOwnProperty(ch)) {
      return false;
    }
    const isTypingAQuoteCharacter = isQuote(ch);
    for (const selection of selections) {
      if (selection.isEmpty()) {
        return false;
      }
      let selectionContainsOnlyWhitespace = true;
      for (let lineNumber = selection.startLineNumber; lineNumber <= selection.endLineNumber; lineNumber++) {
        const lineText = model.getLineContent(lineNumber);
        const startIndex = lineNumber === selection.startLineNumber ? selection.startColumn - 1 : 0;
        const endIndex = lineNumber === selection.endLineNumber ? selection.endColumn - 1 : lineText.length;
        const selectedText = lineText.substring(startIndex, endIndex);
        if (/[^ \t]/.test(selectedText)) {
          selectionContainsOnlyWhitespace = false;
          break;
        }
      }
      if (selectionContainsOnlyWhitespace) {
        return false;
      }
      if (isTypingAQuoteCharacter && selection.startLineNumber === selection.endLineNumber && selection.startColumn + 1 === selection.endColumn) {
        const selectionText = model.getValueInRange(selection);
        if (isQuote(selectionText)) {
          return false;
        }
      }
    }
    return true;
  }
}
class InterceptorElectricCharOperation {
  static {
    __name(this, "InterceptorElectricCharOperation");
  }
  static getEdits(prevEditOperationType, config, model, selections, ch, isDoingComposition) {
    if (!isDoingComposition && this._isTypeInterceptorElectricChar(config, model, selections)) {
      const r = this._typeInterceptorElectricChar(prevEditOperationType, config, model, selections[0], ch);
      if (r) {
        return r;
      }
    }
    return;
  }
  static _isTypeInterceptorElectricChar(config, model, selections) {
    if (selections.length === 1 && model.tokenization.isCheapToTokenize(selections[0].getEndPosition().lineNumber)) {
      return true;
    }
    return false;
  }
  static _typeInterceptorElectricChar(prevEditOperationType, config, model, selection, ch) {
    if (!config.electricChars.hasOwnProperty(ch) || !selection.isEmpty()) {
      return null;
    }
    const position = selection.getPosition();
    model.tokenization.forceTokenization(position.lineNumber);
    const lineTokens = model.tokenization.getLineTokens(position.lineNumber);
    let electricAction;
    try {
      electricAction = config.onElectricCharacter(ch, lineTokens, position.column);
    } catch (e) {
      onUnexpectedError(e);
      return null;
    }
    if (!electricAction) {
      return null;
    }
    if (electricAction.matchOpenBracket) {
      const endColumn = (lineTokens.getLineContent() + ch).lastIndexOf(electricAction.matchOpenBracket) + 1;
      const match = model.bracketPairs.findMatchingBracketUp(
        electricAction.matchOpenBracket,
        {
          lineNumber: position.lineNumber,
          column: endColumn
        },
        500
        /* give at most 500ms to compute */
      );
      if (match) {
        if (match.startLineNumber === position.lineNumber) {
          return null;
        }
        const matchLine = model.getLineContent(match.startLineNumber);
        const matchLineIndentation = strings.getLeadingWhitespace(matchLine);
        const newIndentation = config.normalizeIndentation(matchLineIndentation);
        const lineText = model.getLineContent(position.lineNumber);
        const lineFirstNonBlankColumn = model.getLineFirstNonWhitespaceColumn(position.lineNumber) || position.column;
        const prefix = lineText.substring(lineFirstNonBlankColumn - 1, position.column - 1);
        const typeText = newIndentation + prefix + ch;
        const typeSelection = new Range(position.lineNumber, 1, position.lineNumber, position.column);
        const command = new ReplaceCommand(typeSelection, typeText);
        return new EditOperationResult(getTypingOperation(typeText, prevEditOperationType), [command], {
          shouldPushStackElementBefore: false,
          shouldPushStackElementAfter: true
        });
      }
    }
    return null;
  }
}
class SimpleCharacterTypeOperation {
  static {
    __name(this, "SimpleCharacterTypeOperation");
  }
  static getEdits(prevEditOperationType, selections, ch) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      commands[i] = new ReplaceCommand(selections[i], ch);
    }
    const opType = getTypingOperation(ch, prevEditOperationType);
    return new EditOperationResult(opType, commands, {
      shouldPushStackElementBefore: shouldPushStackElementBetween(prevEditOperationType, opType),
      shouldPushStackElementAfter: false
    });
  }
}
class EnterOperation {
  static {
    __name(this, "EnterOperation");
  }
  static getEdits(config, model, selections, ch, isDoingComposition) {
    if (!isDoingComposition && ch === "\n") {
      const commands = [];
      for (let i = 0, len = selections.length; i < len; i++) {
        commands[i] = this._enter(config, model, false, selections[i]);
      }
      return new EditOperationResult(EditOperationType.TypingOther, commands, {
        shouldPushStackElementBefore: true,
        shouldPushStackElementAfter: false
      });
    }
    return;
  }
  static _enter(config, model, keepPosition, range) {
    if (config.autoIndent === EditorAutoIndentStrategy.None) {
      return typeCommand(range, "\n", keepPosition);
    }
    if (!model.tokenization.isCheapToTokenize(range.getStartPosition().lineNumber) || config.autoIndent === EditorAutoIndentStrategy.Keep) {
      const lineText2 = model.getLineContent(range.startLineNumber);
      const indentation2 = strings.getLeadingWhitespace(lineText2).substring(0, range.startColumn - 1);
      return typeCommand(range, "\n" + config.normalizeIndentation(indentation2), keepPosition);
    }
    const r = getEnterAction(config.autoIndent, model, range, config.languageConfigurationService);
    if (r) {
      if (r.indentAction === IndentAction.None) {
        return typeCommand(range, "\n" + config.normalizeIndentation(r.indentation + r.appendText), keepPosition);
      } else if (r.indentAction === IndentAction.Indent) {
        return typeCommand(range, "\n" + config.normalizeIndentation(r.indentation + r.appendText), keepPosition);
      } else if (r.indentAction === IndentAction.IndentOutdent) {
        const normalIndent = config.normalizeIndentation(r.indentation);
        const increasedIndent = config.normalizeIndentation(r.indentation + r.appendText);
        const typeText = "\n" + increasedIndent + "\n" + normalIndent;
        if (keepPosition) {
          return new ReplaceCommandWithoutChangingPosition(range, typeText, true);
        } else {
          return new ReplaceCommandWithOffsetCursorState(range, typeText, -1, increasedIndent.length - normalIndent.length, true);
        }
      } else if (r.indentAction === IndentAction.Outdent) {
        const actualIndentation = unshiftIndent(config, r.indentation);
        return typeCommand(range, "\n" + config.normalizeIndentation(actualIndentation + r.appendText), keepPosition);
      }
    }
    const lineText = model.getLineContent(range.startLineNumber);
    const indentation = strings.getLeadingWhitespace(lineText).substring(0, range.startColumn - 1);
    if (config.autoIndent >= EditorAutoIndentStrategy.Full) {
      const ir = getIndentForEnter(config.autoIndent, model, range, {
        unshiftIndent: /* @__PURE__ */ __name((indent) => {
          return unshiftIndent(config, indent);
        }, "unshiftIndent"),
        shiftIndent: /* @__PURE__ */ __name((indent) => {
          return shiftIndent(config, indent);
        }, "shiftIndent"),
        normalizeIndentation: /* @__PURE__ */ __name((indent) => {
          return config.normalizeIndentation(indent);
        }, "normalizeIndentation")
      }, config.languageConfigurationService);
      if (ir) {
        let oldEndViewColumn = config.visibleColumnFromColumn(model, range.getEndPosition());
        const oldEndColumn = range.endColumn;
        const newLineContent = model.getLineContent(range.endLineNumber);
        const firstNonWhitespace = strings.firstNonWhitespaceIndex(newLineContent);
        if (firstNonWhitespace >= 0) {
          range = range.setEndPosition(range.endLineNumber, Math.max(range.endColumn, firstNonWhitespace + 1));
        } else {
          range = range.setEndPosition(range.endLineNumber, model.getLineMaxColumn(range.endLineNumber));
        }
        if (keepPosition) {
          return new ReplaceCommandWithoutChangingPosition(range, "\n" + config.normalizeIndentation(ir.afterEnter), true);
        } else {
          let offset = 0;
          if (oldEndColumn <= firstNonWhitespace + 1) {
            if (!config.insertSpaces) {
              oldEndViewColumn = Math.ceil(oldEndViewColumn / config.indentSize);
            }
            offset = Math.min(oldEndViewColumn + 1 - config.normalizeIndentation(ir.afterEnter).length - 1, 0);
          }
          return new ReplaceCommandWithOffsetCursorState(range, "\n" + config.normalizeIndentation(ir.afterEnter), 0, offset, true);
        }
      }
    }
    return typeCommand(range, "\n" + config.normalizeIndentation(indentation), keepPosition);
  }
  static lineInsertBefore(config, model, selections) {
    if (model === null || selections === null) {
      return [];
    }
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      let lineNumber = selections[i].positionLineNumber;
      if (lineNumber === 1) {
        commands[i] = new ReplaceCommandWithoutChangingPosition(new Range(1, 1, 1, 1), "\n");
      } else {
        lineNumber--;
        const column = model.getLineMaxColumn(lineNumber);
        commands[i] = this._enter(config, model, false, new Range(lineNumber, column, lineNumber, column));
      }
    }
    return commands;
  }
  static lineInsertAfter(config, model, selections) {
    if (model === null || selections === null) {
      return [];
    }
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      const lineNumber = selections[i].positionLineNumber;
      const column = model.getLineMaxColumn(lineNumber);
      commands[i] = this._enter(config, model, false, new Range(lineNumber, column, lineNumber, column));
    }
    return commands;
  }
  static lineBreakInsert(config, model, selections) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      commands[i] = this._enter(config, model, true, selections[i]);
    }
    return commands;
  }
}
class PasteOperation {
  static {
    __name(this, "PasteOperation");
  }
  static getEdits(config, model, selections, text, pasteOnNewLine, multicursorText) {
    const distributedPaste = this._distributePasteToCursors(config, selections, text, pasteOnNewLine, multicursorText);
    if (distributedPaste) {
      selections = selections.sort(Range.compareRangesUsingStarts);
      return this._distributedPaste(config, model, selections, distributedPaste);
    } else {
      return this._simplePaste(config, model, selections, text, pasteOnNewLine);
    }
  }
  static _distributePasteToCursors(config, selections, text, pasteOnNewLine, multicursorText) {
    if (pasteOnNewLine) {
      return null;
    }
    if (selections.length === 1) {
      return null;
    }
    if (multicursorText && multicursorText.length === selections.length) {
      return multicursorText;
    }
    if (config.multiCursorPaste === "spread") {
      if (text.charCodeAt(text.length - 1) === CharCode.LineFeed) {
        text = text.substring(0, text.length - 1);
      }
      if (text.charCodeAt(text.length - 1) === CharCode.CarriageReturn) {
        text = text.substring(0, text.length - 1);
      }
      const lines = strings.splitLines(text);
      if (lines.length === selections.length) {
        return lines;
      }
    }
    return null;
  }
  static _distributedPaste(config, model, selections, text) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      commands[i] = new ReplaceCommand(selections[i], text[i]);
    }
    return new EditOperationResult(EditOperationType.Other, commands, {
      shouldPushStackElementBefore: true,
      shouldPushStackElementAfter: true
    });
  }
  static _simplePaste(config, model, selections, text, pasteOnNewLine) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      const selection = selections[i];
      const position = selection.getPosition();
      if (pasteOnNewLine && !selection.isEmpty()) {
        pasteOnNewLine = false;
      }
      if (pasteOnNewLine && text.indexOf("\n") !== text.length - 1) {
        pasteOnNewLine = false;
      }
      if (pasteOnNewLine) {
        const typeSelection = new Range(position.lineNumber, 1, position.lineNumber, 1);
        commands[i] = new ReplaceCommandThatPreservesSelection(typeSelection, text, selection, true);
      } else {
        commands[i] = new ReplaceCommand(selection, text);
      }
    }
    return new EditOperationResult(EditOperationType.Other, commands, {
      shouldPushStackElementBefore: true,
      shouldPushStackElementAfter: true
    });
  }
}
class CompositionOperation {
  static {
    __name(this, "CompositionOperation");
  }
  static getEdits(prevEditOperationType, config, model, selections, text, replacePrevCharCnt, replaceNextCharCnt, positionDelta) {
    const commands = selections.map((selection) => this._compositionType(model, selection, text, replacePrevCharCnt, replaceNextCharCnt, positionDelta));
    return new EditOperationResult(EditOperationType.TypingOther, commands, {
      shouldPushStackElementBefore: shouldPushStackElementBetween(prevEditOperationType, EditOperationType.TypingOther),
      shouldPushStackElementAfter: false
    });
  }
  static _compositionType(model, selection, text, replacePrevCharCnt, replaceNextCharCnt, positionDelta) {
    if (!selection.isEmpty()) {
      return null;
    }
    const pos = selection.getPosition();
    const startColumn = Math.max(1, pos.column - replacePrevCharCnt);
    const endColumn = Math.min(model.getLineMaxColumn(pos.lineNumber), pos.column + replaceNextCharCnt);
    const range = new Range(pos.lineNumber, startColumn, pos.lineNumber, endColumn);
    const oldText = model.getValueInRange(range);
    if (oldText === text && positionDelta === 0) {
      return null;
    }
    return new ReplaceCommandWithOffsetCursorState(range, text, 0, positionDelta);
  }
}
class TypeWithoutInterceptorsOperation {
  static {
    __name(this, "TypeWithoutInterceptorsOperation");
  }
  static getEdits(prevEditOperationType, selections, str) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      commands[i] = new ReplaceCommand(selections[i], str);
    }
    const opType = getTypingOperation(str, prevEditOperationType);
    return new EditOperationResult(opType, commands, {
      shouldPushStackElementBefore: shouldPushStackElementBetween(prevEditOperationType, opType),
      shouldPushStackElementAfter: false
    });
  }
}
class TabOperation {
  static {
    __name(this, "TabOperation");
  }
  static getCommands(config, model, selections) {
    const commands = [];
    for (let i = 0, len = selections.length; i < len; i++) {
      const selection = selections[i];
      if (selection.isEmpty()) {
        const lineText = model.getLineContent(selection.startLineNumber);
        if (/^\s*$/.test(lineText) && model.tokenization.isCheapToTokenize(selection.startLineNumber)) {
          let goodIndent = this._goodIndentForLine(config, model, selection.startLineNumber);
          goodIndent = goodIndent || "	";
          const possibleTypeText = config.normalizeIndentation(goodIndent);
          if (!lineText.startsWith(possibleTypeText)) {
            commands[i] = new ReplaceCommand(new Range(selection.startLineNumber, 1, selection.startLineNumber, lineText.length + 1), possibleTypeText, true);
            continue;
          }
        }
        commands[i] = this._replaceJumpToNextIndent(config, model, selection, true);
      } else {
        if (selection.startLineNumber === selection.endLineNumber) {
          const lineMaxColumn = model.getLineMaxColumn(selection.startLineNumber);
          if (selection.startColumn !== 1 || selection.endColumn !== lineMaxColumn) {
            commands[i] = this._replaceJumpToNextIndent(config, model, selection, false);
            continue;
          }
        }
        commands[i] = new ShiftCommand(selection, {
          isUnshift: false,
          tabSize: config.tabSize,
          indentSize: config.indentSize,
          insertSpaces: config.insertSpaces,
          useTabStops: config.useTabStops,
          autoIndent: config.autoIndent
        }, config.languageConfigurationService);
      }
    }
    return commands;
  }
  static _goodIndentForLine(config, model, lineNumber) {
    let action = null;
    let indentation = "";
    const expectedIndentAction = getInheritIndentForLine(config.autoIndent, model, lineNumber, false, config.languageConfigurationService);
    if (expectedIndentAction) {
      action = expectedIndentAction.action;
      indentation = expectedIndentAction.indentation;
    } else if (lineNumber > 1) {
      let lastLineNumber;
      for (lastLineNumber = lineNumber - 1; lastLineNumber >= 1; lastLineNumber--) {
        const lineText = model.getLineContent(lastLineNumber);
        const nonWhitespaceIdx = strings.lastNonWhitespaceIndex(lineText);
        if (nonWhitespaceIdx >= 0) {
          break;
        }
      }
      if (lastLineNumber < 1) {
        return null;
      }
      const maxColumn = model.getLineMaxColumn(lastLineNumber);
      const expectedEnterAction = getEnterAction(config.autoIndent, model, new Range(lastLineNumber, maxColumn, lastLineNumber, maxColumn), config.languageConfigurationService);
      if (expectedEnterAction) {
        indentation = expectedEnterAction.indentation + expectedEnterAction.appendText;
      }
    }
    if (action) {
      if (action === IndentAction.Indent) {
        indentation = shiftIndent(config, indentation);
      }
      if (action === IndentAction.Outdent) {
        indentation = unshiftIndent(config, indentation);
      }
      indentation = config.normalizeIndentation(indentation);
    }
    if (!indentation) {
      return null;
    }
    return indentation;
  }
  static _replaceJumpToNextIndent(config, model, selection, insertsAutoWhitespace) {
    let typeText = "";
    const position = selection.getStartPosition();
    if (config.insertSpaces) {
      const visibleColumnFromColumn = config.visibleColumnFromColumn(model, position);
      const indentSize = config.indentSize;
      const spacesCnt = indentSize - visibleColumnFromColumn % indentSize;
      for (let i = 0; i < spacesCnt; i++) {
        typeText += " ";
      }
    } else {
      typeText = "	";
    }
    return new ReplaceCommand(selection, typeText, insertsAutoWhitespace);
  }
}
class BaseTypeWithAutoClosingCommand extends ReplaceCommandWithOffsetCursorState {
  static {
    __name(this, "BaseTypeWithAutoClosingCommand");
  }
  _openCharacter;
  _closeCharacter;
  closeCharacterRange;
  enclosingRange;
  constructor(selection, text, lineNumberDeltaOffset, columnDeltaOffset, openCharacter, closeCharacter) {
    super(selection, text, lineNumberDeltaOffset, columnDeltaOffset);
    this._openCharacter = openCharacter;
    this._closeCharacter = closeCharacter;
    this.closeCharacterRange = null;
    this.enclosingRange = null;
  }
  _computeCursorStateWithRange(model, range, helper) {
    this.closeCharacterRange = new Range(range.startLineNumber, range.endColumn - this._closeCharacter.length, range.endLineNumber, range.endColumn);
    this.enclosingRange = new Range(range.startLineNumber, range.endColumn - this._openCharacter.length - this._closeCharacter.length, range.endLineNumber, range.endColumn);
    return super.computeCursorState(model, helper);
  }
}
class TypeWithAutoClosingCommand extends BaseTypeWithAutoClosingCommand {
  static {
    __name(this, "TypeWithAutoClosingCommand");
  }
  constructor(selection, openCharacter, insertOpenCharacter, closeCharacter) {
    const text = (insertOpenCharacter ? openCharacter : "") + closeCharacter;
    const lineNumberDeltaOffset = 0;
    const columnDeltaOffset = -closeCharacter.length;
    super(selection, text, lineNumberDeltaOffset, columnDeltaOffset, openCharacter, closeCharacter);
  }
  computeCursorState(model, helper) {
    const inverseEditOperations = helper.getInverseEditOperations();
    const range = inverseEditOperations[0].range;
    return this._computeCursorStateWithRange(model, range, helper);
  }
}
class TypeWithIndentationAndAutoClosingCommand extends BaseTypeWithAutoClosingCommand {
  static {
    __name(this, "TypeWithIndentationAndAutoClosingCommand");
  }
  _autoIndentationEdit;
  _autoClosingEdit;
  constructor(autoIndentationEdit, selection, openCharacter, closeCharacter) {
    const text = openCharacter + closeCharacter;
    const lineNumberDeltaOffset = 0;
    const columnDeltaOffset = openCharacter.length;
    super(selection, text, lineNumberDeltaOffset, columnDeltaOffset, openCharacter, closeCharacter);
    this._autoIndentationEdit = autoIndentationEdit;
    this._autoClosingEdit = { range: selection, text };
  }
  getEditOperations(model, builder) {
    builder.addTrackedEditOperation(this._autoIndentationEdit.range, this._autoIndentationEdit.text);
    builder.addTrackedEditOperation(this._autoClosingEdit.range, this._autoClosingEdit.text);
  }
  computeCursorState(model, helper) {
    const inverseEditOperations = helper.getInverseEditOperations();
    if (inverseEditOperations.length !== 2) {
      throw new Error("There should be two inverse edit operations!");
    }
    const range1 = inverseEditOperations[0].range;
    const range2 = inverseEditOperations[1].range;
    const range = range1.plusRange(range2);
    return this._computeCursorStateWithRange(model, range, helper);
  }
}
function getTypingOperation(typedText, previousTypingOperation) {
  if (typedText === " ") {
    return previousTypingOperation === EditOperationType.TypingFirstSpace || previousTypingOperation === EditOperationType.TypingConsecutiveSpace ? EditOperationType.TypingConsecutiveSpace : EditOperationType.TypingFirstSpace;
  }
  return EditOperationType.TypingOther;
}
__name(getTypingOperation, "getTypingOperation");
function shouldPushStackElementBetween(previousTypingOperation, typingOperation) {
  if (isTypingOperation(previousTypingOperation) && !isTypingOperation(typingOperation)) {
    return true;
  }
  if (previousTypingOperation === EditOperationType.TypingFirstSpace) {
    return false;
  }
  return normalizeOperationType(previousTypingOperation) !== normalizeOperationType(typingOperation);
}
__name(shouldPushStackElementBetween, "shouldPushStackElementBetween");
function normalizeOperationType(type) {
  return type === EditOperationType.TypingConsecutiveSpace || type === EditOperationType.TypingFirstSpace ? "space" : type;
}
__name(normalizeOperationType, "normalizeOperationType");
function isTypingOperation(type) {
  return type === EditOperationType.TypingOther || type === EditOperationType.TypingFirstSpace || type === EditOperationType.TypingConsecutiveSpace;
}
__name(isTypingOperation, "isTypingOperation");
function isAutoClosingOvertype(config, model, selections, autoClosedCharacters, ch) {
  if (config.autoClosingOvertype === "never") {
    return false;
  }
  if (!config.autoClosingPairs.autoClosingPairsCloseSingleChar.has(ch)) {
    return false;
  }
  for (let i = 0, len = selections.length; i < len; i++) {
    const selection = selections[i];
    if (!selection.isEmpty()) {
      return false;
    }
    const position = selection.getPosition();
    const lineText = model.getLineContent(position.lineNumber);
    const afterCharacter = lineText.charAt(position.column - 1);
    if (afterCharacter !== ch) {
      return false;
    }
    const chIsQuote = isQuote(ch);
    const beforeCharacter = position.column > 2 ? lineText.charCodeAt(position.column - 2) : CharCode.Null;
    if (beforeCharacter === CharCode.Backslash && chIsQuote) {
      return false;
    }
    if (config.autoClosingOvertype === "auto") {
      let found = false;
      for (let j = 0, lenJ = autoClosedCharacters.length; j < lenJ; j++) {
        const autoClosedCharacter = autoClosedCharacters[j];
        if (position.lineNumber === autoClosedCharacter.startLineNumber && position.column === autoClosedCharacter.startColumn) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
  }
  return true;
}
__name(isAutoClosingOvertype, "isAutoClosingOvertype");
function typeCommand(range, text, keepPosition) {
  if (keepPosition) {
    return new ReplaceCommandWithoutChangingPosition(range, text, true);
  } else {
    return new ReplaceCommand(range, text, true);
  }
}
__name(typeCommand, "typeCommand");
function shiftIndent(config, indentation, count) {
  count = count || 1;
  return ShiftCommand.shiftIndent(indentation, indentation.length + count, config.tabSize, config.indentSize, config.insertSpaces);
}
__name(shiftIndent, "shiftIndent");
function unshiftIndent(config, indentation, count) {
  count = count || 1;
  return ShiftCommand.unshiftIndent(indentation, indentation.length + count, config.tabSize, config.indentSize, config.insertSpaces);
}
__name(unshiftIndent, "unshiftIndent");
function shouldSurroundChar(config, ch) {
  if (isQuote(ch)) {
    return config.autoSurround === "quotes" || config.autoSurround === "languageDefined";
  } else {
    return config.autoSurround === "brackets" || config.autoSurround === "languageDefined";
  }
}
__name(shouldSurroundChar, "shouldSurroundChar");
export {
  AutoClosingOpenCharTypeOperation,
  AutoClosingOvertypeOperation,
  AutoClosingOvertypeWithInterceptorsOperation,
  AutoIndentOperation,
  BaseTypeWithAutoClosingCommand,
  CompositionOperation,
  EnterOperation,
  InterceptorElectricCharOperation,
  PasteOperation,
  SimpleCharacterTypeOperation,
  SurroundSelectionOperation,
  TabOperation,
  TypeWithoutInterceptorsOperation,
  shiftIndent,
  shouldSurroundChar,
  unshiftIndent
};
//# sourceMappingURL=cursorTypeEditOperations.js.map
