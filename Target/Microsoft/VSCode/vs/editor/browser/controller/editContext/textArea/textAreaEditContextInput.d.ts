declare let I: {
    new (t: any, e: any, n: any, h: any, r: any, p: any): {
        readonly textAreaState: f | undefined;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        a: any;
        onFocus: any;
        b: any;
        onBlur: any;
        c: any;
        onKeyDown: any;
        f: any;
        onKeyUp: any;
        g: any;
        onCut: any;
        h: any;
        onPaste: any;
        j: any;
        onType: any;
        m: any;
        onCompositionStart: any;
        n: any;
        onCompositionUpdate: any;
        r: any;
        onCompositionEnd: any;
        s: any;
        onSelectionChangeRequest: any;
        u: any;
        t: any;
        w: f | undefined;
        y: {
            j: any;
            l: any;
            g: any;
            m: any;
            dispose(): void;
        } | null;
        z: boolean;
        C: K | null;
        _initializeFromTest(): void;
        L(): {
            j: any;
            l: any;
            g: any;
            m: any;
            dispose(): void;
        };
        dispose(): void;
        focusTextArea(): void;
        isFocused(): boolean;
        refreshFocusState(): void;
        M(t: any): void;
        N(t: any, e: any): void;
        writeNativeTextAreaContent(t: any): void;
        O(t: any): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class J extends b {
    constructor(t: any);
    get ownerDocument(): any;
    c: any;
    a: any;
    onSyntheticTap: any;
    b: number;
    onKeyDown: any;
    onKeyPress: any;
    onKeyUp: any;
    onCompositionStart: any;
    onCompositionUpdate: any;
    onCompositionEnd: any;
    onBeforeInput: any;
    onInput: any;
    onCut: any;
    onCopy: any;
    onPaste: any;
    onFocus: any;
    onBlur: any;
    hasFocus(): boolean;
    setIgnoreSelectionChangeTime(t: any): void;
    getIgnoreSelectionChangeTime(): number;
    resetSelectionChangeTime(): void;
    getValue(): any;
    setValue(t: any, e: any): void;
    getSelectionStart(): any;
    getSelectionEnd(): any;
    setSelectionRange(t: any, e: any, n: any): void;
}
declare var g: any;
import { $Scb as f } from "./textAreaEditContextState.js";
declare class K {
    a: number;
    handleCompositionUpdate(t: any): {
        text: any;
        replacePrevCharCnt: number;
        replaceNextCharCnt: number;
        positionDelta: number;
    };
}
import { $vd as b } from "../../../../../base/common/lifecycle.js";
export { I as $Tcb, J as $Ucb, g as TextAreaSyntethicEvents };
//# sourceMappingURL=textAreaEditContextInput.d.ts.map