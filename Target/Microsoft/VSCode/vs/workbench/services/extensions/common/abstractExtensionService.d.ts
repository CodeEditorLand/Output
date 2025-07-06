declare class Ut {
    constructor(t: any);
    extensions: any;
}
declare class zt {
    constructor(t: any);
    extensions: any;
}
declare function Ce(c: any): boolean;
declare function P(c: any, t: any, e: any, i: any, s: any): any[];
declare function C(c: any, t: any, e: any, i: any): any[];
declare function Fe(c: any, t: any, e: any, i: any): boolean;
declare class Gt {
    constructor(t: any);
    get messages(): any[];
    get activationTimes(): any;
    get runtimeErrors(): any[];
    get activationStarted(): boolean;
    id: any;
    a: any[];
    b: any;
    c: any[];
    d: boolean;
    clearRuntimeStatus(): void;
    addMessage(t: any): void;
    setActivationTimes(t: any): void;
    addRuntimeError(t: any): void;
    onWillActivate(): void;
}
declare class S {
    c: any[];
    d(): void;
    registerCrash(): void;
    shouldAutomaticallyRestart(): boolean;
}
declare class qt {
    readActivationEvents(t: any): any;
}
declare let Y: {
    new (t: any, e: any, i: any, s: any, n: any, r: any, o: any, a: any, l: any, f: any, h: any, u: any, w: any, F: any, M: any, N: any, W: any, _: any, U: any, z: any, K: any): {
        H: any;
        I: any;
        J: any;
        L: any;
        M: any;
        N: any;
        O: any;
        P: any;
        Q: any;
        R: any;
        S: any;
        U: any;
        W: any;
        X: any;
        Y: any;
        Z: any;
        $: any;
        ab: any;
        bb: any;
        cb: any;
        c: any;
        onDidRegisterExtensions: any;
        f: any;
        onDidChangeExtensionsStatus: any;
        g: any;
        onDidChangeExtensions: any;
        h: any;
        onWillActivateByEvent: any;
        j: any;
        onDidChangeResponsiveChange: any;
        m: any;
        onWillStop: any;
        n: qt;
        s: yt;
        t: q;
        u: st;
        w: Set<any>;
        z: S;
        C: any[];
        D: boolean;
        F: any;
        G: number;
        a: any;
        b: any;
        y: {
            readonly maxLocalProcessAffinity: number;
            readonly maxLocalWebWorkerAffinity: number;
            d: any;
            f: any;
            g: any;
            h: any;
            i: any;
            j: any;
            a: st;
            b: number;
            c: number;
            set(n: any, i: any): void;
            readExtensionKinds(n: any): any;
            getRunningLocation(n: any): any;
            filterByRunningLocation(n: any, i: any): any;
            filterByExtensionHostKind(n: any, i: any): any;
            filterByExtensionHostManager(n: any, i: any): any;
            k(n: any, i: any, t: any): {
                affinities: st;
                maxAffinity: number;
            };
            computeRunningLocation(n: any, i: any, t: any): st;
            l(n: any, i: any, t: any, s: any): {
                runningLocation: st;
                maxLocalProcessAffinity: number;
                maxLocalWebWorkerAffinity: number;
            };
            initializeRunningLocation(n: any, i: any): void;
            deltaExtensions(n: any, i: any): st;
            m(n: any): void;
        };
        db(t: any): any;
        eb(t: any): Promise<void>;
        fb(t: any, e: any, i: any): Promise<void>;
        gb(t: any, e: any, i: any): Promise<void>;
        hb(t: any, e: any, i: any, s: any, n: any): Promise<void>;
        canAddExtension(t: any): boolean;
        ib(t: any, e: any): boolean;
        canRemoveExtension(t: any): boolean;
        jb(t: any): Promise<void>;
        kb(): Promise<void>;
        lb(t: any): Promise<void>;
        mb(): Promise<void>;
        nb(t: any): any;
        ob(): void;
        pb(t: any): Promise<any>;
        qb(): Promise<void>;
        rb(t: any): Promise<any>;
        sb(t: any, e: any): Promise<any>;
        stopExtensionHosts(t: any, e: any): Promise<boolean>;
        tb(): Promise<void>;
        ub(t: any, e?: boolean): Promise<boolean>;
        vb(t: any, e: any): void;
        wb(t: any, e: any, i: any): any[] | null;
        xb(t: any, e: any): any;
        yb(t: any, e: any, i: any): void;
        zb(t: any, e: any, i: any): void;
        Ab(t: any): Promise<any>;
        Bb(t: any, e: any): Promise<void>;
        Cb(t: any): void;
        startExtensionHosts(t: any): Promise<void>;
        activateByEvent(t: any, e?: number): Promise<void>;
        Db(t: any, e: any): Promise<void>;
        activateById(t: any, e: any): Promise<void>;
        activationEventIsDone(t: any): any;
        whenInstalledExtensionsRegistered(): Promise<any>;
        readonly extensions: any[];
        Eb(): Promise<import("./extensionDescriptionRegistry.js").$JBc>;
        getExtension(t: any): Promise<any>;
        readExtensionPointContributions(t: any): Promise<Lt[]>;
        getExtensionsStatus(): any;
        getInspectPorts(t: any, e: any): Promise<any[]>;
        setRemoteEnvironment(t: any): Promise<void>;
        Fb(t: any): any;
        Gb(t: any, e: any): void;
        Hb(t: any): any;
        Ib(t: any): void;
        Kb(t: any): {
            _activateById: (e: any, i: any) => Promise<void>;
            _onWillActivateExtension: (e: any) => void;
            _onDidActivateExtension: (e: any, i: any, s: any, n: any, r: any) => void;
            _onDidActivateExtensionError: (e: any, i: any) => void;
            _onExtensionRuntimeError: (e: any, i: any) => void;
        };
        _activateById(t: any, e: any): Promise<void>;
        Lb(t: any, e: any): void;
        Mb(t: any, e: any, i: any, s: any, n: any): void;
        Nb(t: any, e: any): void;
        Ob(t: any, e: any): void;
        q: Q;
        dispose(): void;
        B(t: any): any;
    };
    Jb(t: any, e: any, i: any): void;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class _t {
    constructor(t: any);
    extensions: any;
}
import { $KBc as yt } from "./extensionDescriptionRegistry.js";
import { $Lh as q } from "../../../../base/common/async.js";
import { $Uy as st } from "../../../../platform/extensions/common/extensions.js";
import { $aP as Lt } from "./extensions.js";
import { $ud as Q } from "../../../../base/common/lifecycle.js";
export { Ut as $1Bc, zt as $2Bc, Ce as $3Bc, P as $4Bc, C as $5Bc, Fe as $6Bc, Gt as $7Bc, S as $8Bc, qt as $9Bc, Y as $YBc, _t as $ZBc };
//# sourceMappingURL=abstractExtensionService.d.ts.map