declare class f {
    constructor(t: any, n: any, e: any);
    lineNumber: any;
    column: any;
    leftoverVisibleColumns: any;
}
declare class r {
    static leftPosition(t: any, n: any): any;
    static a(t: any, n: any, e: any): any;
    static b(t: any, n: any, e: any): f;
    static moveLeft(t: any, n: any, e: any, i: any, s: any): any;
    static c(t: any, n: any): c;
    static d(t: any, n: any, e: any): any;
    static rightPosition(t: any, n: any, e: any): c;
    static rightPositionAtomicSoftTabs(t: any, n: any, e: any, i: any, s: any): c;
    static right(t: any, n: any, e: any): f;
    static moveRight(t: any, n: any, e: any, i: any, s: any): any;
    static vertical(t: any, n: any, e: any, i: any, s: any, o: any, l: any, u: any): f;
    static down(t: any, n: any, e: any, i: any, s: any, o: any, l: any): f;
    static moveDown(t: any, n: any, e: any, i: any, s: any): any;
    static translateDown(t: any, n: any, e: any): v;
    static up(t: any, n: any, e: any, i: any, s: any, o: any, l: any): f;
    static moveUp(t: any, n: any, e: any, i: any, s: any): any;
    static translateUp(t: any, n: any, e: any): v;
    static e(t: any, n: any): boolean;
    static moveToPrevBlankLine(t: any, n: any, e: any, i: any): any;
    static moveToNextBlankLine(t: any, n: any, e: any, i: any): any;
    static moveToBeginningOfLine(t: any, n: any, e: any, i: any): any;
    static moveToEndOfLine(t: any, n: any, e: any, i: any, s: any): any;
    static moveToBeginningOfBuffer(t: any, n: any, e: any, i: any): any;
    static moveToEndOfBuffer(t: any, n: any, e: any, i: any): any;
}
import { $dC as c } from "../core/position.js";
import { $Y_ as v } from "../cursorCommon.js";
export { f as $1ab, r as $2ab };
//# sourceMappingURL=cursorMoveOperations.d.ts.map