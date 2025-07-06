declare function A(i: any): boolean;
declare class W {
    static shouldRecreate(t: any): any;
    constructor(t: any, e: any, n: any, o: any);
    languageConfigurationService: any;
    a: any;
    readOnly: any;
    tabSize: any;
    indentSize: any;
    insertSpaces: any;
    stickyTabStops: any;
    lineHeight: any;
    typicalHalfwidthCharacterWidth: any;
    pageSize: number;
    useTabStops: any;
    wordSeparators: any;
    emptySelectionClipboard: any;
    copyWithSyntaxHighlighting: any;
    multiCursorMergeOverlapping: any;
    multiCursorPaste: any;
    multiCursorLimit: any;
    autoClosingBrackets: any;
    autoClosingComments: any;
    autoClosingQuotes: any;
    autoClosingDelete: any;
    autoClosingOvertype: any;
    autoSurround: any;
    autoIndent: any;
    wordSegmenterLocales: any;
    overtypeOnPaste: any;
    surroundingPairs: {};
    b: {} | null;
    shouldAutoCloseBefore: {
        quote: ((i: any) => boolean) | undefined;
        comment: ((i: any) => boolean) | undefined;
        bracket: ((i: any) => boolean) | undefined;
    };
    autoClosingPairs: any;
    blockCommentStartToken: any;
    get electricChars(): {};
    get inputMode(): string;
    onElectricCharacter(t: any, e: any, n: any): any;
    normalizeIndentation(t: any): string;
    d(t: any, e: any, n: any): ((i: any) => boolean) | undefined;
    f(t: any, e: any): (o: any) => boolean;
    visibleColumnFromColumn(t: any, e: any): number;
    columnFromVisibleColumn(t: any, e: any, n: any): any;
}
declare class d {
    static fromModelState(t: any): k;
    static fromViewState(t: any): B;
    static fromModelSelection(t: any): k;
    static fromModelSelections(t: any): k[];
    constructor(t: any, e: any);
    modelState: any;
    viewState: any;
    equals(t: any): any;
}
declare class k {
    constructor(t: any);
    modelState: any;
    viewState: any;
}
declare class B {
    constructor(t: any);
    modelState: any;
    viewState: any;
}
declare class r {
    static a(t: any, e: any): h;
    constructor(t: any, e: any, n: any, o: any, s: any);
    selectionStart: any;
    selectionStartKind: any;
    selectionStartLeftoverVisibleColumns: any;
    position: any;
    leftoverVisibleColumns: any;
    selection: h;
    equals(t: any): any;
    hasSelection(): boolean;
    move(t: any, e: any, n: any, o: any): r;
}
declare class F {
    constructor(t: any, e: any, n: any);
    type: any;
    commands: any;
    shouldPushStackElementBefore: any;
    shouldPushStackElementAfter: any;
}
declare var f: any;
declare var m: any;
import { $UC as h } from "./core/selection.js";
export { A as $1_, W as $U_, d as $V_, k as $W_, B as $X_, r as $Y_, F as $Z_, f as EditOperationType, m as SelectionStartKind };
//# sourceMappingURL=cursorCommon.d.ts.map