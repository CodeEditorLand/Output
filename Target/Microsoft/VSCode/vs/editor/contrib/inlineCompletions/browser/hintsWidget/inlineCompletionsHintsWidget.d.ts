declare let D: {
    new (t: any, i: any, n: any): {
        r: any;
        s: any;
        t: any;
        f: import("../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        m: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        j: ht;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let S: {
    new (t: any, i: any, n: any, r: any, s: any, o: any, a: any, p: any, h: any, c: any, C: any, P: any, F: any): {
        t(t: any, i: any, n: any): B;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        S: any;
        j: string;
        allowEditorOverflow: boolean;
        suppressMouseDown: boolean;
        m: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        r: any;
        s: {
            root: HTMLElement;
        };
        u: any;
        w: any;
        y: any;
        C: any;
        D: any;
        F: any;
        z: any;
        getId(): string;
        getDomNode(): HTMLElement;
        getPosition(): {
            position: any;
            preference: number[];
            positionAffinity: number;
        };
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    hot: any;
    f: boolean | undefined;
    readonly dropDownVisible: boolean | undefined;
    id: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let I: {
    new (t: any, i: any, n: any, r: any, s: any, o: any, a: any, p: any, h: any): {
        Q: any;
        R: any;
        S: any;
        U: any;
        j: any;
        r: any[];
        s: any[];
        P: any[];
        W(): void;
        setPrependedPrimaryActions(t: any): void;
        setAdditionalPrimaryActions(t: any): void;
        setAdditionalSecondaryActions(t: any): void;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        H: any;
        setActions(l: any, n: any[] | undefined, e: any): void;
        w: any[];
        y: boolean;
        C: any;
        onDidChangeDropdownVisibility: any;
        D: any;
        f: {
            orientation: number;
        };
        t: any;
        z: HTMLDivElement;
        m: any;
        u: import("../../../../../base/browser/ui/dropdown/dropdownActionViewItem.js").$g0;
        actionRunner: any;
        context: any;
        getElement(): HTMLDivElement;
        focus(): void;
        getItemsWidth(): number;
        getItemAction(e: any): any;
        getItemWidth(e: any): any;
        getItemsLength(): any;
        setAriaLabel(e: any): void;
        isEmpty(): any;
        F(e: any): any;
        G(): void;
        dispose(): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $dC as ht } from "../../../../common/core/position.js";
import { $bm as B } from "../../../../../base/common/actions.js";
export { D as $Vlb, S as $Wlb, I as $Xlb };
//# sourceMappingURL=inlineCompletionsHintsWidget.d.ts.map