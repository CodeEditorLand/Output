declare const F: 1.5 | 1.35;
declare const f: 8;
declare class h {
    static createFromValidatedSettings(t: any, a: any, e: any): h;
    static createFromRawSettings(t: any, a: any, e?: boolean): h;
    static a(t: any, a: any, e: any, o: any, n: any, i: any, d: any, l: any, c: any): h;
    static b(t: any): any;
    constructor(t: any);
    pixelRatio: any;
    fontFamily: string;
    fontWeight: string;
    fontSize: any;
    fontFeatureSettings: any;
    fontVariationSettings: any;
    lineHeight: number;
    letterSpacing: any;
    getId(): string;
    getMassagedFontFamily(): any;
}
declare const W: 2;
declare class $ extends h {
    constructor(t: any, a: any);
    version: number;
    isTrusted: any;
    isMonospace: any;
    typicalHalfwidthCharacterWidth: any;
    typicalFullwidthCharacterWidth: any;
    canUseHalfwidthRightwardsArrow: any;
    spaceWidth: any;
    middotWidth: any;
    wsmiddotWidth: any;
    maxDigitWidth: any;
    equals(t: any): boolean;
}
export { F as $kC, f as $lC, h as $mC, W as $nC, $ as $oC };
//# sourceMappingURL=fontInfo.d.ts.map