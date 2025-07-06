declare class x {
    c: a;
    onDidChangeVisibleRanges: any;
    d: Set<any>;
    f: {
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
    visibleLineRanges: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    attachView(): v;
    detachView(e: any): void;
}
declare class m {
    constructor(e: any, t: any);
    visibleLineRanges: any;
    stabilized: any;
    equals(e: any): boolean;
}
declare class V extends o {
    constructor(e: any);
    get lineRanges(): any[];
    h: any;
    c: any;
    f: any[];
    g: any[];
    j(): void;
    handleStateChange(e: any): void;
}
declare class j extends o {
    constructor(e: any, t: any);
    get backgroundTokenizationState(): any;
    j: any;
    m: any;
    h: any;
    onDidChangeTokens: any;
    tokenizeIfCheap(e: any): void;
}
import { $ef as a } from "../../../../base/common/event.js";
declare class v {
    constructor(e: any);
    get state(): import("../../../../base/common/observableInternal/observables/observableValue.js").$De | import("../../../../base/common/observableInternal/observables/lazyObservableValue.js").$Ge;
    d: any;
    c: import("../../../../base/common/observableInternal/observables/observableValue.js").$De | import("../../../../base/common/observableInternal/observables/lazyObservableValue.js").$Ge;
    setVisibleLines(e: any, t: any): void;
}
import { $vd as o } from "../../../../base/common/lifecycle.js";
export { x as $IH, m as $JH, V as $KH, j as $LH };
//# sourceMappingURL=abstractSyntaxTokenBackend.d.ts.map