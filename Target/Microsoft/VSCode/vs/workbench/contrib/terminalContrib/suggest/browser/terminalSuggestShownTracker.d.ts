declare const f: "terminal.suggest.increasedDiscoverability";
declare const a: "terminal.suggest.increasedDiscoverabilityCount";
declare let u: {
    new (t: any, i: any, s: any): {
        h: any;
        j: any;
        m: any;
        a: any;
        b: any;
        readonly done: any;
        resetState(): void;
        resetTimer(): void;
        update(t: any): void;
        f: number | undefined;
        c: any;
        n(t: any): void;
        getFirstShown(t: any): {
            window: boolean;
            shell: boolean;
        };
        g: {
            window: boolean;
            shell: Set<any>;
        } | undefined;
        updateShown(): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { f as $Puc, a as $Quc, u as $Ruc };
//# sourceMappingURL=terminalSuggestShownTracker.d.ts.map