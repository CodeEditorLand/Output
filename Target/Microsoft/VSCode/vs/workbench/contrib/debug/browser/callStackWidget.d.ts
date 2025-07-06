declare class I {
    constructor(e: any, t: any, o?: number, i?: number);
    name: any;
    source: any;
    line: number;
    column: number;
}
declare class S {
    constructor(e: any, t: any);
    label: any;
    load: any;
}
declare class be {
    showHeader: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
}
declare let B: {
    new (e: any, t: any, o: any): {
        readonly onDidChangeContentHeight: any;
        readonly onDidScroll: any;
        readonly contentHeight: any;
        b: any;
        c: any;
        a: any;
        setFrames(e: any): void;
        f: O | undefined;
        layout(e: any, t: any): void;
        collapseAll(): void;
        g(e: any): Promise<void>;
        j(e: any): (S | f | V)[];
        q: b;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const v: 24;
import { $qf as O } from "../../../../base/common/cancellation.js";
declare class f {
    constructor(e: any);
    original: any;
    collapsed: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    height: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
}
declare class V extends I {
    constructor(e: any);
    editorHeight: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    collapsed: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    height: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
}
import { $ud as b } from "../../../../base/common/lifecycle.js";
export { I as $imc, S as $jmc, be as $kmc, B as $lmc, v as $mmc };
//# sourceMappingURL=callStackWidget.d.ts.map