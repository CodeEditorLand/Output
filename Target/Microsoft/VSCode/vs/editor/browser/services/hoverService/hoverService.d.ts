export { I as $6pb };
declare let I: {
    new (e: any, t: any, r: any, n: any, i: any, s: any): {
        s: any;
        t: any;
        u: any;
        w: any;
        z: any;
        g: boolean;
        n: Map<any, any>;
        r: Map<any, any>;
        a: any;
        showInstantHover(e: any, t: any, r: any, n: any): any;
        showDelayedHover(e: any, t: any): any;
        f: any;
        h: any;
        setupDelayedHover(e: any, t: any, r: any): p;
        setupDelayedHoverAtMouse(e: any, t: any, r: any): p;
        C(e: any, t: any, r: any): p;
        D(e: any, t: any): any;
        b: any;
        j: any;
        m: any;
        c: any;
        F(e: any, t: any, r: any): void;
        hideHover(e: any): void;
        G(): void;
        H(e: any, t: any): void;
        showAndFocusLastHover(): void;
        I(): void;
        J(e: any, t: any, r: any): void;
        L(e: any, t: any): void;
        setupManagedHover(e: any, t: any, r: any, n: any): {
            show: (u: any) => void;
            hide: () => void;
            update: (u: any, c: any) => Promise<void>;
            dispose: () => void;
        };
        showManagedHover(e: any): void;
        dispose(): void;
        q: p;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as p } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=hoverService.d.ts.map