declare let b: {
    new (e: any, t: any, i: any, s: any, o: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        createModel(e: any, t: any, i: any): Promise<T>;
    };
};
declare let p: {
    new (e: any, t: any, i: any, s: any, o: any, r: any): {
        resource: any;
        s: any;
        viewType: any;
        t: any;
        u: any;
        a: any;
        b: any;
        c: any;
        g: any;
        j: any;
        onDidChangeDirty: any;
        onDidSave: any;
        onDidChangeOrphaned: any;
        onDidChangeReadonly: any;
        onDidRevertUntitled: any;
        n: any;
        r: any;
        dispose(): void;
        readonly notebook: any;
        isResolved(): boolean;
        canDispose(): Promise<any>;
        isDirty(): any;
        isModified(): any;
        isOrphaned(): any;
        hasAssociatedFilePath(): boolean;
        isReadonly(): any;
        readonly hasErrorState: any;
        revert(e: any): Promise<any>;
        save(e: any): Promise<any>;
        load(e: any): Promise</*elided*/ any>;
        m: any;
        saveAs(e: any): Promise<{
            resource: any;
        } | undefined>;
        f: any;
        onWillDispose: any;
        h: boolean;
        resolve(): Promise<void>;
        isDisposed(): boolean;
        q: g;
        B(t: any): any;
    };
    w(e: any): boolean;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class T extends y {
    constructor(e: any, t: any, i: any, s: any, o: any);
    b: any;
    c: any;
    f: any;
    g: any;
    h: any;
    a: any;
    onDidChangeContent: any;
    onWillDispose: any;
    configuration: {
        backupDelay: number;
    } | undefined;
    j(): Promise<void>;
    save: ((e: any, t: any) => Promise<any>) | undefined;
    get notebookModel(): any;
    snapshot(e: any, t: any): Promise<any>;
    update(e: any, t: any): Promise<void>;
    getNotebookSerializer(): Promise<any>;
    get versionId(): any;
    pushStackElement(): void;
}
import { $ud as g } from "../../../../base/common/lifecycle.js";
import { $vd as y } from "../../../../base/common/lifecycle.js";
export { b as $12b, p as $Y2b, T as $Z2b };
//# sourceMappingURL=notebookEditorModel.d.ts.map