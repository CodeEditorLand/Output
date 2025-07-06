declare class R {
    b: string;
    c: number;
    reset(t: any): this;
    next(): this;
    hasNext(): boolean;
    cmp(t: any): number;
    value(): string | undefined;
}
declare class C {
    constructor(t?: boolean);
    e: boolean;
    reset(t: any): this;
    b: any;
    c: number | undefined;
    d: number | undefined;
    hasNext(): boolean;
    next(): this;
    cmp(t: any): number;
    value(): any;
}
declare class N {
    constructor(t?: boolean, e?: boolean);
    f: boolean;
    g: boolean;
    reset(t: any): this;
    d: number | undefined;
    e: number | undefined;
    b: any;
    c: any;
    hasNext(): boolean;
    next(): this;
    cmp(t: any): number;
    value(): any;
}
declare class F {
    constructor(t: any, e: any);
    f: any;
    g: any;
    d: any[];
    e: number;
    reset(t: any): this;
    c: any;
    b: N | undefined;
    next(): this;
    hasNext(): boolean;
    cmp(t: any): number;
    value(): any;
}
declare class o {
    static forUris(t?: () => boolean, e?: () => boolean): o;
    static forPaths(t?: boolean): o;
    static forStrings(): o;
    static forConfigKeys(): o;
    constructor(t: any);
    b: any;
    clear(): void;
    fill(t: any, e: any): void;
    set(t: any, e: any): any;
    c: any;
    get(t: any): any;
    d(t: any): any;
    has(t: any): boolean;
    delete(t: any): void;
    deleteSuperstr(t: any): void;
    e(t: any, e: any): void;
    f(t: any, e: any): any;
    g(t: any): any;
    findSubstr(t: any): any;
    findSuperstr(t: any): any;
    h(t: any, e: any): any;
    hasElementOrSubtree(t: any): boolean;
    forEach(t: any): void;
    j(t: any): ArrayIterator<any>;
    l(t: any, e: any): void;
    _isBalanced(): any;
    [Symbol.iterator](): Generator<any, void, unknown>;
}
export { R as $gj, C as $hj, N as $ij, F as $jj, o as $kj };
//# sourceMappingURL=ternarySearchTree.d.ts.map