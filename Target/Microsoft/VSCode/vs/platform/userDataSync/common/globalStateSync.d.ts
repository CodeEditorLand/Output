declare let j: {
    new (t: any, e: any, o: any, s: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        getLocalGlobalState(t: any): Promise<{
            storage: {};
        }>;
        f(): Promise<any>;
        writeLocalGlobalState({ added: t, removed: e, updated: o }: {
            added: any;
            removed: any;
            updated: any;
        }, s: any): Promise<void>;
    };
};
declare let E: {
    new (t: any, e: any, o: any, s: any, a: any, n: any): {
        o(t: any): Promise<void>;
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
declare let x: {
    new (t: any, e: any, o: any, s: any, a: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        getSyncStoreType(t: any): any;
        sync(t: any): Promise<void>;
        g(t: any, e: any): Promise<void>;
        h({ content: t }: {
            content: any;
        }): any;
    };
};
declare function b(c: any, t: any): string;
declare let G: {
    new (t: any, e: any, o: any, s: any, a: any, n: any, i: any, l: any, d: any, u: any, h: any, g: any, m: any, z: any): {
        zb: any;
        nb: number;
        tb: any;
        ub: any;
        vb: any;
        wb: any;
        xb: any;
        yb: any;
        ob(t: any, e: any, o: any): Promise<{
            baseResource: any;
            baseContent: string;
            localResource: any;
            localContent: string;
            localUserData: any;
            remoteResource: any;
            remoteContent: string | null;
            previewResource: any;
            previewResult: {
                content: null;
                local: {
                    added: {};
                    removed: never[];
                    updated: {};
                };
                remote: {
                    added: any[];
                    updated: any[];
                    removed: any[];
                    all: any;
                };
                localChange: number;
                remoteChange: number;
            };
            localChange: number;
            remoteChange: number;
            acceptedResource: any;
            storageKeys: {
                user: any[];
                machine: any[];
                unregistered: string[];
            };
        }[]>;
        sb(t: any): Promise<boolean>;
        pb(t: any, e: any): Promise<any>;
        qb(t: any, e: any, o: any, s: any): Promise<any>;
        Eb(t: any): Promise<{
            content: any;
            local: {
                added: {};
                removed: never[];
                updated: {};
            };
            remote: {
                added: any[];
                updated: any[];
                removed: any[];
                all: any;
            };
            localChange: number;
            remoteChange: number;
        }>;
        Fb(t: any): Promise<{
            content: any;
            local: {
                added: {};
                removed: never[];
                updated: {};
            };
            remote: {
                added: any[];
                updated: any[];
                removed: any[];
                all: any;
            };
            localChange: number;
            remoteChange: number;
        }>;
        rb(t: any, e: any, o: any, s: any): Promise<void>;
        resolveContent(t: any): Promise<any>;
        hasLocalData(): Promise<boolean>;
        Hb(t: any): Promise<{
            user: any[];
            machine: any[];
            unregistered: string[];
        }>;
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
export { j as $17b, E as $27b, x as $37b, b as $Y7b, G as $Z7b };
//# sourceMappingURL=globalStateSync.d.ts.map