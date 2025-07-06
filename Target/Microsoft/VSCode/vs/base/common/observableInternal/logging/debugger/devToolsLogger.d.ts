export { c as $0e };
declare class c {
    static getInstance(): any;
    j(): {
        names: any[];
        affected: {
            type: string;
            state: string;
            name: any;
            instanceId: any;
            updateCount: any;
        }[];
    } | undefined;
    k(e: any): any;
    m(e: any): any;
    n(e: any, n: any): {
        type: string;
        state: string;
        changedDependencies: any[];
        initialComputation: boolean;
        name: any;
        instanceId: any;
        updateCount: number;
    } | {
        type: string;
        state: string;
        changedDependencies: any[];
        name: any;
        instanceId: any;
        updateCount: any;
    } | {
        type: string;
        state: string;
        name: any;
        instanceId: any;
        updateCount: any;
    } | undefined;
    p(e: any): {
        name: any;
        instanceId: any;
    } | undefined;
    q(e: any): {
        name: any;
        instanceId: any;
    } | undefined;
    b: number;
    c: number;
    e: Map<any, any>;
    f: WeakMap<WeakKey, any>;
    g: Map<any, any>;
    h: Set<any>;
    i: import("./rpc.js").$3e;
    r: any;
    s: C;
    u: {};
    w: () => void;
    v(e: any): void;
    x(e: any): any;
    handleObservableCreated(e: any): void;
    handleOnListenerCountChanged(e: any, n: any): void;
    handleObservableUpdated(e: any, n: any): void;
    handleAutorunCreated(e: any): void;
    handleAutorunDisposed(e: any): void;
    handleAutorunDependencyChanged(e: any, n: any, t: any): void;
    handleAutorunStarted(e: any): void;
    handleAutorunFinished(e: any): void;
    handleDerivedDependencyChanged(e: any, n: any, t: any): void;
    _handleDerivedRecomputed(e: any, n: any): void;
    handleDerivedCleared(e: any): void;
    handleBeginTransaction(e: any): void;
    handleEndTransaction(e: any): void;
}
import { $7e as C } from "./utils.js";
//# sourceMappingURL=devToolsLogger.d.ts.map