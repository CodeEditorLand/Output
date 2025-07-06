declare class E {
    static passThroughHooks: Set<string>;
    constructor(e: any);
    options: any;
    preprocess(e: any): any;
    postprocess(e: any): any;
    processAllTokens(e: any): any;
}
declare class m {
    static get rules(): {
        block: {
            normal: {
                blockquote: RegExp;
                code: RegExp;
                def: RegExp;
                fences: RegExp;
                heading: RegExp;
                hr: RegExp;
                html: RegExp;
                lheading: RegExp;
                list: RegExp;
                newline: RegExp;
                paragraph: RegExp;
                table: {
                    exec: () => null;
                };
                text: RegExp;
            };
            gfm: {
                table: RegExp;
                paragraph: RegExp;
                blockquote: RegExp;
                code: RegExp;
                def: RegExp;
                fences: RegExp;
                heading: RegExp;
                hr: RegExp;
                html: RegExp;
                lheading: RegExp;
                list: RegExp;
                newline: RegExp;
                text: RegExp;
            };
            pedantic: {
                html: RegExp;
                def: RegExp;
                heading: RegExp;
                fences: {
                    exec: () => null;
                };
                lheading: RegExp;
                paragraph: RegExp;
                blockquote: RegExp;
                code: RegExp;
                hr: RegExp;
                list: RegExp;
                newline: RegExp;
                table: {
                    exec: () => null;
                };
                text: RegExp;
            };
        };
        inline: {
            normal: {
                _backpedal: {
                    exec: () => null;
                };
                anyPunctuation: RegExp;
                autolink: RegExp;
                blockSkip: RegExp;
                br: RegExp;
                code: RegExp;
                del: {
                    exec: () => null;
                };
                emStrongLDelim: RegExp;
                emStrongRDelimAst: RegExp;
                emStrongRDelimUnd: RegExp;
                escape: RegExp;
                link: RegExp;
                nolink: RegExp;
                punctuation: RegExp;
                reflink: RegExp;
                reflinkSearch: RegExp;
                tag: RegExp;
                text: RegExp;
                url: {
                    exec: () => null;
                };
            };
            gfm: {
                escape: RegExp;
                url: RegExp;
                _backpedal: RegExp;
                del: RegExp;
                text: RegExp;
                anyPunctuation: RegExp;
                autolink: RegExp;
                blockSkip: RegExp;
                br: RegExp;
                code: RegExp;
                emStrongLDelim: RegExp;
                emStrongRDelimAst: RegExp;
                emStrongRDelimUnd: RegExp;
                link: RegExp;
                nolink: RegExp;
                punctuation: RegExp;
                reflink: RegExp;
                reflinkSearch: RegExp;
                tag: RegExp;
            };
            breaks: {
                br: RegExp;
                text: RegExp;
                escape: RegExp;
                url: RegExp;
                _backpedal: RegExp;
                del: RegExp;
                anyPunctuation: RegExp;
                autolink: RegExp;
                blockSkip: RegExp;
                code: RegExp;
                emStrongLDelim: RegExp;
                emStrongRDelimAst: RegExp;
                emStrongRDelimUnd: RegExp;
                link: RegExp;
                nolink: RegExp;
                punctuation: RegExp;
                reflink: RegExp;
                reflinkSearch: RegExp;
                tag: RegExp;
            };
            pedantic: {
                link: RegExp;
                reflink: RegExp;
                _backpedal: {
                    exec: () => null;
                };
                anyPunctuation: RegExp;
                autolink: RegExp;
                blockSkip: RegExp;
                br: RegExp;
                code: RegExp;
                del: {
                    exec: () => null;
                };
                emStrongLDelim: RegExp;
                emStrongRDelimAst: RegExp;
                emStrongRDelimUnd: RegExp;
                escape: RegExp;
                nolink: RegExp;
                punctuation: RegExp;
                reflinkSearch: RegExp;
                tag: RegExp;
                text: RegExp;
                url: {
                    exec: () => null;
                };
            };
        };
    };
    static lex(e: any, t: any): any[];
    static lexInline(e: any, t: any): any[];
    constructor(e: any);
    tokens: any[];
    options: any;
    state: {
        inLink: boolean;
        inRawBlock: boolean;
        top: boolean;
    };
    tokenizer: any;
    inlineQueue: any[];
    lex(e: any): any[];
    blockTokens(e: any, t?: any[], n?: boolean): any[];
    inline(e: any, t?: any[]): any[];
    inlineTokens(e: any, t?: any[]): any[];
}
declare class De {
    constructor(...e: any[]);
    defaults: {
        async: boolean;
        breaks: boolean;
        extensions: null;
        gfm: boolean;
        hooks: null;
        pedantic: boolean;
        renderer: null;
        silent: boolean;
        tokenizer: null;
        walkTokens: null;
    };
    options: (e: any) => this;
    parse: (s: any, i: any) => any;
    parseInline: (s: any, i: any) => any;
    Parser: typeof y;
    Renderer: typeof C;
    TextRenderer: typeof N;
    Lexer: typeof m;
    Tokenizer: typeof L;
    Hooks: typeof E;
    walkTokens(e: any, t: any): any;
    use(...e: any[]): this;
    setOptions(e: any): this;
    lexer(e: any, t: any): any[];
    parser(e: any, t: any): string;
    parseMarkdown(e: any, t: any): (s: any, i: any) => any;
    onError(e: any, t: any): (n: any) => string | Promise<string>;
}
declare class y {
    static parse(e: any, t: any): string;
    static parseInline(e: any, t: any): string;
    constructor(e: any);
    options: any;
    renderer: any;
    textRenderer: N;
    parse(e: any, t?: boolean): string;
    parseInline(e: any, t: any): string;
}
declare class C {
    constructor(e: any);
    options: any;
    parser: any;
    space(e: any): string;
    code({ text: e, lang: t, escaped: n }: {
        text: any;
        lang: any;
        escaped: any;
    }): string;
    blockquote({ tokens: e }: {
        tokens: any;
    }): string;
    html({ text: e }: {
        text: any;
    }): any;
    heading({ tokens: e, depth: t }: {
        tokens: any;
        depth: any;
    }): string;
    hr(e: any): string;
    list(e: any): string;
    listitem(e: any): string;
    checkbox({ checked: e }: {
        checked: any;
    }): string;
    paragraph({ tokens: e }: {
        tokens: any;
    }): string;
    table(e: any): string;
    tablerow({ text: e }: {
        text: any;
    }): string;
    tablecell(e: any): string;
    strong({ tokens: e }: {
        tokens: any;
    }): string;
    em({ tokens: e }: {
        tokens: any;
    }): string;
    codespan({ text: e }: {
        text: any;
    }): string;
    br(e: any): string;
    del({ tokens: e }: {
        tokens: any;
    }): string;
    link({ href: e, title: t, tokens: n }: {
        href: any;
        title: any;
        tokens: any;
    }): any;
    image({ href: e, title: t, text: n }: {
        href: any;
        title: any;
        text: any;
    }): any;
    text(e: any): any;
}
declare class N {
    strong({ text: e }: {
        text: any;
    }): any;
    em({ text: e }: {
        text: any;
    }): any;
    codespan({ text: e }: {
        text: any;
    }): any;
    del({ text: e }: {
        text: any;
    }): any;
    html({ text: e }: {
        text: any;
    }): any;
    text({ text: e }: {
        text: any;
    }): any;
    link({ text: e }: {
        text: any;
    }): string;
    image({ text: e }: {
        text: any;
    }): string;
    br(): string;
}
declare class L {
    constructor(e: any);
    options: any;
    rules: any;
    lexer: any;
    space(e: any): {
        type: string;
        raw: any;
    } | undefined;
    code(e: any): {
        type: string;
        raw: any;
        codeBlockStyle: string;
        text: any;
    } | undefined;
    fences(e: any): {
        type: string;
        raw: any;
        lang: any;
        text: any;
    } | undefined;
    heading(e: any): {
        type: string;
        raw: any;
        depth: any;
        text: any;
        tokens: any;
    } | undefined;
    hr(e: any): {
        type: string;
        raw: any;
    } | undefined;
    blockquote(e: any): any;
    list(e: any): {
        type: string;
        raw: string;
        ordered: boolean;
        start: string | number;
        loose: boolean;
        items: never[];
    } | undefined;
    html(e: any): {
        type: string;
        block: boolean;
        raw: any;
        pre: boolean;
        text: any;
    } | undefined;
    def(e: any): {
        type: string;
        tag: any;
        raw: any;
        href: any;
        title: any;
    } | undefined;
    table(e: any): {
        type: string;
        raw: any;
        header: never[];
        align: never[];
        rows: never[];
    } | undefined;
    lheading(e: any): {
        type: string;
        raw: any;
        depth: number;
        text: any;
        tokens: any;
    } | undefined;
    paragraph(e: any): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    } | undefined;
    text(e: any): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    } | undefined;
    escape(e: any): {
        type: string;
        raw: any;
        text: any;
    } | undefined;
    tag(e: any): {
        type: string;
        raw: any;
        inLink: any;
        inRawBlock: any;
        block: boolean;
        text: any;
    } | undefined;
    link(e: any): {
        type: string;
        raw: any;
        href: any;
        title: any;
        text: any;
    } | undefined;
    reflink(e: any, t: any): {
        type: string;
        raw: any;
        href: any;
        title: any;
        text: any;
    } | {
        type: string;
        raw: any;
        text: any;
    } | undefined;
    emStrong(e: any, t: any, n?: string): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    } | undefined;
    codespan(e: any): {
        type: string;
        raw: any;
        text: any;
    } | undefined;
    br(e: any): {
        type: string;
        raw: any;
    } | undefined;
    del(e: any): {
        type: string;
        raw: any;
        text: any;
        tokens: any;
    } | undefined;
    autolink(e: any): {
        type: string;
        raw: any;
        text: any;
        href: any;
        tokens: {
            type: string;
            raw: any;
            text: any;
        }[];
    } | undefined;
    url(e: any): {
        type: string;
        raw: any;
        text: any;
        href: any;
        tokens: {
            type: string;
            raw: any;
            text: any;
        }[];
    } | undefined;
    inlineText(e: any): {
        type: string;
        raw: any;
        text: any;
    } | undefined;
}
declare namespace T {
    let async: boolean;
    let breaks: boolean;
    let extensions: null;
    let gfm: boolean;
    let hooks: null;
    let pedantic: boolean;
    let renderer: null;
    let silent: boolean;
    let tokenizer: null;
    let walkTokens: null;
}
declare function M(): {
    async: boolean;
    breaks: boolean;
    extensions: null;
    gfm: boolean;
    hooks: null;
    pedantic: boolean;
    renderer: null;
    silent: boolean;
    tokenizer: null;
    walkTokens: null;
};
declare function We(e: any, t: any): any[];
declare function u(h: any, e: any): any;
declare namespace u {
    export function options(h: any): typeof u;
    export function setOptions(h: any): typeof u;
    export { M as getDefaults };
    export { T as defaults };
    export function use(...h: any[]): typeof u;
    export function walkTokens(h: any, e: any): any;
    import parseInline = De.parseInline;
    export { parseInline };
    export { y as Parser };
    import parser = y.parse;
    export { parser };
    export { C as Renderer };
    export { N as TextRenderer };
    export { m as Lexer };
    import lexer = m.lex;
    export { lexer };
    export { L as Tokenizer };
    export { E as Hooks };
    export { u as parse };
}
declare function Oe(h: any): typeof u;
declare function Xe(h: any, e: any): any;
declare namespace Xe { }
declare function Fe(s: any, i: any): any;
declare function Ge(e: any, t: any): string;
declare function He(h: any): typeof u;
declare function Ne(...h: any[]): typeof u;
declare function Ue(h: any, e: any): any;
declare const $: De;
export { E as Hooks, m as Lexer, De as Marked, y as Parser, C as Renderer, N as TextRenderer, L as Tokenizer, T as defaults, M as getDefaults, We as lexer, u as marked, Oe as options, Xe as parse, Fe as parseInline, Ge as parser, He as setOptions, Ne as use, Ue as walkTokens };
//# sourceMappingURL=marked.d.ts.map