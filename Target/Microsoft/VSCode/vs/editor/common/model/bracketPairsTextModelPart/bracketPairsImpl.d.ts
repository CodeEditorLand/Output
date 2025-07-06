export { Z as $1F };
declare class Z extends E {
    constructor(e: any, n: any);
    get f(): boolean;
    h: any;
    j: any;
    a: any;
    c: j;
    onDidChange: any;
    g: boolean;
    handleLanguageConfigurationServiceChange(e: any): void;
    handleDidChangeOptions(e: any): void;
    handleDidChangeLanguage(e: any): void;
    handleDidChangeContent(e: any): void;
    handleDidChangeBackgroundTokenizationState(): void;
    handleDidChangeTokens(e: any): void;
    m(): void;
    getBracketPairsInRange(e: any): any;
    getBracketPairsInRangeWithMinIndentation(e: any): any;
    getBracketsInRange(e: any, n?: boolean): any;
    findMatchingBracketUp(e: any, n: any, g: any): any;
    matchBracket(e: any, n: any): any[] | null;
    n(e: any, n: any, g: any, a: any): {
        searchStartOffset: number;
        searchEndOffset: number;
    };
    s(e: any, n: any): null;
    t(e: any, n: any, g: any, a: any): x | null;
    u(e: any, n: any, g: any): v | x | null;
    w(e: any, n: any, g: any): v | x | null;
    findPrevBracket(e: any): any;
    findNextBracket(e: any): any;
    findEnclosingBrackets(e: any, n: any): any;
    y(e: any, n: any): {
        range: any;
        bracketInfo: any;
    } | null;
}
import { $vd as E } from "../../../../base/common/lifecycle.js";
import { $ef as j } from "../../../../base/common/event.js";
declare class x {
}
import { $eC as v } from "../../core/range.js";
//# sourceMappingURL=bracketPairsImpl.d.ts.map