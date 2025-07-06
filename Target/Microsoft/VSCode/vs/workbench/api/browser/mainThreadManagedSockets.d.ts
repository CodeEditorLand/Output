declare let u: {
    new (t: any, e: any): {
        f: any;
        b: Map<any, any>;
        c: Map<any, any>;
        a: any;
        $registerSocketFactory(t: any): Promise<void>;
        $unregisterSocketFactory(t: any): Promise<void>;
        $onDidManagedSocketHaveData(t: any, e: any): void;
        $onDidManagedSocketClose(t: any, e: any): void;
        $onDidManagedSocketEnd(t: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class d extends D {
    static connect(t: any, e: any, r: any, n: any, o: any, i: any): Promise<any>;
    constructor(t: any, e: any, r: any, n: any);
    c: any;
    j: any;
    write(t: any): void;
    h(): void;
    drain(): any;
}
import { $VZb as D } from "../../../platform/remote/common/managedSocket.js";
export { u as $WZb, d as $XZb };
//# sourceMappingURL=mainThreadManagedSockets.d.ts.map