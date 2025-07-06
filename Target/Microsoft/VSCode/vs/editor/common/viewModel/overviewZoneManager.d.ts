declare class H {
    static compare(t: any, e: any): number;
    constructor(t: any, e: any, s: any);
    from: number;
    to: number;
    colorId: number;
}
declare class p {
    static compare(t: any, e: any): number;
    constructor(t: any, e: any, s: any, c: any);
    startLineNumber: any;
    endLineNumber: any;
    heightInLines: any;
    color: any;
    c: any;
    setColorZone(t: any): void;
    getColorZones(): any;
}
declare class v {
    constructor(t: any);
    c: any;
    d: any[];
    e: boolean;
    f: number;
    g: number;
    h: number;
    j: number;
    k: number;
    l: number;
    m: any;
    n: any[];
    getId2Color(): any[];
    setZones(t: any): void;
    setLineHeight(t: any): boolean;
    setPixelRatio(t: any): void;
    getDOMWidth(): number;
    getCanvasWidth(): number;
    setDOMWidth(t: any): boolean;
    getDOMHeight(): number;
    getCanvasHeight(): number;
    setDOMHeight(t: any): boolean;
    getOuterHeight(): number;
    setOuterHeight(t: any): boolean;
    resolveColorZones(): any[];
}
export { H as $rab, p as $sab, v as $tab };
//# sourceMappingURL=overviewZoneManager.d.ts.map