declare class c {
    static fromStringEdit(e: any, t: any): c;
    static replace(e: any, t: any): c;
    static delete(e: any): c;
    static insert(e: any, t: any): c;
    static fromParallelReplacementsUnsorted(e: any): c;
    constructor(e: any);
    replacements: any;
    normalize(): c;
    mapPosition(e: any): f | u;
    mapRange(e: any): u;
    inverseMapPosition(e: any, t: any): f | u;
    inverseMapRange(e: any, t: any): u;
    apply(e: any): string;
    applyToString(e: any): string;
    inverse(e: any): c;
    getNewRanges(): u[];
    toReplacement(e: any): any;
    equals(e: any): boolean;
    toString(e: any): any;
}
declare class l {
    static joinReplacements(e: any, t: any): any;
    static fromStringReplacement(e: any, t: any): l;
    static delete(e: any): l;
    static equals(e: any, t: any): any;
    constructor(e: any, t: any);
    range: any;
    text: any;
    get isEmpty(): any;
    toSingleEditOperation(): {
        range: any;
        text: any;
    };
    toEdit(): c;
    equals(e: any): any;
    extendToCoverRange(e: any, t: any): l;
    extendToFullLine(e: any): l;
    removeCommonPrefix(e: any): l;
    isEffectiveDeletion(e: any): boolean;
}
import { $dC as f } from "../position.js";
import { $eC as u } from "../range.js";
export { c as $rF, l as $sF };
//# sourceMappingURL=textEdit.d.ts.map