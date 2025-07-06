export { O as $dhc };
declare let O: {
    new (t: any, e: any, i: any, s: any, n: any, o: any, a: any, r: any, h: any, d: any, m: any, u: any, y: any, l: any, w: any): {
        readonly entries: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        readonly state: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        readonly onDidDispose: any;
        chatSessionId: any;
        isGlobalEditingSession: any;
        w: any;
        y: any;
        z: any;
        C: any;
        D: any;
        _bulkEditService: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        c: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        f: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        h: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        j: g;
        m: import("../../../../../base/common/observableInternal/observables/observableValue.js").$De;
        canUndo: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        canRedo: import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        t: z;
        R: Map<any, any>;
        S: Map<any, any>;
        eb: G;
        U: import("../../../../../base/common/observableInternal/observables/observableFromEvent.js").$_d;
        init(): Promise<void>;
        $: any;
        N(t: any): any;
        getEntry(t: any): any;
        readEntry(t: any, e: any): any;
        storeState(): any;
        O(t: any): any;
        P(t: any, e: any): {
            stop: any;
            snapshot: any;
            historyIndex: any;
        } | undefined;
        Q(): void;
        W(t: any, e: any): import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        X(t: any, e: any, i: any): import("../../../../../base/common/observableInternal/observables/derivedImpl.js").$re;
        getEntryDiffBetweenStops(t: any, e: any, i: any): any;
        createSnapshot(t: any, e: any, i?: boolean): void;
        Y(t: any): {
            stopId: any;
            entries: g;
        };
        Z(t: any, e: any): {
            stopId: any;
            entries: g;
        };
        getSnapshot(t: any, e: any, i: any): any;
        getSnapshotModel(t: any, e: any, i: any): Promise<any>;
        getSnapshotUri(t: any, e: any, i: any): any;
        restoreSnapshot(t: any, e: any): Promise<void>;
        ab({ entries: t }: {
            entries: any;
        }, e?: boolean): Promise<void>;
        bb(): void;
        accept(...t: any[]): Promise<void>;
        reject(...t: any[]): Promise<void>;
        show(t: any): Promise<void>;
        n: any;
        stop(t?: boolean): Promise<void>;
        db(): Promise<void>;
        dispose(): void;
        readonly fb: boolean;
        startStreamingEdits(t: any, e: any, i: any): {
            pushText: (r: any, h: any) => void;
            pushNotebookCellText: (r: any, h: any, d: any) => void;
            pushNotebook: (r: any, h: any) => void;
            complete: () => void;
        };
        gb(t: any): {
            entry: any;
            stop: any;
        } | undefined;
        undoInteraction(): Promise<void>;
        redoInteraction(): Promise<void>;
        hb(): void;
        ib(t: any, e: any, i: any): Promise<void>;
        jb(t: any, e: any, i: any, s: any, n: any): void;
        kb(t: any, e: any, i: any, s: any): Promise<void>;
        lb(t: any): {
            readonly agentId: any;
            readonly command: any;
            readonly sessionId: any;
            readonly requestId: any;
            readonly result: any;
        };
        mb(t: any, e: any, i: any): Promise<any>;
        nb(t: any, e: any): Promise<any>;
        ob(t: any, e: any, i: boolean | undefined, s: any): any;
        pb(t: any, e: any): void;
        q: Z;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Ic as g } from "../../../../../base/common/map.js";
import { $ef as z } from "../../../../../base/common/event.js";
import { $Ih as G } from "../../../../../base/common/async.js";
import { $ud as Z } from "../../../../../base/common/lifecycle.js";
//# sourceMappingURL=chatEditingSession.d.ts.map