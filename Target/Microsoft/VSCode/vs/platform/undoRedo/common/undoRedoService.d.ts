export { R as $H5b };
declare let R: {
    new (e: any, t: any): {
        c: any;
        d: any;
        a: Map<any, any>;
        b: any[];
        registerUriComparisonKeyComputer(e: any, t: any): {
            dispose: () => void;
        };
        getUriComparisonKey(e: any): any;
        e(e: any): void;
        pushElement(e: any, t?: B | undefined, s?: d | undefined): void;
        f(e: any): void;
        getLastElement(e: any): any;
        g(e: any, t: any): void;
        h(e: any, t: any): void;
        removeElements(e: any): void;
        setElementsValidFlag(e: any, t: any, s: any): void;
        hasElements(e: any): any;
        createSnapshot(e: any): any;
        restoreSnapshot(e: any): void;
        getElements(e: any): any;
        k(e: any): any[];
        canUndo(e: any): any;
        l(e: any, t: any): void;
        m(e: any): () => void;
        n(e: any, t: any, s: any, r: any, i: any): any;
        o(e: any): Promise<any>;
        p(e: any, t: any): any;
        q(e: any): E;
        s(e: any, t: any, s: any, r: any): any;
        t(e: any, t: any, s: any, r: any): any;
        u(e: any, t: any, s: any): any;
        v(e: any): boolean;
        w(e: any, t: any, s: any, r: any): any;
        x(e: any, t: any, s: any): any;
        y(e: any): any[];
        z(e: any, t: any): any;
        undo(e: any): any;
        A(e: any, t: number | undefined, s: any): any;
        B(e: any, t: any, s: any): any;
        C(e: any): any[];
        canRedo(e: any): any;
        D(e: any, t: any, s: any, r: any): any;
        E(e: any, t: any, s: any, r: any): any;
        F(e: any, t: any): any;
        G(e: any, t: any, s: any): Promise<any>;
        H(e: any, t: any): any;
        I(e: any): any[];
        J(e: any): any;
        redo(e: any): any;
        K(e: any): any;
    };
};
import { $9E as B } from "./undoRedo.js";
import { $0E as d } from "./undoRedo.js";
declare class E {
    constructor(e: any);
    editStacks: any;
    a: any[];
    isValid(): boolean;
}
//# sourceMappingURL=undoRedoService.d.ts.map