declare class N {
    constructor(e: any);
    get root(): {
        length: any;
        token: number;
        height: number;
        tokenQuality: any;
    };
    b: any;
    a: {
        length: any;
        token: number;
        height: number;
        tokenQuality: any;
    };
    c(): {
        length: any;
        token: number;
        height: number;
        tokenQuality: any;
    };
    buildStore(e: any, t: any): void;
    d(e: any, t: any): {
        length: any;
        token: any;
        height: number;
        tokenQuality: any;
    };
    update(e: any, t: any, h: any): void;
    delete(e: any, t: any): void;
    e(e: any, t: any, h: any, n: any): void;
    f(e: any, t: any, h: any): void;
    getTokenAt(e: any): undefined;
    getTokensInRange(e: any, t: any): any[];
    markForRefresh(e: any, t: any): void;
    rangeHasTokens(e: any, t: any, h: any): boolean;
    rangeNeedsRefresh(e: any, t: any): boolean;
    getNeedsRefresh(): any[];
    deepCopy(): N;
    g(e: any): u | {
        length: any;
        token: any;
        tokenQuality: any;
        height: any;
    };
    printTree(e?: {
        length: any;
        token: number;
        height: number;
        tokenQuality: any;
    }): string;
    dispose(): void;
}
declare var a: any;
declare class u {
    static create(e: any, t: any): u;
    constructor(e: any);
    get children(): any[];
    get length(): number;
    height: any;
    a: any[];
    b: number;
    canAppendChild(): boolean;
    appendChild(e: any): void;
    c(e: any): void;
    unappendChild(): any;
    prependChild(e: any): void;
    unprependChild(): any;
    lastChild(): any;
    dispose(): void;
}
export { N as $7H, a as TokenQuality };
//# sourceMappingURL=tokenStore.d.ts.map