export { m as $mcb };
declare let m: {
    new (t: any, e: any, i: any, h: any, r: any): {
        readonly version: number;
        readonly usedArea: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
        readonly source: OffscreenCanvas;
        readonly glyphs: SetIterator<any>;
        n: any;
        a: number;
        b: {
            left: number;
            top: number;
            right: number;
            bottom: number;
        };
        f: g;
        g: Set<any>;
        c: OffscreenCanvas;
        m: any;
        j: any;
        getGlyph(t: any, e: any, i: any, h: any): any;
        r(t: any, e: any, i: any, h: any): any;
        getUsagePreview(): any;
        getStats(): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    maximumGlyphCount: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Rc as g } from "../../../../base/common/map.js";
//# sourceMappingURL=textureAtlasPage.d.ts.map