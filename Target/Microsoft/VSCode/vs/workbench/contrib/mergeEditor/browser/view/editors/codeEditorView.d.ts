declare class K extends c {
    constructor(e: any, r: any, o: any);
    updateOptions(e: any): void;
    s: any;
    viewModel: any;
    t: any;
    model: any;
    a: {
        root: HTMLElement;
    };
    b: g;
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
}
declare function Q(s: any, e: any): import("../../../../../../base/common/observableInternal/reactions/autorunImpl.js").$Vd;
declare let p: {
    new (e: any, r: any, o: any): {
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as c } from "../../../../../../base/common/lifecycle.js";
import { $ef as g } from "../../../../../../base/common/event.js";
export { K as $tSb, Q as $uSb, p as $vSb };
//# sourceMappingURL=codeEditorView.d.ts.map