export { o as $Akb };
declare let o: {
    new (t: any, e: any, i: any, r: any, n: any): {
        k: any;
        l: any;
        m: any;
        n: any;
        f: P;
        g: number;
        a: any;
        b: any;
        c: any;
        dispose(): void;
        apply(t: any, e: any): void;
        insert(t: any, e: any): void;
        p(t: any, e: any): void;
        d: {
            e: any;
            f: any;
            g: {
                overwriteBefore: number;
                overwriteAfter: number;
                adjustWhitespace: boolean;
                clipboardText: undefined;
                overtypingCapturer: undefined;
            };
            h: any;
            c: any[];
            d: any[];
            dispose(): void;
            _logInfo(): string;
            insert(e: any): void;
            merge(e: any, t?: {
                overwriteBefore: number;
                overwriteAfter: number;
                adjustWhitespace: boolean;
                clipboardText: undefined;
                overtypingCapturer: undefined;
            }): void;
            next(): void;
            prev(): void;
            j(e: any): any[];
            readonly isAtFirstPlaceholder: any;
            readonly isAtLastPlaceholder: any;
            readonly hasPlaceholder: any;
            readonly hasChoice: any;
            readonly activeChoice: any;
            isSelectionWithinPlaceholders(): boolean;
            getEnclosingRange(): any;
        } | undefined;
        j: {
            provider: {
                _debugDisplayName: string;
                provideCompletionItems: (x: any, C: any) => {
                    suggestions: {
                        kind: number;
                        label: any;
                        insertText: any;
                        sortText: string;
                        range: any;
                        filterText: string | undefined;
                        command: {
                            id: string;
                            title: any;
                        };
                    }[];
                } | undefined;
            };
            enable: () => void;
            disable: () => void;
        } | undefined;
        q(): void;
        r(): void;
        h: any;
        finish(): void;
        cancel(t?: boolean): void;
        prev(): void;
        next(): void;
        isInSnippet(): boolean;
        getSessionEnclosingRange(): any;
    };
    ID: string | undefined;
    get(t: any): any;
    InSnippetMode: k | undefined;
    HasNextTabstop: k | undefined;
    HasPrevTabstop: k | undefined;
};
import { $ud as P } from "../../../../base/common/lifecycle.js";
import { $Wn as k } from "../../../../platform/contextkey/common/contextkey.js";
//# sourceMappingURL=snippetController2.d.ts.map