export { g as $Jnb };
declare let g: {
    new (t: any, o: any, r: any, i: any, n: any, e: any, l: any, f: any, d: any): {
        m: any;
        hoverOrdinal: number;
        suggestHoverAnchor(t: any): w | null;
        computeSync(): never[];
        computeAsync(t: any, o: any, r: any, i: any): h | undefined;
        n(t: any, o: any): Promise<h | undefined>;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        createLoadingMessage(e: any): u;
        l(e: any, t: any, o: any, r: any): h;
        renderHoverParts(e: any, t: any): {
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
            b: import("../../../../base/common/lifecycle.js").$ud;
            renderedHoverParts: any;
            n(e: any, t: any, o: any): any;
            o(e: any, t: any): {
                hoverPart: any;
                hoverElement: any;
                disposables: any;
                actionsContainer: any;
                readonly hoverAccessibleContent: any;
                dispose(): void;
            };
            p(e: any, t: any): {
                hoverPart: any;
                hoverElement: HTMLElement;
                dispose(): void;
            };
            q(e: any, t: any, o: any): import("../../../../base/common/lifecycle.js").$ud;
            handleScroll(e: any): void;
            updateMarkdownHoverPartVerbosityLevel(e: any, t: any): Promise<{
                hoverPart: u;
                hoverElement: any;
            } | undefined>;
            getAccessibleContent(e: any): any;
            doesMarkdownHoverAtIndexSupportVerbosityAction(e: any, t: any): boolean;
            r(e: any, t: any, o: any): Promise<any>;
            s(e: any, t: any): {
                hoverPart: any;
                hoverElement: any;
                disposables: any;
                actionsContainer: any;
                readonly hoverAccessibleContent: any;
                dispose(): void;
            } | undefined;
            t(e: any): any;
            dispose(): void;
        };
        a: {
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
            b: import("../../../../base/common/lifecycle.js").$ud;
            renderedHoverParts: any;
            n(e: any, t: any, o: any): any;
            o(e: any, t: any): {
                hoverPart: any;
                hoverElement: any;
                disposables: any;
                actionsContainer: any;
                readonly hoverAccessibleContent: any;
                dispose(): void;
            };
            p(e: any, t: any): {
                hoverPart: any;
                hoverElement: HTMLElement;
                dispose(): void;
            };
            q(e: any, t: any, o: any): import("../../../../base/common/lifecycle.js").$ud;
            handleScroll(e: any): void;
            updateMarkdownHoverPartVerbosityLevel(e: any, t: any): Promise<{
                hoverPart: u;
                hoverElement: any;
            } | undefined>;
            getAccessibleContent(e: any): any;
            doesMarkdownHoverAtIndexSupportVerbosityAction(e: any, t: any): boolean;
            r(e: any, t: any, o: any): Promise<any>;
            s(e: any, t: any): {
                hoverPart: any;
                hoverElement: any;
                disposables: any;
                actionsContainer: any;
                readonly hoverAccessibleContent: any;
                dispose(): void;
            } | undefined;
            t(e: any): any;
            dispose(): void;
        } | undefined;
        handleScroll(e: any): void;
        getAccessibleContent(e: any): any;
        doesMarkdownHoverAtIndexSupportVerbosityAction(e: any, t: any): boolean;
        updateMarkdownHoverVerbosityLevel(e: any, t: any): Promise<{
            hoverPart: u;
            hoverElement: any;
        } | undefined>;
    };
};
declare class w extends _ {
    constructor(t: any, o: any, r: any, i: any);
    part: any;
}
import { $bi as h } from "../../../../base/common/async.js";
import { $8lb as u } from "../../hover/browser/markdownHoverParticipant.js";
import { $sjb as _ } from "../../hover/browser/hoverTypes.js";
//# sourceMappingURL=inlayHintsHover.d.ts.map