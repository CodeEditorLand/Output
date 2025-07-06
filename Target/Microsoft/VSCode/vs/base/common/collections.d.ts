declare function i(n: any, t: any): any;
declare function c(n: any, t: any): Map<any, any>;
declare function h(n: any, t: any): {
    removed: any[];
    added: any[];
};
declare function u(n: any, t: any): {
    removed: any[];
    added: any[];
};
declare function f(n: any, t: any): Set<any>;
declare class l {
    constructor(t: any, e: any);
    b: any;
    a: Map<any, any>;
    get size(): number;
    add(t: any): this;
    delete(t: any): boolean;
    has(t: any): boolean;
    entries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    clear(): void;
    forEach(t: any, e: any): void;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
export { i as $a, c as $b, h as $c, u as $d, f as $e, l as $f };
//# sourceMappingURL=collections.d.ts.map