export { E as $R2b };
declare let E: {
    new (t: any, i: any, s: any, d: any, e: any, r: any, o: any): {
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        b: D;
        c: g;
        a: any;
        f: any;
        g: any;
        dispose(): void;
        m(t: any): void;
        n(t: any): void;
        o(t: any): void;
        d: l | undefined;
        p(t: any): void;
        s(t: any): {
            id: any;
            documentUri: any;
            selections: any;
            visibleRanges: any;
            viewColumn: any;
            viewType: any;
        };
    };
    q(t: any): boolean;
    r(t: any): {
        viewType: any;
        uri: any;
        metadata: any;
        versionId: any;
        cells: any;
    };
};
import { $ud as D } from "../../../base/common/lifecycle.js";
import { $Ed as g } from "../../../base/common/lifecycle.js";
declare class l {
    static delta(t: any, i: any): {
        addedDocuments: any[];
        removedDocuments: never[];
        addedEditors: any[];
        removedEditors: never[];
        visibleEditors: any[];
        newActiveEditor?: never;
    } | {
        addedDocuments: any[];
        removedDocuments: any[];
        addedEditors: any[];
        removedEditors: any[];
        newActiveEditor: any;
        visibleEditors: any[] | undefined;
    };
    constructor(t: any, i: any, s: any, d: any);
    documents: any;
    textEditors: any;
    activeEditor: any;
    visibleEditors: any;
}
//# sourceMappingURL=mainThreadNotebookDocumentsAndEditors.d.ts.map