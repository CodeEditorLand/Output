declare let g: {
    new (e: any, n: any, o: any, r: any, t: any, i: any, a: any, m: any, c: any, u: any, d: any, h: any, v: any, x: any): {
        readonly I: any;
        readonly defaultFilterValue: any;
        Q: any;
        R: any;
        S: any;
        U: any;
        W: any;
        X: any;
        Y: any;
        Z: any;
        O: boolean;
        N: Promise<any>;
        readonly $: {
            preserveInput: any;
            experimental: any;
        };
        ab(e: any): void;
        F(e: any): Promise<{
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            trigger: () => any;
            commandId: any;
            commandAlias: any;
            commandDescription: any;
            label: any;
        }[]>;
        G(e: any, n: any): boolean;
        H(e: any, n: any, o: any, r: any): Promise<any[]>;
        eb(e: any, n: any, o: any, r: any): Promise<any[]>;
        fb(): {
            commandId: any;
            commandWhen: any;
            commandAlias: any;
            label: any;
            commandDescription: any;
        }[];
        J(): {
            commandId: any;
            commandAlias: any;
            commandDescription: any;
            label: any;
        }[];
        t: any;
        u: any;
        w: any;
        y: any;
        n: any;
        f: any;
        g(t: any, n: any, e: any, a: any): Promise<any[] | {
            picks: any[];
            additionalPicks: Promise<any>;
        }>;
        C(t: any, n: any): any;
        D({ label: t, commandAlias: n, commandDescription: e }: {
            label: any;
            commandAlias: any;
            commandDescription: any;
        }): any;
        c: any;
        provide(e: any, P: any, I: any): import("../../../../base/common/lifecycle.js").$ud;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    L: number | undefined;
    M: number | undefined;
    PREFIX: string | undefined;
    h: number | undefined;
    j: number | undefined;
    m: ((n: any, t: any) => any) | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class w extends C {
    constructor();
    run(e: any): Promise<void>;
}
declare class Nt extends C {
    constructor();
    run(e: any): Promise<void>;
}
import { $KI as C } from "../../../../platform/actions/common/actions.js";
export { g as $3nc, w as $4nc, Nt as $5nc };
//# sourceMappingURL=commandsQuickAccess.d.ts.map