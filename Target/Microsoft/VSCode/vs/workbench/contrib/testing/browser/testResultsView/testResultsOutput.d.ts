declare let O: {
    new (t: any, e: any, i: any, s: any, r: any): {
        readonly onDidContentSizeChange: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        a: any;
        b: any;
        update(t: any): Promise<boolean>;
        r(): void;
        layout(t: any, e: any): number | undefined;
        c: any;
        f: H | undefined;
        onScrolled(t: any): void;
        w(t: any): {
            lineNumbers: string;
            enableSplitViewResizing: boolean;
            isInEmbeddedEditor: boolean;
            renderOverviewRuler: boolean;
            ignoreTrimWhitespace: boolean;
            renderSideBySide: boolean;
            useInlineViewWhenSpaceIsLimited: boolean;
            originalAriaLabel: any;
            modifiedAriaLabel: any;
            diffAlgorithm: string;
            scrollBeyondLastLine: boolean;
            links: boolean;
            glyphMargin: boolean;
            scrollbar: {
                vertical: string;
                horizontal: string;
                useShadows: boolean;
                verticalHasArrows: boolean;
                horizontalHasArrows: boolean;
                handleMouseWheel: boolean;
            };
            overviewRulerLanes: number;
            fixedOverflowWidgets: boolean;
            readOnly: boolean;
            stickyScroll: {
                enabled: boolean;
            };
            minimap: {
                enabled: boolean;
            };
            automaticLayout: boolean;
        };
        q: T;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let S: {
    new (t: any, e: any): {
        f: any;
        g: any;
        a: F;
        b: any;
        update(t: any): Promise<boolean>;
        c: any;
        layout(t: any): any;
        h(): void;
        q: T;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let B: {
    new (t: any, e: any, i: any, s: any, r: any): {
        readonly onDidContentSizeChange: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        a: any;
        b: any;
        c: any;
        update(t: any): Promise<boolean>;
        w(): void;
        onScrolled(t: any): void;
        layout(t: any, e: any): any;
        f: any;
        g: H | undefined;
        q: T;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let W: {
    new (t: any, e: any, i: any, s: any, r: any): {
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        b: any;
        c: any;
        f: any;
        g: any;
        w(): Promise<any>;
        update(t: any): Promise<boolean>;
        y(t: any): Promise<void>;
        z(t: any): Promise<any>;
        C(t: any): Promise<any>;
        D(t: any): void;
        F(t: any, e: any): void;
        G(t: any): void;
        H(): void;
        layout(t: any): any;
        a: any;
        I({ xterm: t }: {
            xterm: any;
        }, e?: any, i?: any): void;
        q: T;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class H {
    constructor(t: any, e: any, i: any);
    a: any;
    b: any;
    c: any;
    onScrolled(t: any, e: any, i: any): void;
}
import { $ud as T } from "../../../../../base/common/lifecycle.js";
import { $wf as F } from "../../../../../base/common/lazy.js";
export { O as $smc, S as $tmc, B as $umc, W as $vmc };
//# sourceMappingURL=testResultsOutput.d.ts.map