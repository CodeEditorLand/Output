declare class W extends b {
    constructor(t: any, e: any, n: any, s: any, r: any);
    get seenSequences(): Set<any>;
    get status(): number;
    n: any;
    r: any;
    s: any;
    t: any;
    u: any;
    capabilities: any;
    b: boolean;
    f: any[];
    g: Set<any>;
    h: number;
    j: d;
    onDidChangeStatus: any;
    m: d;
    onDidChangeSeenSequences: any;
    w(): void;
    activate(t: any): void;
    a: any;
    getMarkerId(t: any, e: any): void;
    y(t: any): void;
    z(t: any): boolean;
    C(t: any): boolean;
    D(t: any): boolean;
    F(): Promise<void>;
    c: NodeJS.Timeout | undefined;
    G(): void;
    H(t: any): boolean;
    I(t: any): void;
    J(t: any): void;
    L(t: any): void;
    M(t: any): boolean;
    N(t: any): boolean;
    O(t: any): boolean;
    serialize(): any;
    deserialize(t: any): void;
    P(): any;
    Q(t: any): any;
    R(t: any): any;
    S(): any;
}
declare function u(i: any): any;
declare function p(i: any): {
    key: any;
    value: any;
};
declare function x(i: any): {
    id: any;
    hidden: boolean;
};
declare var c: any;
import { $vd as b } from "../../../../base/common/lifecycle.js";
import { $ef as d } from "../../../../base/common/event.js";
export { W as $4Yb, u as $5Yb, p as $6Yb, x as $7Yb, c as ShellIntegrationOscPs };
//# sourceMappingURL=shellIntegrationAddon.d.ts.map