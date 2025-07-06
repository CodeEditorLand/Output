declare const U: "onTunnel";
declare const Ce: S;
declare const ce: S;
declare function le(n: any): {
    host: any;
    port: number;
} | undefined;
declare namespace C {
    let source: any;
    let description: any;
}
declare namespace Fe {
    let source_1: any;
    export { source_1 as source };
    let description_1: any;
    export { description_1 as description };
}
declare function j(n: any, e: any, t: any): any;
declare function u(n: any, e: any, t: any): any;
declare function m(n: any, e: any): string;
declare function he(n: any): any;
declare class w extends D {
    static providedActionToAction(e: any): any;
    constructor(e: any);
    r: any;
    j: any[];
    n: P;
    onDidChangeAttributes: any;
    s(): void;
    getAttributes(e: any, t: any, o: any): {
        elevateIfNeeded: any;
        label: any;
        onAutoForward: any;
        requireLocalPort: any;
        protocol: any;
    } | undefined;
    t(e: any): boolean;
    u(e: any): boolean;
    w(e: any, t: any, o: any, r: any, s: any): any;
    y(): any;
    m: {
        elevateIfNeeded: any;
        label: any;
        onAutoForward: any;
        requireLocalPort: any;
        protocol: any;
    } | undefined;
    z(e: any): any;
    C(): {
        elevateIfNeeded: any;
        label: any;
        onAutoForward: any;
        requireLocalPort: any;
        protocol: any;
    } | undefined;
    addAttributes(e: any, t: any, o: any): Promise<any>;
}
declare let F: {
    new (e: any, t: any, o: any, r: any, s: any, i: any, d: any, f: any, a: any, l: any): {
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
        c: Map<any, any>;
        g: P;
        onForwardPort: any;
        h: P;
        onClosePort: any;
        j: P;
        onPortName: any;
        n: P;
        onCandidatesChanged: any;
        t: P;
        onEnvironmentTunnelsSet: any;
        u: boolean;
        z: boolean;
        C: P;
        D: Map<any, any>;
        F: Map<any, any>;
        G: any[];
        U: boolean;
        eb: Date;
        configPortsAttributes: w;
        s: Promise<any>;
        forwarded: Map<any, any>;
        f: Map<any, any>;
        detected: Map<any, any>;
        S(): boolean;
        W(e: any): void;
        X(e: any, t: any): Promise<void>;
        Y(e: any, t: any): {
            _formatted: string | null;
            _fsPath: any;
            readonly fsPath: any;
            toString(e?: boolean): string;
            toJSON(): {
                $mid: number;
            };
            scheme: any;
            authority: any;
            path: any;
            query: any;
            fragment: any;
            with(e: any): /*elided*/ any;
        };
        Z(e: any): Promise<string | undefined>;
        $(): Promise<string | undefined>;
        ab(): Promise<string | undefined>;
        bb(): Promise<any>;
        restoreForwarded(): Promise<void>;
        w: any;
        cb(): void;
        db(): Promise<void>;
        y: any;
        fb(e: any, t: any, o: any): Promise<any>;
        forward(e: any, t: any): Promise<any>;
        gb(e: any, t: any): Promise<any>;
        hb(e: any, t: any): any;
        ib(e: any, t: any, o: any): Promise<any>;
        name(e: any, t: any, o: any): Promise<void>;
        close(e: any, t: any, o: any): Promise<void>;
        address(e: any, t: any): any;
        readonly environmentTunnelsSet: boolean;
        addEnvironmentTunnels(e: any): void;
        setCandidateFilter(e: any): void;
        r: any;
        setCandidates(e: any): Promise<void>;
        jb(e: any): Map<any, any>;
        m: Map<any, any> | undefined;
        readonly candidates: any[];
        readonly candidatesOrUndefined: any[] | undefined;
        kb(): Promise<void>;
        getAttributes(e: any, t?: boolean): Promise<Map<any, any> | undefined>;
        addAttributesProvider(e: any): void;
        q: W;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var b: any;
declare var N: any;
declare var A: any;
import { $Wn as S } from "../../../../platform/contextkey/common/contextkey.js";
import { $vd as D } from "../../../../base/common/lifecycle.js";
import { $ef as P } from "../../../../base/common/event.js";
import { $ud as W } from "../../../../base/common/lifecycle.js";
export { U as $lY, Ce as $mY, ce as $nY, le as $oY, C as $pY, Fe as $qY, j as $rY, u as $sY, m as $tY, he as $uY, w as $vY, F as $wY, b as OnPortForward, N as TunnelCloseReason, A as TunnelSource };
//# sourceMappingURL=tunnelModel.d.ts.map