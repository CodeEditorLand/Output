declare class P {
    constructor(t: any, e?: number, s?: number, i?: number);
    c: any;
    d: number;
    f: number;
    g: number;
    a: any[];
    b: number;
    dispose(): void;
    remove(t: any): void;
    add(t: any, e: any, s?: number): void;
    h(): void;
}
declare let C: {
    new (t: any, e: any, s: any, i: any, n: any, o: any, a: any, v: any, y: any): {
        g: any;
        h: any;
        j: any;
        n: any;
        s: any;
        t: any;
        u: any;
        a: any;
        onIsCaughtUpWithContentChanges: any;
        c: O;
        f: any;
        b: any;
        dispose(): void;
        isCaughtUpWithContentChanges(t: any): any;
        w(t: any): boolean;
        handleModelAdded(t: any): void;
        y(t: any): void;
        handleModelRemoved(t: any): void;
        $trySaveDocument(t: any): Promise<boolean>;
        $tryOpenDocument(t: any, e: any): Promise<any>;
        $tryCreateDocument(t: any): Promise<any>;
        z(t: any, e: any): Promise<any>;
        C(t: any, e: any): Promise<any>;
        D(t: any, e: any): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Ic as O } from "../../../base/common/map.js";
export { P as $AXb, C as $BXb };
//# sourceMappingURL=mainThreadDocuments.d.ts.map