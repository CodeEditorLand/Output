declare class p {
    static compareByLabel(e: any, t: any): 0 | 1 | -1;
    constructor(e: any, t: any);
    snippet: any;
    label: {
        label: any;
        description: any;
    };
    detail: any;
    insertText: any;
    extensionId: any;
    range: any;
    sortText: string;
    kind: number;
    insertTextRules: number;
    command: {
        id: string;
        title: string;
        arguments: any[];
    };
    resolve(): this;
    documentation: O | undefined;
}
declare let _: {
    new (e: any, t: any, n: any): {
        c: any;
        d: any;
        e: any;
        _debugDisplayName: string;
        provideCompletionItems(e: any, t: any, n: any): Promise<{
            suggestions: p[];
            duration: number;
        }>;
        f(e: any): void;
        resolveCompletionItem(e: any): any;
        g(e: any, t: any, n: any, o: any): {
            startColumn: any;
            prefixLow: any;
            isWord: boolean;
        }[];
        h(e: any, t: any): any;
    };
};
import { $Vj as O } from "../../../../base/common/htmlContent.js";
export { p as $SFb, _ as $TFb };
//# sourceMappingURL=snippetCompletionProvider.d.ts.map