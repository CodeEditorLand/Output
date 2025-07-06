declare class U {
    c: Map<any, any>;
    acquire(t: any, ...s: any[]): {
        object: any;
        dispose: (...args: any[]) => any;
    };
}
declare class X {
    constructor(t: any);
    a: any;
    acquire(t: any, ...s: any[]): Promise<{
        object: any;
        dispose: () => any;
    }>;
}
declare class Y {
    constructor(t: any);
    object: any;
    dispose(): void;
}
declare function Z(e: any): void;
declare class tt {
    a: Map<any, any>;
    b: boolean;
    dispose(): void;
    clearAndDisposeAll(): void;
    has(t: any): boolean;
    get size(): number;
    get(t: any): any;
    set(t: any, s: any, i?: boolean): void;
    deleteAndDispose(t: any): void;
    deleteAndLeak(t: any): any;
    keys(): MapIterator<any>;
    values(): MapIterator<any>;
    [Symbol.iterator](): MapIterator<[any, any]>;
}
declare function et(e: any, t: any): any;
declare class R {
    a: FinalizationRegistry<any>;
    trackDisposable(t: any): void;
    setParent(t: any, s: any): void;
    markAsDisposed(t: any): void;
    markAsSingleton(t: any): void;
}
declare class E {
    b: Map<any, any>;
    c(t: any): any;
    trackDisposable(t: any): void;
    setParent(t: any, s: any): void;
    markAsDisposed(t: any): void;
    markAsSingleton(t: any): void;
    f(t: any, s: any): any;
    getTrackedDisposables(): any[];
    computeLeakingDisposables(t: number | undefined, s: any): {
        leaks: any;
        details: string;
    } | undefined;
}
declare function q(e: any): void;
declare function h(e: any): any;
declare function u(e: any): void;
declare function G(e: any): any;
declare function z(e: any): boolean;
declare function $(e: any): any;
declare function K(e: any): never[];
declare function W(...e: any[]): any;
declare function x(e: any): any;
declare class k {
    f: Set<any>;
    g: boolean;
    dispose(): void;
    get isDisposed(): boolean;
    clear(): void;
    add(t: any): any;
    delete(t: any): void;
    deleteAndLeak(t: any): void;
}
declare class A {
    q: k;
    dispose(): void;
    B(t: any): any;
}
declare class C {
    b: boolean;
    set value(t: any);
    get value(): any;
    a: any;
    clear(): void;
    dispose(): void;
    clearAndLeak(): any;
}
declare class H {
    constructor(t: any);
    a: C;
    b: boolean;
    set value(t: any);
    get value(): any;
    dispose(): void;
}
declare class J {
    constructor(t: any);
    b: any;
    a: number;
    acquire(): this;
    release(): this;
}
declare class Q {
    dispose: () => void;
    unset: () => void;
    isset: () => boolean;
    set(t: any): this;
}
export { U as $Ad, X as $Bd, Y as $Cd, Z as $Dd, tt as $Ed, et as $Fd, R as $jd, E as $kd, q as $ld, h as $md, u as $nd, G as $od, z as $pd, $ as $qd, K as $rd, W as $sd, x as $td, k as $ud, A as $vd, C as $wd, H as $xd, J as $yd, Q as $zd };
//# sourceMappingURL=lifecycle.d.ts.map