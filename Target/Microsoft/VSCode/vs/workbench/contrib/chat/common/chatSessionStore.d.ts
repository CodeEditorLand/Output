export { y as $kfc };
declare let y: {
    new (t: any, e: any, s: any, i: any, r: any, o: any, h: any, w: any): {
        m: any;
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        y: any;
        g: I;
        j: boolean;
        c: any;
        f: any;
        storeSessions(t: any): Promise<void>;
        h: Promise<any> | undefined;
        z(t: any): Promise<void>;
        C(): Promise<void>;
        D(): 1 | -1;
        F(): Promise<void>;
        G(t: any): Promise<void>;
        hasSessions(): boolean;
        isSessionEmpty(t: any): any;
        deleteSession(t: any): Promise<void>;
        clearAllSessions(): Promise<void>;
        setSessionTitle(t: any, e: any): Promise<void>;
        H(t: any, e: any, s: any): void;
        J(): any;
        I: any;
        getIndex(): Promise<any>;
        logIndex(): void;
        migrateDataIfNeeded(t: any): Promise<void>;
        L(t: any): Promise<void>;
        readSession(t: any): Promise<any>;
        M(t: any): Promise<any>;
        N(t: any): any;
        getChatStorageFolder(): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Hh as I } from "../../../../base/common/async.js";
//# sourceMappingURL=chatSessionStore.d.ts.map