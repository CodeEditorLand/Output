declare class A {
    constructor(t: any, e: any, s: any, a: any);
    result: any;
    fromTaskId: any;
    b: any;
    c: any;
    a: v;
    didAddCoverage: {
        readonly debugName: any;
        toString(): any;
        a: any;
        c: any;
        trigger(t: any, r: any): void;
        get(): void;
        f: Set<any>;
        addObserver(e: any): void;
        removeObserver(e: any): void;
        g(): void;
        h(): void;
        log(): /*elided*/ any;
        debugGetObservers(): Set<any>;
        readonly TChange: null;
        reportChanges(): void;
        read(e: any): any;
        map(e: any, t: any): any;
        flatten(): any;
        recomputeInitiallyAndOnChange(e: any, t: any): /*elided*/ any;
        keepObserved(e: any): /*elided*/ any;
        readonly b: any;
    };
    tree: f;
    associatedData: Map<any, any>;
    allPerTestIDs(): Generator<any, void, boolean>;
    append(t: any, e: any): void;
    filterTreeForTest(t: any): f;
    getAllFiles(): v;
    getUri(t: any): any;
    getComputedForUri(t: any): undefined;
    f(t: any, e: any): Generator<any, void, any>;
    g(t: any): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
}
declare function C(o: any, t: any, e: any): number;
declare class y {
    constructor(t: any, e: any);
    get tpc(): number;
    fromResult: any;
    didChange: {
        readonly debugName: any;
        toString(): any;
        a: any;
        c: any;
        trigger(t: any, r: any): void;
        get(): void;
        f: Set<any>;
        addObserver(e: any): void;
        removeObserver(e: any): void;
        g(): void;
        h(): void;
        log(): /*elided*/ any;
        debugGetObservers(): Set<any>;
        readonly TChange: null;
        reportChanges(): void;
        read(e: any): any;
        map(e: any, t: any): any;
        flatten(): any;
        recomputeInitiallyAndOnChange(e: any, t: any): /*elided*/ any;
        keepObserved(e: any): /*elided*/ any;
        readonly b: any;
    };
    id: any;
    uri: any;
    statement: any;
    branch: any;
    declaration: any;
}
declare class g extends y {
}
declare class U extends g {
}
declare class d extends y {
    constructor(t: any, e: any, s: any);
    get hasSynchronousDetails(): boolean | undefined;
    f: any;
    detailsForTest(t: any, e?: any): Promise<any>;
    details(t?: any): Promise<any>;
    b: boolean | undefined;
}
declare function P(o: any, t: any): {
    id: string;
    uri: any;
    statement: any;
};
import { $Ic as v } from "../../../../base/common/map.js";
import { $FU as f } from "../../../../base/common/prefixTree.js";
export { A as $2U, C as $3U, y as $4U, g as $5U, U as $6U, d as $7U, P as $8U };
//# sourceMappingURL=testCoverage.d.ts.map