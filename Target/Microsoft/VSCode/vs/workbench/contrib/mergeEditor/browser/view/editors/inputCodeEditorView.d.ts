declare let V: {
    new (n: any, s: any, a: any, o: any, i: any): {
        inputNumber: any;
        otherInputNumber: number;
        w: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        y: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        updateOptions(e: any): void;
        s: any;
        viewModel: any;
        t: any;
        model: any;
        a: {
            root: HTMLElement;
        };
        b: import("../../../../../workbench.web.main.internal.js").Emitter;
        view: {
            element: HTMLElement;
            minimumWidth: any;
            maximumWidth: any;
            minimumHeight: any;
            maximumHeight: any;
            onDidChange: any;
            layout: (i: any, t: any, h: any, d: any) => void;
        };
        f: import("../../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        j: import("../../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        n: import("../../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        editor: any;
        isFocused: import("../../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        cursorPosition: import("../../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        selection: import("../../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        cursorLineNumber: any;
        u(): any;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class dt {
    constructor(n: any, s: any, a: any, o: any);
    id: any;
    b: any;
    f: any;
    g: any;
    a: any;
    range: any;
    enabled: any;
    toggleState: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    state: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    setState(n: any, s: any): void;
    toggleBothSides(): void;
    getContextMenuActions(): any[];
}
declare class ut extends J {
    constructor(n: any, s: any, a: any);
    f: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    a: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    b: HTMLElement;
    layout(n: any, s: any, a: any, o: any): void;
    update(n: any): void;
}
import { $vd as J } from "../../../../../../base/common/lifecycle.js";
export { V as $xSb, dt as $ySb, ut as $zSb };
//# sourceMappingURL=inputCodeEditorView.d.ts.map