declare class q {
    constructor(t: any, e: any);
    lastViewCursorsRenderData: any;
    lastTextareaPosition: any;
}
declare class C {
    static c(t: any, e?: null): M | null;
    static createUnknown(t: any, e: any, n: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: any;
        range: M | null;
    };
    static createTextarea(t: any, e: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: null;
        range: null;
    };
    static createMargin(t: any, e: any, n: any, i: any, o: any, r: any): {
        type: any;
        element: any;
        mouseColumn: any;
        position: any;
        range: any;
        detail: any;
    };
    static createViewZone(t: any, e: any, n: any, i: any, o: any): {
        type: any;
        element: any;
        mouseColumn: any;
        position: any;
        range: M | null;
        detail: any;
    };
    static createContentText(t: any, e: any, n: any, i: any, o: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: any;
        range: M | null;
        detail: any;
    };
    static createContentEmpty(t: any, e: any, n: any, i: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: any;
        range: M | null;
        detail: any;
    };
    static createContentWidget(t: any, e: any, n: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: null;
        range: null;
        detail: any;
    };
    static createScrollbar(t: any, e: any, n: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: any;
        range: M | null;
    };
    static createOverlayWidget(t: any, e: any, n: any): {
        type: number;
        element: any;
        mouseColumn: any;
        position: null;
        range: null;
        detail: any;
    };
    static createOutsideEditor(t: any, e: any, n: any, i: any): {
        type: number;
        element: null;
        mouseColumn: any;
        position: any;
        range: M | null;
        outsidePosition: any;
        outsideDistance: any;
    };
    static f(t: any): "UNKNOWN" | "TEXTAREA" | "GUTTER_GLYPH_MARGIN" | "GUTTER_LINE_NUMBERS" | "GUTTER_LINE_DECORATIONS" | "GUTTER_VIEW_ZONE" | "CONTENT_TEXT" | "CONTENT_EMPTY" | "CONTENT_VIEW_ZONE" | "CONTENT_WIDGET" | "OVERVIEW_RULER" | "SCROLLBAR" | "OVERLAY_WIDGET";
    static toString(t: any): string;
}
declare class W {
    static getZoneAtCoord(t: any, e: any): {
        viewZoneId: any;
        afterLineNumber: any;
        positionBefore: g | null;
        positionAfter: g | null;
        position: g | null;
    } | null;
    static g(t: any, e: any, n: any): any;
    constructor(t: any, e: any, n: any);
    viewModel: any;
    layoutInfo: any;
    viewDomNode: any;
    viewLinesGpu: any;
    lineHeight: any;
    stickyTabStops: any;
    typicalHalfwidthCharacterWidth: any;
    lastRenderData: any;
    c: any;
    f: any;
    getZoneAtCoord(t: any): {
        viewZoneId: any;
        afterLineNumber: any;
        positionBefore: g | null;
        positionAfter: g | null;
        position: g | null;
    } | null;
    getFullLineRangeAtCoord(t: any): {
        range: M;
        isAfterLines: boolean;
    };
    getLineNumberAtVerticalOffset(t: any): any;
    isAfterLines(t: any): any;
    isInTopPadding(t: any): any;
    isInBottomPadding(t: any): any;
    getVerticalOffsetForLineNumber(t: any): any;
    findAttribute(t: any, e: any): any;
    getLineWidth(t: any): any;
    visibleRangeForPosition(t: any, e: any): any;
    getPositionFromDOMInfo(t: any, e: any): any;
    getCurrentScrollTop(): any;
    getCurrentScrollLeft(): any;
}
declare class c {
    static g(t: any, e: any): any;
    static h(t: any, e: any): any;
    static j(t: any, e: any): any;
    static k(t: any, e: any): any;
    static l(t: any, e: any): any;
    static m(t: any, e: any): any;
    static n(t: any, e: any): any;
    static o(t: any, e: any): any;
    static p(t: any, e: any): any;
    static q(t: any, e: any): any;
    static s(t: any, e: any): any;
    static _getMouseColumn(t: any, e: any): number;
    static u(t: any, e: any, n: any, i: any, o: any): any;
    static v(t: any, e: any): any;
    static w(t: any, e: any): any;
    static z(t: any, e: any): any;
    static A(t: any, e: any): any;
    static doHitTest(t: any, e: any): O;
    constructor(t: any, e: any);
    c: any;
    f: any;
    mouseTargetIsWidget(t: any): boolean;
    createMouseTarget(t: any, e: any, n: any, i: any, o: any): any;
    getMouseColumn(t: any): number;
}
import { $eC as M } from "../../common/core/range.js";
import { $dC as g } from "../../common/core/position.js";
declare class O {
    constructor(t?: null);
    hitTarget: any;
    type: number;
}
export { q as $Dcb, C as $Ecb, W as $Fcb, c as $Gcb };
//# sourceMappingURL=mouseTarget.d.ts.map