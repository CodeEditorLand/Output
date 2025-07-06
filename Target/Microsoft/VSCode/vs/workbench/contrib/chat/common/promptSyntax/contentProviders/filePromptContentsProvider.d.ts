export { c as $OS };
declare let c: {
    new (i: any, t: any, e: any, r: any, n: any): {
        readonly sourceName: string;
        readonly languageId: any;
        uri: any;
        j: any;
        m: any;
        n: any;
        b(i: any, t: any): Promise<any>;
        createNew(i: any, t: any): any;
        toString(): string;
        readonly contents: any;
        readonly promptType: any;
        c: any;
        g: any;
        onContentChanged: any;
        f: any;
        h(t: any, i: any): /*elided*/ any;
        start(t: any): /*elided*/ any;
        a: any;
        readonly isDisposed: any;
        onDispose(s: any): any;
        addDisposables(...s: any[]): /*elided*/ any;
        assertNotDisposed(s: any): void;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=filePromptContentsProvider.d.ts.map