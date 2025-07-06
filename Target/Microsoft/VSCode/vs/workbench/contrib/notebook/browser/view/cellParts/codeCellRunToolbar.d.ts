declare let f: {
    new (t: any, o: any, e: any, n: any, i: any, r: any, c: any, h: any, u: any, l: any): {
        notebookEditor: any;
        contextKeyService: any;
        cellContainer: any;
        runButtonContainer: any;
        j: any;
        m: any;
        n: any;
        b: any;
        h: any;
        didRenderCell(t: any): void;
        getCellToolbarActions(t: any): {
            primary: never[];
            secondary: never[];
        };
        r(t: any, o: any, e: any): void;
        a: any;
        f: any;
        prepareRenderCell(e: any): void;
        renderCell(e: any): void;
        c: any;
        unrenderCell(e: any): void;
        prepareLayout(): void;
        updateInternalLayoutNow(e: any): void;
        updateState(e: any, t: any): void;
        updateForExecutionState(e: any, t: any): void;
        q: C;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function K(s: any): any;
import { $ud as C } from "../../../../../../base/common/lifecycle.js";
export { f as $dVb, K as $eVb };
//# sourceMappingURL=codeCellRunToolbar.d.ts.map