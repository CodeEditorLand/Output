declare class h {
    static m(e: any, o: any, t: any, n: any): {
        ignore: boolean;
        commentStr: any;
        commentStrOffset: number;
        commentStrLength: any;
    }[] | null;
    static _analyzeLines(e: any, o: any, t: any, n: any, i: any, s: any, f: any, r: any, m: any): {
        supported: boolean;
        shouldRemoveComments: boolean;
        lines: any;
    };
    static _gatherPreflightData(e: any, o: any, t: any, n: any, i: any, s: any, f: any, r: any): {
        supported: boolean;
        shouldRemoveComments: boolean;
        lines: any;
    } | {
        supported: boolean;
    };
    static _createRemoveLineCommentsOperations(e: any, o: any): {
        range: any;
        text: null;
    }[];
    static r(e: any, o: any, t: any, n: any): any;
    static _normalizeInsertionPoint(e: any, o: any, t: any, n: any): void;
    constructor(e: any, o: any, t: any, n: any, i: any, s: any, f: any);
    l: any;
    a: any;
    b: any;
    c: any;
    d: any;
    f: any;
    g: number;
    h: boolean;
    e: any;
    k: any;
    n(e: any, o: any, t: any, n: any): void;
    o(e: any, o: any, t: any, n: any): {
        range: any;
        text: null;
    }[] | null;
    p(e: any, o: any, t: any): void;
    getEditOperations(e: any, o: any): void;
    computeCursorState(e: any, o: any): w;
    q(e: any, o: any): {
        range: C;
        text: any;
        forceMoveMarkers: boolean;
    }[];
}
declare var P: any;
import { $UC as w } from "../../../common/core/selection.js";
import { $eC as C } from "../../../common/core/range.js";
export { h as $Znb, P as Type };
//# sourceMappingURL=lineCommentCommand.d.ts.map