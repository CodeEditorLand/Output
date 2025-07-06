declare class m extends c {
    constructor(t: any, n: any);
    firstInput: any;
    smartCombination: any;
    get kind(): any;
    swap(): m;
    withInputValue(t: any, n: any, i?: boolean): this | g | h;
    equals(t: any): boolean;
    getInput(t: any): 1 | 2;
}
declare class O extends c {
    get kind(): any;
    swap(): this;
    withInputValue(t: any, n: any, i?: boolean): any;
    equals(t: any): boolean;
}
declare class V {
    static fromDiffs(t: any, n: any, i: any, s: any, u: any): V[];
    constructor(t: any, n: any, i: any, s: any, u: any, f: any, o: any, b: any);
    baseRange: any;
    baseTextModel: any;
    input1Range: any;
    input1TextModel: any;
    input1Diffs: any;
    input2Range: any;
    input2TextModel: any;
    input2Diffs: any;
    input1CombinedDiff: any;
    input2CombinedDiff: any;
    isEqualChange: boolean;
    c: T | null | undefined;
    e: T | null | undefined;
    g: T | null;
    h: T | null;
    getInputRange(t: any): any;
    getInputCombinedDiff(t: any): any;
    getInputDiffs(t: any): any;
    get isConflicting(): boolean;
    get canBeCombined(): boolean;
    get isOrderRelevant(): boolean;
    getEditForBase(t: any): {
        edit: any;
        effectiveState: any;
    };
    f(t: any): T | undefined;
    i(t: any): T;
}
declare function I(e: any): 1 | 2;
declare class c {
    get includesInput1(): boolean;
    get includesInput2(): boolean;
    includesInput(t: any): boolean;
    isInputIncluded(t: any): boolean;
    toggle(t: any): any;
    getInput(t: any): 0 | 1;
}
declare class D extends c {
    get kind(): any;
    swap(): this;
    withInputValue(t: any, n: any, i?: boolean): g | h;
    equals(t: any): boolean;
}
declare class g extends c {
    get kind(): any;
    swap(): h;
    withInputValue(t: any, n: any, i?: boolean): m | D | h;
    equals(t: any): boolean;
}
declare class h extends c {
    get kind(): any;
    swap(): g;
    withInputValue(t: any, n: any, i?: boolean): m | D | h;
    equals(t: any): boolean;
}
declare var E: any;
declare var a: any;
declare var r: any;
import { $GRb as T } from "./editing.js";
export { m as $1Rb, O as $2Rb, V as $URb, I as $VRb, c as $WRb, D as $XRb, g as $YRb, h as $ZRb, E as InputState, a as ModifiedBaseRangeState, r as ModifiedBaseRangeStateKind };
//# sourceMappingURL=modifiedBaseRange.d.ts.map