declare class g {
    static shouldAutoTrigger(t: any): boolean;
    constructor(t: any, i: any, s: any);
    leadingLineContent: any;
    leadingWord: any;
    lineNumber: any;
    column: any;
    triggerOptions: any;
}
declare let P: {
    new (t: any, i: any, s: any, e: any, n: any, o: any, h: any, u: any, c: any): {
        n: any;
        o: any;
        p: any;
        q: any;
        r: any;
        s: any;
        t: any;
        u: any;
        v: any;
        a: O;
        b: O;
        c: N;
        j: O;
        k: b;
        l: b;
        m: b;
        onDidCancel: any;
        onDidTrigger: any;
        onDidSuggest: any;
        h: any;
        dispose(): void;
        w(): void;
        readonly state: 0 | 1 | 2;
        cancel(t?: boolean): void;
        clear(): void;
        x(): void;
        y(t: any): void;
        z(): void;
        A(): void;
        B(): void;
        trigger(t: any): void;
        d: any;
        g: g | undefined;
        f: W | undefined;
        i: q | undefined;
        C(t: any): void;
        D(t: any): void;
    };
    createSuggestFilter(t: any): {
        itemKind: Set<any>;
        showDeprecated: any;
    };
};
declare var M: any;
import { $ud as O } from "../../../../base/common/lifecycle.js";
import { $Xh as N } from "../../../../base/common/async.js";
import { $ef as b } from "../../../../base/common/event.js";
import { $qf as W } from "../../../../base/common/cancellation.js";
import { $kkb as q } from "./completionModel.js";
export { g as $mkb, P as $nkb, M as State };
//# sourceMappingURL=suggestModel.d.ts.map