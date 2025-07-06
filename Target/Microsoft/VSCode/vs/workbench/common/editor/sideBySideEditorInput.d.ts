declare let m: {
    new (e: any, r: any, i: any, t: any, s: any): {
        readonly typeId: any;
        readonly capabilities: any;
        readonly resource: any;
        b: any;
        c: any;
        secondary: any;
        primary: any;
        h: any;
        a: any;
        m(): void;
        getName(): any;
        getPreferredName(): any;
        getDescription(e: any): any;
        getPreferredDescription(): any;
        getTitle(e: any): any;
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
        toUntyped(e: any): {
            label: any;
            description: any;
            primary: any;
            secondary: any;
        } | undefined;
        matches(e: any): any;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        readonly editorId: void;
        hasCapability(e: any): boolean;
        getIcon(): void;
        isModified(): boolean;
        resolve(): Promise<null>;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        isDisposed(): boolean;
        dispose(): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class E {
    canSerialize(e: any): boolean;
    serialize(e: any): string | undefined;
    deserialize(e: any, r: any): any;
    a(e: any, r: any): any[];
}
declare class v extends E {
    b(e: any, r: any, i: any, t: any, s: any): any;
}
export { m as $sI, E as $tI, v as $uI };
//# sourceMappingURL=sideBySideEditorInput.d.ts.map