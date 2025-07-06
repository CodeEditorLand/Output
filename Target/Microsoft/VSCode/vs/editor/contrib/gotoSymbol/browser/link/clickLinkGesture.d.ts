declare class o {
    constructor(i: any, e: any);
    target: any;
    isLeftClick: any;
    isMiddleClick: any;
    isRightClick: any;
    hasTriggerModifier: boolean;
    hasSideBySideModifier: boolean;
    isNoneOrSingleMouseDown: boolean;
}
declare class f {
    constructor(i: any, e: any);
    keyCodeIsTriggerKey: boolean;
    keyCodeIsSideBySideKey: boolean;
    hasTriggerModifier: boolean;
}
declare class h {
    constructor(i: any, e: any, t: any, r: any);
    triggerKey: any;
    triggerModifier: any;
    triggerSideBySideKey: any;
    triggerSideBySideModifier: any;
    equals(i: any): boolean;
}
declare class u extends a {
    constructor(i: any, e: any);
    a: any;
    onMouseMoveOrRelevantKeyDown: any;
    b: any;
    onExecute: any;
    c: any;
    onCancel: any;
    f: any;
    g: any;
    h: h;
    j: any;
    m: boolean;
    n: number;
    r(i: any): void;
    s(i: any): void;
    t(i: any): void;
    u(i: any): void;
    w(i: any): void;
    y(i: any): void;
    z(): void;
}
import { $vd as a } from "../../../../../base/common/lifecycle.js";
export { o as $omb, f as $pmb, h as $qmb, u as $rmb };
//# sourceMappingURL=clickLinkGesture.d.ts.map