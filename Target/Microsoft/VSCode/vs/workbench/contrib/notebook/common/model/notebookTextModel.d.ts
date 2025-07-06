export { T as $0K };
declare let T: {
    new (t: any, e: any, s: any, i: any, r: any, n: any, a: any, o: any, h: any, u: any): {
        readonly length: number;
        readonly cells: any[];
        readonly versionId: number;
        readonly alternativeVersionId: string;
        readonly notebookType: any;
        viewType: any;
        uri: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        f: boolean;
        g: any;
        h: any;
        j: any;
        onWillDispose: any;
        onWillAddRemoveCells: any;
        onDidChangeContent: any;
        m: number;
        n: Map<any, any>;
        r: any[];
        metadata: any;
        transientOptions: any;
        t: number;
        u: number;
        w: string;
        R: Set<any>;
        z: nt;
        y: it;
        setCellCollapseDefault(t: any): void;
        s: any;
        _initialize(t: any, e: any): void;
        I(t: any, e: any): void;
        J(): string;
        dispose(): void;
        pushStackElement(): void;
        L(t: any): number;
        M(t: any, e: any): any;
        N(t: any): number;
        reset(t: any, e: any, s: any): void;
        createSnapshot(t: any): {
            metadata: any;
            cells: never[];
        };
        restoreSnapshot(t: any, e: any): void;
        S(t: any): boolean;
        applyEdits(t: any, e: any, s: any, i: any, r: any, n: any): boolean;
        U(t: any, e: any, s: any, i: any, r: any): void;
        W(t: any): any[];
        X(t: any): any;
        Y(t: any, e: any, s: any, i: any, r: any, n: any, a: any): void;
        Z(t: any): void;
        $(t: any): void;
        ab(t: any, e: any, s: any, i: any): void;
        bb(t: any, e: any, s: any, i: any): void;
        cb(t: any, e: any, s: any, i: any): void;
        db(t: any, e: any, s: any, i: any, r: any): void;
        eb(t: any, e: any): boolean;
        fb(t: any, e: any): boolean;
        gb(t: any, e: any): boolean;
        hb(t: any, e: any, s: any, i: any, r: any): void;
        ib(t: any, e: any, s: any, i: any, r: any): void;
        jb(t: any, e: any): void;
        kb(t: any, e: any, s: any, i: any, r: any): void;
        lb(t: any, e: any, s: any): void;
        mb(t: any, e: any, s: any, i: any): void;
        nb(t: any, e: any, s: any): void;
        ob(t: any, e: any, s: any): void;
        pb(t: any, e: any, s: any, i: any, r: any, n: any, a: any, o: any): boolean;
        qb(t: any): void;
        rb(t: any): boolean;
        findNextMatch(t: any, e: any, s: any, i: any, r: any, n: any): {
            cell: any;
            match: any;
        } | null;
        findMatches(t: any, e: any, s: any, i: any): {
            cell: any;
            matches: any;
        }[];
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    computeEdits(t: any, e: any, s?: any[]): any[];
    O(t: any, e: any, s: any): any;
    P(t: any, e: any, s: any, i: any, r: any, n: any, a: any): number;
    Q(t: any, e: any, s: any, i: any, r: any, n: any, a: any): number;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class nt extends K {
    get isEmpty(): boolean;
    isDirtyEvent(): boolean;
}
declare class it {
    constructor(t: any, e: any, s: any, i: any);
    g: any;
    h: any;
    j: any;
    l: any;
    d: any;
    f: boolean;
    isUndoStackEmpty(): any;
    pushStackElement(t: any, e: any): void;
    m(t: any, e: any, s: any): any;
    appendPreviousOperation(): boolean;
    pushEditOperation(t: any, e: any, s: any, i: any, r: any): void;
}
import { $hf as K } from "../../../../../base/common/event.js";
//# sourceMappingURL=notebookTextModel.d.ts.map