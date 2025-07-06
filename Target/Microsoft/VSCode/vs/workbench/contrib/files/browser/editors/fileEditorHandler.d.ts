declare class F {
    canSerialize(e: any): boolean;
    serialize(e: any): string;
    deserialize(e: any, r: any): any;
}
declare let p: {
    new (e: any, r: any, o: any): {
        a: any;
        b: any;
        handles(e: any): any;
        c(e: any): any;
        isOpen(e: any, r: any): boolean;
        createEditor(e: any): any;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { F as $_nc, p as $aoc };
//# sourceMappingURL=fileEditorHandler.d.ts.map