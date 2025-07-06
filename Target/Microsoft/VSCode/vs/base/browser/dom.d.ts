declare function Xt(t: any, e: any, ...n: any[]): HTMLElement;
declare namespace Xt {
    function SVG(t: any, e: any, ...n: any[]): HTMLElement;
}
declare function d(t: any, e: any, n: any, r: any): Mt;
declare function pn(t: any, e: any): void;
declare function Re(t: any): void;
declare function hn(t: any): any[];
declare function on(t: any): boolean;
declare function Gt(t: any): boolean;
declare function un(t: any): boolean;
declare function cn(t: any): boolean;
declare function an(t: any): boolean;
declare function fn(t: any): boolean;
declare namespace E {
    let CLICK: string;
    let AUXCLICK: string;
    let DBLCLICK: string;
    let MOUSE_UP: string;
    let MOUSE_DOWN: string;
    let MOUSE_OVER: string;
    let MOUSE_MOVE: string;
    let MOUSE_OUT: string;
    let MOUSE_ENTER: string;
    let MOUSE_LEAVE: string;
    let MOUSE_WHEEL: string;
    let POINTER_UP: string;
    let POINTER_DOWN: string;
    let POINTER_MOVE: string;
    let POINTER_LEAVE: string;
    let CONTEXT_MENU: string;
    let WHEEL: string;
    let KEY_DOWN: string;
    let KEY_PRESS: string;
    let KEY_UP: string;
    let LOAD: string;
    let BEFORE_UNLOAD: string;
    let UNLOAD: string;
    let PAGE_SHOW: string;
    let PAGE_HIDE: string;
    let PASTE: string;
    let ABORT: string;
    let ERROR: string;
    let RESIZE: string;
    let SCROLL: string;
    let FULLSCREEN_CHANGE: string;
    let WK_FULLSCREEN_CHANGE: string;
    let SELECT: string;
    let CHANGE: string;
    let SUBMIT: string;
    let RESET: string;
    let FOCUS: string;
    let FOCUS_IN: string;
    let FOCUS_OUT: string;
    let BLUR: string;
    let INPUT: string;
    let STORAGE: string;
    let DRAG_START: string;
    let DRAG: string;
    let DRAG_ENTER: string;
    let DRAG_LEAVE: string;
    let DRAG_OVER: string;
    let DROP: string;
    let DRAG_END: string;
    let ANIMATION_START: string;
    let ANIMATION_END: string;
    let ANIMATION_ITERATION: string;
}
declare function ln(t: any): boolean;
declare namespace dn {
    function stop(t: any, e: any): any;
}
declare function _e(t: any): number;
declare class jn extends P {
    constructor(e: any, n: any);
    m: any;
    s: any;
    g: number;
    j: number;
    u(): void;
}
declare function ke(t: any): any;
declare function Fe(t: any, e: any): number;
declare function Cn(t: any, ...e: any[]): {
    root: SVGElement;
};
declare function C(t: any, e: any): boolean;
declare function ne(t: any, e: any, n: any): void;
declare function Ge(t: any, e: any): void;
declare function In(t: any, e: any, n: any): T;
declare function Ve(t: any, e: any): boolean;
declare function Hn(t: any): boolean;
declare function kt(t: any, e: any, n: any): any;
declare class Un {
    constructor(e: any, n: any, r: any);
    j: any;
    l: any;
    g: Int16Array<ArrayBuffer>;
    contains(e: any, n: any): boolean;
}
declare function Qe(t: any, e: any, n: any): boolean;
declare class k {
    constructor(e: any, n: any, r: any, s: any, u: any, i: any, a: any);
    g: import("../common/observableInternal/observables/derivedImpl.js").$re[];
    j: any;
    readEffect(e: any): void;
    keepUpdated(e: any): this;
    toDisposableLiveElement(): se;
}
declare function st(t: any): any;
declare class se {
    constructor(e: any, n: any);
    element: any;
    g: any;
    dispose(): void;
}
declare function Xe(t: any): boolean;
declare class ie extends k {
    constructor(...args: any[]);
    get element(): any;
    get isHovered(): import("../common/observableInternal/observables/observableValue.js").$De;
    l: import("../common/observableInternal/observables/observableValue.js").$De | undefined;
    get didMouseMoveDuringHover(): import("../common/observableInternal/observables/observableValue.js").$De;
    m: import("../common/observableInternal/observables/observableValue.js").$De | undefined;
}
declare function it(t: any): any;
declare function ot(): any;
declare function Ye(t: any): boolean;
declare function qe(t: any): boolean;
declare function Ze(t: any): boolean;
declare function _(): any;
declare function ut(): any;
declare const Ft: {
    mutationObservers: Map<any, any>;
    observe(t: any, e: any, n: any): any;
};
declare function Je(t?: HTMLHeadElement): any;
declare function ze(t?: HTMLHeadElement): any;
declare function x(t: any): boolean;
declare function tn(t: any): boolean;
declare function en(t: any): boolean;
declare function nn(t: any): boolean;
declare function rn(t: any): boolean;
declare function sn(t: any): boolean;
declare function Ae(e: any, n: any, r: any, s: any): Mt;
declare function mn(t: any): K;
declare function Oe(e: any, n: any, r: any): Mt;
declare function gn(t: any, e: any): any;
declare function De(e: any, n: any, r: any): Mt;
declare function Vt(t: any, ...e: any[]): any;
declare function Kt(t: any, e: any, n: any): Mt;
declare function En(t: any, e: any): any;
declare function Le(t: any, e: any, n: any): Mt;
declare function wn(t: any, ...e: any[]): void;
declare function Pt(t: any, e: any, n: any): Mt;
declare function Me(t: any, e: any, n: any): any;
declare function yn(t: any, e: any): any[];
declare class Ne extends gt {
}
declare function bn(t: any, ...e: any[]): void;
declare let St: any;
declare function Yt(...t: any[]): void;
declare let A: any;
declare function qt(...t: any[]): void;
declare function Ke(t: any, e: any, n: any, r: any): any;
declare function xn(t: any): void;
declare class Pe extends Et {
    constructor(e: any);
    l: any;
    cancelAndSet(e: any, n: any, r: any): void;
}
declare function vn(t: any): (e: any) => void;
declare function Se(t: any, e: any): any;
declare function $n(t: any): Promise<any>;
declare function We(t: any, e: any): any;
declare function Tn(t: any, e: any): number;
declare function je(t: any, e: any, n: any, r: any, s: any): Bt;
declare function Rn(t: any): void;
declare function U(t: any): any;
declare function An(t: any): void;
declare function nt(t: any, e: any, n: any): any;
declare function On(t: any, e?: boolean): boolean;
declare class w {
    static is(e: any): boolean;
    static lift(e: any): w;
    static equals(e: any, n: any): boolean;
    constructor(e: any, n: any);
    width: any;
    height: any;
    with(e?: any, n?: any): w;
}
declare function Dn(t: any, e: any): any;
declare function Q(t: any): {
    left: any;
    top: any;
};
declare function Ln(t: any, e: any): void;
declare function Be(t: any, e: any, n: any): void;
declare function Mn(): Promise<any>;
declare function Ce(t: any, e: any, n: any, r: any, s: any, u?: string): void;
declare function Nn(t: any): {
    mode: any;
    guess: boolean;
} | null;
declare function Ct(t: any): {
    left: any;
    top: any;
    width: any;
    height: any;
};
declare function Jt(t: any, e?: boolean): any;
declare function Ie(t: any, e: any): boolean;
declare const Kn: readonly string[];
declare function He(t: any): number;
declare function Pn(t: any, e: any, n: any): void;
declare function It(t: any): any;
declare function Sn(t: any): string;
declare function Ue(t: any): number;
declare class b extends y.$ef {
    static getInstance(): any;
    static disposeInstance(): void;
    constructor();
    o: T;
    s: {
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
    };
    G(e: any, n: any): void;
    get keyStatus(): {
        altKey: boolean;
        shiftKey: boolean;
        ctrlKey: boolean;
        metaKey: boolean;
    };
    get isModifierPressed(): boolean;
    resetKeyStatus(): void;
    H(): void;
}
declare function Ht(t: any): any;
declare function Wn(t: any): string | undefined;
declare var L: any;
declare var M: any;
declare function be(i: any): any;
declare function p(i: any): any;
declare function xe(i: any, a: any): any;
declare function V(i: any): any;
declare function Ot(): MapIterator<any>;
declare function Dt(): number;
declare function Bn(t: any, ...e: any[]): {
    root: HTMLElement;
};
declare function ve(i: any): boolean;
declare var q: any;
declare const Lt: any;
declare const Te: any;
declare const $e: any;
declare function ye(i: any): Readonly<{
    dispose(): void;
}> | undefined;
declare class Mt {
    constructor(e: any, n: any, r: any, s: any);
    j: any;
    l: any;
    g: any;
    m: any;
    dispose(): void;
}
import { $vd as P } from "../common/lifecycle.js";
import { $ud as T } from "../common/lifecycle.js";
declare class K extends P {
    static s(e: any): boolean;
    constructor(e: any);
    g: any;
    onDidFocus: any;
    j: any;
    onDidBlur: any;
    m: () => void;
    refreshState(): void;
}
import { $6h as gt } from "../common/async.js";
import { $Yh as Et } from "../common/async.js";
declare class Bt extends P {
    constructor(e: any, n: any, r: any, s?: (t: any, e: any) => any, u?: number);
}
import * as y from "../common/event.js";
export { Xt as $, d as $$5, pn as $$6, Re as $05, hn as $06, on as $16, Gt as $26, un as $36, cn as $46, an as $56, fn as $66, E as $76, ln as $86, dn as $96, _e as $A6, jn as $A7, ke as $B6, Fe as $C6, Cn as $C7, C as $D6, ne as $D7, Ge as $E6, In as $E7, Ve as $F6, Hn as $F7, kt as $G6, Un as $G7, Qe as $H6, k as $H7, st as $I6, se as $I7, Xe as $J6, ie as $J7, it as $K6, ot as $L6, Ye as $M6, qe as $N6, Ze as $O6, _ as $P6, ut as $Q6, Ft as $R6, Je as $S6, ze as $T6, x as $U6, tn as $V6, en as $W6, nn as $X6, rn as $Y6, sn as $Z6, Ae as $_5, mn as $_6, Oe as $a6, gn as $a7, De as $b6, Vt as $b7, Kt as $c6, En as $c7, Le as $d6, wn as $d7, Pt as $e6, Me as $f6, yn as $f7, Ne as $g6, bn as $g7, St as $h6, Yt as $h7, A as $i6, qt as $i7, Ke as $j6, xn as $j7, Pe as $k6, vn as $k7, Se as $l6, $n as $l7, We as $m6, Tn as $m7, je as $n6, Rn as $n7, U as $o6, An as $o7, nt as $p6, On as $p7, w as $q6, Dn as $q7, Q as $r6, Ln as $r7, Be as $s6, Mn as $s7, Ce as $t6, Nn as $t7, Ct as $u6, Jt as $u7, Ie as $v6, Kn as $v7, He as $w6, Pn as $w7, It as $x6, Sn as $x7, Ue as $y6, b as $y7, Ht as $z6, Wn as $z7, L as DetectedFullscreenMode, M as Namespace, be as getDocument, p as getWindow, xe as getWindowById, V as getWindowId, Ot as getWindows, Dt as getWindowsCount, Bn as h, ve as hasWindow, q as n, Lt as onDidRegisterWindow, Te as onDidUnregisterWindow, $e as onWillUnregisterWindow, ye as registerWindow };
//# sourceMappingURL=dom.d.ts.map