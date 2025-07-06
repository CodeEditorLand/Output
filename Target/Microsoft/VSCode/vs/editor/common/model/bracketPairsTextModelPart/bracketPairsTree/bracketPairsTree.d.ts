export { ii as $ZF };
declare class ii extends J {
    constructor(i: any, t: any);
    didLanguageChange(i: any): boolean;
    m: any;
    n: any;
    a: f;
    f: W;
    g: V;
    onDidChange: any;
    h: any[];
    j: any[];
    c: any;
    b: any;
    handleDidChangeBackgroundTokenizationState(): void;
    handleDidChangeTokens({ ranges: i }: {
        ranges: any;
    }): void;
    handleContentChanged(i: any): void;
    s(i: any, t: any): void;
    t(): void;
    u(i: any, t: any, s: any): any;
    getBracketsInRange(i: any, t: any): M;
    getBracketPairsInRange(i: any, t: any): M;
    getFirstBracketAfter(i: any): any;
    getFirstBracketBefore(i: any): any;
}
import { $vd as J } from "../../../../../base/common/lifecycle.js";
import { $ef as f } from "../../../../../base/common/event.js";
import { $iE as W } from "./smallImmutableSet.js";
import { $AE as V } from "./brackets.js";
import { $xc as M } from "../../../../../base/common/arrays.js";
//# sourceMappingURL=bracketPairsTree.d.ts.map