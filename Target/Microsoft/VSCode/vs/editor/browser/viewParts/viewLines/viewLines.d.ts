export { V as $edb };
declare class V extends O {
    constructor(t: any, i: any, s: any);
    h: any;
    j: any;
    n: any;
    s: any;
    t: any;
    w: any;
    y: boolean;
    z: R;
    b: any;
    c: HTMLDivElement;
    f: I;
    g: import("../../../../base/browser/fastDomNode.js").$N7;
    C: number;
    D: M;
    F: M;
    H: $;
    G: H | P | null;
    I: any;
    J: any;
    getDomNode(): import("../../../../base/browser/fastDomNode.js").$N7;
    L(): boolean;
    onScrollChanged(t: any): any;
    getPositionFromDOMInfo(t: any, i: any): p | null;
    M(t: any): any;
    N(t: any): any;
    getLineWidth(t: any): any;
    linesVisibleRangesForRange(t: any, i: any): G[] | null;
    O(t: any, i: any, s: any): any;
    visibleRangeForPosition(t: any): F | null;
    updateLineWidths(): void;
    P(): boolean;
    Q(): void;
    R(t: any): void;
    S(t: any): boolean;
    U(): void;
    prepareRender(): void;
    render(): void;
    renderText(t: any): void;
    W(t: any): void;
    X(t: any, i: any, s: any, e: any, n: any, o: any): any;
    Y(t: any): {
        scrollLeft: any;
        maxHorizontalOffset: number;
    } | null;
    Z(t: any, i: any, s: any, e: any, n: any, o: any): any;
}
import { $Wbb as O } from "../../view/viewPart.js";
import { $bcb as R } from "./viewLineOptions.js";
import { $Zbb as I } from "../../view/viewLayer.js";
import { $Zh as M } from "../../../../base/common/async.js";
declare class $ {
    a: T;
    getCurrentVisibleRange(): T;
    setCurrentVisibleRange(t: any): void;
}
declare class H {
    constructor(t: any, i: any, s: any, e: any, n: any, o: any, r: any);
    minimalReveal: any;
    lineNumber: any;
    startColumn: any;
    endColumn: any;
    startScrollTop: any;
    stopScrollTop: any;
    scrollType: any;
    type: string;
    minLineNumber: any;
    maxLineNumber: any;
}
declare class P {
    constructor(t: any, i: any, s: any, e: any, n: any);
    minimalReveal: any;
    selections: any;
    startScrollTop: any;
    stopScrollTop: any;
    scrollType: any;
    type: string;
    minLineNumber: any;
    maxLineNumber: any;
}
import { $dC as p } from "../../../common/core/position.js";
import { $Qbb as G } from "../../view/renderingContext.js";
import { $Tbb as F } from "../../view/renderingContext.js";
import { $eC as T } from "../../../common/core/range.js";
//# sourceMappingURL=viewLines.d.ts.map