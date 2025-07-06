declare let b: {
    new (e: any, r: any, t: any): {
        d: any;
        e: any;
        serialize(e: any): string | undefined;
        b(e: any): any;
        deserialize(e: any, r: any): any;
        a: any;
        canSerialize(e: any): any;
        c(e: any): {
            origin: any;
            viewType: any;
            providedId: any;
            title: any;
            options: any;
            extensionLocation: any;
            extensionId: any;
            state: any;
            iconPath: {
                light: any;
                dark: any;
            } | undefined;
            group: any;
        };
    };
    ID: string | undefined;
};
declare let d: {
    new (e: any, r: any, t: any, o: any, i: any): {
        a: any;
        b: any;
        c: any;
        handles(e: any): boolean;
        isOpen(e: any, r: any): boolean;
        createEditor(e: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { b as $81b, d as $91b };
//# sourceMappingURL=customEditorInputFactory.d.ts.map