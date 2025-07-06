declare class v {
    static escape(e: any): any;
    static asInsertText(e: any): any;
    static guessNeedsClipboard(e: any): boolean;
    d: a;
    f: {
        type: number;
        pos: number;
        len: number;
    };
    parse(e: any, t: any, s: any): m;
    parseFragment(e: any, t: any): any;
    ensureFinalTabstop(e: any, t: any, s: any): void;
    g(e: any, t: any): string | boolean;
    h(e: any): boolean;
    i(e: any): string | false;
    j(e: any): boolean;
    k(e: any): boolean;
    l(e: any): boolean;
    m(e: any): boolean;
    n(e: any): boolean;
    o(e: any): boolean;
    q(e: any): boolean;
    r(e: any): boolean;
    s(e: any): boolean;
}
declare class a {
    static isDigitCharacter(e: any): boolean;
    static isVariableCharacter(e: any): boolean;
    value: string;
    pos: number;
    text(e: any): void;
    tokenText(e: any): string;
    next(): {
        type: number;
        pos: number;
        len: number;
    };
}
declare class p {
    d: any[];
    appendChild(e: any): this;
    replace(e: any, t: any): void;
    get children(): any[];
    get rightMostDescendant(): any;
    get snippet(): any;
    toString(): any;
    len(): number;
}
declare class N extends p {
}
declare class f extends N {
    static compareByIndex(e: any, t: any): 0 | 1 | -1;
    constructor(e: any);
    index: any;
    get isFinalTabstop(): boolean;
    get choice(): x | undefined;
    toTextmateString(): string;
    clone(): f;
}
declare class x extends p {
    constructor(...args: any[]);
    options: any[];
    appendChild(e: any): this;
    toTextmateString(): string;
    len(): any;
    clone(): x;
}
declare class $ extends p {
    constructor(...args: any[]);
    regexp: RegExp;
    resolve(e: any): any;
    f(e: any): string;
    toString(): string;
    toTextmateString(): string;
    clone(): $;
}
declare class u extends p {
    constructor(e: any, t: any, s: any, i: any);
    index: any;
    shorthandName: any;
    ifValue: any;
    elseValue: any;
    resolve(e: any): any;
    f(e: any): any;
    g(e: any): any;
    toTextmateString(): string;
    clone(): u;
}
declare class g extends N {
    constructor(e: any);
    name: any;
    resolve(e: any): boolean;
    toTextmateString(): string;
    clone(): g;
}
declare class m extends p {
    get placeholderInfo(): {
        all: any[];
        last: undefined;
    };
    f: {
        all: any[];
        last: undefined;
    } | undefined;
    get placeholders(): any[];
    offset(e: any): number;
    fullLen(e: any): number;
    enclosingPlaceholders(e: any): f[];
    resolveVariables(e: any): this;
    appendChild(e: any): this;
    toTextmateString(): any;
    clone(): m;
    walk(e: any): void;
}
declare class l extends p {
    static escape(e: any): any;
    constructor(e: any);
    value: any;
    toTextmateString(): any;
    len(): any;
    clone(): l;
}
declare var b: any;
export { v as $1hb, a as $Qhb, p as $Rhb, N as $Thb, f as $Uhb, x as $Vhb, $ as $Whb, u as $Xhb, g as $Yhb, m as $Zhb, l as Text, b as TokenType };
//# sourceMappingURL=snippetParser.d.ts.map