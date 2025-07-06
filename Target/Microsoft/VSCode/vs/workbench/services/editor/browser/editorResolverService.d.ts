export { F as $$5b };
declare let F: {
    new (i: any, r: any, t: any, n: any, e: any, o: any, s: any, u: any): {
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        f: any;
        onDidChangeEditorRegistrations: any;
        m: Map<any, any>;
        n: Map<any, any>;
        r: boolean;
        s: Set<any>;
        G(i: any, r: any): any[] | Promise<any[]>;
        resolveEditor(i: any, r: any): any;
        H(i: any, r: any): any;
        bufferChangeEvents(i: any): void;
        registerEditor(i: any, r: any, t: any, n: any): any;
        getAssociationsForResource(i: any): {
            filenamePattern: string;
            viewType: any;
        }[];
        getAllUserAssociations(): {
            filenamePattern: string;
            viewType: any;
        }[];
        I(): Map<any, any>;
        readonly J: any[];
        updateUserAssociations(i: any, r: any): void;
        L(i: any): any[];
        getEditors(i: any): any;
        M(i: any, r: any): {
            editor: any;
            conflictingDefault: boolean;
        };
        N(i: any, r: any, t: any): Promise<{
            editor: any;
            options: any;
        } | undefined>;
        O(i: any, r: any): Promise<any>;
        P(i: any, r: any): {
            editor: any;
            group: any;
        }[];
        Q(i: any, r: any, t: any, n: any, e: any): Promise<void>;
        R(i: any, r: any): ({
            type: string;
        } | {
            id: any;
            label: any;
        })[];
        S(i: any, r: any): any;
        U(): void;
        W(i: any): boolean;
        q: _;
        dispose(): void;
        B(t: any): any;
    };
    g: string | undefined;
    h: string | undefined;
    j: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as _ } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=editorResolverService.d.ts.map