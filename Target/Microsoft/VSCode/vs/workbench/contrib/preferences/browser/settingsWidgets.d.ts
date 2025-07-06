declare class dt {
    constructor(t: any);
    get items(): any[];
    a: any[];
    b: any;
    d: any;
    f: any;
    setEditKey(t: any): void;
    setValue(t: any): void;
    select(t: any): void;
    getSelected(): any;
    selectNext(): void;
    selectPrevious(): void;
}
declare let x: {
    new (t: any, e: any, s: any, i: any): {
        readonly domNode: any;
        readonly items: any[];
        readonly j: boolean;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any[];
        f: any;
        g: dt;
        h: any;
        onDidChangeList: any;
        a: any;
        setValue(t: any): void;
        F(): void;
        G(): boolean;
        H(): void;
        I(t: any): X;
        J(t: any): void;
        cancelEdit(): void;
        L(t: any, e: any, s: any): void;
        M(t: any, e: any, s: any): any;
        N(t: any, e: any, s: any): any;
        O(): HTMLElement;
        P(t: any): void;
        Q(t: any): void;
        R(t: any): number;
        S(t: any): void;
        U(): void;
        W(): void;
        q: tt;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let E: {
    new (t: any, e: any, s: any, i: any, n: any): {
        setValue(t: any, e: any): void;
        X: any;
        Y: boolean;
        Z: any;
        t(): {
            value: {
                type: string;
                data: string;
            };
        };
        G(): boolean;
        u(): string[];
        w(t: any, e: any): {
            class: any;
            enabled: boolean;
            id: string;
            tooltip: any;
            run: () => void;
        }[];
        y(t: any, e: any): {
            rowElement: HTMLElement;
            keyElement: any;
            valueElement: any;
        };
        gb(t: any, e: any, s: any): void;
        eb: {
            element: any;
            item: any;
            itemIndex: any;
        } | undefined;
        z(t: any, e: any): HTMLElement;
        isItemNew(t: any): boolean;
        C(t: any, { value: e, sibling: s }: {
            value: any;
            sibling: any;
        }): void;
        D(): {
            deleteActionTooltip: any;
            editActionTooltip: any;
            addButtonLabel: any;
            inputPlaceholder: any;
            siblingInputPlaceholder: any;
        };
        kb(t: any, e: any): $;
        lb(t: any, e: any): X;
        readonly domNode: any;
        readonly items: any[];
        readonly j: boolean;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any[];
        f: any;
        g: dt;
        h: any;
        onDidChangeList: any;
        a: any;
        F(): void;
        H(): void;
        I(t: any): X;
        J(t: any): void;
        cancelEdit(): void;
        L(t: any, e: any, s: any): void;
        M(t: any, e: any, s: any): any;
        N(t: any, e: any, s: any): any;
        O(): HTMLElement;
        P(t: any): void;
        Q(t: any): void;
        R(t: any): number;
        S(t: any): void;
        U(): void;
        W(): void;
        q: tt;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const Pt_base: {
    new (t: any, e: any, s: any, i: any, n: any): {
        setValue(t: any, e: any): void;
        X: any;
        Y: boolean;
        Z: any;
        t(): {
            value: {
                type: string;
                data: string;
            };
        };
        G(): boolean;
        u(): string[];
        w(t: any, e: any): {
            class: any;
            enabled: boolean;
            id: string;
            tooltip: any;
            run: () => void;
        }[];
        y(t: any, e: any): {
            rowElement: HTMLElement;
            keyElement: any;
            valueElement: any;
        };
        gb(t: any, e: any, s: any): void;
        eb: {
            element: any;
            item: any;
            itemIndex: any;
        } | undefined;
        z(t: any, e: any): HTMLElement;
        isItemNew(t: any): boolean;
        C(t: any, { value: e, sibling: s }: {
            value: any;
            sibling: any;
        }): void;
        D(): {
            deleteActionTooltip: any;
            editActionTooltip: any;
            addButtonLabel: any;
            inputPlaceholder: any;
            siblingInputPlaceholder: any;
        };
        kb(t: any, e: any): $;
        lb(t: any, e: any): X;
        readonly domNode: any;
        readonly items: any[];
        readonly j: boolean;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any[];
        f: any;
        g: dt;
        h: any;
        onDidChangeList: any;
        a: any;
        F(): void;
        H(): void;
        I(t: any): X;
        J(t: any): void;
        cancelEdit(): void;
        L(t: any, e: any, s: any): void;
        M(t: any, e: any, s: any): any;
        N(t: any, e: any, s: any): any;
        O(): HTMLElement;
        P(t: any): void;
        Q(t: any): void;
        R(t: any): number;
        S(t: any): void;
        U(): void;
        W(): void;
        q: tt;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Pt extends Pt_base {
    C(t: any, e: any): void;
}
declare const Ht_base: {
    new (t: any, e: any, s: any, i: any, n: any): {
        setValue(t: any, e: any): void;
        X: any;
        Y: boolean;
        Z: any;
        t(): {
            value: {
                type: string;
                data: string;
            };
        };
        G(): boolean;
        u(): string[];
        w(t: any, e: any): {
            class: any;
            enabled: boolean;
            id: string;
            tooltip: any;
            run: () => void;
        }[];
        y(t: any, e: any): {
            rowElement: HTMLElement;
            keyElement: any;
            valueElement: any;
        };
        gb(t: any, e: any, s: any): void;
        eb: {
            element: any;
            item: any;
            itemIndex: any;
        } | undefined;
        z(t: any, e: any): HTMLElement;
        isItemNew(t: any): boolean;
        C(t: any, { value: e, sibling: s }: {
            value: any;
            sibling: any;
        }): void;
        D(): {
            deleteActionTooltip: any;
            editActionTooltip: any;
            addButtonLabel: any;
            inputPlaceholder: any;
            siblingInputPlaceholder: any;
        };
        kb(t: any, e: any): $;
        lb(t: any, e: any): X;
        readonly domNode: any;
        readonly items: any[];
        readonly j: boolean;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any[];
        f: any;
        g: dt;
        h: any;
        onDidChangeList: any;
        a: any;
        F(): void;
        H(): void;
        I(t: any): X;
        J(t: any): void;
        cancelEdit(): void;
        L(t: any, e: any, s: any): void;
        M(t: any, e: any, s: any): any;
        N(t: any, e: any, s: any): any;
        O(): HTMLElement;
        P(t: any): void;
        Q(t: any): void;
        R(t: any): number;
        S(t: any): void;
        U(): void;
        W(): void;
        q: tt;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class Ht extends Ht_base {
    C(t: any, e: any): void;
}
declare let M: {
    new (t: any, e: any, s: any, i: any, n: any): {
        cb: any;
        X: boolean;
        Y: string;
        Z: boolean;
        ab: () => void;
        bb: () => void;
        setValue(t: any, e: any): void;
        isItemNew(t: any): boolean;
        G(): boolean;
        readonly j: boolean;
        t(): {
            key: {
                type: string;
                data: string;
            };
            value: {
                type: string;
                data: string;
            };
            removable: boolean;
            resetable: boolean;
        };
        u(): string[];
        w(t: any, e: any): {
            class: any;
            enabled: boolean;
            id: string;
            label: string;
            tooltip: any;
            run: () => void;
        }[];
        F(): HTMLElement;
        y(t: any, e: any): {
            rowElement: HTMLElement;
            keyElement: any;
            valueElement: any;
        };
        z(t: any, e: any): HTMLElement;
        lb(t: any, e: any): {
            widget: $;
            element: HTMLElement;
        } | {
            widget: X;
            element: HTMLElement;
        } | undefined;
        mb(t: any, { idx: e, isKey: s, originalItem: i, changedItem: n, update: o }: {
            idx: any;
            isKey: any;
            originalItem: any;
            changedItem: any;
            update: any;
        }): {
            widget: $;
            element: HTMLElement;
        };
        nb(t: any, { isKey: e, changedItem: s, update: i }: {
            isKey: any;
            changedItem: any;
            update: any;
        }): {
            widget: X;
            element: HTMLElement;
        };
        ob(t: any, e: any, s: any): boolean;
        C(t: any, e: any): void;
        qb(t: any): any;
        D(): {
            deleteActionTooltip: any;
            resetActionTooltip: any;
            editActionTooltip: any;
            addButtonLabel: any;
            keyHeaderText: any;
            valueHeaderText: any;
        };
        readonly domNode: any;
        readonly items: any[];
        m: any;
        n: any;
        r: any;
        s: any;
        b: any[];
        f: any;
        g: dt;
        h: any;
        onDidChangeList: any;
        a: any;
        H(): void;
        I(t: any): X;
        J(t: any): void;
        cancelEdit(): void;
        L(t: any, e: any, s: any): void;
        M(t: any, e: any, s: any): any;
        N(t: any, e: any, s: any): any;
        O(): HTMLElement;
        P(t: any): void;
        Q(t: any): void;
        R(t: any): number;
        S(t: any): void;
        U(): void;
        W(): void;
        q: tt;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let O: {
    new (t: any, e: any, s: any, i: any, n: any): {
        Y: any;
        X: string;
        setValue(t: any, e: any): void;
        isItemNew(t: any): boolean;
        t(): {
            key: {
                type: string;
                data: string;
            };
            value: {
                type: string;
                data: boolean;
            };
            removable: boolean;
            resetable: boolean;
        };
        u(): string[];
        w(t: any, e: any): never[];
        G(): boolean;
        F(): void;
        M(t: any, e: any, s: any): HTMLElement;
        y(t: any, e: any): {
            rowElement: HTMLElement;
            keyElement: HTMLElement;
        };
        z(t: any, e: any): HTMLElement;
        hb(t: any, e: any, s: any): {
            widget: z;
            element: HTMLElement;
        };
        C(t: any, e: any): void;
        D(): {
            deleteActionTooltip: any;
            resetActionTooltip: any;
            editActionTooltip: any;
            addButtonLabel: any;
            keyHeaderText: any;
            valueHeaderText: any;
        };
        readonly domNode: any;
        readonly items: any[];
        readonly j: boolean;
        m: any;
        n: any;
        r: any;
        s: any;
        b: any[];
        f: any;
        g: dt;
        h: any;
        onDidChangeList: any;
        a: any;
        H(): void;
        I(t: any): X;
        J(t: any): void;
        cancelEdit(): void;
        L(t: any, e: any, s: any): void;
        N(t: any, e: any, s: any): any;
        O(): HTMLElement;
        P(t: any): void;
        Q(t: any): void;
        R(t: any): number;
        S(t: any): void;
        U(): void;
        W(): void;
        q: tt;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $f9 as X } from "../../../../base/browser/ui/selectBox/selectBox.js";
import { $ud as tt } from "../../../../base/common/lifecycle.js";
import { $d0 as $ } from "../../../../base/browser/ui/inputbox/inputBox.js";
import { $i9 as z } from "../../../../base/browser/ui/toggle/toggle.js";
export { dt as $L0b, x as $M0b, E as $N0b, Pt as $O0b, Ht as $P0b, M as $Q0b, O as $R0b };
//# sourceMappingURL=settingsWidgets.d.ts.map