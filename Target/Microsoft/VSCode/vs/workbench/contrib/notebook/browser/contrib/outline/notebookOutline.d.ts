declare let T: {
    new (e: any, t: any, o: any): {
        h: any;
        j: any;
        k: any;
        d: C;
        f: any;
        getQuickPickElements(): {
            element: any;
            label: any;
            ariaLabel: any;
            iconClasses: string[] | undefined;
        }[];
        dispose(): void;
    };
};
declare let N: {
    new (e: any, t: any): {
        k: any;
        l: any;
        d: C;
        f: any;
        h: any;
        j: any;
        getActiveEntry(): any;
        getChildren(e: any): Generator<any, void, unknown>;
        dispose(): void;
    };
};
declare let A: {
    new (e: any, t: any): {
        h: any;
        j: any;
        d: C;
        f: any;
        getBreadcrumbElements(): any[];
        dispose(): void;
    };
};
declare let D: {
    new (e: any, t: any, o: any, i: any, l: any, n: any, r: any, d: any): {
        readonly activeElement: any;
        readonly entries: any;
        readonly uri: any;
        readonly isEmpty: boolean;
        u(): void;
        v: any;
        w: any;
        x: any;
        y: any;
        z: any;
        A: any;
        B: any;
        C: any;
        outlineKind: string;
        d: C;
        f: C;
        h: C;
        j: U;
        onDidChange: any;
        k: any;
        l: any;
        m: any;
        r: any;
        s: any;
        t: any;
        config: {
            treeDataSource: any;
            quickPickDataSource: any;
            breadcrumbsDataSource: any;
            delegate: Oe;
            renderers: any[];
            comparator: Ee;
            options: {
                collapseByDefault: boolean;
                expandOnlyOnTwistieClick: boolean;
                multipleSelectionSupport: boolean;
                accessibilityProvider: De;
                identityProvider: {
                    getId: ($: any) => any;
                };
                keyboardNavigationLabelProvider: Ie;
            };
        };
        D(): void;
        E(): void;
        n: any;
        o: any;
        p: any;
        q: any;
        F(): void;
        G(e?: any): Promise<void>;
        doComputeSymbols(e: any): Promise<void>;
        H(): Promise<void>;
        I(): void;
        J(): void;
        K(): void;
        L(): void;
        reveal(e: any, t: any, o: any): Promise<void>;
        preview(e: any): any;
        captureViewState(): any;
        dispose(): void;
    };
};
declare let H: {
    new (e: any, t: any): {
        d: any;
        dispose: () => any;
        matches(e: any): boolean;
        createOutline(e: any, t: any, o: any): Promise<any>;
    };
};
declare namespace p {
    let CellKind: y;
    let CellHasChildren: y;
    let CellHasHeader: y;
    let CellFoldingState: y;
    let OutlineElementTarget: y;
}
import { $ud as C } from "../../../../../../base/common/lifecycle.js";
import { $ef as U } from "../../../../../../base/common/event.js";
declare class Oe {
    getHeight(e: any): number;
    getTemplateId(e: any): string | undefined;
}
declare class Ee {
    d: import("../../../../../../base/common/lazy.js").$wf;
    compareByPosition(e: any, t: any): number;
    compareByType(e: any, t: any): any;
    compareByName(e: any, t: any): any;
}
declare class De {
    getAriaLabel(e: any): any;
    getWidgetAriaLabel(): string;
}
declare class Ie {
    getKeyboardNavigationLabel(e: any): any;
}
import { $Wn as y } from "../../../../../../platform/contextkey/common/contextkey.js";
export { T as $SVb, N as $TVb, A as $UVb, D as $VVb, H as $WVb, p as $XVb };
//# sourceMappingURL=notebookOutline.d.ts.map