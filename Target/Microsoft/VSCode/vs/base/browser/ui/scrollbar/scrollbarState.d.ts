export { n as $T7 };
declare class n {
    static l(t: any, e: any, i: any, s: any, o: any): {
        computedAvailableSize: number;
        computedIsNeeded: false;
        computedSliderSize: number;
        computedSliderRatio: number;
        computedSliderPosition: number;
    } | {
        computedAvailableSize: number;
        computedIsNeeded: true;
        computedSliderSize: number;
        computedSliderRatio: number;
        computedSliderPosition: number;
    };
    constructor(t: any, e: any, i: any, s: any, o: any, r: any);
    a: number;
    b: number;
    c: number;
    d: any;
    e: any;
    f: any;
    g: number;
    h: boolean;
    i: number;
    j: number;
    k: number;
    clone(): n;
    setVisibleSize(t: any): boolean;
    setScrollSize(t: any): boolean;
    setScrollPosition(t: any): boolean;
    setScrollbarSize(t: any): void;
    setOppositeScrollbarSize(t: any): void;
    m(): void;
    getArrowSize(): number;
    getScrollPosition(): any;
    getRectangleLargeSize(): number;
    getRectangleSmallSize(): number;
    isNeeded(): boolean;
    getSliderSize(): number;
    getSliderPosition(): number;
    getDesiredScrollPositionFromOffset(t: any): number;
    getDesiredScrollPositionFromOffsetPaged(t: any): any;
    getDesiredScrollPositionFromDelta(t: any): number;
}
//# sourceMappingURL=scrollbarState.d.ts.map