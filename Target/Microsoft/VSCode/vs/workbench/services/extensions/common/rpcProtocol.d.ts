declare function z(o: any, t?: null, e?: boolean): {
    jsonString: string;
    referencedBuffers: any[];
};
declare function x(o: any, t: any, e: any): any;
declare class O extends v {
    constructor(t: any, e?: null, r?: null);
    b: any;
    onDidChangeResponsiveState: any;
    c: any;
    f: any;
    g: any;
    h: ((t: any, e: any) => any) | null;
    j: boolean;
    m: null[];
    s: null[];
    t: number;
    u: any;
    w: {};
    y: number;
    z: number;
    C: number;
    D: any;
    drain(): any;
    F(t: any): void;
    G(t: any): void;
    H(): void;
    I(t: any): void;
    get responsiveState(): number;
    transformIncomingURIs(t: any): any;
    getProxy(t: any): null | undefined;
    J(t: any, e: any): any;
    set(t: any, e: any): any;
    assertRegistered(t: any): void;
    L(t: any): void;
    M(t: any, e: any, r: any, i: any, s: any, n: any): void;
    N(t: any, e: any): void;
    O(t: any, e: any, r: any): void;
    P(t: any, e: any, r: any): void;
    Q(t: any, e: any, r: any): Promise<any>;
    S(t: any, e: any, r: any): any;
    U(t: any, e: any, r: any): Promise<never> | K;
}
declare var U: any;
declare var L: any;
import { $vd as v } from "../../../../base/common/lifecycle.js";
import { $MBc as K } from "./lazyPromise.js";
export { z as $OBc, x as $PBc, O as $QBc, U as RequestInitiator, L as ResponsiveState };
//# sourceMappingURL=rpcProtocol.d.ts.map