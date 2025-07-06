declare let d: {
    new (t: any, r: any, e: any, n: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        hoverOrdinal: number;
        computeSync(t: any, r: any): R[];
        renderHoverParts(t: any, r: any): m;
        getAccessibleContent(t: any): any;
    };
};
declare class R {
    constructor(t: any, r: any, e: any);
    owner: any;
    range: any;
    agent: any;
    isValidForHoverAnchor(t: any): boolean;
}
import { $tjb as m } from "../../../../../editor/contrib/hover/browser/hoverTypes.js";
export { d as $rhc, R as $shc };
//# sourceMappingURL=chatInputEditorHover.d.ts.map