export { V as $Igc };
declare let V: {
    new (i: any, t: any, e: any, s: any, n: any): {
        readonly isEditFromUs: boolean;
        readonly allEditsAreFromUs: boolean;
        readonly diffInfo: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        f: boolean;
        g: boolean;
        j: number;
        m: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        n: any;
        r: any[];
        s: any;
        onDidAcceptOrRejectAllHunks: any;
        t: any;
        onDidUserEditModel: any;
        u: p | undefined;
        clearCurrentEditLineDecoration(): void;
        areOriginalAndModifiedIdentical(): Promise<any>;
        acceptAgentEdits(i: any, t: any, e: any, s: any): Promise<{
            rewriteRatio: number;
            maxLineNumber: number;
        }>;
        F(i: any, t: any): any[];
        keep(): void;
        undo(): void;
        resetDocumentValues(i: any, t: any): Promise<void>;
        G(i: any): void;
        H(i: any): Promise<boolean>;
        I(i: any): Promise<boolean>;
        J(): Promise<void>;
        h: Promise<any> | undefined;
        L(): Promise<any>;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: E | undefined;
    b: E | undefined;
    c: E | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $lF as p } from "../../../../../editor/common/core/edits/stringEdit.js";
import { $oI as E } from "../../../../../editor/common/model/textModel.js";
//# sourceMappingURL=chatEditingTextModelChangeService.d.ts.map