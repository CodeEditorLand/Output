declare class Q extends N {
    constructor(t: any, e: any, i: any, n: any, s: any, o: any);
    a: any;
    id: any;
    label: any;
    supportsMultipleAccounts: any;
    authorizationServers: any;
    onDidChangeSessions: any;
    getSessions(t: any, e: any): Promise<any>;
    createSession(t: any, e: any): any;
    removeSession(t: any): Promise<void>;
}
declare let C: {
    new (t: any, e: any, i: any, n: any, s: any, o: any, r: any, a: any, u: any, m: any, $: any, v: any, f: any, w: any): {
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
        y: any;
        z: any;
        C: any;
        b: any;
        c: Set<any>;
        f: boolean;
        H: Set<any>;
        a: any;
        $registerAuthenticationProvider(t: any, e: any, i: any, n?: any[]): Promise<void>;
        $unregisterAuthenticationProvider(t: any): Promise<void>;
        $ensureProvider(t: any): Promise<any>;
        $sendDidChangeSessions(t: any, e: any): Promise<void>;
        $removeSession(t: any, e: any): any;
        $waitForUriHandler(t: any): Promise<any>;
        $showContinueNotification(t: any): Promise<any>;
        $registerDynamicAuthenticationProvider(t: any, e: any, i: any, n: any): Promise<void>;
        $setSessionsForDynamicAuthProvider(t: any, e: any, i: any): Promise<void>;
        $sendDidChangeDynamicProviderInfo({ providerId: t, clientId: e, authorizationServer: i, label: n }: {
            providerId: any;
            clientId: any;
            authorizationServer: any;
            label: any;
        }): Promise<void>;
        D(t: any, e: any, i: any, n: any): Promise<any>;
        F(t: any, e: any): Promise<boolean>;
        G(t: any, e: any, i: any, n: any, s: any): Promise<any>;
        $getSession(t: any, e: any, i: any, n: any, s: any): Promise<any>;
        $getAccounts(t: any): Promise<any>;
        I(t: any, e: any, i: any): void;
        J(t: any, e: any): void;
        L(t: any, e: any, i: any, n: any): any;
        M(t: any, e: any, i: any): void;
        N(t: any, e: any, i: any): void;
        $showDeviceCodeModal(t: any, e: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as N } from "../../../base/common/lifecycle.js";
export { Q as $q3b, C as $r3b };
//# sourceMappingURL=mainThreadAuthentication.d.ts.map