export { v as $9Xb };
declare let v: {
    new (t: any, e: any, i: any, s: any, r: any, o: any, h: any, d: any, f: any, c: any, y: any, w: any, D: any, $: any): {
        readonly resource: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        S: any;
        C: any;
        oldResource: any;
        D: any;
        F: any;
        G: any;
        U(): void;
        W(t: any): void;
        X(): void;
        readonly typeId: any;
        readonly editorId: any;
        readonly capabilities: number;
        getName(): any;
        Y: any;
        getDescription(t?: number): any;
        readonly $: any;
        Z: any;
        readonly bb: any;
        ab: any;
        readonly db: any;
        cb: any;
        readonly fb: any;
        eb: any;
        readonly hb: any;
        gb: any;
        readonly jb: any;
        ib: any;
        getTitle(t: any): any;
        matches(t: any): boolean;
        copy(): any;
        isReadonly(): any;
        isDirty(): any;
        save(t: any, e: any): Promise</*elided*/ any | {
            resource: any;
        } | undefined>;
        saveAs(t: any, e: any): Promise<{
            resource: any;
        } | undefined>;
        revert(t: any, e: any): Promise<any>;
        resolve(): Promise<null>;
        H: any;
        rename(t: any, e: any): Promise<{
            editor: {
                resource: any;
            };
        }>;
        undo(): any;
        redo(): any;
        onMove(t: any): void;
        kb: any;
        t(t: any): any;
        readonly backupId: any;
        readonly untitledDocumentData: any;
        toUntyped(): {
            resource: any;
            options: {
                override: any;
            };
        };
        claim(t: any, e: any, i: any): any;
        canMove(t: any, e: any): string | boolean;
        mb(t: any): any;
        y: any;
        u: boolean;
        dispose(): void;
        w: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | undefined;
        s: any;
        a: string;
        r: boolean;
        viewType: any;
        providedId: any;
        b: any;
        m: any;
        setName(e: any): void;
        readonly webview: any;
        readonly extension: any;
        iconPath: any;
        c: any;
        readonly group: any;
        updateGroup(e: any): void;
        h: any;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        getLabelExtraClasses(): never[];
        getAriaLabel(): string;
        getIcon(): void;
        getTelemetryDescriptor(): {
            typeId: any;
        };
        isModified(): boolean;
        isSaving(): boolean;
        prefersEditorPane(e: any): any;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    create(t: any, e: any, i: any, s: any, r: any): any;
    typeId: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=customEditorInput.d.ts.map