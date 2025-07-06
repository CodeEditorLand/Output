export { c as $XBc };
declare let c: {
    new (t: any, i: any, e: any, s: any): {
        readonly pid: any;
        readonly kind: any;
        readonly startup: any;
        readonly friendyName: string;
        h: any;
        j: any;
        m: any;
        a: any;
        onDidChangeResponsiveState: any;
        b: any;
        onDidExit: any;
        c: u;
        f: any;
        g: y | null;
        n(t: any): any;
        r(t: any): Promise<any>;
        ready(): Promise<void>;
        disconnect(): Promise<void>;
        representsRunningLocation(t: any): any;
        deltaExtensions(t: any): Promise<any>;
        containsExtension(t: any): any;
        activate(t: any, i: any): Promise<any>;
        activateByEvent(t: any, i: any): Promise<any>;
        activationEventIsDone(t: any): any;
        getInspectPort(t: any): Promise<any>;
        resolveAuthority(t: any, i: any): Promise<any>;
        getCanonicalURI(t: any, i: any): Promise<any>;
        start(t: any, i: any, e: any): Promise<any>;
        extensionTestsExecute(): Promise<any>;
        setRemoteEnvironment(t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Lh as u } from "../../../../base/common/async.js";
import { $9O as y } from "./extensions.js";
//# sourceMappingURL=lazyCreateExtensionHostManager.d.ts.map