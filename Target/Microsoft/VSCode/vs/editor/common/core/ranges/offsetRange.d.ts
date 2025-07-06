declare class e {
    static fromTo(t: any, s: any): e;
    static addRange(t: any, s: any): void;
    static tryCreate(t: any, s: any): e | undefined;
    static ofLength(t: any): e;
    static ofStartAndLength(t: any, s: any): e;
    static emptyAt(t: any): e;
    constructor(t: any, s: any);
    start: any;
    endExclusive: any;
    get isEmpty(): boolean;
    delta(t: any): e;
    deltaStart(t: any): e;
    deltaEnd(t: any): e;
    get length(): number;
    toString(): string;
    equals(t: any): boolean;
    containsRange(t: any): boolean;
    contains(t: any): boolean;
    join(t: any): e;
    intersect(t: any): e | undefined;
    intersectionLength(t: any): number;
    intersects(t: any): boolean;
    intersectsOrTouches(t: any): boolean;
    isBefore(t: any): boolean;
    isAfter(t: any): boolean;
    slice(t: any): any;
    substring(t: any): any;
    clip(t: any): number;
    clipCyclic(t: any): any;
    map(t: any): any[];
    forEach(t: any): void;
    joinRightTouching(t: any): e;
}
declare class a {
    a: any[];
    get ranges(): any[];
    addRange(t: any): void;
    toString(): string;
    intersectsStrict(t: any): boolean;
    intersectWithRange(t: any): a;
    intersectWithRangeLength(t: any): any;
    get length(): any;
}
export { e as $eD, a as $fD };
//# sourceMappingURL=offsetRange.d.ts.map