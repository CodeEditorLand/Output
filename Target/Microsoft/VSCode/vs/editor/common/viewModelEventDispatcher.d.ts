declare class N {
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): this | null;
}
declare class v {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class $ {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class b {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class L {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class S {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class W {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class M {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class j {
    constructor(t: any);
    event: any;
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): null;
}
declare class H extends g {
    c: any;
    onEvent: any;
    f: any[];
    g: any;
    h: boolean;
    j: C | null;
    m: number;
    n: any[];
    emitOutgoingEvent(t: any): void;
    r(t: any): void;
    s(): void;
    addViewEventHandler(t: any): void;
    removeViewEventHandler(t: any): void;
    beginEmitViewEvents(): C | null;
    endEmitViewEvents(): void;
    emitSingleViewEvent(t: any): void;
    t(t: any): void;
    u(): void;
    w(): void;
}
declare class C {
    viewEvents: any[];
    outgoingEvents: any[];
    emitViewEvent(t: any): void;
    emitOutgoingEvent(t: any): void;
}
declare class d {
    constructor(t: any, e: any, i: any, h: any);
    kind: number;
    c: any;
    d: any;
    contentWidth: any;
    contentHeight: any;
    contentWidthChanged: boolean;
    contentHeightChanged: boolean;
    isNoOp(): boolean;
    attemptToMerge(t: any): d | null;
}
declare class c {
    constructor(t: any, e: any);
    kind: number;
    oldHasFocus: any;
    hasFocus: any;
    isNoOp(): boolean;
    attemptToMerge(t: any): c | null;
}
declare class T {
    constructor(t: any, e: any);
    kind: number;
    oldHasFocus: any;
    hasFocus: any;
    isNoOp(): boolean;
    attemptToMerge(t: any): c | null;
}
declare class u {
    constructor(t: any, e: any, i: any, h: any, n: any, r: any, o: any, f: any);
    kind: number;
    c: any;
    d: any;
    f: any;
    g: any;
    scrollWidth: any;
    scrollLeft: any;
    scrollHeight: any;
    scrollTop: any;
    scrollWidthChanged: boolean;
    scrollLeftChanged: boolean;
    scrollHeightChanged: boolean;
    scrollTopChanged: boolean;
    isNoOp(): boolean;
    attemptToMerge(t: any): u | null;
}
declare class x {
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): this | null;
}
declare class F {
    kind: number;
    isNoOp(): boolean;
    attemptToMerge(t: any): this | null;
}
declare class l {
    static c(t: any, e: any): boolean;
    constructor(t: any, e: any, i: any, h: any, n: any, r: any, o: any);
    kind: number;
    oldSelections: any;
    selections: any;
    oldModelVersionId: any;
    modelVersionId: any;
    source: any;
    reason: any;
    reachedMaxCursorCount: any;
    isNoOp(): boolean;
    attemptToMerge(t: any): l | null;
}
declare var a: any;
import { $vd as g } from "../../base/common/lifecycle.js";
export { N as $1db, v as $2db, $ as $3db, b as $4db, L as $5db, S as $6db, W as $7db, M as $8db, j as $9db, H as $Rdb, C as $Sdb, d as $Tdb, c as $Udb, T as $Vdb, u as $Wdb, x as $Xdb, F as $Ydb, l as $Zdb, a as OutgoingViewModelEventKind };
//# sourceMappingURL=viewModelEventDispatcher.d.ts.map