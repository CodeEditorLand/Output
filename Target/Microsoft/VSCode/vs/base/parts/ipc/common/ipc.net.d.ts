declare class x {
    get byteLength(): number;
    a: any[];
    b: number;
    acceptChunk(e: any): void;
    read(e: any): any;
    peek(e: any): any;
    c(e: any, i: any): any;
}
declare class A extends L {
    constructor(e: any);
    f: w;
    onMessage: any;
    g: w;
    onDidDispose: any;
    a: any;
    b: any;
    c: any;
    drain(): any;
    getSocket(): any;
    sendDisconnect(): void;
    send(e: any): void;
}
declare class N extends q {
    static fromSocket(e: any, i: any): N;
    get onDidDispose(): any;
    b: any;
}
declare class f {
    b: boolean;
    c: boolean;
    d: any[];
    a: w;
    event: any;
    f(): void;
    fire(e: any): void;
    flushBuffer(): void;
}
declare class M {
    constructor(e: any);
    get unacknowledgedCount(): number;
    v: f;
    onControlMessage: any;
    w: f;
    onMessage: any;
    x: f;
    onDidDispose: any;
    y: f;
    onSocketClose: any;
    z: f;
    onSocketTimeout: any;
    t: any;
    u: any;
    a: boolean;
    c: U;
    d: number;
    f: number;
    g: any;
    h: number;
    j: number;
    k: number;
    l: any;
    n: number;
    o: number;
    s: R;
    p: any;
    q: any;
    r: any;
    m: NodeJS.Timeout | null;
    dispose(): void;
    drain(): any;
    sendDisconnect(): void;
    b: boolean | undefined;
    sendPause(): void;
    sendResume(): void;
    pauseSocketWriting(): void;
    getSocket(): any;
    getMillisSinceLastIncomingData(): number;
    beginAcceptReconnection(e: any, i: any): void;
    endAcceptReconnection(): void;
    acceptDisconnect(): void;
    A(e: any): void;
    readEntireBuffer(): any;
    flush(): void;
    send(e: any): void;
    sendControl(e: any): void;
    B(): void;
    C(): void;
    D(): void;
    E(): void;
}
declare var D: any;
declare var B: any;
declare var W: any;
declare var I: any;
import { $vd as L } from "../../../common/lifecycle.js";
import { $ef as w } from "../../../common/event.js";
import { $Im as q } from "./ipc.js";
declare class U {
    a: any;
    b: H | null;
    length(): number;
    peek(): any;
    toArray(): any[];
    pop(): void;
    push(e: any): void;
}
import { $ud as R } from "../../../common/lifecycle.js";
declare class H {
    constructor(e: any);
    data: any;
    next: any;
}
export { x as $Nm, A as $Om, N as $Pm, f as $Qm, M as $Rm, D as ProtocolConstants, B as SocketCloseEventType, W as SocketDiagnostics, I as SocketDiagnosticsEventType };
//# sourceMappingURL=ipc.net.d.ts.map