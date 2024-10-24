var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Position } from "../../../common/core/position.js";
import { Range } from "../../../common/core/range.js";
import { Selection } from "../../../common/core/selection.js";
import { ICommand, ICursorStateComputerData, IEditOperationBuilder } from "../../../common/editorCommon.js";
import { ITextModel } from "../../../common/model.js";
class DragAndDropCommand {
  static {
    __name(this, "DragAndDropCommand");
  }
  selection;
  targetPosition;
  targetSelection;
  copy;
  constructor(selection, targetPosition, copy) {
    this.selection = selection;
    this.targetPosition = targetPosition;
    this.copy = copy;
    this.targetSelection = null;
  }
  getEditOperations(model, builder) {
    const text = model.getValueInRange(this.selection);
    if (!this.copy) {
      builder.addEditOperation(this.selection, null);
    }
    builder.addEditOperation(new Range(this.targetPosition.lineNumber, this.targetPosition.column, this.targetPosition.lineNumber, this.targetPosition.column), text);
    if (this.selection.containsPosition(this.targetPosition) && !(this.copy && (this.selection.getEndPosition().equals(this.targetPosition) || this.selection.getStartPosition().equals(this.targetPosition)))) {
      this.targetSelection = this.selection;
      return;
    }
    if (this.copy) {
      this.targetSelection = new Selection(
        this.targetPosition.lineNumber,
        this.targetPosition.column,
        this.selection.endLineNumber - this.selection.startLineNumber + this.targetPosition.lineNumber,
        this.selection.startLineNumber === this.selection.endLineNumber ? this.targetPosition.column + this.selection.endColumn - this.selection.startColumn : this.selection.endColumn
      );
      return;
    }
    if (this.targetPosition.lineNumber > this.selection.endLineNumber) {
      this.targetSelection = new Selection(
        this.targetPosition.lineNumber - this.selection.endLineNumber + this.selection.startLineNumber,
        this.targetPosition.column,
        this.targetPosition.lineNumber,
        this.selection.startLineNumber === this.selection.endLineNumber ? this.targetPosition.column + this.selection.endColumn - this.selection.startColumn : this.selection.endColumn
      );
      return;
    }
    if (this.targetPosition.lineNumber < this.selection.endLineNumber) {
      this.targetSelection = new Selection(
        this.targetPosition.lineNumber,
        this.targetPosition.column,
        this.targetPosition.lineNumber + this.selection.endLineNumber - this.selection.startLineNumber,
        this.selection.startLineNumber === this.selection.endLineNumber ? this.targetPosition.column + this.selection.endColumn - this.selection.startColumn : this.selection.endColumn
      );
      return;
    }
    if (this.selection.endColumn <= this.targetPosition.column) {
      this.targetSelection = new Selection(
        this.targetPosition.lineNumber - this.selection.endLineNumber + this.selection.startLineNumber,
        this.selection.startLineNumber === this.selection.endLineNumber ? this.targetPosition.column - this.selection.endColumn + this.selection.startColumn : this.targetPosition.column - this.selection.endColumn + this.selection.startColumn,
        this.targetPosition.lineNumber,
        this.selection.startLineNumber === this.selection.endLineNumber ? this.targetPosition.column : this.selection.endColumn
      );
    } else {
      this.targetSelection = new Selection(
        this.targetPosition.lineNumber - this.selection.endLineNumber + this.selection.startLineNumber,
        this.targetPosition.column,
        this.targetPosition.lineNumber,
        this.targetPosition.column + this.selection.endColumn - this.selection.startColumn
      );
    }
  }
  computeCursorState(model, helper) {
    return this.targetSelection;
  }
}
export {
  DragAndDropCommand
};
//# sourceMappingURL=dragAndDropCommand.js.map
