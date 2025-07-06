export { m as $ncb };
declare let m: {
    new (t: any, i: any, s: any, h: any, e: any): {
        readonly pages: any[];
        n: any;
        r: any;
        s: any;
        t: any;
        c: any;
        f: Set<any>;
        h: any[];
        j: y;
        m: any;
        onDidDeleteGlyphs: any;
        g: any;
        b: any;
        pageSize: number;
        u(): void;
        clear(): void;
        getGlyph(t: any, i: any, s: any, h: any, e: any): any;
        w(t: any, i: any, s: any, h: any, e: any): any;
        y(t: any, i: any, s: any, h: any): any;
        getUsagePreview(): Promise<any[]>;
        getStats(): any[];
        C(t: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    maximumPageCount: number | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Rc as y } from "../../../../base/common/map.js";
//# sourceMappingURL=textureAtlas.d.ts.map