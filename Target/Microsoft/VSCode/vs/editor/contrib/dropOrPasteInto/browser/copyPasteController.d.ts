declare const mt: "editor.pasteAs.preferences";
declare const ft: "editor.changePasteType";
declare const yt: tt;
declare let _: {
    new (t: any, e: any, i: any, s: any, o: any, r: any, n: any, c: any, d: any): {
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        c: any;
        h: any;
        j: any;
        changePasteType(): void;
        pasteAs(t: any): Promise<void>;
        g: {
            preferred: any;
        } | undefined;
        clearWidgets(): void;
        y(): any;
        finishedPaste(): Promise<void>;
        z(t: any): void;
        C(t: any): Promise<void>;
        D(t: any, e: any): void;
        F(t: any, e: any, i: any, s: any, o: any): void;
        f: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | undefined;
        G(t: any, e: any, i: any, s: any, o: any): void;
        H(t: any, e: any): void;
        I(t: any): any;
        J(t: any, e: any, i: any, s: any): Promise<void>;
        L(t: any, e: any, i: any, s: any, o: any, r: any): Promise<{
            edits: any;
            dispose: () => void;
        }>;
        M(t: any, e: any, i: any, s: any): Promise<void>;
        N(t: any, e: any, i: any): any;
        O(t: any, e: any): any;
        P(t: any, e: any): any;
        q: T;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(t: any): any;
    setConfigureDefaultAction(t: any): void;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Wn as tt } from "../../../../platform/contextkey/common/contextkey.js";
import { $ud as T } from "../../../../base/common/lifecycle.js";
export { mt as $$hb, ft as $0hb, yt as $_hb, _ as $aib };
//# sourceMappingURL=copyPasteController.d.ts.map