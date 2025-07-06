declare const ct: string;
declare const lt: " - " | " — ";
declare let C: {
    new (t: any, i: any, e: any, s: any, o: any, r: any, a: any, c: any, l: any, m: any, p: any, g: any): {
        readonly value: any;
        readonly workspaceName: any;
        readonly fileName: string | undefined;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        f: {
            isPure: boolean;
            isAdmin: boolean;
            prefix: undefined;
        };
        g: Map<any, any>;
        h: any;
        j: any;
        m: X;
        onDidChange: any;
        r: boolean;
        s: boolean;
        t: any;
        L(): void;
        M(t: any): void;
        N(): void;
        O(): void;
        P(): void;
        n: any;
        Q(): any;
        getTitleDecorations(): {
            prefix: any;
            suffix: any;
        };
        updateProperties(t: any): void;
        registerVariables(t: any): void;
        getWindowTitle(): string;
        isCustomTitleFormat(): boolean;
        q: I;
        dispose(): void;
        B(t: any): any;
    };
    a: any;
    b: any;
    c: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as X } from "../../../../base/common/event.js";
import { $ud as I } from "../../../../base/common/lifecycle.js";
export { ct as $p4b, lt as $q4b, C as $r4b };
//# sourceMappingURL=windowTitle.d.ts.map