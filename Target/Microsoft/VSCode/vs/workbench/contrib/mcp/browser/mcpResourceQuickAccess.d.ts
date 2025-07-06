declare let $: {
    new (e: any, t: any, s: any, n: any, i: any): {
        b: any;
        d: any;
        e: any;
        f: any;
        g: any;
        hasServersWithResources: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        toAttachment(e: any): Promise<any>;
        toURI(e: any): Promise<any>;
        h(e: any): Promise<any>;
        j(e: any): Promise<any>;
        k({ uri: e, needsVerification: t }: {
            uri: any;
            needsVerification: any;
        }): Promise<any>;
        l(e: any): Promise<{
            uri: any;
            needsVerification: boolean;
        } | undefined>;
        m(e: any, t: any, s: any, n: any): Promise<any>;
        getPicks(e: any, t: any): Promise<any>;
    };
    sep(e: any): {
        id: any;
        type: string;
        label: any;
    };
    item(e: any): {
        id: any;
        label: any;
        description: any;
        detail: any;
    };
};
declare let S: {
    new (e: any, t: any, s: any, n: any, i: any): {
        b: any;
        d: any;
        e: any;
        f: any;
        g: any;
        h(e: any, t: any, s: any): I;
    };
};
declare let D: {
    new (e: any, t: any, s: any, n: any, i: any, l: any): {
        j: any;
        pick(e?: any): Promise<void>;
        b: any;
        d: any;
        e: any;
        f: any;
        g: any;
        h(e: any, t: any, s: any): I;
    };
};
declare let U: {
    new (e: any, t: any, s: any, n: any): {
        defaultFilterValue: any;
        provide(e: any, t: any, s: any): I;
        b: any;
        d: any;
        e: any;
        f: any;
        g: any;
        h(e: any, t: any, s: any): I;
    };
    PREFIX: string | undefined;
};
import { $ud as I } from "../../../../base/common/lifecycle.js";
export { $ as $tic, S as $uic, D as $vic, U as $wic };
//# sourceMappingURL=mcpResourceQuickAccess.d.ts.map