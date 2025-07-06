declare class O {
    constructor(t: any);
    b: any;
    a: number;
    read(t: any): any;
}
declare class U {
    a: any[];
    get buffer(): $;
    write(t: any): void;
}
declare function I(n: any, t: any): void;
declare function E(n: any): any;
declare class q {
    constructor(t: any, e: any, i?: null, s?: number);
    h: any;
    j: any;
    k: any;
    l: number;
    b: Map<any, any>;
    d: Map<any, any>;
    g: Map<any, any>;
    f: any;
    registerChannel(t: any, e: any): void;
    m(t: any): void;
    o(t: any, e?: undefined): any;
    p(t: any): any;
    q(t: any): void;
    s(t: any): void;
    t(t: any): void;
    u(t: any): void;
    v(t: any): void;
    w(t: any): void;
    dispose(): void;
}
declare class D {
    constructor(t: any, e?: null);
    l: any;
    a: boolean;
    b: any;
    d: Set<any>;
    f: Map<any, any>;
    g: number;
    k: k;
    onDidInitialize: any;
    h: any;
    j: any;
    getChannel(t: any): {
        call(i: any, s: any, r: any): Promise<any>;
        listen(i: any, s: any): any;
    };
    m(t: any, e: any, i: any, s?: any): Promise<any>;
    o(t: any, e: any, i: any): any;
    p(t: any): void;
    q(t: any, e?: undefined): any;
    r(t: any): any;
    s(t: any): void;
    t(t: any): void;
    get onDidInitializePromise(): any;
    u(): any;
    dispose(): void;
}
declare class St {
    constructor(t: any, e: any, i: any);
    get connections(): any[];
    a: Map<any, any>;
    f: Set<any>;
    g: k;
    onDidAddConnection: any;
    h: k;
    onDidRemoveConnection: any;
    j: _;
    getChannel(t: any, e: any): {
        call(s: any, r: any, c: any): any;
        listen(s: any, r: any): any;
    };
    k(t: any, e: any, i: any, s: any): any;
    registerChannel(t: any, e: any): void;
    dispose(): void;
}
declare class Ct {
    constructor(t: any, e: any, i?: null);
    a: D;
    d: q;
    getChannel(t: any): {
        call(i: any, s: any, r: any): Promise<any>;
        listen(i: any, s: any): any;
    };
    registerChannel(t: any, e: any): void;
    dispose(): void;
}
declare function H(n: any): {
    call(t: any, e: any, i: any): any;
    listen(t: any, e: any): any;
};
declare function Pt(n: any): {
    call(e: any, i: any, s: any): any;
    listen(e: any, i: any): any;
};
declare class jt {
    constructor(t: any);
    a: any;
    routeCall(t: any): any;
    routeEvent(t: any): any;
    b(t: any): any;
}
declare class At {
    constructor(t: any, e: any);
    d: any;
    f: any;
    a: number;
    b: number;
    logOutgoing(t: any, e: any, i: any, s: any, r: any): void;
    logIncoming(t: any, e: any, i: any, s: any, r: any): void;
}
declare var Z: any;
declare var G: any;
import { $Ki as $ } from "../../../common/buffer.js";
import { $ef as k } from "../../../common/event.js";
import { $ud as _ } from "../../../common/lifecycle.js";
export { O as $Bm, U as $Cm, I as $Dm, E as $Em, q as $Fm, D as $Gm, St as $Hm, Ct as $Im, H as $Jm, Pt as $Km, jt as $Lm, At as $Mm, Z as ProxyChannel, G as RequestInitiator };
//# sourceMappingURL=ipc.d.ts.map