declare let d: {
    new (t: any, i: any, n: any, a: any, o: any, e: any, s: any, r: any): {
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        t: any;
        u: any;
        w: any;
        g(t: any): ({
            label: any;
            containerLabel: any;
            accept: () => any;
        } | {
            type: string;
            label: any;
        })[];
        z(): {
            label: any;
            containerLabel: any;
            accept: () => any;
        }[];
        C(t: any): boolean;
        c: any;
        f: any;
        provide(e: any, P: any, I: any): import("../../../../base/common/lifecycle.js").$ud;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    PREFIX: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class x extends $ {
    constructor();
    run(t: any): Promise<void>;
}
declare class m extends $ {
    constructor();
    run(t: any): Promise<void>;
}
import { $KI as $ } from "../../../../platform/actions/common/actions.js";
export { d as $Wnc, x as $Xnc, m as $Ync };
//# sourceMappingURL=viewQuickAccess.d.ts.map