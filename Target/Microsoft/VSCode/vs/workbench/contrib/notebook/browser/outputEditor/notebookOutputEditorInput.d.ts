export { c as $8ec };
declare let c: {
    new (t: any, e: any, o: any, i: any, r: any): {
        m: any;
        b: any;
        cellIndex: any;
        h: any;
        outputIndex: any;
        readonly typeId: any;
        resolve(): Promise<I>;
        a: any;
        cellUri: any;
        getSerializedData(): {
            notebookUri: any;
            cellIndex: any;
            outputIndex: any;
        } | undefined;
        getName(): any;
        readonly editorId: string;
        readonly resource: void;
        readonly capabilities: number;
        dispose(): void;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        isReadonly(): boolean;
        getDescription(e: any): void;
        getTitle(e: any): string;
        getLabelExtraClasses(): never[];
        getAriaLabel(): string;
        getIcon(): void;
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
        matches(e: any): boolean;
        prefersEditorPane(e: any): any;
        toUntyped(e: any): void;
        isDisposed(): boolean;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class I {
    constructor(t: any, e: any, o: any, i: any);
    resolvedNotebookEditorModel: any;
    notebookUri: any;
    cell: any;
    outputId: any;
    dispose(): void;
}
//# sourceMappingURL=notebookOutputEditorInput.d.ts.map