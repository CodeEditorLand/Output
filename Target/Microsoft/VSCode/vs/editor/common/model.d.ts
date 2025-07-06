declare function E(t: any): boolean;
declare class L {
    constructor(e: any);
    get originalIndentSize(): number | "tabSize";
    tabSize: number;
    indentSize: number;
    a: boolean;
    insertSpaces: boolean;
    defaultEOL: number;
    trimAutoWhitespace: boolean;
    bracketPairColorizationOptions: any;
    equals(e: any): boolean;
    createChangeEvent(e: any): {
        tabSize: boolean;
        indentSize: boolean;
        insertSpaces: boolean;
        trimAutoWhitespace: boolean;
    };
}
declare class S {
    constructor(e: any, i: any);
    range: any;
    matches: any;
}
declare function N(t: any): any;
declare function T(t: any): boolean;
declare class b {
    constructor(e: any, i: any, r: any, x: any, d: any, g: any);
    identifier: any;
    range: any;
    text: any;
    forceMoveMarkers: any;
    isAutoWhitespaceEdit: any;
    _isTracked: any;
}
declare class m {
    constructor(e: any, i: any, r: any);
    regex: any;
    wordSeparators: any;
    simpleSearch: any;
}
declare class C {
    constructor(e: any, i: any, r: any);
    reverseEdits: any;
    changes: any;
    trimAutoWhitespaceLineNumbers: any;
}
declare var u: any;
declare var p: any;
declare var c: any;
declare var o: any;
declare var a: any;
declare var h: any;
declare var n: any;
declare var l: any;
declare var s: any;
declare var F: any;
declare var z: any;
export { E as $AF, L as $tF, S as $uF, N as $vF, T as $wF, b as $xF, m as $yF, C as $zF, u as DefaultEndOfLine, p as EndOfLinePreference, c as EndOfLineSequence, o as GlyphMarginLane, a as InjectedTextCursorStops, h as MinimapPosition, n as MinimapSectionHeaderStyle, l as ModelConstants, s as OverviewRulerLane, F as PositionAffinity, z as TrackedRangeStickiness };
//# sourceMappingURL=model.d.ts.map