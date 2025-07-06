declare let u: {
    new (e: any, t: any, r: any): {
        a: any;
        b: any;
        c: any;
        canSerialize(e: any): any;
        serialize(e: any): string | undefined;
        deserialize(e: any, t: any): any;
    };
};
declare let d: {
    new (e: any, t: any, r: any, o: any, i: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        handles(e: any): boolean;
        isOpen(e: any, t: any): boolean;
        createEditor(e: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { u as $j5b, d as $k5b };
//# sourceMappingURL=untitledTextEditorHandler.d.ts.map