declare class B extends b {
    constructor(t: any, n: any, r: any);
    get isApplyingChange(): boolean;
    h: any;
    j: any;
    m: any;
    a: number;
    b: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    c: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    f: w;
    g: boolean;
    n: boolean;
    get state(): import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    get diffs(): import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    r(t: any): void;
    s(): void;
    removeDiffs(t: any, n: any, r: any): void;
    applyEditRelativeToOriginal(t: any, n: any, r: any): void;
    findTouchingDiffs(t: any): any;
    t(t: any, n: any): any;
    getResultLineRange(t: any, n: any): a;
}
declare var l: any;
declare var c: any;
import { $vd as b } from "../../../../../base/common/lifecycle.js";
import { $e$ as w } from "../../../../../base/common/controlFlow.js";
import { $FRb as a } from "./lineRange.js";
export { B as $7Rb, l as TextModelDiffChangeReason, c as TextModelDiffState };
//# sourceMappingURL=textModelDiffs.d.ts.map