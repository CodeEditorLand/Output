export { L as $Ynb };
declare class L {
    static _haystackHasNeedleAtOffset(e: any, n: any, t: any): boolean;
    static _createRemoveBlockCommentOperations(e: any, n: any, t: any): {
        range: any;
        text: null;
    }[];
    static _createAddBlockCommentOperations(e: any, n: any, t: any, i: any): {
        range: any;
        text: any;
    }[];
    constructor(e: any, n: any, t: any);
    d: any;
    a: any;
    b: any;
    c: any;
    e(e: any, n: any, t: any, i: any, s: any, o: any): void;
    getEditOperations(e: any, n: any): void;
    computeCursorState(e: any, n: any): p;
}
import { $UC as p } from "../../../common/core/selection.js";
//# sourceMappingURL=blockCommentCommand.d.ts.map