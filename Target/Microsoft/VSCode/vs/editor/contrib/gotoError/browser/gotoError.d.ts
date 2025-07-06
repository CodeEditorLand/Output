declare let a: {
    new (t: any, i: any, e: any, r: any, o: any): {
        g: any;
        h: any;
        i: any;
        j: any;
        c: w;
        a: any;
        b: any;
        dispose(): void;
        k(): void;
        l(t: any): any;
        d: any;
        f: any;
        close(t?: boolean): void;
        showAtMarker(t: any): void;
        navigate(t: any, i: any): Promise<void>;
    };
    ID: string | undefined;
    get(t: any): any;
};
declare class d extends m {
    constructor();
}
import { $ud as w } from "../../../../base/common/lifecycle.js";
declare class m extends $ {
    constructor(t: any, i: any, e: any);
    d: any;
    h: any;
    run(t: any, i: any): Promise<void>;
}
import { $Eab as $ } from "../../../browser/editorExtensions.js";
export { a as $krb, d as $lrb };
//# sourceMappingURL=gotoError.d.ts.map