export { l as $1B };
declare class l {
    static g(r: any, e: any, i: any): any;
    static h(r: any, e: any, i: any, a: any): boolean;
    static j(r: any, e?: number): number;
    static k(r: any, e: any, i: any): boolean;
    constructor(r: any, e?: number);
    comparator: any;
    d: number;
    f: number;
    c: number;
    e: s;
    get size(): number;
    clear(): void;
    has(r: any): boolean;
    get(r: any): any;
    set(r: any, e: any): this;
    delete(r: any): boolean;
    forEach(r: any, e: any): void;
    entries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    toString(): string;
}
declare class s {
    constructor(r: any, e: any, i: any);
    level: any;
    key: any;
    value: any;
    forward: any[];
}
//# sourceMappingURL=skipList.d.ts.map