declare function Fi(b: any): any;
declare function pi(b: any, i: any): string;
declare let J: {
    new (i: any, e: any, r: any, o: any, n: any, t: any, a: any, l: any, c: any, x: any, g: any, y: any, E: any, f: any, u: any, s: any, p: any): {
        Ab: any;
        Bb: any;
        Cb: any;
        nb: number;
        ub: any;
        vb: any;
        wb: any;
        xb: any;
        yb: any;
        zb: any;
        ob(i: any, e: any): Promise<{
            skippedExtensions: any;
            builtinExtensions: any;
            baseResource: any;
            baseContent: string;
            localResource: any;
            localContent: string;
            localExtensions: any;
            remoteResource: any;
            remoteExtensions: any;
            remoteContent: string | null;
            previewResource: any;
            previewResult: {
                local: {
                    added: any[];
                    removed: any[];
                    updated: any[];
                } | {
                    added: any[];
                    removed: any[];
                    updated: any[];
                };
                remote: {
                    added: any;
                    updated: never[];
                    removed: never[];
                    all: any;
                } | {
                    added: any[];
                    updated: any[];
                    removed: any[];
                    all: any[];
                } | null;
                content: string;
                localChange: number;
                remoteChange: number;
            };
            localChange: number;
            remoteChange: number;
            acceptedResource: any;
        }[]>;
        sb(i: any): Promise<boolean>;
        Fb(i: any, e: any, r: any, o: any): string;
        pb(i: any, e: any): Promise<any>;
        qb(i: any, e: any, r: any, o: any): Promise<any>;
        Ib(i: any): Promise<{
            content: any;
            local: {
                added: any[];
                removed: any[];
                updated: any[];
            } | {
                added: any[];
                removed: any[];
                updated: any[];
            };
            remote: {
                added: any;
                updated: never[];
                removed: never[];
                all: any;
            } | {
                added: any[];
                updated: any[];
                removed: any[];
                all: any[];
            } | null;
            localChange: number;
            remoteChange: number;
        }>;
        Jb(i: any): Promise<{
            content: any;
            local: {
                added: any[];
                removed: any[];
                updated: any[];
            } | {
                added: any[];
                removed: any[];
                updated: any[];
            };
            remote: {
                added: any;
                updated: never[];
                removed: never[];
                all: any;
            } | {
                added: any[];
                updated: any[];
                removed: any[];
                all: any[];
            } | null;
            localChange: number;
            remoteChange: number;
        }>;
        rb(i: any, e: any, r: any, o: any): Promise<void>;
        Lb(i: any, e: any): any[];
        resolveContent(i: any): Promise<any>;
        Mb(i: any, e: any): string;
        hasLocalData(): Promise<boolean>;
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
        q: W;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let A: {
    new (i: any, e: any, r: any, o: any, n: any, t: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        getLocalExtensions(i: any): Promise<{
            localExtensions: any;
            ignoredExtensions: any;
        }>;
        updateLocalExtensions(i: any, e: any, r: any, o: any, n: any): Promise<any[]>;
        h(i: any, e: any, r: any, o: any): void;
        j(i: any, e: any): Promise<any>;
    };
};
declare let j: {
    new (i: any, e: any, r: any, o: any, n: any, t: any, a: any, l: any): {
        p: any;
        q: any;
        t(i: any): Promise<any>;
        u(i: any, e: any): {
            installedExtensions: any[];
            newExtensions: any[];
            disabledExtensions: any[];
            remoteExtensions: any;
        };
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
import { $ud as W } from "../../../base/common/lifecycle.js";
export { Fi as $VAc, pi as $WAc, J as $XAc, A as $YAc, j as $ZAc };
//# sourceMappingURL=extensionsSync.d.ts.map