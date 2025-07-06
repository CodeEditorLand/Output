declare function k(e: any, t: any): any;
declare let p: {
    new (t: any, r: any, o: any, n: any, i: any, c: any, a: any, d: any, j: any, x: any, y: any, B: any): {
        Db(t: any): any;
        Eb(t: any): {
            tasks: any;
        } | {
            tasks?: never;
        };
        nb: number;
        yb: any;
        zb: any;
        Ab: any;
        Bb: any;
        Cb: any;
        ob(t: any, e: any, n: any, h: any): Promise<{
            fileContent: any;
            baseResource: any;
            baseContent: any;
            localResource: any;
            localContent: any;
            localChange: number;
            remoteResource: any;
            remoteContent: any;
            remoteChange: number;
            previewResource: any;
            previewResult: {
                content: any;
                localChange: number;
                remoteChange: number;
                hasConflicts: boolean;
            };
            acceptedResource: any;
        }[]>;
        sb(t: any): Promise<boolean>;
        pb(t: any, e: any): Promise<any>;
        qb(t: any, e: any, n: any, h: any): Promise<{
            content: any;
            localChange: any;
            remoteChange: any;
        }>;
        rb(t: any, e: any, n: any, h: any): Promise<void>;
        hasLocalData(): Promise<any>;
        resolveContent(t: any): Promise<any>;
        Kb(t: any, e: any, n: any): {
            content: any;
            hasRemoteChanged: boolean;
            hasLocalChanged: boolean;
            hasConflicts: boolean;
        };
        r: any;
        tb(): Promise<any>;
        ub(t: any, e: any, s: any): Promise<void>;
        vb(): Promise<void>;
        wb(t: any): void;
        readonly status: string;
        readonly conflicts: any;
        syncResource: any;
        collection: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        c: any;
        m: string;
        n: any;
        onDidChangeStatus: any;
        s: any[];
        t: any;
        onDidChangeConflicts: any;
        u: any;
        w: any;
        onDidChangeLocal: any;
        C: boolean;
        F: {};
        z: string;
        resource: any;
        D: string;
        h: any;
        f: any;
        g: any;
        y: any;
        j: Promise<any>;
        Q(): void;
        R(): Promise<void>;
        S(t: any): void;
        sync(t: any, e?: boolean, s?: any, i?: {}): Promise<any>;
        apply(t: any, e?: {}): Promise<any>;
        replace(t: any): Promise<boolean>;
        U(t: any): Promise<boolean>;
        W(t: any, e: any): Promise<any>;
        X(t: any, e: any, s: any, i: any): any;
        Y(t: any, e: any, s: any, i: any): Promise<"idle" | "syncing" | "hasConflicts">;
        accept(t: any, e: any): Promise<any>;
        discard(t: any): Promise<any>;
        Z(t: any, e: any): Promise<void>;
        $(t: any): Promise<"idle" | "syncing" | "hasConflicts">;
        ab(): Promise<void>;
        bb(t: any): void;
        hasPreviouslySynced(): Promise<boolean>;
        cb(t: any): Promise<any>;
        resetLocal(): Promise<void>;
        db(t: any, e: any, s: any, i: any, r: any, n: any): Promise<{
            syncResource: any;
            profile: any;
            remoteUserData: any;
            lastSyncUserData: any;
            resourcePreviews: any[];
            isLastSyncFromCurrentMachine: any;
        }>;
        getLastSyncUserData(): Promise<any>;
        eb(t: any, e?: {}): Promise<void>;
        fb(): any;
        gb(): Promise<any>;
        hb(t: any): Promise<void>;
        getRemoteUserData(t: any): Promise<{
            ref: any;
            syncData: any;
        }>;
        ib(t: any): any;
        jb(t: any): Promise<any>;
        kb(t: any, e: any): Promise<{
            ref: any;
            syncData: {
                version: any;
                machineId: any;
                content: any;
            };
        }>;
        lb(t: any): Promise<any>;
        stop(): Promise<void>;
        mb(): any;
        q: import("../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let f: {
    new (t: any, r: any, o: any, n: any, i: any, c: any): {
        c: any;
        o(t: any): Promise<void>;
        p(): Promise<any>;
        resource: any;
        g: any;
        h: any;
        j: any;
        k: any;
        l: any;
        d: any;
        f: any;
        initialize({ ref: t, content: e }: {
            ref: any;
            content: any;
        }): Promise<void>;
        m(t: any): any;
        n(t: any, e?: {}): Promise<void>;
    };
};
export { k as $bBc, p as $cBc, f as $dBc };
//# sourceMappingURL=tasksSync.d.ts.map