export { C as $Xsb };
declare let C: {
    new (e: any, n: any, t: any, i: any, o: any): {
        n: any;
        r: any;
        c: any;
        j: boolean;
        m: any;
        allowEditorOverflow: boolean;
        b: {
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
        f: any;
        g: any;
        s(): void;
        h: {
            element: HTMLElement;
            signature: any;
            overloads: any;
            docs: any;
            scrollbar: H;
        } | undefined;
        show(): void;
        hide(): void;
        getPosition(): {
            position: any;
            preference: number[];
        } | null;
        render(e: any): void;
        t(e: any): any;
        u(e: any, n: any): boolean;
        w(e: any, n: any, t: any): void;
        y(e: any, n: any): any;
        next(): void;
        previous(): void;
        getDomNode(): HTMLElement;
        getId(): any;
        z(): void;
        q: F;
        dispose(): void;
        B(t: any): any;
    };
    a: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $37 as H } from "../../../../base/browser/ui/scrollbar/scrollableElement.js";
import { $ud as F } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=parameterHintsWidget.d.ts.map