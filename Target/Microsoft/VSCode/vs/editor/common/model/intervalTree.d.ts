declare function g(e: any): number;
declare function it(e: any, t: any): void;
declare class J {
    constructor(t: any, r: any, i: any);
    metadata: number;
    parent: this;
    left: this;
    right: this;
    start: any;
    end: any;
    delta: number;
    maxEnd: any;
    id: any;
    ownerId: number;
    options: any;
    cachedVersionId: number;
    cachedAbsoluteStart: any;
    cachedAbsoluteEnd: any;
    range: any;
    reset(t: any, r: any, i: any, a: any): void;
    setOptions(t: any): void;
    setCachedOffsets(t: any, r: any, i: any): void;
    detach(): void;
}
declare const s: J;
declare class at {
    root: J;
    requestNormalizeDelta: boolean;
    intervalSearch(t: any, r: any, i: any, a: any, n: any, f: any, d: any): any[];
    search(t: any, r: any, i: any, a: any, n: any): any[];
    collectNodesFromOwner(t: any): any[];
    collectNodesPostOrder(): any[];
    insert(t: any): void;
    delete(t: any): void;
    resolveNode(t: any, r: any): void;
    acceptReplace(t: any, r: any, i: any, a: any): void;
    getAllInOrder(): any[];
    a(): void;
}
declare function Q(e: any, t: any, r: any, i: any, a: any): void;
declare function D(e: any): void;
declare function rt(e: any, t: any, r: any, i: any): number;
declare var V: any;
declare var R: any;
export { g as $dH, it as $eH, J as $fH, s as $gH, at as $hH, Q as $iH, D as $jH, rt as $kH, V as ClassName, R as NodeColor };
//# sourceMappingURL=intervalTree.d.ts.map