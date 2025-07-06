declare class W extends T {
    constructor(t: any, e: any, n: any, s: any);
    _textModel: any;
    _languageIdCodec: any;
    updateTokensUntilLine(t: any, e: any): void;
    getTokenTypeIfInsertingCharacter(t: any, e: any): number;
    tokenizeLinesAt(t: any, e: any): u[] | null;
    hasAccurateTokensForLine(t: any): boolean;
    isCheapToTokenize(t: any): boolean;
    tokenizeHeuristically(t: any, e: any, n: any): {
        heuristicTokens: boolean;
    };
    b(t: any): any;
}
declare function C(o: any, t: any, e: any): {
    likelyRelevantLines: any[];
    initialState: any;
};
declare class _ {
    constructor(t: any);
    d: any;
    a: w;
    b: v;
    getEndState(t: any): any;
    setEndState(t: any, e: any): boolean;
    acceptChange(t: any, e: any): void;
    acceptChanges(t: any): void;
    invalidateEndStateRange(t: any): void;
    getFirstInvalidEndStateLineNumber(): any;
    getFirstInvalidEndStateLineNumberOrMax(): any;
    allStatesValid(): boolean;
    getStartState(t: any, e: any): any;
    getFirstInvalidLine(t: any): {
        lineNumber: any;
        startState: any;
    } | null;
}
declare class w {
    a: E;
    getEndState(t: any): any;
    setEndState(t: any, e: any): boolean;
    acceptChange(t: any, e: any): void;
    acceptChanges(t: any): void;
}
declare class v {
    a: any[];
    getRanges(): any[];
    get min(): any;
    removeMin(): any;
    delete(t: any): void;
    addRange(t: any): void;
    addRangeAndResize(t: any, e: any): void;
    toString(): string;
}
declare class j {
    constructor(t: any, e: any);
    b: any;
    d: any;
    a: boolean;
    f: boolean;
    dispose(): void;
    handleChanges(): void;
    g(): void;
    h(t: any): void;
    j(): void;
    k(): boolean;
    l(t: any): any;
    checkFinished(): void;
    requestTokens(t: any, e: any): void;
}
declare class T {
    constructor(t: any, e: any);
    tokenizationSupport: any;
    a: any;
    store: _;
    getStartState(t: any): any;
    getFirstInvalidLine(): {
        lineNumber: any;
        startState: any;
    } | null;
}
import { $gD as u } from "../tokens/lineTokens.js";
import { $XH as E } from "./fixedArray.js";
export { W as $1H, C as $2H, _ as $3H, w as $4H, v as $5H, j as $6H, T as $ZH };
//# sourceMappingURL=textModelTokens.d.ts.map