export { C as $RAb };
declare let C: {
    new (t: any, e: any, r: any): {
        c: any;
        f: any;
        g: any;
        a: Map<any, any>;
        b: number;
        dispose(): void;
        get(t: any, e: any, r: any): {
            model: any;
            vulns: any;
            codemapperUri: any;
            isEdit: any;
        } | undefined;
        getOrCreate(t: any, e: any, r: any): {
            model: any;
            vulns: any;
            codemapperUri: any;
            isEdit: any;
        } | {
            model: any;
            vulns: never[];
            codemapperUri: undefined;
        };
        h(t: any): void;
        clear(): void;
        updateSync(t: any, e: any, r: any, i: any): {
            model: any;
            vulns: any;
            codemapperUri: any;
            isEdit: any;
        } | {
            model: any;
            vulns: never[];
            codemapperUri: undefined;
        };
        markCodeBlockCompleted(t: any, e: any, r: any): void;
        update(t: any, e: any, r: any, i: any): Promise<{
            model: any;
            vulns: any;
            codemapperUri: any;
            isEdit: any;
        } | {
            model: any;
            vulns: never[];
            codemapperUri: undefined;
        }>;
        j(t: any, e: any, r: any, i: any, n: any): void;
        m(t: any, e: any, r: any, i: any): void;
        n(t: any, e: any, r: any): string;
        r(t: any, e: any, r: any): {
            _formatted: string | null;
            _fsPath: any;
            readonly fsPath: any;
            toString(e?: boolean): string;
            toJSON(): {
                $mid: number;
            };
            scheme: any;
            authority: any;
            path: any;
            query: any;
            fragment: any;
            with(e: any): /*elided*/ any;
        };
        s(t: any): {
            references: any;
        } | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=codeBlockModelCollection.d.ts.map