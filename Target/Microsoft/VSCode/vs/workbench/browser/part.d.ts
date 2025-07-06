declare class j extends u {
    constructor(...args: any[]);
    f: Set<any>;
    get parts(): any[];
    registerPart(t: any): any;
    g(t: any): void;
    getPart(t: any): any;
    j(t: any): any;
    get activePart(): any;
}
declare class S extends u {
    constructor(t: any, i: any, s: any, e: any, h: any);
    get dimension(): r | undefined;
    get contentPosition(): {
        top: any;
        left: any;
    } | undefined;
    L: any;
    M: any;
    j: any;
    onDidVisibilityChange: any;
    ab: any;
    create(t: any, i: any): void;
    m: any;
    s: void | undefined;
    t: void | undefined;
    J: n | undefined;
    getContainer(): any;
    O(t: any, i: any): void;
    P(): void | undefined;
    Q(t: any, i: any): void;
    R(): void | undefined;
    S(t: any): void;
    r: any;
    U(t: any): void;
    u: any;
    W(): void;
    X(): void;
    Y(): void;
    Z(t: any, i: any): any;
    get onDidChange(): any;
    layout(t: any, i: any, s: any, e: any): void;
    f: r | undefined;
    g: {
        top: any;
        left: any;
    } | undefined;
    setVisible(t: any): void;
}
import { $Eub as u } from "../common/component.js";
import { $q6 as r } from "../../base/browser/dom.js";
declare class n {
    constructor(t: any, i: any);
    f: any;
    g: any;
    d: boolean;
    e: boolean;
    layout(t: any, i: any): {
        headerSize: r | undefined;
        titleSize: r | undefined;
        contentSize: r;
        footerSize: r | undefined;
    };
    setFooterVisibility(t: any): void;
    setHeaderVisibility(t: any): void;
}
export { j as $Nub, S as Part };
//# sourceMappingURL=part.d.ts.map