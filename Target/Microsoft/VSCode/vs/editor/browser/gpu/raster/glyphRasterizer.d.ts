export { z as $gcb };
declare class z extends $ {
    constructor(e: any, i: any, o: any, n: any);
    get cacheKey(): string;
    fontSize: any;
    fontFamily: any;
    devicePixelRatio: any;
    n: any;
    id: number;
    h: {
        source: null;
        boundingBox: {
            left: number;
            bottom: number;
            right: number;
            top: number;
        };
        originOffset: {
            x: number;
            y: number;
        };
        fontBoundingBoxAscent: number;
        fontBoundingBoxDescent: number;
    };
    j: {
        chars: undefined;
        tokenMetadata: number;
        decorationStyleSetId: number;
    };
    m: string;
    a: OffscreenCanvas;
    c: any;
    f: any;
    rasterizeGlyph(e: any, i: any, o: any, n: any): {
        source: null;
        boundingBox: {
            left: number;
            bottom: number;
            right: number;
            top: number;
        };
        originOffset: {
            x: number;
            y: number;
        };
        fontBoundingBoxAscent: number;
        fontBoundingBoxDescent: number;
    } | {
        source: OffscreenCanvas;
        boundingBox: {
            top: number;
            left: number;
            bottom: number;
            right: number;
        };
        originOffset: {
            x: number;
            y: number;
        };
        fontBoundingBoxAscent: number;
        fontBoundingBoxDescent: number;
    };
    _rasterizeGlyph(e: any, i: any, o: any, n: any): {
        source: null;
        boundingBox: {
            left: number;
            bottom: number;
            right: number;
            top: number;
        };
        originOffset: {
            x: number;
            y: number;
        };
        fontBoundingBoxAscent: number;
        fontBoundingBoxDescent: number;
    };
    s(e: any, i: any, o: any, n: any): void;
    t(e: any, i: any): void;
    getTextMetrics(e: any): any;
}
import { $vd as $ } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=glyphRasterizer.d.ts.map