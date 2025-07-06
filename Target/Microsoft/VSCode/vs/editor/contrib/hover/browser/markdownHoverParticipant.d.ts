declare function de(c: any, e: any): any;
declare function Ve(c: any, e: any, t: any, o: any, r: any): K;
declare class g {
    constructor(e: any, t: any, o: any, r: any, s: any, n?: undefined);
    owner: any;
    range: any;
    contents: any;
    isBeforeContent: any;
    ordinal: any;
    source: any;
    isValidForHoverAnchor(e: any): boolean;
}
declare let E: {
    new (e: any, t: any, o: any, r: any, s: any, n: any, i: any, a: any): {
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        hoverOrdinal: number;
        createLoadingMessage(e: any): g;
        computeSync(e: any, t: any): g[];
        computeAsync(e: any, t: any, o: any, r: any): M | undefined;
        l(e: any, t: any, o: any, r: any): M;
        renderHoverParts(e: any, t: any): ae;
        a: ae | undefined;
        handleScroll(e: any): void;
        getAccessibleContent(e: any): any;
        doesMarkdownHoverAtIndexSupportVerbosityAction(e: any, t: any): boolean;
        updateMarkdownHoverVerbosityLevel(e: any, t: any): Promise<{
            hoverPart: g;
            hoverElement: any;
        } | undefined>;
    };
};
import { $tjb as K } from "./hoverTypes.js";
import { $bi as M } from "../../../../base/common/async.js";
declare class ae {
    constructor(e: any, t: any, o: any, r: any, s: any, n: any, i: any, a: any, l: any, d: any, h: any);
    c: any;
    f: any;
    g: any;
    h: any;
    i: any;
    j: any;
    k: any;
    l: any;
    m: any;
    a: Map<any, any>;
    b: P;
    renderedHoverParts: any;
    n(e: any, t: any, o: any): any;
    o(e: any, t: any): H;
    p(e: any, t: any): {
        hoverPart: any;
        hoverElement: HTMLElement;
        dispose(): void;
    };
    q(e: any, t: any, o: any): P;
    handleScroll(e: any): void;
    updateMarkdownHoverPartVerbosityLevel(e: any, t: any): Promise<{
        hoverPart: g;
        hoverElement: any;
    } | undefined>;
    getAccessibleContent(e: any): any;
    doesMarkdownHoverAtIndexSupportVerbosityAction(e: any, t: any): boolean;
    r(e: any, t: any, o: any): Promise<any>;
    s(e: any, t: any): H | undefined;
    t(e: any): any;
    dispose(): void;
}
import { $ud as P } from "../../../../base/common/lifecycle.js";
declare class H {
    constructor(e: any, t: any, o: any, r: any);
    hoverPart: any;
    hoverElement: any;
    disposables: any;
    actionsContainer: any;
    get hoverAccessibleContent(): any;
    dispose(): void;
}
export { de as $$lb, Ve as $0lb, g as $8lb, E as $9lb };
//# sourceMappingURL=markdownHoverParticipant.d.ts.map