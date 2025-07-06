declare const B: "acceptSelectedCodeAction";
declare const R: "previewSelectedCodeAction";
declare let v: {
    new (e: any, i: any, t: any, s: any, n: any, a: any, c: any, h: any): {
        h: any;
        j: any;
        m: any;
        n: any;
        b: number;
        c: number;
        g: any;
        domNode: HTMLDivElement;
        a: any;
        f: any;
        r(e: any): boolean;
        hide(e: any): void;
        layout(e: any): any;
        focusPrevious(): void;
        focusNext(): void;
        acceptSelected(e: any): void;
        s(e: any): void;
        t(): void;
        u(e: any): Promise<void>;
        w(e: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var b: any;
export { B as $5hb, R as $6hb, v as $7hb, b as ActionListItemKind };
//# sourceMappingURL=actionList.d.ts.map