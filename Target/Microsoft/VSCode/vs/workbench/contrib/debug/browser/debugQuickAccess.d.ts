export { d as $Jpc };
declare let d: {
    new (i: any, e: any, n: any, o: any): {
        a: any;
        b: any;
        h: any;
        j: any;
        g(i: any): Promise<({
            type: string;
            label: any;
        } | {
            label: any;
            description: any;
            highlights: {
                label: any;
            };
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            trigger: () => any;
            accept: () => Promise<void>;
        } | {
            type: string;
            label?: never;
            description?: never;
            highlights?: never;
            accept?: never;
        } | {
            label: any;
            description: any;
            highlights: {
                label: any;
            };
            accept: () => any;
            type?: never;
        })[]>;
        c: any;
        f: any;
        provide(e: any, P: any, I: any): import("../../../../base/common/lifecycle.js").$ud;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=debugQuickAccess.d.ts.map