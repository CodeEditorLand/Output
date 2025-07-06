declare class b extends d {
    g: any;
    onConfigurationChanged(t: any): true;
}
declare class S extends d {
    g: any;
    onConfigurationChanged(t: any): true;
}
declare class d extends p {
    c: any[];
    f: boolean;
    a: u;
    b: import("../../../base/browser/fastDomNode.js").$N7;
    getDomNode(): import("../../../base/browser/fastDomNode.js").$N7;
    addDynamicOverlay(t: any): void;
    onScrollChanged(t: any): any;
    prepareRender(t: any): void;
    render(t: any): void;
    _viewOverlaysRender(t: any): void;
}
declare class f {
    constructor(t: any);
    a: any;
    b: import("../../../base/browser/fastDomNode.js").$N7 | null;
    c: any;
    getDomNode(): any;
    setDomNode(t: any): void;
    onContentChanged(): void;
    onTokensChanged(): void;
    renderLine(t: any, n: any, e: any, h: any, o: any): boolean;
    layoutLine(t: any, n: any, e: any): void;
}
import { $Wbb as p } from "./viewPart.js";
import { $Zbb as u } from "./viewLayer.js";
export { b as $1cb, S as $2cb, d as $Ycb, f as $Zcb };
//# sourceMappingURL=viewOverlays.d.ts.map