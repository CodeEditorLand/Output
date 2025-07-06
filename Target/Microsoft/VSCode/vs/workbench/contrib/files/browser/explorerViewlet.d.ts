declare let R: {
    new (e: any, o: any): {
        a: any;
        b(): void;
        c(): {
            id: string | undefined;
            name: {
                value: any;
                original: any;
            } | undefined;
            ctorDescriptor: b;
            containerIcon: any;
            order: number;
            canToggleVisibility: boolean;
            canMoveView: boolean;
            collapsed: boolean;
            hideByDefault: boolean;
            focusCommand: {
                id: string;
                keybindings: {
                    primary: number;
                };
            };
        };
        f(): {
            id: string | undefined;
            name: {
                value: any;
                original: any;
            } | undefined;
            containerIcon: any;
            ctorDescriptor: b;
            order: number;
            canToggleVisibility: boolean;
            focusCommand: {
                id: string;
            };
        };
        g(): {
            id: string;
            name: {
                value: any;
                original: any;
            };
            containerIcon: any;
            ctorDescriptor: b;
            order: number;
            canMoveView: boolean;
            canToggleVisibility: boolean;
            focusCommand: {
                id: string;
            };
        };
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let I: {
    new (e: any, o: any, r: any, n: any, t: any, c: any, l: any, w: any, u: any, A: any, M: any, P: any): {
        c: any;
        create(e: any): void;
        ob(e: any, o: any): any;
        getExplorerView(): any;
        getOpenEditorsView(): any;
        setVisible(e: any): void;
        focus(): void;
        readonly onDidSashChange: any;
        readonly panes: any[];
        readonly views: any[];
        readonly length: number;
        readonly menuActions: any;
        ab: any;
        bb: any;
        cb: any;
        db: any;
        eb: any;
        fb: any;
        gb: any;
        hb: any;
        ib: any;
        jb: any;
        kb: any;
        j: any[];
        s: boolean;
        u: boolean;
        J: boolean;
        Q: any;
        onTitleAreaUpdate: any;
        R: any;
        onDidChangeVisibility: any;
        S: any;
        onDidAddViews: any;
        U: any;
        onDidRemoveViews: any;
        W: any;
        onDidChangeViewVisibility: any;
        X: any;
        onDidFocusView: any;
        Y: any;
        onDidBlurView: any;
        viewContainer: any;
        O: string;
        N: any;
        P: any;
        m: any;
        Z: any;
        getTitle(): any;
        lb(e: any): void;
        getActionsContext(): any;
        getActionViewItem(e: any, t: any): any;
        readonly mb: 0 | 1;
        layout(e: any): void;
        L: any;
        setBoundarySashes(e: any): void;
        M: any;
        getOptimalWidth(): number;
        addPanes(e: any): void;
        isVisible(): boolean;
        nb(): void;
        getView(e: any): any;
        pb(): void;
        qb(): void;
        rb(): Map<any, any>;
        I(): void;
        tb(e: any, t: any): void;
        openView(e: any, t: any): any;
        ub(e: any): any[];
        vb(e: any): void;
        toggleViewVisibility(e: any): void;
        wb(e: any, t: any, i: any, s?: number): void;
        f: any;
        removePanes(e: any): void;
        xb(e: any): void;
        movePane(e: any, t: any): void;
        resizePane(e: any, t: any): void;
        getPaneSize(e: any): any;
        yb(): void;
        g: any;
        isViewMergedWithContainer(): any;
        zb(): void;
        Ab(e: any): void;
        dispose(): void;
        D: any;
        C: import("../../../common/memento").$Dub;
        getId(): any;
        F(t: any, e: any): any;
        G(t: any): void;
        H(t: any, e: any): any;
        n: any;
        h: any;
        w(t: any): void;
        updateStyles(): void;
        z(t: any, r: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const V: any;
import { $lj as b } from "../../../../platform/instantiation/common/descriptors.js";
export { R as $4Lb, I as $5Lb, V as $6Lb };
//# sourceMappingURL=explorerViewlet.d.ts.map