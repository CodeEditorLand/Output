declare class c {
    constructor(t: any, s: any, i: any, h: any, l: any, e: any, n: any);
    c: any;
    rawScrollLeft: any;
    rawScrollTop: any;
    width: any;
    scrollWidth: any;
    scrollLeft: any;
    height: any;
    scrollHeight: any;
    scrollTop: any;
    equals(t: any): boolean;
    withScrollDimensions(t: any, s: any): c;
    withScrollPosition(t: any): c;
    createScrollEvent(t: any, s: any): {
        inSmoothScrolling: any;
        oldWidth: any;
        oldScrollWidth: any;
        oldScrollLeft: any;
        width: any;
        scrollWidth: any;
        scrollLeft: any;
        oldHeight: any;
        oldScrollHeight: any;
        oldScrollTop: any;
        height: any;
        scrollHeight: any;
        scrollTop: any;
        widthChanged: boolean;
        scrollWidthChanged: boolean;
        scrollLeftChanged: boolean;
        heightChanged: boolean;
        scrollHeightChanged: boolean;
        scrollTopChanged: boolean;
    };
}
declare class D extends S {
    constructor(t: any);
    j: any;
    onScroll: any;
    c: any;
    f: any;
    g: c;
    h: any;
    setSmoothScrollDuration(t: any): void;
    validateScrollPosition(t: any): c;
    getScrollDimensions(): c;
    setScrollDimensions(t: any, s: any): void;
    getFutureScrollPosition(): any;
    getCurrentScrollPosition(): c;
    setScrollPositionNow(t: any): void;
    setScrollPositionSmooth(t: any, s: any): void;
    hasPendingScrollAnimation(): boolean;
    m(): void;
    n(t: any, s: any): void;
}
declare class d {
    constructor(t: any, s: any, i: any);
    scrollLeft: any;
    scrollTop: any;
    isDone: any;
}
declare class r {
    static start(t: any, s: any, i: any): r;
    constructor(t: any, s: any, i: any, h: any);
    from: any;
    to: any;
    duration: any;
    startTime: any;
    animationFrameDisposable: any;
    e(): void;
    c: ((i: any) => any) | undefined;
    d: ((i: any) => any) | undefined;
    f(t: any, s: any, i: any): (i: any) => any;
    dispose(): void;
    acceptScrollDimensions(t: any): void;
    tick(): d;
    g(t: any): d;
    combine(t: any, s: any, i: any): r;
}
declare var f: any;
import { $vd as S } from "./lifecycle.js";
export { c as $fC, D as $gC, d as $hC, r as $iC, f as ScrollbarVisibility };
//# sourceMappingURL=scrollable.d.ts.map