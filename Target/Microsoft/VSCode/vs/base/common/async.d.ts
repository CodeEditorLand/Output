declare class f {
    get isRejected(): boolean;
    get isResolved(): boolean;
    get isSettled(): boolean;
    get value(): any;
    p: Promise<any>;
    a: (value: any) => void;
    b: (reason?: any) => void;
    complete(e: any): Promise<any>;
    d: {
        outcome: number;
        value: any;
    } | {
        outcome: number;
        value: any;
    } | undefined;
    error(e: any): Promise<any>;
    settleWith(e: any): any;
    cancel(): Promise<any>;
}
declare class Te {
    constructor(e: any, t?: () => number);
    d: any;
    f: () => number;
    a: number;
    b: number;
    increment(): number;
}
declare class xe {
    constructor(e: any, t: any);
    a: any;
    b: any;
    d: number;
    g: () => void;
    dispose(): void;
    cancel(): void;
    schedule(e?: any): void;
    f: NodeJS.Timeout | undefined;
    isScheduled(): boolean;
    h(): void;
}
declare class Pe extends v {
    j: any[];
    work(e: any): void;
}
declare class $e extends j {
    constructor(e: any, t: any);
    h: any;
    j: any;
    a: any[];
    b: any;
    f: boolean;
    g: number;
    get pending(): number;
    work(e: any): boolean;
    m(): void;
    r(e?: any): void;
}
declare let V: any;
declare let d: any;
declare class N {
    constructor(e: any, t: any);
    l: boolean;
    g: () => void;
    m: any;
    o: unknown;
    j: any;
    dispose(): void;
    get value(): any;
    get isInitialized(): boolean;
}
declare class ve extends N {
    constructor(e: any);
}
declare function je(n: any, e: any, t: any): Promise<any>;
declare class G {
    isRunning(e: any): boolean;
    get running(): any;
    cancelRunning(): void;
    run(e: any, t: any, s: any): any;
    a: {
        taskId: any;
        cancel: () => any;
        promise: any;
    } | undefined;
    d(e: any): void;
    f(): void;
    queue(e: any): Promise<any>;
    b: {
        run: any;
        promise: Promise<any>;
        promiseResolve: undefined;
        promiseReject: undefined;
    } | undefined;
    hasQueued(): boolean;
    join(): Promise<any>;
}
declare function se(n: any): Promise<any>;
declare function ie(n: any): Promise<any>;
declare function ne(n: any, e: any, t: any): Promise<any>;
declare function re(n: any, e: any): Promise<any>;
declare function he(n: any): Promise<any>;
declare function M(): {
    promise: Promise<any>;
    resolve: undefined;
    reject: undefined;
};
declare class O {
    f: boolean;
    a: any;
    b: Promise<any> | null;
    d: any;
    queue(e: any): Promise<any>;
    dispose(): void;
}
declare class oe {
    d: Promise<null>;
    queue(e: any): Promise<any>;
}
declare class ue {
    a: Map<any, any>;
    queue(e: any, t: any): any;
    keys(): MapIterator<any>;
}
declare class B {
    constructor(e: any);
    defaultDelay: any;
    a: {
        isTriggered: () => boolean;
        dispose: () => void;
    } | null;
    b: any;
    d: ((value: any) => void) | null;
    f: ((reason?: any) => void) | null;
    g: any;
    trigger(e: any, t?: any): any;
    isTriggered(): boolean;
    cancel(): void;
    h(): void;
    dispose(): void;
}
declare class ae {
    constructor(e: any);
    a: B;
    b: O;
    trigger(e: any, t: any): any;
    isTriggered(): boolean;
    cancel(): void;
    dispose(): void;
}
declare class U {
    a: boolean;
    b: Promise<any>;
    d: (value: any) => void;
    isOpen(): boolean;
    open(): void;
    wait(): Promise<any>;
}
declare class le extends U {
    constructor(e: any);
    f: NodeJS.Timeout;
}
declare function $(n: any, e: any): Promise<any> | {
    cancel(): void;
    then(r: any, h: any): Promise<any>;
    catch(r: any): Promise<any>;
    finally(r: any): Promise<any>;
};
declare function ce(n: any, e: number | undefined, t: any): any;
declare function de(n: any): Promise<any>;
declare function fe(n: any, e?: (s: any) => boolean, t?: null): any;
declare function pe(n: any, e?: (s: any) => boolean, t?: null): Promise<any>;
declare class A {
    constructor(e: any);
    a: number;
    b: boolean;
    f: any;
    g: any[];
    d: number;
    h: x;
    whenIdle(): any;
    get onDrained(): any;
    get size(): number;
    queue(e: any): Promise<any>;
    j(): void;
    k(): void;
    clear(): void;
    dispose(): void;
}
declare class K extends A {
    constructor();
}
declare class me {
    a: G;
    b: number;
    queue(e: any): any;
}
declare class we {
    a: Map<any, any>;
    b: Set<any>;
    f: number;
    whenDrained(): Promise<any>;
    g(): boolean;
    queueSize(e: any, t?: import("./resources.js").$ah): any;
    queueFor(e: any, t: any, s?: import("./resources.js").$ah): any;
    d: T | undefined;
    h(): void;
    j(): void;
    dispose(): void;
}
declare class ge {
    b: any[];
    schedule(e: any): Promise<any>;
    scheduleSkipIfCleared(e: any): Promise<any>;
    d(): void;
    f(): Promise<void>;
    a: any;
    clearPending(): void;
}
declare class be {
    constructor(e: any, t: any);
    b: boolean;
    dispose(): void;
    cancel(): void;
    cancelAndSet(e: any, t: any): void;
    a: any;
    setIfNotSet(e: any, t: any): void;
}
declare class ye {
    j: boolean;
    cancel(): void;
    cancelAndSet(e: any, t: any, s?: typeof globalThis): void;
    g: any;
    dispose(): void;
}
declare class v {
    constructor(e: any, t: any);
    a: any;
    d: any;
    f: () => void;
    dispose(): void;
    cancel(): void;
    schedule(e?: any): void;
    b: NodeJS.Timeout | undefined;
    set delay(e: any);
    get delay(): any;
    isScheduled(): boolean;
    flush(): void;
    g(): void;
    h(): void;
}
declare class H {
    constructor(e: any);
    get value(): any;
    get error(): any;
    get isResolved(): boolean;
    d: boolean;
    promise: any;
    a: any;
    b: any;
    requireValue(): any;
}
declare class ke {
    constructor(e: any);
    b: any;
    a: D;
    requireValue(): any;
    getPromise(): any;
    get currentValue(): any;
}
declare class u {
    static fromArray(e: any): u;
    static fromPromise(e: any): u;
    static fromPromisesResolveOrder(e: any): u;
    static merge(e: any): u;
    static map(e: any, t: any): u;
    static filter(e: any, t: any): u;
    static coalesce(e: any): u;
    static toPromise(e: any): Promise<any[]>;
    constructor(e: any, t: any);
    a: number;
    b: any[];
    d: any;
    f: any;
    g: x;
    map(e: any): u;
    filter(e: any): u;
    coalesce(): u;
    toPromise(): Promise<any[]>;
    h(e: any): void;
    j(e: any): void;
    k(): void;
    l(e: any): void;
    [Symbol.asyncIterator](): {
        next: () => Promise<{
            done: boolean;
            value: any;
        } | undefined>;
        return: () => Promise<{
            done: boolean;
            value: undefined;
        }>;
    };
}
declare class L extends u {
    m: any;
    cancel(): void;
}
declare function qe(n: any): L;
declare class Re {
    constructor(e: any);
    a: f;
    b: u;
    d: (i: any) => void;
    f: (i: any) => void;
    g: (i: any) => void;
    get asyncIterable(): u;
    resolve(): void;
    reject(e: any): void;
    emitOne(e: any): void;
    emitMany(e: any): void;
}
declare function Ce(n: any, e: any): {
    next(): Promise<any>;
    throw: any;
    return: any;
    [Symbol.asyncIterator](): /*elided*/ any;
};
declare function I(n: any): boolean;
declare function S(n: any): {
    cancel(): void;
    then(r: any, h: any): Promise<any>;
    catch(r: any): Promise<any>;
    finally(r: any): Promise<any>;
};
declare function E(n: any, e: any, t: any): Promise<any>;
declare function te(n: any, e: any): Promise<any>;
declare var g: any;
import { $vd as j } from "./lifecycle.js";
import { $ef as x } from "./event.js";
import { $Ed as T } from "./lifecycle.js";
import { $wf as D } from "./lazy.js";
export { f as $$h, Te as $0h, xe as $1h, Pe as $2h, $e as $3h, V as $4h, d as $5h, N as $6h, ve as $7h, je as $8h, G as $9h, se as $Ah, ie as $Bh, ne as $Ch, re as $Dh, he as $Eh, M as $Fh, O as $Gh, oe as $Hh, ue as $Ih, B as $Jh, ae as $Kh, U as $Lh, le as $Mh, $ as $Nh, ce as $Oh, de as $Ph, fe as $Qh, pe as $Rh, A as $Sh, K as $Th, me as $Uh, we as $Vh, ge as $Wh, be as $Xh, ye as $Yh, v as $Zh, H as $_h, ke as $ai, u as $bi, L as $ci, qe as $di, Re as $ei, Ce as $fi, I as $wh, S as $xh, E as $yh, te as $zh, g as Promises };
//# sourceMappingURL=async.d.ts.map