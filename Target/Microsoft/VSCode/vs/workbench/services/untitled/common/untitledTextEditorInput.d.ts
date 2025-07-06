export { u as $3Ab };
declare let u: {
    new (t: any, e: any, i: any, o: any, r: any, h: any, a: any, f: any, p: any, g: any, m: any): {
        readonly typeId: any;
        readonly editorId: string;
        X: any;
        Y: any;
        Z: any;
        $: any;
        U: any;
        ab(t: any): void;
        bb(t: any): void;
        getName(): any;
        getDescription(t?: number): any;
        getTitle(t: any): any;
        isDirty(): any;
        getEncoding(): any;
        setEncoding(t: any, e: any): any;
        readonly hasLanguageSetExplicitly: any;
        readonly hasAssociatedFilePath: any;
        setLanguageId(t: any, e: any): void;
        getLanguageId(): any;
        resolve(): Promise<any>;
        c: Promise<void> | undefined;
        W: any;
        toUntyped(t: any): {
            resource: any;
            forceUntitled: boolean;
            options: {
                override: string;
            };
        };
        matches(t: any): boolean;
        dispose(): void;
        cb(): void;
        Q: any;
        R: any;
        save(e: any, t: any): Promise<{
            resource: any;
        } | undefined>;
        saveAs(e: any, t: any): Promise<{
            resource: any;
        } | undefined>;
        S(e: any, t: any, i: any): Promise<{
            resource: any;
        } | undefined>;
        revert(e: any, t: any): Promise<void>;
        readonly capabilities: number;
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
        q: L;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as L } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=untitledTextEditorInput.d.ts.map