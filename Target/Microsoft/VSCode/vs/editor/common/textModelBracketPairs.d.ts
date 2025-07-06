declare class g {
    constructor(e: any, t: any, n: any, s: any);
    range: any;
    nestingLevel: any;
    nestingLevelOfEqualBracketType: any;
    isInvalid: any;
}
declare class o {
    constructor(e: any, t: any, n: any, s: any, i: any, r: any);
    range: any;
    openingBracketRange: any;
    closingBracketRange: any;
    nestingLevel: any;
    nestingLevelOfEqualBracketType: any;
    a: any;
    get openingBracketInfo(): any;
    get closingBracketInfo(): any;
}
declare class l extends o {
    constructor(e: any, t: any, n: any, s: any, i: any, r: any, c: any);
    minVisibleColumnIndentation: any;
}
export { g as $JE, o as $KE, l as $LE };
//# sourceMappingURL=textModelBracketPairs.d.ts.map