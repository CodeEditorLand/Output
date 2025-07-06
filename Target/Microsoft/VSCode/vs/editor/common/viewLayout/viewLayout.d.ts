export { P as $heb };
declare class P extends g {
    constructor(t: any, i: any, e: any, o: any);
    a: any;
    b: S;
    c: number;
    f: number;
    g: any;
    onDidScroll: any;
    onDidContentSizeChange: any;
    getScrollable(): any;
    onHeightMaybeChanged(): void;
    h(): void;
    onConfigurationChanged(t: any): void;
    onFlushed(t: any, i: any): void;
    onLinesDeleted(t: any, i: any): void;
    onLinesInserted(t: any, i: any): void;
    j(t: any, i: any): any;
    m(t: any, i: any, e: any): any;
    n(): void;
    getCurrentViewport(): c;
    getFutureViewport(): c;
    r(): any;
    setMaxLineWidth(t: any): void;
    setOverlayWidgetsMinWidth(t: any): void;
    s(): void;
    saveState(): {
        scrollTop: any;
        scrollTopWithoutViewZones: number;
        scrollLeft: any;
    };
    changeWhitespace(t: any): boolean;
    changeSpecialLineHeights(t: any): boolean;
    getVerticalOffsetForLineNumber(t: any, i?: boolean): any;
    getVerticalOffsetAfterLineNumber(t: any, i?: boolean): any;
    getLineHeightForLineNumber(t: any): any;
    isAfterLines(t: any): boolean;
    isInTopPadding(t: any): boolean;
    isInBottomPadding(t: any): boolean;
    getLineNumberAtVerticalOffset(t: any): number;
    getWhitespaceAtVerticalOffset(t: any): {
        id: any;
        afterLineNumber: any;
        verticalOffset: any;
        height: any;
    } | null;
    getLinesViewportData(): {
        bigNumbersDelta: number;
        startLineNumber: number;
        endLineNumber: number;
        relativeVerticalOffset: number[];
        centeredLineNumber: number;
        completelyVisibleStartLineNumber: number;
        completelyVisibleEndLineNumber: number;
        lineHeight: any;
    };
    getLinesViewportDataAtScrollTop(t: any): {
        bigNumbersDelta: number;
        startLineNumber: number;
        endLineNumber: number;
        relativeVerticalOffset: number[];
        centeredLineNumber: number;
        completelyVisibleStartLineNumber: number;
        completelyVisibleEndLineNumber: number;
        lineHeight: any;
    };
    getWhitespaceViewportData(): {
        id: any;
        afterLineNumber: any;
        verticalOffset: any;
        height: any;
    }[];
    getWhitespaces(): any[];
    getContentWidth(): any;
    getScrollWidth(): any;
    getContentHeight(): any;
    getScrollHeight(): any;
    getCurrentScrollLeft(): any;
    getCurrentScrollTop(): any;
    validateScrollPosition(t: any): any;
    setScrollPosition(t: any, i: any): void;
    hasPendingScrollAnimation(): any;
    deltaScrollNow(t: any, i: any): void;
}
import { $vd as g } from "../../../base/common/lifecycle.js";
import { $geb as S } from "./linesLayout.js";
import { $jab as c } from "../viewModel.js";
//# sourceMappingURL=viewLayout.d.ts.map