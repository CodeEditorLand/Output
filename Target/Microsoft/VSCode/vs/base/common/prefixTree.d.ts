export { v as $FU };
declare class v {
    root: a;
    a: number;
    get size(): number;
    get nodes(): any;
    get entries(): any;
    insert(r: any, e: any, n: any): void;
    mutate(r: any, e: any): void;
    mutatePath(r: any, e: any): void;
    delete(r: any): symbol | undefined;
    deleteRecursive(r: any): Generator<any, void, unknown>;
    find(r: any): undefined;
    hasKeyOrParent(r: any): boolean;
    hasKeyOrChildren(r: any): boolean;
    hasKey(r: any): boolean;
    b(r: any): {
        part: string;
        node: a;
    }[] | undefined;
    c(r: any, e: any, n: any): void;
    values(): Generator<any, void, unknown>;
}
declare class a {
    _value: typeof o;
    set value(r: undefined);
    get value(): undefined;
}
declare const o: unique symbol;
//# sourceMappingURL=prefixTree.d.ts.map