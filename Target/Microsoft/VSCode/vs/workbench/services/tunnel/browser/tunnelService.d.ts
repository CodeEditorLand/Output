export { p as $FCc };
declare let p: {
    new (r: any, t: any, e: any): {
        H: any;
        isPortPrivileged(r: any): boolean;
        F(r: any, t: any, e: any, f: any, n: any, o: any, c: any, s: any): any;
        canTunnel(r: any): boolean;
        r: any;
        s: any;
        a: import("../../../workbench.web.main.internal.js").Emitter;
        onTunnelOpened: any;
        b: import("../../../workbench.web.main.internal.js").Emitter;
        onTunnelClosed: any;
        c: import("../../../workbench.web.main.internal.js").Emitter;
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
        G(e: any, n: any, t: any, r: any, i: any, o: any, c: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=tunnelService.d.ts.map