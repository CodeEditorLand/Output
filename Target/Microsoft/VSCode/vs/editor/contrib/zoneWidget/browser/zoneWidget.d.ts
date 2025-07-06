declare class S {
    constructor(t: any, i: any);
    a: any;
    b: any;
    getId(): any;
    getDomNode(): any;
    getPosition(): null;
}
declare class k {
    constructor(t: any, i?: {});
    a: p | null;
    b: S | null;
    d: any;
    f: boolean;
    h: H | null;
    j: $;
    container: HTMLDivElement | null;
    t: boolean;
    editor: any;
    g: any;
    options: any;
    domNode: HTMLDivElement;
    dispose(): void;
    create(): void;
    style(t: any): void;
    k(): void;
    l(t: any): number;
    n(t: any): any;
    o(t: any): void;
    q(t: any): void;
    get position(): any;
    hasFocus(): boolean;
    show(t: any, i: any): void;
    updatePositionAndHeight(t: any, i: any): void;
    hide(): void;
    u(): number;
    v(): number;
    w(t: any, i: any): void;
    x(t: any, i: any): void;
    y(t: any, i: any): void;
    A(t: any): void;
    B(t: any, i: any): void;
    C(t: any, i: any): void;
    D(): void;
    E(): void;
    get F(): boolean;
    G(): {
        minLines: number;
        maxLines: number;
    };
    getHorizontalSashLeft(): number;
    getHorizontalSashTop(): number;
    getHorizontalSashWidth(): number;
}
declare class p {
    constructor(t: any);
    g: any;
    b: any;
    d: any;
    f: number;
    c: any;
    dispose(): void;
    set color(t: any);
    set height(t: any);
    h(): void;
    show(t: any): void;
    hide(): void;
}
declare class H {
    constructor(t: any, i: any, s: any, o: any, e: any, d: any, r: any, a: any);
    id: string;
    domNode: any;
    afterLineNumber: any;
    afterColumn: any;
    heightInLines: any;
    showInHiddenAreas: any;
    ordinal: any;
    a: any;
    b: any;
    onDomNodeTop(t: any): void;
    onComputedHeight(t: any): void;
}
import { $ud as $ } from "../../../../base/common/lifecycle.js";
export { S as $wmb, k as $xmb };
//# sourceMappingURL=zoneWidget.d.ts.map