declare function O(g: any, e?: boolean): number[] | Uint16Array<any> | Uint32Array<any>;
declare function X(g: any, e: any): K;
declare class m {
    constructor(e: any, n: any, t: any, i: any, s: any);
    bufferIndex: any;
    start: any;
    end: any;
    lineFeedCnt: any;
    length: any;
}
declare class F {
    constructor(e: any, n: any);
    buffer: any;
    lineStarts: any;
}
declare class Y {
    constructor(e: any, n: any, t: any);
    create(e: any, n: any, t: any): void;
    a: F[] | undefined;
    g: any;
    root: N | undefined;
    b: number | undefined;
    c: number | undefined;
    d: any;
    e: any;
    f: any;
    h: q | undefined;
    j: {
        lineNumber: number;
        value: string;
    } | undefined;
    normalizeEOL(e: any): void;
    getEOL(): any;
    setEOL(e: any): void;
    createSnapshot(e: any): U;
    equal(e: any): any;
    getOffsetAt(e: any, n: any): number;
    getPositionAt(e: any): A;
    getValueInRange(e: any, n: any): any;
    getValueInRange2(e: any, n: any): any;
    getLinesContent(): string[];
    getLength(): number | undefined;
    getLineCount(): number | undefined;
    getLineContent(e: any): string;
    l(e: any): any;
    getLineCharCode(e: any, n: any): any;
    getLineLength(e: any): number;
    getCharCode(e: any): any;
    getNearestChunk(e: any): any;
    findMatchesInNode(e: any, n: any, t: any, i: any, s: any, r: any, l: any, f: any, c: any, h: any, o: any): any;
    findMatchesLineByLine(e: any, n: any, t: any, i: any): any[];
    n(e: any, n: any, t: any, i: any, s: any, r: any, l: any, f: any, c: any): any;
    insert(e: any, n: any, t?: boolean): void;
    delete(e: any, n: any): void;
    o(e: any, n: any): void;
    q(e: any, n: any): void;
    s(e: any, n: any, t: any): {
        line: number;
        column: number;
    } | null;
    t(e: any, n: any, t: any): number;
    u(e: any, n: any): any;
    v(e: any): void;
    w(e: any): m[];
    getLinesRawContent(): string;
    getLineRawContent(e: any, n?: number): any;
    y(): void;
    A(e: any, n: any): {
        index: number;
        remainder: number;
    };
    B(e: any, n: any): number;
    C(e: any, n: any): void;
    D(e: any, n: any): void;
    E(e: any, n: any, t: any): void;
    F(e: any, n: any): void;
    G(e: any): {
        node: any;
        nodeStartOffset: any;
        remainder: number;
    } | null;
    H(e: any, n: any): {
        node: N | undefined;
        remainder: number;
        nodeStartOffset: any;
    } | null;
    I(e: any, n: any): any;
    J(e: any): any;
    K(): boolean;
    L(e: any): boolean;
    M(e: any): boolean;
    N(e: any): void;
    O(e: any): void;
    P(e: any, n: any): void;
    Q(e: any, n: any): boolean;
    iterate(e: any, n: any): any;
    R(e: any): any;
    getPieceContent(e: any): any;
    S(e: any, n: any): N;
    T(e: any, n: any): N;
    U(e: any): string;
}
declare class K {
    constructor(e: any, n: any, t: any, i: any, s: any);
    lineStarts: any;
    cr: any;
    lf: any;
    crlf: any;
    isBasicASCII: any;
}
import { $lH as N } from "./rbTreeBase.js";
declare class q {
    constructor(e: any);
    a: any;
    b: any[];
    get(e: any): any;
    get2(e: any): any;
    set(e: any): void;
    validate(e: any): void;
}
declare class U {
    constructor(e: any, n: any);
    a: any[];
    c: any;
    d: any;
    b: number;
    read(): any;
}
import { $dC as A } from "../../core/position.js";
export { O as $BH, X as $CH, m as $DH, F as $EH, Y as $FH };
//# sourceMappingURL=pieceTreeBase.d.ts.map