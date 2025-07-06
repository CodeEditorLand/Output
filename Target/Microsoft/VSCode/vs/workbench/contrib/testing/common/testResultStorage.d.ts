declare const N: 128;
declare const V: any;
declare let l: {
    new (t: any, e: any, r: any): {
        b: any;
        c: any;
        a: any;
        read(): Promise<any[]>;
        getResultOutputWriter(t: any): {
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
        persist(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare const k_base: {
    new (t: any, e: any, r: any): {
        b: any;
        c: any;
        a: any;
        read(): Promise<any[]>;
        getResultOutputWriter(t: any): {
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
        persist(t: any): Promise<void>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class k extends k_base {
    constructor(...args: any[]);
    cache: Map<any, any>;
    f(t: any): Promise<any>;
    m(t: any, e: any): Promise<void>;
    j(t: any): Promise<void>;
    g(t: any): void;
    n(t: any, e: any): void;
    h(t: any, e: any, r: any): void;
}
declare let g: {
    new (t: any, e: any, r: any, i: any, n: any, s: any): {
        t: any;
        r: any;
        f(t: any): Promise<any>;
        m(t: any, e: any): any;
        j(t: any): any;
        h(t: any, e: any, r: any): Promise<any>;
        g(t: any): Promise<any>;
        n(t: any, e: any): Promise<void>;
        persist(t: any): Promise<void>;
        F(): Promise<void>;
        G(t: any): any;
        H(t: any): any;
        b: any;
        c: any;
        a: any;
        read(): Promise<any[]>;
        getResultOutputWriter(t: any): {
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
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
export { N as $K3b, V as $L3b, l as $M3b, k as $N3b, g as $O3b };
//# sourceMappingURL=testResultStorage.d.ts.map