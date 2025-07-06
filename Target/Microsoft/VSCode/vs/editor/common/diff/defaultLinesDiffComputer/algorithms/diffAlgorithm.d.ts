declare class q {
    constructor(e: any);
    e: any;
    c: number;
    d: boolean;
    isValid(): boolean;
    disable(): void;
}
declare class h {
    static trivial(e: any, t: any): h;
    static trivialTimedOut(e: any, t: any): h;
    constructor(e: any, t: any);
    diffs: any;
    hitTimeout: any;
}
declare class s {
    static invert(e: any, t: any): any[];
    static fromOffsetPairs(e: any, t: any): s;
    static assertSorted(e: any): void;
    constructor(e: any, t: any);
    seq1Range: any;
    seq2Range: any;
    swap(): s;
    toString(): string;
    join(e: any): s;
    delta(e: any): s;
    deltaStart(e: any): s;
    deltaEnd(e: any): s;
    intersectsOrTouches(e: any): any;
    intersect(e: any): s | undefined;
    getStarts(): i;
    getEndExclusives(): i;
}
declare class i {
    constructor(e: any, t: any);
    offset1: any;
    offset2: any;
    toString(): string;
    delta(e: any): i;
    equals(e: any): boolean;
}
declare class g {
    isValid(): boolean;
}
export { q as $0eb, h as $6eb, s as $7eb, i as $8eb, g as $9eb };
//# sourceMappingURL=diffAlgorithm.d.ts.map