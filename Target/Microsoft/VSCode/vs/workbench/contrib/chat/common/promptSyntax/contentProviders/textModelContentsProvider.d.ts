export { c as $PS };
declare let c: {
    new (t: any, e: any, r: any): {
        readonly uri: any;
        readonly sourceName: string;
        readonly languageId: any;
        j: any;
        m: any;
        b(t: any, e: any): Promise<import("../codecs/base/utils/objectStream.js").$yR>;
        createNew(t: any, e: any): any;
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
//# sourceMappingURL=textModelContentsProvider.d.ts.map