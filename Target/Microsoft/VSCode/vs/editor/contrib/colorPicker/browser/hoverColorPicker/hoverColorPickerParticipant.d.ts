declare class m {
    static fromBaseColor(e: any, r: any): m;
    constructor(e: any, r: any, o: any, i: any);
    owner: any;
    range: any;
    model: any;
    provider: any;
    forceShowAtRange: boolean;
    isValidForHoverAnchor(e: any): boolean;
}
declare let p: {
    new (e: any, r: any): {
        b: any;
        c: any;
        hoverOrdinal: number;
        computeSync(e: any, r: any, o: any): never[];
        computeAsync(e: any, r: any, o: any, i: any): C;
        f(e: any, r: any, o: any): Promise<m[]>;
        g(e: any): boolean | undefined;
        renderHoverParts(e: any, r: any): u;
        a: any;
        getAccessibleContent(e: any): any;
        handleResize(): void;
        handleHide(): void;
        isColorPickerVisible(): boolean;
    };
};
import { $bi as C } from "../../../../../base/common/async.js";
import { $tjb as u } from "../../../hover/browser/hoverTypes.js";
export { m as $mmb, p as $nmb };
//# sourceMappingURL=hoverColorPickerParticipant.d.ts.map