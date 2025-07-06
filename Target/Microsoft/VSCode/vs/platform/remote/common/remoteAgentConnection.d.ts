declare function Ee(e: any, t: any, r: any): Promise<any>;
declare function Re(e: any, t: any): Promise<any>;
declare function ye(e: any, t: any, r: any): Promise<any>;
declare class oe {
    constructor(t: any, r: any);
    reconnectionToken: any;
    millisSinceLastIncomingData: any;
    type: number;
}
declare class ie {
    constructor(t: any, r: any, n: any, o: any);
    reconnectionToken: any;
    millisSinceLastIncomingData: any;
    durationSeconds: any;
    c: any;
    type: number;
    skipWait(): void;
}
declare class ce {
    constructor(t: any, r: any, n: any);
    reconnectionToken: any;
    millisSinceLastIncomingData: any;
    attempt: any;
    type: number;
}
declare class x {
    constructor(t: any, r: any, n: any);
    reconnectionToken: any;
    millisSinceLastIncomingData: any;
    attempt: any;
    type: number;
}
declare class se {
    constructor(t: any, r: any, n: any, o: any);
    reconnectionToken: any;
    millisSinceLastIncomingData: any;
    attempt: any;
    handled: any;
    type: number;
}
declare class h extends V {
    static triggerPermanentFailure(t: any, r: any, n: any): void;
    static debugTriggerReconnection(): void;
    static debugPauseSocketWriting(): void;
    constructor(t: any, r: any, n: any, o: any, i: any);
    get n(): boolean | undefined;
    t: any;
    u: any;
    reconnectionToken: any;
    protocol: any;
    w: any;
    m: any;
    onDidStateChange: any;
    c: boolean;
    r: boolean;
    s: boolean;
    y(): Promise<void>;
    z(): Promise<void>;
    C(t: any, r: any, n: any): void;
    D(t: any, r: any, n: any): void;
    F(): void;
}
declare class ae extends h {
    client: any;
    G(t: any, r: any): Promise<void>;
}
declare class le extends h {
    H: any;
    debugPort: any;
    G(t: any, r: any): Promise<void>;
}
declare var O: any;
declare var D: any;
import { $vd as V } from "../../../base/common/lifecycle.js";
export { Ee as $oB, Re as $pB, ye as $qB, oe as $rB, ie as $sB, ce as $tB, x as $uB, se as $vB, h as $wB, ae as $xB, le as $yB, O as ConnectionType, D as PersistentConnectionEventType };
//# sourceMappingURL=remoteAgentConnection.d.ts.map