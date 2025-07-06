export { u as $rrc };
declare let u: {
    new (o: any, t: any, e: any): {
        a: any;
        b: any;
        c: any;
        capabilities: number;
        onDidChangeCapabilities: any;
        onDidChangeFile: any;
        stat(o: any): Promise<{
            type: any;
            ctime: number;
            mtime: number;
            size: number;
        }>;
        readFile(o: any): Promise<any>;
        writeFile(o: any, t: any, e: any): Promise<void>;
        watch(o: any, t: any): {
            dispose(): void;
        };
        mkdir(o: any): Promise<undefined>;
        readdir(o: any): Promise<undefined>;
        delete(o: any, t: any): Promise<undefined>;
        rename(o: any, t: any, e: any): Promise<undefined>;
    };
    ID: string | undefined;
};
//# sourceMappingURL=trustedDomainsFileSystemProvider.d.ts.map