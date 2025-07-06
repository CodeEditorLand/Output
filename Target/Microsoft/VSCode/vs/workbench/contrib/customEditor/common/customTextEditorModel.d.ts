export { u as $01b };
declare let u: {
    new (t: any, e: any, i: any, s: any, r: any, n: any): {
        viewType: any;
        f: any;
        g: any;
        h: any;
        j: any;
        b: any;
        onDidChangeOrphaned: any;
        c: any;
        onDidChangeReadonly: any;
        m: any;
        onDidChangeDirty: any;
        n: any;
        onDidChangeContent: any;
        a: any;
        readonly resource: any;
        readonly name: any;
        isReadonly(): any;
        readonly backupId: void;
        readonly canHotExit: boolean;
        isDirty(): any;
        isOrphaned(): boolean;
        revert(t: any): Promise<any>;
        saveCustomEditor(t: any): any;
        saveCustomEditorAs(t: any, e: any, i: any): Promise<boolean>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    create(t: any, e: any, i: any): Promise<any>;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=customTextEditorModel.d.ts.map