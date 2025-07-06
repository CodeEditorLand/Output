declare function R(s: any): string;
declare function L(s: any, t: any): Promise<any>;
declare let v: {
    new (t: any, e: any, i: any, o: any): {
        u: any;
        w: any;
        y: any;
        c: any;
        onDidRegisterAuthenticationProvider: any;
        f: any;
        onDidUnregisterAuthenticationProvider: any;
        g: any;
        onDidChangeSessions: any;
        h: any;
        onDidChangeDeclaredProviders: any;
        j: Map<any, any>;
        m: any;
        n: Set<any>;
        s: any[];
        t: z;
        z: any[];
        readonly declaredProviders: any[];
        C(): void;
        D(): void;
        registerDeclaredAuthenticationProvider(t: any): void;
        unregisterDeclaredAuthenticationProvider(t: any): void;
        isAuthenticationProviderRegistered(t: any): boolean;
        isDynamicAuthenticationProvider(t: any): boolean;
        registerAuthenticationProvider(t: any, e: any): void;
        unregisterAuthenticationProvider(t: any): void;
        getProviderIds(): any[];
        getProvider(t: any): any;
        getAccounts(t: any): Promise<any[]>;
        getSessions(t: any, e: any, i: any, o?: boolean): Promise<any>;
        createSession(t: any, e: any, i: any): Promise<any>;
        removeSession(t: any, e: any): Promise<any>;
        getOrActivateProviderIdForServer(t: any): Promise<any>;
        createDynamicAuthenticationProvider(t: any, e: any, i: any): Promise<any>;
        registerAuthenticationProviderHostDelegate(t: any): {
            dispose: () => void;
        };
        F(t: any, e: any): Promise<any>;
        q: g;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $qf as z } from "../../../../base/common/cancellation.js";
import { $ud as g } from "../../../../base/common/lifecycle.js";
export { R as $C_, L as $D_, v as $E_ };
//# sourceMappingURL=authenticationService.d.ts.map