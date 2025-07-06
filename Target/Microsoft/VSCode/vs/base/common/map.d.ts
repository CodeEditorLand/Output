declare function g(r: any, t: any, e: any): any;
declare function x(r: any): string;
declare function w(r: any): string;
declare class h {
    constructor(t: any, e: any);
    d: Map<any, any>;
    e: any;
    set(t: any, e: any): this;
    get(t: any): any;
    has(t: any): boolean;
    get size(): number;
    clear(): void;
    delete(t: any): boolean;
    forEach(t: any, e: any): void;
    values(): Generator<any, void, unknown>;
    keys(): Generator<any, void, unknown>;
    entries(): Generator<any[], void, unknown>;
}
declare class M {
    constructor(t: any, e: any);
    c: h;
    get size(): number;
    add(t: any): this;
    clear(): void;
    delete(t: any): boolean;
    forEach(t: any, e: any): void;
    has(t: any): boolean;
    entries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
}
declare class v {
    c: Map<any, any>;
    f: number;
    g: number;
    clear(): void;
    isEmpty(): boolean;
    get size(): number;
    get first(): any;
    get last(): any;
    has(t: any): boolean;
    get(t: any, e?: number): any;
    set(t: any, e: any, s?: number): this;
    delete(t: any): boolean;
    remove(t: any): any;
    shift(): any;
    forEach(t: any, e: any): void;
    keys(): {
        [Symbol.iterator](): /*elided*/ any;
        next(): {
            value: any;
            done: boolean;
        };
    };
    values(): {
        [Symbol.iterator](): /*elided*/ any;
        next(): {
            value: any;
            done: boolean;
        };
    };
    entries(): {
        [Symbol.iterator](): /*elided*/ any;
        next(): {
            value: any[];
            done: boolean;
        } | {
            value: undefined;
            done: boolean;
        };
    };
    h(t: any): void;
    d: any;
    j(t: any): void;
    e: any;
    k(t: any): void;
    l(t: any): void;
    m(t: any): void;
    n(t: any, e: any): void;
    toJSON(): any[];
    fromJSON(t: any): void;
}
declare class E extends l {
    r(t: any): void;
    set(t: any, e: any): this;
}
declare class y extends l {
    r(t: any): void;
    set(t: any, e: any): this;
}
declare class S {
    c: Map<any, any>;
    add(t: any): this;
    delete(t: any): boolean;
    has(t: any): boolean;
}
declare class $ {
    constructor(t: any);
    c: Map<any, any>;
    d: Map<any, any>;
    clear(): void;
    set(t: any, e: any): void;
    get(t: any): any;
    getKey(t: any): any;
    delete(t: any): boolean;
    forEach(t: any, e: any): void;
    keys(): MapIterator<any>;
    values(): MapIterator<any>;
}
declare class z {
    c: Map<any, any>;
    add(t: any, e: any): void;
    delete(t: any, e: any): void;
    forEach(t: any, e: any): void;
    get(t: any): any;
}
declare function k(r: any, t: any): boolean;
declare class b {
    c: Map<any, any>;
    set(t: any, ...e: any[]): void;
    get(...t: any[]): any;
    clear(): void;
    values(): Generator<any, void, any>;
    toString(): string;
}
declare var a: any;
declare class l extends v {
    constructor(t: any, e?: number);
    o: any;
    p: number;
    set limit(t: any);
    get limit(): any;
    set ratio(t: number);
    get ratio(): number;
    peek(t: any): any;
    set(t: any, e: any): this;
    q(): void;
}
export { g as $Fc, x as $Gc, w as $Hc, h as $Ic, M as $Jc, v as $Kc, E as $Lc, y as $Mc, S as $Nc, $ as $Oc, z as $Pc, k as $Qc, b as $Rc, a as Touch };
//# sourceMappingURL=map.d.ts.map