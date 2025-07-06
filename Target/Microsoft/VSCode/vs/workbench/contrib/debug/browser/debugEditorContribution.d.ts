declare const we: any;
declare const Ce: any;
declare function St(l: any): q;
declare function z(l: any, t: any, e: any, s?: number, i?: number): ({
    range: {
        startLineNumber: any;
        endLineNumber: any;
        startColumn: number;
        endColumn: number;
    };
    options: {
        description: string;
        after: {
            content: string;
            cursorStops: any;
            inlineClassName?: never;
            inlineClassNameAffectsLetterSpacing?: never;
        };
        showIfCollapsed: boolean;
        hoverMessage?: never;
    };
} | {
    range: {
        startLineNumber: any;
        endLineNumber: any;
        startColumn: number;
        endColumn: number;
    };
    options: {
        description: string;
        after: {
            content: any;
            inlineClassName: string;
            inlineClassNameAffectsLetterSpacing: boolean;
            cursorStops: any;
        };
        showIfCollapsed: boolean;
        hoverMessage: q;
    };
})[];
declare let V: {
    new (t: any, e: any, s: any, i: any, o: any, n: any, r: any, c: any, a: any, h: any): {
        x: any;
        y: any;
        z: any;
        A: any;
        B: any;
        C: any;
        D: any;
        E: any;
        g: boolean;
        j: boolean;
        m: W;
        o: boolean;
        q: st;
        w: W;
        p: any;
        u: any;
        d: any;
        c: (st | W)[];
        h: any;
        F(): void;
        H(): void;
        t: any;
        I(): void;
        J(t: any, e: any): void;
        showHover(t: any, e: any, s: any): Promise<void>;
        K(): void;
        L(t: any, e: any): void;
        M(t: any): Promise<void>;
        readonly N: number;
        readonly O: P;
        P(): void;
        Q(t: any): void;
        R(t: any): void;
        f: {
            position: any;
            event: any;
        } | undefined;
        S(t: any): void;
        T(): Promise<void>;
        U(t: any, e: any, s: any, i: any): void;
        k: any;
        closeExceptionWidget(): void;
        addLaunchConfiguration(): Promise<void>;
        readonly V: P;
        readonly W: P;
        X(t: any): Promise<void>;
        dispose(): void;
    };
};
import { $Vj as q } from "../../../../base/common/htmlContent.js";
import { $wd as W } from "../../../../base/common/lifecycle.js";
import { $ud as st } from "../../../../base/common/lifecycle.js";
import { $Zh as P } from "../../../../base/common/async.js";
export { we as $ibc, Ce as $jbc, St as $kbc, z as $lbc, V as $mbc };
//# sourceMappingURL=debugEditorContribution.d.ts.map