declare class f {
    static inverse(e: any, i: any, r: any): f[];
    static clip(e: any, i: any, r: any): f[];
    constructor(e: any, i: any);
    original: any;
    modified: any;
    toString(): string;
    flip(): f;
    join(e: any): f;
    get changedLineCount(): number;
    toRangeMapping(): d;
    toRangeMapping2(e: any, i: any): d;
}
declare class h extends f {
    static toTextEdit(e: any, i: any): v;
    static fromRangeMappings(e: any): h;
    constructor(e: any, i: any, r: any);
    innerChanges: any;
    flip(): h;
    withInnerChangesFromLineRanges(): h;
}
declare class d {
    static fromEdit(e: any): any;
    static fromEditJoin(e: any): any;
    static join(e: any): any;
    static assertSorted(e: any): void;
    constructor(e: any, i: any);
    originalRange: any;
    modifiedRange: any;
    toString(): string;
    flip(): d;
    toTextEdit(e: any): x;
    join(e: any): d;
}
declare function G(n: any, e: any, i: any, r?: boolean): h[];
declare function S(n: any, e: any, i: any): h;
declare function P(n: any): f;
import { $rF as v } from "../core/edits/textEdit.js";
import { $sF as x } from "../core/edits/textEdit.js";
export { f as $nM, h as $oM, d as $pM, G as $qM, S as $rM, P as $sM };
//# sourceMappingURL=rangeMapping.d.ts.map