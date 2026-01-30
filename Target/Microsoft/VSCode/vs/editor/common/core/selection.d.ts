export class Selection extends Range {
    /**
     * Test if the two selections are equal.
     */
    static selectionsEqual(a: any, b: any): boolean;
    /**
     * Create a `Selection` from one or two positions
     */
    static fromPositions(start: any, end?: any): Selection;
    /**
     * Creates a `Selection` from a range, given a direction.
     */
    static fromRange(range: any, direction: any): Selection;
    /**
     * Create a `Selection` from an `ISelection`.
     */
    static liftSelection(sel: any): Selection;
    /**
     * `a` equals `b`.
     */
    static selectionsArrEqual(a: any, b: any): boolean;
    /**
     * Test if `obj` is an `ISelection`.
     */
    static isISelection(obj: any): boolean;
    /**
     * Create with a direction.
     */
    static createWithDirection(startLineNumber: any, startColumn: any, endLineNumber: any, endColumn: any, direction: any): Selection;
    constructor(selectionStartLineNumber: any, selectionStartColumn: any, positionLineNumber: any, positionColumn: any);
    selectionStartLineNumber: any;
    selectionStartColumn: any;
    positionLineNumber: any;
    positionColumn: any;
    /**
     * Test if equals other selection.
     */
    equalsSelection(other: any): boolean;
    /**
     * Get directions (LTR or RTL).
     */
    getDirection(): 0 | 1;
    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */
    setEndPosition(endLineNumber: any, endColumn: any): Selection;
    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */
    getPosition(): Position;
    /**
     * Get the position at the start of the selection.
    */
    getSelectionStart(): Position;
    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */
    setStartPosition(startLineNumber: any, startColumn: any): Selection;
}
export var SelectionDirection: any;
import { Range } from "./range.js";
import { Position } from "./position.js";
//# sourceMappingURL=selection.d.ts.map