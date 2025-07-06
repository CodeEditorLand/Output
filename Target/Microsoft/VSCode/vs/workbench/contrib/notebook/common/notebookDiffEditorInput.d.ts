export { h as $l$b };
declare let h: {
    new (i: any, e: any, o: any, s: any, r: any, t: any): {
        readonly resource: any;
        readonly editorId: any;
        original: any;
        modified: any;
        viewType: any;
        D: any;
        F: any;
        readonly typeId: any;
        resolve(): Promise<any>;
        G: any;
        toUntyped(): {
            original: {
                resource: any;
            };
            modified: {
                resource: any;
            };
            primary: {
                resource: any;
            };
            secondary: {
                resource: any;
            };
            options: {
                override: any;
            };
        };
        matches(i: any): any;
        dispose(): void;
        readonly capabilities: any;
        w: any;
        u: {
            name: any;
            shortDescription: any;
            mediumDescription: any;
            longDescription: any;
            forceDescription: boolean;
            shortTitle: any;
            mediumTitle: any;
            longTitle: any;
        };
        y(): {
            name: any;
            shortDescription: any;
            mediumDescription: any;
            longDescription: any;
            forceDescription: boolean;
            shortTitle: any;
            mediumTitle: any;
            longTitle: any;
        };
        z(i: any, t: any, e?: string): any;
        getName(): any;
        getDescription(i?: number): any;
        getTitle(i: any): any;
        t: any;
        prefersEditorPane(i: any): any;
        C(): Promise<import("../../../common/editor/diffEditorModel.js").$aHb>;
        b: any;
        c: any;
        secondary: any;
        primary: any;
        h: any;
        a: any;
        m(): void;
        getPreferredName(): any;
        getPreferredDescription(): any;
        r(): any;
        getLabelExtraClasses(): any;
        getAriaLabel(): any;
        getTelemetryDescriptor(): any;
        isDirty(): any;
        isSaving(): any;
        save(e: any, r: any): Promise<any>;
        saveAs(e: any, r: any): Promise<any>;
        s(e: any): any;
        revert(e: any, r: any): any;
        rename(e: any, r: any): Promise<{
            editor: any;
            options: any;
        } | {
            editor: {
                label: any;
                description: any;
                primary: any;
                secondary: any;
                options: any;
            };
            options?: never;
        } | undefined>;
        isReadonly(): any;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        getIcon(): void;
        isModified(): boolean;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    create(i: any, e: any, o: any, s: any, r: any, t: any): any;
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=notebookDiffEditorInput.d.ts.map