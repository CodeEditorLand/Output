declare class e {
    static equals(r: any, t: any): boolean;
    constructor(r: any, t: any, a: any, s?: number);
    r: number;
    g: number;
    b: number;
    a: number;
}
declare class A {
    static equals(r: any, t: any): boolean;
    static fromRGBA(r: any): A;
    static i(r: any, t: any, a: any): any;
    static toRGBA(r: any): e;
    constructor(r: any, t: any, a: any, s: any);
    h: number;
    s: number;
    l: number;
    a: number;
}
declare class y {
    static equals(r: any, t: any): boolean;
    static fromRGBA(r: any): y;
    static toRGBA(r: any): e;
    constructor(r: any, t: any, a: any, s: any);
    h: number;
    s: number;
    v: number;
    a: number;
}
declare class h {
    static fromHex(r: any): any;
    static equals(r: any, t: any): any;
    static k(r: any): number;
    static o(r: any, t: any): h;
    static getLighterColor(r: any, t: any, a: any): any;
    static getDarkerColor(r: any, t: any, a: any): any;
    constructor(r: any);
    get hsla(): A;
    get hsva(): y;
    rgba: e;
    i: A | undefined;
    j: y | undefined;
    equals(r: any): boolean;
    getRelativeLuminance(): number;
    reduceRelativeLuminace(r: any, t: any): h;
    increaseRelativeLuminace(r: any, t: any): h;
    getContrastRatio(r: any): number;
    isDarker(): boolean;
    isLighter(): boolean;
    isLighterThan(r: any): boolean;
    isDarkerThan(r: any): boolean;
    ensureConstrast(r: any, t: any): any;
    lighten(r: any): h;
    darken(r: any): h;
    transparent(r: any): h;
    isTransparent(): boolean;
    isOpaque(): boolean;
    opposite(): h;
    blend(r: any): h | undefined;
    mix(r: any, t?: number): h;
    makeOpaque(r: any): h;
    flatten(...r: any[]): h;
    toString(): any;
    u: any;
    toNumber32Bit(): number;
    w: number | undefined;
}
export { e as $ip, A as $jp, y as $kp, h as $lp };
//# sourceMappingURL=color.d.ts.map