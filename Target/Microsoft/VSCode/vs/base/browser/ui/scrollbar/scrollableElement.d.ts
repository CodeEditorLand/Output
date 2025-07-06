declare class J extends y {
    constructor(e: any, s: any);
    setScrollPosition(e: any): void;
    getScrollPosition(): any;
}
declare class O extends y {
    setScrollPosition(e: any): void;
    getScrollPosition(): any;
}
declare class Q extends y {
    constructor(e: any, s: any);
    cb: any;
    setScrollPosition(e: any): void;
    getScrollPosition(): any;
    scanDomNode(): void;
}
declare class m {
    a: number;
    b: any[];
    c: number;
    d: number;
    isPhysicalMouseWheel(): boolean;
    acceptStandardWheelEvent(e: any): void;
    accept(e: any, s: any, o: any): void;
    f(e: any, s: any): number;
    g(e: any): boolean;
}
declare class y extends C {
    constructor(e: any, s: any, o: any);
    get options(): {
        lazyRender: any;
        className: any;
        useShadows: any;
        handleMouseWheel: any;
        flipAxes: any;
        consumeMouseWheelIfScrollbarIsNeeded: any;
        alwaysConsumeMouseWheel: any;
        scrollYToX: any;
        mouseWheelScrollSensitivity: any;
        fastScrollSensitivity: any;
        scrollPredominantAxis: any;
        mouseWheelSmoothScroll: any;
        arrowSize: any;
        listenOnDomNode: any;
        horizontal: any;
        horizontalScrollbarSize: any;
        horizontalSliderSize: any;
        horizontalHasArrows: any;
        vertical: any;
        verticalScrollbarSize: any;
        verticalHasArrows: any;
        verticalSliderSize: any;
        scrollByPage: any;
    };
    O: any;
    onScroll: any;
    P: any;
    onWillScroll: any;
    a: {
        lazyRender: any;
        className: any;
        useShadows: any;
        handleMouseWheel: any;
        flipAxes: any;
        consumeMouseWheelIfScrollbarIsNeeded: any;
        alwaysConsumeMouseWheel: any;
        scrollYToX: any;
        mouseWheelScrollSensitivity: any;
        fastScrollSensitivity: any;
        scrollPredominantAxis: any;
        mouseWheelSmoothScroll: any;
        arrowSize: any;
        listenOnDomNode: any;
        horizontal: any;
        horizontalScrollbarSize: any;
        horizontalSliderSize: any;
        horizontalHasArrows: any;
        vertical: any;
        verticalScrollbarSize: any;
        verticalHasArrows: any;
        verticalSliderSize: any;
        scrollByPage: any;
    };
    c: any;
    g: any;
    h: any;
    n: HTMLDivElement;
    r: import("../../fastDomNode.js").$N7 | null;
    t: import("../../fastDomNode.js").$N7 | null;
    w: import("../../fastDomNode.js").$N7 | null;
    y: any;
    H: any[];
    L: any;
    I: boolean;
    J: boolean;
    M: boolean;
    N: boolean;
    getDomNode(): HTMLDivElement;
    getOverviewRulerLayoutInfo(): {
        parent: HTMLDivElement;
        insertBefore: any;
    };
    delegateVerticalScrollbarPointerDown(e: any): void;
    getScrollDimensions(): any;
    setScrollDimensions(e: any): void;
    updateClassName(e: any): void;
    updateOptions(e: any): void;
    setRevealOnScroll(e: any): void;
    delegateScrollFromMouseWheelEvent(e: any): void;
    Q(e: any): void;
    R(e: any): void;
    S(e: any): void;
    renderNow(): void;
    U(): void;
    W(): void;
    X(): void;
    Y(e: any): void;
    Z(e: any): void;
    $(): void;
    ab(): void;
    bb(): void;
}
import { $Q7 as C } from "../widget.js";
export { J as $17, O as $27, Q as $37, m as $Y7, y as $Z7 };
//# sourceMappingURL=scrollableElement.d.ts.map