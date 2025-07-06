declare let p: {
    new (t: any, e: any, r: any, i: any, s: any): {
        a: any;
        b: any;
        h: any;
        j: any;
        m: any;
        g(t: any, e: any, r: any): Promise<any[]> | {
            label: any;
            accept: () => any;
        }[] | {
            label: any;
        }[];
        r(t: any, e: any, r: any): Promise<any[]>;
        s(t: any, e: any): Promise<void>;
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
declare let m: {
    new (t: any): {
        a: any;
        g(): {
            label: any;
            accept: () => any;
        }[];
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
export { p as $$ic, m as $_ic };
//# sourceMappingURL=extensionsQuickAccess.d.ts.map