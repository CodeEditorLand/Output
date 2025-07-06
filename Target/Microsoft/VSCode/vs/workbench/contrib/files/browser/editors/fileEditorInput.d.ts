export { b as $3Ib };
declare let b: {
    new (e: any, t: any, i: any, h: any, s: any, o: any, f: any, m: any, l: any, p: any, $: any, y: any, v: any, P: any, I: any, R: any, D: any): {
        readonly typeId: string;
        readonly editorId: string;
        readonly capabilities: number;
        cb: any;
        db: any;
        eb: any;
        Z: number;
        bb: any;
        $: any;
        fb(e: any): void;
        gb(e: any): void;
        getName(): any;
        setPreferredName(e: any): void;
        c: any;
        hb(): boolean;
        getPreferredName(): any;
        isReadonly(): any;
        getDescription(e: any): any;
        setPreferredDescription(e: any): void;
        U: any;
        getPreferredDescription(): any;
        getTitle(e: any): any;
        ib(): any;
        getEncoding(): any;
        getPreferredEncoding(): any;
        setEncoding(e: any, t: any): Promise<any>;
        setPreferredEncoding(e: any): void;
        W: any;
        getLanguageId(): any;
        getPreferredLanguageId(): any;
        setLanguageId(e: any, t: any): void;
        setPreferredLanguageId(e: any): void;
        X: any;
        setPreferredContents(e: any): void;
        Y: any;
        setForceOpenAsText(): void;
        setForceOpenAsBinary(): void;
        isDirty(): boolean;
        isSaving(): boolean;
        prefersEditorPane(e: any): any;
        resolve(e: any): Promise<any>;
        jb(e: any): Promise<any>;
        ab: any;
        kb(): Promise<any>;
        isResolved(): boolean;
        rename(e: any, t: any): Promise<{
            editor: {
                resource: any;
                encoding: any;
                options: {
                    viewState: any;
                };
            };
        }>;
        toUntyped(e: any): {
            resource: any;
            forceFile: boolean;
            options: {
                override: string;
            };
        };
        matches(e: any): boolean;
        dispose(): void;
        lb(): void;
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
        isDisposed(): boolean;
        q: N;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as N } from "../../../../../base/common/lifecycle.js";
//# sourceMappingURL=fileEditorInput.d.ts.map