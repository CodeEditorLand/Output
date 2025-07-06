export { Wt as $pdb };
declare class Wt extends tt {
    t: ct;
    tokensColorTracker: any;
    c: any[];
    f: any[] | null;
    options: O;
    h: never[] | _ | ({
        type: string;
        _oldIndex: number;
        deleteFromLineNumber: number;
        deleteToLineNumber: number;
        _i?: never;
        insertFromLineNumber?: never;
        insertToLineNumber?: never;
    } | {
        type: string;
        _i: number;
        insertFromLineNumber: number;
        insertToLineNumber: number;
        _oldIndex?: never;
        deleteFromLineNumber?: never;
        deleteToLineNumber?: never;
    })[] | {
        type: string;
    }[] | null | undefined;
    n: boolean;
    w: F;
    getDomNode(): import("../../../../base/browser/fastDomNode.js").$N7;
    z(): boolean;
    onLinesChanged(t: any): any;
    onTokensChanged(t: any): any;
    prepareRender(t: any): void;
    render(t: any): void;
    C(): void;
    getLineCount(): any;
    getRealLineCount(): any;
    getLineContent(t: any): any;
    getLineMaxColumn(t: any): any;
    getMinimapLinesRenderingData(t: any, i: any, e: any): any;
    getSelections(): any[];
    getMinimapDecorationsInViewport(t: any, i: any): any;
    getSectionHeaderDecorationsInViewport(t: any, i: any): any;
    D(t: any, i: any): any;
    getSectionHeaderText(t: any, i: any): any;
    getOptions(): any;
    revealLineNumber(t: any): void;
    setScrollTop(t: any): void;
}
import { $Wbb as tt } from "../../view/viewPart.js";
import { $Lc as ct } from "../../../../base/common/map.js";
declare class O {
    static c(t: any, i: any): any;
    static d(t: any): number;
    static f(t: any, i: any): any;
    constructor(t: any, i: any, e: any);
    renderMinimap: any;
    size: any;
    minimapHeightIsEditorHeight: any;
    scrollBeyondLastLine: any;
    paddingTop: any;
    paddingBottom: any;
    showSlider: any;
    autohide: any;
    pixelRatio: any;
    typicalHalfwidthCharacterWidth: any;
    lineHeight: any;
    minimapLeft: any;
    minimapWidth: any;
    minimapHeight: any;
    canvasInnerWidth: any;
    canvasInnerHeight: any;
    canvasOuterWidth: any;
    canvasOuterHeight: any;
    isSampling: any;
    editorHeight: any;
    fontScale: any;
    minimapLineHeight: any;
    minimapCharWidth: number;
    sectionHeaderFontFamily: string;
    sectionHeaderFontSize: number;
    sectionHeaderLetterSpacing: any;
    sectionHeaderFontColor: any;
    charRenderer: (...args: any[]) => any;
    defaultBackgroundColor: any;
    backgroundColor: any;
    foregroundAlpha: number;
    equals(t: any): any;
}
declare class _ {
    static compute(t: any, i: any, e: any): (never[] | null)[] | (_ | ({
        type: string;
        _oldIndex: number;
        deleteFromLineNumber: number;
        deleteToLineNumber: number;
        _i?: never;
        insertFromLineNumber?: never;
        insertToLineNumber?: never;
    } | {
        type: string;
        _i: number;
        insertFromLineNumber: number;
        insertToLineNumber: number;
        _oldIndex?: never;
        deleteFromLineNumber?: never;
        deleteToLineNumber?: never;
    })[] | {
        type: string;
    }[])[];
    constructor(t: any, i: any);
    samplingRatio: any;
    minimapLines: any;
    modelLineToMinimapLine(t: any): number;
    modelLineRangeToMinimapLineRange(t: any, i: any): number[] | null;
    decorationLineRangeToMinimapLineRange(t: any, i: any): number[];
    onLinesDeleted(t: any): any[];
    onLinesInserted(t: any): void;
}
declare class F extends Z {
    static eb(t: any, i: any, e: any): any;
    static fb(t: any, i: any, e: any, n: any, s: any, o: any, r: any, d: any, h: any, a: any): void;
    static hb(t: any, i: any, e: any, n: any, s: any, o: any): (number | boolean[])[];
    static ib(t: any, i: any, e: any, n: any, s: any, o: any, r: any, d: any, h: any, a: any, l: any, p: any, m: any, f: any, c: any): void;
    constructor(t: any, i: any);
    M: boolean;
    N: boolean;
    c: any;
    f: any;
    J: any;
    O: z | null;
    L: any;
    h: import("../../../../base/browser/fastDomNode.js").$N7;
    m: import("../../../../base/browser/fastDomNode.js").$N7;
    n: import("../../../../base/browser/fastDomNode.js").$N7;
    t: import("../../../../base/browser/fastDomNode.js").$N7;
    u: import("../../../../base/browser/fastDomNode.js").$N7;
    w: import("../../../../base/browser/fastDomNode.js").$N7;
    z: {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    C: G;
    D: {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    F: any;
    G: {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    H: {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    I: {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    P(t: any, i: any, e: any): void;
    Q(t: any): void;
    R(): string;
    getDomNode(): import("../../../../base/browser/fastDomNode.js").$N7;
    S(): void;
    U(): any;
    onDidChangeOptions(): void;
    onSelectionChanged(): boolean;
    onDecorationsChanged(): boolean;
    onFlushed(): boolean;
    onLinesChanged(t: any, i: any): any;
    onLinesDeleted(t: any, i: any): boolean;
    onLinesInserted(t: any, i: any): boolean;
    onScrollChanged(): boolean;
    onThemeChanged(): boolean;
    onTokensChanged(t: any): any;
    onTokensColorsChanged(): boolean;
    onZonesChanged(): boolean;
    render(t: any): void;
    W(t: any): void;
    X(t: any, i: any, e: any, n: any, s: any): void;
    Y(t: any, i: any, e: any, n: any, s: any): void;
    Z(t: any, i: any, e: any, n: any, s: any, o: any, r: any, d: any): void;
    $(t: any, i: any, e: any, n: any, s: any, o: any, r: any, d: any): void;
    ab(t: any, i: any, e: any, n: any, s: any, o: any, r: any, d: any, h: any, a: any, l: any): void;
    bb(t: any, i: any, e: any, n: any, s: any, o: any): any;
    cb(t: any, i: any, e: any, n: any, s: any, o: any): void;
    db(t: any): void;
    gb(t: any): any;
}
import { $vd as Z } from "../../../../base/common/lifecycle.js";
declare class z {
    static h(t: any, i: any, e: any): Uint8ClampedArray<ArrayBuffer>;
    constructor(t: any, i: any, e: any, n: any);
    c: Uint8ClampedArray<ArrayBuffer>;
    d: any[];
    f: number;
    getBuffer(): any;
}
import { $P7 as G } from "../../../../base/browser/globalPointerMoveMonitor.js";
//# sourceMappingURL=minimap.d.ts.map