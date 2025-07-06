export { f as $Crb };
declare let f: {
    new (t: any, e: any, i: any): {
        j: any;
        a: any;
        c: boolean;
        f: any[];
        b: any;
        g: {
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
        h: any;
        dispose(): void;
        getId(): any;
        getDomNode(): any;
        getPosition(): null;
        n(): void;
        r(): void;
        showsOrWillShow(t: any): boolean;
        s(t: any, e: any): void;
        m: {
            lineNumber: any;
            laneOrLine: any;
        } | undefined;
        hide(): void;
        t(t: any): void;
        u(t: any, e: any, i: any): void;
        w(t: any): void;
        z(t: any, e: any): void;
        C(t: any): void;
        q: b;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as b } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=glyphHoverWidget.d.ts.map