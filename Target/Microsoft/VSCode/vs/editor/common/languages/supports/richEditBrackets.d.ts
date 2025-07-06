declare class l {
    static e(t: any): Set<any>;
    constructor(t: any, o: any, n: any, e: any, r: any, s: any);
    languageId: any;
    index: any;
    open: any;
    close: any;
    forwardRegex: any;
    reversedRegex: any;
    c: Set<any>;
    d: Set<any>;
    isOpen(t: any): boolean;
    isClose(t: any): boolean;
}
declare class M {
    constructor(t: any, o: any);
    brackets: l[];
    forwardRegex: RegExp;
    reversedRegex: RegExp;
    textIsBracket: {};
    textIsOpenBracket: {};
    maxBracketLength: number;
}
declare function g(c: any, t: any): RegExp;
declare class S {
    static c(t: any, o: any, n: any, e: any): x | null;
    static findPrevBracketInRange(t: any, o: any, n: any, e: any, r: any): x | null;
    static findNextBracketInText(t: any, o: any, n: any, e: any): x | null;
    static findNextBracketInRange(t: any, o: any, n: any, e: any, r: any): x | null;
}
import { $eC as x } from "../../core/range.js";
export { l as $LD, M as $MD, g as $ND, S as $OD };
//# sourceMappingURL=richEditBrackets.d.ts.map