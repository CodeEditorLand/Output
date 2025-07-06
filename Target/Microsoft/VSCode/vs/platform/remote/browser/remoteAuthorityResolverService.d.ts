export { p as $vAc };
declare let p: {
    new (t: any, e: any, n: any, i: any, o: any, s: any): {
        j: any;
        a: any;
        onDidChangeConnectionData: any;
        b: Map<any, any>;
        c: Map<any, any>;
        f: any;
        g: Map<any, any>;
        h: any;
        resolveAuthority(t: any): Promise<any>;
        getCanonicalURI(t: any): Promise<any>;
        getConnectionData(t: any): {
            connectTo: any;
            connectionToken: any;
        } | null;
        m(t: any): Promise<{
            authority: {
                authority: any;
                connectTo: w;
                connectionToken: any;
            };
        }>;
        _clearResolvedAuthority(t: any): void;
        _setResolvedAuthority(t: any, e: any): void;
        _setResolvedAuthorityError(t: any, e: any): void;
        _setAuthorityConnectionToken(t: any, e: any): void;
        _setCanonicalURIProvider(t: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $jB as w } from "../common/remoteAuthorityResolver.js";
//# sourceMappingURL=remoteAuthorityResolverService.d.ts.map