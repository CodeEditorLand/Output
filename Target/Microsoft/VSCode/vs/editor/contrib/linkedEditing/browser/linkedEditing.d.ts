declare const x: X;
declare let c: {
    new (s: any, t: any, i: any, r: any, n: any): {
        G: any;
        y: number;
        F: any;
        f: any;
        g: any;
        h: boolean;
        j: any;
        m: any;
        w: any;
        z: any;
        C: any;
        D: boolean;
        n: any;
        r: any;
        s: M | null;
        t: any;
        u: any;
        H(s: any): void;
        I(s: any): void;
        dispose(): void;
        clearRanges(): void;
        readonly currentUpdateTriggerPromise: any;
        readonly currentSyncTriggerPromise: any;
        updateRanges(s?: boolean): Promise<void>;
        setDebounceDuration(s: any): void;
        b: any;
        q: w;
        B(t: any): any;
    };
    ID: string | undefined;
    a: G | undefined;
    get(s: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class it extends F {
    constructor();
    run(s: any, t: any): Promise<any>;
}
declare const yt: any;
import { $Wn as X } from "../../../../platform/contextkey/common/contextkey.js";
import { $qf as M } from "../../../../base/common/cancellation.js";
import { $ud as w } from "../../../../base/common/lifecycle.js";
import { $oI as G } from "../../../common/model/textModel.js";
import { $Eab as F } from "../../../browser/editorExtensions.js";
export { x as $usb, c as $vsb, it as $wsb, yt as $xsb };
//# sourceMappingURL=linkedEditing.d.ts.map