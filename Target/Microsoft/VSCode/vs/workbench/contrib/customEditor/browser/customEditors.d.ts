export { E as $Brc };
declare let E: {
    new (t: any, r: any, e: any, o: any, i: any, s: any, n: any): {
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        b: number;
        c: any;
        g: Map<any, any>;
        j: any;
        onDidChangeEditorTypes: any;
        m: any;
        h: X;
        a: any;
        getEditorTypes(): any[];
        w(t: any): any;
        y(): void;
        z(t: any, r: any, e: any): any;
        readonly models: X;
        getCustomEditor(t: any): any;
        getContributedCustomEditors(t: any): f;
        getUserConfiguredCustomEditors(t: any): f;
        getAllCustomEditors(t: any): f;
        registerCustomEditorCapabilities(t: any, r: any): any;
        getCustomEditorCapabilities(t: any): any;
        C(t: any): any;
        D(t: any): boolean;
        F(t: any, r: any): Promise<void>;
        q: v;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $yrc as X } from "../common/customEditorModelManager.js";
import { $3Xb as f } from "../common/customEditor.js";
import { $ud as v } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=customEditors.d.ts.map