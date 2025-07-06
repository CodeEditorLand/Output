declare class C {
    constructor(e: any);
    c: any;
    flush(): void;
    _set(e: any, n: any): void;
    a: any;
    b: any;
    _get(): {
        rendLineNumberStart: any;
        lines: any;
    };
    getStartLineNumber(): any;
    getEndLineNumber(): number;
    getCount(): any;
    getLine(e: any): any;
    onLinesDeleted(e: any, n: any): any;
    onLinesChanged(e: any, n: any): boolean;
    onLinesInserted(e: any, n: any): any;
    onTokensChanged(e: any): boolean;
}
declare class M {
    constructor(e: any, n: any);
    b: any;
    c: any;
    domNode: import("../../../base/browser/fastDomNode.js").$N7;
    a: C;
    d(): import("../../../base/browser/fastDomNode.js").$N7;
    onConfigurationChanged(e: any): boolean;
    onFlushed(e: any, n: any): boolean;
    onLinesChanged(e: any): boolean;
    onLinesDeleted(e: any): boolean;
    onLinesInserted(e: any): boolean;
    onScrollChanged(e: any): any;
    onTokensChanged(e: any): boolean;
    onZonesChanged(e: any): boolean;
    getStartLineNumber(): any;
    getEndLineNumber(): number;
    getVisibleLine(e: any): any;
    renderLines(e: any): void;
}
export { C as $Ybb, M as $Zbb };
//# sourceMappingURL=viewLayer.d.ts.map