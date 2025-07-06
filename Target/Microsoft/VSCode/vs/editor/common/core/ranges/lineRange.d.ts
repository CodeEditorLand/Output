declare class u {
    static ofLength(e: any, t: any): u;
    static fromRange(e: any): u;
    static fromRangeInclusive(e: any): u;
    static subtract(e: any, t: any): any[];
    static joinMany(e: any): any[];
    static join(e: any): u;
    static deserialize(e: any): u;
    constructor(e: any, t: any);
    startLineNumber: any;
    endLineNumberExclusive: any;
    contains(e: any): boolean;
    containsRange(e: any): boolean;
    get isEmpty(): boolean;
    delta(e: any): u;
    deltaLength(e: any): u;
    get length(): number;
    join(e: any): u;
    toString(): string;
    intersect(e: any): u | undefined;
    intersectsStrict(e: any): boolean;
    intersectsOrTouches(e: any): boolean;
    equals(e: any): boolean;
    toInclusiveRange(): N | null;
    toExclusiveRange(): N;
    mapToLineArray(e: any): any[];
    forEach(e: any): void;
    serialize(): any[];
    toOffsetRange(): d;
    distanceToRange(e: any): number;
    distanceToLine(e: any): number;
    addMargin(e: any, t: any): u;
}
declare class m {
    constructor(e?: any[]);
    c: any[];
    get ranges(): any[];
    addRange(e: any): void;
    contains(e: any): boolean;
    intersects(e: any): boolean;
    getUnion(e: any): any;
    subtractFrom(e: any): m;
    toString(): string;
    getIntersection(e: any): m;
    getWithDelta(e: any): m;
}
import { $eC as N } from "../range.js";
import { $eD as d } from "./offsetRange.js";
export { u as $oD, m as $pD };
//# sourceMappingURL=lineRange.d.ts.map