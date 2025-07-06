declare class Et {
    static getEdits(t: any, e: any, s: any, n: any, r: any): C | undefined;
    static a(t: any, e: any, s: any): boolean;
    static b(t: any, e: any, s: any, n: any): any;
    static c(t: any, e: any, s: any, n: any, r: any): C;
    static d(t: any, e: any, s: any, n: any, r: any, i?: boolean): {
        range: h;
        text: any;
    };
}
declare class Nt {
    static getEdits(t: any, e: any, s: any, n: any, r: any, i: any): C | undefined;
    static a(t: any, e: any, s: any): C;
}
declare class kt {
    static getEdits(t: any, e: any, s: any, n: any, r: any): C | undefined;
}
declare class rt {
    static getEdits(t: any, e: any, s: any, n: any, r: any, i: any): C | undefined;
    static a(t: any, e: any, s: any, n: any): C;
    static getAutoClosingPairClose(t: any, e: any, s: any, n: any, r: any): any;
    static b(t: any, e: any): any;
    static c(t: any, e: any, s: any, n: any): any;
    static d(t: any, e: any): any;
}
declare class It {
    static getEdits(t: any, e: any): C | null;
}
declare class Pt {
    static getEdits(t: any, e: any, s: any, n: any, r: any): C | undefined;
    static a(t: any, e: any, s: any): C;
    static b(t: any, e: any, s: any, n: any): boolean;
}
declare class wt {
    static getEdits(t: any, e: any, s: any, n: any, r: any, i: any): C | undefined;
    static a(t: any, e: any, s: any): boolean;
    static b(t: any, e: any, s: any, n: any, r: any): C | null;
}
declare class Lt {
    static getEdits(t: any, e: any, s: any, n: any, r: any): C;
}
declare class Tt {
    static getEdits(t: any, e: any, s: any, n: any, r: any): C | undefined;
    static a(t: any, e: any, s: any, n: any): g | z | $;
    static lineInsertBefore(t: any, e: any, s: any): (g | z | $)[];
    static lineInsertAfter(t: any, e: any, s: any): (g | z | $)[];
    static lineBreakInsert(t: any, e: any, s: any): (g | z | $)[];
}
declare class xt {
    static getEdits(t: any, e: any, s: any, n: any, r: any, i: any): C;
    static a(t: any, e: any, s: any, n: any, r: any): any;
    static b(t: any, e: any, s: any, n: any): C;
    static c(t: any, e: any, s: any, n: any, r: any): C;
}
declare class zt {
    static getEdits(t: any, e: any, s: any, n: any, r: any, i: any, o: any, a: any): C;
    static a(t: any, e: any, s: any, n: any, r: any, i: any): $ | null;
}
declare class $t {
    static getEdits(t: any, e: any, s: any): C;
}
declare class At {
    static getCommands(t: any, e: any, s: any): (g | {
        f: any;
        a: any;
        b: any;
        c: any;
        d: boolean;
        e: boolean;
        g(e: any, n: any, t: any): void;
        getEditOperations(e: any, n: any): void;
        computeCursorState(e: any, n: any): any;
    })[];
    static a(t: any, e: any, s: any): string | null;
    static b(t: any, e: any, s: any, n: any): g;
}
declare class V extends $ {
    constructor(t: any, e: any, s: any, n: any, r: any, i: any);
    f: any;
    g: any;
    closeCharacterRange: h | null;
    enclosingRange: h | null;
    h(t: any, e: any, s: any): import("../core/selection.js").$UC;
}
declare function M(l: any, t: any, e: any): any;
declare function A(l: any, t: any, e: any): any;
declare function it(l: any, t: any): boolean;
import { $Z_ as C } from "../cursorCommon.js";
import { $eC as h } from "../core/range.js";
import { $Sab as g } from "../commands/replaceCommand.js";
import { $Vab as z } from "../commands/replaceCommand.js";
import { $Wab as $ } from "../commands/replaceCommand.js";
export { Et as $gbb, Nt as $hbb, kt as $ibb, rt as $jbb, It as $kbb, Pt as $lbb, wt as $mbb, Lt as $nbb, Tt as $obb, xt as $pbb, zt as $qbb, $t as $rbb, At as $sbb, V as $tbb, M as $ubb, A as $vbb, it as $wbb };
//# sourceMappingURL=cursorTypeEditOperations.d.ts.map