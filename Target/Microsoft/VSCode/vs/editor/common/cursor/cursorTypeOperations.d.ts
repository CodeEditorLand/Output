declare class Z {
    static indent(t: any, s: any, e: any): {
        f: any;
        a: any;
        b: any;
        c: any;
        d: boolean;
        e: boolean;
        g(e: any, n: any, t: any): void;
        getEditOperations(e: any, n: any): void;
        computeCursorState(e: any, n: any): any;
    }[];
    static outdent(t: any, s: any, e: any): {
        f: any;
        a: any;
        b: any;
        c: any;
        d: boolean;
        e: boolean;
        g(e: any, n: any, t: any): void;
        getEditOperations(e: any, n: any): void;
        computeCursorState(e: any, n: any): any;
    }[];
    static shiftIndent(t: any, s: any, e: any): any;
    static unshiftIndent(t: any, s: any, e: any): any;
    static paste(t: any, s: any, e: any, n: any, r: any, d: any): I;
    static tab(t: any, s: any, e: any): (import("../commands/replaceCommand.js").$Sab | {
        f: any;
        a: any;
        b: any;
        c: any;
        d: boolean;
        e: boolean;
        g(e: any, n: any, t: any): void;
        getEditOperations(e: any, n: any): void;
        computeCursorState(e: any, n: any): any;
    })[];
    static compositionType(t: any, s: any, e: any, n: any, r: any, d: any, u: any, a: any): I;
    static compositionEndWithInterceptors(t: any, s: any, e: any, n: any, r: any, d: any): I | null;
    static typeWithInterceptors(t: any, s: any, e: any, n: any, r: any, d: any, u: any): I;
    static typeWithoutInterceptors(t: any, s: any, e: any, n: any, r: any): I;
}
declare class F {
    constructor(t: any, s: any, e: any, n: any, r: any, d: any, u: any);
    deletedText: any;
    deletedSelectionStart: any;
    deletedSelectionEnd: any;
    insertedText: any;
    insertedSelectionStart: any;
    insertedSelectionEnd: any;
    insertedTextRange: any;
}
import { $Z_ as I } from "../cursorCommon.js";
export { Z as $xbb, F as $ybb };
//# sourceMappingURL=cursorTypeOperations.d.ts.map