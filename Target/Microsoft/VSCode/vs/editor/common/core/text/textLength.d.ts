export { u as $UD };
declare class u {
    static lengthDiffNonNegative(n: any, t: any): u | undefined;
    static betweenPositions(n: any, t: any): u;
    static fromPosition(n: any): u;
    static ofRange(n: any): u;
    static ofText(n: any): u;
    constructor(n: any, t: any);
    lineCount: any;
    columnCount: any;
    isZero(): boolean;
    isLessThan(n: any): boolean;
    isGreaterThan(n: any): boolean;
    isGreaterThanOrEqualTo(n: any): boolean;
    equals(n: any): boolean;
    compare(n: any): number;
    add(n: any): u;
    createRange(n: any): e;
    toRange(): e;
    toLineRange(): r;
    addToPosition(n: any): o;
    addToRange(n: any): e;
    toString(): string;
}
import { $eC as e } from "../range.js";
import { $oD as r } from "../ranges/lineRange.js";
import { $dC as o } from "../position.js";
//# sourceMappingURL=textLength.d.ts.map