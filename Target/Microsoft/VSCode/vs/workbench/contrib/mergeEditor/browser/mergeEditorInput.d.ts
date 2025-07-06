declare class lt {
    constructor(t: any, i: any, e: any, n: any);
    uri: any;
    title: any;
    detail: any;
    description: any;
}
declare let d: {
    new (t: any, i: any, e: any, n: any, r: any, a: any, c: any, b: any, $: any, g: any, v: any, y: any, w: any, _: any): {
        readonly W: any;
        base: any;
        input1: any;
        input2: any;
        result: any;
        X: any;
        Y: any;
        Z: any;
        U: string;
        closeHandler: {
            showConfirm: () => any;
            confirm: (m: any) => Promise<any>;
        };
        $: any;
        dispose(): void;
        readonly typeId: any;
        readonly editorId: string;
        readonly capabilities: number;
        getName(): any;
        resolve(): Promise<any>;
        c: any;
        accept(): Promise<void>;
        save(t: any, i: any): Promise<void>;
        toUntyped(): {
            input1: {
                resource: any;
                label: any;
                description: any;
                detail: any;
            };
            input2: {
                resource: any;
                label: any;
                description: any;
                detail: any;
            };
            base: {
                resource: any;
            };
            result: {
                resource: any;
            };
            options: {
                override: any;
            };
        };
        matches(t: any): boolean;
        revert(t: any, i: any): Promise<any>;
        isDirty(): any;
        setLanguageId(t: any, i: any): void;
        updateFocusedEditor(t: any): void;
        Q: any;
        R: any;
        saveAs(e: any, t: any): Promise<{
            resource: any;
        } | undefined>;
        S(e: any, t: any, i: any): Promise<{
            resource: any;
        } | undefined>;
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
        y: any;
        getDescription(t?: number): any;
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
        isReadonly(): any;
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
        isSaving(): boolean;
        rename(e: any, t: any): Promise<void>;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { lt as $gYb, d as $hYb };
//# sourceMappingURL=mergeEditorInput.d.ts.map