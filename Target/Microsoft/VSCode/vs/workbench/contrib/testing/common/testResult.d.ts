declare function Q(o: any): number;
declare function Z(o: any, t: any): Generator<any, void, unknown>;
declare class R {
    a: d;
    c: D;
    d: number;
    onDidWriteData: any;
    endPromise: Promise<any>;
    buffers: any[];
    get length(): number;
    getRange(t: any, e: any): f;
    getRangeIter(t: any, e: any): Generator<any, void, unknown>;
    append(t: any, e: any): {
        offset: number;
        length: any;
    };
    e(t: any): void;
    end(): void;
}
declare let b: {
    new (t: any, e: any, i: any, s: any, n: any): {
        readonly completedAt: number | undefined;
        readonly tests: MapIterator<any>;
        getTestById(t: any): any;
        id: any;
        persist: any;
        request: any;
        insertOrder: any;
        w: any;
        a: any;
        f: any;
        g: any;
        h: any;
        j: Map<any, any>;
        m: number;
        startedAt: number;
        onChange: any;
        onComplete: any;
        onNewTask: any;
        onEndTask: any;
        tasks: any[];
        name: any;
        counts: Uint32Array<ArrayBuffer>;
        u: {
            getOwnState: (r: any) => any;
            getCurrentComputedState: (r: any) => any;
            setComputedState: (r: any, h: any) => any;
            getChildren: (r: any) => any;
            getParents: (r: any) => Generator<any, void, unknown>;
        };
        F: g;
        G: g;
        getStateById(t: any): any;
        appendOutput(t: any, e: any, i: any, s: any): void;
        addTask(t: any): void;
        addTestChainToRun(t: any, e: any): void;
        updateState(t: any, e: any, i: any, s: any): void;
        appendMessage(t: any, e: any, i: any): void;
        markTaskComplete(t: any): void;
        markComplete(): void;
        n: number | undefined;
        markRetired(t: any): void;
        toJSON(): any;
        toJSONWithMessages(): any;
        y(t: any, e: any, i: any): void;
        z(t: any, e: any, i: any, s: any): void;
        C(t: any, e: any, i: any): {
            controllerId: any;
            expand: number;
            item: any;
            children: never[];
            tasks: never[];
            ownComputedState: number;
            computedState: number;
        };
        D(t: any): number;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class et {
    constructor(t: any, e: any, i?: boolean);
    get tests(): MapIterator<any>;
    c: any;
    d: boolean;
    counts: Uint32Array<ArrayBuffer>;
    a: Map<any, any>;
    id: any;
    completedAt: any;
    tasks: any;
    name: any;
    request: any;
    getStateById(t: any): any;
    toJSON(): any;
    toJSONWithMessages(): any;
}
declare var k: any;
import { $ef as d } from "../../../../base/common/event.js";
import { $$h as D } from "../../../../base/common/async.js";
import { $Ki as f } from "../../../../base/common/buffer.js";
import { $wf as g } from "../../../../base/common/lazy.js";
export { Q as $$U, Z as $0U, R as $9U, b as $_U, et as $aV, k as TestResultItemChangeReason };
//# sourceMappingURL=testResult.d.ts.map