declare class c {
    getOffsetRange(e: any): l;
    getRange(e: any): a;
    getStringEdit(e: any): any;
    getStringReplacement(e: any): any;
    getSingleTextEdit(e: any): any;
    getTextEdit(e: any): any;
}
declare function f(r: any): void;
declare class x extends c {
    constructor(e: any);
    text: any;
    a: number[];
    b: any[];
    getOffset(e: any): number;
    c(e: any): any;
    getPosition(e: any): i;
    getTextLength(e: any): any;
    get textLength(): any;
    getLineLength(e: any): number;
}
import { $eD as l } from "../ranges/offsetRange.js";
import { $eC as a } from "../range.js";
import { $dC as i } from "../position.js";
export { c as $$E, f as $_E, x as $aF };
//# sourceMappingURL=positionToOffsetImpl.d.ts.map