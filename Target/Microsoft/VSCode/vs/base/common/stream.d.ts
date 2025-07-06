declare function E(r: any, e: any, t: any): any;
declare function m(r: any, e: any): Promise<any>;
declare function a(r: any, e: any, t: any): void;
declare function L(r: any, e: any): Promise<any>;
declare function D(r: any, e: any): w;
declare function C(): w;
declare function P(r: any): {
    read: () => any;
};
declare function R(r: any, e: any, t: any): w;
declare function W(r: any, e: any, t: any): {
    read: () => any;
};
declare function q(r: any, e: any, t: any): w;
declare function x(r: any): boolean;
declare function g(r: any): boolean;
declare function $(r: any): boolean;
declare function o(r: any, e: any): w;
declare function k(r: any, e: any): any;
declare class w {
    constructor(e: any, t: any);
    e: any;
    f: any;
    a: {
        flowing: boolean;
        ended: boolean;
        destroyed: boolean;
    };
    b: {
        data: never[];
        error: never[];
    };
    c: {
        data: never[];
        error: never[];
        end: never[];
    };
    d: any[];
    pause(): void;
    resume(): void;
    write(e: any): Promise<any> | undefined;
    error(e: any): void;
    end(e: any): void;
    g(e: any): void;
    h(e: any): void;
    i(): void;
    on(e: any, t: any): void;
    removeListener(e: any, t: any): void;
    j(): void;
    k(): void;
    l(): boolean;
    destroy(): void;
}
export { E as $Ai, m as $Bi, a as $Ci, L as $Di, D as $Ei, C as $Fi, P as $Gi, R as $Hi, W as $Ii, q as $Ji, x as $vi, g as $wi, $ as $xi, o as $yi, k as $zi };
//# sourceMappingURL=stream.d.ts.map