export { R as $KSb };
declare let R: {
    new (t: any, e: any, s: any, i: any, r: any, h: any, u: any, b: any): {
        model: any;
        inputCodeEditorView1: any;
        inputCodeEditorView2: any;
        resultCodeEditorView: any;
        baseCodeEditorView: any;
        showNonConflictingChanges: any;
        c: any;
        f: any;
        a: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        b: any;
        shouldUseAppendInsteadOfAccept: import("../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        g: number;
        h: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re & {
            clearCache: (o: any) => void;
            setCache: (o: any, i: any) => void;
        };
        baseShowDiffAgainst: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        focusedEditorType: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        selectionInBase: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        activeModifiedBaseRange: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        j(t: any, e: any, s: any): any;
        setActiveModifiedBaseRange(t: any, e: any): void;
        setState(t: any, e: any, s: any, i: any): void;
        n(t: any): void;
        goToNextModifiedBaseRange(t: any): void;
        goToPreviousModifiedBaseRange(t: any): void;
        toggleActiveConflict(t: any): void;
        acceptAll(t: any): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=viewModel.d.ts.map