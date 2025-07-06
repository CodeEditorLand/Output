export { E as $Ndc };
declare let E: {
    new (e: any, t: any, r: any, o: any, i: any): {
        readonly defaultFilterValue: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        h: any;
        readonly t: {
            openEditorPinned: boolean;
            openSideBySideDirection: any;
        };
        g(e: any, t: any, r: any): Promise<any>;
        getSymbolPicks(e: any, t: any, r: any): Promise<any>;
        w(e: any, t: any, r: any): Promise<{
            symbol: any;
            resource: any;
            score: any;
            iconClass: any;
            label: any;
            ariaLabel: any;
            highlights: {
                label: any;
                description: any;
            } | undefined;
            description: any;
            strikethrough: boolean;
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            trigger: {};
            accept: {};
        }[]>;
        y(e: any, t: any, r: any, o: any): Promise<void>;
        z(e: any, t: any): any;
        c: any;
        f: any;
        provide(e: any, P: any, I: any): import("../../../../base/common/lifecycle.js").$ud;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    PREFIX: string | undefined;
    a: number | undefined;
    b: Set<number> | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=symbolsQuickAccess.d.ts.map