declare let k: {
    new (t: any, e: any, i: any): {
        b: any;
        c: any;
        d: any;
        a: pt;
        apply(t: any, e: any, i: any): Promise<void>;
        f(t: any, e: any): Promise<any>;
        g(t: any): Promise<number>;
        h(t: any, e: any): Promise<boolean>;
        discard(t: any, e: any): void;
    };
};
declare const He: "vscode-local-file";
declare function Fe(c: any): {
    uri: any;
    range: ut | undefined;
};
declare let H: {
    new (t: any, e: any, i: any, n: any, o: any, s: any, u: any, I: any, S: any): {
        readonly r: any;
        s: any;
        menuId: any;
        t: any;
        u: any;
        w: any;
        a: any;
        onDidChangeContentHeight: any;
        j: number;
        m: boolean;
        element: HTMLElement;
        n: any;
        c: any;
        editor: any;
        b: any;
        f: any;
        g: any;
        dispose(): void;
        readonly uri: any;
        y(t: any, e: any, i: any): any;
        focus(): void;
        z(): void;
        C(): void;
        D(): any;
        layout(t: any): void;
        F(): any;
        render(t: any, e: any): Promise<void>;
        h: any;
        reset(): void;
        G(): void;
        H(t: any): Promise<void>;
        I(): string;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let F: {
    new (t: any, e: any): {
        a: any;
        provideTextContent(t: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let W: {
    new (t: any, e: any, i: any, n: any, o: any, s: any, u: any, I: any, S: any, C: any, B: any): {
        n: any;
        menuId: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        a: any;
        onDidChangeContentHeight: any;
        j: any;
        m: number;
        element: HTMLElement;
        h: any;
        b: any;
        c: any;
        f: any;
        g: any;
        readonly uri: any;
        y(t: any, e: any, i: any): any;
        focus(): void;
        z(): void;
        C(): void;
        D(): {
            wordWrap: any;
            fontLigatures: any;
            bracketPairColorization: any;
            fontFamily: any;
            fontSize: any;
            fontWeight: any;
            lineHeight: any;
        };
        layout(t: any): void;
        render(t: any, e: any, i: any): Promise<void>;
        reset(): void;
        F(): void;
        G(t: any, e: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $qQb as pt } from "../../../../editor/common/services/modelService.js";
import { $eC as ut } from "../../../../editor/common/core/range.js";
export { k as $1Qb, He as $VQb, Fe as $WQb, H as $XQb, F as $YQb, W as $ZQb };
//# sourceMappingURL=codeBlockPart.d.ts.map