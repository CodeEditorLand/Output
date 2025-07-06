declare const z: any;
declare let P: {
    new (e: any, r: any, t: any): {
        s: any;
        f: () => Promise<boolean>;
        g: Map<any, any>;
        h: T;
        onDidChangeTunnels: any;
        n: number;
        r: Map<any, any>;
        a: any;
        openTunnel(e: any, r: any): Promise<H | undefined>;
        getTunnels(): Promise<any>;
        u(): number;
        registerPortsAttributesProvider(e: any, r: any): {
            "__#4@#t": any;
            dispose(): void;
        };
        $providePortAttributes(e: any, r: any, t: any, n: any, s: any): Promise<{
            autoForwardAction: any;
            port: any;
        }[]>;
        $registerCandidateFinder(e: any): Promise<void>;
        registerTunnelProvider(e: any, r: any): Promise<any>;
        b: any;
        setTunnelFactory(e: any, r: any): Promise<any>;
        w(e: any): void;
        $closeTunnel(e: any, r: any): Promise<void>;
        $onDidTunnelsChange(): Promise<void>;
        $forwardPort(e: any, r: any): Promise<any>;
        $applyCandidateFilter(e: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var f: any;
import { $ef as T } from "../../../base/common/event.js";
declare class H extends F {
}
import { $JB as F } from "../../../platform/tunnel/common/tunnel.js";
export { z as $c3b, P as $d3b, f as TunnelDtoConverter };
//# sourceMappingURL=extHostTunnelService.d.ts.map