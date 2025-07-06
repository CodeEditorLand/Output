export { m as $uyc };
declare let m: {
    new (e: any): {
        a: any;
        capabilities: number;
        onDidChangeCapabilities: any;
        onDidChangeFile: any;
        readFile(e: any): Promise<any>;
        stat(e: any): Promise<{
            type: any;
            permissions: any;
            mtime: number;
            ctime: number;
            size: any;
        }>;
        watch(e: any, t: any): Readonly<{
            dispose(): void;
        }> | undefined;
        mkdir(e: any): Promise<void>;
        readdir(e: any): Promise<never[]>;
        rename(e: any, t: any, r: any): Promise<void>;
        delete(e: any, t: any): Promise<void>;
        writeFile(): Promise<void>;
    };
    SCHEMA: string | undefined;
};
//# sourceMappingURL=editSessionsFileSystemProvider.d.ts.map