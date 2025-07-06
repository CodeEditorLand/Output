declare const x: {
    0: string;
    1: string;
    2: string;
};
declare const y: 65535;
declare const L: 16777215;
declare class I {
    static fromFoldRanges(e: any): I;
    static sanitizeAndMerge(e: any, t: any, n: any, s: any): any[];
    constructor(e: any, t: any, n: any);
    a: any;
    b: any;
    c: m;
    d: m;
    e: m;
    g: any;
    f: boolean;
    h(): void;
    get length(): any;
    getStartLineNumber(e: any): number;
    getEndLineNumber(e: any): number;
    getType(e: any): any;
    hasTypes(): boolean;
    isCollapsed(e: any): boolean;
    setCollapsed(e: any, t: any): void;
    j(e: any): boolean;
    k(e: any, t: any): void;
    l(e: any): boolean;
    m(e: any, t: any): void;
    getSource(e: any): 0 | 1 | 2;
    setSource(e: any, t: any): void;
    setCollapsedAllOfType(e: any, t: any): boolean;
    toRegion(e: any): A;
    getParentIndex(e: any): number;
    contains(e: any, t: any): boolean;
    n(e: any): number;
    findRange(e: any): number;
    toString(): string;
    toFoldRange(e: any): {
        startLineNumber: number;
        endLineNumber: number;
        type: any;
        isCollapsed: boolean;
        source: number;
    };
}
declare class A {
    constructor(e: any, t: any);
    a: any;
    b: any;
    get startLineNumber(): any;
    get endLineNumber(): any;
    get regionIndex(): any;
    get parentIndex(): any;
    get isCollapsed(): any;
    containedBy(e: any): boolean;
    containsLine(e: any): boolean;
    hidesLine(e: any): boolean;
}
declare var F: any;
declare class m {
    constructor(e: any);
    a: Uint32Array<ArrayBuffer>;
    get(e: any): boolean;
    set(e: any, t: any): void;
}
export { x as $Vob, y as $Wob, L as $Xob, I as $Yob, A as $Zob, F as FoldSource };
//# sourceMappingURL=foldingRanges.d.ts.map