declare class J extends G {
    constructor(t: any);
    g: any;
    h(t: any): void;
}
declare class K extends S {
    constructor(t: any, s: any);
    r: any;
    t: any;
    f: any[];
    j: boolean;
    n: any;
    g: any;
    m: any;
    setList(t: any): void;
    h: any;
    u(t: any): void;
    w(t: any): {
        browserEvent: any;
        draggedOverCell: any;
        cellTop: any;
        cellHeight: any;
        dragPosRatio: number;
    } | undefined;
    clearGlobalDragState(): void;
    y(): void;
    z(): void;
    C(t: any): void;
    D(t: any, s: any): void;
    F(t: any): "above" | "below";
    G(t: any): void;
    H(t: any): any;
    I(t: any, s: any, o: any, e: any): void;
    J(t: any): void;
    L(): void;
    registerDragHandle(t: any, s: any, o: any, e: any): void;
    c: any;
    startExplicitDrag(t: any, s: any): void;
    explicitDrag(t: any, s: any): void;
    endExplicitDrag(t: any): void;
    explicitDrop(t: any, s: any): void;
    M(t: any, s: any, o: any): "above" | "below";
}
declare function N(d: any, t: any, s: any, o: any): void;
import { $nTb as G } from "../cellPart.js";
import { $vd as S } from "../../../../../../base/common/lifecycle.js";
export { J as $sTb, K as $tTb, N as $uTb };
//# sourceMappingURL=cellDnd.d.ts.map