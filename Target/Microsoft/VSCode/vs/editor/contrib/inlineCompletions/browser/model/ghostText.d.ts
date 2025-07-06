declare class c {
    constructor(e: any, t: any);
    lineNumber: any;
    parts: any;
    equals(e: any): any;
    render(e: any, t?: boolean): string;
    renderForScreenReader(e: any): string;
    isEmpty(): any;
    get lineCount(): any;
}
declare class $ {
    constructor(e: any, t: any, n: any, s?: any[]);
    column: any;
    text: any;
    preview: any;
    c: any[];
    lines: any;
    equals(e: any): any;
}
declare class p {
    constructor(e: any, t: any, n: any, s?: number);
    lineNumber: any;
    columnRange: any;
    text: any;
    additionalReservedLineCount: number;
    parts: $[];
    newLines: any;
    renderForScreenReader(e: any): any;
    render(e: any, t?: boolean): string;
    get lineCount(): any;
    isEmpty(): boolean;
    equals(e: any): any;
}
declare function N(i: any, e: any): boolean;
declare function b(i: any, e: any): any;
export { c as $Tkb, $ as $Ukb, p as $Vkb, N as $Wkb, b as $Xkb };
//# sourceMappingURL=ghostText.d.ts.map