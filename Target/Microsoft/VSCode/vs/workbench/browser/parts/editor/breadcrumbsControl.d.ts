declare let a: {
    new (e: any, i: any, t: any, s: any, o: any, n: any, d: any, c: any, l: any, b: any, u: any, f: any): {
        readonly onDidVisibilityChange: any;
        r: any;
        s: any;
        t: any;
        u: any;
        v: any;
        w: any;
        z: any;
        A: any;
        B: any;
        j: _;
        k: _;
        m: he;
        n: boolean;
        q: any;
        domNode: HTMLDivElement;
        f: {
            name: any;
            onDidChange: any;
            getValue(s: any): any;
            updateValue(s: any, n: any): any;
            dispose(): void;
        };
        g: {
            name: any;
            onDidChange: any;
            getValue(s: any): any;
            updateValue(s: any, n: any): any;
            dispose(): void;
        };
        h: {
            name: any;
            onDidChange: any;
            getValue(s: any): any;
            updateValue(s: any, n: any): any;
            dispose(): void;
        };
        l: any;
        i: re;
        b: any;
        c: any;
        d: any;
        p: any;
        dispose(): void;
        readonly model: any;
        layout(e: any): void;
        isHidden(): boolean;
        hide(): void;
        C(): void;
        revealLast(): void;
        update(): boolean;
        D(e: any): void;
        E(e: any): void;
        o: any;
        F(): void;
        G(e: any, i: any, t: any, s?: boolean): Promise<void>;
        H(e: any): -1 | -2 | undefined;
    };
    HEIGHT: number | undefined;
    a: {
        default: number;
        large: number;
    } | undefined;
    Payload_Reveal: {} | undefined;
    Payload_RevealAside: {} | undefined;
    Payload_Pick: {} | undefined;
    CK_BreadcrumbsPossible: V | undefined;
    CK_BreadcrumbsVisible: V | undefined;
    CK_BreadcrumbsActive: V | undefined;
};
declare let X: {
    new (e: any, i: any, t: any, s: any, o: any, n: any): {
        readonly control: any;
        readonly onDidEnablementChange: any;
        readonly onDidVisibilityChange: any;
        g: any;
        h: any;
        i: any;
        j: any;
        a: _;
        b: _;
        d: any;
        f: any;
        c: any;
        k(): any;
        dispose(): void;
    };
};
import { $ud as _ } from "../../../../base/common/lifecycle.js";
import { $wd as he } from "../../../../base/common/lifecycle.js";
import { $F9 as re } from "../../../../base/browser/ui/breadcrumbs/breadcrumbsWidget.js";
import { $Wn as V } from "../../../../platform/contextkey/common/contextkey.js";
export { a as $wLb, X as $xLb };
//# sourceMappingURL=breadcrumbsControl.d.ts.map