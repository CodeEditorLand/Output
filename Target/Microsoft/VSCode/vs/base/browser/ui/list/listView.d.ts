declare class ft {
    constructor(t: any);
    set context(t: any);
    get context(): any;
    d: any;
    elements: any;
    update(): void;
    getData(): any;
}
declare class mt {
    constructor(t: any);
    elements: any;
    update(): void;
    getData(): any;
}
declare class ut {
    types: any[];
    files: any[];
    update(t: any): void;
    getData(): {
        types: any[];
        files: any[];
    };
}
declare class p {
    constructor(t: any, e: any, s: any, i?: {
        useShadows: boolean;
        verticalScrollMode: number;
        setRowLineHeight: boolean;
        setRowHeight: boolean;
        supportDynamicHeights: boolean;
        dnd: {
            getDragElements(c: any): any[];
            getDragURI(): null;
            onDragStart(): void;
            onDragOver(): boolean;
            drop(): void;
            dispose(): void;
        };
        horizontalScrolling: boolean;
        transformOptimization: boolean;
        alwaysConsumeMouseWheel: boolean;
    });
    get contentHeight(): any;
    get contentWidth(): any;
    get onDidScroll(): any;
    get onWillScroll(): any;
    get containerDomNode(): HTMLDivElement;
    get scrollableElementDomNode(): any;
    set U(t: boolean);
    get U(): boolean;
    S: boolean;
    V: any;
    domId: string;
    j: Map<any, any>;
    n: number;
    s: number;
    t: any;
    u: nt;
    v: boolean;
    x: Readonly<{
        dispose(): void;
    }> | undefined;
    y: number;
    G: boolean;
    K: Readonly<{
        dispose(): void;
    }> | undefined;
    L: Readonly<{
        dispose(): void;
    }> | undefined;
    M: Readonly<{
        dispose(): void;
    }> | undefined;
    P: x;
    Q: q;
    R: q;
    onDidChangeContentHeight: any;
    onDidChangeContentWidth: any;
    d: any[];
    f: number;
    g: ht;
    h: any;
    k: number;
    m: number;
    domNode: HTMLDivElement;
    C: any;
    D: pt;
    o: HTMLDivElement;
    p: any;
    q: any;
    z: boolean;
    A: boolean;
    B: boolean;
    F: {
        getDragElements(c: any): any[];
        getDragURI(): null;
        onDragStart(): void;
        onDragOver(): boolean;
        drop(): void;
        dispose(): void;
    };
    W(t: any): void;
    O: any;
    X(t: any, e: any): void;
    updateOptions(t: any): void;
    delegateScrollFromMouseWheelEvent(t: any): void;
    delegateVerticalScrollbarPointerDown(t: any): void;
    updateElementHeight(t: any, e: any, s: any): void;
    Y(t: any): ht;
    splice(t: any, e: any, s?: any[]): any;
    Z(t: any, e: any, s?: any[]): any;
    $(): void;
    ab(): void;
    bb(): void;
    E: any;
    updateWidth(t: any): void;
    rerender(): void;
    get length(): number;
    get renderHeight(): any;
    get firstVisibleIndex(): number;
    get firstMostlyVisibleIndex(): number;
    get lastVisibleIndex(): number;
    element(t: any): any;
    indexOf(t: any): number;
    domElement(t: any): any;
    elementHeight(t: any): any;
    elementTop(t: any): any;
    indexAt(t: any): number;
    indexAfter(t: any): number;
    layout(t: any, e: any): void;
    db(t: any, e: any, s: any, i: any, o: any, n?: boolean, h?: boolean): void;
    eb(t: any, e: any): void;
    fb(t: any): void;
    gb(t: any, e: any): void;
    hb(t: any, e: any): void;
    getScrollTop(): any;
    setScrollTop(t: any, e: any): void;
    getScrollLeft(): any;
    setScrollLeft(t: any): void;
    set scrollTop(t: any);
    get scrollTop(): any;
    get scrollHeight(): any;
    get onMouseClick(): any;
    get onMouseDblClick(): any;
    get onMouseMiddleClick(): any;
    get onMouseUp(): any;
    get onMouseDown(): any;
    get onMouseOver(): any;
    get onMouseMove(): any;
    get onMouseOut(): any;
    get onContextMenu(): any;
    get onTouchStart(): any;
    get onTap(): any;
    ib(t: any): {
        browserEvent: any;
        index: number | undefined;
        element: any;
    };
    jb(t: any): {
        browserEvent: any;
        index: number | undefined;
        element: any;
    };
    kb(t: any): {
        browserEvent: any;
        index: number | undefined;
        element: any;
    };
    lb(t: any): {
        browserEvent: any;
        index: number | undefined;
        element: any;
        sector: number | undefined;
    };
    mb(t: any): void;
    nb(t: any): void;
    ob(t: any, e: any, s: any): void;
    H: ft | ut | undefined;
    pb(t: any): void;
    N: {
        start: number;
        end: number;
    } | undefined;
    qb(t: any): number | undefined;
    rb(t: any): boolean;
    I: any;
    J: any;
    sb(t: any): void;
    tb(t: any): void;
    ub(t: any): void;
    vb(): void;
    wb(t: any): void;
    w: any;
    xb(t: any): void;
    yb(): void;
    zb(t: any, e: any): number | undefined;
    Ab(t: any): number | undefined;
    Bb(t: any, e: any): {
        start: number;
        end: number;
    };
    Cb(t: any, e: any): {
        start: number;
        end: number;
    };
    Db(t: any, e: any, s: any): void;
    Eb(t: any): number;
    getElementDomId(t: any): string;
    dispose(): void;
}
declare var B: any;
import { $Jh as nt } from "../../../common/async.js";
import { $ud as x } from "../../../common/lifecycle.js";
import { $ef as q } from "../../../common/event.js";
import { $H8 as ht } from "./rangeMap.js";
declare class pt {
    constructor(t: any);
    getSetSize: any;
    getPosInSet: any;
    getRole: any;
    isChecked: any;
}
export { ft as $K8, mt as $L8, ut as $M8, p as $N8, B as ListViewTargetSector };
//# sourceMappingURL=listView.d.ts.map