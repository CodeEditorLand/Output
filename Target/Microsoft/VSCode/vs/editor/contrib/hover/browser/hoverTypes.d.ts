declare class p {
    constructor(t: any, e: any, i: any, r: any);
    priority: any;
    range: any;
    initialMousePosX: any;
    initialMousePosY: any;
    type: number;
    equals(t: any): any;
    canAdoptVisibleHover(t: any, e: any): boolean;
}
declare class u {
    constructor(t: any, e: any, i: any, r: any, o: any, a: any);
    priority: any;
    owner: any;
    range: any;
    initialMousePosX: any;
    initialMousePosY: any;
    supportsMarkerHover: any;
    type: number;
    equals(t: any): boolean;
    canAdoptVisibleHover(t: any, e: any): boolean;
}
declare class h {
    constructor(t: any, e: any);
    renderedHoverParts: any;
    a: any;
    dispose(): void;
}
declare const c: {
    _participants: any[];
    register(t: any): void;
    getAll(): any[];
};
declare var n: any;
export { p as $rjb, u as $sjb, h as $tjb, c as $ujb, n as HoverAnchorType };
//# sourceMappingURL=hoverTypes.d.ts.map