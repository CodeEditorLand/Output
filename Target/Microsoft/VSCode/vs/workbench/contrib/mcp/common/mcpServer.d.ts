declare let L: {
    new (t: any, e: any): {
        g: boolean;
        j: it;
        m: Map<any, any>;
        reset(): void;
        get(t: any): any;
        store(t: any, e: any): void;
        getServers(t: any): any;
        storeServers(t: any, e: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let w: {
    new (t: any, e: any, i: any, s: any, r: any, o: any, n: any, c: any, m: any, h: any, v: any, y: any, H: any, J: any, F: any, A: any, G: any, V: any, Q: any): {
        readonly capabilities: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        readonly tools: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        readonly prompts: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        readonly trusted: any;
        collection: any;
        definition: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        Q: any;
        S: any;
        U: any;
        W: any;
        g: et;
        j: any;
        connection: any;
        connectionState: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        m: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
        cacheState: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        D: boolean;
        runningToolCalls: Set<any>;
        w: any;
        y: string;
        z: any;
        n: U;
        s: U;
        readDefinitions(): any;
        showOutput(): void;
        resources(t: any): x;
        resourceTemplates(t: any): any;
        start({ isFromInteraction: t, debug: e }?: {}): Promise<any>;
        X(t: any, e: any, i: any): void;
        stop(): any;
        Y(): void;
        Z(t: any): Promise<any>;
        $(t: any, e: any): Promise<any[]>;
        ab(t: any, e: any, i: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    callOn(t: any, e: any, i?: any): Promise<any>;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class It {
    constructor(t: any, e: any, i: any);
    get definition(): any;
    g: any;
    j: any;
    referenceName: any;
    id: any;
    call(t: any, e: any, i: any): Promise<any>;
    callWithProgress(t: any, e: any, i: any, s: any): Promise<any>;
    _callWithProgress(t: any, e: any, i: any, s?: boolean): Promise<any>;
    compare(t: any): any;
}
import { $Lc as it } from "../../../../base/common/map.js";
import { $Hh as et } from "../../../../base/common/async.js";
declare class U {
    constructor(t: any, e: any, i: any, s: any);
    g: any;
    j: any;
    l: any;
    m: any;
    fromServerPromise: import("../../../../base/common/observableInternal/observables/observableValue.js").$De;
    n: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    value: import("../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
    get fromCache(): {
        data: any;
        nonce: any;
    } | undefined;
}
import { $bi as x } from "../../../../base/common/async.js";
export { L as $lic, w as $mic, It as $nic };
//# sourceMappingURL=mcpServer.d.ts.map