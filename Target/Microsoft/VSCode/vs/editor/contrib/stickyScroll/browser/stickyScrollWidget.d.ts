declare class C {
    static get Empty(): C;
    constructor(t: any, e: any, i: any, n?: null);
    startLineNumbers: any;
    endLineNumbers: any;
    lastLineRelativePosition: any;
    showEndForLine: any;
    equals(t: any): boolean;
}
declare class ht extends F {
    constructor(t: any);
    get height(): number;
    a: P;
    b: HTMLDivElement;
    c: HTMLDivElement;
    f: HTMLDivElement;
    g: HTMLDivElement;
    n: any[];
    r: any[];
    s: number;
    t: number;
    u: boolean;
    w: number;
    y: any;
    onDidChangeStickyScrollHeight: any;
    h: any;
    m: any;
    get lineNumbers(): any[];
    get lineNumberCount(): number;
    getRenderedStickyLine(t: any): any;
    getCurrentLines(): any[];
    setState(t: any, e: any, i: any): void;
    j: any;
    z(t: any): {
        lineNumbers: any[];
        lastLineRelativePosition: any;
    };
    C(t: any, e: any, i: any): any;
    D(): void;
    F(t: any): void;
    G(t: any): void;
    H(t: any, e: any, i: any, n: any): Promise<void>;
    I(): void;
    J(t: any): void;
    L(): void;
    M(t: any, e: any, i: any, n: any, s: any, o: any, l: any): any;
    N(t: any, e: any, i: any): any;
    O(t: any, e: any): G | undefined;
    getId(): string;
    getDomNode(): HTMLDivElement;
    getPosition(): {
        preference: number;
        stackOridinal: number;
    };
    getMinContentWidthInPx(): number;
    focusLineWithIndex(t: any): void;
    getEditorPositionFromNode(t: any): N | null;
    getLineNumberFromChildDomNode(t: any): any;
    P(t: any): any;
    getLineIndexFromChildDomNode(t: any): number | null;
    isInStickyLine(t: any): boolean;
    isInFoldingIconDomNode(t: any): boolean;
    Q(t: any, e: any): any;
}
import { $vd as F } from "../../../../base/common/lifecycle.js";
import { $ud as P } from "../../../../base/common/lifecycle.js";
declare class G {
    constructor(t: any, e: any, i: any, n: any);
    isCollapsed: any;
    foldingStartLine: any;
    foldingEndLine: any;
    dimension: any;
    domNode: HTMLDivElement;
    setVisible(t: any): void;
}
import { $dC as N } from "../../../common/core/position.js";
export { C as $7pb, ht as $8pb };
//# sourceMappingURL=stickyScrollWidget.d.ts.map