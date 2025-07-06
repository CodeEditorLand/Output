declare class a {
    constructor(e: any);
    name: any;
    select(e: any, r: any, t: any): number;
}
declare class m extends a {
    constructor();
    memorize(e: any, r: any, t: any): void;
    toJSON(): void;
    fromJSON(): void;
}
declare class L extends a {
    constructor();
    c: b;
    d: number;
    memorize(e: any, r: any, t: any): void;
    toJSON(): any[];
    fromJSON(e: any): void;
}
declare class T extends a {
    constructor();
    c: k;
    d: number;
    memorize(e: any, r: any, t: any): void;
    toJSON(): any[];
    fromJSON(e: any): void;
}
declare let p: {
    new (e: any, r: any): {
        j: any;
        k: any;
        g: x;
        f: S;
        dispose(): void;
        memorize(e: any, r: any, t: any): void;
        select(e: any, r: any, t: any): any;
        l(e: any, r: any): any;
        h: any;
        m(): void;
    };
    c: Map<string, typeof m> | undefined;
    d: string | undefined;
};
declare const _: any;
import { $Lc as b } from "../../../../base/common/map.js";
import { $kj as k } from "../../../../base/common/ternarySearchTree.js";
import { $ud as x } from "../../../../base/common/lifecycle.js";
import { $Zh as S } from "../../../../base/common/async.js";
export { a as $nlb, m as $olb, L as $plb, T as $qlb, p as $rlb, _ as $slb };
//# sourceMappingURL=suggestMemory.d.ts.map