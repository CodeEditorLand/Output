declare class n {
    static const(t: any): n;
    constructor(t: any, i: any, s: any, o?: typeof l);
    startValue: any;
    endValue: any;
    durationMs: any;
    a: typeof l;
    startTimeMs: number;
    isFinished(): boolean;
    getValue(): any;
}
declare function l(e: any, t: any, i: any, s: any): any;
declare function b(e: any, t: any, i: any, s: any): any;
declare function d(e: any, t: any, i: any, s: any): any;
declare class r {
    static const(t: any): r;
    constructor(t: any);
    a: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    setAnimation(t: any, i: any): void;
    changeAnimation(t: any, i: any): void;
    getValue(t: any): any;
}
declare class a {
    a: {
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
    b: boolean;
    invalidateOnNextAnimationFrame(t: any): void;
    c(): void;
}
export { n as $Mkb, l as $Nkb, b as $Okb, d as $Pkb, r as $Qkb, a as $Rkb };
//# sourceMappingURL=animation.d.ts.map