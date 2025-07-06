declare function It(n: any): any;
declare let L: {
    new (t: any, i: any, o: any, s: any, r: any, a: any, e: any, h: any, l: any, c: any, v: any): {
        readonly primaryActions: any[];
        readonly secondaryActions: any[];
        visible: any;
        y: boolean;
        readonly useGlobalToolbar: boolean;
        notebookEditor: any;
        contextKeyService: any;
        notebookOptions: any;
        domNode: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        t: boolean;
        w: any;
        z: any;
        onDidChangeVisibility: any;
        C: any;
        n: any[];
        r: any[];
        N(): void;
        f: HTMLDivElement | undefined;
        c: z | undefined;
        g: HTMLDivElement | undefined;
        O(): void;
        P(): void;
        h: any;
        j: any;
        m: any;
        s: M | null | undefined;
        Q(): void;
        u: Z | q | tt | undefined;
        R(t: any): any;
        S(): void;
        D: any;
        U(): Promise<void>;
        W(t: any): void;
        X(): void;
        layout(t: any): void;
        dispose(): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function O(n: any, t: any, i: any): {
    primaryActions: never[];
    secondaryActions: any;
} | {
    primaryActions: any[];
    secondaryActions: any[];
};
declare function et(n: any, t: any, i: any): {
    primaryActions: any;
    secondaryActions: any;
};
declare var d: any;
import { $37 as z } from "../../../../../base/browser/ui/scrollbar/scrollableElement.js";
import { $M0 as M } from "../../../../../base/browser/ui/toolbar/toolbar.js";
declare class Z {
    constructor(t: any, i: any, o: any, s: any);
    notebookEditor: any;
    editorToolbar: any;
    goToMenu: any;
    instantiationService: any;
    actionProvider(t: any, i: any): any;
    calculateActions(t: any): {
        primaryActions: any[];
        secondaryActions: any;
    };
}
declare class q {
    constructor(t: any, i: any, o: any, s: any);
    notebookEditor: any;
    editorToolbar: any;
    goToMenu: any;
    instantiationService: any;
    actionProvider(t: any, i: any): any;
    calculateActions(t: any): {
        primaryActions: any[];
        secondaryActions: any;
    };
}
declare class tt {
    constructor(t: any, i: any, o: any, s: any);
    notebookEditor: any;
    editorToolbar: any;
    goToMenu: any;
    instantiationService: any;
    actionProvider(t: any, i: any): any;
    calculateActions(t: any): {
        primaryActions: any;
        secondaryActions: any;
    };
}
export { It as $sVb, L as $tVb, O as $uVb, et as $vVb, d as RenderLabel };
//# sourceMappingURL=notebookEditorToolbar.d.ts.map