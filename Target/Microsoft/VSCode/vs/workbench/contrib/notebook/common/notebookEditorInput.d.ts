declare let f: {
    new (t: any, s: any, e: any, r: any, i: any, c: any, n: any, v: any, w: any, $: any, j: any, l: any, D: any, g: any): {
        viewType: any;
        options: any;
        S: any;
        U: any;
        W: any;
        c: any;
        R: boolean;
        Q: any;
        dispose(): void;
        readonly typeId: any;
        readonly editorId: any;
        readonly capabilities: any;
        getDescription(t?: number): any;
        isReadonly(): any;
        isDirty(): any;
        isSaving(): any;
        save(t: any, s: any): Promise<any>;
        saveAs(t: any, s: any): Promise<any>;
        X(t: any, s: any): Promise<any>;
        rename(t: any, s: any): Promise<{
            editor: {
                resource: any;
            };
            options: {
                override: any;
            };
        } | undefined>;
        revert(t: any, s: any): Promise<void>;
        resolve(t: any, s: any): Promise<any>;
        toUntyped(): {
            resource: any;
            options: {
                override: any;
            };
        };
        matches(t: any): boolean;
        readonly preferredResource: any;
        resource: any;
        b: any;
        h: any;
        m: any;
        r: any;
        s: any;
        a: any;
        t(): void;
        u(t: any): void;
        w(): void;
        setPreferredResource(t: any): void;
        getName(): any;
        y: any;
        readonly C: any;
        z: any;
        readonly F: any;
        D: any;
        readonly H: any;
        G: any;
        readonly J: any;
        I: any;
        readonly M: any;
        L: any;
        readonly O: any;
        N: any;
        getTitle(t: any): any;
        P(t: any): any;
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
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    getOrCreate(t: any, s: any, e: any, r: any, i?: {}): any;
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function ht(o: any): any;
declare function ut(o: any): boolean;
export { f as $wzb, ht as $xzb, ut as $yzb };
//# sourceMappingURL=notebookEditorInput.d.ts.map