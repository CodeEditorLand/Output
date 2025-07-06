declare function Z(t: any, e: any): U;
declare class U {
    constructor(e: any, n: any, r: any);
    characterMapping: any;
    containsRTL: any;
    containsForeignElements: any;
}
declare class Ce {
    constructor(e: any, n: any, r: any, a: any, s: any, i: any, f: any, c: any, o: any, g: any, p: any, u: any, l: any, h: any, d: any, I: any, L: any, m: any, N: any);
    useMonospaceOptimizations: any;
    canUseHalfwidthRightwardsArrow: any;
    lineContent: any;
    continuesWithWrappedLine: any;
    isBasicASCII: any;
    containsRTL: any;
    fauxIndentLength: any;
    lineTokens: any;
    lineDecorations: any;
    tabSize: any;
    startVisibleColumn: any;
    spaceWidth: any;
    stopRenderingLineAfter: any;
    renderWhitespace: number;
    renderControlCharacters: any;
    fontLigatures: any;
    selectionsOnLine: any;
    renderSpaceWidth: any;
    renderSpaceCharCode: number;
    c(e: any): boolean;
    equals(e: any): any;
}
declare class Q {
    constructor(e: any, n: any);
    partIndex: any;
    charIndex: any;
}
declare class y {
    static c(e: any): number;
    static d(e: any): number;
    constructor(e: any, n: any);
    length: any;
    e: Uint32Array<any>;
    f: Uint32Array<any>;
    setColumnInfo(e: any, n: any, r: any, a: any): void;
    getHorizontalOffset(e: any): number | undefined;
    g(e: any): number | undefined;
    getDomPosition(e: any): Q;
    getColumn(e: any, n: any): number;
    h(e: any, n: any, r: any): number;
    inflate(): (number | undefined)[][];
}
declare class ee {
    constructor(e: any, n: any, r: any, a: any);
    characterMapping: any;
    html: any;
    containsRTL: any;
    containsForeignElements: any;
}
declare function ge(t: any): ee;
declare var K: any;
declare var V: any;
export { Z as $$bb, U as $0bb, Ce as $7bb, Q as $8bb, y as $9bb, ee as $_bb, ge as $acb, K as ForeignElementType, V as RenderWhitespace };
//# sourceMappingURL=viewLineRenderer.d.ts.map