var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Range } from "../../../common/core/range.js";
import { Selection, SelectionDirection } from "../../../common/core/selection.js";
import { ICommand, ICursorStateComputerData, IEditOperationBuilder } from "../../../common/editorCommon.js";
import { ITextModel } from "../../../common/model.js";
class CopyLinesCommand {
  static {
    __name(this, "CopyLinesCommand");
  }
  _selection;
  _isCopyingDown;
  _noop;
  _selectionDirection;
  _selectionId;
  _startLineNumberDelta;
  _endLineNumberDelta;
  constructor(selection, isCopyingDown, noop) {
    this._selection = selection;
    this._isCopyingDown = isCopyingDown;
    this._noop = noop || false;
    this._selectionDirection = SelectionDirection.LTR;
    this._selectionId = null;
    this._startLineNumberDelta = 0;
    this._endLineNumberDelta = 0;
  }
  getEditOperations(model, builder) {
    let s = this._selection;
    this._startLineNumberDelta = 0;
    this._endLineNumberDelta = 0;
    if (s.startLineNumber < s.endLineNumber && s.endColumn === 1) {
      this._endLineNumberDelta = 1;
      s = s.setEndPosition(s.endLineNumber - 1, model.getLineMaxColumn(s.endLineNumber - 1));
    }
    const sourceLines = [];
    for (let i = s.startLineNumber; i <= s.endLineNumber; i++) {
      sourceLines.push(model.getLineContent(i));
    }
    const sourceText = sourceLines.join("\n");
    if (sourceText === "") {
      if (this._isCopyingDown) {
        this._startLineNumberDelta++;
        this._endLineNumberDelta++;
      }
    }
    if (this._noop) {
      builder.addEditOperation(new Range(s.endLineNumber, model.getLineMaxColumn(s.endLineNumber), s.endLineNumber + 1, 1), s.endLineNumber === model.getLineCount() ? "" : "\n");
    } else {
      if (!this._isCopyingDown) {
        builder.addEditOperation(new Range(s.endLineNumber, model.getLineMaxColumn(s.endLineNumber), s.endLineNumber, model.getLineMaxColumn(s.endLineNumber)), "\n" + sourceText);
      } else {
        builder.addEditOperation(new Range(s.startLineNumber, 1, s.startLineNumber, 1), sourceText + "\n");
      }
    }
    this._selectionId = builder.trackSelection(s);
    this._selectionDirection = this._selection.getDirection();
  }
  computeCursorState(model, helper) {
    let result = helper.getTrackedSelection(this._selectionId);
    if (this._startLineNumberDelta !== 0 || this._endLineNumberDelta !== 0) {
      let startLineNumber = result.startLineNumber;
      let startColumn = result.startColumn;
      let endLineNumber = result.endLineNumber;
      let endColumn = result.endColumn;
      if (this._startLineNumberDelta !== 0) {
        startLineNumber = startLineNumber + this._startLineNumberDelta;
        startColumn = 1;
      }
      if (this._endLineNumberDelta !== 0) {
        endLineNumber = endLineNumber + this._endLineNumberDelta;
        endColumn = 1;
      }
      result = Selection.createWithDirection(startLineNumber, startColumn, endLineNumber, endColumn, this._selectionDirection);
    }
    return result;
  }
}
export {
  CopyLinesCommand
};
//# sourceMappingURL=copyLinesCommand.js.map
