declare let q: {
    new (e: any, t: any, s: any, i: any, r: any, o: any, c: any, d: any, l: any): {
        b: any;
        f: any;
        g: any;
        h: any;
        j: any;
        n: any;
        s: any;
        t: any;
        historyVisible: any;
        open(): Promise<boolean>;
        tryPeekFirstError(e: any, t: any, s: any): boolean;
        peekUri(e: any, t?: {}): boolean;
        closeAllPeeks(): void;
        openCurrentInEditor(): void;
        u(): any;
        w(e: any, t: any, s: any): Promise<boolean>;
        a: any;
        y(e: any): void;
        z(e: any, t: any): Promise<undefined>;
        C(): any;
        D(e: any): undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let u: {
    new (e: any, t: any, s: any, i: any, r: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        a: any;
        subject: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        b: any;
        show(e: any): Promise<void>;
        showSubject(e: any): Promise<void>;
        openAndShow(e: any): Promise<any>;
        removePeek(): void;
        collapseStack(): void;
        next(): void;
        previous(): void;
        removeIfPeekingForTest(e: any): void;
        n(e: any): void;
        s(e: any): void;
        t(e: any): g | p | I | undefined;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    get(e: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let Z: {
    new (e: any, t: any, s: any, i: any, r: any, o: any, c: any, d: any, l: any, k: any, S: any): {
        b: any;
        a: de;
        readonly subject: any;
        showLatestRun(e?: boolean): void;
        X(e: any): void;
        Y(e: any, t: any): void;
        h(e: any): void;
        readonly title: any;
        readonly titleDescription: any;
        readonly singleViewPaneContainerTitle: any;
        Ab: any;
        Bb: any;
        Cb: any;
        Db: any;
        Eb: any;
        Fb: any;
        Gb: any;
        Hb: any;
        Ib: any;
        Jb: any;
        bb: any;
        onDidFocus: any;
        cb: any;
        onDidBlur: any;
        db: any;
        onDidChangeBodyVisibility: any;
        eb: any;
        onDidChangeTitleArea: any;
        fb: any;
        onDidChangeViewWelcomeState: any;
        gb: boolean;
        yb: any;
        id: any;
        hb: any;
        ib: any;
        jb: any;
        nb: any;
        zb: any;
        menuActions: any;
        headerVisible: boolean;
        setVisible(t: any): void;
        isVisible(): boolean;
        isBodyVisible(): boolean;
        setExpanded(t: any): boolean;
        render(): void;
        W(t: any): void;
        ob: any;
        wb: any;
        mb: any;
        U(): void;
        Mb(): void;
        Nb(t: any): any;
        style(t: any): void;
        Ob(): any;
        Pb(t: any, e: any): void;
        ub: any;
        pb: any;
        qb: any;
        vb: any;
        Qb(t: any, e: any): any;
        Rb(t: any): void;
        Sb(t: any, e: any): void;
        ariaHeaderLabel: any;
        Tb(t: any): void;
        rb: any;
        tb: any;
        Ub(t: any): void;
        Vb(t: any): any;
        xb: any;
        onDidScrollRoot(): void;
        getProgressIndicator(): any;
        kb: any;
        lb: any;
        Yb(): any;
        Zb(): {
            background: any;
            overlayBackground: any;
            listOverrideStyles: {
                listBackground: any;
                treeStickyScrollBackground: any;
                treeStickyScrollBorder: any;
                treeStickyScrollShadow: any;
            };
        };
        focus(): void;
        $b(): void;
        ac(): void;
        bc(): void;
        createActionViewItem(t: any, e: any): any;
        getActionsContext(): void;
        getActionRunner(): void;
        getOptimalWidth(): number;
        saveState(): void;
        shouldShowWelcome(): boolean;
        getFilterWidget(): void;
        shouldShowFilterInHeader(): boolean;
        M: any;
        readonly draggableElement: HTMLElement | undefined;
        readonly dropTargetElement: HTMLElement;
        readonly dropBackground: undefined;
        minimumBodySize: any;
        I: any;
        maximumBodySize: any;
        J: any;
        readonly R: number | undefined;
        readonly minimumSize: any;
        readonly maximumSize: any;
        S(t: any): any;
        F: boolean;
        G: boolean;
        H: boolean;
        N: {
            dropBackground: undefined;
            headerBackground: undefined;
            headerBorder: undefined;
            headerForeground: undefined;
            leftBorder: undefined;
        };
        P: any;
        onDidChange: any;
        Q: any;
        onDidChangeExpansionState: any;
        orthogonalSize: number;
        z: boolean;
        C: any;
        element: HTMLElement;
        isExpanded(): boolean;
        O: any;
        collapsible: boolean;
        orientation: any;
        w: HTMLElement | undefined;
        y: any;
        layout(t: any): void;
        D: any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    Z: string | undefined;
    u: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class os extends fe {
    constructor();
    runEditorCommand(e: any, t: any): void;
}
declare class J extends y {
    constructor();
    run(e: any): void;
}
declare class ee extends y {
    constructor();
    run(e: any): void;
}
declare class te extends y {
    constructor();
    run(e: any): void;
}
declare class se extends y {
    constructor();
    run(e: any): void;
}
declare class ie extends y {
    constructor();
    run(e: any): void;
}
import { $cmc as g } from "./testResultsView/testResultsSubject.js";
import { $dmc as p } from "./testResultsView/testResultsSubject.js";
import { $emc as I } from "./testResultsView/testResultsSubject.js";
import { $wf as de } from "../../../../base/common/lazy.js";
import { $Gab as fe } from "../../../../editor/browser/editorExtensions.js";
import { $KI as y } from "../../../../platform/actions/common/actions.js";
export { q as $Amc, u as $Bmc, Z as $Cmc, os as $Dmc, J as $Emc, ee as $Fmc, te as $Gmc, se as $Hmc, ie as $Imc };
//# sourceMappingURL=testingOutputPeek.d.ts.map