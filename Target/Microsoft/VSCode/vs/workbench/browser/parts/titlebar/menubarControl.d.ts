declare class y extends ee {
    constructor(e: any, i: any, t: any, n: any, o: any, r: any, s: any, h: any, c: any, v: any, B: any, C: any, I: any, A: any);
    n: any;
    r: any;
    s: any;
    t: any;
    u: any;
    w: any;
    y: any;
    z: any;
    C: any;
    D: any;
    F: any;
    G: any;
    H: any;
    I: any;
    a: string[];
    c: {};
    f: {};
    h: {
        files: never[];
        workspaces: never[];
    };
    b: any;
    g: any;
    j: any;
    L(): void;
    M(): void;
    N(): void;
    O(e: any): any;
    P(): void;
    Q(): void;
    R(): (M | ({
        id: any;
        label: any;
        tooltip: any;
        class: any;
        enabled: any;
        checked: any;
        run: (...t: any[]) => Promise<any>;
    } & {
        uri: any;
        remoteAuthority: any;
    }))[];
    S(e: any): void;
    U(e: any): void;
    get W(): boolean;
    X(): void;
    Y(e: any): {
        id: any;
        label: any;
        tooltip: any;
        class: any;
        enabled: any;
        checked: any;
        run: (...t: any[]) => Promise<any>;
    } & {
        uri: any;
        remoteAuthority: any;
    };
    Z(): void;
}
declare let V: {
    new (e: any, i: any, t: any, n: any, o: any, r: any, s: any, h: any, c: any, v: any, B: any, C: any, I: any, A: any, z: any): {
        jb: any;
        bb: boolean;
        cb: boolean;
        db: boolean;
        eb: boolean;
        gb: any;
        tb: any;
        ub: any;
        hb: any;
        ib: any;
        fb: any;
        h: {
            files: never[];
            workspaces: never[];
        };
        J(e: any): void;
        lb(): b | null;
        readonly mb: any;
        readonly nb: boolean;
        ob(e: any, i: any): void;
        readonly pb: any;
        readonly qb: {
            horizontal: any;
            vertical: any;
        } | undefined;
        rb(e: any): void;
        sb(e: any): any[];
        vb(e: any): void;
        $: any;
        wb(): (b | M)[];
        xb(): {
            enableMnemonics: any;
            disableAltFocus: boolean;
            visibility: any;
            actionRunner: any;
            getKeybinding: (e: any) => any;
            alwaysOnMnemonics: boolean;
            compactMode: {
                horizontal: any;
                vertical: any;
            } | undefined;
            getCompactMenuActions: () => (b | M)[];
        };
        S(e: any): void;
        P(): void;
        X(): void;
        Q(): void;
        L(): void;
        readonly onVisibilityChange: any;
        readonly onFocusStateChange: any;
        getMenubarItemsDimensions(): L;
        create(e: any): any;
        ab: any;
        layout(e: any): void;
        toggleFocus(): void;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        a: string[];
        c: {};
        f: {};
        b: any;
        g: any;
        j: any;
        M(): void;
        N(): void;
        O(e: any): any;
        R(): (M | ({
            id: any;
            label: any;
            tooltip: any;
            class: any;
            enabled: any;
            checked: any;
            run: (...t: any[]) => Promise<any>;
        } & {
            uri: any;
            remoteAuthority: any;
        }))[];
        U(e: any): void;
        readonly W: boolean;
        Y(e: any): {
            id: any;
            label: any;
            tooltip: any;
            class: any;
            enabled: any;
            checked: any;
            run: (...t: any[]) => Promise<any>;
        } & {
            uri: any;
            remoteAuthority: any;
        };
        Z(): void;
        q: w;
        dispose(): void;
        B(t: any): any;
    };
    m: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as ee } from "../../../../base/common/lifecycle.js";
import { $dm as M } from "../../../../base/common/actions.js";
import { $bm as b } from "../../../../base/common/actions.js";
import { $q6 as L } from "../../../../base/browser/dom.js";
import { $ud as w } from "../../../../base/common/lifecycle.js";
export { y as $a4b, V as $b4b };
//# sourceMappingURL=menubarControl.d.ts.map