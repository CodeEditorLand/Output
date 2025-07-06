declare class I {
    constructor(e: any, t: any);
    languageId: any;
    a: Map<any, any>;
    b: Map<any, any>;
    get openingBrackets(): any[];
    get closingBrackets(): any[];
    getOpeningBracketInfo(e: any): any;
    getClosingBracketInfo(e: any): any;
    getBracketInfo(e: any): any;
    getBracketRegExp(e: any): RegExp;
}
declare class f {
    constructor(e: any, t: any);
    a: any;
    bracketText: any;
    get languageId(): any;
}
declare class k extends f {
    constructor(e: any, t: any, o: any);
    openedBrackets: any;
    isOpeningBracket: boolean;
}
declare class d extends f {
    constructor(e: any, t: any, o: any, c: any);
    openingBrackets: any;
    b: any;
    isOpeningBracket: boolean;
    closes(e: any): any;
    closesColorized(e: any): any;
    getOpeningBrackets(): any[];
}
export { I as $PD, f as $QD, k as $RD, d as $SD };
//# sourceMappingURL=languageBracketsConfiguration.d.ts.map