declare class f {
    static a(t: any, r: any, e: any, n: any, u: any): {
        start: any;
        end: any;
        wordType: any;
        nextCharClass: any;
    };
    static b(t: any, r: any): {
        start: any;
        end: any;
        wordType: number;
        nextCharClass: any;
    };
    static c(t: any, r: any, e: any): {
        start: any;
        end: any;
        wordType: any;
        nextCharClass: any;
    } | null;
    static d(t: any, r: any, e: any): {
        start: any;
        end: any;
        wordType: any;
        nextCharClass: any;
    } | null;
    static e(t: any, r: any, e: any, n: any): any;
    static f(t: any, r: any, e: any): {
        start: any;
        end: any;
        wordType: any;
        nextCharClass: any;
    } | null;
    static g(t: any, r: any, e: any): {
        start: any;
        end: any;
        wordType: any;
        nextCharClass: any;
    } | null;
    static h(t: any, r: any, e: any, n: any): any;
    static moveWordLeft(t: any, r: any, e: any, n: any, u: any): o;
    static _moveWordPartLeft(t: any, r: any): any;
    static moveWordRight(t: any, r: any, e: any, n: any): o;
    static _moveWordPartRight(t: any, r: any): any;
    static i(t: any, r: any): C | null;
    static deleteWordLeft(t: any, r: any): any;
    static deleteInsideWord(t: any, r: any, e: any): any;
    static j(t: any, r: any): boolean;
    static k(t: any, r: any): C | null;
    static l(t: any, r: any, e: any): C;
    static _deleteWordPartLeft(t: any, r: any): any;
    static m(t: any, r: any): any;
    static n(t: any, r: any): C | null;
    static deleteWordRight(t: any, r: any): any;
    static _deleteWordPartRight(t: any, r: any): any;
    static o(t: any, r: any, e: any): {
        word: any;
        startColumn: any;
        endColumn: any;
    };
    static getWordAtPosition(t: any, r: any, e: any, n: any): {
        word: any;
        startColumn: any;
        endColumn: any;
    } | null;
    static word(t: any, r: any, e: any, n: any, u: any): any;
}
declare class E extends f {
    static deleteWordPartLeft(t: any): any;
    static deleteWordPartRight(t: any): any;
    static moveWordPartLeft(t: any, r: any, e: any, n: any): any;
    static moveWordPartRight(t: any, r: any, e: any): any;
}
declare var P: any;
import { $dC as o } from "../core/position.js";
import { $eC as C } from "../core/range.js";
export { f as $4ab, E as $5ab, P as WordNavigationType };
//# sourceMappingURL=cursorWordOperations.d.ts.map