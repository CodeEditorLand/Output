declare class a {
    constructor(s: any);
    e: string | null;
    f: boolean;
    open: any;
    close: any;
    b: boolean;
    c: boolean;
    d: boolean;
    isOK(s: any): boolean | undefined;
    shouldAutoClose(s: any, t: any): boolean | undefined;
    g(s: any, t: any): string | null;
    findNeutralCharacter(): string | null;
}
declare class h {
    constructor(s: any);
    autoClosingPairsOpenByStart: Map<any, any>;
    autoClosingPairsOpenByEnd: Map<any, any>;
    autoClosingPairsCloseByStart: Map<any, any>;
    autoClosingPairsCloseByEnd: Map<any, any>;
    autoClosingPairsCloseSingleChar: Map<any, any>;
}
declare var o: any;
export { a as $JD, h as $KD, o as IndentAction };
//# sourceMappingURL=languageConfiguration.d.ts.map