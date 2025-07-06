declare class m {
    constructor(t: W | undefined, e: boolean | undefined, s: any, n?: boolean);
    i: W;
    j: boolean;
    k: any;
    l: boolean;
    f: boolean;
    g: Set<any>;
    h: Set<any>;
    t: Set<any>;
    _globalGraph: any;
    dispose(): void;
    m(): void;
    createChild(t: any, e: any): {
        dispose(): void;
        i: W;
        j: boolean;
        k: any;
        l: boolean;
        f: boolean;
        g: Set<any>;
        h: Set<any>;
        t: Set<any>;
        _globalGraph: any;
        m(): void;
        createChild(t: any, e: any): /*elided*/ any;
        invokeFunction(t: any, ...e: any[]): any;
        createInstance(t: any, ...e: any[]): any;
        o(t: any, e: any[] | undefined, s: any): any;
        q(t: any, e: any): void;
        r(t: any): any;
        s(t: any, e: any): any;
        u(t: any, e: any, s: any): any;
        v(t: any, e: any, s: any): any;
        w(t: any, e: any, s: any[] | undefined, n: any, h: any): any;
        x(t: any, e: any, s: any[] | undefined, n: any, h: any, l: any): any;
        y(t: any, e: any): void;
    };
    invokeFunction(t: any, ...e: any[]): any;
    createInstance(t: any, ...e: any[]): any;
    o(t: any, e: any[] | undefined, s: any): any;
    q(t: any, e: any): void;
    r(t: any): any;
    s(t: any, e: any): any;
    u(t: any, e: any, s: any): any;
    v(t: any, e: any, s: any): any;
    w(t: any, e: any, s: any[] | undefined, n: any, h: any): any;
    x(t: any, e: any, s: any[] | undefined, n: any, h: any, l: any): any;
    y(t: any, e: any): void;
}
declare class f {
    static traceInvocation(t: any, e: any): f | undefined;
    static traceCreation(t: any, e: any): f | undefined;
    constructor(t: any, e: any);
    type: any;
    name: any;
    g: number;
    h: any[];
    branch(t: any, e: any): f;
    stop(): void;
}
import { $mj as W } from "./serviceCollection.js";
export { m as $dB, f as $eB };
//# sourceMappingURL=instantiationService.d.ts.map