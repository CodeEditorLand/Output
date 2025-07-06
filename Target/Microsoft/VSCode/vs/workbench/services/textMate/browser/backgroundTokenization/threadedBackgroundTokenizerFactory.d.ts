export { $ as $s8b };
declare let $: {
    new (t: any, e: any, s: any, n: any, c: any, r: any, o: any, i: any): {
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        b: Promise<any> | null;
        c: import("../../../../../base/common/worker/webWorker.js").$z9 | null;
        d: any;
        e: Map<any, any>;
        f: any;
        g: any;
        h: any[];
        dispose(): void;
        createBackgroundTokenizer(t: any, e: any, s: any): {
            dispose(): void;
            requestTokens: (r: any, o: any) => Promise<void>;
            reportMismatchingTokens: (r: any) => void;
        } | undefined;
        setGrammarDefinitions(t: any): void;
        acceptTheme(t: any, e: any): void;
        q(): Promise<any>;
        r(): Promise<any>;
        s(): void;
    };
    a: boolean | undefined;
};
//# sourceMappingURL=threadedBackgroundTokenizerFactory.d.ts.map