declare let s: {
    new (r: any, e: any, i: any): {
        a: any;
        b: any;
        c: w;
        cancel(): void;
        previous(): void;
        next(): void;
        trigger(r: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(r: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class I extends v {
    constructor();
    run(r: any, e: any): void;
}
import { $wf as w } from "../../../../base/common/lazy.js";
import { $Eab as v } from "../../../browser/editorExtensions.js";
export { s as $Ysb, I as $Zsb };
//# sourceMappingURL=parameterHints.d.ts.map