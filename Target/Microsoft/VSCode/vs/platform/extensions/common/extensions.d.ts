declare function S(e: any): any;
declare function g(e: any): any;
declare const K: any;
declare const x: "extensions.user.cache";
declare const f: "extensions.builtin.cache";
declare const d: "undefined_publisher";
declare const $: string[];
declare function N(e: any): any;
declare const v: string[];
declare class r {
    static equals(t: any, n: any): boolean;
    static toKey(t: any): any;
    constructor(t: any);
    value: any;
    _lower: any;
}
declare class w {
    constructor(t: any);
    get size(): number;
    c: Set<any>;
    add(t: any): void;
    delete(t: any): boolean;
    has(t: any): boolean;
}
declare class E {
    c: Map<any, any>;
    clear(): void;
    delete(t: any): void;
    get(t: any): any;
    has(t: any): boolean;
    set(t: any, n: any): void;
    values(): MapIterator<any>;
    forEach(t: any): void;
    [Symbol.iterator](): MapIterator<[any, any]>;
}
declare class _ extends Error {
    constructor(t: any, n: any, o: any);
    extension: any;
}
declare function I(e: any): boolean;
declare function p(e: any): boolean;
declare function A(e: any): boolean;
declare function L(e: any, t: any): boolean;
declare var s: any;
declare var i: any;
export { S as $1y, g as $2y, K as $3y, x as $My, f as $Ny, d as $Oy, $ as $Py, N as $Qy, v as $Ry, r as $Sy, w as $Ty, E as $Uy, _ as $Vy, I as $Wy, p as $Xy, A as $Yy, L as $Zy, s as ExtensionType, i as TargetPlatform };
//# sourceMappingURL=extensions.d.ts.map