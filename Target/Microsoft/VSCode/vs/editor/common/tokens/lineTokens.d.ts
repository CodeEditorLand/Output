declare class h {
    static createEmpty(t: any, e: any): h;
    static createFromTextAndMetadata(t: any, e: any): h;
    static convertToEndOffset(t: any, e: any): void;
    static findIndexInTokensArray(t: any, e: any): number;
    constructor(t: any, e: any, n: any);
    a: any;
    b: number;
    c: any;
    languageIdCodec: any;
    getTextLength(): any;
    equals(t: any): boolean;
    slicedEquals(t: any, e: any, n: any): boolean;
    getLineContent(): any;
    getCount(): number;
    getStartOffset(t: any): any;
    getMetadata(t: any): any;
    getLanguageId(t: any): any;
    getStandardTokenType(t: any): number;
    getForeground(t: any): number;
    getClassName(t: any): string;
    getInlineStyle(t: any, e: any): string;
    getPresentation(t: any): {
        foreground: number;
        italic: boolean;
        bold: boolean;
        underline: boolean;
        strikethrough: boolean;
    };
    getEndOffset(t: any): any;
    findTokenIndexAtOffset(t: any): number;
    inflate(): this;
    sliceAndInflate(t: any, e: any, n: any): k;
    sliceZeroCopy(t: any): k;
    withInserted(t: any): h;
    getTokensInRange(t: any): d;
    getTokenText(t: any): any;
    forEach(t: any): void;
    toString(): string;
}
declare function b(u: any, t: any): any;
declare class d {
    static fromLineTokens(t: any): d;
    static create(t: any): d;
    constructor(t: any);
    a: any;
    toLineTokens(t: any, e: any): h;
    forEach(t: any): void;
    map(t: any): any[];
    slice(t: any): d;
    append(t: any): d;
}
declare class g {
    constructor(t: any, e: any);
    length: any;
    metadata: any;
}
declare class x {
    a: any[];
    add(t: any, e: any): void;
    build(): d;
}
declare class k {
    constructor(t: any, e: any, n: any, s: any);
    a: any;
    b: any;
    c: any;
    d: any;
    e: any;
    languageIdCodec: any;
    f: number;
    getMetadata(t: any): any;
    getLanguageId(t: any): any;
    getLineContent(): any;
    equals(t: any): any;
    getCount(): number;
    getStandardTokenType(t: any): any;
    getForeground(t: any): any;
    getEndOffset(t: any): any;
    getClassName(t: any): any;
    getInlineStyle(t: any, e: any): any;
    getPresentation(t: any): any;
    findTokenIndexAtOffset(t: any): number;
    getTokenText(t: any): any;
    forEach(t: any): void;
}
export { h as $gD, b as $hD, d as $iD, g as $jD, x as $kD };
//# sourceMappingURL=lineTokens.d.ts.map