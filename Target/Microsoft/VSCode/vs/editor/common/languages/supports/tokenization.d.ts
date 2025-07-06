declare class p {
    constructor(t: any, e: any, n: any, o: any, r: any);
    token: any;
    index: any;
    fontStyle: any;
    foreground: any;
    background: any;
}
declare function x(i: any): p[];
declare class k {
    c: number;
    d: any[];
    e: Map<any, any>;
    getId(t: any): any;
    getColorMap(): any[];
}
declare class y {
    static createFromRawTokenTheme(t: any, e: any): y;
    static createFromParsedTokenTheme(t: any, e: any): y;
    constructor(t: any, e: any);
    c: any;
    d: any;
    e: Map<any, any>;
    getColorMap(): any;
    getThemeTrieElement(): any;
    _match(t: any): any;
    match(t: any, e: any): number;
}
declare function E(i: any): 0 | 1 | 2 | 3;
declare function I(i: any, t: any): 0 | 1 | -1;
declare class f {
    constructor(t: any, e: any, n: any);
    c: any;
    d: any;
    e: any;
    metadata: number;
    clone(): f;
    acceptOverwrite(t: any, e: any, n: any): void;
}
declare class $ {
    constructor(t: any, e?: Map<any, any>);
    mainRule: any;
    children: Map<any, any>;
}
declare class g {
    constructor(t: any);
    c: any;
    d: Map<any, any>;
    toExternalThemeTrieElement(): $;
    match(t: any): any;
    insert(t: any, e: any, n: any, o: any): void;
}
declare function Q(i: any): string;
export { p as $IQb, x as $JQb, k as $KQb, y as $LQb, E as $MQb, I as $NQb, f as $OQb, $ as $PQb, g as $QQb, Q as $RQb };
//# sourceMappingURL=tokenization.d.ts.map