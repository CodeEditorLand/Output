export var FuzzyScore: any;
export class FuzzyScoreOptions {
    constructor(firstMatchCanBeWeak: any, boostFullMatch: any);
    firstMatchCanBeWeak: any;
    boostFullMatch: any;
}
export function anyScore(pattern: any, lowPattern: any, patternPos: any, word: any, lowWord: any, wordPos: any): any[];
export function createMatches(score: any): {
    start: any;
    end: any;
}[];
export function fuzzyScore(pattern: any, patternLow: any, patternStart: any, word: any, wordLow: any, wordStart: any, options?: {
    boostFullMatch: boolean;
    firstMatchCanBeWeak: boolean;
} | undefined): any[] | undefined;
export function fuzzyScoreGraceful(pattern: any, lowPattern: any, patternPos: any, word: any, lowWord: any, wordPos: any, options: any): any[] | undefined;
export function fuzzyScoreGracefulAggressive(pattern: any, lowPattern: any, patternPos: any, word: any, lowWord: any, wordPos: any, options: any): any[] | undefined;
export function isPatternInWord(patternLow: any, patternPos: any, patternLen: any, wordLow: any, wordPos: any, wordLen: any, fillMinWordPosArr?: boolean): boolean;
export function isUpper(code: any): boolean;
export function matchesBaseContiguousSubString(word: any, wordToMatchAgainst: any): {
    start: any;
    end: any;
}[] | null;
export function matchesCamelCase(word: any, camelCaseWord: any): any;
export function matchesContiguousSubString(word: any, wordToMatchAgainst: any): {
    start: any;
    end: any;
}[] | null;
export function matchesFuzzy(word: any, wordToMatchAgainst: any, enableSeparateSubstringMatching?: boolean): any;
export function matchesFuzzy2(pattern: any, word: any): {
    start: any;
    end: any;
}[] | null;
export const matchesPrefix: (word?: any, wordToMatchAgainst?: any) => {
    start: number;
    end: any;
}[] | null;
export const matchesStrictPrefix: (word?: any, wordToMatchAgainst?: any) => {
    start: number;
    end: any;
}[] | null;
export function matchesSubString(word: any, wordToMatchAgainst: any): any;
export function matchesWords(word: any, target: any, contiguous?: boolean): any;
export function or(...filter: any[]): (word: any, wordToMatchAgainst: any) => any;
//# sourceMappingURL=filters.d.ts.map