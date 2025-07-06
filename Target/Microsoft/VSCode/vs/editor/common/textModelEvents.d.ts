declare class h {
    static c(e: any, n: any): {
        changes: any[];
        eol: any;
        isEolChange: any;
        versionId: any;
        isUndoing: any;
        isRedoing: any;
        isFlush: any;
        detailedReasons: any;
        detailedReasonsChangeLengths: any;
    };
    constructor(e: any, n: any);
    rawContentChangedEvent: any;
    contentChangedEvent: any;
    merge(e: any): h;
}
declare class p {
    changeType: number;
}
declare class r {
    static applyInjectedText(e: any, n: any): any;
    static fromDecorations(e: any): r[];
    constructor(e: any, n: any, t: any, s: any, i: any);
    ownerId: any;
    lineNumber: any;
    column: any;
    options: any;
    order: any;
    withText(e: any): r;
}
declare class E {
    constructor(e: any, n: any, t: any);
    changeType: number;
    lineNumber: any;
    detail: any;
    injectedText: any;
}
declare class N {
    constructor(e: any, n: any, t: any, s: any);
    ownerId: any;
    decorationId: any;
    lineNumber: any;
    lineHeight: any;
}
declare class L {
    constructor(e: any, n: any);
    ownerId: any;
    lineNumber: any;
}
declare class I {
    constructor(e: any, n: any);
    changeType: number;
    fromLineNumber: any;
    toLineNumber: any;
}
declare class v {
    constructor(e: any, n: any, t: any, s: any);
    changeType: number;
    injectedTexts: any;
    fromLineNumber: any;
    toLineNumber: any;
    detail: any;
}
declare class x {
    changeType: number;
}
declare class l {
    static merge(e: any, n: any): l;
    constructor(e: any, n: any, t: any, s: any);
    changes: any;
    versionId: any;
    isUndoing: any;
    isRedoing: any;
    resultingSelection: any;
    containsEvent(e: any): boolean;
}
declare class b {
    constructor(e: any);
    changes: any;
}
declare class C {
    constructor(e: any);
    changes: any;
    affects(e: any): boolean;
}
declare class U {
    constructor(e: any);
    changes: any;
}
declare var u: any;
export { h as $1E, p as $OE, r as $PE, E as $QE, N as $RE, L as $SE, I as $TE, v as $UE, x as $VE, l as $WE, b as $XE, C as $YE, U as $ZE, u as RawContentChangedType };
//# sourceMappingURL=textModelEvents.d.ts.map