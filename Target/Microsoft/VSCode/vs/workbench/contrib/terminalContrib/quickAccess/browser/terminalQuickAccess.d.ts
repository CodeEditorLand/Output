export { C as $Stc };
declare let C: {
    new (t: any, i: any, n: any, s: any, o: any, e: any, r: any): {
        a: any;
        b: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        g(t: any): ({
            label: string;
            description: any;
            highlights: {
                label: any;
            };
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            iconClasses: any[];
            trigger: (d: any) => any;
            accept: (d: any, _: any) => void;
        } | {
            type: string;
            label: string;
            ariaLabel?: never;
            accept?: never;
        } | {
            type: string;
            label?: never;
            ariaLabel?: never;
            accept?: never;
        } | {
            label: string;
            ariaLabel: any;
            accept: () => any;
            type?: never;
        })[];
        t(t: any, i: any, n: any, s: any): {
            label: string;
            description: any;
            highlights: {
                label: any;
            };
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            iconClasses: any[];
            trigger: (d: any) => any;
            accept: (d: any, _: any) => void;
        } | undefined;
        c: any;
        f: any;
        provide(e: any, P: any, I: any): import("../../../../../base/common/lifecycle.js").$ud;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    PREFIX: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=terminalQuickAccess.d.ts.map