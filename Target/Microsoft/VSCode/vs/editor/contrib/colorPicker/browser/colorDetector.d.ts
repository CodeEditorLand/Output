declare const R: any;
declare let f: {
    new (t: any, i: any, e: any, o: any): {
        C: any;
        D: any;
        F: any;
        f: any;
        n: any[];
        s: Map<any, any>;
        z: any;
        L: any;
        t: any;
        y: L;
        m: any;
        u: any;
        w: any;
        j: j | null;
        h: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | null;
        isEnabled(): any;
        readonly limitReporter: any;
        dispose(): void;
        G(): void;
        H(): Promise<void>;
        I(): void;
        J(t: any): void;
        M(t: any): void;
        N(): void;
        getColorData(t: any): any;
        isColorDecoration(t: any): any;
        q: d;
        B(t: any): any;
    };
    ID: string | undefined;
    RECOMPUTE_TIME: number | undefined;
    get(t: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class x extends m {
    constructor(...args: any[]);
    f: any;
    onDidChange: any;
    h: number;
    j: boolean;
    get computed(): number;
    get limited(): boolean;
    update(t: any, i: any): void;
}
import { $Mbb as L } from "../../../browser/editorDom.js";
import { $Xh as j } from "../../../../base/common/async.js";
import { $ud as d } from "../../../../base/common/lifecycle.js";
import { $vd as m } from "../../../../base/common/lifecycle.js";
export { R as $Djb, f as $Ejb, x as $Fjb };
//# sourceMappingURL=colorDetector.d.ts.map