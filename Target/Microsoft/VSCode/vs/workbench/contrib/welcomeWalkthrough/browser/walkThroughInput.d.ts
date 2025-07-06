export { m as $3wc };
declare let m: {
    new (e: any, t: any, r: any): {
        readonly capabilities: number;
        readonly resource: any;
        h: any;
        r: any;
        s: any;
        a: Promise<p> | null;
        b: number;
        c: number;
        readonly typeId: any;
        getName(): any;
        getDescription(): any;
        getTelemetryFrom(): any;
        getTelemetryDescriptor(): {
            typeId: any;
        };
        readonly onReady: any;
        readonly layout: any;
        resolve(): Promise<p>;
        matches(e: any): boolean;
        dispose(): void;
        relativeScrollPosition(e: any, t: any): void;
        f: any;
        g: any;
        j: any;
        n: any;
        onDidChangeDirty: any;
        onDidChangeLabel: any;
        onDidChangeCapabilities: any;
        onWillDispose: any;
        readonly editorId: void;
        hasCapability(e: any): boolean;
        isReadonly(): boolean;
        getTitle(e: any): string;
        getLabelExtraClasses(): never[];
        getAriaLabel(): string;
        getIcon(): void;
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
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class p extends w {
    constructor(e: any, t: any);
    a: any;
    b: any;
    get main(): any;
    get snippets(): any;
}
import { $HF as w } from "../../../common/editor/editorModel.js";
//# sourceMappingURL=walkThroughInput.d.ts.map