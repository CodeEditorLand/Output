export { C as $hUb };
declare let C: {
    new (t: any, e: any, i: any, o: any, n: any, c: any, h: any, f: any, l: any, b: any, s: any, m: any): {
        readonly length: any;
        readonly activeComment: any;
        n: any;
        owner: any;
        parentResourceUri: any;
        container: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        b: any[];
        h: D;
        onDidResize: any;
        j: $;
        m: {
            b: any;
            c: any;
            d: any;
            render(e: any, t: any, r: any): {
                element: any;
                dispose: () => void;
            };
            f(e: any, t: any): {
                codeBlockRenderer: (r: any, i: any) => Promise<HTMLSpanElement>;
                actionHandler: {
                    callback: (r: any) => Promise<void>;
                    disposables: any;
                };
            };
            g(e: any, t: any): Promise<void>;
        };
        focus(t: any): void;
        hasCommentsInEditMode(): boolean;
        ensureFocusIntoNewEditingComment(): void;
        display(): Promise<void>;
        a: any;
        f: MutationObserver | null | undefined;
        D(): void;
        getDimensions(): any;
        layout(t: any): void;
        getPendingEdits(): {};
        getCommentCoords(t: any): {
            thread: {
                left: any;
                top: any;
                width: any;
                height: any;
            };
            comment: {
                left: any;
                top: any;
                width: any;
                height: any;
            };
        } | undefined;
        updateCommentThread(t: any, e: any): Promise<void>;
        g: number | undefined;
        F(): void;
        G(t: any): void;
        H(t: any): any;
        dispose(): void;
        q: N;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as D } from "../../../../base/common/event.js";
import { $Ed as $ } from "../../../../base/common/lifecycle.js";
import { $ud as N } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=commentThreadBody.d.ts.map