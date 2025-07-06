declare const $: ".code-search";
declare let p: {
    new (t: any, e: any, r: any, s: any, i: any, n: any, h: any, f: any, v: any, y: any): {
        readonly typeId: any;
        readonly editorId: any;
        getIcon(): any;
        readonly capabilities: number;
        readonly resource: any;
        modelUri: any;
        backingUri: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        b: boolean;
        h: any;
        onDidChangeContent: any;
        m: any;
        onDidSave: any;
        r: any[];
        model: any;
        a: S;
        save(t: any, e: any): Promise<any>;
        tryReadConfigSync(): any;
        G(): Promise<string>;
        I(t: any): void;
        H: any;
        c: any;
        resolveModels(): Promise<any>;
        s: any;
        t: any;
        saveAs(t: any, e: any): Promise<any>;
        getName(t?: number): any;
        setDirty(t: any): void;
        isDirty(): boolean;
        rename(t: any, e: any): Promise<{
            editor: any;
        } | undefined>;
        dispose(): void;
        matches(t: any): boolean;
        getMatchRanges(): any;
        setMatchRanges(t: any): Promise<void>;
        revert(t: any, e: any): Promise<void>;
        J(t: any): Promise<{
            content?: never;
        } | {
            content: {
                read: () => any;
            };
        }>;
        L(): Promise<any>;
        toUntyped(): {
            resource: any;
            options: {
                override: any;
            };
        } | undefined;
        copy(): any;
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
        getTelemetryDescriptor(): {
            typeId: any;
        };
        isModified(): boolean;
        isSaving(): boolean;
        resolve(): Promise<null>;
        canMove(e: any, t: any): boolean;
        prefersEditorPane(e: any): any;
        isDisposed(): boolean;
        q: import("../../../../base/common/lifecycle").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function U(c: any, t: any): any;
import { $Dub as S } from "../../../common/memento.js";
export { $ as $kdc, p as $ldc, U as $mdc };
//# sourceMappingURL=searchEditorInput.d.ts.map