export { S as $jLb };
declare let S: {
    new (t: any, i: any, e: any, r: any, s: any, n: any, h: any, o: any, u: any, f: any): {
        readonly minimumWidth: any;
        readonly minimumHeight: any;
        readonly maximumWidth: any;
        readonly maximumHeight: any;
        readonly activeEditorPane: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        a: any;
        onDidFocus: any;
        b: any;
        onDidChangeSizeConstraints: any;
        c: any;
        f: any[];
        g: Map<any, any>;
        h: any;
        r: any;
        n: any;
        G(): void;
        H(): void;
        openEditor(t: any, i: any, e: any, r?: any): Promise<{
            pane: any;
            changed: boolean;
            cancelled: boolean;
        } | {
            error: any;
        }>;
        I(t: any, i: any, e: any, r: any, s: any): Promise<{
            error: any;
        } | {
            error: any;
            pane: any;
            changed: boolean;
            cancelled: boolean;
        }>;
        J(t: any, i: any): Promise<boolean>;
        L(t: any, i: any, e: any, r: any, s?: any): Promise<{
            pane: any;
            changed: boolean;
            cancelled: boolean;
        }>;
        M(t: any): boolean;
        N(t: any): any;
        O(t: any): any;
        P(t: any): any;
        Q(t: any): any;
        R(t: any): void;
        S(t: any, i: any, e: any, r: any): Promise<{
            changed: boolean;
            cancelled: boolean;
        }>;
        U(): void;
        closeEditor(t: any): void;
        setVisible(t: any): void;
        layout(t: any): void;
        j: any;
        setBoundarySashes(t: any): void;
        m: any;
        W(t: any): void;
        q: W;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as W } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=editorPanes.d.ts.map