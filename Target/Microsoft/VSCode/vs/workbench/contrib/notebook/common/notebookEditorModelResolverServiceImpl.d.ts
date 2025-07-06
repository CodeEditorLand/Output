export { N as $a_b };
declare let N: {
    new (t: any, e: any, i: any, s: any): {
        c: any;
        d: any;
        e: any;
        b: I;
        onWillFailWithConflict: any;
        a: any;
        onDidSaveNotebook: any;
        onDidChangeDirty: any;
        dispose(): void;
        isDirty(t: any): any;
        f(t: any): {
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
        g(t: any, e: any): Promise<{
            resource: any;
            viewType: any;
        }>;
        createUntitledNotebookTextModel(t: any): Promise<any>;
        resolve(t: any, e: any, i: any): Promise<{
            object: any;
            dispose(): void;
        }>;
    };
};
import { $gf as I } from "../../../../base/common/event.js";
//# sourceMappingURL=notebookEditorModelResolverServiceImpl.d.ts.map