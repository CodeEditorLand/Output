declare class B extends u {
    constructor(t: any, i: any);
    waitForDiffs(): Promise<void>;
    collapseAll(): void;
    expandAll(): void;
    get contextKeys(): any;
    model: any;
    c: any;
    a: any;
    b: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    isLoading: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    items: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    focusedDiffItem: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    activeDiffItem: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re & {
        clearCache: (o: any) => void;
        setCache: (o: any, i: any) => void;
    };
}
declare let c: {
    new (t: any, i: any, e: any, s: any): {
        readonly diffEditorViewModel: any;
        readonly originalUri: any;
        readonly modifiedUri: any;
        setIsFocused(t: any, i: any): void;
        readonly documentDiffItem: any;
        c: any;
        f: any;
        g: any;
        collapsed: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        lastTemplateData: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        isActive: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        a: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        isFocused: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        isAlive: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        b: any;
        diffEditorViewModelRef: any;
        getKey(): string;
        q: D;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as u } from "../../../../base/common/lifecycle.js";
import { $ud as D } from "../../../../base/common/lifecycle.js";
export { B as $iYb, c as $jYb };
//# sourceMappingURL=multiDiffEditorViewModel.d.ts.map