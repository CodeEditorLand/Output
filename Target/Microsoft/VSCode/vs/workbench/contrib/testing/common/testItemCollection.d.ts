declare class U extends D {
    constructor(e: any);
    get root(): any;
    s: any;
    f: any;
    g: any;
    tree: Map<any, any>;
    j: Map<any, any>;
    m: any[];
    onDidGenerateDiff: any;
    set resolveHandler(e: any);
    get resolveHandler(): any;
    h: any;
    collectDiff(): any[];
    pushDiff(e: any): void;
    expand(e: any, t: any): any;
    w(e: any, t: any): void;
    y(e: any): void;
    z(e: any, t: any): any;
    C(e: any, t: any, s: any): void;
    D(e: any): void;
    F(e: any): void;
    G(e: any, t: any): void;
    H(e: any, t: any, s: any): void;
    I(e: any, t: any, s: any): void;
    J(e: any): void;
    L(e: any, t: any): any;
    M(e: any): any;
    N(e: any): void;
    O(e: any): void;
    flushDiff(): void;
}
declare class L extends Error {
    constructor(e: any);
}
declare class w extends Error {
    constructor(e: any);
}
declare class y extends Error {
    constructor(e: any, t: any, s: any);
}
declare function z(o: any, e: any, t: any): {
    readonly size: number;
    forEach(r: any, i: any): void;
    [Symbol.iterator](): MapIterator<[any, any]>;
    replace(r: any): void;
    add(r: any): void;
    delete(r: any): void;
    get(r: any): any;
    toJSON(): any[];
};
declare var x: any;
import { $vd as D } from "../../../../base/common/lifecycle.js";
export { U as $u2, L as $v2, w as $w2, y as $x2, z as $y2, x as TestItemEventOp };
//# sourceMappingURL=testItemCollection.d.ts.map