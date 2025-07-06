export { x as $wfc };
declare let x: {
    new (t: any, e: any, s: any, n: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        _debugDisplayName: string;
        triggerCharacters: string[];
        provideCompletionItems(t: any, e: any, s: any, n: any): Promise<{
            suggestions: any[];
        } | undefined>;
        g(t: any, e: any, s: any, n: any, r: any): Promise<{
            suggestions: {
                label: string;
                kind: number;
                insertText: any;
                insertTextRules: number;
                range: h;
            }[];
        }>;
        h(t: any, e: any, s: any, n: any, r: any): Promise<{
            suggestions: any[];
        } | undefined>;
        j(t: any): Set<string>;
        m(t: any, e: any, s: any, n: any): void;
        n(t: any, e: any): any[];
        r(t: any): any[];
        s(t: any, e: any, s: any): {
            suggestions: any[];
        } | undefined;
        q: import("../../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $eC as h } from "../../../../../../editor/common/core/range.js";
//# sourceMappingURL=promptHeaderAutocompletion.d.ts.map