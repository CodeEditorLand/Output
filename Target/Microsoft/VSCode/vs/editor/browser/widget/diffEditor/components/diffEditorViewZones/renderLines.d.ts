declare function N(a: any, t: any, i: any, r: any, s?: boolean): {
    heightInLines: number;
    minWidthInPx: number;
    viewLineCounts: any[];
};
declare class F {
    constructor(t: any, i?: any, r?: boolean, s?: boolean);
    lineTokens: any;
    lineBreakData: any;
    mightContainNonBasicASCII: boolean;
    mightContainRTL: boolean;
}
declare class p {
    static fromEditor(t: any): p;
    constructor(t: any, i: any, r: any, s: any, l: any, e: any, n: any, o: any, h: any, c: any, f: any, d?: boolean);
    tabSize: any;
    fontInfo: any;
    disableMonospaceOptimizations: any;
    typicalHalfwidthCharacterWidth: any;
    scrollBeyondLastColumn: any;
    lineHeight: any;
    lineDecorationsWidth: any;
    stopRenderingLineAfter: any;
    renderWhitespace: any;
    renderControlCharacters: any;
    fontLigatures: any;
    setWidth: boolean;
    withSetWidth(t: any): p;
    withScrollBeyondLastColumn(t: any): p;
}
export { N as $Ufb, F as $Vfb, p as $Wfb };
//# sourceMappingURL=renderLines.d.ts.map