var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { IPosition, Position } from "./position.js";
import { Range } from "./range.js";
var SelectionDirection = /* @__PURE__ */ ((SelectionDirection2) => {
  SelectionDirection2[SelectionDirection2["LTR"] = 0] = "LTR";
  SelectionDirection2[SelectionDirection2["RTL"] = 1] = "RTL";
  return SelectionDirection2;
})(SelectionDirection || {});
class Selection extends Range {
  static {
    __name(this, "Selection");
  }
  /**
   * The line number on which the selection has started.
   */
  selectionStartLineNumber;
  /**
   * The column on `selectionStartLineNumber` where the selection has started.
   */
  selectionStartColumn;
  /**
   * The line number on which the selection has ended.
   */
  positionLineNumber;
  /**
   * The column on `positionLineNumber` where the selection has ended.
   */
  positionColumn;
  constructor(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
    super(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn);
    this.selectionStartLineNumber = selectionStartLineNumber;
    this.selectionStartColumn = selectionStartColumn;
    this.positionLineNumber = positionLineNumber;
    this.positionColumn = positionColumn;
  }
  /**
   * Transform to a human-readable representation.
   */
  toString() {
    return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
  }
  /**
   * Test if equals other selection.
   */
  equalsSelection(other) {
    return Selection.selectionsEqual(this, other);
  }
  /**
   * Test if the two selections are equal.
   */
  static selectionsEqual(a, b) {
    return a.selectionStartLineNumber === b.selectionStartLineNumber && a.selectionStartColumn === b.selectionStartColumn && a.positionLineNumber === b.positionLineNumber && a.positionColumn === b.positionColumn;
  }
  /**
   * Get directions (LTR or RTL).
   */
  getDirection() {
    if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
      return 0 /* LTR */;
    }
    return 1 /* RTL */;
  }
  /**
   * Create a new selection with a different `positionLineNumber` and `positionColumn`.
   */
  setEndPosition(endLineNumber, endColumn) {
    if (this.getDirection() === 0 /* LTR */) {
      return new Selection(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    }
    return new Selection(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
  }
  /**
   * Get the position at `positionLineNumber` and `positionColumn`.
   */
  getPosition() {
    return new Position(this.positionLineNumber, this.positionColumn);
  }
  /**
   * Get the position at the start of the selection.
  */
  getSelectionStart() {
    return new Position(this.selectionStartLineNumber, this.selectionStartColumn);
  }
  /**
   * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
   */
  setStartPosition(startLineNumber, startColumn) {
    if (this.getDirection() === 0 /* LTR */) {
      return new Selection(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    }
    return new Selection(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
  }
  // ----
  /**
   * Create a `Selection` from one or two positions
   */
  static fromPositions(start, end = start) {
    return new Selection(start.lineNumber, start.column, end.lineNumber, end.column);
  }
  /**
   * Creates a `Selection` from a range, given a direction.
   */
  static fromRange(range, direction) {
    if (direction === 0 /* LTR */) {
      return new Selection(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    } else {
      return new Selection(range.endLineNumber, range.endColumn, range.startLineNumber, range.startColumn);
    }
  }
  /**
   * Create a `Selection` from an `ISelection`.
   */
  static liftSelection(sel) {
    return new Selection(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
  }
  /**
   * `a` equals `b`.
   */
  static selectionsArrEqual(a, b) {
    if (a && !b || !a && b) {
      return false;
    }
    if (!a && !b) {
      return true;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0, len = a.length; i < len; i++) {
      if (!this.selectionsEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Test if `obj` is an `ISelection`.
   */
  static isISelection(obj) {
    return obj && typeof obj.selectionStartLineNumber === "number" && typeof obj.selectionStartColumn === "number" && typeof obj.positionLineNumber === "number" && typeof obj.positionColumn === "number";
  }
  /**
   * Create with a direction.
   */
  static createWithDirection(startLineNumber, startColumn, endLineNumber, endColumn, direction) {
    if (direction === 0 /* LTR */) {
      return new Selection(startLineNumber, startColumn, endLineNumber, endColumn);
    }
    return new Selection(endLineNumber, endColumn, startLineNumber, startColumn);
  }
}
export {
  Selection,
  SelectionDirection
};
//# sourceMappingURL=selection.js.map
