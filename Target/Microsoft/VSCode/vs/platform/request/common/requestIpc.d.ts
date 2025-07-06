declare class d {
    constructor(t: any);
    a: any;
    listen(t: any, e: any): void;
    call(t: any, e: any, r: any, o?: any): any;
}
declare class f {
    constructor(t: any);
    a: any;
    request(t: any, e: any): Promise<{
        res: any;
        stream: {
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
    }>;
    resolveProxy(t: any): Promise<any>;
    lookupAuthorization(t: any): Promise<any>;
    lookupKerberosAuthorization(t: any): Promise<any>;
    loadCertificates(): Promise<any>;
}
export { d as $83, f as $93 };
//# sourceMappingURL=requestIpc.d.ts.map