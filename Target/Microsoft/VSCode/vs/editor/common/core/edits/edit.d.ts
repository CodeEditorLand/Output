declare class E {
    constructor(e: any);
    replacements: any;
    equals(e: any): boolean;
    toString(): string;
    normalize(): any;
    compose(e: any): any;
    decomposeSplit(e: any): {
        e1: any;
        e2: any;
    };
    getNewRanges(): l[];
    getJoinedReplaceRange(): any;
    isEmpty(): boolean;
    getLengthDelta(): any;
    getNewDataLength(e: any): any;
    applyToOffset(e: any): any;
    applyToOffsetRange(e: any): l;
    applyInverseToOffset(e: any): any;
    applyToOffsetOrUndefined(e: any): any;
    applyToOffsetRangeOrUndefined(e: any): l | undefined;
}
declare class y {
    constructor(e: any);
    replaceRange: any;
    delta(e: any): any;
    getLengthDelta(): number;
    toString(): string;
    get isEmpty(): boolean;
    getRangeAfterReplace(): l;
}
declare class o extends E {
    static create(e: any): o;
    static single(e: any): o;
    a(e: any): o;
}
declare class u extends y {
    constructor(e: any, t: any, n: any);
    newLength: any;
    annotation: any;
    equals(e: any): any;
    getNewLength(): any;
    tryJoinTouching(e: any): u | undefined;
    slice(e: any, t: any): u;
}
import { $eD as l } from "../ranges/offsetRange.js";
export { E as $fF, y as $gF, o as $hF, u as $iF };
//# sourceMappingURL=edit.d.ts.map