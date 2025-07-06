export { e as Rect };
declare class e {
    static fromPoint(t: any): e;
    static fromPoints(t: any, i: any): e;
    static fromPointSize(t: any, i: any): e;
    static fromLeftTopRightBottom(t: any, i: any, h: any, s: any): e;
    static fromLeftTopWidthHeight(t: any, i: any, h: any, s: any): e;
    static fromRanges(t: any, i: any): e;
    static hull(t: any): e;
    constructor(t: any, i: any, h: any, s: any);
    get width(): number;
    get height(): number;
    left: any;
    top: any;
    right: any;
    bottom: any;
    withMargin(t: any, i: any, h: any, s: any): e;
    intersectVertical(t: any): e;
    intersectHorizontal(t: any): e;
    toString(): string;
    intersect(t: any): e | undefined;
    union(t: any): e;
    containsRect(t: any): boolean;
    containsPoint(t: any): boolean;
    moveToBeContainedIn(t: any): e;
    withWidth(t: any): e;
    withHeight(t: any): e;
    withTop(t: any): e;
    withLeft(t: any): e;
    translateX(t: any): e;
    translateY(t: any): e;
    deltaRight(t: any): e;
    deltaTop(t: any): e;
    deltaLeft(t: any): e;
    deltaBottom(t: any): e;
    getLeftBottom(): f;
    getRightBottom(): f;
    getLeftTop(): f;
    getRightTop(): f;
    toStyles(): {
        position: string;
        left: string;
        top: string;
        width: string;
        height: string;
    };
}
import { $Ueb as f } from "./point.js";
//# sourceMappingURL=rect.d.ts.map