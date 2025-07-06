declare let it: {
    new (t: any, e: any, n: any, s: any, l: any, r: any): {
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        g: number;
        j: It;
        n: xt;
        s: WeakSet<WeakKey>;
        onDidChange: any;
        invalidateResultMessage(t: any): void;
        syncDecorations(t: any): any;
        getDecoratedTestPosition(t: any, e: any): any;
        D(): void;
        updateDecorationsAlternateAction(t: any, e: any): void;
        F(t: any): any;
        q: Z;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let A: {
    new (t: any, e: any, n: any, s: any, l: any, r: any, h: any, a: any): {
        readonly currentUri: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        j: any;
        n: any;
        s: any;
        u: Map<any, any>;
        I(t: any): void;
        g: any;
        J(): void;
        L(): void;
        M(t: any): any;
        N(t: any, e: any): void;
        O(t: any, e: any, n: any, s: any): void;
        P(t: any, e: any): void;
        Q(t: any, e: any, n: any, s: any, l: any): void;
        q: Z;
        dispose(): void;
        B(t: any): any;
    };
    invalidatedTests: WeakSet<WeakKey> | undefined;
    get(t: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as It } from "../../../../base/common/event.js";
import { $Ic as xt } from "../../../../base/common/map.js";
import { $ud as Z } from "../../../../base/common/lifecycle.js";
export { it as $Jmc, A as $Kmc };
//# sourceMappingURL=testingDecorations.d.ts.map