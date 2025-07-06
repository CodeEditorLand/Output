declare class y {
    constructor(e: any, i: any);
    leadingLineContent: any;
    characterCountDelta: any;
}
declare class d {
    static q(e: any, i: any): 0 | 1 | -1;
    static r(e: any, i: any): 0 | 1 | -1;
    static s(e: any, i: any): 0 | 1 | -1;
    constructor(e: any, i: any, c: any, o: any, l: any, h: any, u?: {
        boostFullMatch: boolean;
        firstMatchCanBeWeak: boolean;
    } | undefined, m?: undefined);
    clipboardText: any;
    g: typeof d.s;
    c: any;
    d: any;
    e: any;
    f: any;
    k: number;
    j: any;
    h: {
        boostFullMatch: boolean;
        firstMatchCanBeWeak: boolean;
    } | undefined;
    set lineContext(e: any);
    get lineContext(): any;
    get items(): any[] | undefined;
    getItemsByProvider(): Map<any, any> | undefined;
    getIncompleteProvider(): Set<any>;
    get stats(): {
        pLabelLen: any;
    } | undefined;
    o(): void;
    p(): void;
    m: Map<any, any> | undefined;
    l: any;
    n: {
        pLabelLen: any;
    } | undefined;
}
export { y as $jkb, d as $kkb };
//# sourceMappingURL=completionModel.d.ts.map