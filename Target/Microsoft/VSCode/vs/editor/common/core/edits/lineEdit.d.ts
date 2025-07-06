declare class l {
    static deserialize(e: any): l;
    static fromEdit(e: any, t: any): l;
    static fromTextEdit(e: any, t: any): l;
    static createFromUnsorted(e: any): l;
    constructor(e: any);
    edits: any;
    isEmpty(): boolean;
    toEdit(e: any): y;
    toString(): any;
    serialize(): any;
    getNewLineRanges(): w[];
    mapLineNumber(e: any): any;
    mapLineRange(e: any): w;
    mapBackLineRange(e: any, t: any): w;
    touches(e: any): any;
    rebase(e: any): l;
    humanReadablePatch(e: any): string;
    apply(e: any): any[];
    inverse(e: any): l;
}
declare class L {
    static deserialize(e: any): L;
    static fromSingleTextEdit(e: any, t: any): L;
    constructor(e: any, t: any);
    lineRange: any;
    newLines: any;
    toSingleTextEdit(e: any): d;
    toSingleEdit(e: any): C;
    toString(): string;
    serialize(): any[];
    removeCommonSuffixPrefixLines(e: any): L;
    toLineEdit(): l;
}
declare var N: any;
import { $lF as y } from "./stringEdit.js";
import { $oD as w } from "../ranges/lineRange.js";
import { $sF as d } from "./textEdit.js";
import { $mF as C } from "./stringEdit.js";
export { l as $alb, L as $blb, N as SerializedLineReplacement };
//# sourceMappingURL=lineEdit.d.ts.map