declare let d: {
    new (e: any, r: any): {
        readonly providers: any[];
        j: any;
        m: any;
        f: Set<any>;
        g: any;
        onDidChangeQuickDiffProviders: any;
        h: Set<any>;
        addQuickDiffProvider(e: any): {
            dispose: () => void;
        };
        getQuickDiffs(e: any, r?: string, s?: boolean): Promise<{
            id: any;
            label: any;
            kind: any;
            originalResource: any;
        }[]>;
        toggleQuickDiffProviderVisibility(e: any): void;
        isQuickDiffProviderVisible(e: any): boolean;
        n(): void;
        r(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    c: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function Q(i: any, e: any, r: any, s: any): Promise<any>;
export { d as $epc, Q as $fpc };
//# sourceMappingURL=quickDiffService.d.ts.map