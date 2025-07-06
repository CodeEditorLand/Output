declare class T {
    constructor(t: any, e: any);
    a: any;
    c: any;
    f: any;
    d: number;
    g: boolean;
    b: import("../../../../base/browser/fastDomNode.js").$N7;
    h: C;
    i: string;
    j: string;
    k: y | null;
    getDomNode(): import("../../../../base/browser/fastDomNode.js").$N7;
    getPosition(): C;
    setPlurality(t: any): void;
    show(): void;
    hide(): void;
    onConfigurationChanged(t: any): boolean;
    onCursorPositionChanged(t: any, e: any): boolean;
    l(): any[];
    m(t: any): y | null;
    n(t: any): any;
    prepareRender(t: any): void;
    render(t: any): {
        domNode: any;
        position: C;
        contentLeft: any;
        height: any;
        width: number;
    } | null;
}
declare var d: any;
import { $dC as C } from "../../../common/core/position.js";
declare class y {
    constructor(t: any, e: any, s: any, i: any, h: any, r: any, a: any);
    top: any;
    left: any;
    paddingLeft: any;
    width: any;
    height: any;
    textContent: any;
    textContentClassName: any;
}
export { T as $wcb, d as CursorPlurality };
//# sourceMappingURL=viewCursor.d.ts.map