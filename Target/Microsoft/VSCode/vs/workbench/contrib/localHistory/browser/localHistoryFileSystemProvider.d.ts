export { r as $Pyc };
declare class r {
    static toLocalHistoryFileSystem(t: any): any;
    static fromLocalHistoryFileSystem(t: any): {
        location: {
            _formatted: string | null;
            _fsPath: any;
            readonly fsPath: any;
            toString(e?: boolean): string;
            toJSON(): {
                $mid: number;
            };
            scheme: any;
            authority: any;
            path: any;
            query: any;
            fragment: any;
            with(e: any): /*elided*/ any;
        };
        associatedResource: {
            _formatted: string | null;
            _fsPath: any;
            readonly fsPath: any;
            toString(e?: boolean): string;
            toJSON(): {
                $mid: number;
            };
            scheme: any;
            authority: any;
            path: any;
            query: any;
            fragment: any;
            with(e: any): /*elided*/ any;
        };
    };
    constructor(t: any);
    get capabilities(): number;
    b: any;
    c: Map<any, any>;
    onDidChangeCapabilities: any;
    onDidChangeFile: any;
    d(t: any): Promise<any>;
    stat(t: any): Promise<any>;
    readFile(t: any): Promise<any>;
    writeFile(t: any, e: any, o: any): Promise<void>;
    mkdir(t: any): Promise<void>;
    readdir(t: any): Promise<never[]>;
    rename(t: any, e: any, o: any): Promise<void>;
    delete(t: any, e: any): Promise<void>;
    watch(t: any, e: any): Readonly<{
        dispose(): void;
    }> | undefined;
}
//# sourceMappingURL=localHistoryFileSystemProvider.d.ts.map