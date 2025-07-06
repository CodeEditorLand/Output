declare class $ {
    constructor(e: any, t: any);
    b: any;
    c: any;
    a: Map<any, any>;
    didLanguageChange(e: any): boolean;
    getSingleLanguageBracketTokens(e: any): any;
    getToken(e: any, t: any): any;
}
declare class g {
    static createFromLanguage(e: any, t: any): g;
    constructor(e: any);
    c: any;
    a: boolean;
    b: RegExp | null;
    getRegExpStr(): string | null;
    get regExpGlobal(): RegExp | null;
    getToken(e: any): any;
    findClosingTokenText(e: any): any;
    get isEmpty(): boolean;
}
export { $ as $AE, g as $zE };
//# sourceMappingURL=brackets.d.ts.map