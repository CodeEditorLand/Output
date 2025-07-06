declare class r extends h {
    static fromEdit(e: any): r;
    static create(e: any): r;
    static single(e: any): r;
    static replace(e: any, t: any): r;
    static insert(e: any, t: any): r;
    static delete(e: any): r;
    static compose(e: any): r | undefined;
    inverse(): r;
    a(e: any): r;
    applyArray(e: any, t: any): any[];
}
declare class s extends w {
    static create(e: any, t: any, n: any): s;
    constructor(e: any, t: any);
    newLength: any;
    equals(e: any): any;
    getNewLength(): any;
    tryJoinTouching(e: any): s;
    slice(e: any, t: any): s;
}
import { $fF as h } from "./edit.js";
import { $gF as w } from "./edit.js";
export { r as $3kb, s as $4kb };
//# sourceMappingURL=lengthEdit.d.ts.map