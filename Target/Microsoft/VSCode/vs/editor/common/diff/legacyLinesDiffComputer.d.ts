declare class _ {
    computeDiff(t: any, e: any, i: any): v;
}
declare class H {
    constructor(t: any, e: any, i: any);
    a: any;
    b: any;
    d: any;
    e: any;
    f: any;
    g: any;
    h: x;
    j: x;
    k: () => boolean;
    l: () => boolean;
    computeDiff(): {
        quitEarly: boolean | undefined;
        changes: E[];
    };
    m(t: any, e: any, i: any, a: any, n: any, l: any, s: any): void;
    n(t: any, e: any, i: any, a: any, n: any, l: any, s: any): boolean;
}
import { $tM as v } from "./linesDiffComputer.js";
declare class x {
    constructor(t: any);
    lines: any;
    a: any[];
    b: any[];
    getElements(): any[];
    getStrictElement(t: any): any;
    getStartLineNumber(t: any): any;
    getEndLineNumber(t: any): any;
    createCharSequence(t: any, e: any, i: any): I;
}
declare class E {
    static createFromDiffResult(t: any, e: any, i: any, a: any, n: any, l: any, s: any): E;
    constructor(t: any, e: any, i: any, a: any, n: any);
    originalStartLineNumber: any;
    originalEndLineNumber: any;
    modifiedStartLineNumber: any;
    modifiedEndLineNumber: any;
    charChanges: any;
}
declare class I {
    constructor(t: any, e: any, i: any);
    a: any;
    b: any;
    d: any;
    toString(): string;
    e(t: any, e: any): void;
    getElements(): any;
    getStartLineNumber(t: any): any;
    getEndLineNumber(t: any): any;
    getStartColumn(t: any): any;
    getEndColumn(t: any): any;
}
export { _ as $vM, H as $wM };
//# sourceMappingURL=legacyLinesDiffComputer.d.ts.map