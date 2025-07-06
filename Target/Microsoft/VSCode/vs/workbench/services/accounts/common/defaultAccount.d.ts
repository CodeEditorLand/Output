declare class et extends l {
    constructor(...args: any[]);
    b: B;
    c: any;
    onDidChangeDefaultAccount: any;
    get defaultAccount(): any;
    getDefaultAccount(): Promise<any>;
    setDefaultAccount(t: any): void;
    a: any;
}
declare const R: any;
declare class it extends l {
    constructor(...args: any[]);
    onDidChangeDefaultAccount: any;
    getDefaultAccount(): Promise<null>;
    setDefaultAccount(t: any): void;
}
declare let g: {
    new (t: any, e: any, i: any, s: any, n: any, r: any, a: any, h: any): {
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        a: any;
        b: any;
        r(): Promise<void>;
        t(t: any): void;
        u(t: any): Map<any, any>;
        w(t: any, e: any, i: any, s: any, n: any, r: any): Promise<any>;
        y(t: any, e: any): any;
        z(t: any, e: any): Promise<{
            chat_preview_features_enabled?: never;
            mcp?: never;
        } | {
            chat_preview_features_enabled: boolean;
            mcp: boolean;
        }>;
        C(t: any, e: any): Promise<any>;
        D(t: any, e: any, i: any, s: any, n: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as l } from "../../../../base/common/lifecycle.js";
import { $Lh as B } from "../../../../base/common/async.js";
export { et as $$7b, R as $07b, it as $_7b, g as $a8b };
//# sourceMappingURL=defaultAccount.d.ts.map