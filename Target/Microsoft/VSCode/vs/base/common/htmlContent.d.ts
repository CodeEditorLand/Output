export class MarkdownString {
    static lift(dto: any): MarkdownString;
    constructor(value?: string, isTrustedOrOptions?: boolean);
    value: string;
    isTrusted: any;
    supportThemeIcons: any;
    supportHtml: any;
    supportAlertSyntax: any;
    appendText(value: any, newlineStyle?: number): this;
    appendMarkdown(value: any): this;
    appendCodeblock(langId: any, code: any): this;
    appendLink(target: any, label: any, title: any): this;
    _escape(value: any, ch: any): any;
}
export var MarkdownStringTextNewlineStyle: any;
export function appendEscapedMarkdownCodeBlockFence(code: any, langId: any): string;
export function createCommandUri(commandId: any, ...commandArgs: any[]): {
    _formatted: string | null;
    _fsPath: any;
    get fsPath(): any;
    toString(skipEncoding?: boolean): string;
    toJSON(): {
        $mid: number;
    };
    scheme: any;
    authority: any;
    path: any;
    query: any;
    fragment: any;
    with(change: any): /*elided*/ any;
};
export function createMarkdownCommandLink(command: any, escapeTokens?: boolean): string;
export function createMarkdownLink(text: any, href: any, title: any, escapeTokens?: boolean): string;
export function escapeDoubleQuotes(input: any): any;
export function escapeMarkdownSyntaxTokens(text: any): any;
export function isEmptyMarkdownString(oneOrMany: any): boolean;
export function isMarkdownString(thing: any): boolean;
export function markdownStringEqual(a: any, b: any): boolean;
export function parseHrefAndDimensions(href: any): {
    href: any;
    dimensions: string[];
};
export function removeMarkdownEscapes(text: any): any;
//# sourceMappingURL=htmlContent.d.ts.map