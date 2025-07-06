declare function mt(i: any, t: any): void;
declare class x {
    constructor(t?: {
        regexParsingWithErrorRecovery: boolean;
    });
    get lexingErrors(): any[];
    get parsingErrors(): any[];
    k: {
        regexParsingWithErrorRecovery: boolean;
    };
    d: S;
    f: any[];
    g: number;
    h: any[];
    v: RegExp;
    parse(t: any): any;
    l(): any;
    m(): any;
    o(): any;
    s(): any;
    t(): any;
    u(): any;
    w(t: any): any;
    x(): any;
    y(t: any): boolean;
    z(): any;
    A(t: any, e: any): any;
    B(t: any, e: any, r: any): Error | undefined;
    C(t: any): boolean;
    D(): any;
    E(): boolean;
}
declare class f {
    static false(): l | undefined;
    static true(): o | undefined;
    static has(t: any): l | o | N | undefined;
    static equals(t: any, e: any): l | o | N | q | E | undefined;
    static notEquals(t: any, e: any): l | o | N | k | E | undefined;
    static regex(t: any, e: any): b;
    static in(t: any, e: any): D;
    static notIn(t: any, e: any): F;
    static not(t: any): l | o | E | undefined;
    static and(...t: any[]): any;
    static or(...t: any[]): any;
    static greater(t: any, e: any): any;
    static greaterEquals(t: any, e: any): any;
    static smaller(t: any, e: any): any;
    static smallerEquals(t: any, e: any): any;
    static deserialize(t: any): any;
}
declare function xt(i: any): any;
declare function Nt(i: any, t: any): any;
declare class l {
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): never[];
    map(t: any): this;
    negate(): o | undefined;
}
declare class o {
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): never[];
    map(t: any): this;
    negate(): l | undefined;
}
declare class N {
    static create(t: any, e?: null): l | o | N | undefined;
    constructor(t: any, e: any);
    key: any;
    c: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): l | o | this | undefined;
    evaluate(t: any): boolean;
    serialize(): any;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class q {
    static create(t: any, e: any, r?: null): l | o | N | q | E | undefined;
    constructor(t: any, e: any, r: any);
    c: any;
    d: any;
    f: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): l | o | this | undefined;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class D {
    static create(t: any, e: any): D;
    constructor(t: any, e: any);
    d: any;
    f: any;
    type: number;
    c: F | null;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): F;
}
declare class F {
    static create(t: any, e: any): F;
    constructor(t: any, e: any);
    d: any;
    f: any;
    type: number;
    c: D;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): D;
}
declare class k {
    static create(t: any, e: any, r?: null): l | o | N | k | E | undefined;
    constructor(t: any, e: any, r: any);
    c: any;
    d: any;
    f: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): l | o | this | undefined;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class E {
    static create(t: any, e?: null): l | o | E | undefined;
    constructor(t: any, e: any);
    c: any;
    d: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): l | o | this | undefined;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class I {
    static create(t: any, e: any, r?: null): any;
    constructor(t: any, e: any, r: any);
    c: any;
    d: any;
    f: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class C {
    static create(t: any, e: any, r?: null): any;
    constructor(t: any, e: any, r: any);
    c: any;
    d: any;
    f: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class $ {
    static create(t: any, e: any, r?: null): any;
    constructor(t: any, e: any, r: any);
    c: any;
    d: any;
    f: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class v {
    static create(t: any, e: any, r?: null): any;
    constructor(t: any, e: any, r: any);
    c: any;
    d: any;
    f: any;
    type: number;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): any;
}
declare class b {
    static create(t: any, e: any): b;
    constructor(t: any, e: any);
    d: any;
    f: any;
    type: number;
    c: R | null;
    cmp(t: any): number;
    equals(t: any): boolean;
    substituteConstants(): this;
    evaluate(t: any): any;
    serialize(): string;
    keys(): any[];
    map(t: any): any;
    negate(): R;
}
declare class R {
    static create(t: any): R;
    constructor(t: any);
    c: any;
    type: number;
    cmp(t: any): any;
    equals(t: any): any;
    substituteConstants(): this;
    evaluate(t: any): boolean;
    serialize(): string;
    keys(): any;
    map(t: any): R;
    negate(): any;
}
declare class m {
    static create(t: any, e: any, r: any): any;
    static d(t: any, e: any, r: any): any;
    constructor(t: any, e: any);
    expr: any;
    c: any;
    type: number;
    cmp(t: any): any;
    equals(t: any): boolean;
    substituteConstants(): any;
    evaluate(t: any): boolean;
    serialize(): any;
    keys(): any[];
    map(t: any): m;
    negate(): any;
}
declare class d {
    static create(t: any, e: any, r: any): any;
    static d(t: any, e: any, r: any): any;
    constructor(t: any, e: any);
    expr: any;
    c: any;
    type: number;
    cmp(t: any): any;
    equals(t: any): boolean;
    substituteConstants(): any;
    evaluate(t: any): boolean;
    serialize(): any;
    keys(): any[];
    map(t: any): d;
    negate(): any;
}
declare class V extends N {
    static all(): ArrayIterator<any>;
    constructor(t: any, e: any, r: any);
    f: any;
    bindTo(t: any): any;
    getValue(t: any): any;
    toNegated(): any;
    isEqualTo(t: any): l | o | N | q | E | undefined;
    notEqualsTo(t: any): l | o | N | k | E | undefined;
    greater(t: any): any;
}
declare const Et: any;
declare function L(i: any, t: any): any;
declare var B: any;
import { $An as S } from "./scanner.js";
export { mt as $Bn, x as $Cn, f as $Dn, xt as $En, Nt as $Fn, l as $Gn, o as $Hn, N as $In, q as $Jn, D as $Kn, F as $Ln, k as $Mn, E as $Nn, I as $On, C as $Pn, $ as $Qn, v as $Rn, b as $Sn, R as $Tn, m as $Un, d as $Vn, V as $Wn, Et as $Xn, L as $Yn, B as ContextKeyExprType };
//# sourceMappingURL=contextkey.d.ts.map