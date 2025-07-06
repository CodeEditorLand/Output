declare class g extends c {
    constructor(t: any, e: any, s: any, h: undefined, i: any);
    get debugName(): any;
    _debugNameData: any;
    _computeFn: any;
    w: any;
    x: any;
    y: any;
    a: number;
    i: number;
    j: Set<any>;
    k: Set<any>;
    m: boolean;
    n: boolean;
    p: boolean;
    q: boolean;
    s: boolean;
    v: Set<any> | null;
    l: any;
    get(): any;
    A(): void;
    c: any;
    beginUpdate(t: any): void;
    endUpdate(t: any): void;
    handlePossibleChange(t: any): void;
    handleChange(t: any, e: any): void;
    B(): void;
    readObservable(t: any): any;
    reportChange(t: any): void;
    get store(): f;
    t: f | undefined;
    get delayedStore(): f;
    u: f | undefined;
    debugGetState(): {
        state: number;
        updateCount: number;
        isComputing: boolean;
        dependencies: Set<any>;
        value: any;
    };
    debugSetValue(t: any): void;
    setValue(t: any, e: any, s: any): void;
}
declare class w extends g {
    constructor(t: any, e: any, s: any, h: undefined, i: any, a: any);
    set: any;
}
declare var u: any;
import { $qe as c } from "./baseObservable.js";
import { DisposableStore as f } from "../commonFacade/deps.js";
export { g as $re, w as $se, u as DerivedState };
//# sourceMappingURL=derivedImpl.d.ts.map