declare let m: {
    new (i: any, t: any, e: any, r: any, s: any, o: any): {
        readonly typeId: any;
        readonly editorId: any;
        readonly capabilities: any;
        original: any;
        modified: any;
        w: any;
        u: {
            name: any;
            shortDescription: any;
            mediumDescription: any;
            longDescription: any;
            forceDescription: boolean;
            shortTitle: any;
            mediumTitle: any;
            longTitle: any;
        };
        y(): {
            name: any;
            shortDescription: any;
            mediumDescription: any;
            longDescription: any;
            forceDescription: boolean;
            shortTitle: any;
            mediumTitle: any;
            longTitle: any;
        };
        z(i: any, t: any, e?: string): any;
        getName(): any;
        getDescription(i?: number): any;
        getTitle(i: any): any;
        resolve(): Promise<any>;
        t: any;
        prefersEditorPane(i: any): any;
        C(): Promise<_>;
        toUntyped(i: any): {
            modified: any;
            original: any;
            label: any;
            description: any;
            primary: any;
            secondary: any;
        } | undefined;
        matches(i: any): any;
        dispose(): void;
        readonly resource: any;
        b: any;
        c: any;
        secondary: any;
        primary: any;
        h: any;
        a: any;
        m(): void;
        getPreferredName(): any;
        getPreferredDescription(): any;
        r(): any;
        getLabelExtraClasses(): any;
        getAriaLabel(): any;
        getTelemetryDescriptor(): any;
        isDirty(): any;
        isSaving(): any;
        save(e: any, r: any): Promise<any>;
        saveAs(e: any, r: any): Promise<any>;
        s(e: any): any;
        revert(e: any, r: any): any;
        rename(e: any, r: any): Promise<{
            editor: any;
            options: any;
        } | {
            editor: {
                label: any;
                description: any;
                primary: any;
                secondary: any;
                options: any;
            };
            options?: never;
        } | undefined>;
        isReadonly(): any;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        hasCapability(e: any): boolean;
        getIcon(): void;
        isModified(): boolean;
        copy(): /*elided*/ any;
        canMove(e: any, t: any): boolean;
        isDisposed(): boolean;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Q extends b {
    b(i: any, t: any, e: any, r: any, s: any): any;
}
import { $aHb as _ } from "./diffEditorModel.js";
import { $tI as b } from "./sideBySideEditorInput.js";
export { m as $cHb, Q as $dHb };
//# sourceMappingURL=diffEditorInput.d.ts.map