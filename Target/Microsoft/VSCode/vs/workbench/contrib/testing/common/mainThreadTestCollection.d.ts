export { I as $Pnc };
declare class I extends d {
    constructor(t: any, r: any);
    get busyProviders(): number;
    get rootItems(): Set<any>;
    get all(): Generator<any, void, unknown>;
    get rootIds(): any;
    d: any;
    a: p;
    b: h;
    c: WeakMap<WeakKey, any>;
    onBusyProvidersChange: any;
    i: {
        add: (e: any) => void;
        remove: (e: any) => void;
    };
    expand(t: any, r: any): any;
    getNodeById(t: any): any;
    getNodeByUrl(t: any): any;
    getReviverDiff(): {
        op: number;
        amount: number;
    }[];
    clear(): {
        op: number;
        itemId: any;
    }[];
    y(t: any): any;
    x(): {
        add: (e: any) => void;
        remove: (e: any) => void;
    };
    o(): Generator<any, void, unknown>;
}
import { $QU as d } from "./testTypes.js";
import { $Ic as p } from "../../../../base/common/map.js";
import { $ef as h } from "../../../../base/common/event.js";
//# sourceMappingURL=mainThreadTestCollection.d.ts.map