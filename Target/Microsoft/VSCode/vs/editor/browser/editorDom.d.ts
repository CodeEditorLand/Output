declare class a {
    constructor(t: any, s: any);
    x: any;
    y: any;
    toClientCoordinates(t: any): C;
}
declare class C {
    constructor(t: any, s: any);
    clientX: any;
    clientY: any;
    toPageCoordinates(t: any): a;
}
declare class M {
    constructor(t: any, s: any, e: any, r: any);
    x: any;
    y: any;
    width: any;
    height: any;
}
declare class w {
    constructor(t: any, s: any);
    x: any;
    y: any;
}
declare function g(i: any): M;
declare function y(i: any, t: any, s: any): w;
declare class c extends p {
    constructor(t: any, s: any, e: any);
    isFromPointerCapture: any;
    pos: a;
    editorPos: M;
    relativePos: w;
}
declare class D {
    constructor(t: any);
    a: any;
    b(t: any): c;
    onContextMenu(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onMouseUp(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onMouseDown(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onPointerDown(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onMouseLeave(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onMouseMove(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
}
declare class U {
    constructor(t: any);
    a: any;
    b(t: any): c;
    onPointerUp(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onPointerDown(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onPointerLeave(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
    onPointerMove(t: any, s: any): {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    };
}
declare class L extends b {
    constructor(t: any);
    a: any;
    b: any;
    c: {
        j: any;
        l: any;
        g: any;
        m: any;
        dispose(): void;
    } | null;
    startMonitoring(t: any, s: any, e: any, r: any, h: any): void;
    stopMonitoring(): void;
}
declare class d {
    constructor(t: any);
    g: any;
    b: number;
    c: number;
    d: Map<any, any>;
    f: f;
    createClassNameRef(t: any): {
        className: any;
        dispose: () => void;
    };
    h(t: any): any;
    i(t: any): string;
    j(): void;
}
import { $35 as p } from "../../base/browser/mouseEvent.js";
import { $vd as b } from "../../base/common/lifecycle.js";
import { $Zh as f } from "../../base/common/async.js";
export { a as $Cbb, C as $Dbb, M as $Ebb, w as $Fbb, g as $Gbb, y as $Hbb, c as $Ibb, D as $Jbb, U as $Kbb, L as $Lbb, d as $Mbb };
//# sourceMappingURL=editorDom.d.ts.map