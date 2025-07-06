declare class w {
    constructor(e: any, t: any, i: any, s: any, h: any);
    id: any;
    afterLineNumber: any;
    ordinal: any;
    height: any;
    minWidth: any;
    prefixSum: number;
}
declare class H {
    static findInsertionIndex(e: any, t: any, i: any): number;
    constructor(e: any, t: any, i: any, s: any, h: any);
    d: string;
    e: C;
    f: number;
    g: any[];
    h: number;
    j: number;
    k: any;
    l: any;
    m: any;
    n: A;
    setDefaultLineHeight(e: any): void;
    setPadding(e: any, t: any): void;
    onFlushed(e: any, t: any): void;
    changeLineHeights(e: any): boolean;
    changeWhitespace(e: any): boolean;
    _commitPendingChanges(e: any, t: any, i: any): void;
    o(e: any): void;
    p(e: any): number;
    q(e: any, t: any, i: any): void;
    r(e: any): void;
    onLinesDeleted(e: any, t: any): void;
    onLinesInserted(e: any, t: any): void;
    getWhitespacesTotalHeight(): any;
    getWhitespacesAccumulatedHeight(e: any): any;
    getLinesTotalHeight(): any;
    getWhitespaceAccumulatedHeightBeforeLineNumber(e: any): any;
    s(e: any): number;
    t(e: any): number;
    getFirstWhitespaceIndexAfterLineNumber(e: any): number;
    getVerticalOffsetForLineNumber(e: any, t?: boolean): any;
    getLineHeightForLineNumber(e: any): any;
    getVerticalOffsetAfterLineNumber(e: any, t?: boolean): any;
    hasWhitespace(): boolean;
    getWhitespaceMinWidth(): number;
    isAfterLines(e: any): boolean;
    isInTopPadding(e: any): boolean;
    isInBottomPadding(e: any): boolean;
    getLineNumberAtOrAfterVerticalOffset(e: any): number;
    getLinesViewportData(e: any, t: any): {
        bigNumbersDelta: number;
        startLineNumber: number;
        endLineNumber: number;
        relativeVerticalOffset: number[];
        centeredLineNumber: number;
        completelyVisibleStartLineNumber: number;
        completelyVisibleEndLineNumber: number;
        lineHeight: any;
    };
    getVerticalOffsetForWhitespaceIndex(e: any): any;
    getWhitespaceIndexAtOrAfterVerticallOffset(e: any): number;
    getWhitespaceAtVerticalOffset(e: any): {
        id: any;
        afterLineNumber: any;
        verticalOffset: any;
        height: any;
    } | null;
    getWhitespaceViewportData(e: any, t: any): {
        id: any;
        afterLineNumber: any;
        verticalOffset: any;
        height: any;
    }[];
    getWhitespaces(): any[];
    getWhitespacesCount(): number;
    getIdForWhitespaceIndex(e: any): any;
    getAfterLineNumberForWhitespaceIndex(e: any): any;
    getHeightForWhitespaceIndex(e: any): any;
}
declare class C {
    c: boolean;
    d: any[];
    e: any[];
    f: any[];
    insert(e: any): void;
    change(e: any): void;
    remove(e: any): void;
    commit(e: any): void;
}
import { $eeb as A } from "./lineHeights.js";
export { w as $feb, H as $geb };
//# sourceMappingURL=linesLayout.d.ts.map