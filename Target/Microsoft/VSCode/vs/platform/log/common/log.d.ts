declare class l extends b {
    constructor(...args: any[]);
    b: any;
    c: any;
    onDidChangeLogLevel: any;
    setLevel(e: any): void;
    getLevel(): any;
    f(e: any): boolean;
    g(e: any): boolean;
}
declare const q: any;
declare const F: any;
declare function G(t: any): boolean;
declare const h: any;
declare function T(t: any, e: any): boolean;
declare class Y extends l {
    constructor(e: any);
    h: any;
    f(e: any): any;
    trace(e: any, ...r: any[]): void;
    debug(e: any, ...r: any[]): void;
    info(e: any, ...r: any[]): void;
    warn(e: any, ...r: any[]): void;
    error(e: any, ...r: any[]): void;
    flush(): void;
}
declare class _ extends l {
    constructor(e?: any);
    h: boolean;
    trace(e: any, ...r: any[]): void;
    debug(e: any, ...r: any[]): void;
    info(e: any, ...r: any[]): void;
    warn(e: any, ...r: any[]): void;
    error(e: any, ...r: any[]): void;
    flush(): void;
}
declare class H extends l {
    constructor(e?: any, r?: boolean);
    h: boolean;
    trace(e: any, ...r: any[]): void;
    debug(e: any, ...r: any[]): void;
    info(e: any, ...r: any[]): void;
    warn(e: any, ...r: any[]): void;
    error(e: any, ...r: any[]): void;
    flush(): void;
}
declare class K extends l {
    constructor(e: any, r?: any);
    h: any;
    trace(e: any, ...r: any[]): void;
    debug(e: any, ...r: any[]): void;
    info(e: any, ...r: any[]): void;
    warn(e: any, ...r: any[]): void;
    error(e: any, ...r: any[]): void;
    j(e: any): any;
    flush(): void;
}
declare class M extends l {
    constructor(e: any);
    h: any;
    trace(e: any, ...r: any[]): void;
    debug(e: any, ...r: any[]): void;
    info(e: any, ...r: any[]): void;
    warn(e: any, ...r: any[]): void;
    error(e: any, ...r: any[]): void;
    flush(): void;
}
declare class j extends b {
    constructor(e: any, r: any, o: any);
    j: any;
    m: any;
    b: v;
    f: any;
    onDidChangeLoggers: any;
    g: any;
    onDidChangeLogLevel: any;
    h: any;
    onDidChangeVisibility: any;
    n(e: any): any;
    getLogger(e: any): any;
    createLogger(e: any, r: any): any;
    s(e: any): any;
    setLogLevel(e: any, r: any): void;
    setVisibility(e: any, r: any): void;
    getLogLevel(e: any): any;
    registerLogger(e: any): void;
    deregisterLogger(e: any): void;
    getRegisteredLoggers(): Generator<any, void, unknown>;
    getRegisteredLogger(e: any): any;
}
declare class $ {
    onDidChangeLogLevel: any;
    setLevel(e: any): void;
    getLevel(): any;
    trace(e: any, ...r: any[]): void;
    debug(e: any, ...r: any[]): void;
    info(e: any, ...r: any[]): void;
    warn(e: any, ...r: any[]): void;
    error(e: any, ...r: any[]): void;
    critical(e: any, ...r: any[]): void;
    dispose(): void;
    flush(): void;
}
declare class P extends $ {
}
declare class Q extends j {
    constructor();
    t(e: any, r: any, o: any): $;
}
declare function X(t: any): any;
declare function W(t: any): "error" | "trace" | "debug" | "info" | "warn" | "off" | undefined;
declare function Z(t: any): {
    original: string;
    value: any;
} | undefined;
declare function y(t: any): any;
declare const ee: I;
declare var s: any;
declare function J(t: any, e: any, r: any): void;
import { $vd as b } from "../../../base/common/lifecycle.js";
import { $Ic as v } from "../../../base/common/map.js";
import { $Wn as I } from "../../contextkey/common/contextkey.js";
export { l as $$n, q as $5n, F as $6n, G as $7n, h as $8n, T as $9n, Y as $_n, _ as $ao, H as $bo, K as $co, M as $do, j as $eo, $ as $fo, P as $go, Q as $ho, X as $io, W as $jo, Z as $ko, y as $lo, ee as $mo, s as LogLevel, J as log };
//# sourceMappingURL=log.d.ts.map