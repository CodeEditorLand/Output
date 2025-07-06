declare const T: any;
declare let p: {
    new (t: any, e: any, s: any, i: any, o: any, n: any, c: any, a: any): {
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        a: Map<any, any>;
        b: Map<any, any>;
        c: any;
        f: any;
        onDidChangeAccountPreference: any;
        g: any;
        h: {};
        y(): void;
        z(t: any, e: any): Promise<void>;
        C(t: any, e: any): Promise<void>;
        D(): void;
        F(t: any, e: any): void;
        updateAccountPreference(t: any, e: any, s: any): void;
        getAccountPreference(t: any, e: any): any;
        removeAccountPreference(t: any, e: any): void;
        G(t: any, e: any): string;
        updateSessionPreference(t: any, e: any, s: any): void;
        getSessionPreference(t: any, e: any, s: any): any;
        removeSessionPreference(t: any, e: any, s: any): void;
        H(t: any, e: any, s: any): void;
        I(t: any, e: any, s: any, i: any): Promise<boolean>;
        selectSession(t: any, e: any, s: any, i: any, o: any): Promise<any>;
        J(t: any, e: any, s: any, i: any): Promise<void>;
        requestSessionAccess(t: any, e: any, s: any, i: any, o: any): void;
        requestNewSession(t: any, e: any, s: any, i: any): Promise<void>;
        q: O;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as O } from "../../../../base/common/lifecycle.js";
export { T as $63b, p as $73b };
//# sourceMappingURL=authenticationMcpService.d.ts.map