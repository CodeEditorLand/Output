declare class h {
    constructor(t: any, e: any);
    c: any;
    viewportData: any;
    scrollWidth: any;
    scrollHeight: any;
    visibleRange: any;
    bigNumbersDelta: any;
    scrollTop: any;
    scrollLeft: any;
    viewportWidth: any;
    viewportHeight: any;
    getScrolledTopFromAbsoluteTop(t: any): number;
    getVerticalOffsetForLineNumber(t: any, e: any): any;
    getVerticalOffsetAfterLineNumber(t: any, e: any): any;
    getLineHeightForLineNumber(t: any): any;
    getDecorationsInViewport(): any;
}
declare class u extends h {
    constructor(t: any, e: any, i: any, r: any);
    d: any;
    e: any;
    linesVisibleRangesForRange(t: any, e: any): any;
    visibleRangeForPosition(t: any): any;
}
declare class a {
    static firstLine(t: any): any;
    static lastLine(t: any): any;
    constructor(t: any, e: any, i: any, r: any);
    outsideRenderedLine: any;
    lineNumber: any;
    ranges: any;
    continuesOnNextLine: any;
}
declare class o {
    static from(t: any): any[];
    constructor(t: any, e: any);
    left: number;
    width: number;
    toString(): string;
}
declare class c {
    static compare(t: any, e: any): number;
    constructor(t: any, e: any);
    left: any;
    width: any;
    toString(): string;
}
declare class g {
    constructor(t: any, e: any);
    outsideRenderedLine: any;
    originalLeft: any;
    left: number;
}
declare class f {
    constructor(t: any, e: any);
    outsideRenderedLine: any;
    ranges: any;
}
export { h as $Obb, u as $Pbb, a as $Qbb, o as $Rbb, c as $Sbb, g as $Tbb, f as $Ubb };
//# sourceMappingURL=renderingContext.d.ts.map