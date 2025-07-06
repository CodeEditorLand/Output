declare let h: {
    new (t: any, e: any, s: any, n: any): {
        resource: any;
        options: any;
        c: any;
        h: any;
        closeHandler: /*elided*/ any;
        sessionId: any;
        a: any;
        showConfirm(): boolean;
        confirm(t: any): Promise<0 | 2>;
        readonly editorId: any;
        readonly capabilities: number;
        matches(t: any): boolean;
        readonly typeId: any;
        getName(): any;
        getIcon(): any;
        resolve(): Promise<any>;
        b: any;
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
    countsInUse: Set<any> | undefined;
    TypeID: string | undefined;
    EditorID: string | undefined;
    getNewEditorUri(): any;
    getNextCount(): number;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class _ extends $ {
    constructor(t: any);
    model: any;
    a: any;
    onWillDispose: any;
    b: boolean;
    c: boolean;
    resolve(): Promise<void>;
    isResolved(): boolean;
    isDisposed(): boolean;
}
declare class V {
    canSerialize(t: any): boolean;
    serialize(t: any): string | undefined;
    deserialize(t: any, e: any): any;
}
declare function C(i: any, t: any, e: any): Promise<boolean>;
declare function R(i: any): boolean;
declare var u: any;
import { $vd as $ } from "../../../../base/common/lifecycle.js";
export { h as $cEb, _ as $dEb, V as $eEb, C as $fEb, R as $gEb, u as ChatUri };
//# sourceMappingURL=chatEditorInput.d.ts.map