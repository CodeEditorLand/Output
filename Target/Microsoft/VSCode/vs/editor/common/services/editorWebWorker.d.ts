export { $ as $vfb };
declare class $ {
    static h(n: any, e: any, u: any, r: any): {
        identical: boolean;
        quitEarly: any;
        changes: any;
        moves: any;
    };
    static j(n: any, e: any): boolean;
    constructor(n?: null);
    f: any;
    d: W;
    dispose(): void;
    $ping(): Promise<string>;
    g(n: any): any;
    getModels(): any[];
    $acceptNewModel(n: any): void;
    $acceptModelChanged(n: any, e: any): void;
    $acceptRemovedModel(n: any): void;
    $computeUnicodeHighlights(n: any, e: any, u: any): Promise<{
        ranges: d[];
        hasMore: boolean;
        ambiguousCharacterCount: number;
        invisibleCharacterCount: number;
        nonBasicAsciiCharacterCount: number;
    }>;
    $findSectionHeaders(n: any, e: any): Promise<any[]>;
    $computeDiff(n: any, e: any, u: any, r: any): Promise<{
        identical: boolean;
        quitEarly: any;
        changes: any;
        moves: any;
    } | null>;
    $computeDirtyDiff(n: any, e: any, u: any): Promise<{
        originalStartLineNumber: any;
        originalEndLineNumber: any;
        modifiedStartLineNumber: any;
        modifiedEndLineNumber: any;
        charChanges: any;
    }[] | null>;
    $computeStringDiff(n: any, e: any, u: any, r: any): any;
    $computeMoreMinimalEdits(n: any, e: any, u: any): Promise<any>;
    $computeHumanReadableDiff(n: any, e: any, u: any): any;
    $computeLinks(n: any): Promise<{
        range: {
            startLineNumber: any;
            startColumn: any;
            endLineNumber: any;
            endColumn: number;
        };
        url: any;
    }[] | null>;
    $computeDefaultDocumentColors(n: any): Promise<{
        range: any;
        color: {
            red: number;
            blue: number;
            green: number;
            alpha: any;
        };
    }[] | null>;
    $textualSuggest(n: any, e: any, u: any, r: any): Promise<{
        words: any[];
        duration: number;
    }>;
    $computeWordRanges(n: any, e: any, u: any, r: any): Promise<any>;
    $navigateValueSet(n: any, e: any, u: any, r: any, s: any): Promise<{
        range: any;
        value: any;
    } | null>;
    $fmr(n: any, e: any): Promise<any>;
}
import { $tfb as W } from "./textModelSync/textModelSync.impl.js";
import { $eC as d } from "../core/range.js";
//# sourceMappingURL=editorWebWorker.d.ts.map