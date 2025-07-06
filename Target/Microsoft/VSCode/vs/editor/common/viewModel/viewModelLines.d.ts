declare class F {
    constructor(e: any, t: any, n: any, i: any, s: any, a: any, c: any, u: any, l: any, o: any);
    c: any;
    d: any;
    e: number;
    f: any;
    h: any;
    k: any;
    l: any;
    q: any;
    m: any;
    n: any;
    o: any;
    dispose(): void;
    v: any;
    createCoordinatesConverter(): B;
    w(e: any, t: any): void;
    s: any;
    u: D | undefined;
    getHiddenAreas(): any;
    setHiddenAreas(e: any): any;
    modelPositionIsVisible(e: any, t: any): any;
    getModelLineViewLineCount(e: any): any;
    setTabSize(e: any): boolean;
    setWrappingSettings(e: any, t: any, n: any, i: any, s: any): boolean;
    createLineBreaksComputer(): any;
    onModelFlushed(): void;
    onModelLinesDeleted(e: any, t: any, n: any): C.$aab | null;
    onModelLinesInserted(e: any, t: any, n: any, i: any): C.$bab | null;
    onModelLineChanged(e: any, t: any, n: any): (boolean | C.$__ | C.$aab | C.$bab | null)[];
    acceptVersionId(e: any): void;
    getViewLineCount(): number;
    x(e: any): number;
    getActiveIndentGuide(e: any, t: any, n: any): {
        startLineNumber: any;
        endLineNumber: any;
        indent: any;
    };
    y(e: any): T;
    z(e: any): any;
    A(e: any): any;
    B(e: any): b;
    C(e: any): b;
    D(e: any, t: any): any[];
    getViewLinesBracketGuides(e: any, t: any, n: any, i: any): any[];
    getViewLinesIndentGuides(e: any, t: any): any[];
    getViewLineContent(e: any): any;
    getViewLineLength(e: any): any;
    getViewLineMinColumn(e: any): any;
    getViewLineMaxColumn(e: any): any;
    getViewLineData(e: any): any;
    getViewLinesData(e: any, t: any, n: any): any[];
    validateViewPosition(e: any, t: any, n: any): any;
    validateViewRange(e: any, t: any): w;
    convertViewPositionToModelPosition(e: any, t: any): any;
    convertViewRangeToModelRange(e: any): w;
    convertModelPositionToViewPosition(e: any, t: any, n?: number, i?: boolean, s?: boolean): any;
    convertModelRangeToViewRange(e: any, t?: number): w;
    getViewLineNumberOfModelPosition(e: any, t: any): any;
    getDecorationsInRange(e: any, t: any, n: any, i: any, s: any, a: any): any;
    getInjectedTextAt(e: any): any;
    normalizePosition(e: any, t: any): any;
    getLineIndentColumn(e: any): any;
}
declare class U {
    constructor(e: any);
    model: any;
    dispose(): void;
    createCoordinatesConverter(): y;
    getHiddenAreas(): never[];
    setHiddenAreas(e: any): boolean;
    setTabSize(e: any): boolean;
    setWrappingSettings(e: any, t: any, n: any, i: any): boolean;
    createLineBreaksComputer(): {
        addRequest: (t: any, n: any, i: any) => void;
        finalize: () => any[];
    };
    onModelFlushed(): void;
    onModelLinesDeleted(e: any, t: any, n: any): C.$aab;
    onModelLinesInserted(e: any, t: any, n: any, i: any): C.$bab;
    onModelLineChanged(e: any, t: any, n: any): (boolean | C.$__ | null)[];
    acceptVersionId(e: any): void;
    getViewLineCount(): any;
    getActiveIndentGuide(e: any, t: any, n: any): {
        startLineNumber: any;
        endLineNumber: any;
        indent: number;
    };
    getViewLinesBracketGuides(e: any, t: any, n: any): any[];
    getViewLinesIndentGuides(e: any, t: any): any[];
    getViewLineContent(e: any): any;
    getViewLineLength(e: any): any;
    getViewLineMinColumn(e: any): any;
    getViewLineMaxColumn(e: any): any;
    getViewLineData(e: any): O;
    getViewLinesData(e: any, t: any, n: any): (O | null)[];
    getDecorationsInRange(e: any, t: any, n: any, i: any, s: any, a: any): any;
    normalizePosition(e: any, t: any): any;
    getLineIndentColumn(e: any): any;
    getInjectedTextAt(e: any): null;
}
declare class B {
    constructor(e: any);
    c: any;
    convertViewPositionToModelPosition(e: any): any;
    convertViewRangeToModelRange(e: any): any;
    validateViewPosition(e: any, t: any): any;
    validateViewRange(e: any, t: any): any;
    convertModelPositionToViewPosition(e: any, t: any, n: any, i: any): any;
    convertModelRangeToViewRange(e: any, t: any): any;
    modelPositionIsVisible(e: any): any;
    getModelLineViewLineCount(e: any): any;
    getViewLineNumberOfModelPosition(e: any, t: any): any;
}
import { $H2 as D } from "../model/prefixSumComputer.js";
import * as C from "../viewEvents.js";
declare class T {
    constructor(e: any, t: any);
    get isWrappedLineContinuation(): boolean;
    modelLineNumber: any;
    modelLineWrappedLineIdx: any;
}
import { $dC as b } from "../core/position.js";
import { $eC as w } from "../core/range.js";
declare class y {
    constructor(e: any);
    c: any;
    d(e: any): any;
    e(e: any): any;
    convertViewPositionToModelPosition(e: any): any;
    convertViewRangeToModelRange(e: any): any;
    validateViewPosition(e: any, t: any): any;
    validateViewRange(e: any, t: any): any;
    convertModelPositionToViewPosition(e: any): any;
    convertModelRangeToViewRange(e: any): any;
    modelPositionIsVisible(e: any): boolean;
    modelRangeIsVisible(e: any): boolean;
    getModelLineViewLineCount(e: any): number;
    getViewLineNumberOfModelPosition(e: any, t: any): any;
}
import { $lab as O } from "../viewModel.js";
export { F as $jeb, U as $keb };
//# sourceMappingURL=viewModelLines.d.ts.map