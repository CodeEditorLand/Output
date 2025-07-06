declare function ot(e: any, t: any, n: any): number;
declare function It(e: any): import("../../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
declare const Rt_base: {
    new (t: any, e: any, i: any, s: any, n: any, r: any, l: any, u: any): {
        bb: any;
        cb: any;
        db: any;
        eb: any;
        fb: any;
        gb: any;
        hb: any;
        Y: boolean;
        Z: any;
        ab: any;
        readonly ib: any;
        readonly jb: any;
        onClick(t: any): Promise<void>;
        render(t: any): void;
        C(): void;
        F(): any;
        I(): void;
        ob(t: any): void;
        t: any;
        N: string;
        L: HTMLAnchorElement | undefined;
        O(): "button" | "menuitem" | "presentation" | "tab";
        focus(): void;
        isFocused(): boolean;
        blur(): void;
        setFocusable(t: any): void;
        z(): void;
        H(): void;
        J(): void;
        readonly action: any;
        _context: any;
        _action: any;
        u(t: any): void;
        actionRunner: any;
        j: any;
        isEnabled(): any;
        setActionContext(t: any): void;
        element: any;
        readonly trapsArrowNavigation: boolean;
        D(): any;
        G(): void;
        f: any;
        dispose(): void;
        q: import("../../../../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Rt extends Rt_base {
    constructor(...args: any[]);
    b: any;
}
declare class q {
    constructor(t: any);
    scheme: any;
    getUniqueUri(): {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
}
declare function Mt(e: any, t: any): nt[];
declare function Ot(...e: any[]): string;
declare function Wt(e: any, t: any): et;
declare class rt {
    a: string;
    moveTo(t: any): this;
    lineTo(t: any): this;
    curveTo(t: any, n: any): this;
    curveTo2(t: any, n: any, o: any): this;
    build(): string;
}
declare function qt(e: any, t: any, n: any, o?: {}): string;
declare function Bt(e: any): import("../../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
declare function Nt(e: any, t: any): {
    top: import("../../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
    left: import("../../../../../../../base/common/observableInternal/observables/observableValue.js").$De;
};
declare function St(e: any): {
    left: import("../../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    top: import("../../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    width: import("../../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    height: import("../../../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
};
declare function Ct(e: any, t: any, n: any): number;
declare function yt(e: any, t: any, n: any): any;
declare function wt(e: any, t: any, n: any, o: any): {
    prefixTrim: number;
    prefixLeftOffset: any;
};
import { $pM as nt } from "../../../../../../common/diff/rangeMapping.js";
import { $rF as et } from "../../../../../../common/core/edits/textEdit.js";
export { ot as $Aqb, It as $Bqb, Rt as $Cqb, q as $Dqb, Mt as $Eqb, Ot as $Fqb, Wt as $Gqb, rt as $Hqb, qt as $Iqb, Bt as $Jqb, Nt as $Kqb, St as $Lqb, Ct as $xqb, yt as $yqb, wt as $zqb };
//# sourceMappingURL=utils.d.ts.map