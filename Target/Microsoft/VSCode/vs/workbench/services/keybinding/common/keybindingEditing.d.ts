declare const K: any;
declare let w: {
    new (t: any, e: any, s: any, r: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        c: $;
        addKeybinding(t: any, e: any, s: any): Promise<any>;
        editKeybinding(t: any, e: any, s: any): Promise<any>;
        resetKeybinding(t: any): Promise<any>;
        removeKeybinding(t: any): Promise<any>;
        m(t: any, e: any, s: any, r: any): Promise<void>;
        n(t: any): Promise<any>;
        r(t: any): Promise<any>;
        s(): any;
        t(t: any, e: any, s: any, r: any, n: any): void;
        u(t: any, e: any): void;
        w(t: any, e: any): void;
        y(t: any, e: any): void;
        z(t: any, e: any): number;
        C(t: any, e: any): number[];
        D(t: any, e: any, s: any, r: any): {
            key: any;
        };
        F(t: any, e: any): boolean;
        G(t: any, e: any): void;
        H(): Promise<any>;
        I(): Promise<any>;
        J(t: any): {
            result: any;
            parseErrors: any[];
        };
        L(): string;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Th as $ } from "../../../../base/common/async.js";
export { K as $K5b, w as $L5b };
//# sourceMappingURL=keybindingEditing.d.ts.map