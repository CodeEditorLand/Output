export { G as $Xwc };
declare class G {
    type: string;
    priority: number;
    name: string;
    when: import("../../../../platform/contextkey/common/contextkey.js").$Wn;
    getProvider: (t: any) => I | undefined;
}
declare class I extends f {
    constructor(t: any, o: any, r: any, e: any, i: any, n: any);
    c: any;
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    a: number;
    b: any;
    id: string;
    verbositySettingKey: string;
    options: {
        type: string;
    };
    get actions(): v[];
    provideContent(): any;
    n(t: any, o: any, r: any): any;
    provideNextContent(): any;
    providePreviousContent(): any;
    onClose(): void;
}
import { $vd as f } from "../../../../base/common/lifecycle.js";
import { $bm as v } from "../../../../base/common/actions.js";
//# sourceMappingURL=gettingStartedAccessibleView.d.ts.map