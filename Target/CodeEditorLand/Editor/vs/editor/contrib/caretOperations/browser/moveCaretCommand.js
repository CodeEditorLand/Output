var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Range } from "../../../common/core/range.js";
import { Selection } from "../../../common/core/selection.js";
import { ICommand, ICursorStateComputerData, IEditOperationBuilder } from "../../../common/editorCommon.js";
import { ITextModel } from "../../../common/model.js";
class MoveCaretCommand {
  static {
    __name(this, "MoveCaretCommand");
  }
  _selection;
  _isMovingLeft;
  constructor(selection, isMovingLeft) {
    this._selection = selection;
    this._isMovingLeft = isMovingLeft;
  }
  getEditOperations(model, builder) {
    if (this._selection.startLineNumber !== this._selection.endLineNumber || this._selection.isEmpty()) {
      return;
    }
    const lineNumber = this._selection.startLineNumber;
    const startColumn = this._selection.startColumn;
    const endColumn = this._selection.endColumn;
    if (this._isMovingLeft && startColumn === 1) {
      return;
    }
    if (!this._isMovingLeft && endColumn === model.getLineMaxColumn(lineNumber)) {
      return;
    }
    if (this._isMovingLeft) {
      const rangeBefore = new Range(lineNumber, startColumn - 1, lineNumber, startColumn);
      const charBefore = model.getValueInRange(rangeBefore);
      builder.addEditOperation(rangeBefore, null);
      builder.addEditOperation(new Range(lineNumber, endColumn, lineNumber, endColumn), charBefore);
    } else {
      const rangeAfter = new Range(lineNumber, endColumn, lineNumber, endColumn + 1);
      const charAfter = model.getValueInRange(rangeAfter);
      builder.addEditOperation(rangeAfter, null);
      builder.addEditOperation(new Range(lineNumber, startColumn, lineNumber, startColumn), charAfter);
    }
  }
  computeCursorState(model, helper) {
    if (this._isMovingLeft) {
      return new Selection(this._selection.startLineNumber, this._selection.startColumn - 1, this._selection.endLineNumber, this._selection.endColumn - 1);
    } else {
      return new Selection(this._selection.startLineNumber, this._selection.startColumn + 1, this._selection.endLineNumber, this._selection.endColumn + 1);
    }
  }
}
export {
  MoveCaretCommand
};
//# sourceMappingURL=moveCaretCommand.js.map
