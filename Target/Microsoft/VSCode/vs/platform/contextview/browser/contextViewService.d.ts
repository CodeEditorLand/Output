declare let f: {
    new (t: any): {
        c: any;
        b: any;
        showContextView(t: any, e: any, n: any): {
            close: () => void;
        };
        a: {
            close: () => void;
        } | undefined;
        layout(): void;
        hideContextView(t: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const __base: {
    new (t: any): {
        c: any;
        b: any;
        showContextView(t: any, e: any, n: any): {
            close: () => void;
        };
        a: {
            close: () => void;
        } | undefined;
        layout(): void;
        hideContextView(t: any): void;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class _ extends __base {
    getContextViewElement(): any;
}
export { f as $3pb, _ as $4pb };
//# sourceMappingURL=contextViewService.d.ts.map