declare let C: {
    new (t: any, e: any, r: any, i: any, n: any, s: any): {
        g: any;
        a: any;
        b: any;
        f: any;
        dispose(): void;
        canComputeUnicodeHighlights(t: any): boolean;
        computedUnicodeHighlights(t: any, e: any, r: any): Promise<any>;
        computeDiff(t: any, e: any, r: any, i: any): Promise<{
            identical: any;
            quitEarly: any;
            changes: any;
            moves: any;
        } | null>;
        canComputeDirtyDiff(t: any, e: any): boolean;
        computeDirtyDiff(t: any, e: any, r: any): Promise<any>;
        computeMoreMinimalEdits(t: any, e: any, r?: boolean): Promise<any>;
        computeHumanReadableDiff(t: any, e: any): Promise<any>;
        computeStringEditFromDiff(t: any, e: any, r: any, i: any): Promise<v>;
        canNavigateValueSet(t: any): boolean;
        navigateValueSet(t: any, e: any, r: any): Promise<any>;
        canComputeWordRanges(t: any): boolean;
        computeWordRanges(t: any, e: any): Promise<any>;
        findSectionHeaders(t: any, e: any): Promise<any>;
        computeDefaultDocumentColors(t: any): Promise<any>;
        h(t: any, e?: boolean): Promise<any>;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let w: {
    new (t: any, e: any, r: any): {
        j: any;
        h: boolean;
        a: any;
        b: any;
        f: any;
        g: any;
        fhr(t: any, e: any): void;
        n(): any;
        s(): Promise<any>;
        t(): J;
        u(): {
            $fhr: (t: any, e: any) => void;
        };
        w(t: any): any;
        workerWithSyncedResources(t: any, e?: boolean): Promise<any>;
        textualSuggest(t: any, e: any, r: any): Promise<any>;
        dispose(): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $lF as v } from "../../common/core/edits/stringEdit.js";
declare class J {
    constructor(t: any);
    a: any;
    proxy: any;
    dispose(): void;
    setChannel(t: any, e: any): void;
    getChannel(t: any): void;
}
export { C as $D8b, w as $E8b };
//# sourceMappingURL=editorWorkerService.d.ts.map