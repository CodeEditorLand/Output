declare const I: any;
declare function E(s: any): boolean;
declare function P(s: any): {
    address: string | undefined;
    port: number;
} | undefined;
declare function N(s: any): {
    address: string | undefined;
    port: number;
} | undefined;
declare const v: string[];
declare function m(s: any): boolean;
declare const g: string[];
declare function w(s: any): boolean;
declare function V(s: any, e: any, n: any, t: any): boolean;
declare class A {
    constructor(e: any, n: any, t: any);
    remoteAddress: any;
    localAddress: any;
    b: any;
    a: p;
    onDidDispose: any;
    dispose(): any;
}
declare let x: {
    new (e: any, n: any): {
        r: any;
        s: any;
        a: p;
        onTunnelOpened: any;
        b: p;
        onTunnelClosed: any;
        c: p;
        onAddedTunnelProvider: any;
        f: Map<any, any>;
        h: boolean;
        j: boolean;
        m: any[];
        n: Set<any>;
        readonly hasTunnelProvider: boolean;
        readonly t: "127.0.0.1" | "0.0.0.0";
        setTunnelProvider(e: any): {
            dispose: () => void;
        };
        g: any;
        setTunnelFeatures(e: any): void;
        readonly canChangeProtocol: boolean;
        readonly canElevate: boolean;
        readonly canChangePrivacy: boolean;
        readonly privacyOptions: any[];
        readonly tunnels: Promise<any[]>;
        u(): Promise<any[]>;
        dispose(): Promise<void>;
        setEnvironmentTunnel(e: any, n: any, t: any, r: any, i: any): void;
        getExistingTunnel(e: any, n: any): Promise<any>;
        openTunnel(e: any, n: any, t: any, r: any, i: any, o: boolean | undefined, c: any, u: any): any;
        w(e: any): {
            tunnelRemotePort: any;
            tunnelRemoteHost: any;
            tunnelLocalPort: any;
            localAddress: any;
            privacy: any;
            protocol: any;
            dispose: () => Promise<void>;
        };
        y(e: any, n: any, t: any): Promise<any>;
        closeTunnel(e: any, n: any): Promise<void>;
        z(e: any, n: any, t: any): void;
        C(e: any, n: any): Promise<void>;
        D(e: any, n: any): any;
        canTunnel(e: any): boolean;
        G(e: any, n: any, t: any, r: any, i: any, o: any, c: any): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const z: any;
declare var $: any;
declare var d: any;
declare var y: any;
import { $ef as p } from "../../../base/common/event.js";
export { I as $AB, E as $BB, P as $CB, N as $DB, v as $EB, m as $FB, g as $GB, w as $HB, V as $IB, A as $JB, x as $KB, z as $zB, $ as ProvidedOnAutoForward, d as TunnelPrivacyId, y as TunnelProtocol };
//# sourceMappingURL=tunnel.d.ts.map