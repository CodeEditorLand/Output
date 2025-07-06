declare const I: RegExp;
declare const A: RegExp;
declare namespace ke {
    let shadowColor: undefined;
    let borderColor: undefined;
    let foregroundColor: undefined;
    let backgroundColor: undefined;
    let selectionForegroundColor: undefined;
    let selectionBackgroundColor: undefined;
    let selectionBorderColor: undefined;
    let separatorColor: undefined;
    let scrollbarShadow: undefined;
    let scrollbarSliderBackground: undefined;
    let scrollbarSliderHoverBackground: undefined;
    let scrollbarSliderActiveBackground: undefined;
}
declare class x extends V {
    constructor(e: any, t: any, i: any, s: any);
    Z: any;
    X: HTMLDivElement;
    U: Map<any, any>;
    W: any;
    ab(e: any, t: any): void;
    Y: any;
    bb(e: any, t: any): void;
    getContainer(): any;
    get onScroll(): any;
    get scrollOffset(): number;
    trigger(e: any): void;
    cb(e: any): void;
    db(e: any): void;
    R(e: any): void;
    fb(e: any, t: any, i: any): M | Y;
}
declare function ie(c: any): any;
declare function _(c: any): string;
declare var y: any;
declare var L: any;
import { $b8 as V } from "../actionbar/actionbar.js";
declare class M extends j {
    constructor(e: any, t: any, i: any, s: any);
    w: any;
    t: any;
    s: string;
    r: string | undefined;
    h: R;
    container: any;
    g: any;
    n: any;
    m: any;
    updatePositionInSet(e: any, t: any): void;
    getMnemonic(): string | undefined;
    P(): void;
}
declare class Y extends Q {
    constructor(e: any, t: any, i: any, s: any);
    b: any;
}
import { $l9 as j } from "../actionbar/actionViewItems.js";
import { $Zh as R } from "../../../common/async.js";
import { $m9 as Q } from "../actionbar/actionViewItems.js";
export { I as $G9, A as $H9, ke as $I9, x as $J9, ie as $K9, _ as $L9, y as HorizontalDirection, L as VerticalDirection };
//# sourceMappingURL=menu.d.ts.map