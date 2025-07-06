declare let $: {
    new (e: any, i: any, t: any, n: any, r: any, o: any, s: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        run(e: any): Promise<void>;
        j(e: any, i: any): Promise<boolean>;
        k(e: any, i: any): Promise<boolean>;
        l(e: any): void;
    };
};
declare let M: {
    new (e: any, i: any, t: any, n: any, r: any, o: any, s: any, d: any, l: any, f: any, h: any, m: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        run(e: any): Promise<void>;
        o(e: any, i: any): Promise<any>;
        p(e: any, i: any, t: any): Promise<{
            editsProposed: boolean;
            codeMapper: any;
        } | undefined>;
        q(e: any, i: any, t: any): Promise<{
            editsProposed: boolean;
            codeMapper: any;
        } | undefined>;
        r(e: any, i: any, t: any): w;
        s(e: any, i: any, t: any): w;
        t(e: any): Promise<{
            [Symbol.asyncIterator](): AsyncGenerator<any, void, unknown>;
        }>;
        u(e: any, i: any, t: any): Promise<any>;
        v(e: any, i: any, t: any): Promise<any>;
        w(e: any, i: any): void;
        x(e: any): void;
    };
};
declare function k(a: any, e: any): {
    level: number;
    length: number;
};
import { $bi as w } from "../../../../../base/common/async.js";
export { $ as $Pfc, M as $Qfc, k as $Rfc };
//# sourceMappingURL=codeBlockOperations.d.ts.map