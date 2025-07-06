declare let y: {
    new (i: any, n: any, e: any): {
        setActiveMovedText(i: any): void;
        setHoveredMovedText(i: any): void;
        model: any;
        z: any;
        C: any;
        g: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        isDiffUpToDate: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        j: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        diff: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        n: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        unchangedRegions: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        movedTextToCompare: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        t: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        u: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        activeMovedText: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        w: A;
        y: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        h: any;
        ensureModifiedLineIsVisible(i: any, n: any, e: any): void;
        ensureOriginalLineIsVisible(i: any, n: any, e: any): void;
        waitForDiff(): Promise<void>;
        serializeState(): {
            collapsedRegions: any;
        };
        restoreSerializedState(i: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class N {
    static fromDiffResult(i: any): N;
    constructor(i: any, n: any, e: any, t: any);
    mappings: any;
    movedTexts: any;
    identical: any;
    quitEarly: any;
}
declare class oi {
    constructor(i: any);
    lineRangeMapping: any;
}
declare class M {
    static fromDiffs(i: any, n: any, e: any, t: any, s: any): M[];
    constructor(i: any, n: any, e: any, t: any, s: any);
    get originalUnchangedRange(): R;
    get modifiedUnchangedRange(): R;
    originalLineNumber: any;
    modifiedLineNumber: any;
    lineCount: any;
    d: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    visibleLineCountTop: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    g: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    visibleLineCountBottom: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    h: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    isDragged: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    setVisibleRanges(i: any, n: any): M[];
    shouldHideControls(i: any): any;
    getHiddenOriginalRange(i: any): R;
    getHiddenModifiedRange(i: any): R;
    setHiddenModifiedRange(i: any, n: any): void;
    getMaxVisibleLineCountTop(): number;
    getMaxVisibleLineCountBottom(): number;
    showMoreAbove(i: number | undefined, n: any): void;
    showMoreBelow(i: number | undefined, n: any): void;
    showAll(i: any): void;
    showModifiedLine(i: any, n: any, e: any): void;
    showOriginalLine(i: any, n: any, e: any): void;
    collapseAll(i: any): void;
    setState(i: any, n: any, e: any): void;
}
declare var H: any;
import { $qf as A } from "../../../../base/common/cancellation.js";
import { $oD as R } from "../../../common/core/ranges/lineRange.js";
export { y as $2fb, N as $3fb, oi as $4fb, M as $5fb, H as RevealPreference };
//# sourceMappingURL=diffEditorViewModel.d.ts.map