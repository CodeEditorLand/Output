declare class I {
    constructor(t: any, i: any);
    d: any;
    a: any;
    b: boolean;
    c: any;
    getDomNode(): any;
    setDomNode(t: any): void;
    onContentChanged(): void;
    onTokensChanged(): void;
    onDecorationsChanged(): void;
    onOptionsChanged(t: any): void;
    onSelectionChanged(): boolean;
    renderLine(t: any, i: any, r: any, s: any, e: any): boolean;
    layoutLine(t: any, i: any, r: any): void;
    getWidth(t: any): any;
    getWidthIsFast(): any;
    needsMonospaceFontCheck(): boolean;
    monospaceAssumptionsAreValid(): boolean;
    onMonospaceAssumptionsInvalidated(): void;
    getVisibleRangesForRange(t: any, i: any, r: any, s: any): C | null;
    getColumnOfNodeOffset(t: any, i: any): any;
}
declare function z(a: any, t: any, i: any): any;
import { $Ubb as C } from "../../view/renderingContext.js";
export { I as $ucb, z as $vcb };
//# sourceMappingURL=viewLine.d.ts.map