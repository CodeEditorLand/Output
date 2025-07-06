declare let S: {
    new (t: any, n: any, e: any): {
        n: any;
        r: any;
        s: any;
        m: number;
        t(): void;
        u(t: any): void;
        w(): void;
        push(t: any): void;
        peek(t: any): any;
        y(): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    DEFAULT_COMMANDS_HISTORY_LENGTH: number | undefined;
    c: string | undefined;
    f: string | undefined;
    h: number | undefined;
    j: boolean | undefined;
    getConfiguredCommandHistoryLength(t: any): any;
    clearHistory(t: any, n: any): void;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let L: {
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
        provide(e: any, P: any, I: any): import("../../../base/common/lifecycle.js").$ud;
        q: import("../../../base/common/lifecycle.js").$ud;
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
export { S as $1nc, L as $Znc };
//# sourceMappingURL=commandsQuickAccess.d.ts.map