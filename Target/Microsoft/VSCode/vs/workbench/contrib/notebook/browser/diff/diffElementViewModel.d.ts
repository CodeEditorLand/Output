declare class F extends b {
    constructor(t: any, e: any, i: any, o: any, u: any, s: any, n: any, r: any, h: any, g: any);
    hideUnchangedCells(): void;
    set rawOutputHeight(t: void);
    get rawOutputHeight(): void;
    set outputStatusHeight(t: void);
    get outputStatusHeight(): void;
    set outputMetadataHeight(t: void);
    get outputMetadataHeight(): void;
    set editorHeight(t: void);
    get editorHeight(): void;
    set editorMargin(t: void);
    get editorMargin(): void;
    set metadataStatusHeight(t: void);
    get metadataStatusHeight(): void;
    set metadataHeight(t: void);
    get metadataHeight(): void;
    set renderOutput(t: boolean);
    get renderOutput(): boolean;
    m: boolean;
    get layoutInfo(): {
        width: number;
        editorHeight: number | undefined;
        editorMargin: number;
        metadataHeight: number;
        cellStatusHeight: number;
        metadataStatusHeight: number;
        rawOutputHeight: number;
        outputTotalHeight: number;
        outputStatusHeight: number;
        outputMetadataHeight: number;
        bodyMargin: number;
        totalHeight: number;
        layoutState: any;
    };
    get totalHeight(): number;
    get n(): any;
    get r(): any;
    type: any;
    index: any;
    w: any;
    diffEditorHeightCalculator: any;
    f: any;
    onDidStateChange: any;
    h: any;
    onHideUnchangedCells: any;
    s: any;
    t: any;
    u: any;
    original: any;
    modified: any;
    g: {
        width: number;
        editorHeight: number | undefined;
        editorMargin: number;
        metadataHeight: number;
        cellStatusHeight: number;
        metadataStatusHeight: number;
        rawOutputHeight: number;
        outputTotalHeight: number;
        outputStatusHeight: number;
        outputMetadataHeight: number;
        bodyMargin: number;
        totalHeight: number;
        layoutState: any;
    };
    cellFoldingState: any;
    metadataFoldingState: any;
    outputFoldingState: any;
    layoutChange(): void;
    y(t: any): number | undefined;
    z(t: any): void;
    getHeight(t: any): any;
    C(t: any): any;
    computeInputEditorHeight(t: any): any;
    D(t: any, e: any): any;
    F(t: any): void;
    getComputedCellContainerWidth(t: any, e: any, i: any): number;
    getOutputEditorViewState(): any;
    saveOutputEditorViewState(t: any): void;
    getMetadataEditorViewState(): any;
    saveMetadataEditorViewState(t: any): void;
    getSourceEditorViewState(): any;
    saveSpirceEditorViewState(t: any): void;
}
declare class it extends F {
    constructor(t: any, e: any, i: any, o: any, u: any, s: any, n: any, r: any, h: any, g: any, c: any);
    get originalDocument(): any;
    get modifiedDocument(): any;
    otherDocumentTextModel: any;
    checkIfInputModified(): false | {
        reason: string;
    };
    checkIfOutputsModified(): false | {
        reason: string | undefined;
        kind: number;
    };
    checkMetadataIfModified(): false | {
        reason: undefined;
    };
    updateOutputHeight(t: any, e: any, i: any): void;
    getOutputOffsetInContainer(t: any, e: any): any;
    getOutputOffsetInCell(t: any, e: any): any;
    isOutputEmpty(): boolean;
    getRichOutputTotalHeight(): number;
    getNestedCellViewModel(t: any): any;
    getCellByUri(t: any): any;
    H(): Promise<void>;
    G: any;
    I(): Promise<void>;
    computeEditorHeights(): Promise<void>;
}
declare class at extends F {
    constructor(t: any, e: any, i: any, o: any, u: any, s: any, n: any, r: any, h: any, g: any, c: any);
    get cellViewModel(): any;
    get originalDocument(): any;
    get modifiedDocument(): any;
    otherDocumentTextModel: any;
    checkIfInputModified(): {
        reason: string;
    };
    getNestedCellViewModel(t: any): any;
    checkIfOutputsModified(): boolean;
    checkMetadataIfModified(): boolean;
    updateOutputHeight(t: any, e: any, i: any): void;
    getOutputOffsetInContainer(t: any, e: any): any;
    getOutputOffsetInCell(t: any, e: any): any;
    isOutputEmpty(): boolean;
    getRichOutputTotalHeight(): any;
    getCellByUri(t: any): any;
}
declare function ot(a: any, t: any): 1 | 2;
declare function L(a: any): any;
declare function ut(a: any): any;
declare const Z: 24;
declare const Q: 17;
declare const $: 1440;
declare class b extends k {
    constructor(t: any, e: any, i: any);
    mainDocumentTextModel: any;
    editorEventDispatcher: any;
    initData: any;
    c: any;
    onDidLayoutChange: any;
}
declare class tt extends b {
    type: string;
    hiddenCells: any[];
    f: any;
    onUnfoldHiddenCells: any;
    renderOutput: boolean;
    get totalHeight(): number;
    getHeight(t: any): number;
    layoutChange(): void;
    showHiddenCells(): void;
}
declare class et extends b {
    constructor(t: any, e: any, i: any, o: any, u: any, s: any, n: any);
    set editorHeight(t: void);
    get editorHeight(): void;
    set editorMargin(t: void);
    get editorMargin(): void;
    get layoutInfo(): {
        width: number;
        editorHeight: number;
        editorMargin: number;
        metadataHeight: number;
        cellStatusHeight: number;
        metadataStatusHeight: number;
        rawOutputHeight: number;
        outputTotalHeight: number;
        outputStatusHeight: number;
        outputMetadataHeight: number;
        bodyMargin: number;
        totalHeight: number;
        layoutState: any;
    };
    get totalHeight(): number;
    originalDocumentTextModel: any;
    modifiedDocumentTextModel: any;
    type: any;
    h: any;
    renderOutput: boolean;
    g: any;
    f: {
        width: number;
        editorHeight: number;
        editorMargin: number;
        metadataHeight: number;
        cellStatusHeight: number;
        metadataStatusHeight: number;
        rawOutputHeight: number;
        outputTotalHeight: number;
        outputStatusHeight: number;
        outputMetadataHeight: number;
        bodyMargin: number;
        totalHeight: number;
        layoutState: any;
    };
    cellFoldingState: any;
    originalMetadata: any;
    modifiedMetadata: any;
    computeHeights(): Promise<void>;
    layoutChange(): void;
    m(t: any): void;
    getHeight(t: any): any;
    n(t: any): any;
    computeInputEditorHeight(t: any): any;
    r(t: any): void;
    getComputedCellContainerWidth(t: any, e: any, i: any): number;
    getSourceEditorViewState(): any;
    saveSpirceEditorViewState(t: any): void;
}
declare var U: any;
declare var d: any;
import { $vd as k } from "../../../../../base/common/lifecycle.js";
export { F as $1zb, it as $2zb, at as $3zb, ot as $4zb, L as $5zb, ut as $6zb, Z as $Uzb, Q as $Vzb, $ as $Wzb, b as $Xzb, tt as $Yzb, et as $Zzb, U as OutputComparison, d as PropertyFoldingState };
//# sourceMappingURL=diffElementViewModel.d.ts.map