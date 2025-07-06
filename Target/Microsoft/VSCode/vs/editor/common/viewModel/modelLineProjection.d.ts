export { R as $ieb };
declare function R(d: any, t: any): I | O | W | undefined;
declare class I {
    isVisible(): boolean;
    setVisible(t: any): this | O | undefined;
    getProjectionData(): null;
    getViewLineCount(): number;
    getViewLineContent(t: any, e: any, n: any): any;
    getViewLineLength(t: any, e: any, n: any): any;
    getViewLineMinColumn(t: any, e: any, n: any): any;
    getViewLineMaxColumn(t: any, e: any, n: any): any;
    getViewLineData(t: any, e: any, n: any): k;
    getViewLinesData(t: any, e: any, n: any, i: any, s: any, u: any, l: any): void;
    getModelColumnOfViewPosition(t: any, e: any): any;
    getViewPositionOfModelPosition(t: any, e: any): D;
    getViewLineNumberOfModelPosition(t: any, e: any): any;
    normalizePosition(t: any, e: any, n: any): any;
    getInjectedTextAt(t: any, e: any): null;
}
declare class O {
    isVisible(): boolean;
    setVisible(t: any): I | this | undefined;
    getProjectionData(): null;
    getViewLineCount(): number;
    getViewLineContent(t: any, e: any, n: any): void;
    getViewLineLength(t: any, e: any, n: any): void;
    getViewLineMinColumn(t: any, e: any, n: any): void;
    getViewLineMaxColumn(t: any, e: any, n: any): void;
    getViewLineData(t: any, e: any, n: any): void;
    getViewLinesData(t: any, e: any, n: any, i: any, s: any, u: any, l: any): void;
    getModelColumnOfViewPosition(t: any, e: any): void;
    getViewPositionOfModelPosition(t: any, e: any): void;
    getViewLineNumberOfModelPosition(t: any, e: any): void;
    normalizePosition(t: any, e: any, n: any): void;
    getInjectedTextAt(t: any, e: any): void;
}
declare class W {
    constructor(t: any, e: any);
    a: any;
    b: any;
    isVisible(): any;
    setVisible(t: any): this;
    getProjectionData(): any;
    getViewLineCount(): any;
    getViewLineContent(t: any, e: any, n: any): any;
    getViewLineLength(t: any, e: any, n: any): any;
    getViewLineMinColumn(t: any, e: any, n: any): any;
    getViewLineMaxColumn(t: any, e: any, n: any): any;
    getViewLineData(t: any, e: any, n: any): any;
    getViewLinesData(t: any, e: any, n: any, i: any, s: any, u: any, l: any): void;
    c(t: any, e: any, n: any): k;
    getModelColumnOfViewPosition(t: any, e: any): any;
    getViewPositionOfModelPosition(t: any, e: any, n?: number): any;
    getViewLineNumberOfModelPosition(t: any, e: any): any;
    normalizePosition(t: any, e: any, n: any): any;
    getInjectedTextAt(t: any, e: any): any;
    d(): void;
}
import { $lab as k } from "../viewModel.js";
import { $dC as D } from "../core/position.js";
//# sourceMappingURL=modelLineProjection.d.ts.map