declare class P extends F {
    constructor(t: any, e: any);
    a: any;
    onDidChange: any;
    b: any;
    c: any;
    f: any;
    h: any;
    g: any;
    filterHistory: any;
    set excludedFiles(t: boolean);
    get excludedFiles(): boolean;
    set activeFile(t: boolean);
    get activeFile(): boolean;
    set showWarnings(t: boolean);
    get showWarnings(): boolean;
    set showErrors(t: boolean);
    get showErrors(): boolean;
    set showInfos(t: boolean);
    get showInfos(): boolean;
}
declare class h extends b {
    constructor(t: any);
    set quickFixes(t: any[]);
    get quickFixes(): any[];
    f: any[];
    autoFixable(t: any): void;
    marker: any;
    c: any;
    onShowQuickFixes: any;
    run(): Promise<void>;
}
declare let c: {
    new (t: any, e: any, i: any): {
        a: any;
        onClick(t: any): void;
        showQuickFixes(): void;
        t: any;
        N: string;
        render(t: any): void;
        L: HTMLAnchorElement | undefined;
        O(): "button" | "menuitem" | "presentation" | "tab";
        focus(): void;
        isFocused(): boolean;
        blur(): void;
        setFocusable(t: any): void;
        C(): void;
        F(): any;
        I(): void;
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
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as F } from "../../../../base/common/lifecycle.js";
import { $bm as b } from "../../../../base/common/actions.js";
export { P as $rqc, h as $sqc, c as $tqc };
//# sourceMappingURL=markersViewActions.d.ts.map