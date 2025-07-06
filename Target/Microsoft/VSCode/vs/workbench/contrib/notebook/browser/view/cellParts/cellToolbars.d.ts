declare let d: {
    new (t: any, e: any, o: any, i: any, s: any, n: any, r: any): {
        f: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s(): any;
        c: any;
        didRenderCell(t: any): void;
        updateInternalLayoutNow(t: any): void;
        b: any;
        prepareRenderCell(e: any): void;
        renderCell(e: any): void;
        a: any;
        unrenderCell(e: any): void;
        updateState(e: any, t: any): void;
        updateForExecutionState(e: any, t: any): void;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let u: {
    new (t: any, e: any, o: any, i: any, s: any, n: any, r: any, l: any): {
        readonly hasActions: boolean;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        h: any;
        onDidUpdateActions: any;
        y(): {
            titleMenu: any;
            actions: {
                primary: never[];
                secondary: never[];
            };
            deleteMenu: any;
            deleteActions: {
                primary: never[];
                secondary: never[];
            };
        };
        c: {
            titleMenu: any;
            actions: {
                primary: never[];
                secondary: never[];
            };
            deleteMenu: any;
            deleteActions: {
                primary: never[];
                secondary: never[];
            };
        } | undefined;
        z(t: any, e: any): {
            toolbar: any;
            deleteToolbar: any;
        };
        f: {
            toolbar: any;
            deleteToolbar: any;
        } | undefined;
        prepareRenderCell(t: any): void;
        didRenderCell(t: any): void;
        C(t: any, e: any): void;
        D(t: any, e: any, o: any): void;
        F(t: any, e: any): void;
        b: any;
        renderCell(e: any): void;
        a: any;
        unrenderCell(e: any): void;
        updateInternalLayoutNow(e: any): void;
        updateState(e: any, t: any): void;
        updateForExecutionState(e: any, t: any): void;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { d as $7Ub, u as $8Ub };
//# sourceMappingURL=cellToolbars.d.ts.map