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
import * as strings from "../../../../base/common/strings.js";
import { ShiftCommand } from "../../../common/commands/shiftCommand.js";
import { EditorAutoIndentStrategy } from "../../../common/config/editorOptions.js";
import { Range } from "../../../common/core/range.js";
import { Selection } from "../../../common/core/selection.js";
import { ICommand, ICursorStateComputerData, IEditOperationBuilder } from "../../../common/editorCommon.js";
import { ITextModel } from "../../../common/model.js";
import { CompleteEnterAction, IndentAction } from "../../../common/languages/languageConfiguration.js";
import { ILanguageConfigurationService } from "../../../common/languages/languageConfigurationRegistry.js";
import { IndentConsts } from "../../../common/languages/supports/indentRules.js";
import * as indentUtils from "../../indentation/common/indentUtils.js";
import { getGoodIndentForLine, getIndentMetadata, IIndentConverter, IVirtualModel } from "../../../common/languages/autoIndent.js";
import { getEnterAction } from "../../../common/languages/enterAction.js";
let MoveLinesCommand = class {
  constructor(selection, isMovingDown, autoIndent, _languageConfigurationService) {
    this._languageConfigurationService = _languageConfigurationService;
    this._selection = selection;
    this._isMovingDown = isMovingDown;
    this._autoIndent = autoIndent;
    this._selectionId = null;
    this._moveEndLineSelectionShrink = false;
  }
  static {
    __name(this, "MoveLinesCommand");
  }
  _selection;
  _isMovingDown;
  _autoIndent;
  _selectionId;
  _moveEndPositionDown;
  _moveEndLineSelectionShrink;
  getEditOperations(model, builder) {
    const getLanguageId = /* @__PURE__ */ __name(() => {
      return model.getLanguageId();
    }, "getLanguageId");
    const getLanguageIdAtPosition = /* @__PURE__ */ __name((lineNumber, column) => {
      return model.getLanguageIdAtPosition(lineNumber, column);
    }, "getLanguageIdAtPosition");
    const modelLineCount = model.getLineCount();
    if (this._isMovingDown && this._selection.endLineNumber === modelLineCount) {
      this._selectionId = builder.trackSelection(this._selection);
      return;
    }
    if (!this._isMovingDown && this._selection.startLineNumber === 1) {
      this._selectionId = builder.trackSelection(this._selection);
      return;
    }
    this._moveEndPositionDown = false;
    let s = this._selection;
    if (s.startLineNumber < s.endLineNumber && s.endColumn === 1) {
      this._moveEndPositionDown = true;
      s = s.setEndPosition(s.endLineNumber - 1, model.getLineMaxColumn(s.endLineNumber - 1));
    }
    const { tabSize, indentSize, insertSpaces } = model.getOptions();
    const indentConverter = this.buildIndentConverter(tabSize, indentSize, insertSpaces);
    if (s.startLineNumber === s.endLineNumber && model.getLineMaxColumn(s.startLineNumber) === 1) {
      const lineNumber = s.startLineNumber;
      const otherLineNumber = this._isMovingDown ? lineNumber + 1 : lineNumber - 1;
      if (model.getLineMaxColumn(otherLineNumber) === 1) {
        builder.addEditOperation(new Range(1, 1, 1, 1), null);
      } else {
        builder.addEditOperation(new Range(lineNumber, 1, lineNumber, 1), model.getLineContent(otherLineNumber));
        builder.addEditOperation(new Range(otherLineNumber, 1, otherLineNumber, model.getLineMaxColumn(otherLineNumber)), null);
      }
      s = new Selection(otherLineNumber, 1, otherLineNumber, 1);
    } else {
      let movingLineNumber;
      let movingLineText;
      if (this._isMovingDown) {
        movingLineNumber = s.endLineNumber + 1;
        movingLineText = model.getLineContent(movingLineNumber);
        builder.addEditOperation(new Range(movingLineNumber - 1, model.getLineMaxColumn(movingLineNumber - 1), movingLineNumber, model.getLineMaxColumn(movingLineNumber)), null);
        let insertingText = movingLineText;
        if (this.shouldAutoIndent(model, s)) {
          const movingLineMatchResult = this.matchEnterRule(model, indentConverter, tabSize, movingLineNumber, s.startLineNumber - 1);
          if (movingLineMatchResult !== null) {
            const oldIndentation = strings.getLeadingWhitespace(model.getLineContent(movingLineNumber));
            const newSpaceCnt = movingLineMatchResult + indentUtils.getSpaceCnt(oldIndentation, tabSize);
            const newIndentation = indentUtils.generateIndent(newSpaceCnt, tabSize, insertSpaces);
            insertingText = newIndentation + this.trimStart(movingLineText);
          } else {
            const virtualModel = {
              tokenization: {
                getLineTokens: /* @__PURE__ */ __name((lineNumber) => {
                  if (lineNumber === s.startLineNumber) {
                    return model.tokenization.getLineTokens(movingLineNumber);
                  } else {
                    return model.tokenization.getLineTokens(lineNumber);
                  }
                }, "getLineTokens"),
                getLanguageId,
                getLanguageIdAtPosition
              },
              getLineContent: /* @__PURE__ */ __name((lineNumber) => {
                if (lineNumber === s.startLineNumber) {
                  return model.getLineContent(movingLineNumber);
                } else {
                  return model.getLineContent(lineNumber);
                }
              }, "getLineContent")
            };
            const indentOfMovingLine = getGoodIndentForLine(
              this._autoIndent,
              virtualModel,
              model.getLanguageIdAtPosition(movingLineNumber, 1),
              s.startLineNumber,
              indentConverter,
              this._languageConfigurationService
            );
            if (indentOfMovingLine !== null) {
              const oldIndentation = strings.getLeadingWhitespace(model.getLineContent(movingLineNumber));
              const newSpaceCnt = indentUtils.getSpaceCnt(indentOfMovingLine, tabSize);
              const oldSpaceCnt = indentUtils.getSpaceCnt(oldIndentation, tabSize);
              if (newSpaceCnt !== oldSpaceCnt) {
                const newIndentation = indentUtils.generateIndent(newSpaceCnt, tabSize, insertSpaces);
                insertingText = newIndentation + this.trimStart(movingLineText);
              }
            }
          }
          builder.addEditOperation(new Range(s.startLineNumber, 1, s.startLineNumber, 1), insertingText + "\n");
          const ret = this.matchEnterRuleMovingDown(model, indentConverter, tabSize, s.startLineNumber, movingLineNumber, insertingText);
          if (ret !== null) {
            if (ret !== 0) {
              this.getIndentEditsOfMovingBlock(model, builder, s, tabSize, insertSpaces, ret);
            }
          } else {
            const virtualModel = {
              tokenization: {
                getLineTokens: /* @__PURE__ */ __name((lineNumber) => {
                  if (lineNumber === s.startLineNumber) {
                    return model.tokenization.getLineTokens(movingLineNumber);
                  } else if (lineNumber >= s.startLineNumber + 1 && lineNumber <= s.endLineNumber + 1) {
                    return model.tokenization.getLineTokens(lineNumber - 1);
                  } else {
                    return model.tokenization.getLineTokens(lineNumber);
                  }
                }, "getLineTokens"),
                getLanguageId,
                getLanguageIdAtPosition
              },
              getLineContent: /* @__PURE__ */ __name((lineNumber) => {
                if (lineNumber === s.startLineNumber) {
                  return insertingText;
                } else if (lineNumber >= s.startLineNumber + 1 && lineNumber <= s.endLineNumber + 1) {
                  return model.getLineContent(lineNumber - 1);
                } else {
                  return model.getLineContent(lineNumber);
                }
              }, "getLineContent")
            };
            const newIndentatOfMovingBlock = getGoodIndentForLine(
              this._autoIndent,
              virtualModel,
              model.getLanguageIdAtPosition(movingLineNumber, 1),
              s.startLineNumber + 1,
              indentConverter,
              this._languageConfigurationService
            );
            if (newIndentatOfMovingBlock !== null) {
              const oldIndentation = strings.getLeadingWhitespace(model.getLineContent(s.startLineNumber));
              const newSpaceCnt = indentUtils.getSpaceCnt(newIndentatOfMovingBlock, tabSize);
              const oldSpaceCnt = indentUtils.getSpaceCnt(oldIndentation, tabSize);
              if (newSpaceCnt !== oldSpaceCnt) {
                const spaceCntOffset = newSpaceCnt - oldSpaceCnt;
                this.getIndentEditsOfMovingBlock(model, builder, s, tabSize, insertSpaces, spaceCntOffset);
              }
            }
          }
        } else {
          builder.addEditOperation(new Range(s.startLineNumber, 1, s.startLineNumber, 1), insertingText + "\n");
        }
      } else {
        movingLineNumber = s.startLineNumber - 1;
        movingLineText = model.getLineContent(movingLineNumber);
        builder.addEditOperation(new Range(movingLineNumber, 1, movingLineNumber + 1, 1), null);
        builder.addEditOperation(new Range(s.endLineNumber, model.getLineMaxColumn(s.endLineNumber), s.endLineNumber, model.getLineMaxColumn(s.endLineNumber)), "\n" + movingLineText);
        if (this.shouldAutoIndent(model, s)) {
          const virtualModel = {
            tokenization: {
              getLineTokens: /* @__PURE__ */ __name((lineNumber) => {
                if (lineNumber === movingLineNumber) {
                  return model.tokenization.getLineTokens(s.startLineNumber);
                } else {
                  return model.tokenization.getLineTokens(lineNumber);
                }
              }, "getLineTokens"),
              getLanguageId,
              getLanguageIdAtPosition
            },
            getLineContent: /* @__PURE__ */ __name((lineNumber) => {
              if (lineNumber === movingLineNumber) {
                return model.getLineContent(s.startLineNumber);
              } else {
                return model.getLineContent(lineNumber);
              }
            }, "getLineContent")
          };
          const ret = this.matchEnterRule(model, indentConverter, tabSize, s.startLineNumber, s.startLineNumber - 2);
          if (ret !== null) {
            if (ret !== 0) {
              this.getIndentEditsOfMovingBlock(model, builder, s, tabSize, insertSpaces, ret);
            }
          } else {
            const indentOfFirstLine = getGoodIndentForLine(
              this._autoIndent,
              virtualModel,
              model.getLanguageIdAtPosition(s.startLineNumber, 1),
              movingLineNumber,
              indentConverter,
              this._languageConfigurationService
            );
            if (indentOfFirstLine !== null) {
              const oldIndent = strings.getLeadingWhitespace(model.getLineContent(s.startLineNumber));
              const newSpaceCnt = indentUtils.getSpaceCnt(indentOfFirstLine, tabSize);
              const oldSpaceCnt = indentUtils.getSpaceCnt(oldIndent, tabSize);
              if (newSpaceCnt !== oldSpaceCnt) {
                const spaceCntOffset = newSpaceCnt - oldSpaceCnt;
                this.getIndentEditsOfMovingBlock(model, builder, s, tabSize, insertSpaces, spaceCntOffset);
              }
            }
          }
        }
      }
    }
    this._selectionId = builder.trackSelection(s);
  }
  buildIndentConverter(tabSize, indentSize, insertSpaces) {
    return {
      shiftIndent: /* @__PURE__ */ __name((indentation) => {
        return ShiftCommand.shiftIndent(indentation, indentation.length + 1, tabSize, indentSize, insertSpaces);
      }, "shiftIndent"),
      unshiftIndent: /* @__PURE__ */ __name((indentation) => {
        return ShiftCommand.unshiftIndent(indentation, indentation.length + 1, tabSize, indentSize, insertSpaces);
      }, "unshiftIndent")
    };
  }
  parseEnterResult(model, indentConverter, tabSize, line, enter) {
    if (enter) {
      let enterPrefix = enter.indentation;
      if (enter.indentAction === IndentAction.None) {
        enterPrefix = enter.indentation + enter.appendText;
      } else if (enter.indentAction === IndentAction.Indent) {
        enterPrefix = enter.indentation + enter.appendText;
      } else if (enter.indentAction === IndentAction.IndentOutdent) {
        enterPrefix = enter.indentation;
      } else if (enter.indentAction === IndentAction.Outdent) {
        enterPrefix = indentConverter.unshiftIndent(enter.indentation) + enter.appendText;
      }
      const movingLineText = model.getLineContent(line);
      if (this.trimStart(movingLineText).indexOf(this.trimStart(enterPrefix)) >= 0) {
        const oldIndentation = strings.getLeadingWhitespace(model.getLineContent(line));
        let newIndentation = strings.getLeadingWhitespace(enterPrefix);
        const indentMetadataOfMovelingLine = getIndentMetadata(model, line, this._languageConfigurationService);
        if (indentMetadataOfMovelingLine !== null && indentMetadataOfMovelingLine & IndentConsts.DECREASE_MASK) {
          newIndentation = indentConverter.unshiftIndent(newIndentation);
        }
        const newSpaceCnt = indentUtils.getSpaceCnt(newIndentation, tabSize);
        const oldSpaceCnt = indentUtils.getSpaceCnt(oldIndentation, tabSize);
        return newSpaceCnt - oldSpaceCnt;
      }
    }
    return null;
  }
  /**
   *
   * @param model
   * @param indentConverter
   * @param tabSize
   * @param line the line moving down
   * @param futureAboveLineNumber the line which will be at the `line` position
   * @param futureAboveLineText
   */
  matchEnterRuleMovingDown(model, indentConverter, tabSize, line, futureAboveLineNumber, futureAboveLineText) {
    if (strings.lastNonWhitespaceIndex(futureAboveLineText) >= 0) {
      const maxColumn = model.getLineMaxColumn(futureAboveLineNumber);
      const enter = getEnterAction(this._autoIndent, model, new Range(futureAboveLineNumber, maxColumn, futureAboveLineNumber, maxColumn), this._languageConfigurationService);
      return this.parseEnterResult(model, indentConverter, tabSize, line, enter);
    } else {
      let validPrecedingLine = line - 1;
      while (validPrecedingLine >= 1) {
        const lineContent = model.getLineContent(validPrecedingLine);
        const nonWhitespaceIdx = strings.lastNonWhitespaceIndex(lineContent);
        if (nonWhitespaceIdx >= 0) {
          break;
        }
        validPrecedingLine--;
      }
      if (validPrecedingLine < 1 || line > model.getLineCount()) {
        return null;
      }
      const maxColumn = model.getLineMaxColumn(validPrecedingLine);
      const enter = getEnterAction(this._autoIndent, model, new Range(validPrecedingLine, maxColumn, validPrecedingLine, maxColumn), this._languageConfigurationService);
      return this.parseEnterResult(model, indentConverter, tabSize, line, enter);
    }
  }
  matchEnterRule(model, indentConverter, tabSize, line, oneLineAbove, previousLineText) {
    let validPrecedingLine = oneLineAbove;
    while (validPrecedingLine >= 1) {
      let lineContent;
      if (validPrecedingLine === oneLineAbove && previousLineText !== void 0) {
        lineContent = previousLineText;
      } else {
        lineContent = model.getLineContent(validPrecedingLine);
      }
      const nonWhitespaceIdx = strings.lastNonWhitespaceIndex(lineContent);
      if (nonWhitespaceIdx >= 0) {
        break;
      }
      validPrecedingLine--;
    }
    if (validPrecedingLine < 1 || line > model.getLineCount()) {
      return null;
    }
    const maxColumn = model.getLineMaxColumn(validPrecedingLine);
    const enter = getEnterAction(this._autoIndent, model, new Range(validPrecedingLine, maxColumn, validPrecedingLine, maxColumn), this._languageConfigurationService);
    return this.parseEnterResult(model, indentConverter, tabSize, line, enter);
  }
  trimStart(str) {
    return str.replace(/^\s+/, "");
  }
  shouldAutoIndent(model, selection) {
    if (this._autoIndent < EditorAutoIndentStrategy.Full) {
      return false;
    }
    if (!model.tokenization.isCheapToTokenize(selection.startLineNumber)) {
      return false;
    }
    const languageAtSelectionStart = model.getLanguageIdAtPosition(selection.startLineNumber, 1);
    const languageAtSelectionEnd = model.getLanguageIdAtPosition(selection.endLineNumber, 1);
    if (languageAtSelectionStart !== languageAtSelectionEnd) {
      return false;
    }
    if (this._languageConfigurationService.getLanguageConfiguration(languageAtSelectionStart).indentRulesSupport === null) {
      return false;
    }
    return true;
  }
  getIndentEditsOfMovingBlock(model, builder, s, tabSize, insertSpaces, offset) {
    for (let i = s.startLineNumber; i <= s.endLineNumber; i++) {
      const lineContent = model.getLineContent(i);
      const originalIndent = strings.getLeadingWhitespace(lineContent);
      const originalSpacesCnt = indentUtils.getSpaceCnt(originalIndent, tabSize);
      const newSpacesCnt = originalSpacesCnt + offset;
      const newIndent = indentUtils.generateIndent(newSpacesCnt, tabSize, insertSpaces);
      if (newIndent !== originalIndent) {
        builder.addEditOperation(new Range(i, 1, i, originalIndent.length + 1), newIndent);
        if (i === s.endLineNumber && s.endColumn <= originalIndent.length + 1 && newIndent === "") {
          this._moveEndLineSelectionShrink = true;
        }
      }
    }
  }
  computeCursorState(model, helper) {
    let result = helper.getTrackedSelection(this._selectionId);
    if (this._moveEndPositionDown) {
      result = result.setEndPosition(result.endLineNumber + 1, 1);
    }
    if (this._moveEndLineSelectionShrink && result.startLineNumber < result.endLineNumber) {
      result = result.setEndPosition(result.endLineNumber, 2);
    }
    return result;
  }
};
MoveLinesCommand = __decorateClass([
  __decorateParam(3, ILanguageConfigurationService)
], MoveLinesCommand);
export {
  MoveLinesCommand
};
//# sourceMappingURL=moveLinesCommand.js.map
