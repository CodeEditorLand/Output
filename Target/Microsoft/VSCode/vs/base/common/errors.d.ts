declare class n extends Error {
    static fromError(e: any): n;
    static isErrorNoTelemetry(e: any): boolean;
    constructor(e: any);
}
declare class u extends Error {
    constructor(e: any);
}
declare class d {
    b: any[];
    a: (e: any) => void;
    addListener(e: any): () => void;
    c(e: any): void;
    d(e: any): void;
    setUnexpectedErrorHandler(e: any): void;
    getUnexpectedErrorHandler(): (e: any) => void;
    onUnexpectedError(e: any): void;
    onUnexpectedExternalError(e: any): void;
}
declare const c: d;
declare function m(r: any): boolean;
declare function h(r: any): void;
declare function g(r: any): void;
declare function b(r: any): void;
declare function f(r: any): any;
declare function x(r: any): any;
declare const o: "Canceled";
declare function a(r: any): boolean;
declare class l extends Error {
    constructor();
}
declare class s extends Error {
    static is(e: any): boolean;
    constructor(e: any);
    name: string | undefined;
}
declare function $(): Error;
declare function w(r: any): Error;
declare function y(r: any): Error;
declare class k extends TypeError {
    constructor(e: any);
}
declare function U(r: any): any;
declare class T extends Error {
    constructor(e: any);
    message: any;
}
declare class I extends Error {
    constructor(e: any);
    message: any;
}
declare class C extends Error {
    constructor(...args: any[]);
    isExpected: boolean;
}
declare function E(r: any): void;
export { n as $Ab, u as $Bb, d as $fb, c as $gb, m as $ib, h as $jb, g as $kb, b as $lb, f as $mb, x as $nb, o as $ob, a as $pb, l as $qb, s as $rb, $ as $sb, w as $tb, y as $ub, k as $vb, U as $wb, T as $xb, I as $yb, C as $zb, E as setUnexpectedErrorHandler };
//# sourceMappingURL=errors.d.ts.map