declare function J(t: any): boolean;
declare function q(t: any): boolean;
declare const K: any;
declare function Q(t: any): boolean;
declare function X(t: any): boolean;
declare function k(t: any): boolean;
declare function It(t: any): any;
declare function xt(t: any, n: any): Promise<any>;
declare class c {
    static formatSize(n: any): any;
}
declare function dt(t: any): number;
declare function Z(t: any): boolean;
declare function y(t: any): boolean;
declare function S(t: any): boolean;
declare function z(t: any): boolean;
declare function v(t: any): boolean;
declare function C(t: any): boolean;
declare function P(t: any): boolean;
declare class E extends Error {
    static create(n: any, o: any): E;
    constructor(n: any, o: any);
    code: any;
}
declare function U(t: any, n: any): E;
declare function tt(t: any): any;
declare function $(t: any, n: any): any;
declare function g(t: any): any;
declare function nt(t: any): any;
declare class rt {
    constructor(n: any, o: any, r: any);
    resource: any;
    operation: any;
    target: any;
    isOperation(n: any): boolean;
}
declare class f {
    constructor(n: any, o: any);
    c: any;
    d: h;
    f: h;
    g: h;
    rawAdded: any[];
    rawUpdated: any[];
    rawDeleted: any[];
    b: any;
    contains(n: any, ...o: any[]): boolean;
    affects(n: any, ...o: any[]): boolean;
    h(n: any, o: any, ...r: any[]): boolean;
    gotAdded(): boolean;
    gotDeleted(): boolean;
    gotUpdated(): boolean;
    correlates(n: any): boolean;
    hasCorrelation(): boolean;
}
declare function et(t: any, n: any, o: any): boolean;
declare class a extends Error {
    constructor(n: any, o: any, r: any);
    fileOperationResult: any;
    options: any;
}
declare class ot extends a {
    constructor(n: any, o: any, r: any, u: any);
    size: any;
}
declare class ct extends a {
    stat: any;
}
declare namespace ut {
    let OFF: string;
    let AFTER_DELAY: string;
    let ON_FOCUS_CHANGE: string;
    let ON_WINDOW_CHANGE: string;
}
declare namespace st {
    let OFF_1: string;
    export { OFF_1 as OFF };
    export let ON_EXIT: string;
    export let ON_EXIT_AND_WINDOW_CLOSE: string;
}
declare const ft: "files.associations";
declare const Et: "files.exclude";
declare const it: "files.readonlyInclude";
declare const ht: "files.readonlyExclude";
declare const at: "files.readonlyFromPermissions";
declare const Dt: "";
declare var L: any;
declare var A: any;
declare var T: any;
declare var N: any;
declare var _: any;
declare var d: any;
declare var l: any;
declare var e: any;
declare var x: any;
import { $wf as h } from "../../../base/common/lazy.js";
export { J as $$j, q as $0j, K as $6j, Q as $7j, X as $8j, k as $9j, It as $Ak, xt as $Bk, c as $Ck, dt as $Dk, Z as $_j, y as $ak, S as $bk, z as $ck, v as $dk, C as $ek, P as $fk, E as $gk, U as $hk, tt as $ik, $ as $jk, g as $kk, nt as $lk, rt as $mk, f as $nk, et as $ok, a as $pk, ot as $qk, ct as $rk, ut as $sk, st as $tk, ft as $uk, Et as $vk, it as $wk, ht as $xk, at as $yk, Dt as $zk, L as FileChangeFilter, A as FileChangeType, T as FileKind, N as FileOperation, _ as FileOperationResult, d as FilePermission, l as FileSystemProviderCapabilities, e as FileSystemProviderErrorCode, x as FileType };
//# sourceMappingURL=files.d.ts.map