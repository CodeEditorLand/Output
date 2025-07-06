export { v as $lcb };
declare class v {
    constructor(r: any, n: any, i: any);
    p: any;
    q: any;
    b: any[];
    c: $;
    d: any[];
    e: Map<any, any>;
    f: Map<any, any>;
    j: Set<any>;
    o: number;
    a: any;
    k: number;
    l: number;
    m: number;
    n: number;
    allocate(r: any): {
        pageIndex: any;
        glyphIndex: number;
        x: any;
        y: any;
        w: number;
        h: number;
        originOffsetX: any;
        originOffsetY: any;
        fontBoundingBoxAscent: any;
        fontBoundingBoxDescent: any;
    } | undefined;
    getUsagePreview(): Promise<Blob>;
    getStats(): string;
}
import { $Rc as $ } from "../../../../base/common/map.js";
//# sourceMappingURL=textureAtlasSlabAllocator.d.ts.map