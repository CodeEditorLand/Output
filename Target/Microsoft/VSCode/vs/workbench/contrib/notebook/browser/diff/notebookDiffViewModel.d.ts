declare class q extends z {
    constructor(t: any, o: any, e: any, i: any, n: any, s: any, a: any, l: any);
    get items(): any[];
    get value(): any[];
    get hasUnchangedCells(): boolean;
    set includeUnchanged(t: boolean);
    get includeUnchanged(): boolean;
    s: any;
    z: any;
    C: any;
    D: any;
    F: any;
    G: any;
    H: any;
    I: any;
    J: any;
    c: Map<any, any>;
    f: any[];
    g: any;
    onDidChangeItems: any;
    h: any;
    j: any;
    m: any[];
    onDidChange: any;
    w: any[];
    t: any;
    u: any;
    L(): void;
    computeDiff(t: any): Promise<void>;
    M(): void;
    N(): void;
    r: boolean | undefined;
    O(t: any, o: any, e: any): Promise<void>;
    P(t: any, o: any): Promise<any[]>;
    n: any;
}
declare function P(u: any, t: any, o: any): void;
declare class w extends $ {
    constructor(t: any, o: any, e: any, i: any, n: any, s: any, a: any);
    type: any;
    containerType: any;
    kind: any;
}
import { $vd as z } from "../../../../../base/common/lifecycle.js";
import { $mYb as $ } from "../../../multiDiffEditor/browser/multiDiffSourceResolverService.js";
export { q as $r$b, P as $s$b, w as $t$b };
//# sourceMappingURL=notebookDiffViewModel.d.ts.map