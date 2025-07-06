declare let $: {
    new (e: any, t: any, o: any, i: any, n: any, s: any, r: any, m: any, c: any, l: any, u: any, a: any, h: any): {
        tb: any;
        nb: number;
        previewResource: any;
        baseResource: any;
        localResource: any;
        remoteResource: any;
        acceptedResource: any;
        getLastSyncedProfiles(): Promise<any>;
        getRemoteSyncedProfiles(e: any): Promise<any>;
        ob(e: any, t: any, o: any): Promise<{
            baseResource: any;
            baseContent: string | null;
            localResource: any;
            localContent: string;
            remoteResource: any;
            remoteContent: string | null;
            remoteProfiles: any;
            previewResource: any;
            previewResult: {
                local: {
                    added: never[];
                    removed: never[];
                    updated: never[];
                };
                remote: {
                    added: never[];
                    removed: never[];
                    updated: never[];
                };
                content: string | null;
                localChange: number;
                remoteChange: number;
            };
            localChange: number;
            remoteChange: number;
            acceptedResource: any;
        }[]>;
        sb(e: any): Promise<boolean>;
        pb(e: any, t: any): Promise<any>;
        qb(e: any, t: any, o: any, i: any): Promise<any>;
        yb(e: any): Promise<{
            content: any;
            local: {
                added: never[];
                removed: never[];
                updated: never[];
            };
            remote: {
                added: never[];
                removed: never[];
                updated: never[];
            };
            localChange: number;
            remoteChange: number;
        }>;
        zb(e: any): Promise<{
            content: any;
            local: {
                added: never[];
                removed: never[];
                updated: never[];
            };
            remote: {
                added: never[];
                removed: never[];
                updated: never[];
            };
            localChange: number;
            remoteChange: number;
        } | {
            content: any;
            local: {
                added: never[];
                removed: never[];
                updated: never[];
            };
            remote: null;
            localChange: number;
            remoteChange: number;
        }>;
        rb(e: any, t: any, o: any, i: any): Promise<void>;
        updateRemoteProfiles(e: any, t: any): Promise<{
            ref: any;
            syncData: {
                version: any;
                machineId: any;
                content: any;
            };
        }>;
        hasLocalData(): Promise<boolean>;
        resolveContent(e: any): Promise<any>;
        Bb(): any;
        Cb(e: any): string;
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
declare function C(f: any, e: any): string;
declare function p(f: any): any;
export { $ as $6Cc, C as $7Cc, p as $8Cc };
//# sourceMappingURL=userDataProfilesManifestSync.d.ts.map