declare class T {
    constructor(e: any, o: any, t: any);
    owner: any;
    range: any;
    controller: any;
    isValidForHoverAnchor(e: any): boolean;
}
declare let w: {
    new (e: any, o: any, t: any, n: any, r: any, i: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        e: any;
        f: any;
        hoverOrdinal: number;
        suggestHoverAnchor(e: any): h | null;
        computeSync(e: any, o: any): T[];
        renderHoverParts(e: any, o: any): A;
        getAccessibleContent(e: any): any;
        g(e: any, o: any): g;
    };
};
import { $sjb as h } from "../../../hover/browser/hoverTypes.js";
import { $tjb as A } from "../../../hover/browser/hoverTypes.js";
import { $ud as g } from "../../../../../base/common/lifecycle.js";
export { T as $crb, w as $drb };
//# sourceMappingURL=hoverParticipant.d.ts.map