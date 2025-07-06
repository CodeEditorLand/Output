export { y as $o3b };
declare let y: {
    new (e: any, r: any, t: any, a: any, i: any, n: any, s: any, o: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        b: boolean;
        c: Map<any, any>;
        t: boolean;
        a: any;
        s(): any;
        $setRemoteTunnelService(e: any): Promise<void>;
        $registerPortsAttributesProvider(e: any, r: any): Promise<void>;
        $unregisterPortsAttributesProvider(e: any): Promise<void>;
        providePortAttributes(e: any, r: any, t: any, a: any): Promise<any>;
        $openTunnel(e: any, r: any): Promise<any>;
        u(e: any, r: any, t: any): Promise<any>;
        $closeTunnel(e: any): Promise<any>;
        $getTunnels(): Promise<any>;
        $onFoundNewCandidates(e: any): Promise<void>;
        $setTunnelProvider(e: any, r: any): Promise<void>;
        $setCandidateFilter(): Promise<void>;
        $setCandidatePortSource(e: any): Promise<void>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=mainThreadTunnelService.d.ts.map