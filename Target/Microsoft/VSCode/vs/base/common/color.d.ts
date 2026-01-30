export class Color {
    static fromHex(hex: any): any;
    static equals(a: any, b: any): any;
    static _relativeLuminanceForComponent(color: any): number;
    static _flatten(foreground: any, background: any): Color;
    static getLighterColor(of: any, relative: any, factor: any): any;
    static getDarkerColor(of: any, relative: any, factor: any): any;
    constructor(arg: any);
    get hsla(): HSLA;
    get hsva(): HSVA;
    rgba: RGBA;
    _hsla: HSLA | undefined;
    _hsva: HSVA | undefined;
    equals(other: any): boolean;
    /**
     * http://www.w3.org/TR/WCAG20/#relativeluminancedef
     * Returns the number in the set [0, 1]. O => Darkest Black. 1 => Lightest white.
     */
    getRelativeLuminance(): number;
    /**
     * Reduces the "foreground" color on this "background" color unti it is
     * below the relative luminace ratio.
     * @returns the new foreground color
     * @see https://github.com/xtermjs/xterm.js/blob/44f9fa39ae03e2ca6d28354d88a399608686770e/src/common/Color.ts#L315
     */
    reduceRelativeLuminace(foreground: any, ratio: any): Color;
    /**
     * Increases the "foreground" color on this "background" color unti it is
     * below the relative luminace ratio.
     * @returns the new foreground color
     * @see https://github.com/xtermjs/xterm.js/blob/44f9fa39ae03e2ca6d28354d88a399608686770e/src/common/Color.ts#L335
     */
    increaseRelativeLuminace(foreground: any, ratio: any): Color;
    /**
     * http://www.w3.org/TR/WCAG20/#contrast-ratiodef
     * Returns the contrast ration number in the set [1, 21].
     */
    getContrastRatio(another: any): number;
    /**
     *	http://24ways.org/2010/calculating-color-contrast
     *  Return 'true' if darker color otherwise 'false'
     */
    isDarker(): boolean;
    /**
     *	http://24ways.org/2010/calculating-color-contrast
     *  Return 'true' if lighter color otherwise 'false'
     */
    isLighter(): boolean;
    isLighterThan(another: any): boolean;
    isDarkerThan(another: any): boolean;
    /**
     * Based on xterm.js: https://github.com/xtermjs/xterm.js/blob/44f9fa39ae03e2ca6d28354d88a399608686770e/src/common/Color.ts#L288
     *
     * Given a foreground color and a background color, either increase or reduce the luminance of the
     * foreground color until the specified contrast ratio is met. If pure white or black is hit
     * without the contrast ratio being met, go the other direction using the background color as the
     * foreground color and take either the first or second result depending on which has the higher
     * contrast ratio.
     *
     * @param foreground The foreground color.
     * @param ratio The contrast ratio to achieve.
     * @returns The adjusted foreground color.
     */
    ensureConstrast(foreground: any, ratio: any): any;
    lighten(factor: any): Color;
    darken(factor: any): Color;
    transparent(factor: any): Color;
    isTransparent(): boolean;
    isOpaque(): boolean;
    opposite(): Color;
    blend(c: any): Color | undefined;
    /**
     * Mixes the current color with the provided color based on the given factor.
     * @param color The color to mix with
     * @param factor The factor of mixing (0 means this color, 1 means the input color, 0.5 means equal mix)
     * @returns A new color representing the mix
     */
    mix(color: any, factor?: number): Color;
    makeOpaque(opaqueBackground: any): Color;
    flatten(...backgrounds: any[]): Color;
    toString(): any;
    _toString: any;
    toNumber32Bit(): number;
    _toNumber32Bit: number | undefined;
}
export class HSLA {
    static equals(a: any, b: any): boolean;
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h in the set [0, 360], s, and l in the set [0, 1].
     */
    static fromRGBA(rgba: any): HSLA;
    static _hue2rgb(p: any, q: any, t: any): any;
    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h in the set [0, 360] s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     */
    static toRGBA(hsla: any): RGBA;
    constructor(h: any, s: any, l: any, a: any);
    h: number;
    s: number;
    l: number;
    a: number;
}
export class HSVA {
    static equals(a: any, b: any): boolean;
    static fromRGBA(rgba: any): HSVA;
    static toRGBA(hsva: any): RGBA;
    constructor(h: any, s: any, v: any, a: any);
    h: number;
    s: number;
    v: number;
    a: number;
}
export class RGBA {
    static equals(a: any, b: any): boolean;
    constructor(r: any, g: any, b: any, a?: number);
    r: number;
    g: number;
    b: number;
    a: number;
}
//# sourceMappingURL=color.d.ts.map