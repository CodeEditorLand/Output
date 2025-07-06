export { _ as $FBc };
declare class _ {
    capabilities: number;
    onDidChangeCapabilities: any;
    onDidChangeFile: any;
    readFile(r: any): Promise<Uint8Array<ArrayBuffer>>;
    stat(r: any): Promise<{
        type: any;
        size: number;
        mtime: number;
        ctime: number;
    }>;
    watch(): Readonly<{
        dispose(): void;
    }> | undefined;
    writeFile(r: any, e: any, s: any): void;
    readdir(r: any): void;
    mkdir(r: any): void;
    delete(r: any, e: any): void;
    rename(r: any, e: any, s: any): void;
}
//# sourceMappingURL=webWorkerFileSystemProvider.d.ts.map