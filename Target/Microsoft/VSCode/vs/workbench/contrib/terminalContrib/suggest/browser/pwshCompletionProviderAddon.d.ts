declare let p: {
    new (e: any, s: any): {
        r: any;
        id: any;
        isBuiltin: boolean;
        shellTypes: string[];
        a: number;
        h: boolean;
        isPasting: boolean;
        j: C | null;
        m: any;
        onDidReceiveCompletions: any;
        n: any;
        onDidRequestSendText: any;
        g: any;
        activate(e: any): void;
        b: any;
        s(e: any): boolean;
        t(e: any, s: any, n: any, i: any): void;
        u(e: any): void;
        w(): Promise<any>;
        provideCompletions(e: any, s: any, n: any, i: any): Promise<any>;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function A(t: any, e: any, s: any): {
    label: any;
    provider: string | undefined;
    icon: any;
    detail: any;
    kind: any;
    isKeyword: boolean;
    replacementIndex: any;
    replacementLength: any;
}[];
declare var a: any;
import { $$h as C } from "../../../../../base/common/async.js";
export { p as $Vuc, A as $Wuc, a as VSCodeSuggestOscPt };
//# sourceMappingURL=pwshCompletionProviderAddon.d.ts.map