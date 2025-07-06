declare const c: false;
declare class a {
    static readFromTextArea(e: any, t: any): a;
    static deduceInput(e: any, t: any, l: any): {
        text: any;
        replacePrevCharCnt: number;
        replaceNextCharCnt: number;
        positionDelta: number;
    };
    static deduceAndroidCompositionInput(e: any, t: any): {
        text: any;
        replacePrevCharCnt: number;
        replaceNextCharCnt: number;
        positionDelta: number;
    };
    static fromScreenReaderContentState(e: any): a;
    constructor(e: any, t: any, l: any, n: any, i: any);
    value: any;
    selectionStart: any;
    selectionEnd: any;
    selection: any;
    newlineCountBeforeSelection: any;
    toString(): string;
    collapseSelection(): a;
    isWrittenToTextArea(e: any, t: any): boolean;
    writeToTextArea(e: any, t: any, l: any): void;
    deduceEditorPosition(e: any): any[];
    a(e: any, t: any, l: any): any[];
}
export { c as $Rcb, a as $Scb };
//# sourceMappingURL=textAreaEditContextState.d.ts.map