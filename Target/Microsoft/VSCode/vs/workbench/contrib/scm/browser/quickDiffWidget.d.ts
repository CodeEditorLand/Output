declare const ie: De;
declare let S: {
    new (e: any, t: any, i: any, s: any): {
        a: any[];
        setSelection(e: any, t: any): void;
        n(e: any, t: any): any;
        render(e: any): void;
        b: import("../../../../base/browser/ui/selectBox/selectBox.js").$f9;
        setOptions(t: any, e: any): void;
        select(t: any): void;
        g(): void;
        m(t: any, e: any): void;
        setFocusable(t: any): void;
        focus(): void;
        blur(): void;
        readonly action: any;
        t: {};
        _context: any;
        _action: any;
        u(t: any): void;
        actionRunner: any;
        j: any;
        isEnabled(): any;
        setActionContext(t: any): void;
        element: any;
        onClick(t: any, e?: boolean): void;
        isFocused(): boolean;
        readonly trapsArrowNavigation: boolean;
        z(): void;
        C(): void;
        D(): any;
        F(): any;
        G(): void;
        f: any;
        H(): void;
        I(): void;
        J(): void;
        dispose(): void;
        q: Q;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class C extends R {
    constructor(e: any);
    a: any;
    run(e: any): Promise<any>;
}
declare let g: {
    new (e: any, t: any, i: any, s: any, o: any): {
        r: any;
        s: any;
        t: any;
        u: any;
        a: any;
        b: any;
        g: Readonly<{
            dispose(): void;
        }> | undefined;
        h: {
            lineNumber: any;
        } | null;
        j: boolean;
        m: Q;
        n: HTMLStyleElement;
        f: any;
        w(): void;
        canNavigate(): boolean;
        refresh(): void;
        next(e: any): void;
        previous(e: any): void;
        close(): void;
        y(): boolean;
        z(e: any): void;
        C(e: any): void;
        D(e: any): void;
        dispose(): void;
        q: Q;
        B(t: any): any;
    };
    ID: string | undefined;
    get(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class se extends x {
    d: any;
    run(e: any): void;
}
declare class re extends x {
    d: any;
    run(e: any): void;
}
declare class Ae extends x {
    constructor();
    run(e: any): Promise<void>;
}
declare class Pe extends x {
    constructor();
    run(e: any): Promise<void>;
}
import { $Wn as De } from "../../../../platform/contextkey/common/contextkey.js";
import { $ud as Q } from "../../../../base/common/lifecycle.js";
import { $bm as R } from "../../../../base/common/actions.js";
import { $Eab as x } from "../../../../editor/browser/editorExtensions.js";
export { ie as $ipc, S as $jpc, C as $kpc, g as $lpc, se as $mpc, re as $npc, Ae as $opc, Pe as $ppc };
//# sourceMappingURL=quickDiffWidget.d.ts.map