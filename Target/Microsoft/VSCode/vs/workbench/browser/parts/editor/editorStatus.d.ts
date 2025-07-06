declare let mt: {
    new (t: any): {
        c: any;
        f(t: any): void;
        q: Et;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let ot: {
    new (t: any, e: any, i: any): {
        c: any;
        f: any;
        enabled: any;
        run(): Promise<void>;
        j: any;
        onDidChange: any;
        z: boolean;
        m: any;
        n: string;
        w: string;
        D: any;
        readonly id: any;
        label: string;
        F(t: any): void;
        tooltip: any;
        G(t: any): void;
        u: any;
        class: string;
        H(t: any): void;
        I(t: any): void;
        checked: any;
        J(t: any): void;
        C: any;
        q: Et;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class st extends lt {
    constructor();
    run(t: any, e: any): Promise<void>;
    c(t: any, e: any, i: any, n: any): void;
}
declare class gi extends lt {
    constructor();
    run(t: any): Promise<void>;
}
declare class fi extends lt {
    constructor();
    run(t: any): Promise<void>;
}
import { $ud as Et } from "../../../../base/common/lifecycle.js";
import { $KI as lt } from "../../../../platform/actions/common/actions.js";
export { mt as $b5b, ot as $c5b, st as $d5b, gi as $e5b, fi as $f5b };
//# sourceMappingURL=editorStatus.d.ts.map