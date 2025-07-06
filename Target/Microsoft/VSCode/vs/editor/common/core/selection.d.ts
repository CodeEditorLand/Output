declare class i extends m {
    static selectionsEqual(t: any, e: any): boolean;
    static fromPositions(t: any, e?: any): i;
    static fromRange(t: any, e: any): i;
    static liftSelection(t: any): i;
    static selectionsArrEqual(t: any, e: any): boolean;
    static isISelection(t: any): any;
    static createWithDirection(t: any, e: any, n: any, r: any, l: any): i;
    selectionStartLineNumber: any;
    selectionStartColumn: any;
    positionLineNumber: any;
    positionColumn: any;
    equalsSelection(t: any): boolean;
    getDirection(): 0 | 1;
    setEndPosition(t: any, e: any): i;
    getPosition(): o;
    getSelectionStart(): o;
    setStartPosition(t: any, e: any): i;
}
declare var u: any;
import { $eC as m } from "./range.js";
import { $dC as o } from "./position.js";
export { i as $UC, u as SelectionDirection };
//# sourceMappingURL=selection.d.ts.map