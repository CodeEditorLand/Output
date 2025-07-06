declare class Te extends S {
    constructor(e: any, t: any);
    b: any;
    f: any;
    a: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    currentIndex: import("../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    reveal(e: any): void;
    next(e: any): boolean;
    previous(e: any): boolean;
    enableAccessibleDiffView(): void;
    acceptNearestChange(e: any): Promise<void>;
    rejectNearestChange(e: any): Promise<void>;
    toggleDiff(e: any, t: any): Promise<void>;
}
declare let U: {
    new (e: any, t: any, i: any, n: any, s: any, h: any): {
        f: any;
        b: any;
        a: any;
        readonly currentIndex: any;
        reveal(e: any): any;
        next(e: any): any;
        previous(e: any): any;
        enableAccessibleDiffView(): void;
        acceptNearestChange(e: any): any;
        rejectNearestChange(e: any): any;
        toggleDiff(e: any, t: any): any;
        dispose(): void;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as S } from "../../../../../../base/common/lifecycle.js";
export { Te as $1gc, U as $Zgc };
//# sourceMappingURL=chatEditingNotebookEditorIntegration.d.ts.map