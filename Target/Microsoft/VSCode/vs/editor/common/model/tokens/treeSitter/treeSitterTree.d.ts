declare let O: {
    new (n: any, t: any, e: any, o: any, s: any, i: any, a: any): {
        languageId: any;
        n: any;
        s: any;
        t: any;
        textModel: any;
        u: any;
        w: any;
        f: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        tree: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        g: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        treeLastParsedVersion: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        m: S;
        handleContentChange(n: any, t: any): void;
        readonly ranges: any;
        getInjectionTrees(n: any, t: any): void;
        y(n: any): void;
        z(n: any, t: any): {
            startIndex: any;
            endIndex: any;
            startPosition: any;
            endPosition: any;
        }[];
        C(n: any, t: any, e: any): any;
        D(n: any): any;
        F(n: any): Promise<any>;
        h: any;
        j: any;
        G(): Promise<any>;
        H(n: any): Promise<any>;
        I(n: any): any;
        J(n: any): any[];
        L(n: any, t: any, e: any): void;
        createParsedTreeSync(n: any): any;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare function _(d: any, n: any): boolean;
declare function N(d: any, n: any): boolean;
import { $Wh as S } from "../../../../../base/common/async.js";
export { O as $RH, _ as $SH, N as $TH };
//# sourceMappingURL=treeSitterTree.d.ts.map