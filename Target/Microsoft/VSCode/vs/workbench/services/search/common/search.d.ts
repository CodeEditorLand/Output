declare class J extends A {
    constructor(e: any, n: any, r: any);
}
declare function ut(t: any, e?: boolean): any;
declare function ot(t: any, e: any): any;
declare class m extends Error {
    constructor(e: any, n: any);
    code: any;
}
declare function ct(t: any): m;
declare function at(t: any): Error;
declare function lt(t: any): boolean;
declare function ft(t: any): boolean;
declare function ht(t: any): boolean;
declare function pt(t: any, e: any, n?: boolean): any;
declare class xt {
    constructor(e: any);
    path: any;
    results: any[];
    addMatch(e: any): void;
    serialize(): {
        path: any;
        results: any[];
        numMatches: number;
    };
}
declare function mt(t: any, e: any): string[];
declare class dt {
    constructor(e: any, n: any);
    c: any;
    a: any;
    b: any;
    d(e: any, n: any, r: any): string | null;
    matchesExcludesSync(e: any, n: any, r: any): boolean;
    includedInQuerySync(e: any, n: any, r: any): boolean;
    includedInQuery(e: any, n: any, r: any): Promise<boolean>;
    hasSiblingExcludeClauses(): any;
}
declare function $t(t: any): ((n: any) => any) | undefined;
declare function Pt(t: any): ((n: any) => boolean) | undefined;
declare function Lt(t: any): any;
declare namespace bt {
    let matchLines: number;
    let charsPerLine: number;
}
declare const W: "workbench.view.search";
declare const Y: "workbench.panel.search";
declare const Z: "workbench.view.search";
declare const O: "search-result";
declare const Q: "search.exclude";
declare const q: 20000;
declare const S: any;
declare function tt(t: any): boolean;
declare function et(t: any): boolean;
declare function nt(t: any): boolean;
declare function rt(t: any): boolean;
declare class st {
    constructor(e: any);
    resource: any;
    results: any[];
}
declare class it {
    constructor(e: any, n: any, r: any, s: any);
    rangeLocations: any[];
    webviewIndex: any;
    previewText: any;
}
declare class A {
    constructor(e: any, n: any, r: any, s: any);
    startLineNumber: any;
    startColumn: any;
    endLineNumber: any;
    endColumn: any;
}
declare var L: any;
declare var b: any;
declare var p: any;
declare var P: any;
declare var w: any;
declare var N: any;
import { TextSearchCompleteMessageType as B } from "./searchExtTypes.js";
declare var g: any;
export { J as $AP, ut as $BP, ot as $CP, m as $DP, ct as $EP, at as $FP, lt as $GP, ft as $HP, ht as $IP, pt as $JP, xt as $KP, mt as $LP, dt as $MP, $t as $NP, Pt as $OP, Lt as $PP, bt as $QP, W as $mP, Y as $nP, Z as $oP, O as $pP, Q as $qP, q as $rP, S as $sP, tt as $tP, et as $uP, nt as $vP, rt as $wP, st as $xP, it as $yP, A as $zP, L as QueryType, b as SearchCompletionExitCode, p as SearchErrorCode, P as SearchProviderType, w as SearchSortOrder, N as SemanticSearchBehavior, B as TextSearchCompleteMessageType, g as ViewMode };
//# sourceMappingURL=search.d.ts.map