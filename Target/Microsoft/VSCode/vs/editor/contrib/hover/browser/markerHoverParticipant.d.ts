declare let T: {
    new (e: any, t: any, o: any, n: any): {
        f: any;
        g: any;
        h: any;
        i: any;
        hoverOrdinal: number;
        computeSync(e: any, t: any): X[];
        renderHoverParts(e: any, t: any): N;
        getAccessibleContent(e: any): any;
        j(e: any): {
            hoverPart: any;
            hoverElement: HTMLElement;
            dispose: () => void;
        };
        k(e: any, t: any): x;
        c: any;
        l(e: any): {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        };
    };
};
declare class X {
    constructor(e: any, t: any, o: any);
    owner: any;
    range: any;
    marker: any;
    isValidForHoverAnchor(e: any): boolean;
}
import { $tjb as N } from "./hoverTypes.js";
import { $ud as x } from "../../../../base/common/lifecycle.js";
export { T as $Arb, X as $zrb };
//# sourceMappingURL=markerHoverParticipant.d.ts.map