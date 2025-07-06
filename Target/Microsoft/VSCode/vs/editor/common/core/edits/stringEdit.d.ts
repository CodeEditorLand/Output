declare class m extends R {
    static composeOrUndefined(e: any): any;
    get TReplacement(): void;
    apply(e: any): string;
    inverse(e: any): s;
    tryRebase(e: any, t: any): s | undefined;
    toJson(): any;
    isNeutralOn(e: any): any;
    removeCommonSuffixPrefix(e: any): s;
    normalizeEOL(e: any): s;
    normalizeOnSource(e: any): any;
    removeCommonSuffixAndPrefix(e: any): any;
    applyOnText(e: any): T;
    mapData(e: any): u;
}
declare class d extends v {
    constructor(e: any, t: any);
    newText: any;
    getNewLength(): any;
    replace(e: any): any;
    isNeutralOn(e: any): boolean;
    removeCommonSuffixPrefix(e: any): a;
    normalizeEOL(e: any): a;
    removeCommonSuffixAndPrefix(e: any): any;
    removeCommonPrefix(e: any): any;
    removeCommonSuffix(e: any): any;
    toEdit(): s;
    toJson(): {
        txt: any;
        pos: any;
        len: any;
    };
}
declare class s extends m {
    static create(e: any): s;
    static single(e: any): s;
    static replace(e: any, t: any): s;
    static insert(e: any, t: any): s;
    static delete(e: any): s;
    static fromJson(e: any): s;
    static compose(e: any): any;
    static composeSequentialReplacements(e: any): s | undefined;
    a(e: any): s;
}
declare class a extends d {
    static insert(e: any, t: any): a;
    static replace(e: any, t: any): a;
    static delete(e: any): a;
    static fromJson(e: any): a;
    equals(e: any): any;
    tryJoinTouching(e: any): a;
    slice(e: any, t: any): a;
}
declare function O(o: any, e: any): any[];
declare class A {
    join(e: any): this;
}
declare class u extends m {
    static create(e: any): u;
    static single(e: any): u;
    static replace(e: any, t: any, n: any): u;
    static insert(e: any, t: any, n: any): u;
    static delete(e: any, t: any): u;
    static compose(e: any): any;
    a(e: any): u;
    toStringEdit(): s;
}
declare class p extends d {
    static insert(e: any, t: any, n: any): p;
    static replace(e: any, t: any, n: any): p;
    static delete(e: any, t: any): p;
    constructor(e: any, t: any, n: any);
    data: any;
    equals(e: any): any;
    tryJoinTouching(e: any): p | undefined;
    slice(e: any, t: any): p;
}
import { $fF as R } from "./edit.js";
import { $eF as T } from "../text/abstractText.js";
import { $gF as v } from "./edit.js";
export { m as $jF, d as $kF, s as $lF, a as $mF, O as $nF, A as $oF, u as $pF, p as $qF };
//# sourceMappingURL=stringEdit.d.ts.map