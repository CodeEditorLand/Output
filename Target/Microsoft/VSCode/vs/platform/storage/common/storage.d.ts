declare const j: "__$__isNewStorageMarker";
declare const u: "__$__targetStorageMarker";
declare const Y: any;
declare function V(i: any): any;
declare class m extends R {
    constructor(t?: {
        flushInterval: number | undefined;
    });
    b: any;
    f: any;
    onDidChangeTarget: any;
    g: any;
    onWillSaveState: any;
    m: any;
    j: any;
    onDidChangeValue(t: any, e: any, s: any): any;
    n(): void;
    r(): boolean;
    t(): void;
    initialize(): Promise<void>;
    h: Promise<void> | undefined;
    u(t: any, e: any): void;
    w(t: any): void;
    get(t: any, e: any, s: any): any;
    getBoolean(t: any, e: any, s: any): any;
    getNumber(t: any, e: any, s: any): any;
    getObject(t: any, e: any, s: any): any;
    storeAll(t: any, e: any): void;
    store(t: any, e: any, s: any, r: any, n?: boolean): void;
    remove(t: any, e: any, s?: boolean): void;
    y(t: any): void;
    keys(t: any, e: any): string[];
    z(t: any, e: any, s: any, r?: boolean): void;
    get D(): any;
    C: any;
    get G(): any;
    F: any;
    get I(): any;
    H: any;
    J(t: any): any;
    L(t: any): any;
    isNew(t: any): boolean;
    flush(t?: any): Promise<void>;
    log(): Promise<void>;
    optimize(t: any): Promise<any>;
    switch(t: any, e: any): Promise<any>;
    M(t: any, e: any): boolean;
    N(t: any, e: any, s: any): void;
}
declare function E(i: any): any;
declare class q extends m {
    constructor();
    U: any;
    W: any;
    X: any;
    P(t: any): any;
    Q(t: any): "inMemory (application)" | "inMemory (profile)" | "inMemory (workspace)";
    O(): Promise<void>;
    R(): Promise<void>;
    S(): Promise<void>;
    hasScope(t: any): boolean;
}
declare function J(i: any, t: any, e: any, s: any, r: any, n: any): Promise<void>;
declare var I: any;
declare var N: any;
declare var c: any;
import { $vd as R } from "../../../base/common/lifecycle.js";
export { j as $Io, u as $Jo, Y as $Ko, V as $Lo, m as $Mo, E as $No, q as $Oo, J as $Po, I as StorageScope, N as StorageTarget, c as WillSaveStateReason };
//# sourceMappingURL=storage.d.ts.map