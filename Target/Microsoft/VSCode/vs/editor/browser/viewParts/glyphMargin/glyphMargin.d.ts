declare class v {
    constructor(t: any, n: any, e: any);
    className: any;
    zIndex: any;
    tooltip: any;
}
declare class T {
    constructor(t: any, n: any, e: any, s: any, d: any);
    startLineNumber: any;
    endLineNumber: any;
    className: any;
    tooltip: any;
    zIndex: any;
}
declare class y {
    c: any[];
    add(t: any): void;
    getDecorations(): any[];
}
declare class k extends x {
    c(t: any, n: any, e: any): y[];
}
declare class V extends L {
    t: {};
    domNode: import("../../../../base/browser/fastDomNode.js").$N7;
    c: any;
    f: any;
    g: any;
    h: any;
    j: any;
    n: any[];
    s: any[];
    getWidgets(): any[];
    onScrollChanged(t: any): any;
    addWidget(t: any): void;
    setWidgetPosition(t: any, n: any): boolean;
    removeWidget(t: any): void;
    w(t: any, n: any): void;
    y(t: any, n: any): void;
    z(t: any): any[];
    prepareRender(t: any): void;
    render(t: any): void;
}
import { $Xcb as x } from "../../view/dynamicViewOverlay.js";
import { $Wbb as L } from "../../view/viewPart.js";
export { v as $$cb, T as $0cb, y as $_cb, k as $adb, V as $bdb };
//# sourceMappingURL=glyphMargin.d.ts.map