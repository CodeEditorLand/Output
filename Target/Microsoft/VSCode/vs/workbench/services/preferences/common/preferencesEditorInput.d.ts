declare let p: {
    new (e: any): {
        resource: {
            _formatted: string | null;
            _fsPath: any;
            readonly fsPath: any;
            toString(e?: boolean): string;
            toJSON(): {
                $mid: number;
            };
            scheme: any;
            authority: any;
            path: any;
            query: any;
            fragment: any;
            with(e: any): /*elided*/ any;
        };
        a: any;
        matches(e: any): boolean;
        readonly typeId: any;
        getName(): any;
        getIcon(): any;
        resolve(): Promise<any>;
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
declare class u extends g {
    resource: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    get typeId(): string | undefined;
    getName(): any;
    getIcon(): any;
}
import { $DF as g } from "../../../common/editor/editorInput.js";
export { p as $25b, u as $35b };
//# sourceMappingURL=preferencesEditorInput.d.ts.map