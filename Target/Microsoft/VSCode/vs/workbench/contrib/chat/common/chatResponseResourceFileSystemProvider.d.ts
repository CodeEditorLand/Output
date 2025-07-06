export { v as $whc };
declare let v: {
    new (e: any, o: any): {
        a: any;
        b: any;
        onDidChangeCapabilities: any;
        onDidChangeFile: any;
        capabilities: number;
        readFile(e: any): Promise<any>;
        readFileStream(e: any): {
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
        stat(e: any): Promise<{
            type: any;
            ctime: number;
            mtime: number;
            size: any;
        }>;
        delete(): void;
        watch(): Readonly<{
            dispose(): void;
        }> | undefined;
        mkdir(): void;
        readdir(): Promise<never[]>;
        rename(): void;
        writeFile(): void;
        c(e: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
//# sourceMappingURL=chatResponseResourceFileSystemProvider.d.ts.map