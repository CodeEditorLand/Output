declare let v: {
    new (t: any, e: any, s: any, r: any, i: any, c: any, h: any): {
        readonly pid: any;
        readonly kind: any;
        readonly startup: any;
        readonly friendyName: string;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        a: any;
        onDidChangeResponsiveState: any;
        r: boolean;
        b: Map<any, any>;
        c: Set<any>;
        f: F | null;
        g: any[];
        h: any;
        onDidExit: any;
        j: any;
        disconnect(): Promise<void>;
        dispose(): void;
        z(): Promise<{
            remoteAuthority: any;
            latency: number;
            down: any;
            up: any;
        } | null>;
        ready(): Promise<void>;
        C(t: any): Promise<number>;
        F(t: any): Promise<any>;
        G(t: any): Promise<any>;
        H(t: any, e: any): never;
        activate(t: any, e: any): Promise<any>;
        activateByEvent(t: any, e: any): any;
        activationEventIsDone(t: any): boolean;
        I(t: any, e: any): Promise<void>;
        getInspectPort(t: any): Promise<any>;
        resolveAuthority(t: any, e: any): Promise<any>;
        getCanonicalURI(t: any, e: any): Promise<any>;
        start(t: any, e: any, s: any): Promise<any>;
        extensionTestsExecute(): Promise<any>;
        representsRunningLocation(t: any): any;
        deltaExtensions(t: any): Promise<any>;
        containsExtension(t: any): any;
        setRemoteEnvironment(t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    D(t: any, e: any): number;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function G(o: any, t: any): string;
import { $QBc as F } from "./rpcProtocol.js";
export { v as $RBc, G as $SBc };
//# sourceMappingURL=extensionHostManager.d.ts.map