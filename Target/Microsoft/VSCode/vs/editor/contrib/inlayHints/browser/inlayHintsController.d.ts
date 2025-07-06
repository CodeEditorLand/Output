declare class U {
    constructor(t: any, e: any);
    item: any;
    index: any;
    get part(): any;
}
declare let z: {
    new (t: any, e: any, o: any, n: any, i: any, s: any, r: any): {
        o: any;
        q: any;
        s: any;
        t: any;
        u: any;
        v: any;
        f: k;
        g: k;
        h: Map<any, any>;
        m: number;
        k: st;
        j: any;
        dispose(): void;
        w(): void;
        l: {
            position: any;
            notEarlierThan: number;
        } | undefined;
        x(): k;
        n: Ct | undefined;
        y(t: any): any[];
        z(t: any): any;
        A(): any;
        B(t: any): U | undefined;
        C(t: any, e: any): Promise<void>;
        D(t: any): void;
        E(t: any): any[];
        F(): any[];
        G(t: any, e: any): void;
        H(t: any, e: any): void;
        I(): {
            fontSize: any;
            fontFamily: any;
            padding: any;
            isUniform: boolean;
        };
        J(): void;
        getInlayHintsForLine(t: any): any[];
    };
    ID: string | undefined;
    a: number | undefined;
    b: {} | undefined;
    get(t: any): any;
};
import { $ud as k } from "../../../../base/common/lifecycle.js";
import { $Mbb as st } from "../../../browser/editorDom.js";
declare class Ct {
    constructor(t: any, e: any);
    part: any;
    hasTriggerModifier: any;
}
export { U as $Hnb, z as $Inb };
//# sourceMappingURL=inlayHintsController.d.ts.map