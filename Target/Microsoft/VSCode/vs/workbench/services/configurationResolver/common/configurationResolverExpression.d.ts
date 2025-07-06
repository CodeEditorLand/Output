export { u as $bX };
declare class u {
    static parse(e: any): u;
    constructor(e: any);
    a: Map<any, any>;
    d: Set<any>;
    c: boolean;
    b: any;
    e(): void;
    f(e: any, n: any): {
        replacement: {
            id: any;
            name: any;
            inner: any;
            arg?: never;
        };
        end: any;
    } | {
        replacement: {
            id: any;
            inner: any;
            name: any;
            arg: any;
        };
        end: any;
    } | undefined;
    g(e: any): void;
    h(e: any, n: any, i: any, t: any, s: any): void;
    unresolved(): Generator<any, void, unknown>;
    resolved(): any;
    resolve(e: any, n: any): void;
    j(e: any, { replaceKeyName: n, propertyName: i, object: t }: {
        replaceKeyName: any;
        propertyName: any;
        object: any;
    }, s: any, l?: any[]): void;
    m(e: any, n: any, i: any): void;
    toObject(): any;
}
//# sourceMappingURL=configurationResolverExpression.d.ts.map