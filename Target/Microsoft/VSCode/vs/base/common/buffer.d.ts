declare function V(e: any): {
    e: any;
    f: any;
    a: {
        flowing: boolean;
        ended: boolean;
        destroyed: boolean;
    };
    b: {
        data: never[];
        error: never[];
    };
    c: {
        data: never[];
        error: never[];
        end: never[];
    };
    d: any[];
    pause(): void;
    resume(): void;
    write(e: any): Promise<any> | undefined;
    error(e: any): void;
    end(e: any): void;
    g(e: any): void;
    h(e: any): void;
    i(): void;
    on(e: any, t: any): void;
    removeListener(e: any, t: any): void;
    j(): void;
    k(): void;
    l(): boolean;
    destroy(): void;
};
declare function j(e: any, t: any): {
    read: () => any;
};
declare function q(e: any, t: any): {
    e: any;
    f: any;
    a: {
        flowing: boolean;
        ended: boolean;
        destroyed: boolean;
    };
    b: {
        data: never[];
        error: never[];
    };
    c: {
        data: never[];
        error: never[];
        end: never[];
    };
    d: any[];
    pause(): void;
    resume(): void;
    write(e: any): Promise<any> | undefined;
    error(e: any): void;
    end(e: any): void;
    g(e: any): void;
    h(e: any): void;
    i(): void;
    on(e: any, t: any): void;
    removeListener(e: any, t: any): void;
    j(): void;
    k(): void;
    l(): boolean;
    destroy(): void;
};
declare function z(e: any): o;
declare function G({ buffer: e }: {
    buffer: any;
}, t?: boolean, n?: boolean): string;
declare function J({ buffer: e }: {
    buffer: any;
}): string;
declare function P(e: any): o;
declare class o {
    static alloc(t: any): o;
    static wrap(t: any): o;
    static fromString(t: any, n: any): o;
    static fromByteArray(t: any): o;
    static concat(t: any, n: any): o;
    static isNativeBuffer(t: any): boolean;
    constructor(t: any);
    buffer: any;
    byteLength: any;
    clone(): o;
    toString(): any;
    slice(t: any, n: any): o;
    set(t: any, n: any): void;
    readUInt32BE(t: any): any;
    writeUInt32BE(t: any, n: any): void;
    readUInt32LE(t: any): number;
    writeUInt32LE(t: any, n: any): void;
    readUInt8(t: any): any;
    writeUInt8(t: any, n: any): void;
    indexOf(t: any, n?: number): any;
    equals(t: any): any;
}
declare function U(e: any, t: any, n?: number): any;
declare function N(e: any, t: any): number;
declare function k(e: any, t: any, n: any): void;
declare function $(e: any, t: any): any;
declare function B(e: any, t: any, n: any): void;
declare function d(e: any, t: any): number;
declare function m(e: any, t: any, n: any): void;
declare function A(e: any, t: any): any;
declare function L(e: any, t: any, n: any): void;
declare function C(e: any): any;
declare function T(e: any): {
    read: () => any;
};
declare function E(e: any): Promise<any>;
declare function H(e: any): Promise<o>;
declare function M(e: any): {
    e: any;
    f: any;
    a: {
        flowing: boolean;
        ended: boolean;
        destroyed: boolean;
    };
    b: {
        data: never[];
        error: never[];
    };
    c: {
        data: never[];
        error: never[];
        end: never[];
    };
    d: any[];
    pause(): void;
    resume(): void;
    write(e: any): Promise<any> | undefined;
    error(e: any): void;
    end(e: any): void;
    g(e: any): void;
    h(e: any): void;
    i(): void;
    on(e: any, t: any): void;
    removeListener(e: any, t: any): void;
    j(): void;
    k(): void;
    l(): boolean;
    destroy(): void;
};
declare function D(e: any): {
    e: any;
    f: any;
    a: {
        flowing: boolean;
        ended: boolean;
        destroyed: boolean;
    };
    b: {
        data: never[];
        error: never[];
    };
    c: {
        data: never[];
        error: never[];
        end: never[];
    };
    d: any[];
    pause(): void;
    resume(): void;
    write(e: any): Promise<any> | undefined;
    error(e: any): void;
    end(e: any): void;
    g(e: any): void;
    h(e: any): void;
    i(): void;
    on(e: any, t: any): void;
    removeListener(e: any, t: any): void;
    j(): void;
    k(): void;
    l(): boolean;
    destroy(): void;
};
export { V as $1i, j as $2i, q as $3i, z as $4i, G as $5i, J as $6i, P as $7i, o as $Ki, U as $Li, N as $Mi, k as $Ni, $ as $Oi, B as $Pi, d as $Qi, m as $Ri, A as $Si, L as $Ti, C as $Ui, T as $Vi, E as $Wi, H as $Xi, M as $Yi, D as $Zi };
//# sourceMappingURL=buffer.d.ts.map