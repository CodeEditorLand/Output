declare function H(e: any): string;
declare function Q(e: any): {
    query: string;
    filesToInclude: string;
    filesToExclude: string;
    isRegexp: boolean;
    isCaseSensitive: boolean;
    useExcludeSettingsAndIgnoreFiles: boolean;
    matchWholeWord: boolean;
    contextLines: number;
    showIncludesExcludes: boolean;
    onlyOpenEditors: boolean;
    notebookSearchConfig: {
        includeMarkupInput: boolean;
        includeMarkupPreview: boolean;
        includeCodeInput: boolean;
        includeOutput: boolean;
    };
};
declare function O(): {
    query: string;
    filesToInclude: string;
    filesToExclude: string;
    isRegexp: boolean;
    isCaseSensitive: boolean;
    useExcludeSettingsAndIgnoreFiles: boolean;
    matchWholeWord: boolean;
    contextLines: number;
    showIncludesExcludes: boolean;
    onlyOpenEditors: boolean;
    notebookSearchConfig: {
        includeMarkupInput: boolean;
        includeMarkupPreview: boolean;
        includeCodeInput: boolean;
        includeOutput: boolean;
    };
};
declare function $(e: any): {
    query: string;
    filesToInclude: string;
    filesToExclude: string;
    isRegexp: boolean;
    isCaseSensitive: boolean;
    useExcludeSettingsAndIgnoreFiles: boolean;
    matchWholeWord: boolean;
    contextLines: number;
    showIncludesExcludes: boolean;
    onlyOpenEditors: boolean;
    notebookSearchConfig: {
        includeMarkupInput: boolean;
        includeMarkupPreview: boolean;
        includeCodeInput: boolean;
        includeOutput: boolean;
    };
};
declare function U(e: any, n: any, l: any, o: any, t: any, i: any, r: any): {
    matchRanges: m[];
    text: string;
    config: {
        query: any;
        isRegexp: boolean;
        isCaseSensitive: boolean;
        matchWholeWord: boolean;
        filesToExclude: any;
        filesToInclude: any;
        showIncludesExcludes: boolean;
        useExcludeSettingsAndIgnoreFiles: boolean;
        contextLines: any;
        onlyOpenEditors: boolean;
        notebookSearchConfig: {
            includeMarkupInput: boolean;
            includeMarkupPreview: boolean;
            includeCodeInput: boolean;
            includeOutput: boolean;
        };
    };
};
declare function J(e: any, n: any): Promise<{
    config: {
        query: string;
        filesToInclude: string;
        filesToExclude: string;
        isRegexp: boolean;
        isCaseSensitive: boolean;
        useExcludeSettingsAndIgnoreFiles: boolean;
        matchWholeWord: boolean;
        contextLines: number;
        showIncludesExcludes: boolean;
        onlyOpenEditors: boolean;
        notebookSearchConfig: {
            includeMarkupInput: boolean;
            includeMarkupPreview: boolean;
            includeCodeInput: boolean;
            includeOutput: boolean;
        };
    };
    text: string;
}>;
declare function P(e: any): {
    config: {
        query: string;
        filesToInclude: string;
        filesToExclude: string;
        isRegexp: boolean;
        isCaseSensitive: boolean;
        useExcludeSettingsAndIgnoreFiles: boolean;
        matchWholeWord: boolean;
        contextLines: number;
        showIncludesExcludes: boolean;
        onlyOpenEditors: boolean;
        notebookSearchConfig: {
            includeMarkupInput: boolean;
            includeMarkupPreview: boolean;
            includeCodeInput: boolean;
            includeOutput: boolean;
        };
    };
    text: string;
};
import { $eC as m } from "../../../../editor/common/core/range.js";
export { H as $adc, Q as $bdc, O as $cdc, $ as $ddc, U as $edc, J as $fdc, P as $gdc };
//# sourceMappingURL=searchEditorSerialization.d.ts.map