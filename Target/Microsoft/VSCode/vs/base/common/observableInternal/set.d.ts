export { o as $Xe };
declare class o {
    a: Set<any>;
    b: import("./observables/observableValue.js").$De | import("./observables/lazyObservableValue.js").$Ge;
    observable: import("./observables/observableValue.js").$De | import("./observables/lazyObservableValue.js").$Ge;
    get size(): number;
    has(t: any): boolean;
    add(t: any, s: any): this;
    delete(t: any, s: any): boolean;
    clear(t: any): void;
    forEach(t: any, s: any): void;
    entries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    [Symbol.iterator](): Generator<any, void, unknown>;
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=set.d.ts.map