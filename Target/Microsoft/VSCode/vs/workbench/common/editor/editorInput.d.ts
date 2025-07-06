export { p as $DF };
declare class p extends s {
    constructor(...args: any[]);
    f: any;
    g: any;
    j: any;
    n: any;
    onDidChangeDirty: any;
    onDidChangeLabel: any;
    onDidChangeCapabilities: any;
    onWillDispose: any;
    get editorId(): void;
    get capabilities(): number;
    hasCapability(e: any): boolean;
    isReadonly(): boolean;
    getName(): string;
    getDescription(e: any): void;
    getTitle(e: any): string;
    getLabelExtraClasses(): never[];
    getAriaLabel(): string;
    getIcon(): void;
    getTelemetryDescriptor(): {
        typeId: any;
    };
    isDirty(): boolean;
    isModified(): boolean;
    isSaving(): boolean;
    resolve(): Promise<null>;
    save(e: any, t: any): Promise<this>;
    saveAs(e: any, t: any): Promise<this>;
    revert(e: any, t: any): Promise<void>;
    rename(e: any, t: any): Promise<void>;
    copy(): this;
    canMove(e: any, t: any): boolean;
    matches(e: any): boolean;
    prefersEditorPane(e: any): any;
    toUntyped(e: any): void;
    isDisposed(): boolean;
}
import { $KK as s } from "../editor.js";
//# sourceMappingURL=editorInput.d.ts.map