declare function R(r: any): boolean;
declare let j: {
    new (t: any, e: any): {
        r: any;
        c: x;
        onDidClose: any;
        d: x;
        onDidChangeContents: any;
        l: b;
        n: b;
        o: number;
        q: h.$q6;
        domNode: HTMLElement;
        m: any;
        h: HTMLElement;
        g: L;
        i: any;
        f: any;
        j: any;
        k: any;
        dispose(): void;
        s(): void;
        getLayoutInfo(): {
            lineHeight: any;
            borderWidth: number;
            borderHeight: number;
            verticalPadding: number;
            horizontalPadding: number;
        };
        renderLoading(): void;
        renderItem(t: any, e: any): void;
        clearContents(): void;
        readonly isEmpty: boolean;
        readonly size: h.$q6;
        layout(t: any, e: any): void;
        scrollDown(t?: number): void;
        scrollUp(t?: number): void;
        scrollTop(): void;
        scrollBottom(): void;
        pageDown(): void;
        pageUp(): void;
        borderWidth: number;
        focus(): void;
    };
};
declare class X {
    constructor(t: any, e: any);
    widget: any;
    k: any;
    allowEditorOverflow: boolean;
    c: b;
    f: boolean;
    h: boolean;
    d: I;
    i: any;
    dispose(): void;
    getId(): string;
    getDomNode(): HTMLDivElement;
    getPosition(): {
        preference: any;
    } | null;
    show(): void;
    hide(t?: boolean): void;
    placeAtAnchor(t: any, e: any): void;
    g: any;
    _placeAtAnchor(t: any, e: any, s: any): void;
    l(t: any): void;
    j: any;
}
import { $ef as x } from "../../../../base/common/event.js";
import { $ud as b } from "../../../../base/common/lifecycle.js";
import * as h from "../../../../base/browser/dom.js";
import { $37 as L } from "../../../../base/browser/ui/scrollbar/scrollableElement.js";
import { $G0 as I } from "../../../../base/browser/ui/resizable/resizable.js";
export { R as $xlb, j as $ylb, X as $zlb };
//# sourceMappingURL=suggestWidgetDetails.d.ts.map