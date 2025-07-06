declare class c extends $ {
    constructor(t: any, e: any, s?: {});
    get action(): any;
    t: {};
    _context: any;
    _action: any;
    u(t: any): void;
    set actionRunner(t: any);
    get actionRunner(): any;
    j: any;
    isEnabled(): any;
    setActionContext(t: any): void;
    render(t: any): void;
    element: any;
    onClick(t: any, e?: boolean): void;
    focus(): void;
    isFocused(): boolean;
    blur(): void;
    setFocusable(t: any): void;
    get trapsArrowNavigation(): boolean;
    z(): void;
    C(): void;
    D(): any;
    F(): any;
    G(): void;
    f: any;
    H(): void;
    I(): void;
    J(): void;
}
declare class R extends c {
    constructor(t: any, e: any, s: any);
    t: any;
    N: string;
    L: HTMLAnchorElement | undefined;
    O(): "button" | "menuitem" | "presentation" | "tab";
}
declare class z extends c {
    constructor(t: any, e: any, s: any, i: any, a: any, d: any, u: any);
    b: g;
    setOptions(t: any, e: any): void;
    select(t: any): void;
    g(): void;
    m(t: any, e: any): void;
    n(t: any, e: any): any;
}
import { $vd as $ } from "../../../common/lifecycle.js";
import { $f9 as g } from "../selectBox/selectBox.js";
export { c as $l9, R as $m9, z as $n9 };
//# sourceMappingURL=actionViewItems.d.ts.map