declare let F: {
    new (n: any, r: any, o: any, c: any, i: any, d: any): {
        j: any;
        m: any;
        r: any;
        s: any;
        u: any;
        w: any;
        b: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        f: any;
        g: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        h: any;
        onDidClick: any;
        y: any;
        z: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        C: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        D: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        F: any;
        G: any;
        isHovered: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        height: import("../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        ownsViewZone(n: any): boolean;
        q: nt;
        dispose(): void;
        B(t: any): any;
    };
    hot: any;
    getWarningWidgetContext(n: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Rt extends G {
    constructor(n: any, r: any, o: any, c: any);
    get viewZoneId(): any;
    get viewZoneHeight(): import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    r: any;
    s: any;
    u: any;
    w: any;
    f: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    g: {
        c: any;
        e: () => void;
        debugName: any;
        g(): void;
        a: any;
        h(): void;
        get(): void;
        f: Set<any>;
        addObserver(e: any): void;
        removeObserver(e: any): void;
        log(): /*elided*/ any;
        debugGetObservers(): Set<any>;
        readonly TChange: null;
        reportChanges(): void;
        read(e: any): any;
        map(e: any, t: any): any;
        flatten(): any;
        recomputeInitiallyAndOnChange(e: any, t: any): /*elided*/ any;
        keepObserved(e: any): /*elided*/ any;
        readonly b: any;
    };
    h: any;
    onDidClick: any;
    j: any;
    isHovered: any;
    m: boolean;
    y(): void;
    z(n: any, r: any, o: any): void;
    C(n: any, r: any, o: any, c: any): void;
    b: {
        viewZoneId: any;
        heightInLines: any;
        lineNumber: any;
    } | undefined;
    D(n: any): void;
    F(n: any, r: any): void;
}
declare const Z: any;
import { $ud as nt } from "../../../../../../base/common/lifecycle.js";
import { $vd as G } from "../../../../../../base/common/lifecycle.js";
export { F as $Upb, Rt as $Vpb, Z as $Wpb };
//# sourceMappingURL=ghostTextView.d.ts.map