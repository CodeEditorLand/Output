declare let $: {
    new (t: any, e: any, i: any, s: any): {
        h: any;
        j: any;
        n: any;
        r: any;
        c: any;
        getLocalSearchProvider(t: any): any;
        readonly t: any;
        getRemoteSearchProvider(t: any): any;
        getAiSearchProvider(t: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let k: {
    new (t: any, e: any): {
        c: any;
        d: any;
        searchModel(t: any, e: any): Promise<null> | Promise<{
            filterMatches: any;
            exactMatch: any;
        }>;
        e(t: any): (i: any) => boolean;
    };
};
declare class G {
    constructor(t: any, e: any, i: any, s: any);
    c: any;
    d: any;
    matchType: any;
    keyMatchScore: number;
    matches: any;
    e(t: any, e: any): any[];
    f(t: any): any;
    g(t: any): any;
    h(t: any, e: any): any[];
    i(t: any, e: any): {
        startLineNumber: any;
        startColumn: any;
        endLineNumber: any;
        endColumn: any;
    };
    j(t: any, e: any, i: any): {
        startLineNumber: any;
        startColumn: any;
        endLineNumber: any;
        endColumn: any;
    };
    k(t: any, e: any): {
        startLineNumber: any;
        startColumn: any;
        endLineNumber: any;
        endColumn: any;
    };
}
export { $ as $c$b, k as $d$b, G as $e$b };
//# sourceMappingURL=preferencesSearch.d.ts.map