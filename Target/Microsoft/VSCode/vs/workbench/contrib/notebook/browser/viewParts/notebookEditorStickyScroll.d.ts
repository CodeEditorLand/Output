declare class k extends L {
    static getParentCount(t: any): number;
    constructor(t: any, e: any, i: any, s: any, n: any);
    element: any;
    foldingIcon: any;
    header: any;
    entry: any;
    notebookEditor: any;
    a(t: any): void;
    b(): void;
}
declare let c: {
    new (t: any, e: any, i: any, s: any, n: any, l: any): {
        getDomNode(): any;
        getCurrentStickyHeight(): number;
        h(t: any): void;
        b: Map<any, any>;
        j(t: any, e: any): boolean;
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        a: H;
        c: any;
        onDidChangeNotebookStickyScroll: any;
        g: any;
        w(t: any): void;
        y(t: any): void;
        z(): Promise<void>;
        f: any;
        C(t: any): void;
        D(t: any): void;
        F(): void;
        G(t: any, e: any): void;
        H(): void;
        dispose(): void;
        q: H;
        B(t: any): any;
    };
    getVisibleOutlineEntry(t: any, e: any): any;
    computeStickyHeight(t: any): number;
    checkCollapsedStickyLines(t: any, e: any, i: any): Map<any, any>;
    createStickyElement(t: any, e: any): k;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function g(r: any, t: any, e: any, i: any): Map<any, any>;
import { $vd as L } from "../../../../../base/common/lifecycle.js";
import { $ud as H } from "../../../../../base/common/lifecycle.js";
export { k as $6Vb, c as $7Vb, g as $8Vb };
//# sourceMappingURL=notebookEditorStickyScroll.d.ts.map