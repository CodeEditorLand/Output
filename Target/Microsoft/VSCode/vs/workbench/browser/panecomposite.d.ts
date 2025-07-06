declare namespace h {
    let Viewlets: string;
    let Panels: string;
    let Auxiliary: string;
}
declare class p extends A {
    static create(t: any, e: any, i: any, n: any, s: any, o: any, r: any): p;
    constructor(t: any, e: any, i: any, n: any, s: any, o: any, r: any);
    iconUrl: any;
}
declare let l: {
    new (t: any, e: any, i: any, n: any, s: any, o: any, r: any, f: any): {
        b: any;
        c: any;
        f: any;
        g: any;
        j: any;
        create(t: any): void;
        a: any;
        setVisible(t: any): void;
        layout(t: any): void;
        setBoundarySashes(t: any): void;
        getOptimalWidth(): any;
        openView(t: any, e: any): any;
        getViewPaneContainer(): any;
        getActionsContext(): any;
        getContextMenuActions(): any;
        getMenuIds(): any[];
        getActions(): any[];
        getSecondaryActions(): any;
        getActionViewItem(t: any, e: any): any;
        getTitle(): any;
        focus(): void;
        readonly onDidFocus: any;
        y: any;
        readonly onDidBlur: any;
        J: any;
        hasFocus(): boolean;
        M(): any;
        L: boolean;
        Q: any;
        t: any;
        onTitleAreaUpdate: any;
        O: boolean;
        P: any;
        getContainer(): any;
        getActionRunner(): any;
        N: any;
        R(): void;
        isVisible(): boolean;
        getControl(): void;
        D: any;
        C: import("../common/memento.js").$Dub;
        getId(): any;
        F(t: any, e: any): any;
        G(t: any): void;
        H(t: any, e: any): any;
        I(): void;
        n: any;
        h: any;
        w(t: any): void;
        updateStyles(): void;
        z(t: any, r: any): any;
        q: import("../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class m extends w {
    registerPaneComposite(t: any): void;
    deregisterPaneComposite(t: any): void;
    getPaneComposite(t: any): any;
    getPaneComposites(): any[];
}
import { $jxb as A } from "./composite.js";
import { $kxb as w } from "./composite.js";
export { h as $$xb, p as $0xb, l as $9xb, m as $_xb };
//# sourceMappingURL=panecomposite.d.ts.map