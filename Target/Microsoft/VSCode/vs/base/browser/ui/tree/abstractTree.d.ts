declare class Vt {
    constructor(t: any, e: any, i: any, s?: {});
    get pattern(): string;
    set j(t: any);
    get j(): any;
    g: any;
    s: any;
    t: any;
    u: any;
    v: {};
    b: string;
    d: string;
    m: p;
    onDidChangePattern: any;
    o: p;
    onDidChangeOpenState: any;
    p: y;
    q: y;
    f: qt;
    isOpened(): boolean;
    open(): void;
    k: any;
    close(): void;
    a: any;
    w(t: any): void;
    y(t: any): void;
    z(t: any, e: any): void;
    A(t: any, e: any): void;
    B(t: any): void;
    dispose(): void;
}
declare class Jt extends Vt {
    set mode(t: any);
    get mode(): any;
    set matchType(t: any);
    get matchType(): any;
    C: p;
    onDidChangeMode: any;
    D: p;
    onDidChangeMatchType: any;
    updateOptions(t?: {}): void;
    x(t: any): void;
    shouldAllowFocus(t: any): boolean;
    H(): void;
}
declare class Me {
    constructor(t: any, e: any, i: any, s: any, n?: {});
    get onDidScroll(): any;
    get onDidChangeFocus(): (c: any, d: any, p: any) => any;
    get onDidChangeSelection(): (c: any, d: any, p: any) => any;
    get onMouseClick(): any;
    get onMouseDblClick(): any;
    get onMouseOver(): any;
    get onMouseOut(): any;
    get onContextMenu(): any;
    get onTap(): any;
    get onPointer(): any;
    get onKeyDown(): any;
    get onKeyUp(): any;
    get onKeyPress(): any;
    get onDidFocus(): any;
    get onDidBlur(): any;
    get onDidChangeModel(): any;
    get onDidChangeCollapseState(): any;
    get onDidChangeRenderNodeCount(): any;
    set findMode(t: any);
    get findMode(): any;
    set findMatchType(t: any);
    get findMatchType(): any;
    get onDidChangeFindPattern(): any;
    get expandOnDoubleClick(): any;
    get expandOnlyOnTwistieClick(): any;
    get onDidDispose(): any;
    O: any;
    P: {};
    y: Tt;
    onDidChangeFindOpenState: any;
    onDidChangeStickyScrollFocused: any;
    E: y;
    F: any;
    G: any;
    H: any;
    I: any;
    J: any;
    K: any;
    L: p;
    onWillRefilter: any;
    M: p;
    onDidUpdateOptions: any;
    W: y;
    A: Rt | undefined;
    o: any;
    p: Pt;
    k: any;
    q: R;
    w: R;
    x: R;
    j: ee;
    z: any;
    B: ((c: any) => any) | undefined;
    onDidChangeFindMode: any;
    onDidChangeFindMatchType: any;
    C: _ | undefined;
    D: HTMLStyleElement;
    updateOptions(t?: {}): void;
    get options(): {};
    Q(t: any): void;
    updateWidth(t: any): void;
    getHTMLElement(): HTMLDivElement;
    get contentHeight(): any;
    get contentWidth(): any;
    get onDidChangeContentHeight(): any;
    get onDidChangeContentWidth(): any;
    set scrollTop(t: any);
    get scrollTop(): any;
    set scrollLeft(t: any);
    get scrollLeft(): any;
    get scrollHeight(): any;
    get renderHeight(): any;
    get firstVisibleElement(): any;
    get lastVisibleElement(): any;
    set ariaLabel(t: string);
    get ariaLabel(): string;
    get selectionSize(): number;
    domFocus(): void;
    isDOMFocused(): boolean;
    layout(t: any, e: any): void;
    style(t: any): void;
    getParentElement(t: any): any;
    getFirstElementChild(t: any): any;
    getNode(t: any): any;
    getNodeLocation(t: any): any;
    collapse(t: any, e?: boolean): any;
    expand(t: any, e?: boolean): any;
    toggleCollapsed(t: any, e?: boolean): any;
    expandAll(): void;
    collapseAll(): void;
    isCollapsible(t: any): any;
    setCollapsible(t: any, e: any): any;
    isCollapsed(t: any): any;
    expandTo(t: any): void;
    triggerTypeNavigation(): void;
    openFind(): void;
    closeFind(): void;
    refilter(): void;
    setAnchor(t: any): void;
    getAnchor(): any;
    setSelection(t: any, e: any): void;
    getSelection(): any[];
    setFocus(t: any, e: any): void;
    focusNext(t: number | undefined, e: boolean | undefined, i: any, s?: ((c: any) => any) | undefined): void;
    focusPrevious(t: number | undefined, e: boolean | undefined, i: any, s?: ((c: any) => any) | undefined): void;
    focusNextPage(t: any, e?: ((c: any) => any) | undefined): Promise<void>;
    focusPreviousPage(t: any, e?: ((c: any) => any) | undefined): Promise<void>;
    focusLast(t: any, e?: ((c: any) => any) | undefined): void;
    focusFirst(t: any, e?: ((c: any) => any) | undefined): void;
    getFocus(): any[];
    getStickyScrollFocus(): any[];
    getFocusedPart(): 0 | 1;
    reveal(t: any, e: any): void;
    getRelativeTop(t: any): number | null;
    getViewState(t?: any): T;
    R(t: any): void;
    S(t: any): void;
    U(t: any): void;
    X(t: any): void;
    navigate(t: any): ie;
    dispose(): void;
}
declare class Pt {
    constructor(t: any);
    a: any;
    getHeight(t: any): any;
    getTemplateId(t: any): any;
    hasDynamicHeight(t: any): any;
    setDynamicHeight(t: any, e: any): void;
}
declare class T {
    static lift(t: any): T;
    static empty(t?: number): T;
    constructor(t: any);
    focus: Set<any>;
    selection: Set<any>;
    expanded: any;
    scrollTop: any;
    toJSON(): {
        focus: any[];
        selection: any[];
        expanded: any;
        scrollTop: any;
    };
}
declare class M {
    constructor(t: any, e: any, i: any, s: any, n: any, o?: {});
    o: any;
    p: any;
    q: any;
    s: any;
    b: Map<any, any>;
    c: Map<any, any>;
    d: number | undefined;
    f: boolean;
    g: boolean;
    j: Set<any>;
    k: Readonly<{
        dispose(): void;
    }> | undefined;
    m: y;
    templateId: any;
    updateOptions(t?: {}): void;
    renderTemplate(t: any): {
        container: any;
        indent: any;
        twistie: any;
        indentGuidesDisposable: Readonly<{
            dispose(): void;
        }> | undefined;
        indentSize: number;
        templateData: any;
    };
    renderElement(t: any, e: any, i: any, s: any): void;
    disposeElement(t: any, e: any, i: any, s: any): void;
    disposeTemplate(t: any): void;
    t(t: any): void;
    u(t: any): void;
    v(t: any, e: any): void;
    w(t: any, e: any): void;
    x(t: any): void;
    dispose(): void;
}
declare function zt(h: any, t: any): number[] | undefined;
declare class Rt {
    constructor(t: any, e: any, i: any);
    get totalCount(): number;
    get matchCount(): number;
    set findMatchType(t: any);
    get findMatchType(): any;
    d: any;
    set findMode(t: any);
    get findMode(): any;
    f: any;
    set pattern(t: any);
    g: string;
    j: string;
    m: any;
    o: any;
    p: any;
    a: number;
    b: number;
    k: y;
    filter(t: any, e: any): any;
    reset(): void;
    dispose(): void;
}
declare class qt {
    constructor(t: any);
    a: Map<any, any>;
    states(): any[];
    get(t: any): any;
    set(t: any, e: any): boolean;
}
declare var Y: any;
declare var $: any;
declare var g: any;
declare var f: any;
import { $ef as p } from "../../../common/event.js";
import { $ud as y } from "../../../common/lifecycle.js";
import { $mf as Tt } from "../../../common/event.js";
declare class R {
    constructor(t: any, e: any);
    get f(): Set<any>;
    d: Set<any> | undefined;
    g: any;
    j: any;
    a: any[];
    c: p;
    onDidChange: any;
    set(t: any, e: any): void;
    k(t: any, e: any, i: any): void;
    get(): any[];
    b: any[] | undefined;
    getNodes(): any[];
    has(t: any): boolean;
    onDidModelSplice({ insertedNodes: t, deletedNodes: e }: {
        insertedNodes: any;
        deletedNodes: any;
    }): void;
    m(): Set<any>;
}
declare class ee extends mt {
    constructor(t: any, e: any, i: any, s: any, n: any, o: any, r: any, l: any);
    c: any;
    p: any;
    s: any;
    E(t: any): te;
    setFocus(t: any, e: any, i?: boolean): void;
    setSelection(t: any, e: any, i?: boolean): void;
    setAnchor(t: any, e?: boolean): void;
}
declare class _ extends x {
    constructor(t: any, e: any, i: any, s: any, n: any, o?: {});
    j: any;
    m: any;
    s: any;
    t: any;
    c: number;
    b: number;
    a: any;
    g: any;
    f: any;
    onDidChangeHasFocus: any;
    onContextMenu: any;
    get height(): any;
    get count(): any;
    getNode(t: any): any;
    u(t: any): any;
    w(): void;
    y(t: any): Qt | undefined;
    z(t: any): any;
    C(t: any, e: any, i: any): {
        node: any;
        position: any;
        height: any;
        startIndex: any;
        endIndex: number;
    } | undefined;
    D(t: any, e: any): boolean;
    F(t: any, e: any): {
        node: any;
        position: any;
        height: any;
        startIndex: any;
        endIndex: number;
    };
    G(t: any, e?: undefined): any;
    H(t: any, e: any, i: any): any;
    I(t: any): any;
    J(t: any): any;
    L(t: any): boolean;
    M(t: any): any;
    O(t: any): {
        startIndex: any;
        endIndex: number;
    };
    nodePositionTopBelowWidget(t: any): number;
    getFocus(): any;
    domFocus(): void;
    focusedLast(): any;
    updateOptions(t?: {}): void;
    validateStickySettings(t: any): {
        stickyScrollMaxItemCount: number;
    };
}
declare class ie {
    constructor(t: any, e: any, i: any);
    b: any;
    c: any;
    a: any;
    current(): any;
    previous(): any;
    next(): any;
    first(): any;
    last(): any;
}
import { $58 as mt } from "../list/listWidget.js";
declare class te extends yt {
    constructor(t: any, e: any, i: any);
    c: any;
    y: any;
    A(t: any, e: any): void;
}
import { $vd as x } from "../../../common/lifecycle.js";
declare class Qt {
    constructor(t?: any[]);
    stickyNodes: any[];
    get count(): number;
    equal(t: any): boolean;
    contains(t: any): boolean;
    lastNodePartiallyVisible(): boolean;
    animationStateChanged(t: any): boolean;
}
import { $28 as yt } from "../list/listWidget.js";
export { Vt as $10, Jt as $20, Me as $30, Pt as $U0, T as $V0, M as $W0, zt as $X0, Rt as $Y0, qt as $Z0, Y as AbstractTreePart, $ as RenderIndentGuides, g as TreeFindMatchType, f as TreeFindMode };
//# sourceMappingURL=abstractTree.d.ts.map