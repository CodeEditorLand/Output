declare let f: {
    new (t: any): {
        a: any;
        provideDocumentColors(t: any, o: any): Promise<any>;
        provideColorPresentations(t: any, o: any, s: any): {
            label: any;
            textEdit: {
                range: any;
                text: any;
            };
        }[];
    };
};
declare let d: {
    new (t: any, o: any): {
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { f as $vjb, d as $wjb };
//# sourceMappingURL=defaultDocumentColorProvider.d.ts.map