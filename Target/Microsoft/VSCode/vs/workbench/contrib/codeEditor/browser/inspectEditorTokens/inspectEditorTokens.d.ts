export { T as $UQb };
declare let T: {
    new (e: any, s: any, i: any, o: any, n: any, r: any, a: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: z | null;
        dispose(): void;
        launch(): void;
        stop(): void;
        toggle(): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    ID: string | undefined;
    get(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class z extends B {
    constructor(e: any, s: any, i: any, o: any, n: any, r: any, a: any);
    allowEditorOverflow: boolean;
    b: boolean;
    c: any;
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    n: any;
    r: any;
    s: HTMLDivElement;
    u: G;
    getId(): string | undefined;
    w(e: any): void;
    y(): any;
    z(e: any, s: any, i: any, o: any): void;
    C(e: any, s: any): any[];
    D(e: any): {
        languageId: any;
        tokenType: number;
        bold: boolean | undefined;
        italic: boolean | undefined;
        underline: boolean | undefined;
        strikethrough: boolean | undefined;
        foreground: any;
        background: any;
    };
    F(e: any): "Other" | "Comment" | "String" | "RegEx" | "??";
    G(e: any, s: any): {
        token: any;
        metadata: {
            languageId: any;
            tokenType: number;
            bold: boolean | undefined;
            italic: boolean | undefined;
            underline: boolean | undefined;
            strikethrough: boolean | undefined;
            foreground: any;
            background: any;
        };
    };
    H(e: any, s: any): any;
    I(e: any): any;
    J(e: any): Promise<{
        tokens: any;
        legend: any;
    } | null>;
    L(e: any, s: any): {
        type: any;
        modifiers: any[];
        range: j;
        metadata: {
            languageId: undefined;
            tokenType: number;
            bold: any;
            italic: any;
            underline: any;
            strikethrough: any;
            foreground: any;
            background: undefined;
        } | undefined;
        definitions: {};
    } | null;
    M(e: any, s: any): any;
    N(e: any, s: any): any[] | null;
    O(e: any, s: any): any[];
    P(e: any, s: any): any;
    getDomNode(): HTMLDivElement;
    getPosition(): {
        position: any;
        preference: number[];
    };
}
import { $vd as B } from "../../../../../base/common/lifecycle.js";
import { $qf as G } from "../../../../../base/common/cancellation.js";
import { $eC as j } from "../../../../../editor/common/core/range.js";
//# sourceMappingURL=inspectEditorTokens.d.ts.map