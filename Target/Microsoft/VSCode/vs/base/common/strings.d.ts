export class AmbiguousCharacters {
    static getInstance(locales: any): any;
    static getLocales(): any;
    constructor(confusableDictionary: any);
    confusableDictionary: any;
    isAmbiguous(codePoint: any): any;
    containsAmbiguousCharacter(str: any): boolean;
    /**
     * Returns the non basic ASCII code point that the given code point can be confused,
     * or undefined if such code point does note exist.
     */
    getPrimaryConfusable(codePoint: any): any;
    getConfusableCodePoints(): Set<any>;
}
export class CodePointIterator {
    constructor(str: any, offset?: number);
    get offset(): number;
    _str: any;
    _len: any;
    _offset: number;
    setOffset(offset: any): void;
    prevCodePoint(): any;
    nextCodePoint(): any;
    eol(): boolean;
}
export const Ellipsis: "\u2026";
export var GraphemeBreakType: any;
export class GraphemeIterator {
    constructor(str: any, offset?: number);
    get offset(): number;
    _iterator: CodePointIterator;
    nextGraphemeLength(): number;
    prevGraphemeLength(): number;
    eol(): boolean;
}
export class InvisibleCharacters {
    static getRawData(): any;
    static getData(): Set<any>;
    static isInvisibleCharacter(codePoint: any): boolean;
    static containsInvisibleCharacter(str: any): boolean;
    static get codePoints(): Set<any>;
}
export const UNUSUAL_LINE_TERMINATORS: RegExp;
export const UTF8_BOM_CHARACTER: string;
export function charCount(str: any): number;
export function commonPrefixLength(a: any, b: any): number;
export function commonSuffixLength(a: any, b: any): number;
export function compare(a: any, b: any): 0 | 1 | -1;
export function compareIgnoreCase(a: any, b: any): number;
export function compareSubstring(a: any, b: any, aStart?: number, aEnd?: any, bStart?: number, bEnd?: any): 0 | 1 | -1;
export function compareSubstringIgnoreCase(a: any, b: any, aStart?: number, aEnd?: any, bStart?: number, bEnd?: any): number;
export function computeCodePoint(highSurrogate: any, lowSurrogate: any): number;
export function containsRTL(str: any): any;
export function containsUnusualLineTerminators(str: any): boolean;
export function containsUppercaseCharacter(target: any, ignoreEscapedChars?: boolean): boolean;
export function convertSimple2RegExpPattern(pattern: any): any;
export function count(value: any, substr: any): number;
export function createRegExp(searchString: any, isRegex: any, options?: {}): RegExp;
export function endsWithIgnoreCase(str: any, candidate: any): boolean;
export function equals(a: any, b: any, ignoreCase: any): boolean;
export function equalsIgnoreCase(a: any, b: any): boolean;
export function escape(html: any): any;
export function escapeRegExpCharacters(value: any): any;
export function firstNonWhitespaceIndex(str: any): number;
export function forAnsiStringParts(str: any): Generator<{
    isCode: boolean;
    str: any;
}, void, unknown>;
export function format(value: any, ...args: any[]): any;
export function format2(template: any, values: any): any;
export function fuzzyContains(target: any, query: any): boolean;
export function getCharContainingOffset(str: any, offset: any): any[];
export function getGraphemeBreakType(codePoint: any): any;
export function getIndentationLength(str: any): any;
export function getLeadingWhitespace(str: any, start?: number, end?: any): any;
export function getLeftDeleteOffset(offset: any, str: any): number;
export function getNLines(str: any, n?: number): any;
export function getNextCodePoint(str: any, len: any, offset: any): any;
export function htmlAttributeEncodeValue(value: any): any;
export function indexOfPattern(str: any, re: any): any;
export function isAsciiDigit(code: any): boolean;
export function isBasicASCII(str: any): boolean;
export function isEmojiImprecise(x: any): boolean;
export function isFalsyOrWhitespace(str: any): boolean;
export function isFullWidthCharacter(charCode: any): boolean;
export function isHighSurrogate(charCode: any): boolean;
export function isLowSurrogate(charCode: any): boolean;
export function isLowerAsciiLetter(code: any): boolean;
export function isUpperAsciiLetter(code: any): boolean;
export function joinStrings(items: any, separator: any): any;
export function lastNonWhitespaceIndex(str: any, startIndex?: number): number;
export function lcut(text: any, n: any, prefix?: string): any;
export function ltrim(haystack: any, needle: any): any;
export function multibyteAwareBtoa(str: any): string;
export function nextCharLength(str: any, initialOffset: any): number;
export const noBreakWhitespace: "\u00A0";
export function prevCharLength(str: any, initialOffset: any): number;
export function rcut(text: any, n: any, suffix?: string): any;
export function regExpLeadsToEndlessLoop(regexp: any): boolean;
export function removeAnsiEscapeCodes(str: any): any;
export function removeAnsiEscapeCodesFromPrompt(str: any): any;
export function replaceAsync(str: any, search: any, replacer: any): Promise<string>;
export function rtrim(haystack: any, needle: any): any;
export function singleLetterHash(n: any): string;
export function splitLines(str: any): any;
export function splitLinesIncludeSeparators(str: any): any[];
export function startsWithIgnoreCase(str: any, candidate: any): boolean;
export function startsWithUTF8BOM(str: any): boolean;
export function stripUTF8BOM(str: any): any;
export function trim(haystack: any, needle?: string): any;
export function truncate(value: any, maxLength: any, suffix?: string): any;
export function truncateMiddle(value: any, maxLength: any, suffix?: string): any;
export function uppercaseFirstLetter(str: any): any;
//# sourceMappingURL=strings.d.ts.map