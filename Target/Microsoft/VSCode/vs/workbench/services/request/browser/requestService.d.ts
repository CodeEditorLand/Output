export { a as $PAc };
declare let a: {
    new (t: any, e: any, r: any): {
        f: any;
        g: any;
        request(t: any, e: any): Promise<any>;
        resolveProxy(t: any): Promise<void>;
        lookupAuthorization(t: any): Promise<void>;
        lookupKerberosAuthorization(t: any): Promise<void>;
        loadCertificates(): Promise<never[]>;
        h(t: any, e: any, r: any): any;
        b: any;
        a: number;
        c(r: any, o: any): Promise<any>;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=requestService.d.ts.map