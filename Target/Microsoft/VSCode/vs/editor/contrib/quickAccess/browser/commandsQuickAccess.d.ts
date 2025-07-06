export { f as $2nc };
declare const f_base: {
    new (t: any, n: any, e: any, a: any, o: any, h: any): {
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
    PREFIX: string | undefined;
    h: number | undefined;
    j: number | undefined;
    m: ((n: any, t: any) => any) | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class f extends f_base {
    J(): {
        commandId: any;
        commandAlias: any;
        commandDescription: any;
        label: any;
    }[];
}
//# sourceMappingURL=commandsQuickAccess.d.ts.map