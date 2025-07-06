export { p as $15b };
declare let p: {
    new (e: any): {
        searchOptions: any;
        keybindingsModel: any;
        readonly typeId: any;
        getName(): any;
        getIcon(): any;
        resolve(): Promise<any>;
        matches(e: any): boolean;
        dispose(): void;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        readonly editorId: void;
        readonly capabilities: number;
        hasCapability(e: any): boolean;
        isReadonly(): boolean;
        getDescription(e: any): void;
        getTitle(e: any): string;
        getLabelExtraClasses(): never[];
        getAriaLabel(): string;
        getTelemetryDescriptor(): {
            typeId: any;
        };
        isDirty(): boolean;
        isModified(): boolean;
        isSaving(): boolean;
        save(e: any, t: any): Promise</*elided*/ any>;
        saveAs(e: any, t: any): Promise</*elided*/ any>;
        revert(e: any, t: any): Promise<void>;
        rename(e: any, t: any): Promise<void>;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        toUntyped(e: any): void;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=keybindingsEditorInput.d.ts.map