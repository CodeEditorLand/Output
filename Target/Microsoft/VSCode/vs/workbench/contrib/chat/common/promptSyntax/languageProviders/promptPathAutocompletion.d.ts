export { m as $vfc };
declare let m: {
    new (r: any, n: any, e: any): {
        a: any;
        b: any;
        c: any;
        _debugDisplayName: string;
        triggerCharacters: string[];
        provideCompletionItems(r: any, n: any, e: any, o: any): Promise<{
            suggestions: any[];
        } | undefined>;
        f(r: any): Promise<any[]>;
        g(r: any, n: any, e: any): Promise<any[]>;
        h(r: any, n: any, e: any): Promise<any[]>;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=promptPathAutocompletion.d.ts.map