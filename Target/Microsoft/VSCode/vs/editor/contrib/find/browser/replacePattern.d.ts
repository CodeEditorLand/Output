declare class u {
    static fromStaticValue(t: any): u;
    static b(t: any, i: any): any;
    constructor(t: any);
    get hasReplacementPatterns(): boolean;
    a: g | C;
    buildReplaceString(t: any, i: any): any;
}
declare class r {
    static staticValue(t: any): r;
    static matchIndex(t: any): r;
    static caseOps(t: any, i: any): r;
    constructor(t: any, i: any, e: any);
    staticValue: any;
    matchIndex: any;
    caseOps: any;
}
declare function w(n: any): u;
declare class g {
    constructor(t: any);
    staticValue: any;
    kind: number;
}
declare class C {
    constructor(t: any);
    pieces: any;
    kind: number;
}
export { u as $eob, r as $fob, w as $gob };
//# sourceMappingURL=replacePattern.d.ts.map