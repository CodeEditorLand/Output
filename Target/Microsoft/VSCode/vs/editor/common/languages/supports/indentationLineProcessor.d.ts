declare class O {
    constructor(e: any, t: any, n: any);
    a: any;
    b: k;
    shouldIncrease(e: any, t: any): any;
    shouldDecrease(e: any, t: any): any;
    shouldIgnore(e: any, t: any): any;
    shouldIndentNextLine(e: any, t: any): any;
}
declare class z {
    constructor(e: any, t: any);
    a: any;
    b: k;
    getProcessedTokenContextAroundRange(e: any): {
        beforeRangeProcessedTokens: h;
        afterRangeProcessedTokens: h;
        previousLineProcessedTokens: h;
    };
    c(e: any): h;
    d(e: any): h;
    e(e: any): h;
}
declare function m(d: any, e: any): boolean;
declare class k {
    constructor(e: any, t: any);
    a: any;
    b: any;
    getProcessedLine(e: any, t: any): any;
    getProcessedTokens(e: any): h;
}
import { $gD as h } from "../../tokens/lineTokens.js";
export { O as $_ab, z as $abb, m as $bbb };
//# sourceMappingURL=indentationLineProcessor.d.ts.map