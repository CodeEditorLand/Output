declare class x extends k {
    constructor(t: any);
    h: any;
    a: any;
    onDidChangeCompositeBarActionItem: any;
    f: any;
    onDidChangeActivity: any;
    g: any[];
    set compositeBarActionItem(t: any);
    get compositeBarActionItem(): any;
    set activities(t: any[]);
    get activities(): any[];
    activate(): void;
    deactivate(): void;
}
declare let $: {
    new (t: any, s: any, i: any, e: any, o: any, n: any, r: any): {
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        w: any;
        t: any;
        readonly S: any;
        U(): void;
        render(t: any): void;
        c: any;
        L: NodeJS.Timeout | undefined;
        g: any;
        h: any;
        n: any;
        W(t: any): void;
        X(): void;
        Y(): any[];
        Z(): void;
        ab(t: any): {
            badges: any;
            type: string;
        } | {
            badges: never[];
            type: undefined;
        };
        C(): void;
        cb(): void;
        db(): any;
        M: any;
        eb(): any;
        dispose(): void;
        readonly action: any;
        _context: any;
        _action: any;
        u(t: any): void;
        actionRunner: any;
        j: any;
        isEnabled(): any;
        setActionContext(t: any): void;
        element: any;
        onClick(t: any, e?: boolean): void;
        focus(): void;
        isFocused(): boolean;
        blur(): void;
        setFocusable(t: any): void;
        readonly trapsArrowNavigation: boolean;
        z(): void;
        D(): any;
        F(): any;
        G(): void;
        f: any;
        H(): void;
        I(): void;
        J(): void;
        q: Q;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Ot extends x {
    c: any;
    run(): Promise<void>;
}
declare let R: {
    new (t: any, s: any, i: any, e: any, o: any, n: any, r: any, a: any, g: any, b: any, u: any, f: any): {
        a: any;
        s: any;
        fb: any;
        gb: any;
        hb: any;
        showMenu(): void;
        ib(): any;
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        w: any;
        t: any;
        readonly S: any;
        U(): void;
        render(t: any): void;
        c: any;
        L: NodeJS.Timeout | undefined;
        g: any;
        h: any;
        n: any;
        W(t: any): void;
        X(): void;
        Y(): any[];
        Z(): void;
        ab(t: any): {
            badges: any;
            type: string;
        } | {
            badges: never[];
            type: undefined;
        };
        C(): void;
        cb(): void;
        db(): any;
        M: any;
        eb(): any;
        dispose(): void;
        readonly action: any;
        _context: any;
        _action: any;
        u(t: any): void;
        actionRunner: any;
        j: any;
        isEnabled(): any;
        setActionContext(t: any): void;
        element: any;
        onClick(t: any, e?: boolean): void;
        focus(): void;
        isFocused(): boolean;
        blur(): void;
        setFocusable(t: any): void;
        readonly trapsArrowNavigation: boolean;
        z(): void;
        D(): any;
        F(): any;
        G(): void;
        f: any;
        H(): void;
        I(): void;
        J(): void;
        q: Q;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let j: {
    new (t: any, s: any, i: any, e: any, o: any, n: any, r: any, a: any, g: any, b: any, u: any, f: any, m: any, v: any, p: any): {
        a: any;
        s: any;
        fb: any;
        gb: any;
        hb: any;
        ib: any;
        jb: any;
        kb: any;
        render(t: any): void;
        lb(t: any, s: any, i: any): {
            verticallyBefore: boolean;
            horizontallyBefore: boolean;
        } | undefined;
        mb(t: any): void;
        J(): void;
        z(): void;
        dispose(): void;
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        w: any;
        t: any;
        readonly S: any;
        U(): void;
        c: any;
        L: NodeJS.Timeout | undefined;
        g: any;
        h: any;
        n: any;
        W(t: any): void;
        X(): void;
        Y(): any[];
        Z(): void;
        ab(t: any): {
            badges: any;
            type: string;
        } | {
            badges: never[];
            type: undefined;
        };
        C(): void;
        cb(): void;
        db(): any;
        M: any;
        eb(): any;
        readonly action: any;
        _context: any;
        _action: any;
        u(t: any): void;
        actionRunner: any;
        j: any;
        isEnabled(): any;
        setActionContext(t: any): void;
        element: any;
        onClick(t: any, e?: boolean): void;
        focus(): void;
        isFocused(): boolean;
        blur(): void;
        setFocusable(t: any): void;
        readonly trapsArrowNavigation: boolean;
        D(): any;
        F(): any;
        G(): void;
        f: any;
        H(): void;
        I(): void;
        q: Q;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Ut extends k {
    constructor(t: any, s: any);
    a: any;
    f: any;
    run(t: any): Promise<void>;
}
declare class Rt extends k {
    constructor(t: any, s: any);
    a: any;
    f: any;
    checked: boolean;
    run(t: any): Promise<void>;
}
declare class jt extends ct {
    constructor(t: any, s: any, i: any);
    a: any;
    c: any;
    run(t: any): Promise<void>;
}
import { $bm as k } from "../../../base/common/actions.js";
import { $ud as Q } from "../../../base/common/lifecycle.js";
import { $KI as ct } from "../../../platform/actions/common/actions.js";
export { x as $hyb, $ as $iyb, Ot as $jyb, R as $kyb, j as $lyb, Ut as $myb, Rt as $nyb, jt as $oyb };
//# sourceMappingURL=compositeBarActions.d.ts.map