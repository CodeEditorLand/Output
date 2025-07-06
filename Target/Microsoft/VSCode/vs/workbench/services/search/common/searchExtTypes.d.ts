declare class s {
    constructor(r: any, t: any);
    line: any;
    character: any;
    isBefore(r: any): boolean;
    isBeforeOrEqual(r: any): boolean;
    isAfter(r: any): boolean;
    isAfterOrEqual(r: any): boolean;
    isEqual(r: any): boolean;
    compareTo(r: any): number;
    translate(r: any, t: any): s;
    with(r: any): s;
}
declare class i {
    constructor(r: any, t: any, n: any, u: any);
    isEmpty: boolean;
    isSingleLine: boolean;
    start: s;
    end: s;
    contains(r: any): boolean;
    isEqual(r: any): boolean;
    intersection(r: any): void;
    union(r: any): i;
    with(r: any): i;
}
declare class l {
    constructor(r: any, t: any, n: any);
    uri: any;
    ranges: any;
    previewText: any;
}
declare class h {
    constructor(r: any, t: any, n: any);
    uri: any;
    text: any;
    lineNumber: any;
}
declare class c {
    constructor(r: any);
    keyword: any;
}
declare var o: any;
declare var a: any;
export { s as $hP, i as $iP, l as $jP, h as $kP, c as $lP, o as ExcludeSettingOptions, a as TextSearchCompleteMessageType };
//# sourceMappingURL=searchExtTypes.d.ts.map