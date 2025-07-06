declare class w {
    static create(t: any, e: any): w;
    constructor(t: any, e: any);
    get startLineNumber(): any;
    get endLineNumber(): any;
    c: any;
    e: any;
    d: any;
    toString(): any;
    f(): void;
    isEmpty(): any;
    getLineTokens(t: any): any;
    getRange(): any;
    removeTokens(t: any): void;
    split(t: any): w[];
    applyEdit(t: any, e: any): void;
    acceptEdit(t: any, e: any, n: any, i: any, s: any): void;
    g(t: any): void;
    h(t: any, e: any, n: any, i: any, s: any): void;
    reportIfInvalid(t: any): void;
}
declare class a {
    constructor(t: any);
    c: any;
    getCount(): number;
    getStartCharacter(t: any): any;
    getEndCharacter(t: any): any;
    getMetadata(t: any): any;
}
export { w as $5E, a as $6E };
//# sourceMappingURL=sparseMultilineTokens.d.ts.map