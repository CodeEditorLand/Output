declare const Ee: any;
declare function ee(o: any): boolean;
declare let U: {
    new (e: any, t: any, i: any, s: any, n: any): {
        a: any;
        b: any;
        onDidChangeQuotaExceeded: any;
        c: any;
        onDidChangeQuotaRemaining: any;
        f: {};
        j: {
            chatQuotaExceeded: any;
            completionsQuotaExceeded: any;
        };
        g: any;
        h: any;
        onDidChangeEntitlement: any;
        onDidChangeSentiment: any;
        context: P | undefined;
        requests: P | undefined;
        readonly entitlement: any;
        readonly quotas: {};
        m(): void;
        acceptQuotas(e: any): void;
        n(e: any, t: any): {
            changed: {
                exceeded: boolean;
                remaining: boolean;
            };
        };
        clearQuotas(): void;
        r(): void;
        readonly sentiment: {
            installed: boolean;
            hidden: boolean;
            disabled: boolean;
            untrusted: boolean;
            later: boolean;
        };
        update(e: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let v: {
    new (e: any, t: any, i: any, s: any, n: any, l: any, h: any, m: any, D: any, R: any, T: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        b: w;
        c: boolean;
        a: {
            entitlement: any;
        };
        y(): void;
        z(): Promise<void>;
        C(e: any): Promise<any>;
        D(e: any): Promise<any>;
        F(e: any, t: any): any;
        G(e: any, t: any): Promise<{
            entitlement: any;
            quotas: {
                resetDate: any;
            };
        } | {
            entitlement: any;
        } | undefined>;
        H(e: any, t: any): Promise<{
            entitlement: any;
            quotas: {
                resetDate: any;
            };
        } | {
            entitlement: any;
        } | undefined>;
        I(e: any): {
            resetDate: any;
        };
        J(e: any, t: any, i: any, s: any, n: any): Promise<any>;
        L(e: any): void;
        forceResolveEntitlement(e: any, t?: any): Promise<{
            entitlement: any;
        } | undefined>;
        signUpFree(e: any): any;
        M(e: any, t: any): Promise<any>;
        N(e: any, t: any): void;
        signIn(e: any): Promise<{
            session: any;
            entitlements: {
                entitlement: any;
            } | undefined;
        }>;
        dispose(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    providerId(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let _: {
    new (e: any, t: any, i: any, s: any, n: any): {
        readonly state: any;
        D: any;
        F: any;
        G: any;
        H: any;
        z: any;
        onDidChange: any;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        I(): Promise<void>;
        update(e: any): Promise<void>;
        J(): Promise<void>;
        L(): void;
        suspend(): void;
        y: any;
        C: Q | undefined;
        resume(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var r: any;
import { $wf as P } from "../../../../base/common/lazy.js";
import { $qf as w } from "../../../../base/common/cancellation.js";
import { $Lh as Q } from "../../../../base/common/async.js";
export { Ee as $3Db, ee as $4Db, U as $5Db, v as $6Db, _ as $7Db, r as ChatEntitlement };
//# sourceMappingURL=chatEntitlementService.d.ts.map