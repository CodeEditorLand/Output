declare function w(i: any): boolean;
declare function y(i: any, t: any, e: any): any[];
declare class A extends N {
    constructor(t: any, e?: {});
    set orientation(t: any);
    get orientation(): any;
    get width(): any;
    get height(): any;
    get minimumWidth(): any;
    get minimumHeight(): any;
    get maximumWidth(): any;
    get maximumHeight(): any;
    set boundarySashes(t: {});
    get boundarySashes(): {};
    set edgeSnapping(t: any);
    get element(): HTMLElement;
    b: Map<any, any>;
    f: boolean;
    a: m;
    onDidChange: any;
    onDidScroll: any;
    onDidChangeViewMaximized: any;
    style(t: any): void;
    layout(t: any, e: any, n?: number, r?: number): void;
    addView(t: any, e: any, n: any, r: any): void;
    g(t: any, e: any, n: any): void;
    h(t: any, e: any, n: any): void;
    removeView(t: any, e: any): void;
    moveView(t: any, e: any, n: any, r: any): void;
    moveViewTo(t: any, e: any): void;
    swapViews(t: any, e: any): void;
    resizeView(t: any, e: any): void;
    isViewExpanded(t: any): boolean;
    isViewMaximized(t: any): boolean;
    hasMaximizedView(): boolean;
    getViewSize(t: any): {
        width: any;
        height: any;
    };
    getViewCachedVisibleSize(t: any): any;
    maximizeView(t: any): void;
    exitMaximizedView(): void;
    expandView(t: any): void;
    distributeViewSizes(): void;
    isViewVisible(t: any): any;
    setViewVisible(t: any, e: any): void;
    getViews(): any;
    getNeighborViews(t: any, e: any, n?: boolean): any[];
    j(t: any): any;
    m(t: any): void;
}
declare class c extends A {
    static n(t: any, e: any): {
        type: string;
        data: any;
        size: any;
    } | {
        type: string;
        data: any;
        size: any;
        visible: boolean;
    };
    static deserialize(t: any, e: any, n?: {}): c;
    static from(t: any, e?: {}): c;
    constructor(...args: any[]);
    s: boolean;
    serialize(): {
        root: {
            type: string;
            data: any;
            size: any;
        } | {
            type: string;
            data: any;
            size: any;
            visible: boolean;
        };
        orientation: any;
        width: any;
        height: any;
    };
}
declare function C(i: any, t: any): void;
declare function H(i: any): {
    root: {
        type: string;
        data: any;
        size: any;
    };
    orientation: any;
    width: any;
    height: any;
};
declare var S: any;
import { LayoutPriority as Z } from "./gridview.js";
import { Orientation as q } from "./gridview.js";
declare var b: any;
import { $Z9 as D } from "./gridview.js";
import { $vd as N } from "../../../common/lifecycle.js";
import { $29 as m } from "./gridview.js";
export { w as $39, y as $49, A as $59, c as $69, C as $79, H as $89, S as Direction, Z as LayoutPriority, q as Orientation, b as Sizing, D as orthogonal };
//# sourceMappingURL=grid.d.ts.map