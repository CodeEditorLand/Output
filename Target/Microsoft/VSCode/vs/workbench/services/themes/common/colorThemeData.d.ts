declare class k {
    static createUnloadedThemeForThemeType(e: any, t: any): k;
    static createUnloadedTheme(e: any, t: any): k;
    static createLoadedEmptyTheme(e: any, t: any): k;
    static fromStorageData(e: any): k | undefined;
    static fromExtensionTheme(e: any, t: any, n: any): k;
    constructor(e: any, t: any, n: any);
    h: any[];
    j: any[];
    l: {};
    m: {};
    n: any[];
    o: any[];
    id: any;
    label: any;
    settingsId: any;
    isLoaded: boolean;
    get semanticHighlighting(): any;
    get tokenColors(): {
        settings: {
            foreground: string | undefined;
            background: string | undefined;
        };
    }[];
    t: {
        settings: {
            foreground: string | undefined;
            background: string | undefined;
        };
    }[] | undefined;
    getColor(e: any, t: any): any;
    v(e: any, t: any, n: any, o?: boolean, s?: {}): any;
    resolveTokenStyleValue(e: any): any;
    getTokenColorIndex(): ce;
    u: ce | undefined;
    get tokenColorMap(): any[];
    getTokenStyleMetadata(e: any, t: any, n: any, o?: boolean, s?: {}): {
        foreground: any;
        bold: any;
        underline: any;
        strikethrough: any;
        italic: any;
    } | undefined;
    getTokenStylingRuleScope(e: any): "setting" | "theme" | undefined;
    getDefault(e: any): any;
    resolveScopes(e: any, t: any): any;
    q: ((n: any) => any)[] | undefined;
    s: ((n: any) => any)[] | undefined;
    defines(e: any): boolean;
    setCustomizations(e: any): void;
    setCustomColors(e: any): void;
    w(e: any): void;
    setCustomTokenColors(e: any): void;
    setCustomSemanticTokenColors(e: any): void;
    c: any;
    isThemeScope(e: any): boolean;
    isThemeScopeMatch(e: any): any;
    getThemeSpecificColors(e: any): {} | undefined;
    x(e: any): void;
    y(e: any): void;
    g: any;
    ensureLoaded(e: any): Promise<void>;
    reload(e: any): Promise<void>;
    z(e: any): Promise<void>;
    b: boolean | undefined;
    clearCaches(): void;
    toStorage(e: any): void;
    get themeTypeSelector(): any;
    get classNames(): any;
    get type(): any;
}
declare function Ce(r: any, e: any, t: any, n: any): number;
declare class ce {
    b: number;
    c: any[];
    g: any;
    add(e: any): any;
    get(e: any): any;
    asArray(): any[];
}
export { k as $SQb, Ce as $TQb };
//# sourceMappingURL=colorThemeData.d.ts.map