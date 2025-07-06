declare class c {
    constructor(e: any, t: any);
    uri: any;
    kind: any;
}
declare class u {
    constructor(e: any, t: any);
    element: any;
    outline: any;
}
declare let m: {
    new (e: any, t: any, i: any, r: any, s: any): {
        resource: any;
        editor: any;
        h: any;
        j: any;
        a: l;
        e: w;
        f: l;
        g: v;
        onDidUpdate: any;
        c: {
            name: any;
            onDidChange: any;
            getValue(s: any): any;
            updateValue(s: any, n: any): any;
            dispose(): void;
        };
        d: {
            name: any;
            onDidChange: any;
            getValue(s: any): any;
            updateValue(s: any, n: any): any;
            dispose(): void;
        };
        b: {
            folder: any;
            path: never[];
        };
        dispose(): void;
        isRelative(): boolean;
        getElements(): any[];
        k(e: any): {
            folder: any;
            path: never[];
        };
        l(): void;
        m(e: any): void;
    };
};
import { $ud as l } from "../../../../base/common/lifecycle.js";
import { $wd as w } from "../../../../base/common/lifecycle.js";
import { $ef as v } from "../../../../base/common/event.js";
export { c as $pLb, u as $qLb, m as $rLb };
//# sourceMappingURL=breadcrumbsModel.d.ts.map