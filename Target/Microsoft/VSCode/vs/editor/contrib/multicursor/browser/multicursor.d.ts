declare class U extends p {
    constructor();
    run(e: any, t: any, s: any): void;
}
declare class J extends p {
    constructor();
    run(e: any, t: any, s: any): void;
}
declare class v {
    constructor(e: any, t: any, s: any);
    selections: any;
    revealRange: any;
    revealScrollType: any;
}
declare class w {
    static create(e: any, t: any): w | null;
    constructor(e: any, t: any, s: any, n: any, i: any, o: any, r: any);
    a: any;
    findController: any;
    isDisconnectedFromFindController: any;
    searchText: any;
    wholeWord: any;
    matchCase: any;
    currentMatch: any;
    addSelectionToNextFindMatch(): v | null;
    moveSelectionToNextFindMatch(): v | null;
    b(): any;
    addSelectionToPreviousFindMatch(): v | null;
    moveSelectionToPreviousFindMatch(): v | null;
    c(): any;
    selectAll(e: any): any;
}
declare class C extends E {
    static get(e: any): any;
    constructor(e: any);
    f: any;
    a: any;
    b: boolean;
    c: w | null;
    g(e: any): void;
    h(): void;
    n(e: any): void;
    t(e: any, t: any): any;
    u(e: any): void;
    getSession(e: any): w | null;
    addSelectionToNextFindMatch(e: any): void;
    addSelectionToPreviousFindMatch(e: any): void;
    moveSelectionToNextFindMatch(e: any): void;
    moveSelectionToPreviousFindMatch(e: any): void;
    selectAll(e: any): void;
    selectAllUsingSelections(e: any): void;
}
declare class b extends p {
    run(e: any, t: any): void;
}
declare class Q extends b {
    constructor();
    d(e: any, t: any): void;
}
declare class Z extends b {
    constructor();
    d(e: any, t: any): void;
}
declare class X extends b {
    constructor();
    d(e: any, t: any): void;
}
declare class Y extends b {
    constructor();
    d(e: any, t: any): void;
}
declare class ee extends b {
    constructor();
    d(e: any, t: any): void;
}
declare class te extends b {
    constructor();
    d(e: any, t: any): void;
}
declare let O: {
    new (e: any, t: any): {
        h: any;
        a: any;
        b: any;
        c: any;
        f: any;
        g: any;
        n(): void;
        u(e: any): void;
        dispose(): void;
        q: k;
        B(t: any): any;
    };
    ID: string | undefined;
    t(e: any, t: any, s: any): se | null;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class ne extends p {
    constructor();
    run(e: any, t: any, s: any): void;
}
declare class ie extends p {
    constructor();
    run(e: any, t: any, s: any): void;
}
import { $Eab as p } from "../../../browser/editorExtensions.js";
import { $vd as E } from "../../../../base/common/lifecycle.js";
import { $ud as k } from "../../../../base/common/lifecycle.js";
declare class se {
    constructor(e: any, t: any, s: any, n: any, i: any);
    c: any;
    d: any;
    f: any;
    g: any;
    b: any;
    a: any;
    findMatches(): any;
}
export { U as $Fsb, J as $Gsb, v as $Hsb, w as $Isb, C as $Jsb, b as $Ksb, Q as $Lsb, Z as $Msb, X as $Nsb, Y as $Osb, ee as $Psb, te as $Qsb, O as $Rsb, ne as $Ssb, ie as $Tsb };
//# sourceMappingURL=multicursor.d.ts.map