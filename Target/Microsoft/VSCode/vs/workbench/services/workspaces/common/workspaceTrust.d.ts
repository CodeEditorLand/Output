declare const A: "security.workspace.trust.enabled";
declare const mt: "security.workspace.trust.startupPrompt";
declare const Tt: "security.workspace.trust.banner";
declare const b: "security.workspace.trust.untrustedFiles";
declare const _: "security.workspace.trust.emptyWindow";
declare const wt: "extensions.supportUntrustedWorkspaces";
declare const G: "content.trust.model.key";
declare class L {
    constructor(t: any, s: any, i: any);
    a: any;
    b: any;
    c: any;
    get folders(): any;
    get transient(): any;
    get configuration(): any;
    get id(): any;
}
declare let y: {
    new (t: any, s: any): {
        a: any;
        b: any;
        isWorkspaceTrustEnabled(): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let W: {
    new (t: any, s: any, i: any, e: any, r: any, n: any, o: any, p: any): {
        D: any;
        F: any;
        G: any;
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        a: string;
        j: any;
        onDidChangeTrust: any;
        m: any;
        onDidChangeTrustedFolders: any;
        n: any[];
        s: boolean;
        r: any;
        z: N;
        C: any;
        w: any;
        t: any;
        N(): void;
        y: any;
        O(): void;
        P(t: any): Promise<any>;
        Q(): Promise<void>;
        R(): any;
        S(): Promise<void>;
        U(): any;
        W(): any;
        X(t: any): Promise<void>;
        db: any;
        Y(t: any): boolean;
        Z(t: any): {
            trusted: boolean;
            uri: any;
        };
        $(t: any, s: any): Promise<void>;
        ab(): boolean;
        bb(t: any): boolean;
        cb(t: any): boolean;
        readonly workspaceResolved: any;
        readonly workspaceTrustInitialized: any;
        acceptsOutOfWorkspaceFiles: any;
        isWorkspaceTrusted(): any;
        isWorkspaceTrustForced(): boolean;
        canSetParentFolderTrust(): boolean;
        setParentFolderTrust(t: any): Promise<void>;
        canSetWorkspaceTrust(): boolean;
        setWorkspaceTrust(t: any): Promise<void>;
        getUriTrustInfo(t: any): Promise<{
            trusted: boolean;
            uri: any;
        }>;
        setUrisTrust(t: any, s: any): Promise<void>;
        getTrustedUris(): any;
        setTrustedUris(t: any): Promise<void>;
        addWorkspaceTrustTransitionParticipant(t: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let d: {
    new (t: any, s: any): {
        n: any;
        r: any;
        h: any;
        onDidInitiateOpenFilesTrustRequest: any;
        j: any;
        onDidInitiateWorkspaceTrustRequest: any;
        m: any;
        onDidInitiateWorkspaceTrustRequestOnStartup: any;
        s: any;
        completeOpenFilesTrustRequest(t: any, s: any): Promise<void>;
        requestOpenFilesTrust(t: any): Promise<any>;
        a: Promise<any> | undefined;
        b: ((value: any) => void) | undefined;
        t(t: any): void;
        cancelWorkspaceTrustRequest(): void;
        completeWorkspaceTrustRequest(t: any): Promise<void>;
        requestWorkspaceTrust(t: any): Promise<any>;
        c: Promise<any> | undefined;
        g: ((value: any) => void) | undefined;
        requestWorkspaceTrustOnStartup(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class N {
    constructor(t: any);
    c: string;
    d: string;
    a: j | undefined;
    b: any;
    set acceptsOutOfWorkspaceFiles(t: any);
    get acceptsOutOfWorkspaceFiles(): any;
    set isEmptyWorkspaceTrusted(t: any);
    get isEmptyWorkspaceTrusted(): any;
}
import { $Dub as j } from "../../../common/memento.js";
export { A as $gOb, mt as $hOb, Tt as $iOb, b as $jOb, _ as $kOb, wt as $lOb, G as $mOb, L as $nOb, y as $oOb, W as $pOb, d as $qOb };
//# sourceMappingURL=workspaceTrust.d.ts.map