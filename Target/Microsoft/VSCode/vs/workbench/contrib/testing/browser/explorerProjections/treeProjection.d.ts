export { g as $Vmc };
declare let g: {
    new (t: any, e: any, n: any): {
        readonly m: any;
        lastState: any;
        u: any;
        w: any;
        f: x;
        g: Set<any>;
        h: Set<any>;
        j: Map<any, any>;
        onUpdate: any;
        getElementByTestId(t: any): any;
        y(t: any): void;
        applyTo(t: any): void;
        expandElement(t: any, e: any): void;
        z(t: any): h;
        C(t: any): any;
        D(t: any): void;
        q: import("../../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ef as x } from "../../../../../base/common/event.js";
declare class h extends m {
    constructor(t: any, e: any, n: any);
    get description(): any;
    f: any;
    ownState: number;
    update(t: any): void;
    fireChange(): void;
    g(t: any): void;
    c: I | undefined;
}
import { $Omc as m } from "./index.js";
import { $Pmc as I } from "./index.js";
//# sourceMappingURL=treeProjection.d.ts.map